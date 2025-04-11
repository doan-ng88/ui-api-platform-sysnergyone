import type { ModelWrapperRef } from "@/shared/config";
import type { ClassValue } from "cva/types";

export type InputSecretEmits = (e: "change", value: string) => void;

export interface InputSecretProps {
	class?: ClassValue;
	placeholder?: string;
	disabled?: boolean;
	id?: string;
	error?: boolean;
	autocomplete?: string;
}

export interface InputSecretStoreProps {
	props: InputSecretProps;
	emits: InputSecretEmits;
	models: {
		model: ModelWrapperRef<string | undefined>;
	};
}
