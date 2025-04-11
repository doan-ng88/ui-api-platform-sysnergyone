import type { CommonResponse } from "@/shared/config";
import { globalEnv } from "@/shared/lib/env";
import { toast } from "@/shared/ui/toast";
import * as m from "@i18n/messages";
import axios, { type AxiosError } from "axios";
import { useRouter } from "vue-router";
import { onClearAllAccess } from "../../libs/clear-all";

export const http = axios.create({
	baseURL: globalEnv.API_URL,
	headers: {
		"Content-type": "application/json",
	},
});

// config axios reponse API getway
http.interceptors.response.use(
	(res) => {
		return res;
	},
	(error: AxiosError) => {
		const router = useRouter();

		if (!error.response) {
			onClearAllAccess();
			router.push({ name: "/auth/sign-in" });

			return;
		}

		if (error.code === "ECONNABORTED" && error.message.includes("timeout")) {
			toast.error(m.extra_careful_okapi_edit());
			if (!error.response.data) {
				error.response.data = {
					errorMessage: "timeout",
				};
			}
		}
		// api status Forbidden => clear token on cookies end logout
		if (error.response.status === 401) {
			onClearAllAccess();

			router.push({ name: "/auth/sign-in" });
			return;
		}

		// ! This is common error response, only catch error message that not include in handleErrors
		const _ = error.response.data as CommonResponse<null>;

		return Promise.reject(error);
	},
);
