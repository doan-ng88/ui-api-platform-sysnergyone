import { globalEnv } from "@/shared/lib/env";
import { toast } from "@/shared/ui/toast";
import * as m from "@i18n/messages";
import { AxiosError } from "axios";
import { computed, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { apiSendNewPassword } from "../api/sent-new-password";

export const useForgotPasswordStep2Store = () => {
	const password = ref("");
	const confirmPassword = ref("");
	const otp = ref("");
	const isLoading = ref(false);

	const route = useRoute();
	const router = useRouter();

	const isConfirmPasswordMatch = computed(() => {
		if (confirmPassword.value === "") {
			return true;
		}

		return password.value === confirmPassword.value;
	});

	const onSubmit = async () => {
		isLoading.value = true;

		const email = route.query.email;
		const companyCode = globalEnv.COMPANY_ID;

		if (typeof email !== "string" || typeof companyCode !== "string") {
			isLoading.value = false;

			return;
		}

		if (password.value !== confirmPassword.value) {
			toast.error(m.free_white_butterfly_approve());
			isLoading.value = false;

			return;
		}

		try {
			await apiSendNewPassword({
				email,
				password: password.value,
				otpVerify: otp.value,
				companyCode,
			});

			toast.success(m.upper_loved_chipmunk_delight());
			router.push({
				name: "/auth/sign-in",
				query: {
					company: companyCode,
				},
			});
		} catch (error) {
			if (error instanceof AxiosError) {
				toast.error(error.message);
			}
		}

		isLoading.value = false;
	};

	return {
		// State
		password,
		confirmPassword,
		isLoading,
		otp,
		isConfirmPasswordMatch,

		// Action
		onSubmit,
	};
};
