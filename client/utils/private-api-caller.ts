export const uploadOptionPhoto = (
	photo: string,
	userId: string,
	pollId: string,
	optionId: string,
) => {
	fetch('/api/upload', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ photo, userId, pollId, optionId }),
	});
};
