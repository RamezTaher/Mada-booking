export function getDayName(dateStr, locale) {
	const date = new Date(dateStr);
	return date.toLocaleDateString(locale, { weekday: "long" });
}
export function getMonthName(dateStr, locale) {
	const date = new Date(dateStr);
	return date.toLocaleDateString(locale, { month: "long" });
}