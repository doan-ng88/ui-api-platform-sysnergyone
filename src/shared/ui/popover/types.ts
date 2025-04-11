import type { PopoverContentProps } from "reka-ui";

export type PopoverEmits = (e: "change") => void;

export interface PopoverProps {
	side?: PopoverContentProps["side"];
	align?: PopoverContentProps["align"];
}
