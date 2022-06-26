import { DownloadIcon, DuplicateIcon } from '@heroicons/react/outline';
import { CheckCircleIcon } from '@heroicons/react/solid';
import qrcode from 'qrcode';
import { useEffect, useState } from 'react';
import { APP_NAME } from '../constants';
import useLanguage from '../hooks/useLanguage';
import SocialShare from './SocialShare';

interface QRCodeProps {
	data: string;
	className?: string;
	allowDownload?: boolean;
}

function QRCode({
	data = '',
	className = '',
	allowDownload = true,
}: QRCodeProps): JSX.Element {
	const lang = useLanguage();
	const [src, setSrc] = useState('');

	useEffect(() => {
		qrcode.toDataURL(
			data,
			{ color: { dark: '#0f172a' } },
			function (_err, url) {
				setSrc(url);
			},
		);
	}, []);

	const handleDownload = () => {
		const link = document.createElement('a');
		link.href = src;
		link.download = `${APP_NAME}_QRCode.jpeg`;
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	};

	return (
		<>
			<img className={className} src={src} alt='QR Code' />{' '}
			{allowDownload && (
				<div
					className='flex-center mt-4 cursor-pointer gap-2 text-accent duration-200 hover:brightness-75 dark:text-d_accent'
					onClick={handleDownload}
				>
					<DownloadIcon className='w-5' />
					<span>{lang.components.LinkShare.downloadQRCode}</span>
				</div>
			)}
		</>
	);
}

function CopyURL({ url }: { url: string }): JSX.Element {
	const lang = useLanguage();
	const shareLang = lang.components.LinkShare;
	const [isCopied, setIsCopied] = useState(false);
	const copiedClass = `btn-primary flex items-center gap-1 py-1 md:py-2 px-2 md:px-3 rounded-md rounded-l-none w-max flex-shrink-0 ${
		isCopied ? '!bg-green-700 dark:!bg-green-600' : ''
	}`;

	const handleCopyUrl = () => {
		if (navigator.clipboard?.writeText) {
			navigator.clipboard.writeText(url);
			setIsCopied(true);
		}
	};

	return (
		<div className='flex'>
			<div className='flex-1 overflow-hidden whitespace-nowrap rounded-md rounded-r-none border border-r-0 py-1 px-2 text-gray-500 dark:border-gray-600 dark:text-gray-400 md:py-2 md:px-3'>
				{url}
			</div>
			<button className={copiedClass} onClick={handleCopyUrl}>
				<b>{isCopied ? shareLang.copied : shareLang.copy}</b>
				{isCopied ? (
					<CheckCircleIcon className='w-6' />
				) : (
					<DuplicateIcon className='w-6' />
				)}
			</button>
		</div>
	);
}

export default function LinkShare({
	url,
	className = '',
}: {
	url: string;
	className?: string;
}) {
	const lang = useLanguage();
	const shareLang = lang.components.LinkShare;

	return (
		<div
			className={`mx-auto max-w-xl rounded-lg py-5 px-6 shadow-md dark:border dark:border-slate-600 dark:shadow-none ${className}`}
		>
			<div className='mb-2 text-center'>
				<strong className='text-lg font-normal text-gray-700 dark:text-d_text_title'>
					{shareLang.title}
				</strong>
			</div>
			<CopyURL url={url} />
			<div className='my-6'>
				<div className='relative h-[1px] bg-gray-300 dark:bg-gray-700'>
					<span className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-3 text-sm text-gray-400 dark:bg-d_bg md:text-base'>
						{shareLang.or}
					</span>
				</div>
			</div>
			<QRCode className='mx-auto h-40 w-40 max-w-full' data={url} />
			<SocialShare shareLink={url} className='mt-5 justify-center gap-4' />
		</div>
	);
}
