import { useCallback } from "react";
import { Step1Form } from "./step-1-form";
import { useMethodologyCalculator } from "@/hooks/use-methodology-calculator";
import { Step2Form } from "./step-2-form";
import { Step3Form } from "./step-3-form";
import { Step4Form } from "./step-4-form";
import { ResultsForm } from "./results-form";

export function MethodologyCalculator() {
	const methodologyCalculator = useMethodologyCalculator();

	const getForm = useCallback(() => {
		switch (methodologyCalculator.calculationStep) {
			case 1:
				return <Step1Form />;
			case 2:
				return <Step2Form />;
			case 3:
				return <Step3Form />;
			case 4:
				return <Step4Form />;
			case 5:
				return <ResultsForm />;
			default:
				return <span>{JSON.stringify(methodologyCalculator, null, 2)}</span>;
		}
	}, [methodologyCalculator]);

	return (
		<div className="flex flex-col py-16 md:py-24 gap-12 md:gap-16">
			{getForm()}
		</div>
	);
}
