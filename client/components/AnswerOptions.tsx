import { PhotographIcon, PlusIcon, XIcon } from '@heroicons/react/outline';
import { XCircleIcon } from '@heroicons/react/solid';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { MAX } from '../constants/validation';

type PhotoType = string | ArrayBuffer | null;

interface Answer {
	id: number;
	label: string;
	photo?: PhotoType;
}

interface AnswerOptionItemProps {
	onInputChange: (id: number, value: string) => void;
	onPhotoChange: (id: number, photo: PhotoType) => void;
	onDelete?: (id: number) => void;
	placeholder?: string;
	allowDelete: boolean;
	id: number;
}

const classes = {
	icon: 'w-8 shrink-0 text-slate-400 dark:text-slate-500 duration-300 cursor-pointer hover:text-primary hover:dark:text-d_primary',
};

const initAnswers = [
	{ id: Date.now(), label: '', photo: null },
	{ id: Date.now() + 1, label: '', photo: null },
];

function AnswerOptionItem({
	allowDelete,
	onDelete,
	onInputChange,
	onPhotoChange,
	id,
	placeholder = 'Option',
}: AnswerOptionItemProps): JSX.Element {
	const inputRef = useRef<HTMLInputElement>(null);
	const photoRef = useRef<HTMLInputElement>(null);
	const [photoReview, setPhotoReview] = useState<PhotoType>(null);

	const handlePhotoChange = (e: ChangeEvent<HTMLInputElement>) => {
		if (e.target.files?.length) {
			const photo = e.target.files[0];
			const reader = new FileReader();
			reader.readAsDataURL(photo);
			reader.onload = function () {
				const dataUrl = reader.result;
				onPhotoChange(id, dataUrl);
				setPhotoReview(dataUrl);
			};
		} else {
			setPhotoReview(null);
		}
	};

	const handleDeletePhoto = () => {
		onPhotoChange(id, null);
		setPhotoReview(null);
	};

	return (
		<div className='flex justify-between gap-1'>
			<input
				ref={inputRef}
				type='text'
				className='field mt-1'
				placeholder={placeholder}
				onChange={e => onInputChange(id, e.target.value)}
			/>
			<input
				ref={photoRef}
				type='file'
				className='hidden'
				accept='image/png, image/jpeg'
				onChange={handlePhotoChange}
			/>
			{photoReview ? (
				<div className='w-8 h-8 shrink-0 relative group'>
					<img
						className='w-full h-full group-hover:opacity-60'
						src={photoReview as string}
					/>
					<XCircleIcon
						className='hidden absolute w-5 transform-center cursor-pointer error-text group-hover:block'
						onClick={handleDeletePhoto}
					/>
				</div>
			) : (
				<PhotographIcon
					className={classes.icon}
					onClick={() => photoRef.current?.click()}
				/>
			)}
			{allowDelete && (
				<XIcon
					className={`${classes.icon} hover:error-text`}
					onClick={() => onDelete && onDelete(id)}
				/>
			)}
		</div>
	);
}

export default function AnswerOptions({
	onCollectData,
}: {
	onCollectData?: (answers: Answer[]) => void;
}): JSX.Element {
	const [answers, setAnswers] = useState<Answer[]>(initAnswers);
	const answersRef = useRef<Answer[]>(initAnswers);

	useEffect(() => {
		onCollectData && onCollectData(answersRef.current);
	}, [onCollectData]);

	const handleAddOption = () => {
		if (answers.length < MAX.MAX_ANSWER_OPTIONS) {
			const newOption = { id: Date.now(), label: '', photo: null };
			answersRef.current = [...answers, newOption];
			setAnswers([...answers, newOption]);
		}
	};

	const handleDeleteOption = (id: number) => {
		const newAnswers = answers.filter(answer => answer.id !== id);
		answersRef.current = [...newAnswers];
		setAnswers([...newAnswers]);
	};

	const handleItemInputChange = (id: number, value: string) => {
		answersRef.current = answersRef.current.map(answer =>
			answer.id === id ? { ...answer, label: value } : answer,
		);
	};

	const handleItemPhotoChange = (id: number, photo: PhotoType) => {
		answersRef.current = answersRef.current.map(answer =>
			answer.id === id ? { ...answer, photo } : answer,
		);
	};

	return (
		<div className='grid gap-2'>
			{answers.map((answer, index) => (
				<AnswerOptionItem
					key={answer.id}
					allowDelete={answers.length > 1}
					placeholder={`Option ${index + 1}`}
					id={answer.id}
					onDelete={handleDeleteOption}
					onInputChange={handleItemInputChange}
					onPhotoChange={handleItemPhotoChange}
				/>
			))}
			{answers.length < MAX.MAX_ANSWER_OPTIONS && (
				<button
					className='btn-outline mt-2 w-max flex items-center'
					type='button'
					onClick={handleAddOption}
				>
					<PlusIcon className='w-5 mr-2' /> Add Option
				</button>
			)}
		</div>
	);
}
