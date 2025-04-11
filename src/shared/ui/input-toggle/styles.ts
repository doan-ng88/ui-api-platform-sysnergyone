import { cva } from "cva";

export const inputToggleClassNameHandler = cva("toggle", {
	variants: {
		size: {
			sm: "toggle-sm",
			md: "toggle-md",
			lg: "toggle-lg",
			none: "",
		},
		color: {
			primary: "toggle-primary",
			secondary: "toggle-secondary",
			accent: "toggle-accent",
			info: "toggle-info",
			success: "toggle-success",
			warning: "toggle-warning",
			error: "toggle-error",
		},
	},
	defaultVariants: {
		size: "sm",
		color: "primary",
	},
});
