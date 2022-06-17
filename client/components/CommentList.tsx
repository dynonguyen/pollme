import { CommentPaginatedResponse } from '../graphql-client/generated/graphql';
import CommentItem from './CommentItem';
import Pagination from './core/Pagination';

export default function CommentList(props: {
	commentDocs: CommentPaginatedResponse;
}): JSX.Element {
	const { docs, page, pageSize, total } = props.commentDocs;
	const totalPage = Math.ceil(total / pageSize);

	return (
		<>
			{docs && docs.length > 0 && (
				<>
					<ul className='grid grid-cols-1 gap-5 md:gap-6 py-4'>
						{docs.map((comment, index) => {
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
					<Pagination
						pageCount={totalPage}
						className='w-full !my-5 !md:justify-end'
					/>
				</>
			)}
		</>
	);
}
