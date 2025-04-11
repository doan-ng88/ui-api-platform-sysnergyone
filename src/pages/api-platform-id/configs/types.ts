export interface ApiGetApiId {
	id: number;
	name: string;
	endpoint: string;
	method: string;
	platform_id: number;
	platform_name: string;
	version: string;
	description: string;
	parameters: ApiParam[];
	created_at: string;
	updated_at: string;
}

export interface ApiParam {
	name: string;
	type: string;
	required: boolean;
	description: string;
	example: string;
}
