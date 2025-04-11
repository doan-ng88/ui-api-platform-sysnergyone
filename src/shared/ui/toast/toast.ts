import { nanoid } from "nanoid"; // Importing nanoid for generating unique IDs.
import { reactive } from "vue"; // Importing reactive from Vue for state management.
import type { CreateToastProps, ToastProps, ToastType } from "./types"; // Importing types for toast properties.

/**
 * A class to manage toast notifications for user feedback.
 *
 * This class provides methods to create different types of toasts
 * (info, success, warning, error) and manages their state reactively.
 *
 * @public
 */
class Toast {
	/** A reactive map to store active toasts by their unique IDs. */
	#toasts = reactive(new Map<string, ToastProps>()); // Initializing a reactive Map to hold active toasts.

	/**
	 * Creates a new toast notification and adds it to the list of active toasts.
	 *
	 * This function is responsible for generating a unique ID for each toast
	 * and storing it in the reactive map for state management.
	 *
	 * @param props - The properties for the toast, which can be a string message
	 *                or an object containing title and description.
	 * @param type - The type of the toast (info, success, warning, error).
	 *
	 * @private
	 */
	#createToast(props: CreateToastProps | string, type: ToastType) {
		const id = nanoid(); // Generating a unique ID for the toast.

		// Checking if props is a string.
		if (typeof props === "string") {
			// Adding a new toast to the reactive Map with a string message.
			this.#toasts.set(id, {
				description: props,
				type,
			});
		} else {
			// Adding a new toast to the reactive Map with title and description.
			this.#toasts.set(id, {
				title: props.title,
				description: props.description,
				type,
			});
		}
	}

	/**
	 * Creates an info toast notification.
	 *
	 * This function allows the creation of an informational toast to provide
	 * feedback to the user.
	 *
	 * @param props - The properties for the toast, which can be a string message
	 *                or an object containing title and description.
	 *
	 * @example
	 * toast.info("This is an informational message.");
	 * toast.info({ title: "Info", description: "This is an informational message." });
	 *
	 * @public
	 */
	info(props: CreateToastProps | string) {
		this.#createToast(props, "info"); // Calling createToast with "info" type.
	}

	/**
	 * Creates a success toast notification.
	 *
	 * This function allows the creation of a success toast to inform the user
	 * of successful actions or events.
	 *
	 * @param props - The properties for the toast, which can be a string message
	 *                or an object containing title and description.
	 *
	 * @example
	 * toast.success("Your action was successful!");
	 * toast.success({ title: "Success", description: "Your action was successful!" });
	 *
	 * @public
	 */
	success(props: CreateToastProps | string) {
		this.#createToast(props, "success"); // Calling createToast with "success" type.
	}

	/**
	 * Creates a warning toast notification.
	 *
	 * This function allows the creation of a warning toast to alert the user
	 * about potential issues or important notices.
	 *
	 * @param props - The properties for the toast, which can be a string message
	 *                or an object containing title and description.
	 *
	 * @example
	 * toast.warning("This is a warning message.");
	 * toast.warning({ title: "Warning", description: "This is a warning message." });
	 *
	 * @public
	 */
	warning(props: CreateToastProps | string) {
		this.#createToast(props, "warning"); // Calling createToast with "warning" type.
	}

	/**
	 * Creates an error toast notification.
	 *
	 * This function allows the creation of an error toast to notify the user
	 * of errors or failures that have occurred.
	 *
	 * @param props - The properties for the toast, which can be a string message
	 *                or an object containing title and description.
	 *
	 * @example
	 * toast.error("An error has occurred!");
	 * toast.error({ title: "Error", description: "An error has occurred!" });
	 *
	 * @public
	 */
	error(props: CreateToastProps | string) {
		this.#createToast(props, "error"); // Calling createToast with "error" type.
	}

	/**
	 * Removes a toast notification by its unique ID.
	 *
	 * This method is intended for internal use only to manage the state of
	 * active toasts by removing them when they are no longer needed.
	 *
	 * @param id - The unique identifier of the toast to be removed.
	 *
	 * @internal
	 *
	 * @private
	 */
	_removeToastById(id: string) {
		this.#toasts.delete(id); // Deleting the toast from the reactive Map by its ID.
	}

	/**
	 * Gets the current list of active toasts.
	 *
	 * This getter provides access to the reactive map of active toasts,
	 * allowing other parts of the application to observe and react to changes.
	 *
	 * @returns A reactive map of active toasts.
	 *
	 * @public
	 */
	get toasts() {
		return this.#toasts; // Returning the reactive Map of active toasts.
	}
}

// Exporting an instance of the Toast class for use in other parts of the application.
export const toast = new Toast();
