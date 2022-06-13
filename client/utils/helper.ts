import { QUERY_KEY } from './../constants/key';

export const getTheme = (): 'dark' | 'light' => {
	const classList = document.documentElement.classList;
	if (classList.contains('dark')) return 'dark';
	return 'light';
};

export const getPageQuery = (
	query: any,
	key: string = QUERY_KEY.PAGE,
	defaultValue: number = 1,
): number => {
	const pageOrPageSize = Number(query[key]);
	if (!pageOrPageSize || isNaN(pageOrPageSize) || pageOrPageSize < 1) {
		return defaultValue;
	}
	return pageOrPageSize;
};

export const isPollClosed = (endDate?: string | Date) => {
	if (!endDate) return false;
	const date = new Date(endDate);
	if (isNaN(date.getTime())) return false;
	if (date.getTime() > Date.now()) return false;
	return true;
};

export const debounce = (
	timer: any,
	delay: number = 250,
	callbackFn: Function,
): number => {
	if (timer) clearTimeout(timer);

	timer = setTimeout(() => {
		callbackFn();
	}, delay);

	return timer;
};

export const resizeImage = (
	base64Str: string,
	maxWidth: number = 350,
	maxHeight: number = 350,
) => {
	return new Promise(resolve => {
		let img = new Image();
		img.src = base64Str;
		img.onload = () => {
			let canvas = document.createElement('canvas');
			const MAX_WIDTH = maxWidth;
			const MAX_HEIGHT = maxHeight;
			let width = img.width;
			let height = img.height;

			if (width > height) {
				if (width > MAX_WIDTH) {
					height *= MAX_WIDTH / width;
					width = MAX_WIDTH;
				}
			} else {
				if (height > MAX_HEIGHT) {
					width *= MAX_HEIGHT / height;
					height = MAX_HEIGHT;
				}
			}
			canvas.width = width;
			canvas.height = height;
			let ctx = canvas.getContext('2d');
			ctx?.drawImage(img, 0, 0, width, height);
			resolve(canvas.toDataURL());
		};
	});
};

export const createShareUrl = (
	isPrivate: boolean = true,
	privateSlug: string = '',
	publicSlug: string = '',
): string => {
	const { origin } = location;
	if (isPrivate) return `${origin}/poll/p/${privateSlug}`;

	return `${origin}/poll/${publicSlug}`;
};
