import React from 'react';
import {ApolloClient, InMemoryCache, ApolloProvider} from '@apollo/client';
import {GRAPHQL_URL} from './src/config/app.config';
import ChatScreen from './src/screens/ChatScreen';
import {AppStyleFull} from './src/styles/AppStyle';

console.disableYellowBox = true;

const client = new ApolloClient({
  uri: GRAPHQL_URL,
  cache: new InMemoryCache(),
});

export default function App() {
  return (
    <ApolloProvider client={client}>
      <AppStyleFull>
        <ChatScreen />
      </AppStyleFull>
    </ApolloProvider>
  );
}
