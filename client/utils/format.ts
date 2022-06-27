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

export function optimizeCloudinarySrc(
	originSrc: string,
	width: number,
	height: number,
	fAuto: boolean = true,
	qAuto: boolean = true,
	others: string = '',
) {
	if (!originSrc) return '';

	const cloudinaryBaseURL = 'https://res.cloudinary.com/dynonary/image/upload';
	const index = originSrc.indexOf(cloudinaryBaseURL);

	// Not cloudinary source
	if (index === -1) {
		return originSrc;
	}

	let optimize = `${width > 0 ? `w_${width},` : ''}${
		height > 0 ? `h_${height},` : ''
	}${fAuto ? 'f_auto,' : ''}${qAuto ? 'q_auto,' : ''}${
		others && others !== '' ? others : ''
	}`;

	if (optimize[optimize.length - 1] === ',')
		optimize = optimize.slice(0, optimize.length - 1);

	return originSrc.replace(
		cloudinaryBaseURL,
		`${cloudinaryBaseURL}/${optimize}`,
	);
}
