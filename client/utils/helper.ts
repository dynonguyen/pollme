import { VOTE_TYPE } from '../constants';
import { PRIVATE_POLL_PARAM, QUERY_KEY } from './../constants/key';
import { AnswerOption } from './../types/common';

export const getPageQuery = (
	query: any,
	key: string = QUERY_KEY.PAGE,
	defaultValue: number = 1,
): number => {
	const pageOrPageSize = Number(query[key]);
	if (!pageOrPageSize || isNaN(pageOrPageSize) || pageOrPageSize < 1) {
		return defaultValue;
	}
	return pageOrPageSize;
};

export const isPollClosed = (
	endDate?: string | Date,
	maxVote?: number,
	totalVote?: number,
) => {
	if (maxVote && totalVote && totalVote >= maxVote) return true;
	if (!endDate) return false;
	const date = new Date(endDate);
	if (isNaN(date.getTime())) return false;
	if (date.getTime() > Date.now()) return false;
	return true;
};

export const debounce = (
	timer: any,
	delay: number = 250,
	callbackFn: Function,
): number => {
	if (timer) clearTimeout(timer);

	timer = setTimeout(() => {
		callbackFn();
	}, delay);

	return timer;
};

export const createShareUrl = (
	isPrivate: boolean = true,
	privateSlug: string = '',
	publicSlug: string = '',
): string => {
	const origin = process.env.NEXT_PUBLIC_HOST_URI || location.origin;
	if (isPrivate) return `${origin}/poll/${PRIVATE_POLL_PARAM}/${privateSlug}`;

	return `${origin}/poll/${publicSlug}`;
};

export const pollTypeToString = (
	type: number = VOTE_TYPE.SINGLE_CHOICE,
): string => {
	type T = keyof typeof VOTE_TYPE;

	for (let key in VOTE_TYPE) {
		if (VOTE_TYPE[key as T] === type) {
			return key.replaceAll('_', ' ').toLowerCase();
		}
	}

	return '';
};

export const pollRanking = (
	options: AnswerOption[] = [],
	isScore: boolean = false,
) => {
	let result: Array<{
		id: string;
		score: number;
		rank: number;
		percent: number;
	}> = [];

	options.forEach(option => {
		const { id, voteList = [] } = option;
		if (isScore) {
			result.push({
				id,
				score: voteList.reduce((sum, vote) => sum + (vote?.score || 0), 0),
				rank: 0,
				percent: 0,
			});
		} else {
			result.push({ id, score: voteList.length, rank: 0, percent: 0 });
		}
	});

	const totalScore = result.reduce((sum, r) => sum + r.score, 0);
	result = result
		.sort((a, b) => b.score - a.score)
		.map((r, index) => ({
			...r,
			percent: totalScore ? Math.round((r.score * 100) / totalScore) : 0,
			rank: index + 1,
		}));

	return result;
};

export const toThumbnailSrc = (photoSrc: string): string => {
	if (photoSrc) {
		const dotIndex = photoSrc.lastIndexOf('.');
		if (dotIndex !== -1) {
			return photoSrc.slice(0, dotIndex) + '_thumb' + photoSrc.slice(dotIndex);
		}
	}
	return photoSrc;
};
