import { globalEnv } from "@/shared/lib/env";
import axios from "axios";

export const publicHttp = axios.create({
	baseURL: globalEnv.API_URL,
	headers: {
		"Content-type": "application/json",
	},
});
