export const isStringPositiveNumber = (n: string) => {
	return (
		Number.parseInt(n) % +(!Number.isNaN(Number.parseInt(n)) && ~~n >= 0) === 0
	);
};
