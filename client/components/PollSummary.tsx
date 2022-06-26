import Link from 'next/link';
import { DEFAULT } from '../constants/default';
import { PRIVATE_POLL_PARAM, QUERY_KEY } from '../constants/key';
import useLanguage from '../hooks/useLanguage';
import { dateFormat, toStaticUri } from '../utils/format';
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
	className?: string;
	hideOwner?: boolean;
	isPrivate?: boolean;
	privateLink?: string;
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
		className = '',
		hideOwner = false,
		isPrivate = false,
		privateLink = '',
	} = props;

	const userAvt = user.avt ? toStaticUri(user.avt) : DEFAULT.USER_AVT;
	const isClosed = isPollClosed(endDate, maxVote, totalVote);
	const lang = useLanguage();
	const linkOfTag = `${lang.pages.discover.link}?${QUERY_KEY.SEARCH}=`;
	const pollUrl = isPrivate
		? `/poll/${PRIVATE_POLL_PARAM}/${privateLink}/${pollId}`
		: `/poll/${pollId}/${pollSlug}`;

	return (
		<div className={`poll-summary__bg flex flex-col gap-2 ${className}`}>
			<div>
				<h3 className='poll-summary__title'>
					<Link href={pollUrl}>
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
				<p className='my-1 text-gray-600 line-clamp-2 dark:text-gray-400'>
					{content}
				</p>
			</div>

			<div className='mt-auto'>
				<ul className='mb-3 flex flex-wrap gap-2 xl:justify-start'>
					{tags.map((tag, index) => (
						<li className='tag-link' key={index}>
							<Link href={`${linkOfTag}[${tag.name}]`}>{`#${tag.name}`}</Link>
						</li>
					))}
				</ul>
				<div className='flex flex-wrap items-center justify-between gap-2'>
					<div className='flex items-center justify-end gap-1 md:gap-2 xl:col-span-2'>
						{!hideOwner && (
							<>
								<img
									src={userAvt}
									width={24}
									height={24}
									className='rounded-full'
								/>
								<span className='break-all text-sm'>{user.name}</span>
							</>
						)}
						<span
							className='text-sm text-gray-500'
							title={dateFormat(createdAt, true)}
						>
							{dateFormat(createdAt, false)}
						</span>
					</div>
					<div className='md:text-md ml-auto text-right text-base font-medium text-gray-500 dark:text-gray-400'>
						<span className='mr-3'>{totalComment} Comments</span>
						<span>{totalVote} Votes</span>
					</div>
				</div>
			</div>
		</div>
	);
}
