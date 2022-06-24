import React, { useRef } from 'react';
import { CommentPaginatedResponse } from '../../graphql-client/generated/graphql';
import useLanguage from '../../hooks/useLanguage';
import CommentBox from './CommentBox';
import CommentList from './CommentList';

interface CommentAreaProps {
	voteId: string;
	initialComments: CommentPaginatedResponse;
}

function CommentArea({
	initialComments,
	voteId,
}: CommentAreaProps): JSX.Element {
	const lang = useLanguage();
	const totalCmtRef = useRef<HTMLSpanElement>(null);

	const handleIncreaseTotalCmt = () => {
		if (totalCmtRef.current) {
			let currentTotal = Number(totalCmtRef.current.textContent);
			totalCmtRef.current.textContent = `${++currentTotal}`;
		}
	};

	return (
		<div>
			<div className='text-xl font-normal md:text-2xl'>
				<span ref={totalCmtRef}>{initialComments.total}</span>
				&nbsp;
				{lang.pages.poll.comment}
			</div>
			<CommentBox voteId={voteId} />
			<CommentList
				commentDocs={initialComments}
				voteId={voteId}
				onAddComment={handleIncreaseTotalCmt}
			/>
		</div>
	);
}

export default React.memo(CommentArea);
