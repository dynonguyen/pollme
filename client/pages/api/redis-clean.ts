import { NextApiRequest, NextApiResponse } from 'next';
import Redis from '../../lib/redis';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	if (req.method !== 'POST') {
		return res.status(405).json({ message: 'Only POST requests allowed' });
	}

	try {
		const { key, isPattern = false } = req.body;

		if (!key) {
			return res.status(400).json({ message: 'missing parameters !' });
		}

		await Redis.delete(key, isPattern);
		return res.status(200).json({});
	} catch (error) {
		console.error('REDIS DELETE API ERROR: ', error);
		return res.status(500).json({ photoUrl: null });
	}
}
