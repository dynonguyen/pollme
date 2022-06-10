import { DEFAULT } from '../constants/default';
import { QUERY_KEY } from './../constants/key';

export const getTheme = (): 'dark' | 'light' => {
	const classList = document.documentElement.classList;
	if (classList.contains('dark')) return 'dark';
	return 'light';
};

export const getPageQuery = (
	query: any,
	key: string = QUERY_KEY.PAGE,
): number => {
	const pageOrPageSize = Number(query[key]);
	if (!pageOrPageSize || isNaN(pageOrPageSize) || pageOrPageSize < 1) {
		return key === QUERY_KEY.PAGE ? 1 : DEFAULT.PAGE_SIZE;
	}
	return pageOrPageSize;
};
