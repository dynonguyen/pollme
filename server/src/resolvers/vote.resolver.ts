import {
	Arg,
	Args,
	Authorized,
	Ctx,
	FieldResolver,
	Mutation,
	Query,
	Resolver,
	Root,
} from 'type-graphql';
import { MAX } from '../constants/validation';
import CommentModel from '../models/comment.model';
import TagModel from '../models/tag.model';
import UserModel from '../models/user.model';
import VoteModel from '../models/vote.model';
import { ExpressContext } from '../types/core/ExpressContext';
import { MutationResponseImpl } from '../types/core/MutationResponse';
import { paginatedResponseDefault } from '../types/core/QueryResponse';
import { ROLES } from '../types/core/Role';
import User from '../types/entities/User';
import Vote from '../types/entities/Vote';
import { NewVoteInput } from '../types/input/NewVoteInput';
import { VotePaginationArg } from '../types/input/VoteArg';
import { UpdateVoteInput, VotingInput } from '../types/input/VoteInput';
import {
	VoteListQueryResponse,
	VotePaginatedResponse,
} from '../types/response/VoteResponse';
import mongoosePaginate from '../utils/mongoose-paginate';
import {
	voteFilterToQuery,
	voteKeywordSearchToQuery,
} from '../utils/query-convert';
import { DEFAULT } from './../constants/default';
import { VoteFilterOptions } from './../constants/enum';
import { ERROR_CODE, SUCCESS_CODE } from './../constants/status';
import { VoteAnswer } from './../types/entities/Vote';
import { AddAnswerInput } from './../types/input/VoteInput';
import {
	VoteMutationResponse,
	VoteQueryResponse,
} from './../types/response/VoteResponse';
import {
	increaseTagOrCreate,
	randomString,
	stringToSlug,
} from './../utils/helper';

@Resolver(_of => Vote)
export class VoteResolver {
	@FieldResolver(_return => User, { nullable: true })
	async owner(@Root() vote: Vote): Promise<User | null> {
		if (!vote._doc?.ownerId && !vote.ownerId) return null;
		const ownerId = vote._doc?.ownerId || vote.ownerId;
		return await UserModel.findById(ownerId);
	}

	@FieldResolver(_return => String, { nullable: true })
	shortDesc(@Root() vote: Vote): string {
		const desc = vote._doc?.desc || '';
		if (desc && desc.length > MAX.VOTE_SHORT_DESC) {
			return `${desc.slice(0, MAX.VOTE_SHORT_DESC)}...`;
		}
		return desc;
	}

	@Query(_return => VotePaginatedResponse, { nullable: true })
	async publicVotes(
		@Args()
		{
			page = 1,
			pageSize = DEFAULT.PAGE_SIZE,
			sort,
			filter = VoteFilterOptions.ALL,
			search = '',
		}: VotePaginationArg,
	): Promise<VotePaginatedResponse> {
		try {
			if (page < 1) page = 1;
			if (pageSize < 1) pageSize = DEFAULT.PAGE_SIZE;

			const filterQuery = voteFilterToQuery(filter);
			const searchQuery = voteKeywordSearchToQuery(search);

			const votes = await mongoosePaginate(
				VoteModel,
				{ isPrivate: false, ...filterQuery, ...searchQuery },
				{ page, pageSize },
				{ sort },
			);

			return {
				code: SUCCESS_CODE.OK,
				sort,
				filter,
				...votes,
			};
		} catch (error) {
			console.error('VoteResolver - votes error: ', error);
			return {
				code: SUCCESS_CODE.OK,
				...paginatedResponseDefault,
				sort,
				filter,
			};
		}
	}

	@Query(_return => VoteQueryResponse, { nullable: true })
	async publicVote(@Arg('voteId') voteId: String): Promise<VoteQueryResponse> {
		try {
			if (!voteId) return { code: ERROR_CODE.BAD_REQUEST };

			const vote = await VoteModel.findOne({ _id: voteId, isPrivate: false });
			if (vote) {
				return {
					code: SUCCESS_CODE.OK,
					vote,
				};
			}

			return {
				code: ERROR_CODE.NOT_FOUND,
				message: 'Vote not found',
			};
		} catch (error) {
			console.error('Public vote query error: ', error);
			return {
				code: ERROR_CODE.INTERNAL_ERROR,
			};
		}
	}

	@Query(_return => VoteQueryResponse, { nullable: true })
	async privateVote(
		@Arg('privateLink') privateLink: String,
	): Promise<VoteQueryResponse> {
		try {
			if (!privateLink) return { code: ERROR_CODE.BAD_REQUEST };

			const vote = await VoteModel.findOne({ isPrivate: true, privateLink });

			if (vote) {
				return {
					code: SUCCESS_CODE.OK,
					vote,
				};
			}

			return {
				code: ERROR_CODE.NOT_FOUND,
				message: 'Vote not found',
			};
		} catch (error) {
			console.error('Public vote query error: ', error);
			return {
				code: ERROR_CODE.INTERNAL_ERROR,
			};
		}
	}

	@Authorized(ROLES.USER)
	@Query(_return => VoteListQueryResponse)
	async votesOfUser(
		@Ctx() { res }: ExpressContext,
	): Promise<VoteListQueryResponse> {
		try {
			const { user } = res.locals;
			if (!user || !user?._id) {
				return { code: ERROR_CODE.UNAUTHORIZED };
			}
			const votes = await VoteModel.find({ ownerId: user._id });
			return { code: SUCCESS_CODE.OK, votes };
		} catch (error) {
			console.error('VOTE OF USER QUERY ERROR: ', error);
			return { code: ERROR_CODE.INTERNAL_ERROR };
		}
	}

	@Authorized(ROLES.USER)
	@Mutation(_return => VoteMutationResponse)
	async createVote(
		@Arg('newVoteInput') voteInput: NewVoteInput,
		@Ctx() { res }: ExpressContext,
	): Promise<VoteMutationResponse> {
		const { tags, answers, title, isPrivate, ...restInput } = voteInput;

		try {
			const ownerId = res.locals.user._id;

			tags.forEach(tag => increaseTagOrCreate(tag));
			const newVote = await VoteModel.create({
				ownerId,
				title,
				slug: stringToSlug(title),
				answers: answers.map(answer => ({
					...answer,
					voteList: [],
				})),
				tags: tags.map(tag => ({ name: tag, slug: stringToSlug(tag) })),
				createdAt: new Date(),
				isPrivate,
				privateLink: isPrivate ? randomString() : null,
				...restInput,
			});

			return {
				code: SUCCESS_CODE.CREATED,
				success: true,
				vote: newVote,
			};
		} catch (error) {
			console.error('CREATE VOTE MUTATION ERROR: ', error);
			return {
				code: ERROR_CODE.INTERNAL_ERROR,
				success: false,
				message: 'Failed',
			};
		}
	}

	@Mutation(_return => VoteMutationResponse)
	async voting(
		@Arg('votingInput') votingInput: VotingInput,
	): Promise<VoteMutationResponse> {
		const { pollId, votes = [], unVoteIds = [], userInfo } = votingInput;
		const { userId, userIp, username } = userInfo;
		let numOfIncrease = 0;

		try {
			let vote = await VoteModel.findById(pollId);
			if (!vote) {
				return {
					code: ERROR_CODE.BAD_REQUEST,
					message: 'Vote does not exist',
					success: false,
				};
			}

			const { answers } = vote;
			let newAnswers: VoteAnswer[] = [];
			answers.forEach(answer => {
				if (vote?.isIPDuplicationCheck) {
					if (unVoteIds.includes(answer.id)) {
						const voteIndex = answer.voteList.findIndex(
							v => v.userInfo?.ip === userIp || v.userInfo?.userId === userId,
						);
						if (voteIndex !== -1) {
							answer.voteList.splice(voteIndex, 1);
							numOfIncrease--;
						}
					}
				}

				votes.forEach(v => {
					if (v.id === answer.id) {
						if (!vote?.isIPDuplicationCheck) {
							answer.voteList.push({
								userInfo: {
									userId,
									ip: userIp,
									name: username,
								},
								score: v.score,
							});
							numOfIncrease++;
						} else {
							const voteIndex = answer.voteList.findIndex(
								v2 =>
									v2.userInfo?.ip === userIp || v2.userInfo?.userId === userId,
							);
							if (voteIndex !== -1) {
								answer.voteList[voteIndex] = {
									userInfo: {
										userId,
										ip: userIp,
										name: username,
									},
									score: v.score,
								};
							} else {
								answer.voteList.push({
									userInfo: {
										userId,
										ip: userIp,
										name: username,
									},
									score: v.score,
								});
								numOfIncrease++;
							}
						}
					}
				});

				newAnswers.push(answer);
			});

			await VoteModel.updateOne(
				{ _id: pollId },
				{ $set: { answers: newAnswers }, $inc: { totalVote: numOfIncrease } },
			);

			return {
				code: SUCCESS_CODE.OK,
				success: true,
				vote: vote._doc
					? {
							...vote._doc,
							answers: newAnswers,
							totalVote: vote._doc.totalVote + numOfIncrease,
					  }
					: undefined,
			};
		} catch (error) {
			console.error('VOTING MUTATION ERROR: ', error);
			return {
				code: ERROR_CODE.INTERNAL_ERROR,
				success: false,
			};
		}
	}

	@Mutation(_return => MutationResponseImpl)
	async addAnswerOption(
		@Arg('addAnswerInput') { answer, voteId }: AddAnswerInput,
	): Promise<MutationResponseImpl> {
		try {
			const vote = await VoteModel.findById(voteId);
			if (!vote) {
				return { code: ERROR_CODE.NOT_FOUND, success: false };
			}
			const { answers } = vote;
			const existingIndex = answers.findIndex(
				ans => ans.label.toLowerCase() === answer.label.toLowerCase(),
			);
			if (existingIndex !== -1) {
				return {
					code: ERROR_CODE.CONFLICT,
					success: false,
					message: 'Answer option already exists !',
				};
			}

			const newAnswer = { voteList: [], ...answer };
			await VoteModel.updateOne(
				{ _id: voteId },
				{ $push: { answers: newAnswer } },
			);
			return { code: SUCCESS_CODE.OK, success: true };
		} catch (error) {
			console.error('AddAnswerOption ERROR: ', error);
			return { code: ERROR_CODE.INTERNAL_ERROR, success: false };
		}
	}

	@Authorized(ROLES.USER)
	@Mutation(_return => MutationResponseImpl)
	async deleteVote(
		@Arg('voteId') voteId: String,
		@Ctx() { res }: ExpressContext,
	): Promise<MutationResponseImpl> {
		try {
			const { user } = res.locals;
			if (!voteId || !user) {
				return {
					code: ERROR_CODE.NOT_ACCEPTABLE,
					message: 'Invalid Params',
					success: false,
				};
			}

			const vote = await VoteModel.findById(voteId);
			if (!vote) {
				return { code: ERROR_CODE.NOT_FOUND, success: false };
			}
			const tags = vote.tags.map(t => t.name.toLowerCase());

			const promises = [
				VoteModel.deleteOne({ _id: voteId, ownerId: user._id }),
				CommentModel.remove({ voteId }),
				TagModel.updateMany(
					{ name: { $in: tags } },
					{ $inc: { totalVote: -1 } },
				),
			];
			await Promise.all(promises);

			return { code: SUCCESS_CODE.OK, success: true };
		} catch (error) {
			console.error('DELETE VOTE MUTATION ERROR: ', error);
			return { code: ERROR_CODE.INTERNAL_ERROR, success: false };
		}
	}

	@Authorized(ROLES.USER)
	@Mutation(_return => MutationResponseImpl)
	async updateVote(
		@Arg('updateInput') updateInput: UpdateVoteInput,
		@Ctx() { res }: ExpressContext,
	): Promise<MutationResponseImpl> {
		try {
			const { voteId, refreshLink, ...restInput } = updateInput;
			const { user } = res.locals;
			if (!voteId || !user) {
				return {
					code: ERROR_CODE.NOT_ACCEPTABLE,
					message: 'Invalid Params',
					success: false,
				};
			}

			const newPrivateLink = refreshLink ? { privateLink: randomString() } : {};
			await VoteModel.updateOne(
				{ _id: voteId, ownerId: user._id },
				{ $set: { ...restInput, ...newPrivateLink } },
			);

			return { code: SUCCESS_CODE.OK, success: true };
		} catch (error) {
			console.error('VOTE UPDATE ERROR: ', error);
			return { code: ERROR_CODE.INTERNAL_ERROR, success: false };
		}
	}
}
