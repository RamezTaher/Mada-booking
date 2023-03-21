import { useRef, useContext } from "react";
import { isEndDate, isStartDate, useDay } from "@datepicker-react/hooks";
import DatePickerContext from "./date-picker-context";

type Props = {
	dayLabel: string;
	date: Date;
};

const Day = ({ dayLabel, date }: Props) => {
	const dayRef = useRef(null);
	const {
		focusedDate,
		isDateFocused,
		isDateSelected,
		isDateHovered,
		isDateBlocked,
		isStartDate,
		isEndDate,
		isFirstOrLastSelectedDate,
		onDateSelect,
		onDateFocus,
		onDateHover,
	} = useContext(DatePickerContext);
	const {
		isSelected,
		isSelectedStartOrEnd,
		isWithinHoverRange,
		disabledDate,
		onClick,
		onKeyDown,
		onMouseEnter,
		tabIndex,
	} = useDay({
		date,
		focusedDate,
		isDateFocused,
		isDateSelected,
		isDateHovered,
		isDateBlocked,
		isFirstOrLastSelectedDate,
		onDateFocus,
		onDateSelect,
		onDateHover,
		dayRef,
	});

	if (!dayLabel) {
		return <div className="lg:h-8 h-12 w-full" />;
	}
	return (
		<button
			className={`lg:h-8 h-12 w-full text-sm font-semibold font-sans  ${
				isSelectedStartOrEnd
					? "bg-primary text-white"
					: isDateBlocked(date)
					? "text-dark"
					: "text-dark-shade"
			} ${isStartDate(date) ? "rounded-s-full" : "rounded-none"}
             ${isEndDate(date) ? "rounded-e-full" : "rounded-none"}
            ${!isSelectedStartOrEnd && isSelected ? "bg-dark-tint" : ""} ${
				!isSelectedStartOrEnd && "hover:bg-dark-tint"
			}`}
			onClick={(e) => {
				if (!disabledDate) onDateSelect(date);
			}}
			onKeyDown={onKeyDown}
			onMouseEnter={onMouseEnter}
			tabIndex={tabIndex}
			type="button"
			ref={dayRef}>
			{dayLabel}
		</button>
	);
};

export default Day;
