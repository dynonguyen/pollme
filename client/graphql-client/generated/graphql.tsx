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

export type CountingAggregation = QueryResponse & {
  __typename?: 'CountingAggregation';
  code: Scalars['Int'];
  comment: Scalars['Float'];
  hashtag: Scalars['Float'];
  message?: Maybe<Scalars['String']>;
  poll: Scalars['Float'];
  user: Scalars['Float'];
};

export type LoginInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  login: UserMutationResponse;
  register: UserMutationResponse;
};


export type MutationLoginArgs = {
  loginInput: LoginInput;
};


export type MutationRegisterArgs = {
  registerInput: RegisterInput;
};

export type MutationResponse = {
  code: Scalars['Int'];
  message?: Maybe<Scalars['String']>;
  success: Scalars['Boolean'];
};

export type Query = {
  __typename?: 'Query';
  count: CountingAggregation;
};

export type QueryResponse = {
  code: Scalars['Int'];
  message?: Maybe<Scalars['String']>;
};

export type RegisterInput = {
  email: Scalars['String'];
  name: Scalars['String'];
  password: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  _id: Scalars['ID'];
  email: Scalars['String'];
  favorites: Array<Scalars['String']>;
  name: Scalars['String'];
  oauthId?: Maybe<Scalars['String']>;
  voted: Array<Scalars['String']>;
  votes: Array<Scalars['String']>;
};

export type UserMutationResponse = MutationResponse & {
  __typename?: 'UserMutationResponse';
  code: Scalars['Int'];
  message?: Maybe<Scalars['String']>;
  success: Scalars['Boolean'];
  user?: Maybe<User>;
};

export type RegisterMutationVariables = Exact<{
  registerInput: RegisterInput;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'UserMutationResponse', code: number, message?: string | null, user?: { __typename?: 'User', _id: string, email: string, name: string } | null } };

export type LoginMutationVariables = Exact<{
  loginInput: LoginInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'UserMutationResponse', code: number, message?: string | null, user?: { __typename?: 'User', _id: string, email: string, name: string } | null } };

export type HomeAnalysisQueryVariables = Exact<{ [key: string]: never; }>;


export type HomeAnalysisQuery = { __typename?: 'Query', count: { __typename?: 'CountingAggregation', code: number, message?: string | null, poll: number, user: number, hashtag: number, comment: number } };


export const RegisterDocument = gql`
    mutation Register($registerInput: RegisterInput!) {
  register(registerInput: $registerInput) {
    code
    message
    user {
      _id
      email
      name
    }
  }
}
    `;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      registerInput: // value for 'registerInput'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, options);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const LoginDocument = gql`
    mutation Login($loginInput: LoginInput!) {
  login(loginInput: $loginInput) {
    code
    message
    user {
      _id
      email
      name
    }
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      loginInput: // value for 'loginInput'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const HomeAnalysisDocument = gql`
    query HomeAnalysis {
  count {
    code
    message
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