import React from "react"
import Image from "next/image"
import StartsBox from "./starts-box"
import { useTranslation } from "next-i18next"
import Link from "next/link"
import { useRouter } from "next/router"
type Props = {}

const SearchHotelCard = ({ hotel }) => {
  const { t } = useTranslation(["common", "search", "button"])

  const { query } = useRouter()
  const getPrice = (rooms: any) => {
    const prices = rooms.map((room: any) => {
      return Number(room.PriceToPay)
    })
    return Math.min.apply(Math, prices)
  }

  const getPriceOriginal = (rooms: any) => {
    const prices = rooms.map((room: any) => {
      return Number(room.Price)
    })
    return Math.min.apply(Math, prices)
  }

  const getNights = (rooms: any) => {
    return rooms[0]?.NbrNights
  }
  return (
    <div className="flex flex-col md:flex-row  hotel-shadow w-full bg-white">
      <div className="relative h-44 md:h-auto md:min-h-full w-full md:w-1/4">
        <Image
          alt="hotel"
          src={hotel?.DefaultPicture ?? "/images/no-hotel.jpg"}
          layout="fill"
          objectFit="cover"
        ></Image>
      </div>
      <div className="w-full flex flex-col md:flex-row md:w-3/4">
        <div className="md:w-2/3 w-full p-2.5 md:p-4 ">
          <div className="border-b border-solid border-dark-tint md:border-e">
            <div className="flex justify-start md:items-center pb-2 md:mb-4 gap-2 md:gap-4 items-start flex-col md:flex-row">
              <h2 className="font-bold text-xl md:text-2xl">
                {hotel.NameAr ?? hotel.Name}
              </h2>
              <StartsBox rating={hotel.Stars} />
            </div>
            <div className="flex justify-start items-center gap-2 pb-2 ">
              <i className="icon-place_black_24dp text-dark"></i>
              <div className="text-dark text-sm truncate">
                {hotel.AdressAr ?? hotel.Adress}
              </div>
            </div>
          </div>
          <div className="flex justify-start items-center gap-2 border-b md:border-b-0 md:border-e pt-2 border-solid border-dark-tint">
            <i className="icon-room_service_black_24dp text-2xl text-secondary"></i>
            <i className="icon-wifi_black_24dp text-2xl text-secondary"></i>
            <i className="icon-local_parking_black_24dp text-2xl text-secondary"></i>
            <i className="icon-shower_black_24dp text-2xl text-secondary"></i>
            <i className="icon-ac_unit_black_24dp text-2xl text-secondary"></i>
          </div>
        </div>

        <div className="flex justify-between items-start md:flex-col p-2.5 md:p-4 w-full md:w-1/3">
          {hotel.BookableRooms.length > 0 && (
            <div className="">
              <div className="text-secondary font-bold text-xl md:text-3xl flex items-end gap-1">
                {hotel.BookableRooms[0].HasPromocode ? (
                  <div className="flex flex-col items-start justify-start">
                    <span className="line-through decoration-danger flex items-center gap-1">
                      <span>{getPriceOriginal(hotel.BookableRooms)}</span>

                      <span className="text-sm text-secondary ">
                        {t("common:sar")}{" "}
                      </span>
                    </span>
                    <span className="flex items-center gap-1">
                      <span>{getPrice(hotel.BookableRooms)}</span>
                      <span className="text-sm text-secondary ">
                        {t("common:sar")}{" "}
                      </span>
                    </span>
                  </div>
                ) : (
                  <div>
                    <span>{getPrice(hotel.BookableRooms)}</span>

                    <span className="text-sm text-secondary ">
                      {t("common:sar")}{" "}
                    </span>
                  </div>
                )}
              </div>
              <div className="text-dark font-bold text-xs">
                {t("search:for-x-nights", {
                  nights: getNights(hotel.BookableRooms),
                })}
              </div>
            </div>
          )}
          <Link
            href={{
              pathname: `/hotel/[slug]`,
              query: {
                slug: hotel.Slug,
                ...query,
              },
            }}
            passHref
            type="button"
          >
            <button
              className={`btn btn-primary lg:w-full rounded-full mt-auto ${
                hotel.BookableRooms.length > 0 ? "w-36 " : "w-full"
              }`}
            >
              {t("button:book")}
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default SearchHotelCard
