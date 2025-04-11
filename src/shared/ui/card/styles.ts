import { cva } from "cva";

export const cardClassNameHandler = cva("card", {
	variants: {
		color: {
			100: "bg-base-100",
			200: "bg-base-200",
			300: "bg-base-300",
			0: "",
		},
	},
	defaultVariants: {
		color: 100,
	},
});

export const cardInnerClassNameHandler = cva("", {
	variants: {
		padding: {
			sm: "p-4",
			none: "",
		},
	},
	defaultVariants: {
		padding: "sm",
	},
});
