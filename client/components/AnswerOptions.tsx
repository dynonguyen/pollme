import { PhotographIcon, PlusIcon, XIcon } from '@heroicons/react/outline';
import { XCircleIcon } from '@heroicons/react/solid';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { MAX } from '../constants/validation';
import useLanguage from '../hooks/useLanguage';
import useToast from '../hooks/useToast';
import { PhotoType } from '../types/common';

interface Answer {
	id: string;
	label: string;
	photo?: PhotoType;
}

interface AnswerOptionItemProps {
	onInputChange: (id: string, value: string) => void;
	onPhotoChange: (id: string, photo: PhotoType) => void;
	onDelete?: (id: string) => void;
	placeholder?: string;
	allowDelete: boolean;
	id: string;
}

const classes = {
	icon: 'w-8 shrink-0 text-slate-400 dark:text-slate-500 duration-300 cursor-pointer hover:text-primary hover:dark:text-d_primary',
};

const initAnswers = [
	{ id: Date.now().toString(), label: '', photo: null },
	{ id: (Date.now() + 1).toString(), label: '', photo: null },
];

export function AnswerOptionItem({
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
	const toast = useToast();
	const lang = useLanguage();

	const handlePhotoChange = (e: ChangeEvent<HTMLInputElement>) => {
		if (e.target.files?.length) {
			const photo = e.target.files[0];
			const photoSize = photo.size / (1024 * 1024);
			if (photoSize > MAX.OPTION_PHOTO_SIZE) {
				return toast.show({
					message: lang.components.AnswerOptions.photoSize,
					type: 'error',
				});
			}
			const reader = new FileReader();
			reader.readAsDataURL(photo);
			reader.onload = function () {
				const dataUrl = reader.result;
				onPhotoChange(id, dataUrl);
				setPhotoReview(dataUrl);
			};
		} else {
			if (photoRef.current) photoRef.current.value = '';
			setPhotoReview(null);
		}
	};

	const handleDeletePhoto = () => {
		onPhotoChange(id, null);
		if (photoRef.current) photoRef.current.value = '';
		setPhotoReview(null);
	};

	return (
		<div className='flex justify-between items-center gap-1'>
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
				accept='image/png, image/jpeg, image/webp'
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
	const lang = useLanguage();
	const newPollLang = lang.pages.newPoll;

	useEffect(() => {
		onCollectData && onCollectData(answersRef.current);
	}, [onCollectData]);

	const handleAddOption = () => {
		if (answers.length < MAX.ANSWER_OPTIONS) {
			const newOption = { id: Date.now().toString(), label: '', photo: null };
			const newAnswers = [...answersRef.current, newOption];
			setAnswers([...newAnswers]);
			answersRef.current = [...newAnswers];
		}
	};

	const handleDeleteOption = (id: string) => {
		const newAnswers = answers.filter(answer => answer.id !== id);
		answersRef.current = [...newAnswers];
		setAnswers([...newAnswers]);
	};

	const handleItemInputChange = (id: string, value: string) => {
		answersRef.current = answersRef.current.map(answer =>
			answer.id === id ? { ...answer, label: value } : answer,
		);
	};

	const handleItemPhotoChange = (id: string, photo: PhotoType) => {
		answersRef.current = answersRef.current.map(answer =>
			answer.id === id ? { ...answer, photo } : answer,
		);
	};

	return (
		<div className='grid gap-3'>
			{answers.map((answer, index) => (
				<AnswerOptionItem
					key={answer.id}
					allowDelete={answers.length > 2}
					placeholder={`${newPollLang.placeholder.answerOption} ${index + 1}`}
					id={answer.id}
					onDelete={handleDeleteOption}
					onInputChange={handleItemInputChange}
					onPhotoChange={handleItemPhotoChange}
				/>
			))}
			{answers.length < MAX.ANSWER_OPTIONS && (
				<button
					className='btn-outline mt-1 w-max flex items-center'
					type='button'
					onClick={handleAddOption}
				>
					<PlusIcon className='w-5 mr-2' />
					{newPollLang.addOptionBtn}
				</button>
			)}
		</div>
	);
}
