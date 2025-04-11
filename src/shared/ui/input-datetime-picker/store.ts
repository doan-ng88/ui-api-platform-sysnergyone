import { ref } from "vue"; // Importing ref from Vue for reactive state management.

import { dateToTimeStamp } from "@/shared/lib/date-to-timestamp";
import { isArray, isValidTimestamp } from "@/shared/lib/typeof"; // Importing isArray utility function to check if a value is an array.
import { useDebounceFn } from "@vueuse/core";
import AirDatepicker from "air-datepicker"; // Importing AirDatepicker for date picking functionality.
import { onMounted, onUnmounted, watch } from "vue"; // Importing lifecycle hooks and watch from Vue.
import {
	DEBOUNCE_SELECT_DATE_TIME,
	inputDatetimePickerLocales,
} from "./constants"; // Importing date picker locales for localization support.
import type { DatePickerLocale, DatePickerStoreProps } from "./types"; // Importing types for props and locale.

/**
 * Custom hook to manage the state and behavior of a date picker component.
 *
 * This hook initializes the date picker, handles locale extraction,
 * and manages the selected date state reactively.
 *
 * @param props - The properties for the date picker store.
 * @returns An object containing references to the input and date picker.
 *
 * @public
 * @example
 * const { inputRef, datePickerRef } = useDatePickerStore({
 *     props: { isTimepicker: true, locale: "en" },
 *     models: { value: ref(new Date()) }
 * });
 */
export const useDatePickerStore = (props: DatePickerStoreProps) => {
	const inputRef = ref<HTMLInputElement>(); // Reactive reference for the input element.

	const datePickerRef = ref<AirDatepicker>(); // Reactive reference for the AirDatepicker instance.

	/**
	 * Extracts the appropriate locale for the date picker.
	 *
	 * This function checks the provided locale and returns the corresponding
	 * locale object for the AirDatepicker.
	 *
	 * @private
	 */
	const extractLocale = (locale?: DatePickerLocale) => {
		if (typeof locale === "string") {
			if (locale === "ko") {
				return inputDatetimePickerLocales.ko; // Returns Korean locale.
			}
			if (locale === "vi") {
				return inputDatetimePickerLocales.vi; // Returns Vietnamese locale.
			}
			if (locale === "en") {
				return inputDatetimePickerLocales.en; // Returns English locale.
			}
		}
		if (locale === undefined) {
			return inputDatetimePickerLocales.en; // Defaults to English if no locale is provided.
		}
		return locale; // Returns the provided locale if it is not a string.
	};

	/**
	 * Initializes the AirDatepicker instance.
	 *
	 * This function sets up the date picker with the specified options and
	 * binds it to the input element.
	 *
	 * @private
	 */
	const initDatePicker = () => {
		if (!inputRef.value) {
			return; // Exits if the input reference is not set.
		}

		const selectedDate = extractDate(props.models.value.value); // Extracts the new date from the model.

		datePickerRef.value = new AirDatepicker(inputRef.value, {
			timepicker: props.props.isTimepicker, // Enables time picker if specified.
			onSelect: selectDateDebounce,
			locale: extractLocale(props.props.locale), // Sets the locale for the date picker.
			selectedDates: selectedDate ? [selectedDate] : [], // Initializes selected dates.
			buttons: ["clear"],
		});
	};

	/**
	 * Debounced function to handle date selection.
	 *
	 * This function updates the model value based on the selected date
	 * after a debounce period to optimize performance.
	 *
	 * @private
	 */
	const selectDateDebounce = useDebounceFn(
		(date: {
			date: Date | Date[];
			formattedDate: string | string[];
			datepicker: AirDatepicker<HTMLInputElement>;
		}) => {
			// Updates the model value based on the selected date.
			if (isArray(date.date)) {
				props.models.value.value = dateToTimeStamp(date.date[0]); // Sets the first date if an array is returned.
			} else {
				props.models.value.value = dateToTimeStamp(date.date); // Sets the selected date.
			}
		},
		DEBOUNCE_SELECT_DATE_TIME,
	);

	// Lifecycle hook to initialize the date picker when the component is mounted.
	onMounted(() => {
		initDatePicker(); // Calls the function to initialize the date picker.
	});

	// Lifecycle hook to clean up the date picker when the component is unmounted.
	onUnmounted(() => {
		datePickerRef.value?.destroy(); // Destroys the date picker instance to free resources.
	});

	// Watcher to react to changes in the model value.
	watch(props.models.value, (newVal) => {
		if (!datePickerRef.value) {
			return; // Exits if the date picker reference is not set.
		}

		const newDate = extractDate(newVal); // Extracts the new date from the model.
		if (
			newDate?.getTime() === datePickerRef.value.selectedDates[0]?.getTime()
		) {
			return; // Exits if the new value is the same as the selected date.
		}

		if (!newDate) {
			datePickerRef.value?.clear(); // Clears the date picker if the new value is null.
			return;
		}

		datePickerRef.value?.selectDate(newDate); // Selects the new date in the date picker.
	});

	// Returns the input and date picker references for use in the component.
	return {
		inputRef, // Reference to the input element.
		datePickerRef, // Reference to the AirDatepicker instance.
	};
};

/**
 * Extracts a Date object from a given value.
 *
 * This function checks if the input is a valid timestamp or a string
 * and converts it to a Date object.
 *
 * @param date - The input value which can be a Date, string, or undefined.
 * @returns A Date object if the input is valid, otherwise undefined.
 *
 * @private
 */
const extractDate = (date: Date | string | undefined) => {
	if (isValidTimestamp(date)) {
		return new Date(Number(date) * 1000); // Converts valid timestamp string to Date.
	}
	if (typeof date === "string") {
		return new Date(date); // Converts string to Date.
	}

	return date;
};
