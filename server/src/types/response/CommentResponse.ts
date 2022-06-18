import { ObjectType } from 'type-graphql';
import MutationResponse from '../core/MutationResponse';
import { PaginatedResponse } from '../core/QueryResponse';
import { Comment } from '../entities/Comment';

@ObjectType()
export class CommentPaginatedResponse extends PaginatedResponse<Comment>(
	Comment,
) {}

@ObjectType({ implements: MutationResponse })
export class FavoriteCommentMutationResponse extends MutationResponse {}
