import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
  ApolloProvider,
  createHttpLink
} from '@apollo/client'
import { NextPage } from 'next'

const GRAPHQL_URL = process.env.GRAPHQL_URL

const client = new ApolloClient({
  uri: GRAPHQL_URL,
  cache: new InMemoryCache()
})

const getApolloClient = (_ctx?: any, initialState?: NormalizedCacheObject) => {
  const httpLink = createHttpLink({
    uri: GRAPHQL_URL,
    fetch
  })
  const cache = new InMemoryCache().restore(initialState || {})

  return new ApolloClient({
    link: httpLink,
    cache
  })
}

// eslint-disable-next-line react/display-name
export const withApollo = (Comp: NextPage) => (props: any) =>
  (
    <ApolloProvider client={getApolloClient(null, props.apolloState)}>
      <Comp />
    </ApolloProvider>
  )

export { client, getApolloClient }
