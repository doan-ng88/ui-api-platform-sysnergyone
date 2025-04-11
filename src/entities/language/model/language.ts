import { type Locale, getLocale, setLocale } from "@i18n/runtime";
import { defineStore } from "pinia";
import { LANGUAGE_STORE_NAME } from "../configs";

export interface UseLanguageStore_State {
	language: Locale;
}

export const useLanguageStore = defineStore(LANGUAGE_STORE_NAME, {
	state: (): UseLanguageStore_State => ({
		language: getLocale(),
	}),
	actions: {
		toggleLanguage(newLang: Locale) {
			setLocale(newLang);
		},
	},
});
