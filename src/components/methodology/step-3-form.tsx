import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import type { z } from "zod";
import {
	useMethodologyCalculator,
	step3Schema,
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

export function Step3Form() {
	const methodologyCalculator = useMethodologyCalculator();
	const form = useForm<z.infer<typeof step3Schema>>({
		resolver: zodResolver(step3Schema),
		defaultValues: {
			keys: [],
		},
	});

	const { fields, replace } = useFieldArray({
		control: form.control,
		name: "keys" as never,
	});

	useEffect(() => {
		if (methodologyCalculator.step1Values) {
			const { numberOfQuestions } = methodologyCalculator.step1Values;
			const newKeys = Array(numberOfQuestions).fill(-1);
			replace(newKeys);
		}
	}, [methodologyCalculator.step1Values, replace]);

	function onSubmit(values: z.infer<typeof step3Schema>) {
		methodologyCalculator.setStep3Values(values);
		if (methodologyCalculator.step1Values?.isDifferentScores) {
			methodologyCalculator.setCalculationStep(4);
		} else {
			methodologyCalculator.setCalculationStep(5);
		}
	}

	return (
		<div className="container flex flex-col items-center gap-8">
			<div className="flex flex-col gap-6 max-w-width-sm w-full">
				<div className="flex flex-col gap-4">
					<h1 className="text-display-sm/display-sm text-gray-900 font-semibold">
						Ключі
					</h1>
					<p className="text-lg/lg text-gray-600">
						Заповніть ключі до методики.
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
						{fields.map((field, keyIndex) => (
							<FormField
								key={field.id}
								control={form.control}
								name={`keys.${keyIndex}`}
								render={({ field }) => (
									<FormItem>
										<FormLabel>Питання {keyIndex + 1}</FormLabel>
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
					<Button className="w-full" size="md" type="submit">
						Заповнити ключі
					</Button>
				</form>
			</Form>
		</div>
	);
}
