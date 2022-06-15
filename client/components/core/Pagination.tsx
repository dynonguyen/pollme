import ReactPaginate, { ReactPaginateProps } from 'react-paginate';

export default function Pagination(props: ReactPaginateProps): JSX.Element {
	const { className = '', ...restProp } = props;
	return (
		<ReactPaginate
			marginPagesDisplayed={1}
			pageRangeDisplayed={3}
			previousLabel='Previous'
			nextLabel='Next'
			className={`pagination my-10 ${className}`}
			pageClassName='pagination__item'
			nextClassName='pagination__next'
			previousClassName='pagination__prev'
			breakClassName='pagination__break'
			activeClassName='pagination__active'
			{...restProp}
		/>
	);
}
