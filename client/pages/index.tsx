import type { NextPage } from 'next';
import useLanguage from '../hooks/useLanguage';

const Home: NextPage = () => {
	const lang = useLanguage();
	return <h1 className='text-3xl text-gray-700'>{lang.home.title} App</h1>;
};

export default Home;
