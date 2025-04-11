import { inputDatetimePickerLocales } from "@/shared/ui/input-datetime-picker";
import { getLocale } from "../i18n/runtime";

export const getLocaleDatePicker = () => {
	const locale = getLocale();

	if (locale === "ko") {
		return inputDatetimePickerLocales.ko;
	}
	if (locale === "vi") {
		return inputDatetimePickerLocales.vi;
	}
	return inputDatetimePickerLocales.en;
};
