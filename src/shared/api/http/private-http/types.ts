export interface CreatePrivateHttpProps {
	permission: GetAccessTokenPermission;
}

export type GetAccessTokenPermission = "GET" | "SET";

export interface ApiGetAccessTokenProps {
	userId: string;
	permission: GetAccessTokenPermission;
	device: string;
	ip: string;
}
