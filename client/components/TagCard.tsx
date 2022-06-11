import Link from 'next/link';
import useLanguage from '../hooks/useLanguage';

interface TagCardProps {
	title: string;
	desc?: string | undefined;
	link: string;
	nPolls: number;
}

export default function TagCard({
	desc = '',
	link,
	title,
	nPolls = 0,
}: TagCardProps): JSX.Element {
	const lang = useLanguage();

	return (
		<div className='p-2 md:p-3 border dark:border-gray-600 rounded-md flex flex-col'>
			<div className='tag-link text-base rounded-md w-max'>
				<Link href={link}>
					<a>{title}</a>
				</Link>
			</div>
			<p
				className='text-sm text-gray-600 dark:text-gray-400 line-clamp-3 my-3'
				title={desc}
			>
				{desc}
			</p>
			<div className='text-right text-gray-400 dark:text-gray-500 text-sm mt-auto'>
				{nPolls} {lang.others.poll}
			</div>
		</div>
	);
}
