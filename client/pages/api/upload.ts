import fs from 'fs';
import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method !== 'POST') {
		return res.status(405).json({ message: 'Only POST requests allowed' });
	}

	try {
		const { userId, pollId, photo, optionId } = req.body;
		if (!userId || !pollId || !photo || !optionId) {
			return res.status(400).json({ message: 'missing parameters !' });
		}
		const fileType = photo.split(';')[0].split('/')[1];
		let photoFile = photo.replace(/^data:image\/\w+;base64,/, '');
		const buff = Buffer.from(photoFile, 'base64');

		const savedPath = `${process.cwd()}/public/upload/user-${userId}/${pollId}`;
		fs.mkdirSync(savedPath, { recursive: true });
		fs.writeFileSync(`${savedPath}/${optionId}.${fileType}`, buff);

		return res.status(200);
	} catch (error) {
		console.error('UPLOAD API ERROR: ', error);
		return res.status(500).json({ message: 'Server error' });
	}
}
