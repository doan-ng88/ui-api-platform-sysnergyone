import { useUserDetailsStore } from "../../models/user-details";
import type {
	CreateParamsRequest_Get,
	CreateParamsRequest_Set,
	CreateParamsRequest_Type,
	ParamKV,
	ParamKV_Value,
} from "./types";

export const createParamsRequest = <
	Options extends Record<string, unknown>,
	T extends CreateParamsRequest_Type = CreateParamsRequest_Type,
	R = T extends "get" ? CreateParamsRequest_Get : CreateParamsRequest_Set,
>(
	type: T,
	params: ParamKV[],
	options?: Options,
): R => {
	const useUserDetails = useUserDetailsStore();
	if (type === "get") {
		return {
			...options,
			searchParams: createParams(params),
			userCode: useUserDetails.code,
		} as R;
	}

	return {
		...options,
		setUpdateParams: createParams(params),
		userCode: useUserDetails.code,
	} as R;
};

export const createParams = (params: ParamKV[]): ParamKV[] => {
	const filteredParams = params.reduce((prev, param) => {
		if (
			param.Value === undefined ||
			param.Value === "" ||
			param.Value === null
		) {
			return prev;
		}
		prev.push({
			...param,
			Value: valueToString(param.Value),
		});

		return prev;
	}, [] as ParamKV[]);

	return filteredParams;
};

const valueToString = (value: ParamKV_Value) => {
	if (typeof value === "number") {
		return String(value);
	}

	if (typeof value === "boolean") {
		return value === true ? "true" : "false";
	}

	return value;
};
