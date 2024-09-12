import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import type { z } from "zod";
import {
	useMethodologyCalculator,
	step2Schema,
} from "@/hooks/use-methodology-calculator";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Progress } from "@/components/progress";
import { useEffect } from "react";
import { cn } from "@/lib/utils";

export function Step2Form() {
	const methodologyCalculator = useMethodologyCalculator();
	const form = useForm<z.infer<typeof step2Schema>>({
		resolver: zodResolver(step2Schema),
		defaultValues: {
			answers: methodologyCalculator.step2Values?.answers,
		},
	});

	const { fields, replace } = useFieldArray({
		control: form.control,
		name: "answers" as never,
	});

	useEffect(() => {
		if (methodologyCalculator.step1Values) {
			const { numberOfQuestions } = methodologyCalculator.step1Values;
			const newAnswers = Array(numberOfQuestions).fill(-1);
			replace(newAnswers);
		}
	}, [methodologyCalculator.step1Values, replace]);

	function onSubmit(values: z.infer<typeof step2Schema>) {
		methodologyCalculator.setStep2Values(values);
		methodologyCalculator.setCalculationStep(3);
	}
	function onBack() {
		methodologyCalculator.setCalculationStep(1);
	}

	return (
		<div className="container flex flex-col items-center gap-8">
			<div className="flex flex-col gap-6 max-w-width-sm w-full">
				<div className="flex flex-col gap-4">
					<h1 className="text-display-sm/display-sm text-gray-900 font-semibold">
						Ваші відповіді
					</h1>
					<p className="text-lg/lg text-gray-600">
						Заповніть ваші відповіді до методики.
					</p>
				</div>
				<Progress
					steps={methodologyCalculator.requiredCalculationSteps}
					currentStep={methodologyCalculator.calculationStep - 1}
				/>
			</div>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="max-w-width-sm w-full space-y-8"
				>
					<div className="space-y-6">
						{fields.map((field, answerIndex) => (
							<FormField
								key={field.id}
								control={form.control}
								name={`answers.${answerIndex}`}
								render={({ field }) => (
									<FormItem>
										<FormLabel>Питання {answerIndex + 1}</FormLabel>
										<FormControl>
											<div className="flex">
												{Array.from({
													length:
														methodologyCalculator.step1Values
															?.numberOfVariants || 0,
												}).map((_, variantIndex) => (
													<Button
														// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
														key={variantIndex}
														type="button"
														variant={
															field.value === variantIndex
																? "secondary-color"
																: "secondary"
														}
														onClick={() => field.onChange(variantIndex)}
														className={cn(
															"w-full shadow-none [&:not(:last-of-type)]:rounded-e-none [&:not(:first-of-type)]:rounded-s-none border-r-0 last-of-type:border-r",
															field.value === variantIndex && "border-r",
														)}
													>
														{String.fromCharCode(65 + variantIndex)}
													</Button>
												))}
											</div>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						))}
					</div>
					<div className="flex flex-col md:flex-row-reverse gap-3">
						<Button className="w-full" size="md" type="submit">
							Заповнити ключі
						</Button>
						<Button
							variant="secondary"
							className="w-full"
							size="md"
							type="button"
							onClick={onBack}
						>
							Назад
						</Button>
					</div>
				</form>
			</Form>
		</div>
	);
}
