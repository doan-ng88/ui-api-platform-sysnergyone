import { globalEnv } from "@/shared/lib/env";
import { createRouter, createWebHistory } from "vue-router";
import { routes } from "vue-router/auto-routes";

export const router = createRouter({
	history: createWebHistory(globalEnv.BASE_URL),
	routes,
});

// // Auth Guard
// router.beforeEach(async (to, _, next) => {
// 	if (to.name === "/document/[group].[id]") {
// 		next();
// 		return;
// 	}

// 	const userDetailsStore = useUserDetailsStore();
// 	const userAccessStore = useUserAccessStore();

// 	const userDetails = await userDetailsStore.getLatestUserDetails();
// 	// next-line: check if route ("to" object) needs authenticated
// 	// ?  If that route need to be authenticated but user is not authenticated, redirect to sign-in
// 	if (to.matched.some((record) => record.meta.requiresAuth) && !userDetails) {
// 		onClearAllAccess();
// 		next({
// 			name: "/auth/sign-in",
// 		});
// 		return;
// 	}

// 	if (userDetailsStore.code && userDetailsStore.id) {
// 		await userAccessStore.getUserAccess(
// 			userDetailsStore.code,
// 			userDetailsStore.id,
// 		);
// 	}

// 	// ? Check if the route is an auth route
// 	const isAuthRoutes = to.name.includes("auth");

// 	// ? If the user is authenticated and the route is an auth route, redirect to home
// 	if (userDetails && userAccessStore.access.length > 0 && isAuthRoutes) {
// 		next({
// 			name: "/(cms)/dashboard",
// 		});
// 		return;
// 	}

// 	// Set verify otp to local storage
// 	const verifyOtp = localStorage.getItem(VERIFY_F2A_LOCAL_STORAGE_KEY);

// 	if (
// 		userDetails &&
// 		userAccessStore.access.length > 0 &&
// 		!verifyOtp &&
// 		to.name !== "/verify-otp"
// 	) {
// 		onClearAllAccess();
// 		next({
// 			name: "/auth/sign-in",
// 		});
// 		return;
// 	}

// 	next();
// });
