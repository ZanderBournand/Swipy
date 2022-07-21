import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import styles from './styles'
import { ImageHeaderScrollView, TriggeringView } from 'react-native-image-header-scroll-view';

const Sandbox = ({route}) => {

  const {user} = route.params

  return (
    <ImageHeaderScrollView
        maxHeight={300}
        headerImage={{uri: user?.photoURL}}
        maxOverlayOpacity={0.6}
        fadeOutForeground
        renderForeground={() => (
            <View style={{ height: 250, justifyContent: "center", alignItems: "center" }} >
              <TouchableOpacity onPress={() => console.log("tap!!")}>
                <Text style={{ backgroundColor: "transparent" }}>Tap Me!</Text>
              </TouchableOpacity>
            </View>
          )}
        renderFixedForeground={() => (
            <View>
                <Text>WOWOW</Text>
            </View>
        )}
    >
        <View style={{height: 1000}}>
            <TriggeringView onHide={() => console.log("text hidden")}>
                <Text>Scroll Me!</Text>
            </TriggeringView>
        </View>
    </ImageHeaderScrollView>
    // <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
    //   <Text>index</Text>
    // </View>
  )
}

export default Sandbox