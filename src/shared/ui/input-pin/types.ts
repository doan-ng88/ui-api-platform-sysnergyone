/**
 * Represents the emitted events from the input pin component.
 *
 * @type InputPinEmits
 * @param e - The event name, in this case, "complete" when the input pin is completed.
 * @param value - The object containing the completed input pin values.
 */
export type InputPinEmits = (
	e: "complete",
	value: InputPinEmits_Complete,
) => void;

/**
 * Represents the details emitted when the input pin is completed.
 *
 * @interface InputPinEmits_Complete
 * @property value - The array of string values entered in the input fields.
 * @property valueAsString - The concatenated string representation of the input values.
 */
export interface InputPinEmits_Complete {
	/** The array of values entered in the input fields. */
	value: InputPinValue;
	/** The string representation of the input values. */
	valueAsString: string;
}

/**
 * Represents the value type for the input pin, which is an array of strings.
 *
 * @type InputPinValue
 */
export type InputPinValue = string[];

/**
 * Represents the properties for the input pin component.
 *
 * @type InputPinProps
 * @property length - The number of input fields to display.
 * @property disabled - Optional flag indicating whether the input fields are disabled.
 * @property class - Optional additional class name for styling.
 */
export type InputPinProps = {
	/**
	 * The number of inputs to display.
	 *
	 * @default 4
	 */
	length?: number;
	/**
	 * Whether the input is disabled.
	 */
	disabled?: boolean;
	/** Optional class name for additional styling. */
	class?: string;
};
