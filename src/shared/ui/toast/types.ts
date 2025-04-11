import type { VariantProps } from "cva"; // Importing VariantProps for handling variant types.
import type { toastClassNameHandler } from "./styles"; // Importing the toast class name handler for styling.

/**
 * Represents the properties of a toast notification.
 *
 * @type ToastProps
 * @property title - Optional title for the toast notification.
 * @property description - The main content of the toast notification.
 * @property type - The type of toast (e.g., info, success, warning, error).
 */
export type ToastProps = {
	/** Optional title for the toast notification. */
	title?: string;
	/** The main content of the toast notification. */
	description: string;
	/** The type of toast (info, success, warning, error). */
	type: ToastType;
};

/**
 * Represents the emitted events from a toast component.
 *
 * @type ToastEmits
 * @param e - The event name, in this case, "close" when the toast is closed.
 */
export type ToastEmits = (e: "close") => void;

/**
 * Defines the type of toast based on the class name properties.
 *
 * @type ToastType
 */
export type ToastType = ToastClassNameProps["type"];

/**
 * Represents the properties required to create a toast notification.
 *
 * @interface CreateToastProps
 * @property title - Optional title for the toast notification.
 * @property description - The main content of the toast notification.
 */
export interface CreateToastProps {
	/** Optional title for the toast notification. */
	title?: string;
	/** The main content of the toast notification. */
	description: string;
}

/**
 * Represents the class name properties for toast notifications.
 *
 * @type ToastClassNameProps
 */
export type ToastClassNameProps = VariantProps<typeof toastClassNameHandler>; // Variant properties for styling the toast.
