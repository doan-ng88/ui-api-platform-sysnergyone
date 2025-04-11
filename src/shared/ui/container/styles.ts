import { cva } from "cva";

export const containerClassNameHandler = cva("", {
	variants: {
		padding: {
			bottom: "pb-2",
			top: " pt-2",
			"top-bottom": "py-2",
			none: "",
		},
	},
	defaultVariants: {
		padding: "top-bottom",
	},
});

export const containerInnerClassNameHandler = cva("mx-auto", {
	variants: {
		size: {
			1: "max-w-xs",
			2: "max-w-sm",
			3: "max-w-md",
			4: "max-w-lg",
			5: "max-w-xl",
			6: "max-w-2xl",
			7: "max-w-3xl",
			8: "max-w-4xl",
			9: "max-w-5xl",
			10: "max-w-6xl",
			11: "max-w-7xl",
			12: "max-w-(--breakpoint-xl)",
			13: "max-w-(--breakpoint-2xl)",
			0: "",
		},
		padding: {
			true: "px-2",
			false: "",
		},
	},
	defaultVariants: {
		size: 0,
		padding: true,
	},
});
