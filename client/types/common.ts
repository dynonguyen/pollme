import { AnswerItem, VoteOfUser } from './../graphql-client/generated/graphql';
export interface SelectOptions {
	label: string;
	value: string | number;
}

export type PhotoType = string | ArrayBuffer | null;

export type AnswerOption = AnswerItem & { voteList: VoteOfUser[] };
