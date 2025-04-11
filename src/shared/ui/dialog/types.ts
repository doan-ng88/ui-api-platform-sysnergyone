export interface DialogProps {
	title?: string;
	description?: string;
	size?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13;
}

export type DialogEmits = {
	(e: "change", open: boolean): void;
	(e: "close", open: boolean): void;
};
