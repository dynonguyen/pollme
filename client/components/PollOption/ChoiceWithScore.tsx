import { AnswerOption } from '../../types/common';
import { pollRanking, toThumbnailSrc } from '../../utils/helper';
import PollOptionScore from './PollOptionScore';

interface ScoreChoiceProps {
	options: AnswerOption[];
	ownerId: string;
	pollId: string;
	showResult?: boolean;
}

export default function ChoiceWithScore(props: ScoreChoiceProps): JSX.Element {
	const { options = [], showResult = true, ownerId, pollId } = props;
	const pollRanks = pollRanking(options, false);

	return (
		<>
			{options.map((option, index) => {
				const { label, id, photo } = option;
				const pollRank = pollRanks.find(p => p.id === id);
				const photoSrc = photo
					? `/upload/user-${ownerId}/${pollId}/${photo}`
					: null;
				const photoThumbSrc = photo
					? `/upload/user-${ownerId}/${pollId}/${toThumbnailSrc(
							photo as string,
					  )}`
					: null;

				return (
					<PollOptionScore
						key={index}
						title={label}
						showResult={showResult}
						rank={pollRank?.rank || 0}
						percent={pollRank?.percent || 0}
						photoUrl={photoSrc as string}
						photoThumbnail={photoThumbSrc as string}
					/>
				);
			})}
		</>
	);
}
