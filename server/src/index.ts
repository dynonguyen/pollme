import { ApolloServer } from 'apollo-server-express';
import 'dotenv/config';
import express from 'express';
import session from 'express-session';
import 'reflect-metadata';
import { buildSchema } from 'type-graphql';
import corsConfig from './config/cors';
import mongooseConnect from './config/database';
import sessionConfig from './config/session';
import { SERVER_PORT } from './constants/index';
import Resolvers from './resolvers';

mongooseConnect().then(async () => {
	const app = express();
	app.use(session(sessionConfig));

	const graphqlSchema = await buildSchema({
		resolvers: Resolvers,
		dateScalarMode: 'isoDate',
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
});
