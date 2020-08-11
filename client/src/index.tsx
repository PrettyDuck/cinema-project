import AppWrapper from './AppWraper';
import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloClient, InMemoryCache, ApolloLink, ApolloProvider } from '@apollo/client';
import { createUploadLink } from 'apollo-upload-client';
import { setContext } from '@apollo/client/link/context';
import { getAccessToken, setAccessToken } from './accessToken';
import { TokenRefreshLink } from 'apollo-link-token-refresh';
import jwtDecode from 'jwt-decode';

const link = createUploadLink({ uri: 'http://localhost:5000/graphql', credentials: 'include' });
const authLink = setContext((_, { headers }) => {
  // Get AcessToken from global variable
  const accessToken = getAccessToken();
  return {
    headers: {
      ...headers,
      authorization: accessToken ? `bearer ${accessToken}` : '',
    },
  };
});
const refreshTokenLink = new TokenRefreshLink({
  accessTokenField: 'accessToken',
  isTokenValidOrUndefined: () => {
    const token = getAccessToken();
    if (!token) return true;
    try {
      const { exp } = jwtDecode(token);
      if (Date.now() >= exp * 1000) {
        return false;
      } else {
        return true;
      }
    } catch (error) {
      return false;
    }
  },
  fetchAccessToken: () => {
    return fetch('http://localhost:5000/refresh_token', { method: 'POST', credentials: 'include' });
  },
  handleFetch: (accessToken: string) => {
    setAccessToken(accessToken);
  },

  handleError: (err: Error) => {
    console.log(err);
  },
});

const client = new ApolloClient({
  link: ApolloLink.from([authLink, refreshTokenLink, (link as unknown) as ApolloLink]),
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <React.StrictMode>
      <AppWrapper />
    </React.StrictMode>
  </ApolloProvider>,
  document.getElementById('root'),
);
