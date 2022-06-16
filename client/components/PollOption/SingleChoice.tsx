import { useState } from 'react';
import { AnswerOption } from '../../types/common';
import { pollRanking, toThumbnailSrc } from '../../utils/helper';
import PollOptionCheckbox from './PollOptionCheckbox';

interface SingleChoiceProps {
	options: AnswerOption[];
	ownerId: string;
	pollId: string;
	showResult?: boolean;
	onChecked?: (id: string) => void;
	onUnChecked?: () => void;
}

export default function SingleChoice(props: SingleChoiceProps): JSX.Element {
	const {
		options = [],
		showResult = true,
		ownerId,
		pollId,
		onChecked,
		onUnChecked,
	} = props;
	const pollRanks = pollRanking(options, false);
	const [checkList, setCheckList] = useState(
		options.map(o => ({ id: o.id, checked: false })),
	);

	const handleCheck = (id: string, checked: boolean) => {
		if (!checked) {
			setCheckList(options.map(o => ({ id: o.id, checked: false })));
			onUnChecked && onUnChecked();
		} else {
			setCheckList(
				options.map(o =>
					o.id === id
						? { id: o.id, checked: true }
						: { id: o.id, checked: false },
				),
			);
			onChecked && onChecked(id);
		}
	};

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
					<PollOptionCheckbox
						key={index}
						title={label}
						showResult={showResult}
						rank={pollRank?.rank || 0}
						percent={pollRank?.percent || 0}
						photoUrl={photoSrc as string}
						photoThumbnail={photoThumbSrc as string}
						checked={checkList.find(c => c.id === id)?.checked}
						onCheck={checked => handleCheck(id, checked)}
					/>
				);
			})}
		</>
	);
}
