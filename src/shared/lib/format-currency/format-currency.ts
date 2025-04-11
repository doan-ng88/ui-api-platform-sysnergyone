export const formatCurrency = (
	amount: number | string,
	currency = "VND",
	locale = "vi-VN",
) => {
	const amountNumber = Number(amount);
	return new Intl.NumberFormat(locale, {
		style: "currency",
		currency: currency,
	}).format(amountNumber);
};
