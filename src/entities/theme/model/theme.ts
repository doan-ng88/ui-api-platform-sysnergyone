import { defineStore } from "pinia";
import { computed, ref } from "vue";
import {
	darkThemeColors,
	getCurrentTheme,
	getExactTheme,
	lightThemeColors,
} from "../api";
import {
	THEME_LOCAL_STORAGE_KEY,
	THEME_STORE_NAME,
	type ThemeType,
} from "../configs";

export const useThemeStore = defineStore(THEME_STORE_NAME, () => {
	const theme = ref<ThemeType | undefined>(getCurrentTheme());
	const isDark = ref<boolean>(getExactTheme() === "dark");

	const $reset = () => {
		theme.value = getCurrentTheme();
		isDark.value = getExactTheme() === "dark";
	};

	const themeColor = computed(() => {
		return isDark.value ? darkThemeColors : lightThemeColors;
	});

	const onFetchTheme = () => {
		const localStorageTheme =
			localStorage.getItem(THEME_LOCAL_STORAGE_KEY) ?? undefined;

		theme.value = localStorageTheme as ThemeType;
	};

	const themeToggle = (newTheme?: ThemeType) => {
		// Check if the theme is set or leave it to system choice
		if (!newTheme) {
			// Check if the system is not in dark mode
			if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
				localStorage.setItem("theme", "dark");
				document.documentElement.setAttribute("data-theme", "dark");
			} else {
				localStorage.removeItem("theme");
				document.documentElement.removeAttribute("data-theme");
			}

			theme.value = newTheme;
			isDark.value = getExactTheme() === "dark";
			return;
		}

		// If the theme is set, change to theme user choice
		localStorage.setItem("theme", newTheme);
		document.documentElement.setAttribute("data-theme", newTheme);

		theme.value = newTheme;
		isDark.value = getExactTheme() === "dark";
	};

	return {
		// States
		theme,
		isDark,
		themeColor,

		// Actions
		onFetchTheme,
		themeToggle,

		// Reset
		$reset,
	};
});
