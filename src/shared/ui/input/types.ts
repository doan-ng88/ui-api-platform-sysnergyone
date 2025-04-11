import type { VariantProps } from "cva";
import type { ClassValue } from "cva/types";
import type { inputClassNameHandler } from "./styles";

export interface InputProps {
	size?: InputClassNameProps["size"];
	bordered?: InputClassNameProps["bordered"];
	class?: ClassValue;
	error?: boolean;
	disabled?: boolean;
	type?: "number" | "checkbox" | "text" | "radio" | "date" | "url" | "file";
	placeholder?: string;
}

export type InputClassNameProps = VariantProps<typeof inputClassNameHandler>;
