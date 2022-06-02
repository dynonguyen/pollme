import { MongoID } from './../types/common';

export default interface User {
	_id: MongoID;
	name: string;
	email: string;
	oauthId?: string;
	voted: [MongoID];
	votes: [MongoID];
	favorites: [MongoID];
}
