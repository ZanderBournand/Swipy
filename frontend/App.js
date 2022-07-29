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
import { CommentContext } from "./src/Context/CommentContext";
import * as Font from 'expo-font';
import useFonts from "./src/hooks/useFonts";
import { TrackContext } from "./src/Context/TrackContext";
import { ProfileTrackContext } from "./src/Context/ProfileTrackContext";
import { AsyncStorage } from "react-native";
import AppLoaded from "./src/Context/AppLoaded";

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
      <TrackContext>
        <AppLoaded>
          <ProfileTrackContext>
              <CommentContext>
                <QueryClientProvider client={queryClient}>
                  <Route />
                </QueryClientProvider>
              </CommentContext>
            </ProfileTrackContext>
        </AppLoaded>
      </TrackContext>
    </Provider>
  );
}

