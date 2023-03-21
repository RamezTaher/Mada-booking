import { GetStaticProps, NextPage, GetServerSideProps } from "next"
import { useTranslation } from "next-i18next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import Image from "next/image"
import Layout from "../../components/layout"
import nextI18NextConfig from "../../i18n/next-i18next.config"
import Pagination from "../../components/pagination"
import { useEffect, useState } from "react"

import HeadSeo from "../../components/HeadSeo"
import siteMetadata from "../../data/siteMetadata"
import SortDrop from "../../components/sort-drop"
import ReservationState from "../../components/ReservationState"
import { useBookings } from "../../hooks/useBookings"
import { useLocalStorage } from "react-use"
import { useRouter } from "next/router"
import Link from "next/link"

type Hotel = {
  Adress: string
  AdressAr: string
  DefaultPicture: string
  Stars: number
  Name: string
  NameAr: string
  Slug: string
}

const Bookings: NextPage = () => {
  const router = useRouter()
  const [token, setToken, removeToken] = useLocalStorage("token", "")
  const [isLogged, setIsLogged] = useState(
    token != null && token != undefined && token != ""
  )
  const [user, setUser, removeUser] = useLocalStorage("user", {
    AgencyId: 0,
  })
  useEffect(() => {
    // checks if the user is authenticated
    isLogged ? router.push("/bookings") : router.push("/auth/login")
  }, [isLogged])

  const { t } = useTranslation(["common", "button", "home", "input", "search"])

  const [currentPage, setCurrentPage] = useState(1)
  const { data, size, setSize } = useBookings(user.AgencyId)

  // const currentHotelData = useMemo(() => {
  // 	const firstPageIndex = (currentPage - 1) * PageSize;
  // 	const lastPageIndex = firstPageIndex + PageSize;
  // 	return allHotels.slice(firstPageIndex, lastPageIndex);
  // }, [currentPage]);
  const handleChange = (page: any) => {
    setCurrentPage(page)
    setSize(page)
  }

  const goToDetails = (reservation) => {
    // removeBookingDetails()
    // setBookingDetails(reservation)
    // router.push("bookings/details")
    router.push({
      pathname: `/bookings/details`,
      query: { BookingId: reservation.BookingId },
    })
  }
  return (
    <>
        <HeadSeo
          title={t("common:my_bookings")}
          description={t("home:mada")}
          canonicalUrl={siteMetadata.siteUrl}
          ogTwitterImage={siteMetadata.siteLogoSquare}
          ogType={"website"}
        />
        <Layout>
          <div className="bg-secondary-tint pt-16 lg:pt-20 ">
            <section className="relative py-20">
              <div className="absolute top-0 end-0 w-3/12 min-w-[6rem] lg:min-w-[11rem] h-full md:w-1/12 bg-transparent">
                <div className="relative w-full h-full">
                  <Image
                    alt={"mada-logo"}
                    src={"/images/abstract.svg"}
                    layout="fill"
                    objectFit="cover"
                  ></Image>
                </div>
              </div>
              <div className="container px-6 md:px-24 md:mx-auto relative z-10">
                <div className="grid grid-cols-4 lg:grid-cols-7 gap-3 p-5 shadow-md bg-white">
                  <h1 className="col-span-1  text-3xl font-bold text-dark-shade">
                    {t("common:my_bookings")}
                  </h1>
                  <input
                    className="col-span-3 lg:col-span-2 border-primary"
                    type="text"
                    placeholder={t("common:search-title")}
                  />
                  <div className="col-span-2 lg:col-span-1">
                    <SortDrop />
                  </div>
                  <div className="col-span-2 lg:col-span-1">
                    <SortDrop />
                  </div>
                  <div className="col-span-2 lg:col-span-1">
                    <SortDrop />
                  </div>
                  <div className="col-span-2 lg:col-span-1">
                    <button className="btn btn-secondary rounded-[26px]">
                      {t("button:search")}
                    </button>
                  </div>
                </div>
                <div className="w-full bg-white shadow-md mt-10">
                  <div className="border border-solid border-[#eee]">
                    {data && data[size - 1] && data.length > 0 && (
                      <table className="w-full border-collapse font-bold booking-table">
                        <thead>
                          <tr className="border-solid border-b border-dark/60">
                            <th> {t("common:hotel")}</th>
                            <th>{t("common:booked_in")}</th>
                            <th>{t("common:date")}</th>
                            <th>{t("common:price")}</th>
                            <th>{t("common:state")}</th>
                          </tr>
                        </thead>
                        {data && data[size - 1] && data.length > 0 && (
                          <tbody>
                            {data[size - 1].Data.map((reservation, idx) => (
                              <tr
                                key={idx}
                                onClick={() => goToDetails(reservation)}
                                className="border-b border-solid border-dark/60 last:border-b-0"
                              >
                                <td className="cursor-pointer">
                                  <div className="cursor-pointer address">
                                    <div className="address-title">
                                      {reservation?.Hotel?.Name}
                                    </div>
                                  </div>
                                </td>
                                <td>
                                  <div>{reservation?.StartDate}</div>
                                </td>
                                <td>
                                  <div>{reservation?.EndDate}</div>
                                </td>
                                <td>
                                  <div>
                                    {reservation?.TotalPricing}{" "}
                                    {t("common:sar")}
                                  </div>
                                </td>
                                <td>
                                  <div>
                                    <ReservationState
                                      type={reservation?.Status}
                                    />
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        )}
                      </table>
                    )}
                  </div>
                </div>

                {data?.length > 0 && data[size - 1] && (
                  <div className=" mt-16">
                    <Pagination
                      className="pagination-bar"
                      currentPage={currentPage}
                      totalCount={data[size - 1].TotalCount}
                      pageSize={10}
                      onPageChange={(page) => handleChange(page)}
                    />
                  </div>
                )}
              </div>
            </section>
          </div>
        </Layout>
    
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {
      ...(await serverSideTranslations(
        context.locale as string,
        ["common", "button", "home", "input", "search"],
        nextI18NextConfig
      )),
    },
  }
}
export default Bookings
