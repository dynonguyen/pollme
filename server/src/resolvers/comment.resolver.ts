import {
	Arg,
	Args,
	FieldResolver,
	Mutation,
	Query,
	Resolver,
	Root,
} from 'type-graphql';
import { DEFAULT } from '../constants/default';
import { ERROR_CODE, SUCCESS_CODE } from '../constants/status';
import CommentModel from '../models/comment.model';
import UserModel from '../models/user.model';
import { paginatedResponseDefault } from '../types/core/QueryResponse';
import Comment from '../types/entities/Comment';
import User from '../types/entities/User';
import mongoosePaginate from '../utils/mongoose-paginate';
import { CommentPaginationArg } from './../types/input/CommentArg';
import { FavoriteCommentInput } from './../types/input/CommentInput';
import {
	CommentPaginatedResponse,
	FavoriteCommentMutationResponse,
} from './../types/response/CommentResponse';

@Resolver(_of => Comment)
export class CommentResolver {
	@FieldResolver(_return => User, { nullable: true })
	async owner(@Root() comment: Comment): Promise<User | null> {
		if (!comment._doc?.ownerId) return null;
		return await UserModel.findById(comment._doc.ownerId);
	}

	@Query(_return => CommentPaginatedResponse)
	async comments(
		@Args()
		{ voteId, page = 1, pageSize = DEFAULT.PAGE_SIZE }: CommentPaginationArg,
	): Promise<CommentPaginatedResponse> {
		try {
			const commentDocs = await mongoosePaginate(
				CommentModel,
				{ voteId },
				{ page, pageSize },
				{ sort: '-createdAt' },
			);

			return {
				code: SUCCESS_CODE.OK,
				...commentDocs,
			};
		} catch (error) {
			console.error('COMMENT QUERY ERROR: ', error);
			return {
				code: ERROR_CODE.INTERNAL_ERROR,
				...paginatedResponseDefault,
			};
		}
	}

	@Mutation(_return => FavoriteCommentMutationResponse)
	async favoriteComment(
		@Arg('favoriteCommentInput') { userId, commentId }: FavoriteCommentInput,
	): Promise<FavoriteCommentMutationResponse> {
		const comment = await CommentModel.findById(commentId).select('favorites');
		if (comment) {
			const favorites = comment.favorites;
			const favoriteIndex = favorites.findIndex(uId => uId === userId);
			let newFavorites = [...favorites];
			if (favoriteIndex === -1) {
				newFavorites.push(userId);
			} else {
				newFavorites.splice(favoriteIndex, 1);
			}

			await CommentModel.updateOne(
				{ _id: commentId },
				{ $set: { favorites: newFavorites } },
			);
			return {
				code: SUCCESS_CODE.OK,
				success: true,
			};
		}

		return {
			code: ERROR_CODE.CONFLICT,
			success: false,
		};
	}
}
