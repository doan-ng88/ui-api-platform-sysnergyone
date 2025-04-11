export interface Props {
	title: string;
}

export type Slots = {
	content?(): unknown;
	default?(): unknown;
};
