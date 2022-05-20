import { LogBox } from "react-native";
LogBox.ignoreAllLogs();
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import {Provider} from 'react-redux'
import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './src/redux/reducers'
import Constants from 'expo-constants'
import React, {createContext, useState} from 'react'
import firebase from 'firebase/app'
import Route from "./src/navigation/main";
import { QueryClient, QueryClientProvider } from "react-query";
import {UserContext} from './src/Context/UserContext'
import { CommentContext } from "./src/Context/CommentContext";

const store = createStore(rootReducer, applyMiddleware(thunk))

if(firebase.apps.length == 0) {
  firebase.initializeApp(Constants.manifest.web.config.firebase)
}

const queryClient = new QueryClient({
  defaultOptions: {queries: {refetchInterval: false, staleTime: Infinity}}
})

export default function App() {

  return (
    StatusBar.setBarStyle('default', true),
    <Provider store={store}>
      <UserContext>
        <CommentContext>
          <QueryClientProvider client={queryClient}>
            <Route />
          </QueryClientProvider>
        </CommentContext>
      </UserContext>
    </Provider>
  );
}

