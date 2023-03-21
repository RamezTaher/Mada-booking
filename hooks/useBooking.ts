import useSWR from "swr"
import fetch from "unfetch"
import { useRouter } from "next/router"
import { useLocalStorage } from "react-use"

const fetcher = async (url) => {
  const res = await fetch(url)

  // If the status code is not in the range 200-299,
  // we still try to parse and throw it.

  return await res.json()
}

export function useBooking() {
  const [user, setUser, removeUser] = useLocalStorage("user", {
    AgencyId: 0,
  })
  const router = useRouter()
  const queries = router.query
  console.log(queries)
  const { data, error } = useSWR(
    `${process.env.NEXT_PUBLIC_API}/Booking/GetBookings?agencyId=${
      user.AgencyId
    }&${new URLSearchParams({
      ...(queries as { [x: string]: string }),
    }).toString()}`,
    fetcher
  )
  return {
    data: data,
    isLoading: !error && !data,
    isError: error,
  }
}
