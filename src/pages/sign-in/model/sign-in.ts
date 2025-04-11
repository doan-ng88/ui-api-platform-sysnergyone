import { ACCESS_TOKEN_LOCAL_STORAGE_KEY } from "@/shared/config";
import { toast } from "@/shared/ui/toast";
import * as m from "@i18n/messages";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { apiSignIn } from "../api/sign-in";
import { SIGNIN_REQUIRE_F2A_STATUS } from "../configs/constants";
import { validateSignInProps } from "./schema";

export const useSignIn = () => {
	const email = ref("");
	const password = ref("");
	const sessionId = ref<number>();

	const isVerifyUserLoading = ref(false);

	const router = useRouter();

	const onSignIn = async () => {
		isVerifyUserLoading.value = true;

		// validate sign in props
		const signInProps = validateSignInProps({
			email: email.value,
			password: password.value,
		});

		// return if props are invalid
		if (!signInProps) {
			return;
		}

		try {
			// Sign in
			const res = await apiSignIn({
				email: signInProps.email,
				password: signInProps.password,
			});

			// Return if sign in failed
			if (res.status === "error") {
				toast.error(m.merry_knotty_marten_sew());
				isVerifyUserLoading.value = false;

				return;
			}

			if (res.status !== SIGNIN_REQUIRE_F2A_STATUS) {
				localStorage.setItem(
					ACCESS_TOKEN_LOCAL_STORAGE_KEY,
					res.data.access_token,
				);
				await router.push({ name: "/(cms)/dashboard" });
				return;
			}

			sessionId.value = res.data.session_id;
		} catch (_) {
			toast.error(m.merry_knotty_marten_sew());
		}

		isVerifyUserLoading.value = false;
	};

	return {
		// States
		email,
		password,

		isVerifyUserLoading,

		sessionId,

		// Actions
		onSignIn,
	};
};
