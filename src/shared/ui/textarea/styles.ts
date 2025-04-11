import { cva } from "cva";

export const textareaClassNameHandler = cva("textarea", {
	variants: {
		size: {
			sm: "textarea-sm",
			md: "textarea-md",
			lg: "textarea-lg",
			none: "",
		},
		error: {
			true: "textarea-error",
			false: "",
		},
		bordered: {
			true: "textarea-bordered",
			false: "",
		},
	},
	defaultVariants: {
		size: "sm",
		error: false,
		bordered: true,
	},
});
