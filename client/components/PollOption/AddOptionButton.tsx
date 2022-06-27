import { PlusIcon } from '@heroicons/react/outline';
import { useRef, useState } from 'react';
import {
	AnswerItem,
	useAddAnswerOptionMutation,
} from '../../graphql-client/generated/graphql';
import useLanguage from '../../hooks/useLanguage';
import useToast from '../../hooks/useToast';
import { uploadOptionPhoto } from '../../utils/private-api-caller';
import { AnswerOptionItem } from '../AnswerOptions';

interface AddOptionButtonProps {
	pollId: string;
	ownerId: string;
	onAddOptionSuccess?: (newAnswer: AnswerItem) => void;
}

export default function AddOptionButton({
	pollId,
	ownerId,
	onAddOptionSuccess,
}: AddOptionButtonProps) {
	const lang = useLanguage();
	const [showInput, setShowInput] = useState(false);
	const answer = useRef<AnswerItem>({
		id: Date.now().toString(),
		label: '',
		photo: null,
	});
	const [addAnswerMutation] = useAddAnswerOptionMutation();
	const toast = useToast();

	const handleCloseOption = () => {
		answer.current = { id: Date.now().toString(), label: '', photo: null };
		setShowInput(false);
	};

	const handleAddOption = async () => {
		const { label, id, photo } = answer.current;
		if (!label.trim()) return;

		let photoSrc = '';
		if (photo) {
			const uploadRes = await uploadOptionPhoto(photo, ownerId, pollId);
			photoSrc = uploadRes.photoUrl || '';
		}

		const newAnswer: AnswerItem = { id, label, photo: photoSrc };

		const response = await addAnswerMutation({
			variables: {
				addAnswerInput: { voteId: pollId, answer: newAnswer },
			},
		});
		if (response.data?.addAnswerOption.success) {
			toast.show({ type: 'success', message: lang.messages.addOptionSuccess });
			handleCloseOption();
			onAddOptionSuccess && onAddOptionSuccess(newAnswer);
		} else {
			toast.show({ type: 'error', message: lang.messages.addOptionFailed });
		}
	};

	return (
		<>
			<button
				className='btn-outline flex w-max items-center'
				type='button'
				onClick={() => setShowInput(true)}
			>
				<PlusIcon className='mr-2 w-5' />
				{lang.pages.newPoll.addOptionBtn}
			</button>

			{showInput && (
				<div className='flex items-center space-x-2'>
					<div className='flex-grow'>
						<AnswerOptionItem
							id='add-option'
							allowDelete={true}
							onDelete={handleCloseOption}
							onInputChange={(_, value) => (answer.current.label = value)}
							onPhotoChange={(_, photo) =>
								(answer.current.photo = photo as string)
							}
						/>
					</div>
					<button
						className='btn h-max bg-gray-400 font-medium text-white dark:bg-gray-600'
						onClick={handleAddOption}
					>
						{lang.button.add}
					</button>
				</div>
			)}
		</>
	);
}
