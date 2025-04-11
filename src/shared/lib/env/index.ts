import * as v from "valibot";
import { createEnv } from "./env";

export const globalEnv = createEnv({
	client: {
		COMPANY_ID: v.string(),
		DEVICE_NAME: v.string(),
		DEV_USERNAME: v.string(),
		DEV_PASSWORD: v.string(),
		DEV: v.boolean(),
		API_URL: v.string(),
		BASE_URL: v.string(),
	},
	isServer: false,
	runtimeEnvStrict: {
		COMPANY_ID: import.meta.env.VITE_COMPANY_ID,
		DEVICE_NAME: import.meta.env.VITE_DEVICE_NAME,
		DEV_USERNAME: import.meta.env.VITE_DEV_USERNAME,
		DEV_PASSWORD: import.meta.env.VITE_DEV_PASSWORD,
		DEV: import.meta.env.DEV,
		API_URL: import.meta.env.VITE_API_URL,
		BASE_URL: import.meta.env.BASE_URL,
	},
});
