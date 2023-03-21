import useSWRInfinite from "swr/infinite"
import { fetcher } from "../utils/fetcher"

const getKey = (pageIndex) => {
  return `${process.env.NEXT_PUBLIC_API}/Hotels/GetHotels?rows=12&page=${
    pageIndex + 1
  }` // SWR key
}

export function useHotels() {
  const { data, error, size, setSize } = useSWRInfinite(
    (index) => getKey(index),
    fetcher,
    {
      initialSize: 1,
      revalidateFirstPage: false,
    }
  )
  return {
    data: data,
    isLoading:
      (!error && !data) ||
      (size > 0 && data && typeof data[size - 1] === "undefined"),
    isError: error,
    size: size,
    setSize: setSize,
  }
}
