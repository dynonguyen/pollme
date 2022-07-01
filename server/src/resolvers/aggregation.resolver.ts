import { Query, Resolver } from 'type-graphql';
import TagModel from '../models/tag.model';
import UserModel from '../models/user.model';
import VoteModel from '../models/vote.model';
import { CountingAggregation } from '../types/response/AggregationResponse';

@Resolver()
export class AggregationResolver {
	@Query(_return => CountingAggregation)
	async count(): Promise<CountingAggregation> {
		let result: CountingAggregation = {
			code: 200,
			poll: 0,
			voted: 0,
			user: 0,
			tag: 0,
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
				VoteModel.aggregate([
					{ $project: { 'answers.voteList': 1, _id: 0 } },
					{ $addFields: { total: { $sum: { $size: '$answers.voteList' } } } },
					{ $project: { total: 1 } },
				]).then(
					data => (result.voted = data.reduce((t, _) => (t += _.total), 0)),
				),
			);
			promises.push(
				TagModel.countDocuments().then(nTag => (result.tag = nTag)),
			);

			await Promise.all(promises);
		} catch (error) {
			console.error('count - AggregationResolver Error: ', error);
		}

		return result;
	}
}
