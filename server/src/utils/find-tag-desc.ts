import axios from 'axios';

const wikipediaApiSearch = (keyword: string = '', lang: 'en' | 'vi' = 'en') =>
	`https://${lang}.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=1&prop=extracts&explaintext&exsentences=3&origin=*&gsrsearch=${keyword}`;

const findDescForTag = async (
	tag: string,
	lang: 'vi' | 'en' = 'en',
): Promise<string> => {
	try {
		const apiRes = await axios.get(wikipediaApiSearch(tag, lang));
		const data = apiRes.data;
		if (data?.query?.pages) {
			const pages = data.query.pages;
			const keys = Object.keys(pages);
			if (keys.length) {
				return pages[keys[0]]?.extract || '';
			}
		}
		return '';
	} catch (error) {
		return '';
	}
};

export default findDescForTag;
