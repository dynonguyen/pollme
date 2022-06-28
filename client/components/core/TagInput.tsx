import { KeyboardEvent, useRef, useState } from 'react';
import { useOnlyTagNameLazyQuery } from '../../graphql-client/generated/graphql';
import useLanguage from '../../hooks/useLanguage';
import { debounce } from '../../utils/helper';

interface TagItemProps {
	label: string;
	onDelete: (label: string) => void;
}

interface TagInputProps {
	onChange?: (tags: string[]) => void;
	isSuggestion?: boolean;
	maxTags?: number;
}

function TagItem({ label, onDelete }: TagItemProps): JSX.Element {
	return (
		<span className='tag-link group cursor-pointer rounded-sm text-base'>
			<span>{label}</span>
			<span
				className='hidden hover:text-red-600 group-hover:inline dark:hover:text-red-400'
				onClick={() => onDelete(label)}
			>
				&nbsp; x
			</span>
		</span>
	);
}

export default function TagInput({
	onChange,
	isSuggestion = true,
	maxTags = -1,
}: TagInputProps): JSX.Element {
	const [inputFocus, setInputFocus] = useState(false);
	const [tags, setTags] = useState<string[]>([]);
	const [suggestions, setSuggestions] = useState<string[]>([]);
	const [tagNameQuery] = useOnlyTagNameLazyQuery();
	const inputRef = useRef<HTMLInputElement>(null);
	const timer = useRef(0);
	const lang = useLanguage();

	const addTag = (tag: string) => {
		if (tag) {
			const index = tags.findIndex(t => t === tag);
			if (index === -1) {
				const newTags = [...tags, tag];
				onChange && onChange(newTags);
				if (newTags.length === maxTags) setInputFocus(false);
				setTags(newTags);
			}
			if (inputRef.current) inputRef.current.value = '';
		}
	};

	const handlePressEnter = (e: KeyboardEvent<HTMLInputElement>) => {
		const { key } = e;
		if (key === 'Enter') {
			if (inputRef.current) {
				addTag(inputRef.current.value.trim().toLowerCase());
			}
		}
	};

	const handleDeleteTag = (tag: string) => {
		const newTags = tags.filter(t => t !== tag);
		onChange && onChange(newTags);
		setTags(newTags);
	};

	const handleChange = () => {
		timer.current = debounce(timer.current, 350, async () => {
			const tag = inputRef.current?.value.trim().toLowerCase() || '';
			if (!tag) {
				setSuggestions([]);
			} else {
				const { data } = await tagNameQuery({
					variables: { page: 1, pageSize: 5, search: tag },
				});
				const newSuggestions = data?.tags.docs.map(t => t.name) || [];
				setSuggestions([...newSuggestions]);
			}
		});
	};

	const handleSuggestItemClick = (tag: string) => {
		addTag(tag);
		setSuggestions([]);
	};

	return (
		<div
			className={`field flex flex-wrap px-2 ${
				inputFocus ? 'border-2 border-primary dark:border-d_primary' : ''
			} relative`}
		>
			{tags.map(tag => (
				<div className='m-1' key={tag}>
					<TagItem label={tag} onDelete={() => handleDeleteTag(tag)} />
				</div>
			))}

			{maxTags !== -1 && tags.length < maxTags && (
				<input
					type='text'
					ref={inputRef}
					className='flex-1 bg-transparent px-1 outline-none'
					placeholder={lang.components.TagInput.inputPlaceholder}
					onFocus={() => setInputFocus(true)}
					onBlur={() => setInputFocus(false)}
					onKeyDown={handlePressEnter}
					onChange={handleChange}
				/>
			)}

			{isSuggestion && suggestions.length > 0 && (
				<div className='menu absolute top-full left-0 !block w-full'>
					<ul>
						{suggestions.map((s, index) => (
							<li
								key={index}
								className='menu-item !lowercase'
								onClick={() => handleSuggestItemClick(s)}
							>
								{s}
							</li>
						))}
					</ul>
				</div>
			)}
		</div>
	);
}
