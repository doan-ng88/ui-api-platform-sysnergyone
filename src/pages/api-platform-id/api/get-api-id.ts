import { getPlatformApisId } from "@/shared/api/endpoints/get-platform-apis-id";
import { toast } from "@/shared/ui/toast";
import type { ApiGetApiId, ApiParam } from "../configs/types";

export interface ApiGetApiProps {
	id: string | number;
}

export const apiGetApiId = async (
	props: ApiGetApiProps,
): Promise<ApiGetApiId> => {
	try {
		const data = await getPlatformApisId(props.id);

		return {
			id: data.id,
			name: data.name,
			endpoint: data.endpoint,
			method: data.method,
			platform_id: data.platform_id,
			platform_name: data.platform_name,
			version: data.version,
			description: data.description,
			parameters:
				data.parameters === null
					? []
					: data.parameters.map(
							(param): ApiParam => ({
								name: param.name,
								type: param.type,
								required: param.required,
								description: param.description,
								example: param.example,
							}),
						),
			created_at: data.created_at,
			updated_at: data.updated_at,
		};
	} catch (error) {
		toast.error(`Failed to fetch API list: ${error}`);
		throw error;
	}
};
