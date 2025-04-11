export interface ApiListQueryParams {
	limit?: number;
	offset?: number;
	search?: string;
	platform_id?: number;
	method?: string;
	version?: string;
	sort_by?: "name" | "created_at" | "updated_at";
	sort_order?: "asc" | "desc";
	start_date?: string;
	end_date?: string;
}

export interface ApiParam {
	ID: number;
	APIID: number;
	Name: string;
	Type: string;
	Required: boolean;
	Description: string;
	Example: string;
	CreatedAt: string;
	UpdatedAt: string;
	DeletedAt: string | null;
}

export interface Api {
	ID: number;
	Name: string;
	Endpoint: string;
	Method: string;
	PlatformID: number;
	PlatformName: string;
	Version: string;
	Description: string;
	Params: ApiParam[] | null;
	CreatedAt: string;
	UpdatedAt: string;
	DeletedAt: string;
}

export interface ApiListResponse {
	status: string;
	message: string;
	code: string;
	data: {
		Total: number;
		APIs: Api[];
	};
	time: string;
}
