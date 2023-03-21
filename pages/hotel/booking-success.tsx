import { GetStaticProps, NextPage } from "next"
import { useTranslation } from "next-i18next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import Head from "next/head"
import Image from "next/image"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { useLocalStorage } from "react-use"
import HeadSeo from "../../components/HeadSeo"
import Layout from "../../components/layout"
import StartsBox from "../../components/starts-box"
import siteMetadata from "../../data/siteMetadata"
import nextI18NextConfig from "../../i18n/next-i18next.config"

const BookingSuccess: NextPage = () => {
  const [token, setToken, removeToken] = useLocalStorage("token", "")
  const [isLogged, setIsLogged] = useState(
    token != null && token != undefined && token != ""
  )
  const router = useRouter()

  const { t, i18n } = useTranslation([
    "common",
    "button",
    "home",
    "input",
    "validation",
    "booking",
  ])
  const [chosenRoomsStorage, setchosenRoomsStorage, removechosenRoomsStorage] =
    useLocalStorage("chosenRooms", [])
  let isOneRoomRequest
  if (chosenRoomsStorage) {
    isOneRoomRequest = false
    chosenRoomsStorage.forEach((room) => {
      if (room.Request === true) {
        isOneRoomRequest = true
      }
    })
  }
  const [chosenHotelStorage, setchosenHotelStorage, removechosenHotelStorage] =
    useLocalStorage("chosenHotel", {})
  const [guestInfo, setguestInfo, removeguestInfo] = useLocalStorage(
    "guestInfo",
    { FirstName: "", LastName: "", Phone: 0, Email: "", Demandes: "" }
  )
  const [
    selectedHotelStorage,
    setSelectedHotelStorage,
    removeSelectedHotelStorage,
  ] = useLocalStorage("selectedHotel", {
    NameAr: "",
    Name: "",
    Stars: 0,
    AdressAr: "",
    Adress: "",
    DefaultPicture: "",
  })

  let totalPrice = 0
  let totalWithoutVat = 0
  let totalVAT = 0

  if (chosenRoomsStorage) {
    chosenRoomsStorage.forEach((x) => {
      totalPrice = totalPrice + x.PriceToPay * x.Quantity
    })
  }
  totalVAT = totalPrice * 0.15
  totalWithoutVat = totalPrice - totalVAT
  return (
    <>
      <HeadSeo
        title={
          isOneRoomRequest ? t("validation:request") : t("validation:success")
        }
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
        <div className="bg-secondary-tint pt-24 lg:pt-16 ">
          <section className="flex flex-col justify-start  ">
            <div className="bg-[#00800A] px-5 py-4 z-10 w-full flex items-center gap-5 text-white text-2xl font-bold ">
              <i className="icon-check_circle_black_24dp text-2xl"></i>
              <p>
                {isOneRoomRequest
                  ? t("validation:success-request")
                  : t("validation:success-book")}
              </p>
            </div>
            <div className="w-full pt-16 pb-36 container mx-auto gap-6  relative grid grid-cols-3">
              {/* Start Booking Card */}
              <div className="flex flex-col md:flex-row shadow-md w-full bg-white col-span-3 lg:col-span-2">
                <div className="relative h-44 md:h-auto md:min-h-full w-full md:w-1/4 md:hidden">
                  <Image
                    alt="hotel"
                    src={
                      selectedHotelStorage?.DefaultPicture
                        ? selectedHotelStorage.DefaultPicture
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
                      selectedHotelStorage?.DefaultPicture
                        ? selectedHotelStorage.DefaultPicture
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
                        <h2 className="font-bold text-xl md:text-2xl lg:text-3xl line-clamp-1">
                          {i18n.language === "ar"
                            ? selectedHotelStorage?.NameAr
                            : selectedHotelStorage?.Name}
                        </h2>
                        <StartsBox rating={selectedHotelStorage.Stars} />
                      </div>
                      <div className="flex justify-start items-center gap-2 pb-2">
                        <i className="icon-place_black_24dp text-dark"></i>
                        <div className="text-dark text-sm line-clamp-1">
                          {i18n.language === "ar"
                            ? selectedHotelStorage?.AdressAr ??
                              selectedHotelStorage?.Adress
                            : selectedHotelStorage?.Adress}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col p-4 ">
                      {chosenRoomsStorage.map((room, idx) => (
                        <div key={idx} className="flex flex-col  ">
                          <h2 className="text-black font-bold text-base mt-4">
                            {room.Quantity} x{" "}
                            {i18n.language === "ar"
                              ? room.RoomTypeNameAr
                              : room.RoomTypeName}
                          </h2>
                          <div className="gap-2 py-4 last:border-0 border-b border-solid border-dark-tint">
                            <div className="flex items-center gap-2">
                              <i className="icon-bed text-xs text-primary"></i>
                              <h1 className="text-sm text-dark-shade">
                                {i18n.language === "ar"
                                  ? room.MealAr
                                  : room.Meal}
                              </h1>
                            </div>
                            <div className="flex items-center gap-2">
                              <i className="icon-balcony text-xs text-primary"></i>
                              <h1 className="text-sm text-dark-shade">
                                {i18n.language === "ar"
                                  ? room.ViewNameAr
                                  : room.ViewName}
                              </h1>
                            </div>
                          </div>
                        </div>
                      ))}
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
                      {" "}
                      {t("common:sum")}
                    </h2>
                    <div className="text-primary font-bold text-xl ">
                      {totalWithoutVat.toFixed(2)}
                      <span className="text-xs text-primary ">
                        {t("common:sar")}
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center py-4 border-b border-solid border-dark-tint">
                    <h2 className="text-dark font-bold text-sm">
                      {t("common:TVA")}
                    </h2>
                    <div className="text-primary font-bold text-xl ">
                      {totalVAT.toFixed(2)}
                      <span className="text-xs text-primary ">
                        {t("common:sar")}
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center py-4 pb-0">
                    <h2 className="text-dark-shade font-bold text-2xl">
                      {t("common:sum")}
                    </h2>
                    <div className="text-secondary font-bold text-3xl ">
                      {totalPrice.toFixed(2)}
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
                    {t("booking:guest-data")}
                  </h1>
                  <div className="absolute top-full w-12 h-1 bg-secondary"></div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-4 col-span-2 lg:col-span-1">
                    <span className=" font-bold  text-base">
                      {t("input:first-name")}
                    </span>
                    <span> {guestInfo.FirstName}</span>
                  </div>
                  <div className="flex flex-col gap-4 col-span-2 lg:col-span-1">
                    <span className=" font-bold  text-base">
                      {t("input:last-name")}
                    </span>
                    <span>{guestInfo.LastName}</span>
                  </div>
                  <div className="flex flex-col gap-4 col-span-2 lg:col-span-1">
                    <span className=" font-bold  text-base">
                      {t("input:email")}
                    </span>
                    <span>{guestInfo.Email}</span>
                  </div>
                  <div className="flex flex-col gap-4 col-span-2 lg:col-span-1">
                    <span className=" font-bold  text-base">
                      {t("input:phone-number")}
                    </span>
                    <span> {guestInfo.Phone}</span>
                  </div>
                  <div className="flex flex-col gap-4 col-span-2 ">
                    <span className=" font-bold  text-base">
                      {" "}
                      {t("booking:special-demands")}
                    </span>
                    <span>{guestInfo.Demandes}</span>
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
export const getStaticProps: GetStaticProps = async (context) => {
  return {
    props: {
      ...(await serverSideTranslations(
        context.locale as string,
        ["common", "button", "home", "input", "validation", "booking"],
        nextI18NextConfig
      )),
    },
  }
}
export default BookingSuccess
