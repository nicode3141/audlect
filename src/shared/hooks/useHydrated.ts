import { useSyncExternalStore } from "react";
import { nop } from "~/shared/utils/utils";

function subscribe() {
	return () => {
		nop();
	};
}

export function useIsHydrated() {
	return useSyncExternalStore(
		subscribe,
		() => true,
		() => false,
	);
}
