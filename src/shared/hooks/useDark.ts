import { useEffect, useState } from "react";

export function useDark() {
	const [isDark, setIsDark] = useState(false);

	useEffect(() => {
		const darkmode = document.documentElement.classList.contains("dark");
		setIsDark(darkmode);

		const observer = new MutationObserver(() => {
			setIsDark(document.documentElement.classList.contains("dark"));
		});
		observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
		return () => observer.disconnect();
	}, []);

	return isDark;
}
