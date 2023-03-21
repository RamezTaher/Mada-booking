import { Transition } from "@headlessui/react"
import { useTranslation } from "next-i18next"
import Link from "next/link"
import { useRouter } from "next/router"
import { useRef, useState, Fragment } from "react"
import Image from "next/image"
import LangDrop from "./lang-drop"
import { useLocalStorage } from "react-use"
const Header = () => {
  const { t } = useTranslation(["common", "button"])
  const router = useRouter()
  const [pathName, setPathName] = useState(router.pathname)
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const mobileNavRef = useRef(null)
  const [user, setUser, removeUser] = useLocalStorage("user", {
    FirstName: "",
    LastName: "",
  })
  const [chosenRoomsStorage, setChosenRoomsStorage, removeChosenRoomsStorage] =
    useLocalStorage("chosenRooms", [])
  const [chosenHotelStorage, setChosenHotelStorage, removeChosenHotelStorage] =
    useLocalStorage("chosenHotel", {})
  const [guestInfo, setGuestInfo, removeGuestInfo] = useLocalStorage(
    "guestInfo",
    {}
  )
  const [
    selectedHotelStorage,
    setSelectedHotelStorage,
    removeSelectedHotelStorage,
  ] = useLocalStorage("selectedHotel", {})
  const [bookingDetails, setBookingDetails, removeBookingDetails] =
    useLocalStorage("bookingDetails", {})
  const [token, setToken, removeToken] = useLocalStorage("token", "")
  const [isLogged, setIsLogged] = useState(
    token != null && token != undefined && token != ""
  )
  const logout = () => {
    setIsLogged(false)
    removeToken()
    removeUser()
    removeChosenRoomsStorage()
    removeChosenHotelStorage()
    removeGuestInfo()
    removeSelectedHotelStorage()
    removeBookingDetails()
  }
  return (
    <header
      className={`pb-3 absolute z-20 w-full ${
        router.pathname === "/hotel" ? "bg-transparent" : "bg-white shadow-md"
      }`}
    >
      <nav
        id="mobile-nav"
        className="flex justify-between items-center gap-4 lg:hidden px-6 container md:mx-auto z-10"
      >
        <Transition as={Fragment} show={isMobileNavOpen}>
          <div
            className="fixed h-full w-full top-0 start-0 bg-dark/30 z-50"
            onClick={() => setIsMobileNavOpen(false)}
          >
            <Transition.Child
              enter="transition ease-in-out transform duration-300"
              enterFrom="ltr:-translate-x-full rtl:translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out transform duration-300"
              leaveFrom="translate-x-0"
              leaveTo="ltr:-translate-x-full rtl:translate-x-full"
              as={Fragment}
            >
              <div ref={mobileNavRef} className={`w-5/6 bg-white h-full `}>
                {!isLogged ? (
                  <div className="p-8">
                    <Link href={"/auth/login"} passHref>
                      <div className="btn btn-primary">{t("button:login")}</div>
                    </Link>
                    <Link href={"/auth/register"} passHref>
                      <div className="text-secondary text-center font-bold py-6 border-b border-solid border-dark-tint ">
                        {t("button:register")}
                      </div>
                    </Link>
                  </div>
                ) : (
                  <div className="p-8 flex gap-5 items-end ">
                    <div className="cursor-pointer">
                      <Image
                        alt={"user-avatar"}
                        src={"/images/user-avatar.svg"}
                        width={40}
                        height={40}
                      ></Image>
                    </div>
                    <div className="text-lg text-dark-shade font-bold">
                      {user?.FirstName} {user?.LastName}
                    </div>
                  </div>
                )}

                <div className="ps-8 flex flex-col gap-4">
                  <Link passHref href={"/hotel"}>
                    <div
                      className={`w-full cursor-pointer font-bold py-3 px-8 rounded-s-2xl ${
                        router.pathname.split("/")[1] === "hotel"
                          ? "bg-primary text-white"
                          : "bg-white"
                      } ${
                        router.pathname === "/hotel"
                          ? "bg-primary text-white"
                          : "bg-white text-dark-shade"
                      }`}
                    >
                      {t("common:book-hotel")}
                    </div>
                  </Link>
                  {isLogged && (
                    <Link passHref href={"/bookings"}>
                      <div
                        className={`w-full cursor-pointer font-bold py-3 px-8 rounded-s-2xl ${
                          router.pathname.split("/")[1] === "bookings"
                            ? "bg-primary text-white"
                            : "bg-white"
                        } ${
                          router.pathname === "/bookings"
                            ? "bg-primary text-white"
                            : "bg-white text-dark-shade"
                        }`}
                      >
                        {t("common:my_bookings")}
                      </div>
                    </Link>
                  )}

                  <Link passHref href={"/hotels"}>
                    <div
                      className={`w-full cursor-pointer font-bold py-3 px-8 rounded-s-2xl ${
                        router.pathname === "/hotels"
                          ? "bg-primary text-white"
                          : "bg-white text-dark-shade"
                      }    `}
                    >
                      {t("common:hotels")}
                    </div>
                  </Link>
                  <Link passHref href={"/contact"}>
                    <div
                      className={`w-full cursor-pointer font-bold py-3 px-8 rounded-s-2xl ${
                        router.pathname === "/contact"
                          ? "bg-primary text-white"
                          : "bg-white text-dark-shade"
                      }    `}
                    >
                      {t("common:contact-us")}
                    </div>
                  </Link>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Transition>
        <Link passHref href={"/hotel"}>
          <div
            className={`relative pt-3 ${
              router.pathname !== "/hotel" ? "block" : "hidden"
            }`}
          >
            <Image
              alt={"mada-logo"}
              src={"/images/mada-logo-1.svg"}
              width={73}
              height={60}
            ></Image>
          </div>
        </Link>

        <Link passHref href={"/hotel"}>
          <div
            className={`relative pt-3 ${
              router.pathname === "/hotel" ? "block" : "hidden"
            }`}
          >
            <Image
              alt={"mada-logo"}
              src={"/images/mada-logo.svg"}
              width={73}
              height={60}
            ></Image>
          </div>
        </Link>
        <div className="h-full cursor-pointer bg-primary px-5 pb-4 pt-6 flex justify-center items-end rounded-b-2xl text-white">
          <i
            onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
            className="icon-menu_black_24dp text-4xl cursor-pointer"
          ></i>
        </div>
      </nav>
      <nav className="hidden lg:flex justify-between gap-16 px-6 container md:mx-auto">
        <Link passHref href={"/hotel"}>
          <div
            className={`relative pt-3 cursor-pointer ${
              router.pathname !== "/hotel" ? "block" : "hidden"
            }`}
          >
            <Image
              alt={"mada-logo"}
              src={"/images/mada-logo-1.svg"}
              width={73}
              height={60}
            ></Image>
          </div>
        </Link>
        <Link passHref href={"/hotel"}>
          <div
            className={`relative pt-3 cursor-pointer ${
              router.pathname === "/hotel" ? "block" : "hidden"
            }`}
          >
            <Image
              alt={"mada-logo"}
              src={"/images/mada-logo.svg"}
              width={73}
              height={60}
            ></Image>
          </div>
        </Link>

        <div className="flex justify-center items-center">
          <Link href="/hotel" passHref>
            <div
              className={`${
                router.pathname.split("/")[1] === "hotel"
                  ? "bg-primary text-white"
                  : "bg-transparent"
              } ${
                router.pathname !== "/hotel" ? "" : "text-white"
              } h-full cursor-pointer font-bold px-5 pb-4 flex justify-center items-end rounded-b-2xl `}
            >
              {t("common:book-hotel")}
            </div>
          </Link>

          {isLogged && (
            <Link href="/bookings" passHref>
              <div
                className={`${
                  router.pathname.split("/")[1] === "bookings"
                    ? "bg-primary text-white"
                    : "bg-transparent"
                } ${
                  router.pathname !== "/hotel" ? "" : "text-white"
                } h-full cursor-pointer font-bold px-5 pb-4 flex justify-center items-end rounded-b-2xl `}
              >
                {t("common:my_bookings")}
              </div>
            </Link>
          )}
          <Link href="/hotels" passHref>
            <div
              className={`${
                router.pathname.split("/")[1] === "hotels"
                  ? "bg-primary text-white"
                  : "bg-transparent"
              } ${
                router.pathname !== "/hotel" ? "" : "text-white"
              } h-full cursor-pointer font-bold px-5 pb-4 flex justify-center items-end rounded-b-2xl `}
            >
              {t("common:hotels")}
            </div>
          </Link>
          <Link href="/contact" passHref>
            <div
              className={`${
                router.pathname.split("/")[1] === "contact"
                  ? "bg-primary text-white"
                  : "bg-transparent"
              } ${
                router.pathname !== "/hotel" ? "" : "text-white"
              } h-full cursor-pointer font-bold px-5 pb-4 flex justify-center items-end rounded-b-2xl `}
            >
              {t("common:contact-us")}
            </div>
          </Link>
        </div>
        <div className="flex justify-center items-center pt-5 gap-2">
          <LangDrop />
          {!isLogged ? (
            <Link passHref href="/auth/login">
              <button className="btn btn-primary rounded-full">
                {t("button:login")}
              </button>
            </Link>
          ) : (
            <div className="relative">
              <div
                onClick={() => {
                  setIsProfileOpen(!isProfileOpen)
                }}
                className="flex justify-between items-center text-sm text-dark-shade cursor-pointer gap-3"
              >
                <div>
                  <Image
                    alt={"user-avatar"}
                    src={"/images/user-avatar.svg"}
                    width={40}
                    height={40}
                  ></Image>
                </div>
              </div>
              {isProfileOpen && (
                <div className="absolute top-full left-0 bg-white z-[90] shadow-md rounded-sm p-4 w-40">
                  <div className="flex flex-col gap-2">
                    <Link href="/" passHref>
                      <div
                        className="cursor-pointer flex items-center justify-center text-lg text-dark-shade border-b border-solid border-[#E5E5E5] last:border-0 pb-[2px]  last:pb-0"
                        onClick={() => {
                          setIsProfileOpen(!isProfileOpen)
                        }}
                      >
                        <div>{t("common:profile")}</div>
                      </div>
                    </Link>
                    <Link href="/bookings" passHref>
                      <div
                        className="cursor-pointer flex items-center justify-center text-lg text-dark-shade border-b border-solid border-[#E5E5E5] last:border-0 pb-[2px] last:pb-0"
                        onClick={() => {
                          setIsProfileOpen(!isProfileOpen)
                        }}
                      >
                        <div>{t("common:my_bookings")}</div>
                      </div>
                    </Link>
                    <div
                      className="cursor-pointer flex items-center justify-center text-lg text-dark-shade border-b border-solid border-[#E5E5E5] last:border-0 pb-[2px] last:pb-0"
                      onClick={() => {
                        logout()
                      }}
                    >
                      <div>{t("common:logout")}</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </nav>
    </header>
  )
}

export default Header
