import {
	CheckIcon,
	FilterIcon,
	SortAscendingIcon as SortIcon,
} from '@heroicons/react/outline';
import {
	GetServerSideProps,
	InferGetServerSidePropsType,
	NextPage,
} from 'next';
import { useRouter } from 'next/router';
import Pagination from '../components/core/Pagination';
import PollSummary from '../components/PollSummary';
import { DEFAULT } from '../constants/default';
import { VoteFilterOptions } from '../constants/enum';
import { QUERY_KEY } from '../constants/key';
import {
	DiscoverDocument,
	DiscoverQuery,
	DiscoverQueryVariables,
} from '../graphql-client/generated/graphql';
import useLanguage from '../hooks/useLanguage';
import { addApolloState, initializeApollo } from '../lib/apolloClient';
import { numberFormat } from '../utils/format';
import { getPageQuery } from '../utils/helper';

function FilterButton(): JSX.Element {
	const lang = useLanguage();
	const discoverLang = lang.pages.discover;
	const { filterOptions } = discoverLang;
	const router = useRouter();
	const currentFilter = router.query[QUERY_KEY.FILTER] || '';

	const handleFilterOptionChange = (key: string) => {
		if (key !== currentFilter) {
			if (key === VoteFilterOptions.ALL) delete router.query[QUERY_KEY.FILTER];
			else router.query[QUERY_KEY.FILTER] = key;
			router.query[QUERY_KEY.PAGE] = '1';
			router.pathname = discoverLang.link;
			router.push(router);
		}
	};

	return (
		<div className='flex-grow group relative'>
			<button className='md:hidden w-full btn-outline flex items-center justify-center gap-2'>
				<span>Filter</span>
				<FilterIcon className='w-5' />
			</button>

			{/* desktop menu */}
			<ul className='hidden md:flex justify-end gap-2'>
				{filterOptions.map((option, index) => (
					<li
						key={index}
						className={`filter-item ${
							option.key === currentFilter
								? 'text-gray-800 dark:text-d_text_title bg-gray-100 dark:bg-d_bg_hover'
								: ''
						}`}
						onClick={() => handleFilterOptionChange(option.key)}
					>
						{option.title}
					</li>
				))}
			</ul>

			{/* mobile menu */}
			<div className='md:hidden'>
				<div className='menu w-full z-50'>
					<ul>
						{filterOptions.map((option, index) => (
							<li
								key={index}
								className='menu-item flex justify-between'
								onClick={() => handleFilterOptionChange(option.key)}
							>
								{option.title}
								{option.key === currentFilter && (
									<CheckIcon className='w-5 success-text' />
								)}
							</li>
						))}
					</ul>
				</div>
			</div>
		</div>
	);
}

function SortButton(): JSX.Element {
	const lang = useLanguage();
	const discoverLang = lang.pages.discover;
	const { sortOptions } = discoverLang;
	const router = useRouter();
	const currentSort = router.query[QUERY_KEY.SORT] || '';

	const handleSortOptionChange = (key: string = '') => {
		if (key !== currentSort) {
			if (key === '') delete router.query[QUERY_KEY.SORT];
			else router.query[QUERY_KEY.SORT] = key;
			router.pathname = discoverLang.link;
			router.push(router);
		}
	};

	return (
		<div className='relative group w-1/2 md:w-[120px]'>
			<button className='btn-outline w-full flex-center gap-2'>
				<span>Sort</span>
				<SortIcon className='w-5' />
			</button>
			<div className='menu z-50 w-56 right-0'>
				<ul>
					{sortOptions.map((option, index) => (
						<li
							key={index}
							className='menu-item flex justify-between'
							onClick={() => handleSortOptionChange(option.key)}
						>
							{option.title}
							{option.key === currentSort && (
								<CheckIcon className='w-5 success-text' />
							)}
						</li>
					))}
				</ul>
			</div>
		</div>
	);
}

const Discover: NextPage<
	InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ votes }) => {
	const { publicVotes } = votes;
	const voteDocs = publicVotes?.docs || [];
	const page = publicVotes?.page || 1;
	const pageSize = publicVotes?.pageSize || DEFAULT.PAGE_SIZE;
	const total = publicVotes?.total || 0;
	const totalPage = Math.ceil(total / pageSize);
	const router = useRouter();
	const lang = useLanguage();
	const discoverLang = lang.pages.discover;

	const handlePageChange = ({ selected }: { selected: number }) => {
		const pageSelected = selected + 1;
		if (pageSelected !== page) {
			router.query[QUERY_KEY.PAGE] = pageSelected.toString();
			router.query[QUERY_KEY.PAGE_SIZE] = pageSize.toString();
			router.pathname = discoverLang.link;
			router.push(router);
		}
	};

	return (
		<div className='container'>
			{/* introduction */}
			<div className='grid grid-cols-1 gap-3 md:grid-cols-4 flex-wrap mt-6 pb-3 border-b border-color'>
				<h1 className='font-normal md:col-span-4'>{discoverLang.title}</h1>
				<div className='flex flex-grow gap-2 items-center md:col-span-3 md:col-start-2'>
					<FilterButton />
					<SortButton />
				</div>
				<h3 className='text-xl md:row-start-2 md:self-center'>
					<strong className='text-accent dark:text-d_accent'>
						{numberFormat(total)}
					</strong>
					&nbsp;
					<span className='font-normal text-text_primary dark:text-d_text_primary'>
						{lang.others.poll}
					</span>
				</h3>
			</div>

			{/* poll list */}
			{voteDocs.length > 0 ? (
				<>
					<div className='grid grid-cols-1 lg:grid-cols-2 mt-6 gap-8'>
						{voteDocs.map(vote => (
							<PollSummary
								key={vote._id}
								title={vote.title}
								content={vote.shortDesc || ''}
								createdAt={vote.createdAt}
								endDate={vote.endDate}
								pollId={vote._id}
								pollSlug={vote.slug}
								totalVote={vote.totalVote}
								totalComment={vote.totalComment}
								maxVote={vote.maxVote as number}
								user={{
									name: vote.owner?.name || '',
									avt: vote.owner?.avt || '',
								}}
								tags={vote.tags}
							/>
						))}
					</div>
					<Pagination
						pageCount={totalPage}
						initialPage={page - 1}
						onPageChange={handlePageChange}
					/>
				</>
			) : (
				<p className='mt-5 text-center text-lg md:text-xl'>
					{discoverLang.pollNotfound}
				</p>
			)}
		</div>
	);
};

export const getServerSideProps: GetServerSideProps<{
	votes: DiscoverQuery;
}> = async ({ query }) => {
	const page = getPageQuery(query, QUERY_KEY.PAGE, 1);
	const pageSize = getPageQuery(query, QUERY_KEY.PAGE_SIZE, 10);
	const sort = (query[QUERY_KEY.SORT] as string) || '';
	const search = (query[QUERY_KEY.SEARCH] as string) || '';
	const filter = (query[QUERY_KEY.FILTER] as string) || VoteFilterOptions.ALL;

	const apolloClient = initializeApollo();

	const response = await apolloClient.query<
		DiscoverQuery,
		DiscoverQueryVariables
	>({
		query: DiscoverDocument,
		variables: {
			page,
			pageSize,
			sort,
			filter,
			search,
		},
	});
	const votes: DiscoverQuery = response.data;
	addApolloState(apolloClient, { props: {} });

	return {
		props: {
			votes,
		},
	};
};

export default Discover;
