import React from 'react';

export default function OAuthLogin(): JSX.Element {
	return (
		<>
			<div className='my-6'>
				<div className='relative h-[1px] bg-gray-300 dark:bg-gray-700'>
					<span className='absolute text-gray-400 text-sm md:text-base top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-d_bg px-3'>
						Or continue with
					</span>
				</div>
			</div>
			<div className='flex gap-2'>
				<button className='btn-outline btn-lg w-1/2'>Google</button>
				<button className='btn-outline btn-lg w-1/2'>Github</button>
			</div>
		</>
	);
}
