import React from 'react';
import {ApolloClient, InMemoryCache, ApolloProvider} from '@apollo/client';
import {GRAPHQL_URL} from './src/config/app.config';
import ChatScreen from './src/screens/ChatScreen';
import {AppStyleFull} from './src/styles/AppStyle';
import {KeyboardAvoidingView, Platform} from 'react-native';

console.disableYellowBox = true;

const client = new ApolloClient({
  uri: GRAPHQL_URL,
  cache: new InMemoryCache(),
});

export default function App() {
  return (
    <ApolloProvider client={client}>
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <AppStyleFull>
          <ChatScreen />
        </AppStyleFull>
      </KeyboardAvoidingView>
    </ApolloProvider>
  );
}
