import type { VariantProps } from "cva";
import type { ClassValue } from "cva/types";
import type { inputToggleClassNameHandler } from "./styles";

export interface InputToggleProps {
	size?: InputToggleClassNameProps["size"];
	color?: InputToggleClassNameProps["color"];
	class?: ClassValue;
	label?: string;
	required?: boolean;
	error?: boolean;
	disabled?: boolean;
}

export type EmitsProps = (e: "change", value: boolean) => void;

export type InputToggleClassNameProps = VariantProps<
	typeof inputToggleClassNameHandler
>;
