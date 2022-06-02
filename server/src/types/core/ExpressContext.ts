import { Request, Response } from 'express';
import { Session, SessionData } from 'express-session';

export type ExpressContext = {
	req: Request & { session: Session & Partial<SessionData> };
	res: Response;
};
