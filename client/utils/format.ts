export function numberFormat(num: number = 0): string {
	return new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 3 }).format(
		num,
	);
}

export function dateFormat(
	dateInput: string | Date = new Date(),
	withTime: boolean = false,
): string {
	const date = new Date(dateInput);

	const h = `0${date.getHours()}`.slice(-2);
	const s = `0${date.getSeconds()}`.slice(-2);
	const m = `0${date.getMinutes()}`.slice(-2);

	const y = date.getFullYear();
	const month = `0${date.getMonth() + 1}`.slice(-2);
	const d = `0${date.getDate()}`.slice(-2);

	if (withTime) return `${h}:${m}:${s} ${d}-${month}-${y}`;
	return `${d}-${month}-${y}`;
}
