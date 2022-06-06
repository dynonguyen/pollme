import { Query, Resolver } from 'type-graphql';
import CommentModel from '../models/comment.model';
import HashTagModel from '../models/hashtag.model';
import UserModel from '../models/user.mode';
import VoteModel from '../models/vote.model';
import { CountingAggregationResponse } from '../types/entities/AggregationResponse';

@Resolver()
export class AggregationResolver {
	@Query(_return => CountingAggregationResponse)
	async count(): Promise<CountingAggregationResponse> {
		let result: CountingAggregationResponse = {
			poll: 0,
			comment: 0,
			user: 0,
			hashtag: 0,
		};

		try {
			const promises = [];

			promises.push(
				VoteModel.countDocuments().then(nPoll => (result.poll = nPoll)),
			);
			promises.push(
				UserModel.countDocuments().then(nUser => (result.user = nUser)),
			);
			promises.push(
				CommentModel.countDocuments().then(
					nComment => (result.comment = nComment),
				),
			);
			promises.push(
				HashTagModel.countDocuments().then(
					nHashtag => (result.hashtag = nHashtag),
				),
			);

			await Promise.all(promises);
		} catch (error) {
			console.error('count - AggregationResolver Error: ', error);
		}

		return result;
	}
}
