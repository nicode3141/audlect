import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { scrollSmoothToTop } from "~/lib/utils";
import type { SortMethodsType } from "~/types/global";

interface IQueryParams {
	page?: number;
	sortMethod?: SortMethodsType;
	[key: string]: string | number | undefined;
}

export function useQueryParams() {
	const searchParams = useSearchParams();
	const router = useRouter();

	const currentPage = useMemo(() => {
		return parseInt(searchParams.get("page") ?? "1");
	}, [searchParams]);

	const sortMethod = useMemo(() => {
		const value = searchParams.get("sort") ?? "Likes";
		if (
			value === "Likes" ||
			value === "Least Likes" ||
			value === "Random" ||
			value === "A-Z" ||
			value === "Date Added"
		) {
			return value as SortMethodsType;
		}

		return "Likes" as SortMethodsType;
	}, [searchParams]);

	const setPage = useCallback(
		(page: number) => {
			const params = new URLSearchParams(searchParams.toString());
			params.set("page", page.toString());
			router.push(`?${params.toString()}`);
			scrollSmoothToTop(0);
		},
		[searchParams, router],
	);

	const setSortMethod = useCallback(
		(method: SortMethodsType) => {
			const params = new URLSearchParams(searchParams.toString());
			params.set("sort", method);
			params.set("page", "1");
			router.push(`?${params.toString()}`);
			scrollSmoothToTop(0);
		},
		[searchParams, router],
	);

	return { currentPage, sortMethod, setPage, setSortMethod };
}
