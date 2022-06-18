import {
	Arg,
	Args,
	Authorized,
	FieldResolver,
	Mutation,
	Query,
	Resolver,
	Root,
} from 'type-graphql';
import { DEFAULT } from '../constants/default';
import { ERROR_CODE, SUCCESS_CODE } from '../constants/status';
import { MAX } from '../constants/validation';
import CommentModel from '../models/comment.model';
import UserModel from '../models/user.model';
import { paginatedResponseDefault } from '../types/core/QueryResponse';
import { ROLES } from '../types/core/Role';
import Comment from '../types/entities/Comment';
import User from '../types/entities/User';
import mongoosePaginate from '../utils/mongoose-paginate';
import { MutationResponseImpl } from './../types/core/MutationResponse';
import { CommentPaginationArg } from './../types/input/CommentArg';
import {
	AddCommentInput,
	FavoriteCommentInput,
} from './../types/input/CommentInput';
import {
	CommentPaginatedResponse,
	CreateCommentMutationResponse,
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

	@Mutation(_return => MutationResponseImpl)
	async favoriteComment(
		@Arg('favoriteCommentInput') { userId, commentId }: FavoriteCommentInput,
	): Promise<MutationResponseImpl> {
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

	@Authorized(ROLES.USER)
	@Mutation(_return => CreateCommentMutationResponse)
	async createComment(
		@Arg('addCommentInput') { voteId, content, ownerId }: AddCommentInput,
	): Promise<CreateCommentMutationResponse> {
		try {
			if (content.length > MAX.COMMENT_LEN) {
				content = content.slice(0, MAX.COMMENT_LEN);
			}
			const newComment = await CommentModel.create({
				ownerId,
				content,
				voteId,
				createdAt: new Date(),
			});

			if (newComment) {
				return {
					code: SUCCESS_CODE.CREATED,
					success: true,
					comment: newComment,
				};
			}

			return { code: ERROR_CODE.NOT_ACCEPTABLE, success: false };
		} catch (error) {
			console.error('ADD COMMENT MUTATION ERROR: ', error);
			return { code: ERROR_CODE.INTERNAL_ERROR, success: false };
		}
	}
}
