import { NextApiRequest, NextApiResponse } from 'next';
import { deleteFolderFromCloudinary } from '../../lib/cloudinary';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	if (req.method !== 'POST') {
		return res.status(405).json({ message: 'Only POST requests allowed' });
	}

	try {
		const { userId, pollId } = req.body;
		if (!userId || !pollId) {
			return res.status(400).json({ message: 'Invalid params' });
		}
		await deleteFolderFromCloudinary(`user-${userId}/${pollId}`);
		return res.status(200).json({ message: 'Success' });
	} catch (error) {
		console.error('UPLOAD API ERROR: ', error);
		return res.status(500).json({ message: 'Server error' });
	}
}
