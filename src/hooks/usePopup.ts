import { useEffect, useRef, useState } from "react";

export function usePopup(): [boolean, (value: boolean) => void, React.RefObject<HTMLDivElement | HTMLElement | null>] {
	const ref = useRef<HTMLDivElement | HTMLElement | null>(null);
	const [isActive, setIsActive] = useState<boolean>(false);

	useEffect(() => {
		const closeDropdown = (e: MouseEvent) => {
			if (ref.current && !ref.current.contains(e.target as Node)) {
				setIsActive(false);
			}
		};
		document.body.addEventListener("mousedown", closeDropdown);
		return () => document.body.removeEventListener("mousedown", closeDropdown);
	}, []);

	return [isActive, setIsActive, ref];
}
