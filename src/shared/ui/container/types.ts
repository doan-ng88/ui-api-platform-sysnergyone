import type { VariantProps } from "cva";
import type { ClassValue } from "cva/types";
import type {
	containerClassNameHandler,
	containerInnerClassNameHandler,
} from "./styles";

export type ContainerClassNameProps = VariantProps<
	typeof containerClassNameHandler
>;

export interface ContainerProps {
	padding?: ContainerClassNameProps["padding"];
	class?: ClassValue;
}

export type ContainerInnerClassNameProps = VariantProps<
	typeof containerInnerClassNameHandler
>;

export interface ContainerInnerProps {
	size?: ContainerInnerClassNameProps["size"];
	padding?: boolean;
	class?: ClassValue;
}
