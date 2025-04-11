import type { VariantProps } from "cva";
import type { ClassValue } from "cva/types";
import type { FunctionalComponent } from "vue";
import type { RouterLinkProps } from "vue-router";
import type { buttonAnchorClassNameHandler } from "./styles";

export interface ButtonAnchorProps {
	disabled?: boolean;
	iconOnly?: boolean;
	color?: ButtonAnchorClassNameProps["color"];
	outline?: boolean;
	class?: ClassValue;
	to: RouterLinkProps["to"];
	icon?: FunctionalComponent;
	tooltip?: string;
}

export type ButtonAnchorClassNameProps = VariantProps<
	typeof buttonAnchorClassNameHandler
>;
