import {
	DATA_THEME_LOCAL_STORAGE_KEY,
	THEME_LOCAL_STORAGE_KEY,
	type ThemeType,
} from "../configs";

/**
 * Get current theme
 * @returns ThemeType
 */
export const getCurrentTheme = (): ThemeType | undefined => {
	const theme = localStorage.getItem(THEME_LOCAL_STORAGE_KEY);

	if (!theme) {
		// Check if the system is not in dark mode
		if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
			localStorage.setItem(THEME_LOCAL_STORAGE_KEY, "dark");
			document.documentElement.setAttribute(
				DATA_THEME_LOCAL_STORAGE_KEY,
				"dark",
			);
			return;
		}

		// If the system is in dark mode, remove the theme from local storage and remove the attribute from the document
		localStorage.removeItem(THEME_LOCAL_STORAGE_KEY);
		document.documentElement.removeAttribute(DATA_THEME_LOCAL_STORAGE_KEY);
		return;
	}

	return theme as ThemeType;
};

export const getExactTheme = (): ThemeType => {
	const theme = localStorage.getItem(THEME_LOCAL_STORAGE_KEY);

	if (!theme) {
		// Check if the system is not in dark mode
		if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
			return "dark";
		}

		// If the system is in dark mode, remove the theme from local storage and remove the attribute from the document
		return "light";
	}

	return theme as ThemeType;
};
