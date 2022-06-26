import { ChevronDownIcon } from '@heroicons/react/outline';
import { useEffect, useRef, useState } from 'react';
import {
	Comment,
	CommentPaginatedResponse,
	useCommentAddedSubscription,
	useCommentsLazyQuery,
} from '../../graphql-client/generated/graphql';
import useLanguage from '../../hooks/useLanguage';
import CommentItem from './CommentItem';

export default function CommentList(props: {
	commentDocs: CommentPaginatedResponse;
	voteId: string;
	onAddComment: () => void;
}): JSX.Element {
	const { voteId, onAddComment } = props;
	const { docs, page, pageSize, total } = props.commentDocs;
	const totalPage = Math.ceil(total / pageSize);
	const [comments, setComments] = useState<Comment[]>(docs);
	const currentPage = useRef(page);
	const [commentQuery] = useCommentsLazyQuery();
	const [loadMore, setLoadMore] = useState(false);
	const lang = useLanguage();
	const { data } = useCommentAddedSubscription({ variables: { voteId } });

	useEffect(() => {
		if (data) {
			const { content, createdAt, username, userAvt, _id } = data.commentAdded;
			const newComment: any = {
				content,
				createdAt,
				owner: { name: username, avt: userAvt },
				favorites: [],
				voteId,
				_id,
			};
			onAddComment();
			setComments([newComment, ...comments]);
		}
	}, [data]);

	const handleLoadMore = async () => {
		if (currentPage.current <= totalPage) {
			currentPage.current++;
			setLoadMore(true);
			const commentRes = await commentQuery({
				variables: {
					voteId,
					page: currentPage.current,
					pageSize,
				},
			});
			if (commentRes.data) {
				const moreComments = commentRes.data.comments.docs as Comment[];
				setComments([...comments, ...moreComments]);
			}
			setLoadMore(false);
		}
	};

	return (
		<>
			{comments && comments.length > 0 && (
				<>
					<ul className='grid grid-cols-1 gap-5 py-4 md:gap-6'>
						{comments.map(comment => {
							const { content, createdAt, owner, favorites, _id } = comment;
							return (
								<li key={_id}>
									<CommentItem
										commentId={_id}
										username={owner?.name!}
										avt={owner?.avt!}
										content={content}
										createdAt={createdAt}
										favorites={favorites}
									/>
								</li>
							);
						})}
					</ul>

					{currentPage.current < totalPage && (
						<div
							className={`my-4 flex cursor-pointer justify-center space-x-2 text-gray-500 duration-300 hover:opacity-75 dark:text-gray-300 ${
								loadMore ? 'disabled' : ''
							}`}
							onClick={handleLoadMore}
						>
							<p>
								{loadMore ? lang.others.loading : lang.others.loadMoreComment}
							</p>
							<ChevronDownIcon className={`w-5 ${loadMore ? 'hidden' : ''}`} />
						</div>
					)}
				</>
			)}
		</>
	);
}
