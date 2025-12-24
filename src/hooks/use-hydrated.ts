import { useSyncExternalStore } from "react";
import { nop } from "~/lib/utils";

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
