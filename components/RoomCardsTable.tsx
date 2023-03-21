import { useTranslation } from "next-i18next"
import Image from "next/image"
import React, { useState } from "react"
import TableRow from "./TableRow"
import { useLocalStorage } from "react-use"
import Router, { useRouter } from "next/router"

type Props = {
  rooms: any
  hotel: any
}

const RoomCardsTable = ({ rooms, hotel }: Props) => {
  const { t } = useTranslation(["common", "search", "button"])

  const router = useRouter()
  const [chosenRoomsStorage, setchosenRoomsStorage, removechosenRoomsStorage] =
    useLocalStorage("chosenRooms", [])
  const [chosenHotelStorage, setchosenHotelStorage, removechosenHotelStorage] =
    useLocalStorage("chosenHotel", {})

  const [total, setTotal] = useState(0)
  let totalPrice
  const selectRoom = () => {
    totalPrice = 0
    rooms.forEach((item: any) => {
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
      setchosenRoomsStorage(chosenRoomsList)
      setchosenHotelStorage(hotel)
      router.push({
        pathname: "/hotel/booking",
      })
    }
  }

  const getChosenRooms = () => {
    let selectedRooms: any = []
    rooms.forEach((item: any) => {
      item.Data.forEach((room: any) => {
        if (room.Quantity > 0) {
          selectedRooms.push(room)
        }
      })
    })
    return selectedRooms
  }

  return (
    <div className=" border-collapse border border-solid border-dark-tint w-full bg-white">
      {/* table head */}
      <div className="flex">
        <div className="w-1/4 border border-solid border-dark-tint p-2 text-secondary font-bold text-base">
          {t("hotel:room-info")}
        </div>
        <div className="w-1/4 border border-solid border-dark-tint p-2 text-secondary font-bold text-base">
          {t("hotel:options")}
        </div>
        <div className="w-1/4 border border-solid border-dark-tint p-2 text-secondary font-bold text-base">
          {t("hotel:room-price")}
        </div>
        <div className="w-1/4 border border-solid border-dark-tint p-2 text-secondary font-bold text-base">
          {t("hotel:sum")}
        </div>
      </div>

      {/* tabel body */}

      <div className="flex">
        <div className="flex flex-col w-3/4">
          {rooms.map((room, idx) => (
            <div key={idx}>
              <TableRow room={room} onSelectRoom={selectRoom} />
            </div>
          ))}
        </div>
        <div className="w-1/4  ">
          <div className="p-4 border-y flex flex-col gap-2 border-solid border-dark-tint">
            <div className="text-secondary font-bold text-3xl ">
              {total}
              <span className="text-sm text-primary "> {t("common:sar")} </span>
            </div>
            <div className="text-black font-bold text-xs">
              {t("search:for-x-nights", {
                nights: rooms[0]?.Data[0]?.NbrNights,
              })}
            </div>
            <div className="text-dark text-xs">{t("common:TVA")}</div>
            <button
              className="btn btn-secondary py-2 mt-3 rounded-3xl"
              onClick={() => reservation()}
            >
              {t("button:book")}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RoomCardsTable
