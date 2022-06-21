import { CogIcon, TrashIcon } from '@heroicons/react/solid';
import { NextPage } from 'next';
import Loading from '../../components/Loading';
import PollSummary from '../../components/PollSummary';
import { useGetVoteListOfUserQuery } from '../../graphql-client/generated/graphql';
import useLanguage from '../../hooks/useLanguage';

const AccountPolls: NextPage = () => {
	const lang = useLanguage();
	const pollLang = lang.pages.accountPolls;
	const { loading, data } = useGetVoteListOfUserQuery();
	const votes = data?.votesOfUser.votes;

	return (
		<div className='container my-6'>
			<h1 className='font-normal md:col-span-4'>{pollLang.title}</h1>
			<h3 className='text-xl py-3 border-b border-color'>
				<strong className='text-accent dark:text-d_accent'>
					{votes?.length}
				</strong>
				&nbsp;
				<span className='font-normal text-text_primary dark:text-d_text_primary'>
					{lang.others.poll}
				</span>
			</h3>

			{loading ? (
				<Loading className='mt-5 w-24' />
			) : (
				<ul className='grid grid-cols-1 md:grid-cols-2 mt-5 gap-8'>
					{votes?.map(vote => (
						<li className='h-full relative group' key={vote._id}>
							<PollSummary
								className='h-full'
								hideOwner={true}
								content={vote.shortDesc || ''}
								title={vote.title}
								createdAt={vote.createdAt}
								pollId={vote._id}
								pollSlug={vote.slug}
								tags={vote.tags}
								totalComment={vote.totalComment}
								totalVote={vote.totalVote}
								endDate={vote.endDate}
								maxVote={vote.maxVote as number}
								user={{
									name: vote.owner!.name,
									avt: vote.owner?.avt as string,
								}}
							/>

							<div className='hidden group-hover:flex gap-2 absolute right-4 top-4'>
								<CogIcon className='w-5 cursor-pointer text-color-normal hover:brightness-75 duration-200' />
								<TrashIcon className='w-5 cursor-pointer error-text hover:brightness-75 duration-200' />
							</div>
						</li>
					))}
				</ul>
			)}
		</div>
	);
};

export default AccountPolls;
