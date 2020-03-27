import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-client';
import {createHttpLink} from 'apollo-link-http';
import { setContext } from 'apollo-link-context'
import {InMemoryCache} from 'apollo-cache-inmemory';
import { createUploadLink } from 'apollo-upload-client'
import {ApolloProvider} from 'react-apollo';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'typeface-roboto';
import './index.css';

const url = 'http://127.0.0.1:5000/graphql';

const httpLink = createUploadLink({
    uri: url,
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = sessionStorage.getItem('token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      "x-token": token ? `${token}` : "",
    }
  }
});

console.log(sessionStorage.getItem('token'));


const cache = new InMemoryCache({
  dataIdFromObject: o => o.id //identify a piece of data for refetching. tracks records fetched from the server 

});

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache,
    headers: {
        "x-token": sessionStorage.getItem('token'),
      },
	
});

ReactDOM.render(
  <ApolloProvider client={client}>
        <App />
  </ApolloProvider>,
    document.getElementById('root'));

serviceWorker.unregister();


