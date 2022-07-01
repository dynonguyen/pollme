import {
	ApolloClient,
	ApolloLink,
	from,
	HttpLink,
	InMemoryCache,
	NormalizedCacheObject,
	split,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { getMainDefinition } from '@apollo/client/utilities';
import merge from 'deepmerge';
import { createClient } from 'graphql-ws';
import isEqual from 'lodash/isEqual';
import {
	GetServerSidePropsResult,
	GetStaticPathsResult,
	GetStaticPropsResult,
} from 'next';
import { useMemo } from 'react';
import { APOLLO_SERVER_URI, APOLLO_WS_URI } from './../constants/index';
import { LS_KEY } from './../constants/key';
import { isIOSMacOSDevice } from './../utils/helper';
export const APOLLO_STATE_PROP_NAME = '__APOLLO_STATE__';

type ApolloStateProps = {
	[APOLLO_STATE_PROP_NAME]?: NormalizedCacheObject;
};
type ApolloResult =
	| GetStaticPropsResult<any>
	| GetServerSidePropsResult<any>
	| GetStaticPathsResult<any>;

let apolloClient: ApolloClient<NormalizedCacheObject>;

const errorLink = onError(({ graphQLErrors, networkError }) => {
	if (graphQLErrors)
		graphQLErrors.forEach(({ message, locations, path }) =>
			console.log(
				`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
			),
		);
	if (networkError) console.log(`[Network error]: ${networkError}`);
});

const httpLink = new HttpLink({
	uri: APOLLO_SERVER_URI,
	credentials: 'include',
});

function createApolloClient(link: ApolloLink) {
	return new ApolloClient({
		ssrMode: typeof window === 'undefined',
		link,
		cache: new InMemoryCache(),
	});
}

export function initializeApollo(
	initialState: NormalizedCacheObject | null = null,
) {
	const _apolloClient =
		apolloClient ?? createApolloClient(from([errorLink, httpLink]));

	// If your page has Next.js data fetching methods that use Apollo Client, the initial state
	// gets hydrated here
	if (initialState) {
		// Get existing cache, loaded during client side data fetching
		const existingCache = _apolloClient.extract();

		// Merge the initialState from getStaticProps/getServerSideProps in the existing cache
		const data = merge(existingCache, initialState, {
			// combine arrays using object equality (like in sets)
			arrayMerge: (destinationArray, sourceArray) => [
				...sourceArray,
				...destinationArray.filter(d => sourceArray.every(s => !isEqual(d, s))),
			],
		});

		// Restore the cache with the merged data
		_apolloClient.cache.restore(data);
	}
	// For SSG and SSR always create a new Apollo Client
	if (typeof window === 'undefined') return _apolloClient;

	// Create the Apollo Client once in the client
	if (!apolloClient) {
		const wsLink = new GraphQLWsLink(createClient({ url: APOLLO_WS_URI }));

		const authLink = setContext((_, { headers }) => {
			// Fix heroku can't set cookie for cross origin on MacOS, IOS
			// get the authentication token from local storage if it exists
			if (isIOSMacOSDevice()) {
				const token = localStorage.getItem(LS_KEY.ACCESS_TOKEN_FOR_IOS);
				return { headers: { ...headers, authorization: token ? token : '' } };
			}
			return { headers };
		});

		const splitLink = split(
			({ query }) => {
				const definition = getMainDefinition(query);
				return (
					definition.kind === 'OperationDefinition' &&
					definition.operation === 'subscription'
				);
			},
			wsLink,
			authLink.concat(httpLink),
		);
		apolloClient = createApolloClient(splitLink);
	}

	return apolloClient;
}

export function addApolloState(
	client: ApolloClient<NormalizedCacheObject>,
	pageProps: { props: ApolloStateProps } & ApolloResult,
) {
	if (pageProps?.props) {
		pageProps.props[APOLLO_STATE_PROP_NAME] = client.cache.extract();
	}

	return pageProps;
}

export function useApollo(pageProps: ApolloStateProps) {
	const state = pageProps[APOLLO_STATE_PROP_NAME];
	const store = useMemo(() => initializeApollo(state), [state]);
	return store;
}
