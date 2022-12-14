import { gql } from '@apollo/client'
import * as Apollo from '@apollo/client'
export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = {
    [K in keyof T]: T[K]
}
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
    [SubKey in K]?: Maybe<T[SubKey]>
}
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
    [SubKey in K]: Maybe<T[SubKey]>
}
const defaultOptions = {} as const
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
    ID: string
    String: string
    Boolean: boolean
    Int: number
    Float: number
    BigDecimal: string
    BigInt: string
    Bytes: string
}

export type BlockChangedFilter = {
    number_gte: Scalars['Int']
}

export type Block_Height = {
    hash?: InputMaybe<Scalars['Bytes']>
    number?: InputMaybe<Scalars['Int']>
    number_gte?: InputMaybe<Scalars['Int']>
}

export type Guess = {
    __typename?: 'Guess'
    bidder: Scalars['String']
    guessedNumber: Scalars['BigInt']
    id: Scalars['ID']
    prize: Scalars['BigInt']
    timestamp: Scalars['BigInt']
    winningNumber: Scalars['BigInt']
}

export type Guess_Filter = {
    /** Filter for the block changed event. */
    _change_block?: InputMaybe<BlockChangedFilter>
    bidder?: InputMaybe<Scalars['String']>
    bidder_contains?: InputMaybe<Scalars['String']>
    bidder_contains_nocase?: InputMaybe<Scalars['String']>
    bidder_ends_with?: InputMaybe<Scalars['String']>
    bidder_ends_with_nocase?: InputMaybe<Scalars['String']>
    bidder_gt?: InputMaybe<Scalars['String']>
    bidder_gte?: InputMaybe<Scalars['String']>
    bidder_in?: InputMaybe<Array<Scalars['String']>>
    bidder_lt?: InputMaybe<Scalars['String']>
    bidder_lte?: InputMaybe<Scalars['String']>
    bidder_not?: InputMaybe<Scalars['String']>
    bidder_not_contains?: InputMaybe<Scalars['String']>
    bidder_not_contains_nocase?: InputMaybe<Scalars['String']>
    bidder_not_ends_with?: InputMaybe<Scalars['String']>
    bidder_not_ends_with_nocase?: InputMaybe<Scalars['String']>
    bidder_not_in?: InputMaybe<Array<Scalars['String']>>
    bidder_not_starts_with?: InputMaybe<Scalars['String']>
    bidder_not_starts_with_nocase?: InputMaybe<Scalars['String']>
    bidder_starts_with?: InputMaybe<Scalars['String']>
    bidder_starts_with_nocase?: InputMaybe<Scalars['String']>
    guessedNumber?: InputMaybe<Scalars['BigInt']>
    guessedNumber_gt?: InputMaybe<Scalars['BigInt']>
    guessedNumber_gte?: InputMaybe<Scalars['BigInt']>
    guessedNumber_in?: InputMaybe<Array<Scalars['BigInt']>>
    guessedNumber_lt?: InputMaybe<Scalars['BigInt']>
    guessedNumber_lte?: InputMaybe<Scalars['BigInt']>
    guessedNumber_not?: InputMaybe<Scalars['BigInt']>
    guessedNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>
    id?: InputMaybe<Scalars['ID']>
    id_gt?: InputMaybe<Scalars['ID']>
    id_gte?: InputMaybe<Scalars['ID']>
    id_in?: InputMaybe<Array<Scalars['ID']>>
    id_lt?: InputMaybe<Scalars['ID']>
    id_lte?: InputMaybe<Scalars['ID']>
    id_not?: InputMaybe<Scalars['ID']>
    id_not_in?: InputMaybe<Array<Scalars['ID']>>
    prize?: InputMaybe<Scalars['BigInt']>
    prize_gt?: InputMaybe<Scalars['BigInt']>
    prize_gte?: InputMaybe<Scalars['BigInt']>
    prize_in?: InputMaybe<Array<Scalars['BigInt']>>
    prize_lt?: InputMaybe<Scalars['BigInt']>
    prize_lte?: InputMaybe<Scalars['BigInt']>
    prize_not?: InputMaybe<Scalars['BigInt']>
    prize_not_in?: InputMaybe<Array<Scalars['BigInt']>>
    timestamp?: InputMaybe<Scalars['BigInt']>
    timestamp_gt?: InputMaybe<Scalars['BigInt']>
    timestamp_gte?: InputMaybe<Scalars['BigInt']>
    timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>
    timestamp_lt?: InputMaybe<Scalars['BigInt']>
    timestamp_lte?: InputMaybe<Scalars['BigInt']>
    timestamp_not?: InputMaybe<Scalars['BigInt']>
    timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>
    winningNumber?: InputMaybe<Scalars['BigInt']>
    winningNumber_gt?: InputMaybe<Scalars['BigInt']>
    winningNumber_gte?: InputMaybe<Scalars['BigInt']>
    winningNumber_in?: InputMaybe<Array<Scalars['BigInt']>>
    winningNumber_lt?: InputMaybe<Scalars['BigInt']>
    winningNumber_lte?: InputMaybe<Scalars['BigInt']>
    winningNumber_not?: InputMaybe<Scalars['BigInt']>
    winningNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>
}

export enum Guess_OrderBy {
    Bidder = 'bidder',
    GuessedNumber = 'guessedNumber',
    Id = 'id',
    Prize = 'prize',
    Timestamp = 'timestamp',
    WinningNumber = 'winningNumber',
}

/** Defines the order direction, either ascending or descending */
export enum OrderDirection {
    Asc = 'asc',
    Desc = 'desc',
}

export type Query = {
    __typename?: 'Query'
    /** Access to subgraph metadata */
    _meta?: Maybe<_Meta_>
    guess?: Maybe<Guess>
    guesses: Array<Guess>
}

export type Query_MetaArgs = {
    block?: InputMaybe<Block_Height>
}

export type QueryGuessArgs = {
    block?: InputMaybe<Block_Height>
    id: Scalars['ID']
    subgraphError?: _SubgraphErrorPolicy_
}

export type QueryGuessesArgs = {
    block?: InputMaybe<Block_Height>
    first?: InputMaybe<Scalars['Int']>
    orderBy?: InputMaybe<Guess_OrderBy>
    orderDirection?: InputMaybe<OrderDirection>
    skip?: InputMaybe<Scalars['Int']>
    subgraphError?: _SubgraphErrorPolicy_
    where?: InputMaybe<Guess_Filter>
}

export type Subscription = {
    __typename?: 'Subscription'
    /** Access to subgraph metadata */
    _meta?: Maybe<_Meta_>
    guess?: Maybe<Guess>
    guesses: Array<Guess>
}

export type Subscription_MetaArgs = {
    block?: InputMaybe<Block_Height>
}

export type SubscriptionGuessArgs = {
    block?: InputMaybe<Block_Height>
    id: Scalars['ID']
    subgraphError?: _SubgraphErrorPolicy_
}

export type SubscriptionGuessesArgs = {
    block?: InputMaybe<Block_Height>
    first?: InputMaybe<Scalars['Int']>
    orderBy?: InputMaybe<Guess_OrderBy>
    orderDirection?: InputMaybe<OrderDirection>
    skip?: InputMaybe<Scalars['Int']>
    subgraphError?: _SubgraphErrorPolicy_
    where?: InputMaybe<Guess_Filter>
}

export type _Block_ = {
    __typename?: '_Block_'
    /** The hash of the block */
    hash?: Maybe<Scalars['Bytes']>
    /** The block number */
    number: Scalars['Int']
    /** Integer representation of the timestamp stored in blocks for the chain */
    timestamp?: Maybe<Scalars['Int']>
}

/** The type for the top-level _meta field */
export type _Meta_ = {
    __typename?: '_Meta_'
    /**
     * Information about a specific subgraph block. The hash of the block
     * will be null if the _meta field has a block constraint that asks for
     * a block number. It will be filled if the _meta field has no block constraint
     * and therefore asks for the latest  block
     *
     */
    block: _Block_
    /** The deployment ID */
    deployment: Scalars['String']
    /** If `true`, the subgraph encountered indexing errors at some past block */
    hasIndexingErrors: Scalars['Boolean']
}

export enum _SubgraphErrorPolicy_ {
    /** Data will be returned even if the subgraph has indexing errors */
    Allow = 'allow',
    /** If the subgraph has indexing errors, data will be omitted. The default. */
    Deny = 'deny',
}

export type GetAllGuessesQueryVariables = Exact<{
    first?: InputMaybe<Scalars['Int']>
    skip?: InputMaybe<Scalars['Int']>
    address?: InputMaybe<Scalars['String']>
}>

export type GetAllGuessesQuery = {
    __typename?: 'Query'
    guesses: Array<{
        __typename?: 'Guess'
        id: string
        bidder: string
        guessedNumber: string
        winningNumber: string
        prize: string
        timestamp: string
    }>
}

export const GetAllGuessesDocument = gql`
    query getAllGuesses($first: Int, $skip: Int, $address: String) {
        guesses(first: $first, skip: $skip, subgraphError: allow) {
            id
            bidder
            guessedNumber
            winningNumber
            prize
            timestamp
        }
    }
`

/**
 * __useGetAllGuessesQuery__
 *
 * To run a query within a React component, call `useGetAllGuessesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllGuessesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllGuessesQuery({
 *   variables: {
 *      first: // value for 'first'
 *      skip: // value for 'skip'
 *      address: // value for 'address'
 *   },
 * });
 */
export function useGetAllGuessesQuery(
    baseOptions?: Apollo.QueryHookOptions<
        GetAllGuessesQuery,
        GetAllGuessesQueryVariables
    >
) {
    const options = { ...defaultOptions, ...baseOptions }
    return Apollo.useQuery<GetAllGuessesQuery, GetAllGuessesQueryVariables>(
        GetAllGuessesDocument,
        options
    )
}
export function useGetAllGuessesLazyQuery(
    baseOptions?: Apollo.LazyQueryHookOptions<
        GetAllGuessesQuery,
        GetAllGuessesQueryVariables
    >
) {
    const options = { ...defaultOptions, ...baseOptions }
    return Apollo.useLazyQuery<GetAllGuessesQuery, GetAllGuessesQueryVariables>(
        GetAllGuessesDocument,
        options
    )
}
export type GetAllGuessesQueryHookResult = ReturnType<
    typeof useGetAllGuessesQuery
>
export type GetAllGuessesLazyQueryHookResult = ReturnType<
    typeof useGetAllGuessesLazyQuery
>
export type GetAllGuessesQueryResult = Apollo.QueryResult<
    GetAllGuessesQuery,
    GetAllGuessesQueryVariables
>
