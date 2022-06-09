import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { DEFAULT } from '../constants/default';
import { dateFormat } from '../utils/format';

interface PollSummaryProps {
	pollId: string;
	pollSlug: string;
	title: string;
	content: string;
	user: {
		avt?: string;
		name: string;
	};
	createdAt: string | Date;
	tags: { link: string; name: string }[];
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
		totalVote,
		createdAt,
		user,
	} = props;

	const userAvt = user.avt || DEFAULT.USER_AVT;

	return (
		<div className='poll-summary__bg flex flex-col gap-2'>
			<div>
				<h3 className='poll-summary__title'>
					<Link href={`/poll/${pollId}/${pollSlug}`}>
						<a>{title}</a>
					</Link>
				</h3>
				<p className='line-clamp-2 my-2'>{content}</p>
			</div>
			<div className='grid grid-cols-1 xl:grid-cols-2 mt-auto gap-2'>
				<div className='flex justify-end items-center gap-1 md:gap-2 xl:col-span-2'>
					<Image
						src={userAvt}
						width={28}
						height={28}
						className='rounded-full'
					/>
					<span className='break-all'>{user.name}</span>
					<span
						className='text-gray-500 text-sm'
						title={dateFormat(createdAt, true)}
					>
						{dateFormat(createdAt, false)}
					</span>
				</div>
				<ul className='flex gap-2 flex-wrap justify-end xl:justify-start'>
					{tags.map((tag, index) => (
						<li className='tag-link' key={index}>
							<Link href={`/tags/${tag.link}`}>{`#${tag.name}`}</Link>
						</li>
					))}
				</ul>
				<div className='font-medium text-gray-500 dark:text-gray-400 text-base md:text-lg text-right'>
					<span className='mr-3'>{totalComment} Comments</span>
					<span>{totalVote} Votes</span>
				</div>
			</div>
		</div>
	);
}
