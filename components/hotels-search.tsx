import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { type } from "os";
import React, { useEffect, useState } from "react";
import DatePicker from "./date-picker";
import DirectionDrop from "./direction-drop";
import format from "date-fns/format";
import { addDays } from "date-fns";

type City = {
	Id: number;
	Name: string;
	NameAr: number;
};
type Props = {
	goToSearch: (_data: any) => void;
	citiesList?: City[];
};

const HotelSearch = ({ goToSearch, citiesList }: Props) => {
	const { t } = useTranslation(["input", "button", "home"]);
	const router = useRouter();
	const [queriesObject, setQueriesObject] = useState<{
		checkin: string;
		checkout: string;
		promocode: string;
		city: number;
	}>({
		city: 0,
		checkin: router.query.checkin
			? (router.query.checkin as string)
			: format(addDays(new Date(), 1), "yyyy-MM-dd"),
		checkout: router.query.checkout
			? (router.query.checkout as string)
			: format(addDays(new Date(), 2), "yyyy-MM-dd"),
		promocode: router.query.promocode ? (router.query.promocode as string) : "",
	});

	const handleChangeDate = (data) => {
		setQueriesObject({
			...queriesObject,
			checkin: format(data.startDate, "yyyy-MM-dd"),
			checkout: format(
				data.endDate ? data.endDate : data.startDate,
				"yyyy-MM-dd"
			),
		});
	};

	useEffect(() => {
		setQueriesObject({
			...queriesObject,
			city: router.query.city ? Number(router.query.city) : 0,
			checkin: router.query.checkin
				? (router.query.checkin as string)
				: format(addDays(new Date(), 1), "yyyy-MM-dd"),
			checkout: router.query.checkout
				? (router.query.checkout as string)
				: format(addDays(new Date(), 2), "yyyy-MM-dd"),
			promocode: router.query.promocode
				? (router.query.promocode as string)
				: "",
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [router.query]);

	return (
		<div className="shadow-md flex flex-col lg:flex-row w-full gap-2 xl:gap-4 p-2.5 lg:p-0 bg-white">
			{router.pathname === "/hotel" && (
				<DirectionDrop
					onChangeDirection={(city) =>
						setQueriesObject({ ...queriesObject, city: city })
					}
					directions={citiesList}
				/>
			)}

			<DatePicker
				chosenDates={{
					startDate: new Date(queriesObject.checkin),
					endDate: new Date(queriesObject.checkout),
				}}
				changeDate={handleChangeDate}
			/>
			<div
				className={`relative w-full justify-between flex flex-col gap-2 p-2.5 lg:p-5 border-b border-solid lg:border-transparent border-dark-tint ${
					router.pathname !== "/hotel" ? "lg:w-4/12" : "lg:w-3/12"
				} `}>
				<div className="flex justify-start items-center gap-1.5">
					<i className="icon-Group-54481 text-primary"></i>
					<div className="text-dark text-xs lg:text-base ">
						{t("input:promo-code")}
					</div>
				</div>
				<input
					className="p-0 border-0 font-medium text-base md:text-xl"
					type="text"
					placeholder={t("input:promo-code") + "..."}
					onChange={(event) =>
						setQueriesObject({
							...queriesObject,
							promocode: event.target.value,
						})
					}
					value={queriesObject.promocode}
				/>
			</div>
			<button
				onClick={() => goToSearch(queriesObject)}
				className="relative z-20 btn btn-primary lg:w-1/12 w-full">
				<i className="icon-search_black_24dp text-4xl"></i>
			</button>
		</div>
	);
};

export default HotelSearch;
