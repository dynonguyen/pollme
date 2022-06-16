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
					<img src={src} className='transform-center' alt='Image' />
					<XIcon
						className='w-10 h-10 top-5 right-10 absolute text-white cursor-pointer hover:opacity-75'
						onClick={() => setShowPreview(false)}
					/>
				</div>
			)}
			<img
				className={`w-8 h-8 cursor-pointer duration-300 hover:opacity-60 ${className}`}
				src={thumbnail}
				onClick={() => setShowPreview(true)}
				onError={e => e.currentTarget.remove()}
			/>
		</>
	);
}
