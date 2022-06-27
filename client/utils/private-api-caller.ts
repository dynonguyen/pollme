import {
	USER_AVT_HEIGHT,
	USER_AVT_THUMBNAIL_HEIGHT,
	USER_AVT_THUMBNAIL_WIDTH,
	USER_AVT_WIDTH,
} from '../constants';
import { resizeImage } from './helper';

export const uploadOptionPhoto = async (
	photo: string,
	userId: string,
	pollId: string,
) => {
	const response = await fetch('/api/upload-poll-photo', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ photo, userId, pollId }),
	});
	if (response.status === 200) return await response.json();
	return null;
};

export const deletePhotoFolder = async (pollId: string, userId: string) => {
	return await fetch('/api/delete-photo', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ pollId, userId }),
	});
};

export const uploadUserAvt = async (userId: string, photo: string) => {
	const resizedPhoto = await resizeImage(
		photo,
		USER_AVT_WIDTH,
		USER_AVT_HEIGHT,
	);
	const thumbnail = await resizeImage(
		photo,
		USER_AVT_THUMBNAIL_WIDTH,
		USER_AVT_THUMBNAIL_HEIGHT,
	);

	return await fetch('/api/upload-avt', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			photo: resizedPhoto,
			thumbnail,
			userId,
		}),
	});
};
