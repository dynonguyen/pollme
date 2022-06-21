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

		const newAnswer: AnswerItem = {
			id,
			label,
			photo: photo ? `${id}.jpeg` : null,
		};

		const response = await addAnswerMutation({
			variables: {
				addAnswerInput: { voteId: pollId, answer: newAnswer },
			},
		});
		if (response.data?.addAnswerOption.success) {
			toast.show({ type: 'success', message: lang.messages.addOptionSuccess });
			handleCloseOption();
			if (photo) {
				await uploadOptionPhoto(photo, ownerId, pollId, id);
			}
			onAddOptionSuccess && onAddOptionSuccess(newAnswer);
		} else {
			toast.show({ type: 'error', message: lang.messages.addOptionFailed });
		}
	};

	return (
		<>
			<button
				className='btn-outline w-max flex items-center'
				type='button'
				onClick={() => setShowInput(true)}
			>
				<PlusIcon className='w-5 mr-2' />
				{lang.pages.newPoll.addOptionBtn}
			</button>

			{showInput && (
				<div className='flex gap-2 items-center'>
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
						className='btn bg-gray-400 dark:bg-gray-600 text-white font-medium h-max'
						onClick={handleAddOption}
					>
						{lang.button.add}
					</button>
				</div>
			)}
		</>
	);
}
