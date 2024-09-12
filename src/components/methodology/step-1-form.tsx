import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { z } from "zod";

import {
	useMethodologyCalculator,
	step1Schema,
} from "@/hooks/use-methodology-calculator";

import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/progress";

export function Step1Form() {
	const methodologyCalculator = useMethodologyCalculator();

	const form = useForm<z.infer<typeof step1Schema>>({
		resolver: zodResolver(step1Schema),
		defaultValues: {
			numberOfQuestions: 3,
			numberOfVariants: 2,
			isDifferentScores: false,
		},
	});

	function onSubmit(values: z.infer<typeof step1Schema>) {
		methodologyCalculator.setStep1Values(values);
		methodologyCalculator.setCalculationStep(2);
	}

	function toggleDifferentScoresOption() {
		if (form.getValues().isDifferentScores) {
			methodologyCalculator.setRequiredCalculationStep(4);
		} else {
			methodologyCalculator.setRequiredCalculationStep(3);
		}
	}

	return (
		<div className="container flex flex-col items-center gap-8">
			<div className="flex flex-col gap-6 max-w-width-sm w-full">
				<div className="flex flex-col gap-4">
					<h1 className="text-display-sm/display-sm text-gray-900 font-semibold">
						Налаштування методики
					</h1>
					<p className="text-lg/lg text-gray-600">
						Налаштування основних параметрів методики.
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
						<FormField
							control={form.control}
							name="numberOfQuestions"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Кількість питань</FormLabel>
									<FormControl>
										<Input placeholder="3" type="number" min={1} {...field} />
									</FormControl>
									<FormDescription>
										Кількість питань, з яких складається методика.
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="numberOfVariants"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Кількість варіантів</FormLabel>
									<FormControl>
										<Input placeholder="2" type="number" min={1} {...field} />
									</FormControl>
									<FormDescription>
										Кількість варіантів відповідей у кожному питанні методики.
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="isDifferentScores"
							render={({ field }) => (
								<FormItem>
									<div className="flex flex-row items-start space-x-2 space-y-0">
										<FormControl>
											<Switch
												checked={field.value}
												onCheckedChange={(e) => {
													field.onChange(e);
													toggleDifferentScoresOption();
												}}
											/>
										</FormControl>
										<div className="space-y-2 leading-none">
											<FormLabel>Різна вага відповідей</FormLabel>
											<FormDescription>
												Використовувати власну шкалу балів для оцінювання
												методики.
											</FormDescription>
										</div>
									</div>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<Button className="w-full" size="md" type="submit">
						Заповнити відповіді
					</Button>
				</form>
			</Form>
		</div>
	);
}
