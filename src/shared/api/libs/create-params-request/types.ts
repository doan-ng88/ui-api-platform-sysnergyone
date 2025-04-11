export type ParamKV = {
	Key: string;
	Value: ParamKV_Value;
};

export type ParamKV_Value =
	| string
	| number
	| boolean
	| undefined
	| string[]
	| number[]
	| null;

export interface CreateParamsRequest_Get {
	searchParams: ParamKV[];
}

export interface CreateParamsRequest_Set {
	setUpdateParams: ParamKV[];
}

export type CreateParamsRequest_Type = "get" | "set";
