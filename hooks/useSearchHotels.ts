import useSWR from "swr";
import { fetcher } from "../utils/fetcher";

export function useSearchHotels(queries) {
	const { data, error, mutate } = useSWR(
		`${process.env.NEXT_PUBLIC_API}/Hotels/SearchHotels?${new URLSearchParams({
			...(queries as { [x: string]: string }),
		})}`,
		fetcher
	);
	return {
		data: data,
		isLoading: !error && !data,
		isError: error,
		mutate: mutate,
	};
}
