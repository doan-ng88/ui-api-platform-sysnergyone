import {
	ACCESS_TOKEN_LOCAL_STORAGE_KEY,
	type CommonResponse,
} from "@/shared/config";
import type {
	InputPinEmits_Complete,
	InputPinValue,
} from "@/shared/ui/input-pin";
import { toast } from "@/shared/ui/toast";
import * as m from "@i18n/messages";
import type { AxiosError } from "axios";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { apiVerifyF2A } from "../api/verify-f2a";
import type { VerifyF2AStoreProps } from "../configs/types";

export const useVerifyF2AStore = (storeProps: VerifyF2AStoreProps) => {
	const isLoading = ref(false);

	const otp = ref<InputPinValue>([]);

	const router = useRouter();

	const onSuccess = async (accessToken: string) => {
		// Set verify otp to local storage
		localStorage.setItem(ACCESS_TOKEN_LOCAL_STORAGE_KEY, accessToken);

		// Redirect to home page
		await router.push({ name: "/(cms)/dashboard" });
	};

	const onError = (error: AxiosError) => {
		const _ = error.response?.data as CommonResponse<boolean>;
		toast.error(m.weary_top_hyena_comfort());
		// Reset OTP
		otp.value = [];
	};

	const onValidateOtp = async (otp: InputPinEmits_Complete) => {
		isLoading.value = true;
		try {
			const otpUppercase = otp.valueAsString.toUpperCase();

			// Verify F2A
			const res = await apiVerifyF2A({
				code: otpUppercase,
				email: storeProps.props.email,
				sessionId: storeProps.props.sessionId,
			});

			await onSuccess(res.data.access_token);
		} catch (e) {
			onError(e as AxiosError);
		}
		isLoading.value = false;
	};

	return {
		// States
		otp,
		isLoading,

		// Actions
		onValidateOtp,
	};
};
