export interface ApiParameter {
	description: string;
	name: string;
	required: boolean;
	type: string;
	example: string;
}

export interface ApiDetailResponse {
	created_at: string;
	description: string;
	endpoint: string;
	id: number;
	method: string;
	name: string;
	parameters: ApiParameter[];
	platform_id: number;
	platform_name: string;
	updated_at: string;
	version: string;
}
