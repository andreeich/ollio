import { useCallback, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useMethodologyCalculator } from "@/hooks/use-methodology-calculator";

import { Step1Form } from "./step-1-form";
import { Step2Form } from "./step-2-form";
import { Step3Form } from "./step-3-form";
import { Step4Form } from "./step-4-form";
import { ResultsForm } from "./results-form";

export function MethodologyCalculator() {
	const methodologyCalculator = useMethodologyCalculator();
	const isFirstRender = useRef(true);

	useEffect(() => {
		isFirstRender.current = false;
	}, []);

	const getForm = useCallback(() => {
		switch (methodologyCalculator.calculationStep) {
			case 1:
				return (
					<motion.div
						key="step-1"
						initial={{ opacity: isFirstRender.current ? 1 : 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.1 }}
					>
						<Step1Form />
					</motion.div>
				);
			case 2:
				return (
					<motion.div
						key="step-2"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.1 }}
					>
						<Step2Form />
					</motion.div>
				);
			case 3:
				return (
					<motion.div
						key="step-3"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.1 }}
					>
						<Step3Form />
					</motion.div>
				);
			case 4:
				return (
					<motion.div
						key="step-4"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.1 }}
					>
						<Step4Form />
					</motion.div>
				);
			case 5:
				return (
					<motion.div
						key="step-5"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.1 }}
					>
						<ResultsForm />
					</motion.div>
				);
			default:
				return <span>{JSON.stringify(methodologyCalculator, null, 2)}</span>;
		}
	}, [methodologyCalculator]);

	return (
		<motion.div
			layout
			className="flex flex-col py-16 md:py-24 gap-12 md:gap-16"
		>
			<AnimatePresence mode="wait">{getForm()}</AnimatePresence>
		</motion.div>
	);
}
