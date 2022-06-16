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
					className='flex-center mt-4 gap-2 text-accent dark:text-d_accent cursor-pointer hover:brightness-75 duration-200'
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
		navigator.clipboard.writeText(url);
		setIsCopied(true);
	};

	return (
		<div className='flex'>
			<div className='flex-1 border dark:border-gray-600 py-1 md:py-2 px-2 md:px-3 rounded-md rounded-r-none border-r-0 overflow-hidden whitespace-nowrap text-gray-500 dark:text-gray-400'>
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

export default function LinkShare({ url }: { url: string }) {
	const lang = useLanguage();
	const shareLang = lang.components.LinkShare;

	return (
		<div className='py-5 px-6 rounded-lg shadow-md dark:shadow-none dark:border dark:border-slate-600 max-w-xl mx-auto'>
			<div className='text-center mb-2'>
				<strong className='text-lg font-normal text-gray-700 dark:text-d_text_title'>
					{shareLang.title}
				</strong>
			</div>
			<CopyURL url={url} />
			<div className='my-6'>
				<div className='relative h-[1px] bg-gray-300 dark:bg-gray-700'>
					<span className='absolute text-gray-400 text-sm md:text-base top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-d_bg px-3'>
						{shareLang.or}
					</span>
				</div>
			</div>
			<QRCode className='w-40 h-40 max-w-full mx-auto' data={url} />
			<SocialShare shareLink={url} className='justify-center mt-5 gap-4' />
		</div>
	);
}
