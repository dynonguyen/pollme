import Link from 'next/link';
import { DEFAULT } from '../constants/default';
import { QUERY_KEY } from '../constants/key';
import useLanguage from '../hooks/useLanguage';
import { dateFormat } from '../utils/format';
import { isPollClosed } from '../utils/helper';

interface PollSummaryProps {
	pollId: string;
	pollSlug: string;
	title: string;
	content: string;
	user: {
		avt?: string;
		name: string;
	};
	maxVote?: number;
	createdAt: string | Date;
	endDate?: string | Date;
	tags: { slug: string; name: string }[];
	totalComment: number;
	totalVote: number;
}

export default function PollSummary(props: PollSummaryProps): JSX.Element {
	const {
		content,
		pollId,
		pollSlug,
		title,
		tags,
		totalComment,
		maxVote,
		totalVote,
		createdAt,
		endDate,
		user,
	} = props;

	const userAvt = user.avt || DEFAULT.USER_AVT;
	const isClosed = isPollClosed(endDate, maxVote, totalVote);
	const lang = useLanguage();
	const linkOfTag = `${lang.pages.discover.link}?${QUERY_KEY.SEARCH}=#`;

	return (
		<div className='poll-summary__bg flex flex-col gap-2'>
			<div>
				<h3 className='poll-summary__title'>
					<Link href={`/poll/${pollId}/${pollSlug}`}>
						<a>
							{title}
							{isClosed && (
								<span className='ml-2 brightness-90'>
									{`[${lang.others.closed}]`}
								</span>
							)}
						</a>
					</Link>
				</h3>
				<p className='line-clamp-2 my-1 text-gray-600 dark:text-gray-400'>
					{content}
				</p>
			</div>

			<div className='mt-auto'>
				<ul className='flex gap-2 flex-wrap xl:justify-start mb-3'>
					{tags.map((tag, index) => (
						<li className='tag-link' key={index}>
							<Link href={`${linkOfTag}${tag.name}`}>{`#${tag.name}`}</Link>
						</li>
					))}
				</ul>
				<div className='flex items-center justify-between gap-2 flex-wrap'>
					<div className='flex justify-end items-center gap-1 md:gap-2 xl:col-span-2'>
						<img
							src={userAvt}
							width={24}
							height={24}
							className='rounded-full'
						/>
						<span className='break-all text-sm'>{user.name}</span>
						<span
							className='text-gray-500 text-sm'
							title={dateFormat(createdAt, true)}
						>
							{dateFormat(createdAt, false)}
						</span>
					</div>
					<div className='font-medium text-gray-500 dark:text-gray-400 text-base md:text-md text-right'>
						<span className='mr-3'>{totalComment} Comments</span>
						<span>{totalVote} Votes</span>
					</div>
				</div>
			</div>
		</div>
	);
}
