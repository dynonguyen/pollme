import { APP_NAME } from '../constants';
import useLanguage from '../hooks/useLanguage';
import LinkShare from './LinkShare';

export default function CreatePollSuccess({
	url = APP_NAME,
}: {
	url: string;
}): JSX.Element {
	const lang = useLanguage();

	return (
		<div className='container my-6 md:my-12'>
			<div className='flex-center mb-5 flex-col space-y-2 md:space-y-3'>
				<h1 className='text-2xl tracking-wide md:text-3xl lg:text-4xl'>
					{lang.components.CreatePollSuccess.title}
				</h1>
				<h2 className='text-lg text-gray-500 dark:text-gray-300 md:text-xl'>
					{lang.components.CreatePollSuccess.subTitle}
				</h2>
				<img
					src='/images/sharing.svg'
					className='h-32 w-32 md:h-40 md:w-40'
					alt='Poll created'
				/>
			</div>

			<LinkShare url={url} />
		</div>
	);
}
