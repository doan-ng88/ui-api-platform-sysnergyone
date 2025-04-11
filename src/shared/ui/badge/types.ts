import type { VariantProps } from "cva";
import type { ClassValue } from "cva/types";
import type { badgeClassNameHandler } from "./styles";

export interface BadgeProps {
	color?: BadgeClassNameProps["color"];
	size?: BadgeClassNameProps["size"];
	class?: ClassValue;
	tooltip?: string;
}

export type BadgeClassNameProps = VariantProps<typeof badgeClassNameHandler>;
