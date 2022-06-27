import { NextApiRequest, NextApiResponse } from 'next';
import { uploadImageToCloudinary } from '../../lib/cloudinary';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	if (req.method !== 'POST') {
		return res.status(405).json({ message: 'Only POST requests allowed' });
	}

	try {
		const { userId, pollId, photo } = req.body;
		const uploadResponse = await uploadImageToCloudinary(
			photo,
			`user-${userId}/${pollId}`,
		);

		return res.status(200).json({ photoUrl: uploadResponse?.secure_url });
	} catch (error) {
		console.error('UPLOAD API ERROR: ', error);
		return res.status(500).json({ photoUrl: null });
	}
}
