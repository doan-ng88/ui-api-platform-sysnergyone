import { cva } from "cva";

export const badgeClassNameHandler = cva("badge border-0", {
	variants: {
		color: {
			primary: "text-primary bg-primary/10",
			secondary: "text-secondary bg-secondary/10",
			accent: "text-accent bg-accent/10",
			success: "text-success bg-success/10",
			warning: "text-warning bg-warning/10",
			error: "text-error bg-error/10",
			info: "text-info bg-info/10",
			base: "bg-base-content/10 text-base-content/50",
		},
		size: {
			sm: "badge-sm",
			md: "badge-md",
		},
	},
	defaultVariants: {
		size: "md",
		color: "base",
	},
});
