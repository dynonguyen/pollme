import {
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
import {
	DiscoverDocument,
	DiscoverQuery,
} from '../graphql-client/generated/graphql';
import useLanguage from '../hooks/useLanguage';
import { initializeApollo } from '../lib/apolloClient';
import { getPageQuery } from '../utils/helper';

const filterOptions: string[] = ['All', 'Newest', 'Unpolled', 'Most frequent'];
const sortOptions: string[] = [
	'Title (A-Z)',
	'Title (Z-A)',
	'Polls Ascending',
	'Polls Descending',
	'Newest',
	'Oldest',
];

function FilterButton(): JSX.Element {
	return (
		<div className='flex-grow group relative'>
			<button className='md:hidden w-full btn-outline flex items-center justify-center gap-2'>
				<span>Filter</span>
				<FilterIcon className='w-5' />
			</button>

			{/* desktop menu */}
			<ul className='hidden md:flex justify-end'>
				{filterOptions.map((option, index) => (
					<li key={index} className='filter-item'>
						{option}
					</li>
				))}
			</ul>

			{/* mobile menu */}
			<div className='md:hidden'>
				<div className='menu w-full'>
					<ul>
						{filterOptions.map((option, index) => (
							<li key={index} className='menu-item'>
								{option}
							</li>
						))}
					</ul>
				</div>
			</div>
		</div>
	);
}

function SortButton(): JSX.Element {
	return (
		<div className='relative group w-1/2 md:w-[120px]'>
			<button className='btn-outline w-full flex-center gap-2'>
				<span>Sort</span>
				<SortIcon className='w-5' />
			</button>
			<div className='menu z-50 w-56 right-0'>
				<ul>
					{sortOptions.map((option, index) => (
						<li key={index} className='menu-item'>
							{option}
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

	const handlePageChange = ({ selected }: { selected: number }) => {
		const pageSelected = selected + 1;
		if (pageSelected !== page) {
			router.push({
				pathname: lang.pages.discover.link,
				query: {
					page: pageSelected,
					pageSize,
				},
			});
		}
	};

	return (
		<div className='container'>
			{/* introduction */}
			<div className='grid grid-cols-1 gap-3 md:grid-cols-4 flex-wrap mt-6 pb-3 border-b border-gray-300 dark:border-gray-600'>
				<h1 className='font-normal md:col-span-4'>Pollme Discover</h1>
				<div className='flex flex-grow gap-2 items-center md:col-span-3 md:col-start-2'>
					<FilterButton />
					<SortButton />
				</div>
				<h3 className='text-xl md:row-start-2 md:self-center'>
					<strong className='text-accent dark:text-d_accent'>22,667,678</strong>
					&nbsp;
					<span className='font-normal text-text_primary dark:text-d_text_primary'>
						Polls
					</span>
				</h3>
			</div>

			{/* poll list */}
			<div className='grid grid-cols-1 lg:grid-cols-2 mt-6 gap-8'>
				{voteDocs.map(vote => (
					<PollSummary
						key={vote._id}
						title={vote.title}
						content={vote.desc}
						createdAt={vote.createdAt}
						pollId={vote._id}
						pollSlug={vote.slug}
						totalVote={vote.totalVote}
						totalComment={vote.totalComment}
						user={{ name: vote.owner?.name || '', avt: vote.owner?.avt || '' }}
						tags={vote.tags}
					/>
				))}
			</div>

			<Pagination
				pageCount={totalPage}
				initialPage={page - 1}
				onPageChange={handlePageChange}
			/>
		</div>
	);
};

export const getServerSideProps: GetServerSideProps<{
	votes: DiscoverQuery;
}> = async ({ query }) => {
	const page = getPageQuery(query, 'page');
	const pageSize = getPageQuery(query, 'pageSize');

	const apolloClient = initializeApollo();

	const response = await apolloClient.query({
		query: DiscoverDocument,
		variables: {
			page,
			pageSize,
		},
	});
	const votes: DiscoverQuery = response.data;

	return {
		props: {
			votes,
		},
	};
};

export default Discover;
