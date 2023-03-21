import useSWRInfinite from "swr/infinite"
import { fetcher } from "../utils/fetcher"

const getKey = (pageIndex, agencyId) => {
  return `${process.env.NEXT_PUBLIC_API}/Booking/GetBookings?page=${
    pageIndex + 1
  }&agencyId=${agencyId}` // SWR key
  //Looking for bookings endpoint
}

export function useBookings(agencyId) {
  const { data, error, size, setSize } = useSWRInfinite(
    (index, id) => getKey(index, agencyId),
    fetcher,
    {
      initialSize: 1,
      revalidateFirstPage: false,
    }
  )
  return {
    data: data,
    isLoading: !error && !data,
    isError: error,
    size: size,
    setSize: setSize,
  }
}
