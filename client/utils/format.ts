export function numberFormat(num: number = 0): string {
	return new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 3 }).format(
		num,
	);
}
