import {
	GetServerSideProps,
	InferGetServerSidePropsType,
	NextPage,
} from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useRef, useState } from 'react';
import { useRecoilValue } from 'recoil';
import CommentArea from '../../components/Comment/CommentArea';
import InfoTooltip from '../../components/InfoTooltip';
import SingleChoice from '../../components/PollOption/SingleChoice';
import ReCAPTCHA from '../../components/ReCAPTCHA';
import SocialShare from '../../components/SocialShare';
import { APP_NAME, HOST_URI, VOTE_TYPE } from '../../constants';
import { DEFAULT } from '../../constants/default';
import { QUERY_KEY } from '../../constants/key';
import { SUCCESS_CODE } from '../../constants/status';
import {
	CommentPaginatedResponse,
	CommentsDocument,
	CommentsQuery,
	CommentsQueryVariables,
	GetPublicVoteByIdDocument,
	GetPublicVoteByIdQuery,
	GetPublicVoteByIdQueryVariables,
	useVotingMutation,
	VotingInput,
} from '../../graphql-client/generated/graphql';
import useLanguage from '../../hooks/useLanguage';
import useToast from '../../hooks/useToast';
import { addApolloState, initializeApollo } from '../../lib/apolloClient';
import userAtom from '../../recoil/atoms/user.atom';
import { dateFormat } from '../../utils/format';
import { isPollClosed, pollTypeToString } from '../../utils/helper';

const classes = {
	smGray: 'text-gray-500 dark:text-gray-400 text-sm',
};

const Poll: NextPage<
	InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ voteDoc, commentDoc }) => {
	const [vote, setVote] = useState(voteDoc.publicVote?.vote);

	const lang = useLanguage();
	const pollLang = lang.pages.poll;
	const router = useRouter();
	const userInfo = useRecoilValue(userAtom);
	const linkOfTag = `${lang.pages.discover.link}?${QUERY_KEY.SEARCH}=#`;
	const [reCaptchaToken, setReCaptchaToken] = useState<string | null>(null);
	const choices = useRef<Partial<VotingInput>>({ unVoteIds: [], votes: [] });
	const [votingMutation, { loading }] = useVotingMutation();
	const toast = useToast();

	const isClosed = isPollClosed(
		vote?.endDate,
		vote?.maxVote as number,
		vote?.totalVote,
	);

	const handleVoteSubmit = async () => {
		if (!choices.current.votes?.length && !choices.current.unVoteIds?.length)
			return;

		const votingRes = await votingMutation({
			variables: {
				votingInput: {
					pollId: vote?._id!,
					userInfo: {
						userId: userInfo._id,
						userIp: userInfo.ip,
						username: userInfo.name,
					},
					unVoteIds: choices.current.unVoteIds,
					votes: choices.current.votes,
				},
			},
		});

		if (votingRes.data?.voting.success) {
			toast.show({ message: pollLang.votingSuccess, type: 'success' });
			choices.current = { unVoteIds: [], votes: [] };
			setVote(votingRes.data.voting.vote);
		} else {
			toast.show({ message: pollLang.votingFailed, type: 'error' });
		}
	};

	return (
		<>
			<Head>
				<title>
					{vote?.title} | {APP_NAME}
				</title>
				<meta name='description' content={vote?.desc || vote?.title} />
			</Head>

			<div className='max-w-4xl px-3 md:px-6 mx-auto my-3 md:my-5'>
				{/* Title */}
				<h1 className='text-2xl md:text-3xl md:mb-2 font-normal'>
					{vote?.title}
					{isClosed && (
						<span className='ml-2 brightness-90'>
							{`[${lang.others.closed}]`}
						</span>
					)}
				</h1>
				<div className='grid grid-cols-1 md:grid-cols-2 gap-2 py-3 border-b border-color'>
					<div className='flex items-center gap-2 md:gap-2'>
						<img
							src={vote?.owner?.avt || DEFAULT.USER_AVT}
							width={24}
							height={24}
							className='rounded-full'
						/>
						<span className={classes.smGray}>{vote?.owner?.name}</span>
						<span className={classes.smGray}>
							{dateFormat(vote?.createdAt, true)}
						</span>
						<span className={classes.smGray}>
							<b>{vote?.totalVote || 0}</b> voted
						</span>
					</div>
					<SocialShare
						className='md:justify-end'
						shareLink={`${HOST_URI}${router.asPath}`}
					/>
				</div>

				{/* Tags */}
				<ul className='flex gap-2 flex-wrap xl:justify-start my-3'>
					{vote?.tags.map((tag, index) => (
						<li className='tag-link' key={index}>
							<Link href={`${linkOfTag}${tag.name}`}>{`#${tag.name}`}</Link>
						</li>
					))}
				</ul>

				{/* Description */}
				<p className='md:text-lg text-gray-600 dark:text-d_text_primary'>
					{vote?.desc}
				</p>

				{/* Type */}
				<div className='flex items-center gap-2 mt-3'>
					<strong className='text-gradient text-xl capitalize'>
						{pollTypeToString(vote?.type)}
					</strong>
					<InfoTooltip title={lang.helper.pollTypes[vote?.type as number]} />
				</div>

				{/* poll options */}
				<div className='my-5 grid grid-cols-1 gap-3 md:gap-6'>
					{vote?.type === VOTE_TYPE.SINGLE_CHOICE && (
						<SingleChoice
							showResult={vote.isShowResult}
							options={vote?.answers || []}
							ownerId={vote?.ownerId || ''}
							pollId={vote?._id || ''}
							isIPDuplicationCheck={vote.isIPDuplicationCheck}
							onChecked={optionId => {
								choices.current.votes = [
									{ id: optionId, rank: null, score: null },
								];
							}}
							onUncheck={optionId => {
								choices.current.unVoteIds = [optionId];
							}}
						/>
					)}
				</div>

				{/* ReCAPTCHA */}
				{vote?.isReCaptcha && (
					<div className='flex justify-end mb-5'>
						<ReCAPTCHA onChange={token => setReCaptchaToken(token)} />
					</div>
				)}

				{/* button group */}
				<div className='flex justify-end gap-3 pt-3'>
					{vote?.isShowResultBtn && (
						<button className='btn-outline md:btn-lg rounded-full font-medium'>
							{pollLang.showResultBtn}
						</button>
					)}

					{!userInfo._id && vote?.isLoginRequired ? (
						<Link href={lang.pages.login.link}>
							<button className='btn-accent md:btn-lg rounded-full font-medium'>
								{pollLang.requiredLogin}
							</button>
						</Link>
					) : (
						<button
							className={`btn-accent md:btn-lg rounded-full font-medium ${
								(vote?.isReCaptcha && !reCaptchaToken) || loading
									? 'disabled'
									: ''
							}`}
							onClick={handleVoteSubmit}
						>
							{pollLang.submit}
						</button>
					)}
				</div>

				{/* Comment list */}
				<div className='h-[1px] bg-gray-200 dark:bg-gray-600 my-4 md:my-6'></div>
				<h2 className='text-xl md:text-2xl font-normal'>
					{`${vote?.totalComment} ${pollLang.comment}`}
				</h2>
				<CommentArea
					initialComments={commentDoc.comments as CommentPaginatedResponse}
					voteId={vote?._id!}
				/>
			</div>
		</>
	);
};

export const getServerSideProps: GetServerSideProps<{
	voteDoc: GetPublicVoteByIdQuery;
	commentDoc: CommentsQuery;
}> = async ({ params }) => {
	const apolloClient = initializeApollo();
	const id = params?.id?.[0] || '';

	const voteRes = await apolloClient.query<
		GetPublicVoteByIdQuery,
		GetPublicVoteByIdQueryVariables
	>({
		query: GetPublicVoteByIdDocument,
		variables: {
			voteId: id,
		},
	});
	const commentRes = await apolloClient.query<
		CommentsQuery,
		CommentsQueryVariables
	>({
		query: CommentsDocument,
		variables: {
			voteId: id,
			page: 1,
			pageSize: DEFAULT.PAGE_SIZE,
		},
	});

	const voteDoc: GetPublicVoteByIdQuery = voteRes.data;
	const commentDoc: CommentsQuery = commentRes.data;

	if (voteDoc.publicVote?.code !== SUCCESS_CODE.OK) {
		return {
			notFound: true,
		};
	}
	addApolloState(apolloClient, { props: {} });

	return {
		props: {
			voteDoc,
			commentDoc,
		},
	};
};

export default Poll;
