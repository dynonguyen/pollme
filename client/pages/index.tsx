import type { NextPage } from 'next';
import Header from '../components/Header';
import HeadTitle from '../components/HeadTitle';
import useLanguage from '../hooks/useLanguage';

const Home: NextPage = () => {
	const lang = useLanguage();

	return (
		<>
			<HeadTitle title={lang.title.home} />
			<Header />
		</>
	);
};

export default Home;
