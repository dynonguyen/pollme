import Link from 'next/link';
import { ChangeEvent, KeyboardEvent, useRef, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { MAX } from '../../constants/validation';
import { useCreateCommentMutation } from '../../graphql-client/generated/graphql';
import useLanguage from '../../hooks/useLanguage';
import userAtom from '../../recoil/atoms/user.atom';
import Button from '../core/Button';

interface CommentBoxProps {
	voteId: string;
}

export default function CommentBox({ voteId }: CommentBoxProps): JSX.Element {
	const lang = useLanguage();
	const commentLang = lang.components.CommentBox;
	const charLeftRef = useRef<HTMLSpanElement>(null);
	const inputRef = useRef<HTMLTextAreaElement>(null);
	const userInfo = useRecoilValue(userAtom);
	const [createCommentMutation] = useCreateCommentMutation();
	const [submitting, setSubmitting] = useState(false);

	const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
		const value = e.target.value.trim();
		if (value.length <= MAX.COMMENT_LEN) {
			if (charLeftRef.current) {
				charLeftRef.current.textContent = (
					MAX.COMMENT_LEN - value.length
				).toString();
			}
		}
	};

	const handleSubmitComment = async () => {
		const comment = inputRef.current?.value.trim() || '';
		if (comment) {
			setSubmitting(true);
			const response = await createCommentMutation({
				variables: {
					addCommentInput: {
						content: comment,
						ownerId: userInfo._id,
						voteId,
					},
				},
			});
			if (response.data?.createComment.success) {
				inputRef.current!.value = '';
				charLeftRef.current!.textContent = MAX.COMMENT_LEN.toString();
			}
			setSubmitting(false);
		}
	};

	const handlePressEnter = (e: KeyboardEvent<HTMLTextAreaElement>) => {
		if (e.key === 'Enter' && !e.shiftKey) {
			handleSubmitComment();
		}
	};

	return (
		<div className='my-5'>
			<h3 className='mb-2 text-xl text-primary dark:text-d_primary'>
				{commentLang.addComment}
			</h3>
			<textarea
				className='field min-h-[60px]'
				rows={3}
				ref={inputRef}
				maxLength={MAX.COMMENT_LEN}
				placeholder={commentLang.addCommentPlaceholder}
				onChange={handleChange}
				onKeyDown={handlePressEnter}
			></textarea>
			<p className='text-right text-sm text-gray-500'>
				<span ref={charLeftRef}>{MAX.COMMENT_LEN}</span> {commentLang.charLeft}
			</p>
			<div className='mt-2 text-right'>
				{userInfo._id ? (
					<Button
						className='md:btn-lg ml-auto capitalize'
						onClick={handleSubmitComment}
						loading={submitting}
					>
						{commentLang.submitCommentBtn}
					</Button>
				) : (
					<Link href={lang.pages.login.link}>
						<button className='btn btn-primary md:btn-lg capitalize'>
							{commentLang.loginToComment}
						</button>
					</Link>
				)}
			</div>
		</div>
	);
}
