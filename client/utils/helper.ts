export const getTheme = (): 'dark' | 'light' => {
	const classList = document.documentElement.classList;
	if (classList.contains('dark')) return 'dark';
	return 'light';
};
