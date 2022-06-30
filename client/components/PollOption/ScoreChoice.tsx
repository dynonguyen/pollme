import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import {
	POLL_PHOTO_THUMBNAIL_HEIGHT,
	POLL_PHOTO_THUMBNAIL_WIDTH,
} from '../../constants';
import useLanguage from '../../hooks/useLanguage';
import userAtom, { UserAtom } from '../../recoil/atoms/user.atom';
import { AnswerOption } from '../../types/common';
import { optimizeCloudinarySrc } from '../../utils/format';
import { pollRanking } from '../../utils/helper';
import PollOptionScore from './PollOptionScore';

interface ScoreChoiceProps {
	options: AnswerOption[];
	ownerId: string;
	pollId: string;
	maxScore: number;
	showResult?: boolean;
	isIPDuplicationCheck?: boolean;
	onScoreChange: (value: { id: string; score: number }) => void;
}

function findDefaultScore(
	userInfo: UserAtom,
	answers: AnswerOption[],
): { id: string; score: number | undefined }[] {
	let scores: { id: string; score: number | undefined }[] = [];
	const { _id, ip } = userInfo;

	answers.forEach(answer => {
		answer.voteList?.forEach(v => {
			const { ip: ansIp, userId: ansId } = v.userInfo;
			if ((ansIp && ansIp === ip) || (ansId && ansId === _id)) {
				scores.push({ id: answer.id, score: v.score ?? undefined });
			}
		});
	});

	return scores;
}

export default function ScoreChoice(props: ScoreChoiceProps): JSX.Element {
	const {
		options = [],
		showResult = true,
		maxScore,
		isIPDuplicationCheck,
		onScoreChange,
	} = props;
	const userInfo = useRecoilValue(userAtom);
	const pollRanks = pollRanking(options, true);
	const [scoreList, setScoreList] = useState<
		{ id: string; score: number | undefined }[]
	>([]);

	const lang = useLanguage();

	useEffect(() => {
		const defaultScores = findDefaultScore(userInfo, options);
		setScoreList(
			options.map(o => ({
				id: o.id,
				score: isIPDuplicationCheck
					? defaultScores.find(d => d.id === o.id)?.score
					: undefined,
			})),
		);
	}, [userInfo, options]);

	const handleScoreChange = (id: string, score: number) => {
		if (score >= 0) {
			onScoreChange({ id, score });
		}
	};

	return (
		<>
			<p className='text-accent dark:text-d_accent'>
				{lang.others.scoreMaximum}
				{maxScore}
			</p>
			{options.map((option, index) => {
				const { label, id, photo } = option;
				const pollRank = pollRanks.find(p => p.id === id);
				const photoSrc = photo;
				const photoThumbSrc = optimizeCloudinarySrc(
					photo || '',
					POLL_PHOTO_THUMBNAIL_WIDTH,
					POLL_PHOTO_THUMBNAIL_HEIGHT,
				);

				return (
					<PollOptionScore
						key={index}
						title={label}
						showResult={showResult}
						rank={pollRank?.rank || 0}
						percent={pollRank?.percent || 0}
						photoUrl={photoSrc as string}
						photoThumbnail={photoThumbSrc as string}
						onScoreChange={score => handleScoreChange(option.id, score)}
						maxScore={maxScore}
						defaultScore={scoreList.find(s => s.id === option.id)?.score}
					/>
				);
			})}
		</>
	);
}
