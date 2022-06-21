import {
	GetServerSideProps,
	InferGetServerSidePropsType,
	NextPage,
} from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { Suspense, useRef, useState } from 'react';
import { useRecoilValue } from 'recoil';
import CommentArea from '../../components/Comment/CommentArea';
import InfoTooltip from '../../components/InfoTooltip';
import Loading from '../../components/Loading';
import AddOptionButton from '../../components/PollOption/AddOptionButton';
import MultipleChoice from '../../components/PollOption/MultipleChoice';
import ScoreChoice from '../../components/PollOption/ScoreChoice';
import SingleChoice from '../../components/PollOption/SingleChoice';
import ReCAPTCHA from '../../components/ReCAPTCHA';
import SocialShare from '../../components/SocialShare';
import { APP_NAME, HOST_URI, VOTE_TYPE } from '../../constants';
import { DEFAULT } from '../../constants/default';
import { QUERY_KEY } from '../../constants/key';
import { SUCCESS_CODE } from '../../constants/status';
import {
	AnswerItem,
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
import {
	isPollClosed,
	pollRanking,
	pollTypeToString,
} from '../../utils/helper';
const PollResultChart = React.lazy(
	() => import('../../components/PollResultChart'),
);

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
	const [pollResult, setPollResult] = useState<{
		data: number[];
		labels: string[];
	} | null>(null);

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

	const handleAddOptionSuccess = (newAnswer: AnswerItem) => {
		const newAnswers: AnswerItem[] = [...(vote?.answers || []), newAnswer];
		const newVote: any = { ...vote, answers: newAnswers };
		setVote({ ...newVote });
	};

	const handleShowResult = () => {
		const rankingList = pollRanking(
			vote?.answers,
			vote?.type === VOTE_TYPE.SCORE,
		);
		const pollData: number[] = rankingList.map(r => r.score);
		const pollLabels: string[] = rankingList.map(
			rankItem =>
				vote?.answers.find(ans => ans.id === rankItem.id)?.label || 'Other',
		);
		setPollResult({ data: pollData, labels: pollLabels });
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
						<span className='text-gray-500 dark:text-gray-400 text-sm'>
							{vote?.owner?.name}
						</span>
						<span className='text-gray-500 dark:text-gray-400 text-sm'>
							{dateFormat(vote?.createdAt, true)}
						</span>
						<span className='text-gray-500 dark:text-gray-400 text-sm'>
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

				{/* Content Or Result */}
				{pollResult ? (
					<div className='max-w-lg mx-auto w-full my-5'>
						<Suspense fallback={<Loading />}>
							<PollResultChart
								data={pollResult.data}
								labels={pollResult.labels}
							/>
						</Suspense>
					</div>
				) : (
					<>
						{/* Type */}
						<div className='flex items-center gap-2 mt-3'>
							<strong className='text-gradient text-xl capitalize'>
								{pollTypeToString(vote?.type)}
							</strong>
							<InfoTooltip
								title={lang.helper.pollTypes[vote?.type as number]}
							/>
						</div>

						{/* poll options */}
						<div className='my-5 grid grid-cols-1 gap-3 md:gap-6'>
							{vote?.type === VOTE_TYPE.SINGLE_CHOICE ? (
								<SingleChoice
									showResult={vote.isShowResult}
									options={vote.answers || []}
									ownerId={vote.ownerId || ''}
									pollId={vote._id || ''}
									isIPDuplicationCheck={vote.isIPDuplicationCheck}
									onChecked={optionId => {
										choices.current.votes = [{ id: optionId, score: null }];
									}}
									onUncheck={optionId => {
										choices.current.unVoteIds = [optionId];
									}}
								/>
							) : vote?.type === VOTE_TYPE.MULTIPLE_CHOICE ? (
								<MultipleChoice
									options={vote.answers}
									ownerId={vote.ownerId}
									pollId={vote._id}
									isIPDuplicationCheck={vote.isIPDuplicationCheck}
									onChecked={({ id, checked }) => {
										const vIndex = choices.current.votes?.findIndex(
											v => v.id === id,
										);

										if (vIndex !== -1 && !checked) {
											choices.current.votes?.splice(vIndex!, 1);
										}
										if (vIndex === -1 && checked)
											choices.current.votes?.push({ id, score: null });
									}}
									onUnChecked={id =>
										!choices.current.unVoteIds?.includes(id) &&
										choices.current.unVoteIds?.push(id)
									}
								/>
							) : vote?.type === VOTE_TYPE.SCORE ? (
								<ScoreChoice
									options={vote.answers}
									ownerId={vote.ownerId}
									pollId={vote._id}
									maxScore={vote.maxScore || DEFAULT.VOTE.MAX_SCORE}
									isIPDuplicationCheck={vote.isIPDuplicationCheck}
									showResult={vote.isShowResult}
									onScoreChange={({ id, score }) => {
										if (choices.current.votes) {
											const choiceIndex = choices.current.votes.findIndex(
												c => c.id === id,
											);
											if (choiceIndex !== -1) {
												choices.current.votes[choiceIndex].score = score;
											} else {
												choices.current.votes.push({ id, score });
											}
										}
									}}
								/>
							) : (
								<></>
							)}
						</div>

						{/* add option */}
						{vote?.allowAddOption && (
							<div className='my-3'>
								<AddOptionButton
									pollId={vote._id}
									ownerId={vote.ownerId}
									onAddOptionSuccess={handleAddOptionSuccess}
								/>
							</div>
						)}

						{/* ReCAPTCHA */}
						{vote?.isReCaptcha && !isClosed && (
							<div className='flex justify-end mb-5'>
								<ReCAPTCHA onChange={token => setReCaptchaToken(token)} />
							</div>
						)}
					</>
				)}

				{/* button group */}
				<div className='flex justify-end gap-3 pt-3'>
					{vote?.isShowResultBtn && (
						<button
							className='btn-outline md:btn-lg rounded-full font-medium'
							onClick={
								pollResult ? () => setPollResult(null) : handleShowResult
							}
						>
							{pollResult ? pollLang.hideResultBtn : pollLang.showResultBtn}
						</button>
					)}

					{!pollResult &&
						(!userInfo._id && vote?.isLoginRequired ? (
							<Link href={lang.pages.login.link}>
								<button className='btn-accent md:btn-lg rounded-full font-medium'>
									{pollLang.requiredLogin}
								</button>
							</Link>
						) : (
							!isClosed && (
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
							)
						))}
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
