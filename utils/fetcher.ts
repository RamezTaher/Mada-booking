export const fetcher = (...args) =>
	fetch(...(args as [RequestInfo, RequestInit])).then((res) => res.json());
