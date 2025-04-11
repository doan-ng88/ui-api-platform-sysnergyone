import type { VariantProps } from "cva";
import type { ClassValue } from "cva/types";
import type { ButtonHTMLAttributes, FunctionalComponent } from "vue";
import type { buttonClassNameHandler } from "./styles";

export interface ButtonProps
	extends /* @vue-ignore */ Omit<ButtonHTMLAttributes, "color"> {
	loading?: boolean;
	disabled?: boolean;
	iconOnly?: boolean;
	color?: ButtonClassNameProps["color"];
	outline?: boolean;
	class?: ClassValue;
	unstyled?: boolean;
	icon?: FunctionalComponent;
	altIcon?: FunctionalComponent;
	tooltip?: string;
	active?: boolean;
	joinable?: boolean;
}

export type ButtonClassNameProps = VariantProps<typeof buttonClassNameHandler>;
