import {
	CODE_ADMIN_KEY,
	CODE_KEY,
	ENABLED_KEY,
	PATH_ORDER_USER_MANAGEMENT,
	PERMISSION_ID_KEY,
	ROLE_PERMISSION_ID_KEY,
	USER_APP_ROLE_ID_KEY,
	USER_ID_ADMIN_KEY,
	USER_ID_KEY,
} from "@/shared/config";

import { createPrivateHttp } from "@/shared/api/http/private-http";
import {
	type CreateParamsRequest_Set,
	createParamsRequest,
} from "@/shared/api/libs/create-params-request";

export interface SetUpdateRolePermissionCompanyProps {
	rolePermissionId: string;
	userId: string;
	userIdAdmin: string;
	codeAdmin: string;
	code: string;
	enabled: boolean;
	userAppRoleId: string;
	permissionId: string;
	fullName: string;
}

// Get user details
export const setUpdateRolePermissionCompany = async (
	props: SetUpdateRolePermissionCompanyProps,
) => {
	const body = extractBodyRequest(props);

	await apiSetUpdateRolePermissionCompany(body);
};

const extractBodyRequest = (props: SetUpdateRolePermissionCompanyProps) => {
	const params = createParamsRequest("set", [
		{
			Key: ROLE_PERMISSION_ID_KEY,
			Value: props.rolePermissionId,
		},
		{
			Key: USER_ID_ADMIN_KEY,
			Value: props.userIdAdmin,
		},
		{
			Key: CODE_ADMIN_KEY,
			Value: props.codeAdmin,
		},
		{
			Key: USER_ID_KEY,
			Value: props.userId,
		},
		{
			Key: CODE_KEY,
			Value: props.code,
		},
		{
			Key: USER_APP_ROLE_ID_KEY,
			Value: props.userAppRoleId,
		},
		{
			Key: PERMISSION_ID_KEY,
			Value: props.permissionId,
		},
		{
			Key: ENABLED_KEY,
			Value: props.enabled,
		},
	]);

	return params;
};

const apiSetUpdateRolePermissionCompany = async (
	body: CreateParamsRequest_Set,
) => {
	const path = `${PATH_ORDER_USER_MANAGEMENT}/set-update-role-permission-company`;

	const http = await createPrivateHttp({ permission: "SET" });

	const res = await http.post(path, body);

	return res;
};
