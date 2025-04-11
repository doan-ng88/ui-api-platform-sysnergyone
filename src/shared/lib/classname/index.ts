import { cx } from "cva";
import type { ClassValue } from "cva/types";
import { twMerge } from "tailwind-merge";

export const cn = (...classes: ClassValue[]) => twMerge(cx(...classes));
