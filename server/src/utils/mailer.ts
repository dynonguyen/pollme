import nodemailer from 'nodemailer';
import { APP_NAME, MAILER } from './../constants/index';

let transporter = nodemailer.createTransport({
	host: MAILER.HOST,
	port: 587,
	secure: false, // true for 465, false for other ports
	auth: { user: MAILER.USERNAME, pass: MAILER.PASSWORD },
});

type SendMailParams = { to: string; subject: string } & (
	| { text?: string; html: string }
	| { text: string; html?: string }
);

export async function sendMail(params: SendMailParams) {
	const { to, subject, html, text } = params;

	try {
		let info = await transporter.sendMail({
			from: `"${APP_NAME}" <${MAILER.USERNAME}>`,
			to,
			subject,
			text,
			html,
		});

		return info;
	} catch (error) {
		console.error('SEND MAIL FAILED: ', error);
		throw new Error(error);
	}
}
