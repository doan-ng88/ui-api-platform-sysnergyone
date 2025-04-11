import type { ModelWrapperRef } from "@/shared/config"; // Importing the ModelWrapperRef type for model reference.
import type { AirDatepickerLocale } from "air-datepicker"; // Importing the AirDatepickerLocale type for localization support.

/**
 * Represents the properties for the date picker component.
 *
 * @type DatePickerProps
 * @property isTimepicker - Optional flag to enable the time picker functionality.
 * @property disabled - Optional flag to disable the date picker.
 * @property format - Optional string to define the date format.
 * @property locale - Optional locale for the date picker, supporting predefined locales and AirDatepicker locales.
 */
export type DatePickerProps = {
	/** Indicates if the time picker should be enabled. */
	isTimepicker?: boolean;

	/** Indicates if the date picker is disabled. */
	disabled?: boolean;

	/** The placeholder for the date picker. */
	placeholder?: string;

	/** The format for displaying the date. */
	format?: string;

	/** The locale for the date picker. */
	locale?: DatePickerLocale;

	/** Indicates if the date picker is required. */
	required?: boolean;
};

/**
 * Represents the supported locales for the date picker.
 *
 * @type DatePickerLocale
 * @property ko - Korean locale.
 * @property en - English locale.
 * @property vi - Vietnamese locale.
 * @property AirDatepickerLocale - Additional locales from the AirDatepicker library.
 */
export type DatePickerLocale = "ko" | "en" | "vi" | AirDatepickerLocale; // Supported locales for the date picker.

/**
 * Represents the properties required for the date picker store.
 *
 * @interface DatePickerStoreProps
 * @property models - An object containing the model references for the date picker.
 * @property props - The properties for configuring the date picker.
 */
export interface DatePickerStoreProps {
	/** The model reference for the selected date value. */
	models: {
		value: ModelWrapperRef<Date | string | undefined>;
	};
	/** The properties for the date picker. */
	props: DatePickerProps;
}
