import { useTokensStore } from "../models/tokens";
import { useUserAccessStore } from "../models/user-access";
import { useUserDetailsStore } from "../models/user-details";

export const onClearAllAccess = () => {
	const tokensStore = useTokensStore();
	const userDetailsStore = useUserDetailsStore();
	const userAccessStore = useUserAccessStore();

	tokensStore.reset();
	userDetailsStore.reset();
	userAccessStore.$reset();
};
