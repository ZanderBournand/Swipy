import { LogBox } from "react-native";
LogBox.ignoreAllLogs();

import { StyleSheet, Text, View, StatusBar } from 'react-native';

import {Provider} from 'react-redux'
import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './src/redux/reducers'

import Constants from 'expo-constants'
import firebase from 'firebase/app'
import AuthScreen from './src/screens/auth';
import Route from "./src/navigation/main";
import { AsyncStorage } from "react-native";
import { QueryClient, QueryClientProvider } from "react-query";

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
      <QueryClientProvider client={queryClient}>
        <Route />
      </QueryClientProvider>
    </Provider>
  );
}
