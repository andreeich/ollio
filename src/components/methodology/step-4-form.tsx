import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import type { z } from "zod";
import { useEffect } from "react";

import {
	useMethodologyCalculator,
	step4Schema,
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
import { Progress } from "@/components/progress";
import { Input } from "@/components/ui/input";

export function Step4Form() {
	const methodologyCalculator = useMethodologyCalculator();
	const form = useForm<z.infer<typeof step4Schema>>({
		resolver: zodResolver(step4Schema),
		defaultValues: {
			keyCompliance: 1,
			variantCompliance: [],
		},
	});

	const { fields, replace } = useFieldArray({
		control: form.control,
		name: "variantCompliance" as never,
	});

	useEffect(() => {
		if (methodologyCalculator.step1Values) {
			const { numberOfVariants } = methodologyCalculator.step1Values;
			const newVariantCompliance = Array(numberOfVariants).fill(0);
			replace(newVariantCompliance);
		}
	}, [methodologyCalculator.step1Values, replace]);

	function onSubmit(values: z.infer<typeof step4Schema>) {
		methodologyCalculator.setStep4Values(values);
		methodologyCalculator.setCalculationStep(5);
	}

	return (
		<div className="container flex flex-col items-center gap-8">
			<div className="flex flex-col gap-6 max-w-width-sm w-full">
				<div className="flex flex-col gap-4">
					<h1 className="text-display-sm/display-sm text-gray-900 font-semibold">
						Вага відповідей
					</h1>
					<p className="text-lg/lg text-gray-600">
						Заповніть шкалу балів для оцінювання методики.
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
					<FormField
						control={form.control}
						name="keyCompliance"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Відповідність ключу</FormLabel>
								<FormControl>
									<Input placeholder="1" type="number" min={1} {...field} />
								</FormControl>
								<FormDescription>
									Кількість балів за відповідність ключу.
								</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>
					<div className="space-y-6">
						{fields.map((field, keyIndex) => (
							<FormField
								key={field.id}
								control={form.control}
								name={`variantCompliance.${keyIndex}`}
								render={({ field }) => (
									<FormItem>
										<FormControl>
											<div className="flex">
												<FormLabel className="flex items-center h-[2.5rem] text-md/md px-3 bg-base-white border border-r-0 border-gray-300 rounded-s-md">
													{String.fromCharCode(65 + keyIndex)}
												</FormLabel>
												<Input
													placeholder="0"
													type="number"
													min={0}
													className="rounded-s-none"
													{...field}
												/>
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
