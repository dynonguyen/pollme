import { ChevronDownIcon } from '@heroicons/react/outline';
import { useRef, useState } from 'react';
import {
	Comment,
	CommentPaginatedResponse,
	useCommentsLazyQuery,
} from '../graphql-client/generated/graphql';
import useLanguage from '../hooks/useLanguage';
import CommentItem from './CommentItem';

export default function CommentList(props: {
	commentDocs: CommentPaginatedResponse;
	voteId: string;
}): JSX.Element {
	const { voteId } = props;
	const { docs, page, pageSize, total } = props.commentDocs;
	const totalPage = Math.ceil(total / pageSize);
	const [comments, setComments] = useState<Comment[]>(docs);
	const currentPage = useRef(page);
	const [commentQuery] = useCommentsLazyQuery();
	const [loadMore, setLoadMore] = useState(false);
	const lang = useLanguage();

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
					<ul className='grid grid-cols-1 gap-5 md:gap-6 py-4'>
						{comments.map((comment, index) => {
							const { content, createdAt, owner, favorites } = comment;
							return (
								<li key={index}>
									<CommentItem
										username={owner?.name as string}
										avt={owner?.avt as string}
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
							className={`flex gap-2 text-gray-500 dark:text-gray-300 duration-300 hover:opacity-75 justify-center my-4 cursor-pointer ${
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
