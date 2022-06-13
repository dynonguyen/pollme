import { QuestionMarkCircleIcon } from '@heroicons/react/outline';

export default function InfoTooltip({
	title,
}: {
	title: string;
	className?: string;
}): JSX.Element {
	return (
		<span title={title}>
			<QuestionMarkCircleIcon className='w-5 text-gray-500 dark:text-gray-300' />
		</span>
	);
}
