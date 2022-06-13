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

	for (let answer of answers) {
		if (!answer.label.trim() || answer.label.length > MAX.OPTION_LABEL)
			return { isError: true, field: 'answers' };
	}

	return { isError: false };
};
