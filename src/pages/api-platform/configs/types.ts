export interface ApiParam {
	id: number;
	apiId: number;
	name: string;
	type: string;
	required: boolean;
	description: string;
	example: string;
	createdAt: string;
	updatedAt: string;
	deletedAt: string | null;
}

export interface Api {
	id: number;
	name: string;
	endpoint: string;
	method: string;
	platformId: number;
	platformName: string;
	version: string;
	description: string;
	params: ApiParam[] | null;
	createdAt: string;
	updatedAt: string;
	deletedAt: string;
}
