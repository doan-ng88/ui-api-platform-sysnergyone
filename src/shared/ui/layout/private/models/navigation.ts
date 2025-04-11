import { onClearAllAccess } from "@/shared/api";
import { useRouter } from "vue-router";

export const useNavigationStore = () => {
	const router = useRouter();

	const onSignOut = () => {
		onClearAllAccess();
		router.push({ name: "/auth/sign-in" });
	};

	return {
		// Actions
		onSignOut,
	};
};
