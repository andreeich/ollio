import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const inputVariants = cva(
	"flex w-full rounded-md text-gray-900 border border-gray-300 bg-base-white shadow-xs transition-colors file:border-0 file:bg-base-white file:text-md/md placeholder:text-gray-500 focus-visible:outline-none focus-visible:border-2 focus-visible:border-brand-500 disabled:cursor-not-allowed disabled:opacity-50",
	{
		variants: {
			size: {
				sm: "h-10 px-3 text-md/md gap-2",
				md: "h-11 px-3.5 text-md/md gap-2",
			},
			variant: {
				default: "bg-transparent",
				error: "border-2",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "sm",
		},
	},
);

export interface InputProps
	extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
		VariantProps<typeof inputVariants> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
	({ className, type, size, variant, ...props }, ref) => {
		return (
			<input
				type={type}
				className={cn(inputVariants({ size, variant, className }))}
				ref={ref}
				{...props}
			/>
		);
	},
);
Input.displayName = "Input";

export { Input };
