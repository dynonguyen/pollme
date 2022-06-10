import { ApolloServer } from 'apollo-server-express';
import cookieParser from 'cookie-parser';
import 'dotenv/config';
import express from 'express';
import morgan from 'morgan';
import 'reflect-metadata';
import { buildSchema } from 'type-graphql';
import corsConfig from './config/cors';
import mongooseConnect from './config/database';
import { SERVER_PORT } from './constants/index';
import { authChecker } from './middleware/auth-checker';
import Resolvers from './resolvers';

mongooseConnect()
	.then(async () => {
		const app = express();
		app.use(cookieParser());
		app.use(morgan('tiny'));

		const graphqlSchema = await buildSchema({
			resolvers: Resolvers,
			dateScalarMode: 'isoDate',
			authChecker,
		});
		const apolloServer = new ApolloServer({
			schema: graphqlSchema,
			context: ({ req, res }) => ({ req, res }),
		});

		await apolloServer.start();
		apolloServer.applyMiddleware({ app, cors: corsConfig });

		app.listen(SERVER_PORT, () =>
			console.log(
				`Server started on port ${SERVER_PORT}, Apollo Server on ${SERVER_PORT}${apolloServer.graphqlPath}`,
			),
		);
	})
	.catch(error => {
		console.error('CONNECT MONGODB FAILED: ', error);
		process.exit(-1);
	});
