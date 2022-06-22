import { POLL_PHOTO_HEIGHT, POLL_PHOTO_WIDTH } from '../constants';
import {
	POLL_PHOTO_THUMBNAIL_HEIGHT,
	POLL_PHOTO_THUMBNAIL_WIDTH,
} from './../constants/index';
import { resizeImage } from './helper';

export const uploadOptionPhoto = async (
	photo: string,
	userId: string,
	pollId: string,
	optionId: string,
) => {
	const resizedPhoto = await resizeImage(
		photo,
		POLL_PHOTO_WIDTH,
		POLL_PHOTO_HEIGHT,
	);
	const thumbnail = await resizeImage(
		photo,
		POLL_PHOTO_THUMBNAIL_WIDTH,
		POLL_PHOTO_THUMBNAIL_HEIGHT,
	);

	return await fetch('/api/upload', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			photo: resizedPhoto,
			thumbnail,
			userId,
			pollId,
			optionId,
		}),
	});
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
