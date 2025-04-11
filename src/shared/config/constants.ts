import type {
	CommonPaginationRequest,
	CommonPaginationSearchParams,
} from "./types";

export const USER_CODE_KEY = "code";

// Setup LOGIN synergy one path
export const PATH_SETUP_LOGIN = "/api/central-login/auth";

// Setup 2FA synergy one path
export const PATH_SETUP_LOGIN_F2A = "/api/central-login/auth/f2a";

// Order user management synergy one path
export const PATH_ORDER_USER_MANAGEMENT =
	"api/order-user-management-synergy-one";

export const PATH_ORDER_MANAGEMENT = "api/order-management-synergy-one";
export const PATH_ORDER_MANAGEMENT_PLATFORM =
	"api/order-management-platform-synergy-one";
export const PATH_ORDER = "api/order-synergy-one";

export const PATH_INFLUENCER_MANAGEMENT = "api/influencer-synergy-one";

export const DEFAULT_COMMON_PAGINATION_REQUEST: Required<CommonPaginationRequest> =
	{
		endTime: "",
		pageIndex: 1,
		pageSize: 12,
		startTime: "",
		sortField: "updatedAt",
		sortType: "desc",
	};

export const DEFAULT_COMMON_PAGINATION_SEARCH_PARAMS: Required<CommonPaginationSearchParams> =
	{
		endTime: "",
		pageIndex: "1",
		pageSize: "12",
		startTime: "",
		sortField: "updatedAt",
		sortType: "asc",
	} as const;

export const DEFAULT_COMMON_ELASTICSEARCH_PAGE_INDEX_PARAMS = 0;

export const PATH_SECURITY_TWO_STEP_SYNERGY_ONE =
	"security-two-step-synergy-one";

export const PATH_IMAGE = "api/influencer-synergy-one/view-image?image=";

// api platform
export const PATH_API_PLATFORM = "/api/platform/apis";
