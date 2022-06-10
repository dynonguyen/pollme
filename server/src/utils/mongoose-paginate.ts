import { Model } from 'mongoose';
import { DEFAULT } from '../constants/default';

interface PaginateOptions {
	select?: string;
	sort?: string;
}

interface MongoosePaginateResult<T> {
	total: number;
	page: number;
	pageSize: number;
	docs: T[];
}

async function mongoosePaginate<T>(
	MyModel: Model<T>,
	query: any = {},
	{ pageSize = DEFAULT.PAGE_SIZE, page = 1 },
	options: PaginateOptions = {
		select: '',
		sort: '',
	},
): Promise<MongoosePaginateResult<T>> {
	try {
		// check if object is mongoose model
		[page, pageSize] = [page, pageSize].map(Number);
		const { sort = '', select = '' } = options;
		const promises = [];
		let result: MongoosePaginateResult<T> = {
			total: 0,
			page,
			pageSize,
			docs: [],
		};

		// count documents
		promises.push(
			MyModel.countDocuments({ ...query }, {}).then(
				total => (result.total = total),
			),
		);

		// get documents
		promises.push(
			MyModel.find({ ...query })
				.skip((page - 1) * pageSize)
				.limit(pageSize)
				.select(select)
				.sort(sort)
				.then(data => (result.docs = data)),
		);

		await Promise.all(promises);
		return result;
	} catch (error) {
		throw new Error(error);
	}
}

export default mongoosePaginate;
