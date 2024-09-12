import { useMethodologyCalculator } from "@/hooks/use-methodology-calculator";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/progress";
import { useMemo } from "react";

export function ResultsForm() {
	const methodologyCalculator = useMethodologyCalculator();

	const grade = useMemo(() => {
		const { step1Values, step2Values, step3Values, step4Values } =
			methodologyCalculator;

		if (!step1Values || !step2Values || !step3Values) return 0;

		const { numberOfQuestions, isDifferentScores } = step1Values;
		const { answers } = step2Values;
		const { keys } = step3Values;

		let result = 0;

		for (let i = 0; i < numberOfQuestions; i++) {
			const isMatched = answers[i] === keys[i];

			if (isDifferentScores && step4Values) {
				const { keyCompliance, variantCompliance } = step4Values;
				result += isMatched ? keyCompliance : variantCompliance[answers[i]];
			} else {
				result += isMatched ? 1 : 0;
			}
		}

		return result;
	}, [methodologyCalculator]);

	const maxGrade = useMemo(() => {
		const { step1Values, step2Values, step3Values, step4Values } =
			methodologyCalculator;

		if (!step1Values || !step2Values || !step3Values) return 0;

		const { numberOfQuestions, isDifferentScores } = step1Values;

		const result =
			isDifferentScores && step4Values
				? numberOfQuestions * step4Values.keyCompliance
				: numberOfQuestions;
		return result;
	}, [methodologyCalculator]);

	function onClick() {
		methodologyCalculator.setCalculationStep(1);
		methodologyCalculator.setRequiredCalculationStep(3);
	}

	return (
		<div className="container flex flex-col items-center gap-8">
			<div className="flex flex-col gap-6 max-w-width-sm w-full">
				<div className="flex flex-col gap-4">
					<h1 className="text-display-sm/display-sm text-gray-900 font-semibold">
						Результат
					</h1>
					<p className="text-lg/lg text-gray-600">
						Результат проходження методики.
					</p>
				</div>
				<Progress
					steps={methodologyCalculator.requiredCalculationSteps}
					currentStep={methodologyCalculator.calculationStep - 1}
				/>
			</div>
			<div className="flex flex-col gap-8 max-w-width-sm w-full">
				<div className="flex flex-col gap-1">
					<span className="flex items-center text-display-lg/display-lg font-semibold text-gray-600">
						<span className="text-brand-600">{grade}</span>
						<span>/</span>
						<span>{maxGrade}</span>
					</span>
					<span className="text-lg/lg font-semibold">Балів набрано</span>
				</div>
				<Button className="w-full" size="md" onClick={onClick}>
					Розпочати знову
				</Button>
			</div>
		</div>
	);
}
