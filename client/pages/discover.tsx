import {
	FilterIcon,
	SortAscendingIcon as SortIcon,
} from '@heroicons/react/outline';
import { NextPage } from 'next';
import PollSummary from '../components/PollSummary';

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

const Discover: NextPage = () => {
	return (
		<div className='container'>
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

			<div className='grid grid-cols-1 lg:grid-cols-2 my-6 gap-8'>
				<PollSummary
					content="I am currently trying to split the Value of a Variable to select. Variable = 'test;test1;test2;test3' I would like it to look like this"
					createdAt={new Date()}
					pollId='79102'
					pollSlug='oracle-sql-select-a-variable-and-split-it-by-semicolon'
					title='Oracle SQL Select a Variable and split it by semicolon'
					totalVote={100}
					totalComment={20}
					user={{ name: 'Tuấn Nguyễn' }}
					tags={[
						{ link: 'sql', name: 'Sql' },
						{ link: 'oracle', name: 'Oracle' },
					]}
				/>

				<PollSummary
					content="I am currently trying to split the Value of a Variable to select. Variable = 'test;test1;test2;test3' I would like it to look like this"
					createdAt={new Date()}
					pollId='79102'
					pollSlug='oracle-sql-select-a-variable-and-split-it-by-semicolon'
					title='Oracle SQL Select a Variable and split it by semicolon Oracle SQL Select a Variable and split it by semicolon '
					totalVote={100}
					totalComment={20}
					user={{ name: 'Tuấn Nguyễn' }}
					tags={[
						{ link: 'sql', name: 'Sql' },
						{ link: 'oracle', name: 'Oracle' },
					]}
				/>
			</div>
		</div>
	);
};

export default Discover;
