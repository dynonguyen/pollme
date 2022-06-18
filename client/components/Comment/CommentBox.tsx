import Link from 'next/link';
import { ChangeEvent, useRef } from 'react';
import { useRecoilValue } from 'recoil';
import { MAX } from '../../constants/validation';
import {
	Comment,
	useCreateCommentMutation,
} from '../../graphql-client/generated/graphql';
import useLanguage from '../../hooks/useLanguage';
import userAtom from '../../recoil/atoms/user.atom';

interface CommentBoxProps {
	voteId: string;
	onAddCommentSuccess: (comment: Comment) => void;
}

export default function CommentBox({
	voteId,
	onAddCommentSuccess,
}: CommentBoxProps): JSX.Element {
	const lang = useLanguage();
	const commentLang = lang.components.CommentBox;
	const charLeftRef = useRef<HTMLSpanElement>(null);
	const inputRef = useRef<HTMLTextAreaElement>(null);
	const userInfo = useRecoilValue(userAtom);
	const [createCommentMutation] = useCreateCommentMutation();

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
				const newComment = response.data.createComment.comment;
				onAddCommentSuccess({
					content: inputRef.current!.value,
					_id: newComment._id,
					createdAt: newComment.createdAt,
					favorites: [],
					ownerId: userInfo._id,
					voteId,
					owner: {
						_id: userInfo._id,
						name: userInfo.name,
						avt: userInfo.avt,
						email: '',
						favorites: [],
						voted: [],
						votes: [],
					},
				});
				inputRef.current!.value = '';
				charLeftRef.current!.textContent = MAX.COMMENT_LEN.toString();
			}
		}
	};

	return (
		<div className='my-5'>
			<h3 className='text-xl mb-2 text-primary dark:text-d_primary'>
				{commentLang.addComment}
			</h3>
			<textarea
				className='field min-h-[60px]'
				rows={6}
				ref={inputRef}
				maxLength={MAX.COMMENT_LEN}
				placeholder={commentLang.addCommentPlaceholder}
				onChange={handleChange}
			></textarea>
			<p className='text-right text-sm text-gray-500'>
				<span ref={charLeftRef}>{MAX.COMMENT_LEN}</span> {commentLang.charLeft}
			</p>
			<div className='text-right mt-2'>
				{userInfo._id ? (
					<button
						className='btn btn-primary md:btn-lg capitalize'
						onClick={handleSubmitComment}
					>
						{commentLang.submitCommentBtn}
					</button>
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
