import { createClient, RedisClientType } from 'redis';

interface PaginatedKey {
	key: string;
	page?: number | string;
	pageSize?: number | string;
	filter?: string;
	sort?: string;
	search?: string;
}

class Redis {
	private static _redisClient: RedisClientType<any> | null = null;

	static async getConnect() {
		if (!this._redisClient) {
			this._redisClient = createClient({
				url: 'redis://localhost:6379',
			});
			this._redisClient.on('error', err => {
				console.log('Redis Client Error', err);
				this._redisClient = null;
				throw new Error(err);
			});
			await this._redisClient.connect();
		}
		return this._redisClient;
	}

	static async disconnect() {
		if (this._redisClient) {
			console.log('Redis disconnected');
			await this._redisClient.disconnect();
		}
	}

	static async get(key: string) {
		try {
			if (!this._redisClient) {
				await this.getConnect();
			}
			const cachedData = await this._redisClient!.get(key);
			if (cachedData) {
				return JSON.parse(cachedData);
			}

			return null;
		} catch (error) {
			return null;
		}
	}

	static async set(key: string, value: any, options?: any) {
		try {
			if (!this._redisClient) {
				await this.getConnect();
			}
			await this._redisClient?.set(key, JSON.stringify(value), options);
		} catch (error) {}
	}

	static createPaginatedKey(params: PaginatedKey) {
		const { key, page, pageSize, filter, sort, search } = params;

		let keyResult = key;
		if (page) keyResult += `:p-${page}`;
		if (pageSize) keyResult += `:limit-${pageSize}`;
		if (filter) keyResult += `:f-${filter}`;
		if (sort) keyResult += `:s-${sort}`;
		if (search) keyResult += `:search-${search}`;

		return keyResult;
	}
}

process.on('exit', Redis.disconnect);

export default Redis;
