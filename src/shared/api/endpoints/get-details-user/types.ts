export interface UserData {
	userID: number;
	ownerCompanyID: number;
	code: string;
	companyID: number;
	companyAppAccess: CompanyAppAccess[] | null;
	departmentName: string;
	companyCode: string;
	userName: string;
	fullName: string;
	email: string;
	phoneNumber: string;
	createTime: string;
	updateTime: string;
	numberCheckPermission: string;
	userAppAccess: UserAppAccess[] | null;
	// TODO: re-check this type if this feature is used
	pagePermission: unknown[] | null; // Assuming this is an array of unknown structure
	teamUser: unknown[] | null; // Assuming this is an array of unknown structure
	enabled: boolean; // Check if user is enabled
}

export interface RolePermission {
	numberCheckPermission: string;
	numberCheckPermissionCompany: string;
	appID: number;
	companyID: number;
	roleID: number;
	permissionID: number;
	rolePermissionID: number;
	userAppRoleID: number;
	permissionName: RolePermission_Name | null;
	description: string;
	enabled: boolean;
}

export enum RolePermission_Name {
	GET = "GET",
	SET = "SET",
}

export interface UserAppRole {
	numberCheckPermission: string;
	numberCheckPermissionCompany: string;
	appID: number;
	companyID: number;
	roleID: number;
	userAppRoleID: number;
	userAppAccessID: number;
	enabled: boolean;
	roleName: string;
	description: string;
	rolePermission: RolePermission[] | null;
}

export interface UserAppAccess {
	numberCheckPermission: string;
	appID: number;
	userAppAccessID: number;
	appName: string;
	requestUrl: string;
	logoUrl: string;
	description: string;
	companyID: number;
	userID: number;
	userAppRole: UserAppRole[] | null;
}

export interface CompanyAppAccess {
	numberCheckPermission: string;
	companyAppAccessID: number;
	companyName: string;
	companyID: number;
	appID: number;
	appName: string;
	totalUser: number;
	createTime: string;
	updateTime: string;
	enabled: boolean;
}

export interface GetUserDetailsProps {
	userId: string;
	code: string;
}
