import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import { ApolloServer } from 'apollo-server-express';
import cookieParser from 'cookie-parser';
import 'dotenv/config';
import express from 'express';
import { useServer } from 'graphql-ws/lib/use/ws';
import { createServer } from 'http';
import morgan from 'morgan';
import 'reflect-metadata';
import { buildSchema } from 'type-graphql';
import { WebSocketServer } from 'ws';
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

		const httpServer = createServer(app);
		const wsServer = new WebSocketServer({
			server: httpServer,
			path: '/graphql',
		});
		const serverCleanup = useServer({ schema: graphqlSchema }, wsServer);

		const apolloServer = new ApolloServer({
			schema: graphqlSchema,
			context: ({ req, res }) => ({ req, res }),
			plugins: [
				ApolloServerPluginDrainHttpServer({ httpServer }),
				{
					async serverWillStart() {
						return {
							async drainServer() {
								await serverCleanup.dispose();
							},
						};
					},
				},
			],
		});

		await apolloServer.start();
		apolloServer.applyMiddleware({ app, cors: corsConfig });

		httpServer.listen(SERVER_PORT, () =>
			console.log(
				`Server started on port ${SERVER_PORT}, Apollo Server on ${SERVER_PORT}${apolloServer.graphqlPath}`,
			),
		);
	})
	.catch(error => {
		console.error('CONNECT MONGODB FAILED: ', error);
		process.exit(-1);
	});
