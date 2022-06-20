import { VoteFilterOptions } from './../constants/enum';

export const voteFilterToQuery = (filter: string): Object => {
	switch (filter) {
		case VoteFilterOptions.ALL:
			return {};
		case VoteFilterOptions.ACTIVE:
			return { $or: [{ endDate: null }, { endDate: { $gte: new Date() } }] };
		case VoteFilterOptions.CLOSED:
			return { endDate: { $lt: new Date() } };
		case VoteFilterOptions.UNVOTE:
			return { totalVote: 0 };
		default:
			return {};
	}
};

export const voteKeywordSearchToQuery = (keyword: string): Object => {
	if (!keyword || !keyword.trim()) return {};

	// Check search within tag
	if (/\[.+\]/.test(keyword)) {
		const tagKeyword = keyword.replace(/\[(.+)\]/, '$1');
		return { 'tags.name': { $regex: tagKeyword, $options: 'i' } };
	}

	return {
		$or: [
			{ title: { $regex: keyword, $options: 'i' } },
			{ desc: { $regex: keyword, $options: 'i' } },
		],
	};
};
