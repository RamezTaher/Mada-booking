import { GetServerSideProps, GetStaticProps, NextPage } from "next"
import { useTranslation } from "next-i18next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import Image from "next/image"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { useLocalStorage } from "react-use"
import HeadSeo from "../../components/HeadSeo"
import Layout from "../../components/layout"
import ModalError from "../../components/ModalError"
import siteMetadata from "../../data/siteMetadata"
import nextI18NextConfig from "../../i18n/next-i18next.config"
import Mask from "../../components/Mask"

type Props = {
  banks: any
}

const BookingPaiement: NextPage<{ banks: any }> = ({ banks }: Props) => {
  const [token, setToken, removeToken] = useLocalStorage("token", "")
  const [isLogged, setIsLogged] = useState(
    token != null && token != undefined && token != ""
  )

  const { t, i18n } = useTranslation([
    "common",
    "search",
    "button",
    "validation",
    "booking",
  ])
  const [chosenRoomsStorage, setChosenRoomsStorage, removeChosenRoomsStorage] =
    useLocalStorage("chosenRooms", [])
  const [chosenHotelStorage, setChosenHotelStorage, removeChosenHotelStorage] =
    useLocalStorage("chosenHotel", {})
  const [guestInfo, setGuestInfo, removeGuestInfo] = useLocalStorage(
    "guestInfo",
    {
      FirstName: "",
      LastName: "",
    }
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
  })

  const [showModal, setShowModal] = useState(false)
  const [showMask, setShowMask] = useState(false)

  const router = useRouter()
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
  console.log(chosenRoomsStorage)
  totalVAT = totalPrice * 0.15
  totalWithoutVat = totalPrice - totalVAT

  const [form, setForm] = useState({
    banks: 0,
  })

  console.log(form.banks)

  const onChangeForm = (e: React.FormEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.currentTarget.name]: e.currentTarget.value })
  }

  const validator = (form) => {
    return form.banks
  }
  const confirmPaiement = async () => {
    if (validator(form)) {
      let booking = {
        HotelId: chosenRoomsStorage[0].HotelId,
        Bookings: chosenRoomsStorage,
        User: {
          ...guestInfo,
          GuestName: guestInfo.FirstName + " " + guestInfo.LastName,
          ClientPaymentType: "2",
          BankAccountId: form.banks,
        },
      }

      setShowMask(true)

      const options = {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(booking),
      }
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API}/booking/book_multi_rooms`,
          options
        )
        const data = await res
        if (data.ok) {
          setShowMask(false)
          router.push("/hotel/booking-success")
        }
      } catch (err) {}
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
        <div className="bg-secondary-tint pt-16 lg:pt-20 min-h-screen ">
          <div className="flex justify-start  ">
            <div className="w-full pt-16 pb-36 container mx-auto   gap-6  relative grid grid-cols-3">
              {/* Start Booking Info */}
              <div className="p-4 bg-white shadow-md col-span-3 lg:col-span-1 md:h-fit lg:order-2 ">
                <h1 className="text-black text-base font-bold mb-4">
                  {t("booking:book-info")}
                </h1>
                <div className="flex flex-col ">
                  <div className="flex justify-between items-center py-4 border-b border-solid border-dark-tint">
                    <h2 className="text-dark font-bold text-sm">
                      {t("common:total")}
                    </h2>
                    <div className="text-primary font-bold text-xl ">
                      {totalWithoutVat?.toFixed(2)}
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
                      {totalVAT?.toFixed(2)}
                      <span className="text-xs text-primary ">
                        {t("common:sar")}
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center py-4">
                    <h2 className="text-dark font-bold text-lg">
                      {t("common:total")}
                    </h2>
                    <div className="text-primary font-bold text-xl ">
                      {totalPrice?.toFixed(2)}
                      <span className="text-xs text-primary ">
                        {t("common:sar")}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* End Booking Info */}

              {/* start guest information */}
              <div className="px-4 py-8 flex flex-col gap-8 bg-white shadow-md col-span-3 lg:col-span-2 lg:order-1">
                <div className="relative pb-2">
                  <h1 className="text-primary text-3xl font-bold">
                    {t("booking:bank-transfer")}
                  </h1>
                  <div className="absolute top-full w-12 h-1 bg-secondary"></div>
                </div>
                <form className="flex flex-col gap-4 rtl:pl-7 ltf-lr-7 mb-7 lg:mb-12">
                  <h1 className="text-dark">
                    {t("booking:choose-bank-we-send-details")}
                  </h1>
                  {banks.map((bank, idx) => (
                    <label
                      key={idx}
                      className="flex items-center cursor-pointer justify-between py-4 border-b border-dark-tint border-solid gap-4"
                    >
                      <span className="ms-1.5 text-base font-bold text-dark-shade ">
                        {i18n.language === "ar"
                          ? bank.AccountNameAr
                          : bank.AccountName}{" "}
                        -{" "}
                        {i18n.language === "ar"
                          ? bank.BankNameAr
                          : bank.BankName}
                      </span>

                      <input
                        type="checkbox"
                        className="form-radio outline-none text-secondary ring-0 ring-offset-0 rounded-full checked:ring-secondary ring-white h-3 w-3 "
                        value={bank.Id}
                        name={"banks"}
                        onChange={(e) => onChangeForm(e)}
                        checked={form.banks == bank.Id}
                      />
                    </label>
                  ))}
                </form>

                <div className="flex flex-col gap-5 lg:flex-row lg:justify-between">
                  <button
                    className="btn btn-secondary-outline text-xl rounded-3xl lg:w-52"
                    onClick={() => {
                      goBack()
                    }}
                  >
                    {t("button:review-booking")}
                  </button>
                  <button
                    className="btn btn-secondary text-xl rounded-3xl lg:w-52"
                    onClick={() => confirmPaiement()}
                  >
                    {t("button:next")}
                  </button>
                </div>
              </div>
              {/* end guest information */}
            </div>
          </div>
        </div>
        {showModal && (
          <ModalError
            text={t("validation:fill-all-fields")}
            onClose={closeErrorModal}
          />
        )}
        {showMask && <Mask />}
      </Layout>
    </>
  )
}
export const getServerSideProps: GetServerSideProps = async (context) => {
  const resBank = await fetch(
    `${process.env.NEXT_PUBLIC_API}/booking/bankAccounts`
  )
  const banks = await resBank.json()

  return {
    props: {
      ...(await serverSideTranslations(
        context.locale as string,
        ["common", "button", "home", "input", "validation", "booking"],
        nextI18NextConfig
      )),
      banks,
    },
  }
}
export default BookingPaiement
