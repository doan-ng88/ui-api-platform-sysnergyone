import {
	type RolePermission,
	RolePermission_Name,
} from "@/shared/api/endpoints/get-details-user/types";

export const getRolesPermission = (
	roles?: RolePermission[],
): RolePermission_Name[] => {
	if (!roles) {
		return [];
	}

	return roles.map((role) => {
		return role.permissionName as RolePermission_Name;
	});
};

export const getRolesAllowEdit = (
	rolesPermission?: RolePermission[] | null,
): boolean => {
	if (!rolesPermission) {
		return false;
	}

	const roles = getRolesPermission(rolesPermission);
	for (const role of roles) {
		if (role === RolePermission_Name.SET) {
			return true;
		}
	}

	return false;
};
