export const isFunction = (
	value: unknown,
): value is (...args: unknown[]) => unknown => {
	return typeof value === "function";
};

export const isArray = (value: unknown): value is unknown[] => {
	return Array.isArray(value);
};

/**
 * Checks if a given string is a valid timestamp.
 *
 * A valid timestamp is a string that can be converted to a number
 * and represents a valid date when passed to the Date constructor.
 *
 * @param value - The value to check.
 * @returns True if the value is a valid timestamp, false otherwise.
 *
 * @example
 * isValidTimestamp("1633072800000"); // returns true
 * isValidTimestamp("invalid"); // returns false
 */
export const isValidTimestamp = (value: unknown): value is string => {
	// Attempt to convert the string to a number
	const timestamp = Number(value);

	// Check if the conversion is valid and if it represents a valid date
	return (
		!Number.isNaN(timestamp) &&
		timestamp > 0 &&
		new Date(timestamp).getTime() === timestamp
	);
};
