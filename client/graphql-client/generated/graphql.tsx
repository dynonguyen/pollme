import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};

export type AddAnswerInput = {
  answer: AnswerItem;
  voteId: Scalars['String'];
};

export type AddCommentInput = {
  content: Scalars['String'];
  ownerId: Scalars['String'];
  voteId: Scalars['String'];
};

export type AnswerItem = {
  id: Scalars['ID'];
  label: Scalars['String'];
  photo?: InputMaybe<Scalars['String']>;
};

export type Comment = {
  __typename?: 'Comment';
  _id: Scalars['ID'];
  content: Scalars['String'];
  createdAt: Scalars['DateTime'];
  favorites: Array<Scalars['String']>;
  owner?: Maybe<User>;
  ownerId: Scalars['String'];
  voteId: Scalars['String'];
};

export type CommentPaginatedResponse = QueryResponse & {
  __typename?: 'CommentPaginatedResponse';
  code: Scalars['Int'];
  docs: Array<Comment>;
  message?: Maybe<Scalars['String']>;
  page: Scalars['Int'];
  pageSize: Scalars['Int'];
  total: Scalars['Int'];
};

export type CountingAggregation = QueryResponse & {
  __typename?: 'CountingAggregation';
  code: Scalars['Int'];
  comment: Scalars['Int'];
  message?: Maybe<Scalars['String']>;
  poll: Scalars['Int'];
  tag: Scalars['Int'];
  user: Scalars['Int'];
};

export type CreateCommentMutationResponse = MutationResponse & {
  __typename?: 'CreateCommentMutationResponse';
  code: Scalars['Int'];
  comment: Comment;
  message?: Maybe<Scalars['String']>;
  success: Scalars['Boolean'];
};

export type FavoriteCommentInput = {
  commentId: Scalars['String'];
  userId: Scalars['String'];
};

export type LoginInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addAnswerOption: MutationResponseImpl;
  createComment: CreateCommentMutationResponse;
  createVote: VoteMutationResponse;
  deleteVote: MutationResponseImpl;
  favoriteComment: MutationResponseImpl;
  login: UserMutationResponse;
  loginWithOAuth: UserMutationResponse;
  logout: Scalars['Boolean'];
  register: UserMutationResponse;
  updateUserInfo: MutationResponseImpl;
  updateVote: MutationResponseImpl;
  voting: VoteMutationResponse;
};


export type MutationAddAnswerOptionArgs = {
  addAnswerInput: AddAnswerInput;
};


export type MutationCreateCommentArgs = {
  addCommentInput: AddCommentInput;
};


export type MutationCreateVoteArgs = {
  newVoteInput: NewVoteInput;
};


export type MutationDeleteVoteArgs = {
  voteId: Scalars['String'];
};


export type MutationFavoriteCommentArgs = {
  favoriteCommentInput: FavoriteCommentInput;
};


export type MutationLoginArgs = {
  loginInput: LoginInput;
};


export type MutationLoginWithOAuthArgs = {
  loginInput: OAuthLoginInput;
};


export type MutationRegisterArgs = {
  registerInput: RegisterInput;
};


export type MutationUpdateUserInfoArgs = {
  updateInput: UpdateUserInfoInput;
};


export type MutationUpdateVoteArgs = {
  updateInput: UpdateVoteInput;
};


export type MutationVotingArgs = {
  votingInput: VotingInput;
};

export type MutationResponse = {
  code: Scalars['Int'];
  message?: Maybe<Scalars['String']>;
  success: Scalars['Boolean'];
};

export type MutationResponseImpl = MutationResponse & {
  __typename?: 'MutationResponseImpl';
  code: Scalars['Int'];
  message?: Maybe<Scalars['String']>;
  success: Scalars['Boolean'];
};

export type NewVoteInput = {
  allowAddOption: Scalars['Boolean'];
  answers: Array<AnswerItem>;
  desc: Scalars['String'];
  endDate?: InputMaybe<Scalars['DateTime']>;
  isIPDuplicationCheck: Scalars['Boolean'];
  isLoginRequired: Scalars['Boolean'];
  isPrivate: Scalars['Boolean'];
  isReCaptcha: Scalars['Boolean'];
  isShowResult: Scalars['Boolean'];
  isShowResultBtn: Scalars['Boolean'];
  maxScore?: InputMaybe<Scalars['Int']>;
  maxVote?: InputMaybe<Scalars['Int']>;
  tags: Array<Scalars['String']>;
  title: Scalars['String'];
  type: Scalars['Int'];
};

export type OAuthLoginInput = {
  avt: Scalars['String'];
  email: Scalars['String'];
  name: Scalars['String'];
  oauthId: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  comments: CommentPaginatedResponse;
  count: CountingAggregation;
  me?: Maybe<User>;
  privateVote?: Maybe<VoteQueryResponse>;
  publicVote?: Maybe<VoteQueryResponse>;
  publicVotes?: Maybe<VotePaginatedResponse>;
  tags: TagPaginatedResponse;
  user?: Maybe<User>;
  votesOfUser: VoteListQueryResponse;
};


export type QueryCommentsArgs = {
  page?: InputMaybe<Scalars['Int']>;
  pageSize?: InputMaybe<Scalars['Int']>;
  voteId: Scalars['String'];
};


export type QueryPrivateVoteArgs = {
  privateLink: Scalars['String'];
};


export type QueryPublicVoteArgs = {
  voteId: Scalars['String'];
};


export type QueryPublicVotesArgs = {
  filter?: InputMaybe<Scalars['String']>;
  page?: InputMaybe<Scalars['Int']>;
  pageSize?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Scalars['String']>;
};


export type QueryTagsArgs = {
  page?: InputMaybe<Scalars['Int']>;
  pageSize?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Scalars['String']>;
};


export type QueryUserArgs = {
  userId: Scalars['String'];
};

export type QueryResponse = {
  code: Scalars['Int'];
  message?: Maybe<Scalars['String']>;
};

export type RegisterInput = {
  email: Scalars['String'];
  name: Scalars['String'];
  password: Scalars['String'];
};

export type Tag = {
  __typename?: 'Tag';
  _id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  enDesc: Scalars['String'];
  name: Scalars['String'];
  slug: Scalars['String'];
  totalVote: Scalars['Float'];
  viDesc: Scalars['String'];
};

export type TagInVote = {
  __typename?: 'TagInVote';
  name: Scalars['String'];
  slug: Scalars['String'];
};

export type TagPaginatedResponse = QueryResponse & {
  __typename?: 'TagPaginatedResponse';
  code: Scalars['Int'];
  docs: Array<Tag>;
  message?: Maybe<Scalars['String']>;
  page: Scalars['Int'];
  pageSize: Scalars['Int'];
  search?: Maybe<Scalars['String']>;
  sort?: Maybe<Scalars['String']>;
  total: Scalars['Int'];
};

export type UpdateUserInfoInput = {
  avt?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
};

export type UpdateVoteInput = {
  allowAddOption: Scalars['Boolean'];
  endDate?: InputMaybe<Scalars['String']>;
  isIPDuplicationCheck: Scalars['Boolean'];
  isLoginRequired: Scalars['Boolean'];
  isPrivate: Scalars['Boolean'];
  isReCaptcha: Scalars['Boolean'];
  isShowResult: Scalars['Boolean'];
  isShowResultBtn: Scalars['Boolean'];
  maxVote?: InputMaybe<Scalars['Int']>;
  refreshLink?: InputMaybe<Scalars['Boolean']>;
  voteId: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  _id: Scalars['ID'];
  avt?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  email: Scalars['String'];
  name: Scalars['String'];
  oauthId?: Maybe<Scalars['String']>;
};

export type UserInfoInVote = {
  __typename?: 'UserInfoInVote';
  ip?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  userId?: Maybe<Scalars['String']>;
};

export type UserInfoInput = {
  userId?: InputMaybe<Scalars['String']>;
  userIp?: InputMaybe<Scalars['String']>;
  username?: InputMaybe<Scalars['String']>;
};

export type UserMutationResponse = MutationResponse & {
  __typename?: 'UserMutationResponse';
  code: Scalars['Int'];
  message?: Maybe<Scalars['String']>;
  success: Scalars['Boolean'];
  user?: Maybe<User>;
};

export type Vote = {
  __typename?: 'Vote';
  _id: Scalars['ID'];
  allowAddOption: Scalars['Boolean'];
  answers: Array<VoteAnswer>;
  createdAt: Scalars['DateTime'];
  desc?: Maybe<Scalars['String']>;
  endDate?: Maybe<Scalars['DateTime']>;
  isIPDuplicationCheck: Scalars['Boolean'];
  isLoginRequired: Scalars['Boolean'];
  isPrivate: Scalars['Boolean'];
  isReCaptcha: Scalars['Boolean'];
  isShowResult: Scalars['Boolean'];
  isShowResultBtn: Scalars['Boolean'];
  maxScore?: Maybe<Scalars['Int']>;
  maxVote?: Maybe<Scalars['Int']>;
  owner?: Maybe<User>;
  ownerId: Scalars['String'];
  privateLink?: Maybe<Scalars['String']>;
  shortDesc?: Maybe<Scalars['String']>;
  slug: Scalars['String'];
  tags: Array<TagInVote>;
  title: Scalars['String'];
  totalComment: Scalars['Int'];
  totalVote: Scalars['Int'];
  type: Scalars['Int'];
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type VoteAnswer = {
  __typename?: 'VoteAnswer';
  id: Scalars['ID'];
  label: Scalars['String'];
  photo?: Maybe<Scalars['String']>;
  voteList: Array<VoteOfUser>;
};

export type VoteInput = {
  id: Scalars['String'];
  score?: InputMaybe<Scalars['Float']>;
};

export type VoteListQueryResponse = QueryResponse & {
  __typename?: 'VoteListQueryResponse';
  code: Scalars['Int'];
  message?: Maybe<Scalars['String']>;
  votes: Array<Vote>;
};

export type VoteMutationResponse = MutationResponse & {
  __typename?: 'VoteMutationResponse';
  code: Scalars['Int'];
  message?: Maybe<Scalars['String']>;
  success: Scalars['Boolean'];
  vote?: Maybe<Vote>;
};

export type VoteOfUser = {
  __typename?: 'VoteOfUser';
  score?: Maybe<Scalars['Int']>;
  userInfo: UserInfoInVote;
};

export type VotePaginatedResponse = QueryResponse & {
  __typename?: 'VotePaginatedResponse';
  code: Scalars['Int'];
  docs: Array<Vote>;
  filter?: Maybe<Scalars['String']>;
  message?: Maybe<Scalars['String']>;
  page: Scalars['Int'];
  pageSize: Scalars['Int'];
  sort?: Maybe<Scalars['String']>;
  total: Scalars['Int'];
};

export type VoteQueryResponse = QueryResponse & {
  __typename?: 'VoteQueryResponse';
  code: Scalars['Int'];
  message?: Maybe<Scalars['String']>;
  vote?: Maybe<Vote>;
};

export type VotingInput = {
  pollId: Scalars['String'];
  unVoteIds?: InputMaybe<Array<Scalars['String']>>;
  userInfo: UserInfoInput;
  votes?: InputMaybe<Array<VoteInput>>;
};

type MutationStatus_CreateCommentMutationResponse_Fragment = { __typename?: 'CreateCommentMutationResponse', code: number, success: boolean, message?: string | null };

type MutationStatus_MutationResponseImpl_Fragment = { __typename?: 'MutationResponseImpl', code: number, success: boolean, message?: string | null };

type MutationStatus_UserMutationResponse_Fragment = { __typename?: 'UserMutationResponse', code: number, success: boolean, message?: string | null };

type MutationStatus_VoteMutationResponse_Fragment = { __typename?: 'VoteMutationResponse', code: number, success: boolean, message?: string | null };

export type MutationStatusFragment = MutationStatus_CreateCommentMutationResponse_Fragment | MutationStatus_MutationResponseImpl_Fragment | MutationStatus_UserMutationResponse_Fragment | MutationStatus_VoteMutationResponse_Fragment;

type QueryStatus_CommentPaginatedResponse_Fragment = { __typename?: 'CommentPaginatedResponse', code: number, message?: string | null };

type QueryStatus_CountingAggregation_Fragment = { __typename?: 'CountingAggregation', code: number, message?: string | null };

type QueryStatus_TagPaginatedResponse_Fragment = { __typename?: 'TagPaginatedResponse', code: number, message?: string | null };

type QueryStatus_VoteListQueryResponse_Fragment = { __typename?: 'VoteListQueryResponse', code: number, message?: string | null };

type QueryStatus_VotePaginatedResponse_Fragment = { __typename?: 'VotePaginatedResponse', code: number, message?: string | null };

type QueryStatus_VoteQueryResponse_Fragment = { __typename?: 'VoteQueryResponse', code: number, message?: string | null };

export type QueryStatusFragment = QueryStatus_CommentPaginatedResponse_Fragment | QueryStatus_CountingAggregation_Fragment | QueryStatus_TagPaginatedResponse_Fragment | QueryStatus_VoteListQueryResponse_Fragment | QueryStatus_VotePaginatedResponse_Fragment | QueryStatus_VoteQueryResponse_Fragment;

export type UserInfoFragment = { __typename?: 'User', _id: string, email: string, name: string, avt?: string | null, createdAt: any };

export type VoteFullInfoFragment = { __typename?: 'Vote', _id: string, ownerId: string, title: string, desc?: string | null, type: number, createdAt: any, updatedAt?: any | null, endDate?: any | null, isPrivate: boolean, allowAddOption: boolean, isIPDuplicationCheck: boolean, isLoginRequired: boolean, isReCaptcha: boolean, isShowResult: boolean, isShowResultBtn: boolean, maxScore?: number | null, maxVote?: number | null, totalComment: number, totalVote: number, privateLink?: string | null, tags: Array<{ __typename?: 'TagInVote', name: string, slug: string }>, answers: Array<{ __typename?: 'VoteAnswer', id: string, label: string, photo?: string | null, voteList: Array<{ __typename?: 'VoteOfUser', score?: number | null, userInfo: { __typename?: 'UserInfoInVote', ip?: string | null, name?: string | null, userId?: string | null } }> }>, owner?: { __typename?: 'User', avt?: string | null, name: string } | null };

export type VoteSummaryInfoFragment = { __typename?: 'Vote', _id: string, title: string, shortDesc?: string | null, createdAt: any, endDate?: any | null, slug: string, totalComment: number, maxVote?: number | null, totalVote: number, tags: Array<{ __typename?: 'TagInVote', name: string, slug: string }>, owner?: { __typename?: 'User', _id: string, avt?: string | null, name: string } | null };

export type FavoriteCommentMutationVariables = Exact<{
  favoriteCommentInput: FavoriteCommentInput;
}>;


export type FavoriteCommentMutation = { __typename?: 'Mutation', favoriteComment: { __typename?: 'MutationResponseImpl', code: number, success: boolean, message?: string | null } };

export type CreateCommentMutationVariables = Exact<{
  addCommentInput: AddCommentInput;
}>;


export type CreateCommentMutation = { __typename?: 'Mutation', createComment: { __typename?: 'CreateCommentMutationResponse', code: number, success: boolean, message?: string | null, comment: { __typename?: 'Comment', _id: string, createdAt: any } } };

export type RegisterMutationVariables = Exact<{
  registerInput: RegisterInput;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'UserMutationResponse', code: number, success: boolean, message?: string | null, user?: { __typename?: 'User', _id: string, email: string, name: string, avt?: string | null, createdAt: any } | null } };

export type LoginMutationVariables = Exact<{
  loginInput: LoginInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'UserMutationResponse', code: number, success: boolean, message?: string | null, user?: { __typename?: 'User', _id: string, email: string, name: string, avt?: string | null, createdAt: any } | null } };

export type LoginOAuthMutationVariables = Exact<{
  loginInput: OAuthLoginInput;
}>;


export type LoginOAuthMutation = { __typename?: 'Mutation', loginWithOAuth: { __typename?: 'UserMutationResponse', code: number, success: boolean, message?: string | null, user?: { __typename?: 'User', _id: string, email: string, name: string, avt?: string | null, createdAt: any } | null } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: boolean };

export type UpdateUserInfoMutationVariables = Exact<{
  updateInput: UpdateUserInfoInput;
}>;


export type UpdateUserInfoMutation = { __typename?: 'Mutation', updateUserInfo: { __typename?: 'MutationResponseImpl', code: number, success: boolean, message?: string | null } };

export type CreateVoteMutationVariables = Exact<{
  newVoteInput: NewVoteInput;
}>;


export type CreateVoteMutation = { __typename?: 'Mutation', createVote: { __typename?: 'VoteMutationResponse', code: number, success: boolean, message?: string | null, vote?: { __typename?: 'Vote', _id: string, slug: string, isPrivate: boolean, privateLink?: string | null } | null } };

export type VotingMutationVariables = Exact<{
  votingInput: VotingInput;
}>;


export type VotingMutation = { __typename?: 'Mutation', voting: { __typename?: 'VoteMutationResponse', code: number, success: boolean, message?: string | null, vote?: { __typename?: 'Vote', _id: string, ownerId: string, title: string, desc?: string | null, type: number, createdAt: any, updatedAt?: any | null, endDate?: any | null, isPrivate: boolean, allowAddOption: boolean, isIPDuplicationCheck: boolean, isLoginRequired: boolean, isReCaptcha: boolean, isShowResult: boolean, isShowResultBtn: boolean, maxScore?: number | null, maxVote?: number | null, totalComment: number, totalVote: number, privateLink?: string | null, tags: Array<{ __typename?: 'TagInVote', name: string, slug: string }>, answers: Array<{ __typename?: 'VoteAnswer', id: string, label: string, photo?: string | null, voteList: Array<{ __typename?: 'VoteOfUser', score?: number | null, userInfo: { __typename?: 'UserInfoInVote', ip?: string | null, name?: string | null, userId?: string | null } }> }>, owner?: { __typename?: 'User', avt?: string | null, name: string } | null } | null } };

export type AddAnswerOptionMutationVariables = Exact<{
  addAnswerInput: AddAnswerInput;
}>;


export type AddAnswerOptionMutation = { __typename?: 'Mutation', addAnswerOption: { __typename?: 'MutationResponseImpl', code: number, success: boolean, message?: string | null } };

export type DeleteVoteMutationVariables = Exact<{
  voteId: Scalars['String'];
}>;


export type DeleteVoteMutation = { __typename?: 'Mutation', deleteVote: { __typename?: 'MutationResponseImpl', code: number, success: boolean, message?: string | null } };

export type UpdateVoteMutationVariables = Exact<{
  updateInput: UpdateVoteInput;
}>;


export type UpdateVoteMutation = { __typename?: 'Mutation', updateVote: { __typename?: 'MutationResponseImpl', code: number, success: boolean, message?: string | null } };

export type HomeAnalysisQueryVariables = Exact<{ [key: string]: never; }>;


export type HomeAnalysisQuery = { __typename?: 'Query', count: { __typename?: 'CountingAggregation', poll: number, user: number, tag: number, comment: number, code: number, message?: string | null } };

export type CommentsQueryVariables = Exact<{
  voteId: Scalars['String'];
  page?: InputMaybe<Scalars['Int']>;
  pageSize?: InputMaybe<Scalars['Int']>;
}>;


export type CommentsQuery = { __typename?: 'Query', comments: { __typename?: 'CommentPaginatedResponse', page: number, pageSize: number, total: number, code: number, message?: string | null, docs: Array<{ __typename?: 'Comment', _id: string, content: string, createdAt: any, favorites: Array<string>, owner?: { __typename?: 'User', avt?: string | null, name: string } | null }> } };

export type ViTagsQueryVariables = Exact<{
  page?: InputMaybe<Scalars['Int']>;
  pageSize?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Scalars['String']>;
  search?: InputMaybe<Scalars['String']>;
}>;


export type ViTagsQuery = { __typename?: 'Query', tags: { __typename?: 'TagPaginatedResponse', page: number, pageSize: number, total: number, sort?: string | null, search?: string | null, code: number, message?: string | null, docs: Array<{ __typename?: 'Tag', _id: string, name: string, slug: string, totalVote: number, viDesc: string }> } };

export type EnTagsQueryVariables = Exact<{
  page?: InputMaybe<Scalars['Int']>;
  pageSize?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Scalars['String']>;
  search?: InputMaybe<Scalars['String']>;
}>;


export type EnTagsQuery = { __typename?: 'Query', tags: { __typename?: 'TagPaginatedResponse', page: number, pageSize: number, total: number, sort?: string | null, search?: string | null, code: number, message?: string | null, docs: Array<{ __typename?: 'Tag', _id: string, name: string, slug: string, totalVote: number, enDesc: string }> } };

export type OnlyTagNameQueryVariables = Exact<{
  page?: InputMaybe<Scalars['Int']>;
  pageSize?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Scalars['String']>;
  search?: InputMaybe<Scalars['String']>;
}>;


export type OnlyTagNameQuery = { __typename?: 'Query', tags: { __typename?: 'TagPaginatedResponse', code: number, docs: Array<{ __typename?: 'Tag', name: string }> } };

export type GetCoreUserInfoQueryVariables = Exact<{
  userId: Scalars['String'];
}>;


export type GetCoreUserInfoQuery = { __typename?: 'Query', user?: { __typename?: 'User', _id: string, email: string, name: string, avt?: string | null, createdAt: any } | null };

export type GetMeQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMeQuery = { __typename?: 'Query', me?: { __typename?: 'User', _id: string, email: string, name: string, avt?: string | null, createdAt: any } | null };

export type DiscoverQueryVariables = Exact<{
  page?: InputMaybe<Scalars['Int']>;
  pageSize?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Scalars['String']>;
  filter?: InputMaybe<Scalars['String']>;
  search?: InputMaybe<Scalars['String']>;
}>;


export type DiscoverQuery = { __typename?: 'Query', publicVotes?: { __typename?: 'VotePaginatedResponse', page: number, pageSize: number, total: number, sort?: string | null, filter?: string | null, code: number, message?: string | null, docs: Array<{ __typename?: 'Vote', _id: string, title: string, shortDesc?: string | null, createdAt: any, endDate?: any | null, slug: string, totalComment: number, maxVote?: number | null, totalVote: number, tags: Array<{ __typename?: 'TagInVote', name: string, slug: string }>, owner?: { __typename?: 'User', _id: string, avt?: string | null, name: string } | null }> } | null };

export type GetPublicVoteByIdQueryVariables = Exact<{
  voteId: Scalars['String'];
}>;


export type GetPublicVoteByIdQuery = { __typename?: 'Query', publicVote?: { __typename?: 'VoteQueryResponse', code: number, message?: string | null, vote?: { __typename?: 'Vote', _id: string, ownerId: string, title: string, desc?: string | null, type: number, createdAt: any, updatedAt?: any | null, endDate?: any | null, isPrivate: boolean, allowAddOption: boolean, isIPDuplicationCheck: boolean, isLoginRequired: boolean, isReCaptcha: boolean, isShowResult: boolean, isShowResultBtn: boolean, maxScore?: number | null, maxVote?: number | null, totalComment: number, totalVote: number, privateLink?: string | null, tags: Array<{ __typename?: 'TagInVote', name: string, slug: string }>, answers: Array<{ __typename?: 'VoteAnswer', id: string, label: string, photo?: string | null, voteList: Array<{ __typename?: 'VoteOfUser', score?: number | null, userInfo: { __typename?: 'UserInfoInVote', ip?: string | null, name?: string | null, userId?: string | null } }> }>, owner?: { __typename?: 'User', avt?: string | null, name: string } | null } | null } | null };

export type GetPrivateVoteByLinkQueryVariables = Exact<{
  privateLink: Scalars['String'];
}>;


export type GetPrivateVoteByLinkQuery = { __typename?: 'Query', privateVote?: { __typename?: 'VoteQueryResponse', code: number, message?: string | null, vote?: { __typename?: 'Vote', _id: string, ownerId: string, title: string, desc?: string | null, type: number, createdAt: any, updatedAt?: any | null, endDate?: any | null, isPrivate: boolean, allowAddOption: boolean, isIPDuplicationCheck: boolean, isLoginRequired: boolean, isReCaptcha: boolean, isShowResult: boolean, isShowResultBtn: boolean, maxScore?: number | null, maxVote?: number | null, totalComment: number, totalVote: number, privateLink?: string | null, tags: Array<{ __typename?: 'TagInVote', name: string, slug: string }>, answers: Array<{ __typename?: 'VoteAnswer', id: string, label: string, photo?: string | null, voteList: Array<{ __typename?: 'VoteOfUser', score?: number | null, userInfo: { __typename?: 'UserInfoInVote', ip?: string | null, name?: string | null, userId?: string | null } }> }>, owner?: { __typename?: 'User', avt?: string | null, name: string } | null } | null } | null };

export type GetVoteListOfUserQueryVariables = Exact<{ [key: string]: never; }>;


export type GetVoteListOfUserQuery = { __typename?: 'Query', votesOfUser: { __typename?: 'VoteListQueryResponse', code: number, message?: string | null, votes: Array<{ __typename?: 'Vote', _id: string, ownerId: string, title: string, desc?: string | null, type: number, createdAt: any, updatedAt?: any | null, endDate?: any | null, isPrivate: boolean, allowAddOption: boolean, isIPDuplicationCheck: boolean, isLoginRequired: boolean, isReCaptcha: boolean, isShowResult: boolean, isShowResultBtn: boolean, maxScore?: number | null, maxVote?: number | null, totalComment: number, totalVote: number, privateLink?: string | null, tags: Array<{ __typename?: 'TagInVote', name: string, slug: string }>, answers: Array<{ __typename?: 'VoteAnswer', id: string, label: string, photo?: string | null, voteList: Array<{ __typename?: 'VoteOfUser', score?: number | null, userInfo: { __typename?: 'UserInfoInVote', ip?: string | null, name?: string | null, userId?: string | null } }> }>, owner?: { __typename?: 'User', avt?: string | null, name: string } | null }> } };

export const MutationStatusFragmentDoc = gql`
    fragment mutationStatus on MutationResponse {
  code
  success
  message
}
    `;
export const QueryStatusFragmentDoc = gql`
    fragment queryStatus on QueryResponse {
  code
  message
}
    `;
export const UserInfoFragmentDoc = gql`
    fragment userInfo on User {
  _id
  email
  name
  avt
  createdAt
}
    `;
export const VoteFullInfoFragmentDoc = gql`
    fragment voteFullInfo on Vote {
  _id
  ownerId
  title
  desc
  type
  createdAt
  updatedAt
  endDate
  isPrivate
  allowAddOption
  isIPDuplicationCheck
  isLoginRequired
  isReCaptcha
  isShowResult
  isShowResultBtn
  maxScore
  maxVote
  totalComment
  totalVote
  privateLink
  tags {
    name
    slug
  }
  answers {
    id
    label
    photo
    voteList {
      score
      userInfo {
        ip
        name
        userId
      }
    }
  }
  owner {
    avt
    name
  }
}
    `;
export const VoteSummaryInfoFragmentDoc = gql`
    fragment voteSummaryInfo on Vote {
  _id
  title
  shortDesc
  createdAt
  endDate
  slug
  tags {
    name
    slug
  }
  totalComment
  maxVote
  totalVote
  owner {
    _id
    avt
    name
  }
}
    `;
export const FavoriteCommentDocument = gql`
    mutation FavoriteComment($favoriteCommentInput: FavoriteCommentInput!) {
  favoriteComment(favoriteCommentInput: $favoriteCommentInput) {
    ...mutationStatus
  }
}
    ${MutationStatusFragmentDoc}`;
export type FavoriteCommentMutationFn = Apollo.MutationFunction<FavoriteCommentMutation, FavoriteCommentMutationVariables>;

/**
 * __useFavoriteCommentMutation__
 *
 * To run a mutation, you first call `useFavoriteCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useFavoriteCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [favoriteCommentMutation, { data, loading, error }] = useFavoriteCommentMutation({
 *   variables: {
 *      favoriteCommentInput: // value for 'favoriteCommentInput'
 *   },
 * });
 */
export function useFavoriteCommentMutation(baseOptions?: Apollo.MutationHookOptions<FavoriteCommentMutation, FavoriteCommentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<FavoriteCommentMutation, FavoriteCommentMutationVariables>(FavoriteCommentDocument, options);
      }
export type FavoriteCommentMutationHookResult = ReturnType<typeof useFavoriteCommentMutation>;
export type FavoriteCommentMutationResult = Apollo.MutationResult<FavoriteCommentMutation>;
export type FavoriteCommentMutationOptions = Apollo.BaseMutationOptions<FavoriteCommentMutation, FavoriteCommentMutationVariables>;
export const CreateCommentDocument = gql`
    mutation CreateComment($addCommentInput: AddCommentInput!) {
  createComment(addCommentInput: $addCommentInput) {
    ...mutationStatus
    comment {
      _id
      createdAt
    }
  }
}
    ${MutationStatusFragmentDoc}`;
export type CreateCommentMutationFn = Apollo.MutationFunction<CreateCommentMutation, CreateCommentMutationVariables>;

/**
 * __useCreateCommentMutation__
 *
 * To run a mutation, you first call `useCreateCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCommentMutation, { data, loading, error }] = useCreateCommentMutation({
 *   variables: {
 *      addCommentInput: // value for 'addCommentInput'
 *   },
 * });
 */
export function useCreateCommentMutation(baseOptions?: Apollo.MutationHookOptions<CreateCommentMutation, CreateCommentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateCommentMutation, CreateCommentMutationVariables>(CreateCommentDocument, options);
      }
export type CreateCommentMutationHookResult = ReturnType<typeof useCreateCommentMutation>;
export type CreateCommentMutationResult = Apollo.MutationResult<CreateCommentMutation>;
export type CreateCommentMutationOptions = Apollo.BaseMutationOptions<CreateCommentMutation, CreateCommentMutationVariables>;
export const RegisterDocument = gql`
    mutation Register($registerInput: RegisterInput!) {
  register(registerInput: $registerInput) {
    ...mutationStatus
    user {
      ...userInfo
    }
  }
}
    ${MutationStatusFragmentDoc}
${UserInfoFragmentDoc}`;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      registerInput: // value for 'registerInput'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, options);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const LoginDocument = gql`
    mutation Login($loginInput: LoginInput!) {
  login(loginInput: $loginInput) {
    ...mutationStatus
    user {
      ...userInfo
    }
  }
}
    ${MutationStatusFragmentDoc}
${UserInfoFragmentDoc}`;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      loginInput: // value for 'loginInput'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const LoginOAuthDocument = gql`
    mutation LoginOAuth($loginInput: OAuthLoginInput!) {
  loginWithOAuth(loginInput: $loginInput) {
    ...mutationStatus
    user {
      ...userInfo
    }
  }
}
    ${MutationStatusFragmentDoc}
${UserInfoFragmentDoc}`;
export type LoginOAuthMutationFn = Apollo.MutationFunction<LoginOAuthMutation, LoginOAuthMutationVariables>;

/**
 * __useLoginOAuthMutation__
 *
 * To run a mutation, you first call `useLoginOAuthMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginOAuthMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginOAuthMutation, { data, loading, error }] = useLoginOAuthMutation({
 *   variables: {
 *      loginInput: // value for 'loginInput'
 *   },
 * });
 */
export function useLoginOAuthMutation(baseOptions?: Apollo.MutationHookOptions<LoginOAuthMutation, LoginOAuthMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginOAuthMutation, LoginOAuthMutationVariables>(LoginOAuthDocument, options);
      }
export type LoginOAuthMutationHookResult = ReturnType<typeof useLoginOAuthMutation>;
export type LoginOAuthMutationResult = Apollo.MutationResult<LoginOAuthMutation>;
export type LoginOAuthMutationOptions = Apollo.BaseMutationOptions<LoginOAuthMutation, LoginOAuthMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, options);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const UpdateUserInfoDocument = gql`
    mutation UpdateUserInfo($updateInput: UpdateUserInfoInput!) {
  updateUserInfo(updateInput: $updateInput) {
    ...mutationStatus
  }
}
    ${MutationStatusFragmentDoc}`;
export type UpdateUserInfoMutationFn = Apollo.MutationFunction<UpdateUserInfoMutation, UpdateUserInfoMutationVariables>;

/**
 * __useUpdateUserInfoMutation__
 *
 * To run a mutation, you first call `useUpdateUserInfoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserInfoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserInfoMutation, { data, loading, error }] = useUpdateUserInfoMutation({
 *   variables: {
 *      updateInput: // value for 'updateInput'
 *   },
 * });
 */
export function useUpdateUserInfoMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserInfoMutation, UpdateUserInfoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUserInfoMutation, UpdateUserInfoMutationVariables>(UpdateUserInfoDocument, options);
      }
export type UpdateUserInfoMutationHookResult = ReturnType<typeof useUpdateUserInfoMutation>;
export type UpdateUserInfoMutationResult = Apollo.MutationResult<UpdateUserInfoMutation>;
export type UpdateUserInfoMutationOptions = Apollo.BaseMutationOptions<UpdateUserInfoMutation, UpdateUserInfoMutationVariables>;
export const CreateVoteDocument = gql`
    mutation CreateVote($newVoteInput: NewVoteInput!) {
  createVote(newVoteInput: $newVoteInput) {
    ...mutationStatus
    vote {
      _id
      slug
      isPrivate
      privateLink
    }
  }
}
    ${MutationStatusFragmentDoc}`;
export type CreateVoteMutationFn = Apollo.MutationFunction<CreateVoteMutation, CreateVoteMutationVariables>;

/**
 * __useCreateVoteMutation__
 *
 * To run a mutation, you first call `useCreateVoteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateVoteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createVoteMutation, { data, loading, error }] = useCreateVoteMutation({
 *   variables: {
 *      newVoteInput: // value for 'newVoteInput'
 *   },
 * });
 */
export function useCreateVoteMutation(baseOptions?: Apollo.MutationHookOptions<CreateVoteMutation, CreateVoteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateVoteMutation, CreateVoteMutationVariables>(CreateVoteDocument, options);
      }
export type CreateVoteMutationHookResult = ReturnType<typeof useCreateVoteMutation>;
export type CreateVoteMutationResult = Apollo.MutationResult<CreateVoteMutation>;
export type CreateVoteMutationOptions = Apollo.BaseMutationOptions<CreateVoteMutation, CreateVoteMutationVariables>;
export const VotingDocument = gql`
    mutation Voting($votingInput: VotingInput!) {
  voting(votingInput: $votingInput) {
    ...mutationStatus
    vote {
      ...voteFullInfo
    }
  }
}
    ${MutationStatusFragmentDoc}
${VoteFullInfoFragmentDoc}`;
export type VotingMutationFn = Apollo.MutationFunction<VotingMutation, VotingMutationVariables>;

/**
 * __useVotingMutation__
 *
 * To run a mutation, you first call `useVotingMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useVotingMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [votingMutation, { data, loading, error }] = useVotingMutation({
 *   variables: {
 *      votingInput: // value for 'votingInput'
 *   },
 * });
 */
export function useVotingMutation(baseOptions?: Apollo.MutationHookOptions<VotingMutation, VotingMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<VotingMutation, VotingMutationVariables>(VotingDocument, options);
      }
export type VotingMutationHookResult = ReturnType<typeof useVotingMutation>;
export type VotingMutationResult = Apollo.MutationResult<VotingMutation>;
export type VotingMutationOptions = Apollo.BaseMutationOptions<VotingMutation, VotingMutationVariables>;
export const AddAnswerOptionDocument = gql`
    mutation AddAnswerOption($addAnswerInput: AddAnswerInput!) {
  addAnswerOption(addAnswerInput: $addAnswerInput) {
    ...mutationStatus
  }
}
    ${MutationStatusFragmentDoc}`;
export type AddAnswerOptionMutationFn = Apollo.MutationFunction<AddAnswerOptionMutation, AddAnswerOptionMutationVariables>;

/**
 * __useAddAnswerOptionMutation__
 *
 * To run a mutation, you first call `useAddAnswerOptionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddAnswerOptionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addAnswerOptionMutation, { data, loading, error }] = useAddAnswerOptionMutation({
 *   variables: {
 *      addAnswerInput: // value for 'addAnswerInput'
 *   },
 * });
 */
export function useAddAnswerOptionMutation(baseOptions?: Apollo.MutationHookOptions<AddAnswerOptionMutation, AddAnswerOptionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddAnswerOptionMutation, AddAnswerOptionMutationVariables>(AddAnswerOptionDocument, options);
      }
export type AddAnswerOptionMutationHookResult = ReturnType<typeof useAddAnswerOptionMutation>;
export type AddAnswerOptionMutationResult = Apollo.MutationResult<AddAnswerOptionMutation>;
export type AddAnswerOptionMutationOptions = Apollo.BaseMutationOptions<AddAnswerOptionMutation, AddAnswerOptionMutationVariables>;
export const DeleteVoteDocument = gql`
    mutation DeleteVote($voteId: String!) {
  deleteVote(voteId: $voteId) {
    ...mutationStatus
  }
}
    ${MutationStatusFragmentDoc}`;
export type DeleteVoteMutationFn = Apollo.MutationFunction<DeleteVoteMutation, DeleteVoteMutationVariables>;

/**
 * __useDeleteVoteMutation__
 *
 * To run a mutation, you first call `useDeleteVoteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteVoteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteVoteMutation, { data, loading, error }] = useDeleteVoteMutation({
 *   variables: {
 *      voteId: // value for 'voteId'
 *   },
 * });
 */
export function useDeleteVoteMutation(baseOptions?: Apollo.MutationHookOptions<DeleteVoteMutation, DeleteVoteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteVoteMutation, DeleteVoteMutationVariables>(DeleteVoteDocument, options);
      }
export type DeleteVoteMutationHookResult = ReturnType<typeof useDeleteVoteMutation>;
export type DeleteVoteMutationResult = Apollo.MutationResult<DeleteVoteMutation>;
export type DeleteVoteMutationOptions = Apollo.BaseMutationOptions<DeleteVoteMutation, DeleteVoteMutationVariables>;
export const UpdateVoteDocument = gql`
    mutation UpdateVote($updateInput: UpdateVoteInput!) {
  updateVote(updateInput: $updateInput) {
    ...mutationStatus
  }
}
    ${MutationStatusFragmentDoc}`;
export type UpdateVoteMutationFn = Apollo.MutationFunction<UpdateVoteMutation, UpdateVoteMutationVariables>;

/**
 * __useUpdateVoteMutation__
 *
 * To run a mutation, you first call `useUpdateVoteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateVoteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateVoteMutation, { data, loading, error }] = useUpdateVoteMutation({
 *   variables: {
 *      updateInput: // value for 'updateInput'
 *   },
 * });
 */
export function useUpdateVoteMutation(baseOptions?: Apollo.MutationHookOptions<UpdateVoteMutation, UpdateVoteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateVoteMutation, UpdateVoteMutationVariables>(UpdateVoteDocument, options);
      }
export type UpdateVoteMutationHookResult = ReturnType<typeof useUpdateVoteMutation>;
export type UpdateVoteMutationResult = Apollo.MutationResult<UpdateVoteMutation>;
export type UpdateVoteMutationOptions = Apollo.BaseMutationOptions<UpdateVoteMutation, UpdateVoteMutationVariables>;
export const HomeAnalysisDocument = gql`
    query HomeAnalysis {
  count {
    ...queryStatus
    poll
    user
    tag
    comment
  }
}
    ${QueryStatusFragmentDoc}`;

/**
 * __useHomeAnalysisQuery__
 *
 * To run a query within a React component, call `useHomeAnalysisQuery` and pass it any options that fit your needs.
 * When your component renders, `useHomeAnalysisQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useHomeAnalysisQuery({
 *   variables: {
 *   },
 * });
 */
export function useHomeAnalysisQuery(baseOptions?: Apollo.QueryHookOptions<HomeAnalysisQuery, HomeAnalysisQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<HomeAnalysisQuery, HomeAnalysisQueryVariables>(HomeAnalysisDocument, options);
      }
export function useHomeAnalysisLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<HomeAnalysisQuery, HomeAnalysisQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<HomeAnalysisQuery, HomeAnalysisQueryVariables>(HomeAnalysisDocument, options);
        }
export type HomeAnalysisQueryHookResult = ReturnType<typeof useHomeAnalysisQuery>;
export type HomeAnalysisLazyQueryHookResult = ReturnType<typeof useHomeAnalysisLazyQuery>;
export type HomeAnalysisQueryResult = Apollo.QueryResult<HomeAnalysisQuery, HomeAnalysisQueryVariables>;
export const CommentsDocument = gql`
    query Comments($voteId: String!, $page: Int, $pageSize: Int) {
  comments(voteId: $voteId, page: $page, pageSize: $pageSize) {
    ...queryStatus
    page
    pageSize
    total
    docs {
      _id
      content
      createdAt
      favorites
      owner {
        avt
        name
      }
    }
  }
}
    ${QueryStatusFragmentDoc}`;

/**
 * __useCommentsQuery__
 *
 * To run a query within a React component, call `useCommentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useCommentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCommentsQuery({
 *   variables: {
 *      voteId: // value for 'voteId'
 *      page: // value for 'page'
 *      pageSize: // value for 'pageSize'
 *   },
 * });
 */
export function useCommentsQuery(baseOptions: Apollo.QueryHookOptions<CommentsQuery, CommentsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CommentsQuery, CommentsQueryVariables>(CommentsDocument, options);
      }
export function useCommentsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CommentsQuery, CommentsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CommentsQuery, CommentsQueryVariables>(CommentsDocument, options);
        }
export type CommentsQueryHookResult = ReturnType<typeof useCommentsQuery>;
export type CommentsLazyQueryHookResult = ReturnType<typeof useCommentsLazyQuery>;
export type CommentsQueryResult = Apollo.QueryResult<CommentsQuery, CommentsQueryVariables>;
export const ViTagsDocument = gql`
    query ViTags($page: Int, $pageSize: Int, $sort: String, $search: String) {
  tags(page: $page, pageSize: $pageSize, sort: $sort, search: $search) {
    ...queryStatus
    page
    pageSize
    total
    sort
    search
    docs {
      _id
      name
      slug
      totalVote
      viDesc
    }
  }
}
    ${QueryStatusFragmentDoc}`;

/**
 * __useViTagsQuery__
 *
 * To run a query within a React component, call `useViTagsQuery` and pass it any options that fit your needs.
 * When your component renders, `useViTagsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useViTagsQuery({
 *   variables: {
 *      page: // value for 'page'
 *      pageSize: // value for 'pageSize'
 *      sort: // value for 'sort'
 *      search: // value for 'search'
 *   },
 * });
 */
export function useViTagsQuery(baseOptions?: Apollo.QueryHookOptions<ViTagsQuery, ViTagsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ViTagsQuery, ViTagsQueryVariables>(ViTagsDocument, options);
      }
export function useViTagsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ViTagsQuery, ViTagsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ViTagsQuery, ViTagsQueryVariables>(ViTagsDocument, options);
        }
export type ViTagsQueryHookResult = ReturnType<typeof useViTagsQuery>;
export type ViTagsLazyQueryHookResult = ReturnType<typeof useViTagsLazyQuery>;
export type ViTagsQueryResult = Apollo.QueryResult<ViTagsQuery, ViTagsQueryVariables>;
export const EnTagsDocument = gql`
    query EnTags($page: Int, $pageSize: Int, $sort: String, $search: String) {
  tags(page: $page, pageSize: $pageSize, sort: $sort, search: $search) {
    ...queryStatus
    page
    pageSize
    total
    sort
    search
    docs {
      _id
      name
      slug
      totalVote
      enDesc
    }
  }
}
    ${QueryStatusFragmentDoc}`;

/**
 * __useEnTagsQuery__
 *
 * To run a query within a React component, call `useEnTagsQuery` and pass it any options that fit your needs.
 * When your component renders, `useEnTagsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useEnTagsQuery({
 *   variables: {
 *      page: // value for 'page'
 *      pageSize: // value for 'pageSize'
 *      sort: // value for 'sort'
 *      search: // value for 'search'
 *   },
 * });
 */
export function useEnTagsQuery(baseOptions?: Apollo.QueryHookOptions<EnTagsQuery, EnTagsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<EnTagsQuery, EnTagsQueryVariables>(EnTagsDocument, options);
      }
export function useEnTagsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<EnTagsQuery, EnTagsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<EnTagsQuery, EnTagsQueryVariables>(EnTagsDocument, options);
        }
export type EnTagsQueryHookResult = ReturnType<typeof useEnTagsQuery>;
export type EnTagsLazyQueryHookResult = ReturnType<typeof useEnTagsLazyQuery>;
export type EnTagsQueryResult = Apollo.QueryResult<EnTagsQuery, EnTagsQueryVariables>;
export const OnlyTagNameDocument = gql`
    query OnlyTagName($page: Int, $pageSize: Int, $sort: String, $search: String) {
  tags(page: $page, pageSize: $pageSize, sort: $sort, search: $search) {
    code
    docs {
      name
    }
  }
}
    `;

/**
 * __useOnlyTagNameQuery__
 *
 * To run a query within a React component, call `useOnlyTagNameQuery` and pass it any options that fit your needs.
 * When your component renders, `useOnlyTagNameQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOnlyTagNameQuery({
 *   variables: {
 *      page: // value for 'page'
 *      pageSize: // value for 'pageSize'
 *      sort: // value for 'sort'
 *      search: // value for 'search'
 *   },
 * });
 */
export function useOnlyTagNameQuery(baseOptions?: Apollo.QueryHookOptions<OnlyTagNameQuery, OnlyTagNameQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<OnlyTagNameQuery, OnlyTagNameQueryVariables>(OnlyTagNameDocument, options);
      }
export function useOnlyTagNameLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<OnlyTagNameQuery, OnlyTagNameQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<OnlyTagNameQuery, OnlyTagNameQueryVariables>(OnlyTagNameDocument, options);
        }
export type OnlyTagNameQueryHookResult = ReturnType<typeof useOnlyTagNameQuery>;
export type OnlyTagNameLazyQueryHookResult = ReturnType<typeof useOnlyTagNameLazyQuery>;
export type OnlyTagNameQueryResult = Apollo.QueryResult<OnlyTagNameQuery, OnlyTagNameQueryVariables>;
export const GetCoreUserInfoDocument = gql`
    query GetCoreUserInfo($userId: String!) {
  user(userId: $userId) {
    ...userInfo
  }
}
    ${UserInfoFragmentDoc}`;

/**
 * __useGetCoreUserInfoQuery__
 *
 * To run a query within a React component, call `useGetCoreUserInfoQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCoreUserInfoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCoreUserInfoQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useGetCoreUserInfoQuery(baseOptions: Apollo.QueryHookOptions<GetCoreUserInfoQuery, GetCoreUserInfoQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCoreUserInfoQuery, GetCoreUserInfoQueryVariables>(GetCoreUserInfoDocument, options);
      }
export function useGetCoreUserInfoLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCoreUserInfoQuery, GetCoreUserInfoQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCoreUserInfoQuery, GetCoreUserInfoQueryVariables>(GetCoreUserInfoDocument, options);
        }
export type GetCoreUserInfoQueryHookResult = ReturnType<typeof useGetCoreUserInfoQuery>;
export type GetCoreUserInfoLazyQueryHookResult = ReturnType<typeof useGetCoreUserInfoLazyQuery>;
export type GetCoreUserInfoQueryResult = Apollo.QueryResult<GetCoreUserInfoQuery, GetCoreUserInfoQueryVariables>;
export const GetMeDocument = gql`
    query GetMe {
  me {
    ...userInfo
  }
}
    ${UserInfoFragmentDoc}`;

/**
 * __useGetMeQuery__
 *
 * To run a query within a React component, call `useGetMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetMeQuery(baseOptions?: Apollo.QueryHookOptions<GetMeQuery, GetMeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMeQuery, GetMeQueryVariables>(GetMeDocument, options);
      }
export function useGetMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMeQuery, GetMeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMeQuery, GetMeQueryVariables>(GetMeDocument, options);
        }
export type GetMeQueryHookResult = ReturnType<typeof useGetMeQuery>;
export type GetMeLazyQueryHookResult = ReturnType<typeof useGetMeLazyQuery>;
export type GetMeQueryResult = Apollo.QueryResult<GetMeQuery, GetMeQueryVariables>;
export const DiscoverDocument = gql`
    query Discover($page: Int, $pageSize: Int, $sort: String, $filter: String, $search: String) {
  publicVotes(
    page: $page
    pageSize: $pageSize
    sort: $sort
    filter: $filter
    search: $search
  ) {
    ...queryStatus
    page
    pageSize
    total
    sort
    filter
    docs {
      ...voteSummaryInfo
    }
  }
}
    ${QueryStatusFragmentDoc}
${VoteSummaryInfoFragmentDoc}`;

/**
 * __useDiscoverQuery__
 *
 * To run a query within a React component, call `useDiscoverQuery` and pass it any options that fit your needs.
 * When your component renders, `useDiscoverQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDiscoverQuery({
 *   variables: {
 *      page: // value for 'page'
 *      pageSize: // value for 'pageSize'
 *      sort: // value for 'sort'
 *      filter: // value for 'filter'
 *      search: // value for 'search'
 *   },
 * });
 */
export function useDiscoverQuery(baseOptions?: Apollo.QueryHookOptions<DiscoverQuery, DiscoverQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<DiscoverQuery, DiscoverQueryVariables>(DiscoverDocument, options);
      }
export function useDiscoverLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<DiscoverQuery, DiscoverQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<DiscoverQuery, DiscoverQueryVariables>(DiscoverDocument, options);
        }
export type DiscoverQueryHookResult = ReturnType<typeof useDiscoverQuery>;
export type DiscoverLazyQueryHookResult = ReturnType<typeof useDiscoverLazyQuery>;
export type DiscoverQueryResult = Apollo.QueryResult<DiscoverQuery, DiscoverQueryVariables>;
export const GetPublicVoteByIdDocument = gql`
    query GetPublicVoteById($voteId: String!) {
  publicVote(voteId: $voteId) {
    ...queryStatus
    vote {
      ...voteFullInfo
    }
  }
}
    ${QueryStatusFragmentDoc}
${VoteFullInfoFragmentDoc}`;

/**
 * __useGetPublicVoteByIdQuery__
 *
 * To run a query within a React component, call `useGetPublicVoteByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPublicVoteByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPublicVoteByIdQuery({
 *   variables: {
 *      voteId: // value for 'voteId'
 *   },
 * });
 */
export function useGetPublicVoteByIdQuery(baseOptions: Apollo.QueryHookOptions<GetPublicVoteByIdQuery, GetPublicVoteByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPublicVoteByIdQuery, GetPublicVoteByIdQueryVariables>(GetPublicVoteByIdDocument, options);
      }
export function useGetPublicVoteByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPublicVoteByIdQuery, GetPublicVoteByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPublicVoteByIdQuery, GetPublicVoteByIdQueryVariables>(GetPublicVoteByIdDocument, options);
        }
export type GetPublicVoteByIdQueryHookResult = ReturnType<typeof useGetPublicVoteByIdQuery>;
export type GetPublicVoteByIdLazyQueryHookResult = ReturnType<typeof useGetPublicVoteByIdLazyQuery>;
export type GetPublicVoteByIdQueryResult = Apollo.QueryResult<GetPublicVoteByIdQuery, GetPublicVoteByIdQueryVariables>;
export const GetPrivateVoteByLinkDocument = gql`
    query GetPrivateVoteByLink($privateLink: String!) {
  privateVote(privateLink: $privateLink) {
    ...queryStatus
    vote {
      ...voteFullInfo
    }
  }
}
    ${QueryStatusFragmentDoc}
${VoteFullInfoFragmentDoc}`;

/**
 * __useGetPrivateVoteByLinkQuery__
 *
 * To run a query within a React component, call `useGetPrivateVoteByLinkQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPrivateVoteByLinkQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPrivateVoteByLinkQuery({
 *   variables: {
 *      privateLink: // value for 'privateLink'
 *   },
 * });
 */
export function useGetPrivateVoteByLinkQuery(baseOptions: Apollo.QueryHookOptions<GetPrivateVoteByLinkQuery, GetPrivateVoteByLinkQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPrivateVoteByLinkQuery, GetPrivateVoteByLinkQueryVariables>(GetPrivateVoteByLinkDocument, options);
      }
export function useGetPrivateVoteByLinkLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPrivateVoteByLinkQuery, GetPrivateVoteByLinkQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPrivateVoteByLinkQuery, GetPrivateVoteByLinkQueryVariables>(GetPrivateVoteByLinkDocument, options);
        }
export type GetPrivateVoteByLinkQueryHookResult = ReturnType<typeof useGetPrivateVoteByLinkQuery>;
export type GetPrivateVoteByLinkLazyQueryHookResult = ReturnType<typeof useGetPrivateVoteByLinkLazyQuery>;
export type GetPrivateVoteByLinkQueryResult = Apollo.QueryResult<GetPrivateVoteByLinkQuery, GetPrivateVoteByLinkQueryVariables>;
export const GetVoteListOfUserDocument = gql`
    query GetVoteListOfUser {
  votesOfUser {
    ...queryStatus
    votes {
      ...voteFullInfo
    }
  }
}
    ${QueryStatusFragmentDoc}
${VoteFullInfoFragmentDoc}`;

/**
 * __useGetVoteListOfUserQuery__
 *
 * To run a query within a React component, call `useGetVoteListOfUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetVoteListOfUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetVoteListOfUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetVoteListOfUserQuery(baseOptions?: Apollo.QueryHookOptions<GetVoteListOfUserQuery, GetVoteListOfUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetVoteListOfUserQuery, GetVoteListOfUserQueryVariables>(GetVoteListOfUserDocument, options);
      }
export function useGetVoteListOfUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetVoteListOfUserQuery, GetVoteListOfUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetVoteListOfUserQuery, GetVoteListOfUserQueryVariables>(GetVoteListOfUserDocument, options);
        }
export type GetVoteListOfUserQueryHookResult = ReturnType<typeof useGetVoteListOfUserQuery>;
export type GetVoteListOfUserLazyQueryHookResult = ReturnType<typeof useGetVoteListOfUserLazyQuery>;
export type GetVoteListOfUserQueryResult = Apollo.QueryResult<GetVoteListOfUserQuery, GetVoteListOfUserQueryVariables>;