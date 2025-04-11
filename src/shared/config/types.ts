import type { ModelRef } from "vue";

export enum BooleanString {
	TRUE = "true",
	FALSE = "false",
}

export interface CommonPaginationRequest {
	sortField?: string;
	sortType?: "desc" | "asc";
	pageIndex?: number;
	pageSize?: number;
	startTime?: string;
	endTime?: string;
}

export type CommonPaginationSearchParams = {
	sortField?: string;
	sortType?: "desc" | "asc";
	pageIndex?: string;
	pageSize?: string;
	startTime?: string;
	endTime?: string;
};

export interface CommonPaginationResponse {
	total_count: number;
	page_index: number;
	page_size: number;
}

export interface CommonPagination {
	totalCount: number;
	pageIndex: number;
	pageSize: number;
}

export interface CommonResponse<T> {
	data: T;
	status: string;
	message: string;
	suggestion?: string;
}

export type ModelWrapperRef<T> = ModelRef<T, string, T, T>;
