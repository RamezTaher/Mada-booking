import { GetServerSideProps, GetStaticProps, NextPage } from "next"
import { useTranslation } from "next-i18next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import Head from "next/head"
import Image from "next/image"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { useLocalStorage } from "react-use"
import HeadSeo from "../../components/HeadSeo"
import Layout from "../../components/layout"
import ModalError from "../../components/ModalError"
import ReservationState from "../../components/ReservationState"
import StartsBox from "../../components/starts-box"
import siteMetadata from "../../data/siteMetadata"
import { useBooking } from "../../hooks/useBooking"
import nextI18NextConfig from "../../i18n/next-i18next.config"

type Props = {
  hotelInfo: any
}
const BookingDetails: NextPage = () => {
  const router = useRouter()
  const { t } = useTranslation([
    "common",
    "search",
    "button",
    "validation",
    "booking",
    "hotel",
  ])
  const [token, setToken, removeToken] = useLocalStorage("token", "")
  const [isLogged, setIsLogged] = useState(
    token != null && token != undefined && token != ""
  )
  useEffect(() => {
    // checks if the user is authenticated
    !isLogged && router.push("/auth/login")
  }, [isLogged])

  const { data, isLoading } = useBooking()

  return (
    <>
      <HeadSeo
        title={data?.Hotel?.Name}
        description={t("home:mada")}
        canonicalUrl={siteMetadata.siteUrl}
        ogTwitterImage={siteMetadata.siteLogoSquare}
        ogType={"website"}
      />
      <Layout>
        <div className="absolute end-0 z-0 w-3/12 min-w-[6rem] lg:min-w-[11rem] h-full md:w-1/12 md:block hidden ">
          <div className="relative w-full h-full">
            <Image
              alt={"mada-logo"}
              src={"/images/abstract.svg"}
              layout="fill"
              objectFit="cover"
            ></Image>
          </div>
        </div>
        <div className="bg-secondary-tint pt-16 lg:pt-20 ">
          <div className="w-full mt-8 pt-8 container mx-auto lg:px-28 relative text-3xl font-bold">
            <div className="shadow-md py-6 px-2 bg-white">
              {data?.Hotel?.Name}
            </div>{" "}
          </div>
          <section className="flex justify-start  ">
            <div className="w-full pt-8 pb-36 container mx-auto   gap-6 lg:px-28 relative grid grid-cols-3">
              {/* Start Booking Card */}
              <div className="flex flex-col md:flex-row shadow-md w-full bg-white col-span-3 lg:col-span-2">
                <div className="relative h-44 md:h-auto md:min-h-full w-full md:w-1/4 md:hidden">
                  <Image
                    alt="hotel"
                    src={
                      data?.Hotel?.Pictures
                        ? data?.Hotel?.Pictures[0].secure_url
                        : "/images/no-hotel.jpg"
                    }
                    layout="fill"
                    objectFit="cover"
                  ></Image>
                </div>
                <div className="hidden md:block relative h-44 md:h-auto md:min-h-full w-full md:w-1/4">
                  <Image
                    alt="hotel"
                    src={
                      data?.Hotel?.Pictures
                        ? data?.Hotel?.Pictures[0].secure_url
                        : "/images/no-hotel.jpg"
                    }
                    layout="responsive"
                    width={250}
                    height={170}
                    objectFit="cover"
                  ></Image>
                </div>
                <div className="w-full flex flex-col md:flex-row md:w-3/4">
                  <div className=" w-full p-4">
                    <div className="border-b border-solid border-dark-tint">
                      <div className="flex justify-start md:items-center pb-2 md:mb-4 gap-2 md:gap-4 items-start flex-col md:flex-row">
                        <h2 className="font-bold text-xl line-clamp-1 md:text-2xl">
                          {data?.Hotel?.Name}
                        </h2>
                        <StartsBox rating={data?.Hotel?.Stars} />
                      </div>
                      <div className="flex justify-start items-center gap-2 pb-2">
                        <i className="icon-place_black_24dp text-dark"></i>
                        <div className="text-dark text-sm line-clamp-1">
                          {data?.Hotel?.Adress || data?.Hotel?.City}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col ">
                      <div className="flex flex-col">
                        <h2 className="text-black font-bold text-base mt-4">
                          {data?.RoomType}
                        </h2>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* End Booking Card */}

              {/* Start Booking Info */}
              <div className="p-4 bg-white shadow-md col-span-3 lg:col-span-1 md:h-fit ">
                <h1 className="text-black text-base font-bold mb-4">
                  {t("booking:book-info")}
                </h1>
                <div className="flex flex-col ">
                  <div className="flex justify-between items-center py-4 border-b border-solid border-dark-tint">
                    <h2 className="text-dark font-bold text-sm">
                      {t("common:sum")}
                    </h2>
                    <div className="text-primary font-bold text-xl ">
                      {data?.TotalPricing * 0.85}
                      <span className="text-xs text-primary ">
                        {t("common:sar")}
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center py-4 border-b border-solid border-dark-tint">
                    <h2 className="text-dark font-bold text-sm">
                      {t("common:TVA")}{" "}
                    </h2>
                    <div className="text-primary font-bold text-xl ">
                      {data?.TotalPricing * 0.15}
                      <span className="text-xs text-primary ">
                        {t("common:sar")}
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center py-4">
                    <h2>{t("common:sum")}</h2>
                    <div className="text-primary font-bold text-xl ">
                      {data?.TotalPricing}
                      <span className="text-xs text-primary ">
                        {t("common:sar")}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* End Booking Info */}

              {/* start guest information */}
              <div className="px-4 py-8 flex flex-col gap-8 bg-white shadow-md col-span-3 lg:col-span-2">
                <div className="relative pb-2">
                  <h1 className="text-primary text-3xl font-bold">
                    {t("booking:book-info")}
                  </h1>
                  <div className="absolute top-full w-12 h-1 bg-secondary"></div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-4 col-span-2 lg:col-span-1">
                    <span className=" font-bold  text-base">
                      {t("common:BRN")}
                    </span>
                    <span> {data?.BookingId}</span>
                  </div>
                  <div className="flex flex-col gap-4 col-span-2 lg:col-span-1">
                    <span className=" font-bold  text-base">
                      {t("common:state")}
                    </span>
                    <span>
                      <ReservationState type={data?.Status} />
                    </span>
                  </div>
                  <div className="flex flex-col gap-4 col-span-2 lg:col-span-1">
                    <span className=" font-bold  text-base">
                      {t("common:date")}
                    </span>
                    <span>{data?.StartDate}</span>
                  </div>
                  <div className="flex flex-col gap-4 col-span-2 lg:col-span-1">
                    <span className=" font-bold  text-base">
                      {t("common:depart")}
                    </span>
                    <span> {data?.EndDate} </span>
                  </div>

                  <div className="flex flex-col gap-4 col-span-2 lg:col-span-1 ">
                    <span className=" font-bold  text-base">
                      {t("common:booked_in")}
                    </span>
                    <span> {data?.Created} </span>
                  </div>
                </div>
              </div>
              {/* end guest information */}

              {/* start guest information */}
              <div className="px-4 py-8 flex flex-col gap-8 bg-white shadow-md col-span-3 lg:col-span-2">
                <div className="relative pb-2">
                  <h1 className="text-primary text-3xl font-bold">
                    {t("hotel:guest-info")}
                  </h1>
                  <div className="absolute top-full w-12 h-1 bg-secondary"></div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-4 col-span-2 lg:col-span-1">
                    <span className=" font-bold  text-base">
                      {t("input:first-name")}
                    </span>
                    <span> {data?.Client}</span>
                  </div>
                  <div className="flex flex-col gap-4 col-span-2 lg:col-span-1">
                    <span className=" font-bold  text-base">
                      {t("input:last-name")}
                    </span>
                    <span>{data?.Client}</span>
                  </div>
                  <div className="flex flex-col gap-4 col-span-2 lg:col-span-1">
                    <span className=" font-bold  text-base">
                      {t("input:email")}
                    </span>
                    <span></span>
                  </div>
                  <div className="flex flex-col gap-4 col-span-2 lg:col-span-1">
                    <span className=" font-bold  text-base">
                      {t("input:phone-number")}
                    </span>
                    <span>{data?.ClientPhone}</span>
                  </div>
                  <div className="flex flex-col gap-4 col-span-2 ">
                    <span className=" font-bold  text-base">
                      {" "}
                      {t("booking:special-demands")}
                    </span>
                    <span>{data?.Notes}</span>
                  </div>
                </div>
              </div>
              {/* end guest information */}
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
        ["common", "button", "home", "input", "validation", "booking", "hotel"],
        nextI18NextConfig
      )),
    },
  }
}
export default BookingDetails
