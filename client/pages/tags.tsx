import { CheckIcon, SearchIcon } from '@heroicons/react/outline';
import {
	GetServerSideProps,
	InferGetServerSidePropsType,
	NextPage,
} from 'next';
import { useRouter } from 'next/router';
import { useRef } from 'react';
import Pagination from '../components/core/Pagination';
import TagCard from '../components/TagCard';
import { DEFAULT } from '../constants/default';
import { QUERY_KEY } from '../constants/key';
import {
	EnTagsDocument,
	EnTagsQuery,
	QueryTagsArgs,
	ViTagsDocument,
	ViTagsQuery,
} from '../graphql-client/generated/graphql';
import useLanguage from '../hooks/useLanguage';
import { addApolloState, initializeApollo } from '../lib/apolloClient';
import { debounce, getPageQuery } from '../utils/helper';

function TagSearch(): JSX.Element {
	const searchInput = useRef('');
	const router = useRouter();
	const currentSearch = router.query[QUERY_KEY.SEARCH] || '';
	const lang = useLanguage();
	const tagsLang = lang.pages.tags;
	const timer = useRef(0);

	const handleSearch = (keyword: string) => {
		if (keyword !== currentSearch) {
			if (keyword === '') delete router.query[QUERY_KEY.SEARCH];
			else router.query[QUERY_KEY.SEARCH] = keyword;
			router.query[QUERY_KEY.PAGE] = '1';
			router.pathname = tagsLang.link;
			router.push(router);
		}
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value.trim();
		searchInput.current = value;
		timer.current = debounce(timer.current, 500, () => {
			handleSearch(searchInput.current);
		});
	};

	const handlePressEnter = (e: React.KeyboardEvent) => {
		if (e.key === 'Enter') {
			handleSearch(searchInput.current);
		}
	};

	return (
		<div className='max-w-xs relative'>
			<SearchIcon className='w-5 h-5 absolute top-1/2 left-3 text-gray-400 dark:text-gray-500 font-normal -translate-y-1/2' />
			<input
				type='text'
				className='field pl-9'
				placeholder='Filter by tag name'
				onChange={handleInputChange}
				onKeyDown={handlePressEnter}
			/>
		</div>
	);
}

function SortButtonGroup(): JSX.Element {
	const lang = useLanguage();
	const router = useRouter();
	const currentSort = router.query[QUERY_KEY.SORT] || '';
	const tagsLang = lang.pages.tags;
	const { sortOptions } = tagsLang;

	const handleSortOptionChange = (key: string = '') => {
		if (key !== currentSort) {
			if (key === '') delete router.query[QUERY_KEY.SORT];
			else router.query[QUERY_KEY.SORT] = key;
			router.pathname = tagsLang.link;
			router.push(router);
		}
	};
	return (
		<div className='flex gap-1 md:gap-3 flex-wrap'>
			{sortOptions.map((option, index) => (
				<div
					key={index}
					className='filter-item border py-1 border-color flex'
					onClick={() => handleSortOptionChange(option.key)}
				>
					{option.title}
					{currentSort === option.key && (
						<CheckIcon className='w-4 ml-2 success-text' />
					)}
				</div>
			))}
		</div>
	);
}

const Tags: NextPage<
	InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ tags }) => {
	const lang = useLanguage();
	const tagsLang = lang.pages.tags;
	const router = useRouter();
	const { locale } = router;
	const page = tags?.page || 1;
	const pageSize = tags?.pageSize || DEFAULT.TAG_PAGE_SIZE;
	const total = tags?.total || 0;
	const totalPage = Math.ceil(total / pageSize);
	const linkOfTag = `${lang.pages.discover.link}?${QUERY_KEY.SEARCH}=`;

	const handlePageChange = ({ selected }: { selected: number }) => {
		const pageSelected = selected + 1;
		if (pageSelected !== page) {
			router.query[QUERY_KEY.PAGE] = pageSelected.toString();
			router.query[QUERY_KEY.PAGE_SIZE] = pageSize.toString();
			router.pathname = lang.pages.tags.link;
			router.push(router);
		}
	};

	return (
		<div className='container mt-6'>
			<h1 className='font-normal md:col-span-4'>Tags</h1>
			<p className='max-w-2xl mt-3'>{lang.pageSEO.tags.desc}</p>

			<div className='flex justify-start md:justify-between items-center flex-wrap gap-3 mt-6 mb-5'>
				<TagSearch />
				<SortButtonGroup />
			</div>

			{tags.docs.length > 0 ? (
				<>
					<ul className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5'>
						{tags.docs?.map(tag => {
							const descTag = tag as any;
							return (
								<TagCard
									key={tag._id}
									link={`${linkOfTag}[${tag.name}]`}
									nPolls={tag.totalVote}
									title={tag.name}
									desc={locale === 'vi' ? descTag.viDesc : descTag.enDesc}
								/>
							);
						})}
					</ul>
					<Pagination
						pageCount={totalPage}
						initialPage={page - 1}
						onPageChange={handlePageChange}
					/>
				</>
			) : (
				<p className='mt-6 text-center text-lg md:text-xl'>
					{tagsLang.pollNotfound}
				</p>
			)}
		</div>
	);
};

export const getServerSideProps: GetServerSideProps<
	ViTagsQuery | EnTagsQuery
> = async ({ locale, query }) => {
	const apolloClient = initializeApollo();
	const queryDocument = locale === 'vi' ? ViTagsDocument : EnTagsDocument;
	const page = getPageQuery(query, QUERY_KEY.PAGE);
	const pageSize = getPageQuery(
		query,
		QUERY_KEY.PAGE_SIZE,
		DEFAULT.TAG_PAGE_SIZE,
	);
	const sort: string = (query[QUERY_KEY.SORT] as string) || '';
	const search: string = (query[QUERY_KEY.SEARCH] as string) || '';

	const response = await apolloClient.query<
		ViTagsQuery | EnTagsQuery,
		QueryTagsArgs
	>({
		query: queryDocument,
		variables: { page, pageSize, search, sort },
	});
	addApolloState(apolloClient, { props: {} });

	return {
		props: response.data,
	};
};

export default Tags;
