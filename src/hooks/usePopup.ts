import { useEffect, useRef, useState } from "react";

// Shared event listener to avoid adding 500+ listeners (one per component)
// Track active popups with their refs and close callbacks
type PopupEntry = { ref: HTMLElement; close: () => void; isActive: () => boolean };
const activePopups = new Set<PopupEntry>();
let globalClickHandler: ((e: MouseEvent) => void) | null = null;

function setupGlobalListener() {
	if (globalClickHandler) return;

	globalClickHandler = (e: MouseEvent) => {
		const target = e.target as Node;
		// Check all active popups and close those that don't contain the click target
		for (const popup of activePopups) {
			// Only try to close if popup is actually active and ref exists
			if (popup.isActive() && popup.ref && !popup.ref.contains(target)) {
				popup.close();
			}
		}
	};

	document.body.addEventListener("mousedown", globalClickHandler, true);
}

export function usePopup(): [
	boolean,
	React.Dispatch<React.SetStateAction<boolean>>,
	React.RefObject<HTMLDivElement | HTMLElement | null>,
] {
	const ref = useRef<HTMLDivElement | HTMLElement | null>(null);
	const entryRef = useRef<PopupEntry | null>(null);
	const [isActive, setIsActive] = useState<boolean>(false);

	// Register/unregister popup when it becomes active/inactive
	useEffect(() => {
		if (!isActive) {
			// Remove this popup from active set when it becomes inactive
			if (entryRef.current) {
				activePopups.delete(entryRef.current);
				entryRef.current = null;
			}
			return;
		}

		setupGlobalListener();

		const closeDropdown = () => {
			setIsActive(false);
		};

		// Check ref and register when popup is active
		const checkAndRegister = () => {
			const currentRef = ref.current;
			if (currentRef && !entryRef.current) {
				const entry: PopupEntry = {
					ref: currentRef as HTMLElement,
					close: closeDropdown,
					isActive: () => isActive, // Return current isActive value
				};
				entryRef.current = entry;
				activePopups.add(entry);
			}
		};

		// Try to register immediately
		checkAndRegister();

		// Also check after a short delay in case ref is set asynchronously
		const timeoutId = setTimeout(() => {
			checkAndRegister();
		}, 0);

		return () => {
			clearTimeout(timeoutId);
			// Remove entry when effect cleans up
			if (entryRef.current) {
				activePopups.delete(entryRef.current);
				entryRef.current = null;
			}
		};
	}, [isActive]);

	return [isActive, setIsActive, ref];
}
