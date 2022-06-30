import React from 'react';

interface Props {
	children: JSX.Element | React.ReactNode;
}

interface State {
	hasError: boolean;
}

class ErrorBoundary extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = { hasError: false };
	}

	static getDerivedStateFromError(_error: any) {
		return { hasError: true };
	}

	componentDidCatch(error: any, errorInfo: any) {
		window.scrollTo(0, 0);
		console.error('ERROR: ', error);
		console.error('ERROR INFO: ', errorInfo);
	}

	render() {
		if (this.state.hasError) {
			return (
				<div className='mx-auto my-8 max-w-2xl px-5'>
					<div className='grid grid-cols-1 gap-5 text-center'>
						<h1 className='error-text text-6xl font-bold md:text-8xl'>
							Oops !
						</h1>
						<div className='text-xl md:text-2xl'>There is an error !</div>
						<p className='text-xl text-gray-500 dark:text-gray-400'>
							Something went wrong, maybe your network connection or browser
							doesn't support this feature
						</p>
						<div className='grid w-full grid-cols-2 gap-2'>
							<a
								href='/'
								className='btn-outline md:btn-lg rounded-full text-base font-medium uppercase'
							>
								Go home
							</a>
							<button
								className='btn-primary md:btn-lg rounded-full px-4 text-base font-medium uppercase'
								onClick={() => this.setState({ hasError: false })}
							>
								Try again !
							</button>
						</div>
					</div>
				</div>
			);
		}

		return this.props.children;
	}
}

export default ErrorBoundary;
