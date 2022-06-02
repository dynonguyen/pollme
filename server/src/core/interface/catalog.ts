import { MongoID } from './../types/common';

export default interface Catalog {
	_id: MongoID;
	name: string;
	voteTotal: number;
}
