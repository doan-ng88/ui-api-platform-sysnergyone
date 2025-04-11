import { toast } from "@/shared/ui/toast";
import * as m from "@i18n/messages";
import type { AxiosError } from "axios";
import { ref } from "vue";
import { useRouter } from "vue-router";

import { apiRegister } from "../api/register";
import {
	ERROR_CONNECTION_FAILED,
	ERROR_REGISTRATION_FAILED,
	ERROR_SERVER_ERROR,
	REGISTRATION_SUCCESS,
} from "../configs/constants";
import { validateRegisterProps } from "./schema";

// Lưu thông tin registration token và deadline trong localStorage
const REGISTRATION_TOKEN_KEY = "registration_token";
const REGISTRATION_DATA_KEY = "registration_data";

interface RegistrationData {
	user_id: number;
	email: string;
	verification_deadline: string;
	two_factor: {
		secret: string;
		qr_code: string;
	};
	confirmation_endpoint: string;
}

export const useRegister = () => {
	const email = ref("");
	const password = ref("");
	const full_name = ref("");
	const phone = ref("");
	const department_id = ref<number>(12);
	const position_id = ref<number>(1);

	const isRegisterLoading = ref(false);

	// Sử dụng cả hai phương pháp chuyển hướng
	const router = useRouter();

	const onRegisterSuccess = async (data: RegistrationData) => {
		try {
			// Lưu thông tin vào localStorage
			localStorage.setItem(
				REGISTRATION_DATA_KEY,
				JSON.stringify({
					user_id: data.user_id,
					email: data.email,
					verification_deadline: data.verification_deadline,
				}),
			);

			// Lấy token từ confirmation_endpoint
			const tokenParam = data.confirmation_endpoint.split("token=")[1];
			if (tokenParam) {
				localStorage.setItem(REGISTRATION_TOKEN_KEY, tokenParam);
			}

			// Lưu QR code và secret tạm thời trong localStorage
			localStorage.setItem("temp_qrcode", data.two_factor.qr_code);
			localStorage.setItem("temp_secret", data.two_factor.secret);

			// Hiển thị thông báo thành công
			toast.success(REGISTRATION_SUCCESS);

			// Cố gắng sử dụng router trước
			try {
				await router.push({
					path: "/setup-2fa",
				});
			} catch (routerError) {
				// Nếu router.push thất bại, sử dụng location.href
				toast.info("Redirecting to setup 2FA page...");
				window.location.href = "/setup-2fa";
			}
		} catch (e) {
			toast.error(
				`Error during registration process: ${m.stock_sound_clownfish_leap()}`,
			);
			isRegisterLoading.value = false;
		}
	};

	const onRegisterError = (error: AxiosError) => {
		if (!error.response) {
			// Network error or CORS issues
			if (error.message === "Network Error") {
				toast.error(
					"CORS error: Cannot access the API directly from browser. Please configure a proxy server or enable CORS on the API server.",
				);
			} else {
				toast.error(`${ERROR_CONNECTION_FAILED}: ${error.message}`);
			}
			return;
		}

		const status = error.response.status;
		const data = error.response.data as { message?: string; error?: string };

		if (status === 400) {
			// Bad request - có thể là lỗi validation
			toast.error(data.message || data.error || ERROR_REGISTRATION_FAILED);
		} else if (status === 409) {
			// Conflict - email đã tồn tại
			toast.error(data.message || "Email already exists");
		} else if (status >= 500) {
			// Lỗi server
			toast.error(ERROR_SERVER_ERROR);
		} else {
			// Các lỗi khác
			toast.error(
				data.message ||
					data.error ||
					`${ERROR_REGISTRATION_FAILED} (${status})`,
			);
		}
	};

	const onRegister = async () => {
		isRegisterLoading.value = true;
		toast.info("Processing registration...");

		// validate register props
		const registerProps = validateRegisterProps({
			email: email.value,
			password: password.value,
			full_name: full_name.value,
			phone: phone.value,
			department_id: department_id.value,
			position_id: position_id.value,
		});

		// return if props are invalid
		if (!registerProps) {
			isRegisterLoading.value = false;
			return;
		}

		try {
			// Register user
			const res = await apiRegister({
				email: registerProps.email,
				password: registerProps.password,
				full_name: registerProps.full_name,
				phone: registerProps.phone,
				department_id: registerProps.department_id,
				position_id: registerProps.position_id,
			});

			// Return if registration failed
			if (!res) {
				toast.error(ERROR_REGISTRATION_FAILED);
				isRegisterLoading.value = false;
				return;
			}

			// Kiểm tra response và xử lý theo status
			if (res.status === "pending_2fa" && res.data) {
				// Đăng ký thành công, chuyển đến bước thiết lập 2FA
				await onRegisterSuccess(res.data);
			} else {
				// Xử lý các status khác nếu có
				toast.error(res.message || ERROR_REGISTRATION_FAILED);
				isRegisterLoading.value = false;
			}
		} catch (error) {
			onRegisterError(error as AxiosError);
			isRegisterLoading.value = false;
		}
	};

	return {
		// States
		email,
		password,
		full_name,
		phone,
		department_id,
		position_id,
		isRegisterLoading,

		// Actions
		onRegister,
	};
};
