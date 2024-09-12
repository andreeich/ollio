import { create } from "zustand";
import { z } from "zod";

export const step1Schema = z.object({
	numberOfQuestions: z.coerce
		.number({
			message: "Очікується число.",
		})
		.min(2, {
			message: "Кількість питань повинна бути щонайменше 2.",
		}),
	numberOfVariants: z.coerce
		.number({
			message: "Очікується число.",
		})
		.min(2, {
			message: "Кількість варіантів повинна бути щонайменше 2.",
		}),
	isDifferentScores: z.coerce.boolean(),
});

export const step2Schema = z.object({
	answers: z
		.array(z.coerce.number().min(0, "Необхідно обрати варіант."))
		.min(2, "Необхідно заповнити хоча б 2 відповіді."),
});

export const step3Schema = z.object({
	keys: z
		.array(z.coerce.number().min(0, "Необхідно обрати варіант."))
		.min(2, "Необхідно заповнити хоча б 2 відповіді."),
});
export const step4Schema = z.object({
	keyCompliance: z.coerce
		.number()
		.min(1, "Бал за відповідність ключу повинен бути не менше 1."),
	variantCompliance: z
		.array(
			z.coerce
				.number()
				.min(0, "Необхідно вказати бал за відповідність варіанту відповіді."),
		)
		.min(2, "Необхідно бути хоча б 2 налаштування."),
});

type MethodologyCalculatorStore = {
	calculationStep: number;
	requiredCalculationSteps: number;
	step1Values: z.infer<typeof step1Schema> | undefined;
	step2Values: z.infer<typeof step2Schema> | undefined;
	step3Values: z.infer<typeof step3Schema> | undefined;
	step4Values: z.infer<typeof step4Schema> | undefined;
	setStep1Values: (values: z.infer<typeof step1Schema>) => void;
	setStep2Values: (values: z.infer<typeof step2Schema>) => void;
	setStep3Values: (values: z.infer<typeof step3Schema>) => void;
	setStep4Values: (values: z.infer<typeof step4Schema>) => void;
	setCalculationStep: (value: number) => void;
	setRequiredCalculationStep: (value: number) => void;
	reset: () => void;
};

export const useMethodologyCalculator = create<MethodologyCalculatorStore>(
	(set) => ({
		calculationStep: 1,
		requiredCalculationSteps: 3,
		step1Values: {
			numberOfQuestions: 3,
			numberOfVariants: 2,
			isDifferentScores: false,
		},
		step2Values: { answers: [] },
		step3Values: { keys: [] },
		step4Values: { keyCompliance: 1, variantCompliance: [] },
		setStep1Values: (values: z.infer<typeof step1Schema>) => {
			set({ step1Values: values });
		},
		setStep2Values: (values: z.infer<typeof step2Schema>) => {
			set({ step2Values: values });
		},
		setStep3Values: (values: z.infer<typeof step3Schema>) => {
			set({ step3Values: values });
		},
		setStep4Values: (values: z.infer<typeof step4Schema>) => {
			set({ step4Values: values });
		},
		setCalculationStep: (value: number) => {
			set({ calculationStep: value });
		},
		setRequiredCalculationStep: (value: number) => {
			set({ requiredCalculationSteps: value });
		},
		reset: () => {
			set({
				calculationStep: 1,
				requiredCalculationSteps: 3,
				step1Values: {
					numberOfQuestions: 3,
					numberOfVariants: 2,
					isDifferentScores: false,
				},
				step2Values: { answers: [] },
				step3Values: { keys: [] },
				step4Values: { keyCompliance: 1, variantCompliance: [] },
			});
		},
	}),
);
