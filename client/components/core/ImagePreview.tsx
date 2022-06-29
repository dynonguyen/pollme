import { XIcon } from '@heroicons/react/outline';
import { useState } from 'react';

interface ImagePreviewProps {
	thumbnail: string;
	src: string;
	className?: string;
}

export default function ImagePreview({
	thumbnail,
	src,
	className = '',
}: ImagePreviewProps) {
	const [showPreview, setShowPreview] = useState(false);

	return (
		<>
			{showPreview && (
				<div className='bg-overlay'>
					<img
						src={src}
						className='transform-center max-h-full max-w-full'
						alt='Image'
					/>
					<XIcon
						className='absolute top-5 right-10 h-10 w-10 cursor-pointer text-white hover:opacity-75'
						onClick={() => setShowPreview(false)}
					/>
				</div>
			)}
			<img
				className={`h-8 w-8 cursor-pointer duration-300 hover:opacity-60 ${className}`}
				src={thumbnail}
				onClick={() => setShowPreview(true)}
				onError={e => e.currentTarget.remove()}
			/>
		</>
	);
}
