export const uploadOptionPhoto = async (
	photo: string,
	userId: string,
	pollId: string,
) => {
	const response = await fetch('/api/upload-poll-photo', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ photo, userId, pollId }),
	});
	if (response.status === 200) return await response.json();
	return null;
};

export const deletePhotoFolder = async (pollId: string, userId: string) => {
	return await fetch('/api/delete-poll-photo', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ pollId, userId }),
	});
};

export const uploadUserAvt = async (userId: string, photo: string) => {
	const uploadResponse = await fetch('/api/upload-avt', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ photo, userId }),
	});
	if (uploadResponse.status === 200) return await uploadResponse.json();
	return null;
};

export const redisDelete = async (key: string, isPattern: boolean = false) => {
	await fetch('/api/redis-clean', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ key, isPattern }),
	});
};
