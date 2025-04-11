import { cva } from "cva";
export const toastClassNameHandler = cva(
	"bg-error text-error-content card w-96 space-y-2 px-3 py-2 whitespace-pre-wrap",
	{
		variants: {
			type: {
				success: "bg-success text-success-content",
				warning: "bg-warning text-warning-content",
				error: "bg-error text-error-content",
				info: "bg-info text-info-content",
				base: "bg-base-300 text-base-content",
			},
		},
		defaultVariants: {
			type: "base",
		},
	},
);
