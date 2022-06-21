export default function Loading({
	className = '',
}: {
	className?: string;
}): JSX.Element {
	return (
		<div className='flex-center'>
			<img src='/images/loading.svg' className={className} />
		</div>
	);
}
