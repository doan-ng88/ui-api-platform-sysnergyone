import type { VariantProps } from "cva";
import type { ClassValue } from "cva/types";
import type { textareaClassNameHandler } from "./styles";

export interface TextareaProps {
	size?: TextareaClassNameProps["size"];
	class?: ClassValue;
	error?: boolean;
	bordered?: TextareaClassNameProps["bordered"];
	placeholder?: string;
}

export type TextareaClassNameProps = VariantProps<
	typeof textareaClassNameHandler
>;
