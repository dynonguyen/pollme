import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import {
	POLL_PHOTO_THUMBNAIL_HEIGHT,
	POLL_PHOTO_THUMBNAIL_WIDTH,
} from '../../constants';
import userAtom, { UserAtom } from '../../recoil/atoms/user.atom';
import { AnswerOption } from '../../types/common';
import { optimizeCloudinarySrc } from '../../utils/format';
import { pollRanking } from '../../utils/helper';
import PollOptionCheckbox from './PollOptionCheckbox';

interface MultipleChoiceProps {
	options: AnswerOption[];
	ownerId: string;
	pollId: string;
	showResult?: boolean;
	isIPDuplicationCheck?: boolean;
	onChecked: (answer: { id: string; checked: boolean }) => void;
	onUnChecked: (answerId: string) => void;
}

function findInitUserChecked(
	userInfo: UserAtom,
	answers: AnswerOption[],
): string[] {
	let checkedList: string[] = [];
	const { _id, ip } = userInfo;

	answers.forEach(answer => {
		answer.voteList?.forEach(v => {
			if (v.userInfo.ip === ip || v.userInfo.userId === _id) {
				checkedList.push(answer.id);
			}
		});
	});

	return checkedList;
}

export default function MultipleChoice(
	props: MultipleChoiceProps,
): JSX.Element {
	const {
		options = [],
		showResult = true,
		isIPDuplicationCheck,
		onChecked,
		onUnChecked,
	} = props;
	const userInfo = useRecoilValue(userAtom);
	const pollRanks = pollRanking(options, false);
	const [checkList, setCheckList] = useState(
		options.map(o => ({ id: o.id, checked: false })),
	);
	const [initUserChecked, setInitUserChecked] = useState<string[]>([]);

	useEffect(() => {
		const defaultChecked = findInitUserChecked(userInfo, options);
		setInitUserChecked([...defaultChecked]);
		setCheckList(
			options.map(o => ({
				id: o.id,
				checked: isIPDuplicationCheck ? defaultChecked.includes(o.id) : false,
			})),
		);
	}, [userInfo, options]);

	const handleCheck = (id: string, checked: boolean) => {
		if (!checked) {
			// uncheck initial user checked
			initUserChecked.includes(id) && onUnChecked(id);
		}
		onChecked({ id, checked });
	};

	return (
		<>
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
					<PollOptionCheckbox
						key={index}
						title={label}
						rounded
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
