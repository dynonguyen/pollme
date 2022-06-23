import fs from 'fs';
import { NextApiRequest, NextApiResponse } from 'next';

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
		let photoFile = photo.replace(/^data:image\/\w+;base64,/, '');
		const buff = Buffer.from(photoFile, 'base64');

		const savedPath = `${process.cwd()}/public/upload/user-${userId}`;
		fs.mkdirSync(savedPath, { recursive: true });

		const avtPath = `${savedPath}/avt.jpeg`;
		if (fs.existsSync(avtPath)) {
			fs.rmSync(avtPath);
		}
		fs.writeFileSync(avtPath, buff);

		return res.status(200).json({ message: 'Success' });
	} catch (error) {
		console.error('UPLOAD API ERROR: ', error);
		return res.status(500).json({ message: 'Server error' });
	}
}
