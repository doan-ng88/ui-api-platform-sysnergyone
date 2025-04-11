import { getLocale } from "@i18n/runtime";
import { enUS, ko, vi } from "date-fns/locale";

export const dateFnsLocale = () => {
	const lang = getLocale();
	if (lang === "vi") {
		return vi;
	}
	if (lang === "ko") {
		return ko;
	}
	return enUS;
};
