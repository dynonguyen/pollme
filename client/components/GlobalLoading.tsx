export default function GlobalLoading(): JSX.Element {
	return (
		<div className='flex-center fixed top-0 left-0 z-[999] h-screen w-screen bg-white dark:bg-d_bg'>
			<img src='/images/loading.svg' />
		</div>
	);
}
