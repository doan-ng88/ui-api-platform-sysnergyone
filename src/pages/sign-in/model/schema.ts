import { toast } from "@/shared/ui/toast";
import * as m from "@i18n/messages";
import * as v from "valibot";

export type SignInProps = v.InferOutput<typeof validateSignInSchema>;

const validateSignInSchema = v.object({
	email: v.string(),
	password: v.string(),
});

export const validateSignInProps = (props: SignInProps) => {
	try {
		const res = v.parse(validateSignInSchema, props);

		return res;
	} catch (_) {
		toast.error(m.merry_knotty_marten_sew());
	}
};
