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
		const { userId, photo } = req.body;
		if (!userId || !photo) {
			return res.status(400).json({ message: 'missing parameters !' });
		}
		const uploadResponse = await uploadImageToCloudinary(
			photo,
			`user-${userId}`,
			{
				use_filename: true,
				unique_filename: false,
				filename_override: 'avt.jpeg',
			},
		);
		return res.status(200).json({ photoUrl: uploadResponse?.secure_url });
	} catch (error) {
		console.error('UPLOAD API ERROR: ', error);
		return res.status(500).json({ photoUrl: null });
	}
}
