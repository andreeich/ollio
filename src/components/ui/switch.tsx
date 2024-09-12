import * as React from "react";
import * as SwitchPrimitives from "@radix-ui/react-switch";

import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const switchVariants = cva(
	"peer inline-flex shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:shadow-ring disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-brand-700 data-[state=unchecked]:bg-gray-100",
	{
		variants: {
			size: {
				sm: "w-9 h-5",
				md: "w-11 h-6",
			},
		},
		defaultVariants: {
			size: "sm",
		},
	},
);
const switchThumbVariants = cva(
	"pointer-events-none block rounded-full bg-base-white shadow-sm transition-transform data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0",
	{
		variants: {
			size: {
				sm: "size-4",
				md: "size-5",
			},
		},
		defaultVariants: {
			size: "sm",
		},
	},
);

interface SwitchProps
	extends React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>,
		VariantProps<typeof switchVariants> {}

const Switch = React.forwardRef<
	React.ElementRef<typeof SwitchPrimitives.Root>,
	SwitchProps
>(({ className, size, ...props }, ref) => (
	<SwitchPrimitives.Root
		className={cn(switchVariants({ size, className }))}
		{...props}
		ref={ref}
	>
		<SwitchPrimitives.Thumb className={cn(switchThumbVariants({ size }))} />
	</SwitchPrimitives.Root>
));
Switch.displayName = SwitchPrimitives.Root.displayName;

export { Switch };
