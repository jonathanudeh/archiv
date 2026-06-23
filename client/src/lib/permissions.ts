import { User } from "@/src/types/user";

export function canContribute(user?: User | null) {
  return !!(user?.isVerified && ["admin", "contributor"].includes(user.role));
}
