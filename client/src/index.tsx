import App from './App';
import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { ApolloProvider } from '@apollo/react-hooks';
import { createUploadLink } from 'apollo-upload-client';

const link = createUploadLink({ url: 'http://localhost:5000/graphql' });
const client = new ApolloClient({ link, cache: new InMemoryCache(), credentials: 'include' });

ReactDOM.render(
  <ApolloProvider client={client}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </ApolloProvider>,
  document.getElementById('root'),
);
