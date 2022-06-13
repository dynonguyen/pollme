import { APP_NAME } from '../constants';
import useLanguage from '../hooks/useLanguage';
import Sharing from './Sharing';

export default function CreatePollSuccess({
	url = APP_NAME,
}: {
	url: string;
}): JSX.Element {
	const lang = useLanguage();

	return (
		<div className='container my-6 md:my-12'>
			<div className='flex-center flex-col gap-2 md:gap-3 mb-5'>
				<h1 className='text-2xl md:text-3xl lg:text-4xl tracking-wide'>
					{lang.components.CreatePollSuccess.title}
				</h1>
				<h2 className='text-lg md:text-xl text-gray-500 dark:text-gray-300'>
					{lang.components.CreatePollSuccess.subTitle}
				</h2>
				<img
					src='/images/sharing.svg'
					className='w-32 h-32 md:w-40 md:h-40'
					alt='Poll created'
				/>
			</div>

			<Sharing url={url} />
		</div>
	);
}
