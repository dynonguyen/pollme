import { MongoID } from './../types/common';

export default interface HashTag {
	_id: MongoID;
	name: string;
	catalogId?: MongoID;
}
