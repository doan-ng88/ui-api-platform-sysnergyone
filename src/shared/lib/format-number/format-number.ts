export const formatNumber = (amount: number | string, locale = "vi-VN") => {
	const amountNumber = Number(amount);
	return new Intl.NumberFormat(locale, {
		style: "decimal",
	}).format(amountNumber);
};
