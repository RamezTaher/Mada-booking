import { GetServerSideProps, GetStaticProps, NextPage } from "next"
import { useTranslation } from "next-i18next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import Head from "next/head"
import Image from "next/image"
import { useRouter } from "next/router"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { useLocalStorage } from "react-use"
import HeadSeo from "../../components/HeadSeo"
import Layout from "../../components/layout"
import ModalError from "../../components/ModalError"
import StartsBox from "../../components/starts-box"
import siteMetadata from "../../data/siteMetadata"
import nextI18NextConfig from "../../i18n/next-i18next.config"

type Props = {
  hotelInfo: any
}
const Booking: NextPage<{ hotelInfo }> = ({ hotelInfo }: Props) => {
  const router = useRouter()
  const { t, i18n } = useTranslation([
    "common",
    "search",
    "button",
    "validation",
    "booking",
  ])
  const [chosenRoomsStorage, setchosenRoomsStorage, removeChosenRoomsStorage] =
    useLocalStorage("chosenRooms", [])
  const [chosenHotelStorage, setchosenHotelStorage, removeChosenHotelStorage] =
    useLocalStorage("chosenHotel", {})
  const [guestInfo, setGuestInfo, removeGuestInfo] = useLocalStorage(
    "guestInfo",
    {}
  )

  const [
    selectedHotelStorage,
    setSelectedHotelStorage,
    removeSelectedHotelStorage,
  ] = useLocalStorage("selectedHotel", {
    NameAr: "",
    Name: "",
    Stars: 5,
    AdressAr: "",
    Adress: "",
    DefaultPicture: "",
  })
  const [showModal, setShowModal] = useState(false)
  const closeErrorModal = () => {
    setShowModal(false)
  }

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

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm({
    reValidateMode: "onChange",
    mode: "all",
  })
  console.log(errors, isValid)

  const onSubmit = (data) => {
    console.log(data)
    if (isValid) {
      setGuestInfo(data)
      router.push({
        pathname: "/hotel/booking-paiement",
      })
    } else {
      setShowModal(true)
    }
  }

  const goBack = () => {
    router.back()
  }

  return (
    <>
      <HeadSeo
        title={
          i18n.language === "ar"
            ? selectedHotelStorage?.NameAr
            : selectedHotelStorage?.Name
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
        <div className="bg-secondary-tint pt-16 lg:pt-20 ">
          <section className="flex justify-start  ">
            <div className="w-full pt-16 pb-36 container mx-auto   gap-6 lg:px-28 relative grid grid-cols-3">
              {/* Start Booking Card */}
              <div className="flex flex-col md:flex-row hotel-shadow w-full bg-white col-span-3 lg:col-span-2">
                <div className="relative h-44 md:h-auto md:min-h-full w-full md:w-1/4 md:hidden">
                  <Image
                    alt="hotel"
                    src={
                      selectedHotelStorage?.DefaultPicture ??
                      "/images/no-hotel.jpg"
                    }
                    layout="fill"
                    objectFit="cover"
                  ></Image>
                </div>
                <div className="hidden md:block relative h-44 md:h-auto md:min-h-full w-full md:w-1/4">
                  <Image
                    alt="hotel"
                    src={
                      selectedHotelStorage?.DefaultPicture ??
                      "/images/no-hotel.jpg"
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
                    <div className="flex flex-col ">
                      {chosenRoomsStorage.map((room, idx) => (
                        <div key={idx} className="flex flex-col">
                          <h2 className="text-black font-bold text-base mt-4">
                            {room.Quantity} x{" "}
                            {i18n.language === "ar"
                              ? room.RoomTypeNameAr
                              : room.RoomTypeName}
                          </h2>
                          <div className="flex gap-2 py-4 last:border-0 border-b border-solid border-dark-tint ">
                            <div className="flex items-center gap-2">
                              <i className="icon-bed text-xs text-secondary"></i>
                              <h1 className="text-sm text-dark-shade">
                                {i18n.language === "ar"
                                  ? room.MealAr
                                  : room.Meal}
                              </h1>
                            </div>
                            <div className="flex items-center gap-2">
                              <i className="icon-balcony text-xs text-secondary"></i>
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
              <div className="p-4 bg-white hotel-shadow col-span-3 lg:col-span-1 md:h-fit ">
                <h1 className="text-black text-base font-bold mb-4">
                  {t("booking:book-info")}
                </h1>
                <div className="flex flex-col ">
                  <div className="flex justify-between items-center py-4 border-b border-solid border-dark-tint">
                    <h2 className="text-dark font-bold text-sm">
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
                      {t("common:TVA")}{" "}
                    </h2>
                    <div className="text-primary font-bold text-xl ">
                      {totalVAT.toFixed(2)}
                      <span className="text-xs text-primary ">
                        {t("common:sar")}
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center py-4">
                    <h2>{t("common:sum")}</h2>
                    <div className="text-primary font-bold text-xl ">
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
              <div className="px-4 py-8 flex flex-col gap-8 bg-white hotel-shadow col-span-3 lg:col-span-2">
                <div className="relative pb-2">
                  <h1 className="text-primary text-3xl font-bold">
                    {t("booking:guest-data")}
                  </h1>
                  <div className="absolute top-full w-12 h-1 bg-secondary"></div>
                </div>
                <form
                  className="grid grid-cols-2 gap-4"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <label className="flex flex-col gap-4 col-span-2 lg:col-span-1">
                    <span className="ms-1.5 font-bold  text-base">
                      {t("input:first-name")}
                    </span>
                    <input
                      type="text"
                      name="FirstName"
                      id="FirstName"
                      {...register("FirstName", {
                        required: true,
                      })}
                    />
                    {errors.FirstName?.type === "required" && (
                      <div className="text-danger">
                        {t("validation:fill-all-fields")}
                      </div>
                    )}
                  </label>
                  <label className="flex flex-col gap-4 col-span-2 lg:col-span-1">
                    <span className="ms-1.5 font-bold  text-base">
                      {t("input:last-name")}
                    </span>
                    <input
                      type="text"
                      name="LastName"
                      id="LastName"
                      {...register("LastName", {
                        required: true,
                      })}
                    />
                    {errors.LastName?.type === "required" && (
                      <div className="text-danger">
                        {t("validation:fill-all-fields")}
                      </div>
                    )}
                  </label>
                  <label className="flex flex-col gap-4 col-span-2 lg:col-span-1">
                    <span className="ms-1.5 font-bold  text-base">
                      {t("input:email")}
                    </span>
                    <input
                      type="email"
                      name="Email"
                      id="Email"
                      {...register("Email", {
                        required: true,
                        pattern:
                          /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                      })}
                    />
                    {errors.Email?.type === "required" && (
                      <div className="text-danger">
                        {t("validation:fill-all-fields")}
                      </div>
                    )}
                  </label>
                  <label className="flex flex-col gap-4 col-span-2 lg:col-span-1">
                    <span className="ms-1.5 font-bold  text-base">
                      {" "}
                      {t("input:phone-number")}
                    </span>
                    <input
                      className="text-start"
                      dir="ltr"
                      type="text"
                      name="Phone"
                      id="Phone"
                      {...register("Phone", {
                        required: true,
                        pattern:
                          /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,8}$/,
                      })}
                    />
                    {errors.Phone && (
                      <div className="text-danger">
                        {t("validation:fill-all-fields")}
                      </div>
                    )}
                  </label>
                  <label className="flex flex-col gap-4 col-span-2 ">
                    <span className="ms-1.5 font-bold  text-base">
                      {t("booking:special-demands")} ({t("common:facultative")})
                    </span>
                    <textarea
                      className="h-36"
                      name="demandes"
                      id="demandes"
                      {...(register("demandes"),
                      { required: false, minLength: 6 })}
                    />
                  </label>

                  <p className="text-xs text-danger font-bold col-span-2">
                    {t("booking:special-demands-warning")}
                  </p>
                  <div className="flex flex-col gap-5 lg:flex-row lg:justify-between col-span-2">
                    <button
                      className="btn btn-secondary-outline text-xl rounded-3xl lg:w-52"
                      onClick={() => goBack()}
                    >
                      {t("button:review-order")}
                    </button>
                    <button
                      type="submit"
                      className="btn btn-secondary text-xl rounded-3xl lg:w-52"
                    >
                      {t("button:go-to-pay")}
                    </button>
                  </div>
                </form>
              </div>
              {/* end guest information */}
            </div>
          </section>
        </div>
        {showModal && (
          <ModalError
            text={t("validation:fill-all-fields")}
            onClose={closeErrorModal}
          />
        )}
      </Layout>
    </>
  )
}
export const getServerSideProps: GetServerSideProps = async (context) => {
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
export default Booking
