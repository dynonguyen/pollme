import { MongoID } from './../types/common';

export default interface Comment {
	_id: MongoID;
	content: string;
	createdAt: Date;
	replies: [
		{
			username: string;
			content: string;
			createdAt: Date;
		},
	];
}
