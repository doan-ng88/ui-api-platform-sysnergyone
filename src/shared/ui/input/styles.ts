import { cva } from "cva";

export const inputClassNameHandler = cva("", {
	variants: {
		size: {
			sm: "input-sm",
			md: "input-md",
			lg: "input-lg",
			none: "",
		},
		bordered: {
			true: "input-bordered",
		},
		error: {
			true: "input-error",
		},
		type: {
			checkbox: "checkbox checkbox-sm",
			text: "input",
			radio: "radio radio-sm",
			number: "input",
			date: "input",
			url: "input",
			file: "file-input",
		},
	},
	defaultVariants: {
		size: "sm",
		bordered: true,
		type: "text",
	},
});
