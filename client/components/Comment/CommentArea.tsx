import React, { useState } from 'react';
import {
	Comment,
	CommentPaginatedResponse,
} from '../../graphql-client/generated/graphql';
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
	const [newComment, setNewComment] = useState<Comment>();

	return (
		<>
			<CommentList
				commentDocs={initialComments}
				voteId={voteId}
				newComment={newComment}
			/>
			<CommentBox
				voteId={voteId}
				onAddCommentSuccess={comment => setNewComment(comment)}
			/>
		</>
	);
}

export default React.memo(CommentArea);
