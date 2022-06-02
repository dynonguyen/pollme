import { MongoID } from './../types/common';

export interface VoteItem {
	id: number;
	label: string;
	desc: string;
	voteList: [
		{
			userId: string;
			score?: number;
		},
	];
}

export default interface Vote {
	_id: MongoID;
	title: string;
	type: number;
	desc: string;
	isPrivate: boolean;
	hashtag: [string];
	catalogId: string;
	items: [VoteItem];
	createdAt: Date;
	updatedAt?: Date;
	endDate?: Date;
	isLoginRequired: boolean;
	allowAddItem: boolean;
	allowChooseMultiple: boolean;
	allowMark: boolean;
	maxVote: number;
	maxScore?: boolean;
}
