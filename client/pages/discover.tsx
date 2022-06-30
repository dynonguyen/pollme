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
import { QUERY_KEY, REDIS_KEY, REDIS_KEY_TTL } from '../constants/key';
import {
	DiscoverDocument,
	DiscoverQuery,
	DiscoverQueryVariables,
} from '../graphql-client/generated/graphql';
import useLanguage from '../hooks/useLanguage';
import { addApolloState, initializeApollo } from '../lib/apolloClient';
import Redis from '../lib/redis';
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
		<div className='group relative flex-grow'>
			<button className='btn-outline flex w-full items-center justify-center space-x-2 md:hidden'>
				<span>Filter</span>
				<FilterIcon className='w-5' />
			</button>

			{/* desktop menu */}
			<ul className='hidden justify-end space-x-2 md:flex'>
				{filterOptions.map((option, index) => (
					<li
						key={index}
						className={`filter-item ${
							option.key === currentFilter
								? 'bg-gray-100 text-gray-800 dark:bg-d_bg_hover dark:text-d_text_title'
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
				<div className='menu z-50 w-full'>
					<ul>
						{filterOptions.map((option, index) => (
							<li
								key={index}
								className='menu-item flex items-center'
								onClick={() => handleFilterOptionChange(option.key)}
							>
								<span>{option.title}</span>
								{option.key === currentFilter && (
									<CheckIcon className='success-text ml-1 w-5' />
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
		<div className='group relative w-1/2 md:w-[120px]'>
			<button className='btn-outline flex-center w-full space-x-2'>
				<span>{lang.others.sort}</span>
				<SortIcon className='w-5' />
			</button>
			<div className='menu right-0 z-50 w-56'>
				<ul>
					{sortOptions.map((option, index) => (
						<li
							key={index}
							className='menu-item flex items-center'
							onClick={() => handleSortOptionChange(option.key)}
						>
							<span>{option.title}</span>
							{option.key === currentSort && (
								<CheckIcon className='success-text ml-1 w-5' />
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
			<div className='border-color mt-6 grid grid-cols-1 gap-3 border-b pb-3 md:grid-cols-4'>
				<h1 className='font-normal md:col-span-4'>{discoverLang.title}</h1>
				<div className='flex flex-grow items-center space-x-2 md:col-span-3 md:col-start-2'>
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
					<div className='mt-6 grid grid-cols-1 gap-8 lg:grid-cols-2'>
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

	const cachedKey = Redis.createPaginatedKey({
		key: REDIS_KEY.DISCOVER,
		page,
		pageSize,
		sort,
		filter,
		search,
	});

	let votes: DiscoverQuery;
	const cachedData: DiscoverQuery | null = await Redis.get(cachedKey);

	if (cachedData) {
		votes = cachedData;
	} else {
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

		votes = response.data;
		await Redis.set(cachedKey, votes, { EX: REDIS_KEY_TTL.DISCOVER });
		addApolloState(apolloClient, { props: {} });
	}

	return { props: { votes } };
};

export default Discover;
