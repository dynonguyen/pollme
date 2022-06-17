import { ObjectType } from 'type-graphql';
import { PaginatedResponse } from '../core/QueryResponse';
import { Comment } from '../entities/Comment';

@ObjectType()
export class CommentPaginatedResponse extends PaginatedResponse<Comment>(
	Comment,
) {}
