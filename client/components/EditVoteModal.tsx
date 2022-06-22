import { XCircleIcon } from '@heroicons/react/solid';
import { useRef, useState } from 'react';
import {
	UpdateVoteInput,
	useUpdateVoteMutation,
	Vote,
} from '../graphql-client/generated/graphql';
import useLanguage from '../hooks/useLanguage';
import useToast from '../hooks/useToast';
import { AdvanceVoteSettings } from '../types/vote-setting';
import CheckboxSwitch from './core/CheckboxSwitch';

interface EditVoteModalProps {
	vote: Vote;
	onClose: () => void;
	onUpdateSuccess: (updatedValue: UpdateVoteInput) => void;
}

type VoteSettings = Omit<AdvanceVoteSettings, 'type' | 'maxScore'> & {
	refreshLink: boolean;
};

export default function EditVoteModal({
	vote,
	onClose,
	onUpdateSuccess,
}: EditVoteModalProps): JSX.Element {
	const lang = useLanguage();
	const newPollLang = lang.pages.newPoll;
	const editLang = lang.components.EditVoteModal;

	const {
		isPrivate,
		allowAddOption,
		isIPDuplicationCheck,
		isLoginRequired,
		isReCaptcha,
		isShowResult,
		isShowResultBtn,
		endDate,
		maxVote,
	} = vote;

	const fields = useRef<VoteSettings>({
		isPrivate,
		allowAddOption,
		isIPDuplicationCheck,
		isLoginRequired,
		isReCaptcha,
		isShowResult,
		isShowResultBtn,
		endDate,
		maxVote: maxVote!,
		refreshLink: false,
	});
	const [showEndDate, setShowEndDate] = useState(true);
	const [updating, setUpdating] = useState(false);
	const defaultEndDateValue = endDate
		? new Date(endDate).toISOString().replace(/\.\w+/, '')
		: '';
	const [updateVoteMutation] = useUpdateVoteMutation();
	const toast = useToast();

	const handleClosePoll = (checked: boolean) => {
		if (checked) {
			fields.current.endDate = new Date();
			setShowEndDate(false);
		} else {
			fields.current.endDate = endDate;
			setShowEndDate(true);
		}
	};

	const handleUpdatePoll = async () => {
		const newFields = fields.current;
		let key: keyof VoteSettings;
		let isChanged = false;

		if (newFields.refreshLink) isChanged = true;
		else {
			for (key in newFields) {
				if (
					newFields[key] !== vote[key as keyof Vote] &&
					key !== 'refreshLink'
				) {
					isChanged = true;
					break;
				}
			}
		}

		if (isChanged) {
			setUpdating(true);

			const updateInput: UpdateVoteInput = {
				...newFields,
				voteId: vote._id,
			} as UpdateVoteInput;

			const updateRes = await updateVoteMutation({
				variables: { updateInput },
			});

			if (updateRes.data?.updateVote.success) {
				toast.show({
					type: 'success',
					message: lang.messages.updateVoteSuccess,
				});
				onUpdateSuccess(updateInput);
			} else {
				toast.show({ type: 'error', message: lang.messages.updateVoteFailed });
			}

			setUpdating(false);
		}
	};

	return (
		<div className='bg-overlay flex-center'>
			<div className='bg-white dark:bg-d_bg w-[370px] md:w-[540px] max-w-full rounded-xl'>
				<div className={updating ? 'disabled' : ''}>
					<div className='flex justify-between px-5 py-3 border-b border-color'>
						<h3 className='text-lg md:text-xl capitalize'>
							{editLang.modalTitle}
						</h3>
						<XCircleIcon
							className='w-6 text-color-normal hover:error-text cursor-pointer'
							onClick={onClose}
						/>
					</div>

					<div className='p-5 grid grid-cols-1 gap-3'>
						{/* private */}
						<CheckboxSwitch
							labelClassName='new-poll-label'
							label={newPollLang.fieldLabels.isPrivate}
							helper={newPollLang.labelHelp.isPrivate}
							defaultChecked={isPrivate}
							onChecked={checked => (fields.current.isPrivate = checked)}
						/>
						{/* reCAPTCHA */}
						<CheckboxSwitch
							labelClassName='new-poll-label'
							label={newPollLang.fieldLabels.reCaptcha}
							helper={newPollLang.labelHelp.reCaptcha}
							defaultChecked={isReCaptcha}
							onChecked={checked => (fields.current.isReCaptcha = checked)}
						/>
						{/* IP Duplication Check */}
						<CheckboxSwitch
							labelClassName='new-poll-label'
							label={newPollLang.fieldLabels.ipCheck}
							helper={newPollLang.labelHelp.ipCheck}
							defaultChecked={isIPDuplicationCheck}
							onChecked={checked =>
								(fields.current.isIPDuplicationCheck = checked)
							}
						/>
						{/* Login required */}
						<CheckboxSwitch
							labelClassName='new-poll-label'
							label={newPollLang.fieldLabels.loginRequired}
							defaultChecked={isLoginRequired}
							onChecked={checked => (fields.current.isLoginRequired = checked)}
						/>
						{/* Show result */}
						<CheckboxSwitch
							labelClassName='new-poll-label'
							label={newPollLang.fieldLabels.showResult}
							helper={newPollLang.labelHelp.showResult}
							defaultChecked={isShowResult}
							onChecked={checked => (fields.current.isShowResult = checked)}
						/>
						{/* Show result button */}
						<CheckboxSwitch
							labelClassName='new-poll-label'
							label={newPollLang.fieldLabels.showResultBtn}
							helper={newPollLang.labelHelp.showResultBtn}
							defaultChecked={isShowResultBtn}
							onChecked={checked => (fields.current.isShowResultBtn = checked)}
						/>
						{/* Allow add option */}
						<CheckboxSwitch
							labelClassName='new-poll-label'
							label={newPollLang.fieldLabels.allowAddOption}
							helper={newPollLang.labelHelp.allowAddOption}
							defaultChecked={allowAddOption}
							onChecked={checked => (fields.current.allowAddOption = checked)}
						/>
						{/* Refresh link */}
						<CheckboxSwitch
							labelClassName='new-poll-label'
							label={editLang.newLink}
							defaultChecked={false}
							onChecked={checked => (fields.current.refreshLink = checked)}
						/>
						{/* Close poll */}
						<CheckboxSwitch
							labelClassName='new-poll-label'
							label={editLang.closePoll}
							onChecked={handleClosePoll}
						/>

						{/* End date & max vote */}
						{showEndDate && (
							<>
								<div className='flex items-center gap-3'>
									<label className={`new-poll-label w-max shrink-0`}>
										{newPollLang.fieldLabels.endDate}
									</label>
									<input
										type='datetime-local'
										className='field max-w-[200px] md:max-w-[250px] ml-auto'
										defaultValue={defaultEndDateValue}
										onChange={e =>
											(fields.current.endDate = new Date(e.target.value))
										}
									/>
								</div>
								<div className='flex items-center gap-3'>
									<label className={`new-poll-label w-max shrink-0`}>
										{newPollLang.fieldLabels.maxVote}
									</label>
									<input
										type='number'
										defaultValue={maxVote!}
										className='field max-w-[200px] md:max-w-[250px] ml-auto'
										onChange={e =>
											(fields.current.maxVote = Number(e.target.value))
										}
									/>
								</div>
							</>
						)}
					</div>

					<div className='flex justify-end px-5 py-2 gap-2 border-t border-color'>
						<button className='btn-outline' onClick={onClose}>
							{lang.button.close}
						</button>
						<button className='btn-primary' onClick={handleUpdatePoll}>
							{lang.button.update}
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
