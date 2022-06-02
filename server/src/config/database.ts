import { connect, ConnectOptions } from 'mongoose';
import { MONGODB_URI, MONGOOSE_CONNECT_TIMEOUT } from './../constants/index';

const mongooseConnect = async () => {
	try {
		const mongoURI: string = MONGODB_URI;
		const options: ConnectOptions = {
			connectTimeoutMS: MONGOOSE_CONNECT_TIMEOUT,
		};
		await connect(mongoURI, options);
		console.log('MongoDB Connected...');
		return true;
	} catch (err) {
		console.error('MongoDB Connect Failed: ', err.message);
		process.exit(1);
	}
};

export default mongooseConnect;
