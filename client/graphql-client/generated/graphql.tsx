import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type CountingAggregationResponse = {
  __typename?: 'CountingAggregationResponse';
  comment: Scalars['Float'];
  hashtag: Scalars['Float'];
  poll: Scalars['Float'];
  user: Scalars['Float'];
};

export type Query = {
  __typename?: 'Query';
  count: CountingAggregationResponse;
};

export type HomeAnalysisQueryVariables = Exact<{ [key: string]: never; }>;


export type HomeAnalysisQuery = { __typename?: 'Query', count: { __typename?: 'CountingAggregationResponse', poll: number, user: number, hashtag: number, comment: number } };


export const HomeAnalysisDocument = gql`
    query HomeAnalysis {
  count {
    poll
    user
    hashtag
    comment
  }
}
    `;

/**
 * __useHomeAnalysisQuery__
 *
 * To run a query within a React component, call `useHomeAnalysisQuery` and pass it any options that fit your needs.
 * When your component renders, `useHomeAnalysisQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useHomeAnalysisQuery({
 *   variables: {
 *   },
 * });
 */
export function useHomeAnalysisQuery(baseOptions?: Apollo.QueryHookOptions<HomeAnalysisQuery, HomeAnalysisQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<HomeAnalysisQuery, HomeAnalysisQueryVariables>(HomeAnalysisDocument, options);
      }
export function useHomeAnalysisLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<HomeAnalysisQuery, HomeAnalysisQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<HomeAnalysisQuery, HomeAnalysisQueryVariables>(HomeAnalysisDocument, options);
        }
export type HomeAnalysisQueryHookResult = ReturnType<typeof useHomeAnalysisQuery>;
export type HomeAnalysisLazyQueryHookResult = ReturnType<typeof useHomeAnalysisLazyQuery>;
export type HomeAnalysisQueryResult = Apollo.QueryResult<HomeAnalysisQuery, HomeAnalysisQueryVariables>;