import type { NextPage } from 'next';
import HeadTitle from '../components/HeadTitle';
import useLanguage from '../hooks/useLanguage';

const Home: NextPage = () => {
	const lang = useLanguage();

	return (
		<>
			<HeadTitle title='Trang chủ' />
			<h1 className='text-3xl bg-primary text-gray-700'>
				{lang.home.title} App
			</h1>
		</>
	);
};

export default Home;
