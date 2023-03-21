import React from "react"
import Image from "next/image"
import StartsBox from "./starts-box"
import { useTranslation } from "next-i18next"
import { parseISO, format } from "date-fns"
import ReservationRules from "./ReservationRules"

type Props = {
  room: any
  onSelectRoom: (_data: any) => void
}

const TableRow = ({ room, onSelectRoom }: Props) => {
  console.log(room)
  const { t, i18n } = useTranslation(["common", "search", "button"])
  const inc = (choice: any) => {
    choice.Quantity = parseInt(choice.Quantity) + 1
    onSelectRoom(choice)
  }
  const dec = (choice: any) => {
    if (!choice.Quantity) {
      choice.Quantity = 0
    } else {
      choice.Quantity = parseInt(choice.Quantity) - 1
    }
    onSelectRoom(choice)
  }

  const selectChoice = (choice) => {
    choice.selected = true
    choice.Quantity = 1
    onSelectRoom(choice)
  }

  function isRulesNotMet(rules: any = []) {
    let condition = rules?.filter((r) => r.FulFilled == false)
    return condition.length > 0
  }
  return (
    <div key={20} className="flex">
      <div className="p-4 border border-solid border-dark-tint w-1/3 ">
        <div className="relative mb-4">
          <Image
            alt="hotel"
            src={room?.Image?.secure_url ?? "/images/no-hotel.jpg"}
            width={360}
            height={220}
            objectFit="cover"
          ></Image>
        </div>
        <h2
          className="text-dark-shade text-base font-bold
            "
        >
          {i18n.language === "ar" ? room.RoomTypeNameAr : room.RoomTypeName}
        </h2>
      </div>
      <div className="flex flex-col w-1/3 border border-solid border-dark-tint">
        {room.Data.map((choice, idx) => (
          <div
            key={idx}
            className="flex flex-col gap-2 p-4 pb-8 border-b border-solid border-dark-tint h-48 last:border-b-0 "
          >
            <div className="flex items-center gap-2">
              <i className="icon-bed text-xs text-secondary"></i>
              <h1 className="text-dark-shade">
                {i18n.language === "ar" ? choice.MealAr : choice.Meal}
              </h1>
            </div>
            <div className="flex items-center gap-2">
              <i className="icon-balcony text-xs text-secondary"></i>
              <h1 className="text-dark-shade">
                {i18n.language === "ar" ? choice.ViewNameAr : choice.ViewName}
              </h1>
            </div>
            <div className="text-dark font-bold">
              {t("common:from")}{" "}
              {format(parseISO(choice.CheckIn), "dd-MM-yyyy")} {t("common:to")}{" "}
              {format(parseISO(choice.CheckOut), "dd-MM-yyyy")}
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-col w-1/3 border border-solid border-dark-tint">
        {room.Data.map((choice, idx) => (
          <div
            key={idx}
            className="flex flex-col  p-4 pb-8 border-b last:border-b-0 border-solid border-dark-tint h-48"
          >
            <div className="text-primary font-bold text-2xl ">
              {choice.HasPromocode ? (
                <div className="flex flex-col items-start justify-start">
                  <span className="line-through decoration-danger flex items-center gap-1">
                    <span>{choice.Price}</span>

                    <span className="text-sm text-secondary ">
                      {t("common:sar")}{" "}
                    </span>
                  </span>
                  <span className="flex items-center gap-1">
                    <span>{choice.PriceToPay}</span>
                    <span className="text-sm text-secondary ">
                      {t("common:sar")}{" "}
                    </span>
                  </span>
                </div>
              ) : (
                <div className="flex items-center gap-1">
                  <span>{choice.Price}</span>

                  <span className="text-sm text-secondary ">
                    {t("common:sar")}{" "}
                  </span>
                </div>
              )}
            </div>
            <div className="text-black font-bold text-xs">
              {t("search:for-x-nights", {
                nights: choice.NbrNights,
              })}
            </div>
            <div className="text-dark text-xs">{t("common:TVA")}</div>
            {choice.selected && choice.Quantity > 0 && (
              <div className="choice-btns w-full flex mt-3 items-center">
                <button
                  className="choice-btn-right btn btn-secondary w-4 h-5 p-5 text-white"
                  onClick={() => dec(choice)}
                >
                  -
                </button>
                <div className="w-full flex items-center justify-center text-black font-bold">
                  {choice.Quantity}
                </div>
                <button
                  className="choice-btn-left btn btn-secondary w-4 h-5 p-5 text-white"
                  onClick={() => inc(choice)}
                >
                  +
                </button>
              </div>
            )}

            <ReservationRules rules={choice.Rules} />

            {!choice.CutOutTimeMet && (
              <div className="text-red-600">
                {t("common:CutOutTimeNotMet")} {choice.CutOutTime}
              </div>
            )}
            {!choice.MinimumCheckInDateMet && (
              <div className="text-red-600">
                {t("common:MinimumCheckInDateNotMet")}{" "}
                {choice.MinimumCheckInDate.substr(0, 10)}
              </div>
            )}

            {(!choice.selected || choice.Quantity == 0) &&
              choice.CutOutTimeMet &&
              choice.MinimumCheckInDateMet &&
              (choice?.Rules?.length == 0 || !isRulesNotMet(choice.Rules)) && (
                <button
                  className="btn btn-secondary py-2 mt-3 rounded-3xl"
                  onClick={() => selectChoice(choice)}
                >
                  {choice.Request
                    ? t("button:request-booking")
                    : t("button:book-now")}
                </button>
              )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default TableRow
