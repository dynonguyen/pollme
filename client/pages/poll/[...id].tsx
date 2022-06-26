import { ApolloQueryResult } from '@apollo/client';
import {
	GetServerSideProps,
	InferGetServerSidePropsType,
	NextPage,
} from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { Suspense, useEffect, useRef, useState } from 'react';
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
import { PRIVATE_POLL_PARAM, QUERY_KEY } from '../../constants/key';
import {
	AnswerItem,
	CommentPaginatedResponse,
	CommentsDocument,
	CommentsQuery,
	CommentsQueryVariables,
	GetPrivateVoteByLinkDocument,
	GetPrivateVoteByLinkQuery,
	GetPrivateVoteByLinkQueryVariables,
	GetPublicVoteByIdDocument,
	GetPublicVoteByIdQuery,
	GetPublicVoteByIdQueryVariables,
	useUserVotedSubscription,
	useVotingMutation,
	Vote,
	VoteAnswer,
	VotingInput,
} from '../../graphql-client/generated/graphql';
import useLanguage from '../../hooks/useLanguage';
import useToast from '../../hooks/useToast';
import { addApolloState, initializeApollo } from '../../lib/apolloClient';
import userAtom from '../../recoil/atoms/user.atom';
import { dateFormat, toStaticUri } from '../../utils/format';
import {
	isPollClosed,
	pollRanking,
	pollTypeToString,
} from '../../utils/helper';
const PollResultChart = React.lazy(
	() => import('../../components/PollResultChart'),
);

function calculateResult(
	answers: VoteAnswer[],
	voteType: number,
): { data: number[]; labels: string[] } {
	const rankingList = pollRanking(answers, voteType === VOTE_TYPE.SCORE);
	const data: number[] = rankingList.map(r => r.score);
	const labels: string[] = rankingList.map(
		rankItem => answers.find(ans => ans.id === rankItem.id)?.label || 'Other',
	);
	return { data, labels };
}

const Poll: NextPage<
	InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ vote, comment }) => {
	const [voteState, setVote] = useState(vote);
	const lang = useLanguage();
	const pollLang = lang.pages.poll;
	const router = useRouter();
	const userInfo = useRecoilValue(userAtom);
	const linkOfTag = `${lang.pages.discover.link}?${QUERY_KEY.SEARCH}=`;
	const [reCaptchaToken, setReCaptchaToken] = useState<string | null>(null);
	const choices = useRef<Partial<VotingInput>>({ unVoteIds: [], votes: [] });
	const [votingMutation, { loading }] = useVotingMutation();
	const toast = useToast();
	const [pollResult, setPollResult] = useState<{
		data: number[];
		labels: string[];
	} | null>(null);
	const { data } = useUserVotedSubscription({
		variables: { voteId: vote._id },
	});

	// Realtime refetch user's vote
	useEffect(() => {
		if (data) {
			const { answers, totalVote } = data.voted;
			const newVoteState: Vote = { ...voteState, answers, totalVote };
			setVote({ ...newVoteState });
			if (pollResult) {
				const { data: pollData, labels } = calculateResult(answers, vote.type);
				setPollResult({ data: pollData, labels });
			}
		}
	}, [data]);

	const isClosed = isPollClosed(
		voteState.endDate,
		voteState.maxVote as number,
		voteState.totalVote,
	);

	const handleVoteSubmit = async () => {
		if (!choices.current.votes?.length && !choices.current.unVoteIds?.length)
			return;

		const votingRes = await votingMutation({
			variables: {
				votingInput: {
					pollId: voteState._id!,
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
		} else {
			toast.show({ message: pollLang.votingFailed, type: 'error' });
		}
	};

	const handleAddOptionSuccess = (newAnswer: AnswerItem) => {
		const newAnswers: AnswerItem[] = [...(voteState.answers || []), newAnswer];
		const newVote: any = { ...voteState, answers: newAnswers };
		setVote({ ...newVote });
	};

	const handleShowResult = () => {
		const { data, labels } = calculateResult(voteState.answers, voteState.type);
		setPollResult({ data, labels });
	};

	return (
		<>
			<Head>
				<title>
					{voteState.title} | {APP_NAME}
				</title>
				<meta name='description' content={voteState.desc || voteState.title} />
			</Head>

			<div className='mx-auto my-3 max-w-4xl px-3 md:my-5 md:px-6'>
				{/* Title */}
				<h1 className='text-2xl font-normal md:mb-2 md:text-3xl'>
					{voteState.title}
					{isClosed && (
						<span className='ml-2 brightness-90'>
							{`[${lang.others.closed}]`}
						</span>
					)}
				</h1>
				<div className='border-color grid grid-cols-1 gap-2 border-b py-3 md:grid-cols-2'>
					<div className='flex items-center gap-2 md:gap-2'>
						<img
							src={
								toStaticUri(voteState.owner?.avt as string) || DEFAULT.USER_AVT
							}
							width={24}
							height={24}
							className='rounded-full'
						/>
						<span className='text-sm text-gray-500 dark:text-gray-400'>
							{voteState.owner?.name}
						</span>
						<span className='text-sm text-gray-500 dark:text-gray-400'>
							{dateFormat(voteState.createdAt, true)}
						</span>
						<span className='text-sm text-gray-500 dark:text-gray-400'>
							<b>{voteState.totalVote || 0}</b> voted
						</span>
					</div>
					<SocialShare
						className='md:justify-end'
						shareLink={`${HOST_URI}${router.asPath}`}
					/>
				</div>

				{/* Tags */}
				<ul className='my-3 flex flex-wrap gap-2 xl:justify-start'>
					{voteState.tags.map((tag, index) => (
						<li className='tag-link' key={index}>
							<Link href={`${linkOfTag}[${tag.name}]`}>{`#${tag.name}`}</Link>
						</li>
					))}
				</ul>

				{/* Description */}
				<p className='text-gray-600 dark:text-d_text_primary md:text-lg'>
					{voteState.desc}
				</p>

				{/* Content Or Result */}
				{pollResult ? (
					<div className='mx-auto my-5 w-full max-w-lg'>
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
						<div className='mt-3 flex items-center gap-2'>
							<strong className='text-gradient text-xl capitalize'>
								{pollTypeToString(voteState.type)}
							</strong>
							<InfoTooltip
								title={lang.helper.pollTypes[voteState.type as number]}
							/>
						</div>

						{/* poll options */}
						<div className='my-5 grid grid-cols-1 gap-3 md:gap-6'>
							{voteState.type === VOTE_TYPE.SINGLE_CHOICE ? (
								<SingleChoice
									showResult={voteState.isShowResult}
									options={voteState.answers || []}
									ownerId={voteState.ownerId || ''}
									pollId={voteState._id || ''}
									isIPDuplicationCheck={voteState.isIPDuplicationCheck}
									onChecked={optionId => {
										choices.current.votes = [{ id: optionId, score: null }];
									}}
									onUncheck={optionId => {
										choices.current.unVoteIds = [optionId];
									}}
								/>
							) : voteState.type === VOTE_TYPE.MULTIPLE_CHOICE ? (
								<MultipleChoice
									options={voteState.answers}
									ownerId={voteState.ownerId}
									pollId={voteState._id}
									isIPDuplicationCheck={voteState.isIPDuplicationCheck}
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
							) : voteState.type === VOTE_TYPE.SCORE ? (
								<ScoreChoice
									options={voteState.answers}
									ownerId={voteState.ownerId}
									pollId={voteState._id}
									maxScore={voteState.maxScore || DEFAULT.VOTE.MAX_SCORE}
									isIPDuplicationCheck={voteState.isIPDuplicationCheck}
									showResult={voteState.isShowResult}
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
						{voteState.allowAddOption && (
							<div className='my-3'>
								<AddOptionButton
									pollId={voteState._id}
									ownerId={voteState.ownerId}
									onAddOptionSuccess={handleAddOptionSuccess}
								/>
							</div>
						)}

						{/* ReCAPTCHA */}
						{voteState.isReCaptcha && !isClosed && (
							<div className='mb-5 flex justify-end'>
								<ReCAPTCHA onChange={token => setReCaptchaToken(token)} />
							</div>
						)}
					</>
				)}

				{/* button group */}
				<div className='flex justify-end gap-3 pt-3'>
					{voteState.isShowResultBtn && (
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
						(!userInfo._id && voteState.isLoginRequired ? (
							<Link href={lang.pages.login.link}>
								<button className='btn-accent md:btn-lg rounded-full font-medium'>
									{pollLang.requiredLogin}
								</button>
							</Link>
						) : (
							!isClosed && (
								<button
									className={`btn-accent md:btn-lg rounded-full font-medium ${
										(voteState.isReCaptcha && !reCaptchaToken) || loading
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
				<div className='my-4 h-[1px] bg-gray-200 dark:bg-gray-600 md:my-6'></div>
				<CommentArea initialComments={comment} voteId={voteState._id!} />
			</div>
		</>
	);
};

export const getServerSideProps: GetServerSideProps<{
	vote: Vote;
	comment: CommentPaginatedResponse;
}> = async ({ params }) => {
	const apolloClient = initializeApollo();
	const firstParam = params?.id?.[0] || '';

	let vote: Vote | null = null,
		commentRes: ApolloQueryResult<CommentsQuery> | null = null;
	let voteId: string = firstParam;

	if (firstParam === PRIVATE_POLL_PARAM) {
		// Query private poll
		const privateLink = params?.id?.[1];
		voteId = params?.id?.[2] || '';

		if (!privateLink || !voteId) {
			return {
				notFound: true,
			};
		}

		const voteRes = await apolloClient.query<
			GetPrivateVoteByLinkQuery,
			GetPrivateVoteByLinkQueryVariables
		>({
			query: GetPrivateVoteByLinkDocument,
			variables: { privateLink },
		});

		vote = voteRes!.data.privateVote?.vote as Vote;
		if (!vote || !vote?._id) return { notFound: true };
	} else {
		// query public poll
		const voteRes = await apolloClient.query<
			GetPublicVoteByIdQuery,
			GetPublicVoteByIdQueryVariables
		>({
			query: GetPublicVoteByIdDocument,
			variables: { voteId },
		});
		vote = voteRes!.data.publicVote?.vote as Vote;
		if (!vote || !vote?._id) return { notFound: true };
	}

	commentRes = await apolloClient.query<CommentsQuery, CommentsQueryVariables>({
		query: CommentsDocument,
		variables: { voteId, page: 1, pageSize: DEFAULT.PAGE_SIZE },
	});
	const comment = commentRes!.data.comments as CommentPaginatedResponse;

	addApolloState(apolloClient, { props: {} });
	return { props: { vote, comment } };
};

export default Poll;
