import { View, Text } from 'react-native'
import React, {useState, useEffect, useContext} from 'react'
import AuthMenu from '../../components/auth/menu'
import styles from './styles'
import AuthDetails from '../../components/auth/details'
import FocusAwareStatusBar from '../../components/general/lightStatusBar'
import { IsAppLoadedContext } from '../../Context/AppLoaded'

export default function AuthScreen() {
  const [authPage, setAuthPage] = useState(0)
  const [detailsPage, setDetailsPage] = useState(false)

  const {isAppLoaded, setIsAppLoaded} = useContext(IsAppLoadedContext)

  useEffect(() => {
    if(!isAppLoaded) {
  
      setIsAppLoaded(true)
    }
  }, [])

  return (
    <View style={styles.container}>
      <FocusAwareStatusBar barStyle="light-content"/>
      {detailsPage ? 
        <AuthDetails authPage={authPage} setDetailsPage={setDetailsPage}/>
        :
        <AuthMenu authPage={authPage} setAuthPage={setAuthPage} detailsPage={detailsPage} setDetailsPage={setDetailsPage}/>
      }
    </View>
  )
}