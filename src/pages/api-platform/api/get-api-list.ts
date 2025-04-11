import { getPlatformApis } from "@/shared/api/endpoints/get-platform-apis/get-platform-apis";
import { toast } from "@/shared/ui/toast";
import type { Api, ApiParam } from "../configs/types";

export interface ApiListProps {
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

export const apiGetApiList = async (
	props: ApiListProps,
): Promise<{ total: number; apis: Api[] }> => {
	try {
		const data = await getPlatformApis(props);

		return {
			total: data.Total,
			apis: data.APIs.map(
				(api): Api => ({
					id: api.ID,
					name: api.Name,
					endpoint: api.Endpoint,
					method: api.Method,
					platformId: api.PlatformID,
					platformName: api.PlatformName,
					version: api.Version,
					description: api.Description,
					params:
						api.Params === null
							? []
							: api.Params.map(
									(param): ApiParam => ({
										id: param.ID,
										apiId: param.APIID,
										name: param.Name,
										type: param.Type,
										required: param.Required,
										description: param.Description,
										example: param.Example,
										createdAt: param.CreatedAt,
										updatedAt: param.UpdatedAt,
										deletedAt: param.DeletedAt,
									}),
								),
					createdAt: api.CreatedAt,
					updatedAt: api.UpdatedAt,
					deletedAt: api.DeletedAt,
				}),
			),
		};
	} catch (error) {
		toast.error(`Failed to fetch API list: ${error}`);
		throw error;
	}
};

// Định nghĩa interface cho platform
export interface Platform {
	id: number;
	name: string;
	apis: Api[];
}

/**
 * Nhóm các API theo platform ID
 * @param apis Danh sách API
 * @returns Danh sách các platform và API tương ứng
 */
export const groupApisByPlatform = (apis: Api[]): Platform[] => {
	// Tạo một Map để nhóm các API theo platformId
	const platformMap = new Map<number, Platform>();

	// Lặp qua tất cả API và nhóm chúng theo platformId
	for (const api of apis) {
		const platformId = api.platformId;

		// Nếu platform chưa có trong Map, thêm mới
		if (!platformMap.has(platformId)) {
			platformMap.set(platformId, {
				id: platformId,
				name: api.platformName,
				apis: [],
			});
		}

		// Thêm API vào platform tương ứng
		platformMap.get(platformId)?.apis.push(api);
	}

	// Chuyển đổi Map thành mảng platforms
	return Array.from(platformMap.values());
};

/**
 * Lấy danh sách API được phân loại theo platform
 * @param props Tham số truy vấn
 * @returns Danh sách platforms kèm API tương ứng
 */
export const getApisByPlatform = async (
	props: ApiListProps,
): Promise<{ total: number; platforms: Platform[] }> => {
	try {
		// Sử dụng hàm getApiList đã có
		const { total, apis } = await apiGetApiList(props);

		// Nhóm API theo platform
		const platforms = groupApisByPlatform(apis);

		return { total, platforms };
	} catch (error) {
		toast.error(`Failed to group APIs by platform: ${error}`);
		throw error;
	}
};

/**
 * Lấy danh sách API cho một platform cụ thể
 * @param platformId ID của platform
 * @param props Tham số truy vấn
 * @returns Danh sách API của platform
 */
export const getApisByPlatformId = async (
	platformId: number,
	props: Omit<ApiListProps, "platform_id"> = {},
): Promise<{ total: number; apis: Api[] }> => {
	try {
		// Thêm platform_id vào props
		const queryParams: ApiListProps = {
			...props,
			platform_id: platformId,
		};

		// Gọi API với platform_id đã được chỉ định
		return await apiGetApiList(queryParams);
	} catch (error) {
		toast.error(`Failed to fetch APIs for platform ${platformId}: ${error}`);
		throw error;
	}
};

// Các xử lý logic liên quan đến API sẽ làm ở trong file này
// Các xử lý logic của UI sẽ làm trong folder model
