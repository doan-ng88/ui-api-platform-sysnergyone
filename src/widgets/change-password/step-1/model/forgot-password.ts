import { toast } from "@/shared/ui/toast";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { apiSendOtp } from "../api/send-otp";

export const useForgotPasswordStep1Store = () => {
	const email = ref("");
	const isLoading = ref(false);

	const router = useRouter();

	const onSubmit = async () => {
		isLoading.value = true;

		try {
			const isSuccess = await apiSendOtp({
				email: email.value,
				code: email.value,
			});

			if (isSuccess) {
				router.push({
					query: { email: email.value },
				});
			} else {
				toast.error("Something went wrong");
			}
		} catch (_error) {
			toast.error("Something went wrong");
		}

		isLoading.value = false;
	};

	return {
		// State
		email,
		isLoading,

		// Action
		onSubmit,
	};
};
