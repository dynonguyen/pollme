import { DEFAULT } from '../constants/default';

export const getTheme = (): 'dark' | 'light' => {
	const classList = document.documentElement.classList;
	if (classList.contains('dark')) return 'dark';
	return 'light';
};

export const getPageQuery = (
	query: any,
	key: 'page' | 'pageSize' = 'page',
): number => {
	const pageOrPageSize = Number(query[key]);
	if (!pageOrPageSize || isNaN(pageOrPageSize) || pageOrPageSize < 1) {
		return key === 'page' ? 1 : DEFAULT.PAGE_SIZE;
	}
	return pageOrPageSize;
};
