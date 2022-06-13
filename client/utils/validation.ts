import { MAX } from '../constants/validation';
import { NewPollFields } from './../pages/new-poll';

export const newPollValidate = (
	formData: NewPollFields,
): { isError: boolean; field?: string } => {
	const { title, desc, tags, answers } = formData;

	if (!title || !title.trim() || title.length > MAX.VOTE_TITLE)
		return { isError: true, field: 'title' };

	if (desc.length > MAX.VOTE_DESC) return { isError: true, field: 'desc' };

	if (tags.length < 1 || tags.length > MAX.VOTE_TAG)
		return { isError: true, field: 'tags' };

	if (answers.length < 2 || answers.length > MAX.ANSWER_OPTIONS)
		return { isError: true, field: 'answers' };

	const answerLen = answers.length;
	for (let i = 0; i < answerLen; ++i) {
		if (!answers[i].label.trim() || answers[i].label.length > MAX.OPTION_LABEL)
			return { isError: true, field: 'answers' };

		for (let j = 0; j < answerLen; ++j) {
			if (
				j !== i &&
				answers[i].label.toLowerCase() === answers[j].label.toLowerCase()
			) {
				return { isError: true, field: 'answers' };
			}
		}
	}

	return { isError: false };
};
