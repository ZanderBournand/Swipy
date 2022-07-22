import { LogBox } from "react-native";
LogBox.ignoreAllLogs();
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import {Provider} from 'react-redux'
import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './src/redux/reducers'
import Constants from 'expo-constants'
import React, {createContext, useState, useEffect} from 'react'
import firebase from 'firebase/app'
import Route from "./src/navigation/main";
import { QueryClient, QueryClientProvider } from "react-query";
import {UserContext} from './src/Context/UserContext'
import { CommentContext } from "./src/Context/CommentContext";
import * as Font from 'expo-font';
import useFonts from "./src/hooks/useFonts";
import { TrackContext } from "./src/Context/TrackContext";
import { AsyncStorage } from "react-native";

const store = createStore(rootReducer, applyMiddleware(thunk))

if(firebase.apps.length == 0) {
  firebase.initializeApp(Constants.manifest.web.config.firebase)
}

const queryClient = new QueryClient({
  defaultOptions: {queries: {refetchInterval: false, staleTime: Infinity}}
})

export default function App() {

  const [fontLoaded, setFontLoaded] = useState(false)

  const LoadFonts = async () => {
    await useFonts()
    .then(() => {setFontLoaded(true)})
  };

  useEffect(() => {
    LoadFonts()
  }, [])

  if (!fontLoaded) {
    return (
      <></>
    )
  }

  console.warn = () => {}
  
  return (
    StatusBar.setBarStyle('default', true),
    <Provider store={store}>
      <UserContext>
        <TrackContext>
          <CommentContext>
            <QueryClientProvider client={queryClient}>
              <Route />
            </QueryClientProvider>
          </CommentContext>
        </TrackContext>
      </UserContext>
    </Provider>
  );
}

