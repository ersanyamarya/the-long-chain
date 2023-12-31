import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'

const httpLink = createHttpLink({
  uri: import.meta.env.VITE_MAIN_SERVICE_HOST + '/graphql',
})

const authLink = setContext((_, { headers }) => {
  const token = JSON.parse(localStorage.getItem('auth-storage') || '{}').state.token
  return {
    headers: {
      ...headers,
      Authorization: token,
    },
  }
})

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
})
