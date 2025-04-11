import { toast } from "@/shared/ui/toast";
import * as m from "@i18n/messages";
import * as v from "valibot";

export type RegisterProps = v.InferOutput<typeof validateRegisterSchema>;

// Định nghĩa schema validation đơn giản hơn cho form đăng ký
const validateRegisterSchema = v.object({
  email: v.string(),
  password: v.string(),
  full_name: v.string(),
  phone: v.string(),
  department_id: v.optional(v.number()),
  position_id: v.optional(v.number()),
});

export const validateRegisterProps = (props: RegisterProps) => {
  try {
    // Kiểm tra thủ công
    if (!props.email) {
      toast.error("Email is required");
      return null;
    }

    if (!props.full_name) {
      toast.error("Full name is required");
      return null;
    }

    if (!props.phone) {
      toast.error("Phone number is required");
      return null;
    }

    if (!props.password || props.password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return null;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(props.email)) {
      toast.error("Please enter a valid email address");
      return null;
    }

    // Phone validation
    const phoneRegex = /^[0-9+\-\s]+$/;
    if (!phoneRegex.test(props.phone)) {
      toast.error("Please enter a valid phone number");
      return null;
    }

    const res = v.parse(validateRegisterSchema, props);
    return res;
  } catch (error) {
    toast.error(m.merry_knotty_marten_sew());
    return null;
  }
};
