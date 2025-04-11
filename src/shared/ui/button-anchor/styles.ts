import { cva } from "cva";

export const buttonAnchorClassNameHandler = cva("btn btn-sm", {
	variants: {
		color: {
			primary: "btn-primary",
			secondary: "btn-secondary",
			success: "btn-success",
			warning: "btn-warning",
			error: "btn-error",
			info: "btn-info",
			ghost: "btn-ghost",
		},
		outline: { true: "btn-outline border-0", false: "" },
		icon: { true: "btn-square", false: "" },
		disabled: { true: "btn-disabled pointer-events-none", false: "" },
	},
	defaultVariants: {
		outline: false,
	},
});
