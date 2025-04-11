import type { VariantProps } from "cva";
import type { ClassValue } from "cva/types";
import type { cardClassNameHandler, cardInnerClassNameHandler } from "./styles";

export type CardClassNameProps = VariantProps<typeof cardClassNameHandler>;

export interface CardProps {
	color?: CardClassNameProps["color"];
	class?: ClassValue;
}

export type CardInnerClassNameProps = VariantProps<
	typeof cardInnerClassNameHandler
>;

export interface CardInnerProps {
	padding?: CardInnerClassNameProps["padding"];
	class?: ClassValue;
}
