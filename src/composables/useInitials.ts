import { computed, toValue } from "vue";
import { initialsFrom } from "../utils/initials";

export function useInitials(nameRef: any) {
  return computed(() => initialsFrom(toValue(nameRef)));
}
