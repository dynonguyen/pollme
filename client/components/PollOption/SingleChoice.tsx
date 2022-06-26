import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import userAtom, { UserAtom } from '../../recoil/atoms/user.atom';
import { AnswerOption } from '../../types/common';
import { toStaticUri } from '../../utils/format';
import { pollRanking, toThumbnailSrc } from '../../utils/helper';
import PollOptionCheckbox from './PollOptionCheckbox';

interface SingleChoiceProps {
	options: AnswerOption[];
	ownerId: string;
	pollId: string;
	showResult?: boolean;
	isIPDuplicationCheck?: boolean;
	onChecked: (optionId: string) => void;
	onUncheck: (optionId: string) => void;
}

function findUserChecked(
	userInfo: UserAtom,
	options: AnswerOption[],
): string | null {
	const { _id, ip } = userInfo;
	for (let option of options) {
		const { voteList } = option;
		for (let vote of voteList) {
			if (vote.userInfo.ip === ip || vote.userInfo.userId === _id) {
				return option.id;
			}
		}
	}

	return null;
}

export default function SingleChoice(props: SingleChoiceProps): JSX.Element {
	const {
		options = [],
		showResult = true,
		ownerId,
		pollId,
		isIPDuplicationCheck,
		onChecked,
		onUncheck,
	} = props;
	const userInfo = useRecoilValue(userAtom);
	const [defaultChecked, setDefaultChecked] = useState<string | null>();
	const pollRanks = pollRanking(options, false);
	const [checkList, setCheckList] = useState<
		{ id: string; checked: boolean }[]
	>([]);

	useEffect(() => {
		const newDefaultChecked = findUserChecked(userInfo, options);
		setDefaultChecked(newDefaultChecked);
		setCheckList(
			options.map(o => ({
				id: o.id,
				checked: isIPDuplicationCheck ? o.id === newDefaultChecked : false,
			})),
		);
	}, [userInfo, options]);

	const handleCheck = (id: string, checked: boolean) => {
		if (!checked) {
			setCheckList(options.map(o => ({ id: o.id, checked: false })));
			onUncheck(id);
		} else {
			setCheckList(
				options.map(o =>
					o.id === id
						? { id: o.id, checked: true }
						: { id: o.id, checked: false },
				),
			);
			onChecked(id);
			defaultChecked && onUncheck(defaultChecked);
		}
	};

	return (
		<>
			{options.map((option, index) => {
				const { label, id, photo } = option;
				const pollRank = pollRanks.find(p => p.id === id);
				const photoSrc = photo
					? toStaticUri(`/upload/user-${ownerId}/${pollId}/${photo}`)
					: null;
				const photoThumbSrc = photo
					? toStaticUri(
							`/upload/user-${ownerId}/${pollId}/${toThumbnailSrc(photo)}`,
					  )
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
