export interface ColOptions {
	thClassName?: string;
	tdClassName?: string;
	cellClassName?: string;
}

// table
export interface TableProps<T extends object, F extends string> {
	data?: T[]; //data truyen vo, la list
	fields: F[] | readonly F[]; //field la key cua object, la key of object tren data
	dataKey?: (value: T) => string;
	headers?: Partial<Record<F, string>>;
	colOptions?: Partial<Record<F, ColOptions>>;
	// emptyMessage?: React.ReactNode;
	cells?: (value: T) => Partial<Record<F, string | number | boolean>>; //cells la value cua object, la value of object tren data, return is object of key-value
	hasMore?: boolean;
	onLoadMore?: () => void;
	loading?: boolean;
	loadingMessage?: string;
}

export interface THeadProps<F extends string>
	extends Pick<TableProps<object, F>, "fields" | "headers" | "colOptions"> {}

export interface EmptyProps<F extends string>
	extends Pick<TableProps<object, F>, "fields"> {}
