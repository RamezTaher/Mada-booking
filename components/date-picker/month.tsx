import { FirstDayOfWeek, useMonth } from "@datepicker-react/hooks";
import { useContext } from "react";
import Day from "./day";
import DatePickerContext from "./date-picker-context";
type Props = {
	year: number;
	month: number;
	firstDayOfWeek: FirstDayOfWeek;
	index: number;
};

const Month = ({ year, month, firstDayOfWeek, index }: Props) => {
	const { goToNextMonthsByOneMonth, goToPreviousMonthsByOneMonth } =
		useContext(DatePickerContext);
	const { days, weekdayLabels, monthLabel } = useMonth({
		year,
		month,
		firstDayOfWeek,
	});

	return (
		<div className={`${index === 0 && "lg:pe-2.5"} ${index === 1 && "lg:ps-2.5"}`}>
			<div className="flex justify-center lg:justify-between items-center mb-1">
				<div
					onClick={goToPreviousMonthsByOneMonth}
					className={`cursor-pointer rounded-full w-6 h-6 lg:flex justify-center items-center border-2 border-primary border-solid hidden ${
						index === 0 ? "visible" : "invisible"
					}`}>
					<i className="icon-chevron_left_black_24dp-1 text-primary text-sm transform rtl:rotate-180"></i>
				</div>
				<div className="text-sm text-center">{monthLabel}</div>
				<div
					onClick={goToNextMonthsByOneMonth}
					className={`cursor-pointer rounded-full w-6 h-6 lg:flex justify-center items-center border-2 border-primary border-solid hidden ${
						index === 1 ? "visible" : "invisible"
					}`}>
					<i className="icon-chevron_left_black_24dp-1 text-primary text-sm transform ltr:rotate-180"></i>
				</div>
			</div>
			<div className="grid grid-cols-7 items-center justify-items-center">
				{weekdayLabels.map((dayLabel) => (
					<div
						className="text-primary w-8 h-7 font-bold text-xs flex justify-center items-center"
						key={dayLabel}>
						{dayLabel}
					</div>
				))}
			</div>
			<div className="grid grid-cols-7 items-center justify-items-center">
				{days.map((day, index) => {
					if (typeof day === "object") {
						return (
							<Day
								date={day.date}
								key={day.date.toString()}
								dayLabel={day.dayLabel}
							/>
						);
					}

					return <div key={index} />;
				})}
			</div>
		</div>
	);
};

export default Month;
