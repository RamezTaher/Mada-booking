import { NextPage } from "next"
import { useTranslation } from "next-i18next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import Image from "next/image"
import { Disclosure, Transition } from "@headlessui/react"
import { useLocalStorage } from "react-use"

import HotelRoomCard from "../../components/HotelRoomCard"
import HotelSearch from "../../components/hotels-search"
import Layout from "../../components/layout"
import RoomCardsTable from "../../components/RoomCardsTable"
import StartsBox from "../../components/starts-box"
import nextI18NextConfig from "../../i18n/next-i18next.config"
import { Router, useRouter } from "next/router"
import { useState } from "react"
import HeadSeo from "../../components/HeadSeo"
import siteMetadata from "../../data/siteMetadata"
import LoadingCard from "../../components/LoadingCard"

import { useEffect, useRef } from "react"
import { Loader } from "@googlemaps/js-api-loader"
import { useRooms } from "../../hooks/useRooms"

type Props = {
  hotel: any
  queries: any
  serverRooms: any
}

const Details: NextPage<{
  hotel: any
  queries: any
}> = ({ hotel }: Props) => {
  const { t, i18n } = useTranslation([
    "common",
    "button",
    "home",
    "input",
    "search",
    "hotel",
  ])
  const router = useRouter()
  const roomsFetch = useRooms(hotel.Id, router.query)
  const [chosenRoomsStorage, setChosenRoomsStorage, removeChosenRoomsStorage] =
    useLocalStorage("chosenRooms", [])
  const [chosenHotelStorage, setChosenHotelStorage, removeChosenHotelStorage] =
    useLocalStorage("chosenHotel", {})
  const goToSearch = (data) => {
    router.push(
      {
        pathname: "/hotel/[slug]",
        query: { slug: router.query.slug, ...data },
      },
      undefined,
      { shallow: true }
    )
    roomsFetch.mutate(roomsFetch.data)
  }

  let totalPrice
  const [total, setTotal] = useState(0)

  const selectRoom = (choice: any) => {
    totalPrice = 0
    roomsFetch.data.forEach((item: any) => {
      item.Data.forEach((room: any) => {
        if (room.Quantity) {
          totalPrice = totalPrice + room.Quantity * room.PriceToPay
        }
      })
    })
    setTotal(totalPrice)
  }
  const reservation = () => {
    if (total > 0) {
      let chosenRoomsList = getChosenRooms()
      setChosenRoomsStorage(chosenRoomsList)
      setChosenHotelStorage(hotel)
      router.push({
        pathname: "/hotel/booking",
      })
    }
  }

  const getChosenRooms = () => {
    let selectedRooms: any = []
    roomsFetch.data.forEach((item: any) => {
      item.Data.forEach((room: any) => {
        if (room.Quantity > 0) {
          selectedRooms.push(room)
        }
      })
    })
    return selectedRooms
  }

  const googlemap = useRef(null)
  useEffect(() => {
    const loader = new Loader({
      apiKey: "AIzaSyB3x3Z7Zc-OuovpLgME_2Rr014vf8jgxnc",
      version: "weekly",
    })
    let map
    loader.load().then(() => {
      map = new google.maps.Map(googlemap.current, {
        center: {
          lat: JSON.parse(hotel.MapInfo)?.geometry?.location?.lat,
          lng: JSON.parse(hotel.MapInfo)?.geometry?.location?.lng,
        },
        zoom: 16,
      })
    })
  })

  return (
    <>
      <HeadSeo
        title={i18n.language === "ar" ? hotel?.NameAr : hotel?.Name}
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
            <div className="w-full pt-12 pb-36 container mx-auto flex flex-col gap-6 lg:px-28 relative">
              {/* Book button for mobile */}
              <div className="fixed w-full bg-white z-[35] bottom-0 start-0 p-4 lg:hidden flex justify-between shadow-t-md">
                <div className="flex flex-col">
                  <div className="text-secondary flex gap-1 items-end font-bold text-3xl ">
                    {total}
                    <span className="text-sm text-primary ">
                      {t("common:sar")}
                    </span>
                  </div>
                  <div className="text-black font-bold text-xs">
                    {t("search:for-x-nights", {
                      nights:
                        roomsFetch.data?.length > 0 &&
                        roomsFetch.data[0]?.NbrNights,
                    })}
                  </div>
                </div>

                <button
                  className="btn btn-secondary py-2 w-[150px] rounded-3xl"
                  onClick={() => reservation()}
                >
                  {t("button:book")}
                </button>
              </div>

              {/* Start Card for Hotel info */}
              <div className="p-4  hotel-shadow flex items-start lg:items-end lg:justify-between gap-5 md:gap-7 relative bg-white ">
                <div className="flex flex-col gap-1 lg:gap-3">
                  <div className="flex flex-col gap-1 lg:flex-row lg:gap-4">
                    <h1 className="text-dark-shade font-bold text-xl lg:text-3xl ">
                      {i18n.language === "ar" ? hotel?.NameAr : hotel?.Name}
                    </h1>
                    <StartsBox rating={hotel?.Stars} />
                  </div>
                  <div className="flex items-center gap-1">
                    <i className="icon-place_black_24dp text-sm text-dark"></i>
                    <h3 className="text-dark text-sm">
                      {i18n.language === "ar"
                        ? hotel?.AdressAr ?? hotel?.Adress
                        : hotel?.Adress}
                    </h3>
                  </div>
                </div>
                <div className="hidden lg:block">
                  <button className="btn btn-primary rounded-3xl py-1 px-5 text-sm font-normal">
                    {t("button:see-offers")}
                  </button>
                </div>
              </div>

              {/* End Card for Hotel info */}

              {/* Start Hotel images + map */}

              <div className="hidden lg:grid grid-cols-3 grid-rows-5 gap-4">
                <div className="relative col-span-1 row-span-5">
                  <div
                    className="hotel-shadow"
                    id="map"
                    style={{ height: "100%" }}
                    ref={googlemap}
                  ></div>
                </div>

                <div className="col-span-2 row-span-5 grid grid-col-4 gap-4">
                  <div className="relative col-span-4 row-span-4">
                    <Image
                      alt="hotel"
                      src={hotel?.DefaultPicture ?? "/images/no-hotel.jpg"}
                      layout="responsive"
                      width={360}
                      height={220}
                      objectFit="cover"
                    ></Image>
                  </div>
                  {hotel?.Pictures.slice(2, 6).map((img, idx) => (
                    <div key={idx} className="relative col-span-1 row-span-5">
                      <Image
                        alt="hotel"
                        src={img?.secure_url ?? "/images/no-hotel.jpg"}
                        layout="responsive"
                        width={360}
                        height={220}
                        objectFit="cover"
                      ></Image>
                    </div>
                  ))}
                </div>
              </div>
              {/* End Hotel images + map */}

              {/* Start Hotel description  */}
              <div className=" hotel-shadow  bg-white">
                <div className="relative flex snap-mandatory snap-x overflow-x-auto pt-1 overflow-y-hidden lg:hidden">
                  {hotel?.Pictures.map((img, idx) => (
                    <div
                      key={idx}
                      className="relative h-52 sm:h-80 w-full flex-[0_0_100%] flex items-center justify-center "
                    >
                      <Image
                        alt="hotel"
                        src={img?.secure_url ?? "/images/no-hotel.jpg"}
                        layout="fill"
                        objectFit="fill"
                      />
                    </div>
                  ))}
                </div>
                <div className="px-4 py-8 flex flex-col gap-8">
                  <div className="relative pb-2">
                    <h1 className="text-primary text-3xl font-bold">
                      {" "}
                      {t("hotel:about-hotel")}
                    </h1>
                    <div className="absolute top-full w-12 h-1 bg-secondary"></div>
                  </div>
                  {!hotel?.DescriptionAr && !hotel.Description ? (
                    <p className="text-dark-shade text-sm ">
                      {t("hotel:no-description")}
                    </p>
                  ) : (
                    <p className="text-dark-shade text-sm ">
                      {(i18n.language === "ar"
                        ? hotel?.DescriptionAr
                        : hotel?.Description
                      ).replace(/<\/?[^>]+(>|$)/g, "")}
                    </p>
                  )}
                </div>
              </div>
              {/* End Hotel description  */}

              {/* Start Card for update date and promocode */}
              <div className="hotel-shadow">
                <HotelSearch goToSearch={goToSearch} />
              </div>
              {/* End Card for update date and promocode */}

              {/* Start Room Cards For Mobile*/}
              {roomsFetch.data?.length > 0 ? (
                <div className="flex flex-col gap-6 lg:hidden ">
                  {roomsFetch.data?.map((room, idx) => (
                    <div key={idx}>
                      <HotelRoomCard onSelectRoom={selectRoom} room={room} />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col gap-6 lg:hidden ">
                  {t("hotel:no-rooms")}
                </div>
              )}

              {/* End Room Cards For Mobile*/}

              {/* Start Room Cards Table For Desktop*/}
              {roomsFetch.isLoading ? (
                <LoadingCard />
              ) : roomsFetch.data?.length > 0 ? (
                <div className="hidden lg:block p-4 hotel-shadow bg-white">
                  <RoomCardsTable hotel={hotel} rooms={roomsFetch.data} />
                </div>
              ) : (
                <div className="hidden lg:block p-4 hotel-shadow">
                  {t("hotel:no-rooms")}
                </div>
              )}
              {/* End Room Cards Table For Desktop*/}

              {/* Start Facilities */}
              <div className="px-4 py-8 flex flex-col gap-8 bg-white hotel-shadow">
                <div className="relative pb-2">
                  <h1 className="text-primary text-3xl font-bold">
                    {t("hotel:hotel-services")}
                  </h1>
                  <div className="absolute top-full w-12 h-1 bg-secondary"></div>
                </div>
                <div className="flex flex-col gap-4">
                  <div>
                    <h2 className="font-bold text-secondary text-base mb-2">
                      {t("hotel:facility")}
                    </h2>
                    <ul className="grid grid-cols-2 lg:grid-cols-4">
                      {hotel.Facilities.slice(0, 4).map((item, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          {i18n.language === "ar" ? item.NameAr : item.Name}
                        </li>
                      ))}

                      <Disclosure>
                        {({ open }) => (
                          <>
                            <div className="flex flex-col col-span-2 lg:col-span-4">
                              <Transition
                                enter="transition duration-100 ease-out"
                                enterFrom="transform scale-95 opacity-0"
                                enterTo="transform scale-100 opacity-100"
                                leave="transition duration-75 ease-out"
                                leaveFrom="transform scale-100 opacity-100"
                                leaveTo="transform scale-95 opacity-0"
                              >
                                <Disclosure.Panel className="grid grid-cols-2 lg:grid-cols-4">
                                  {hotel.Facilities.map((item, idx) => (
                                    <li
                                      key={idx}
                                      className="flex items-center gap-2"
                                    >
                                      {i18n.language === "ar"
                                        ? item.NameAr
                                        : item.Name}
                                    </li>
                                  ))}
                                </Disclosure.Panel>
                              </Transition>

                              <Disclosure.Button className="flex justify-start items-center gap-2">
                                <i
                                  className={`icon-vuesax-bold-arrow-down text-base transform transition-transform ease-in-out duration-100 ${
                                    open ? "rotate-180" : "rotate-0"
                                  }`}
                                ></i>
                              </Disclosure.Button>
                            </div>
                          </>
                        )}
                      </Disclosure>
                    </ul>
                  </div>
                </div>
              </div>
              {/* End Facilities */}
            </div>
          </section>
        </div>
      </Layout>
    </>
  )
}

export const getServerSideProps = async (context) => {
  const queries = context.query
  const resHotel = await fetch(
    `${process.env.NEXT_PUBLIC_API}/hotels/getHotelBySlug?slug=${context.params.slug}`
  )

  const hotel = await resHotel.json()

  return {
    props: {
      ...(await serverSideTranslations(
        context.locale as string,
        ["common", "button", "home", "input", "search", "hotel"],
        nextI18NextConfig
      )),
      hotel,
    },
  }
}
export default Details
