 import { View, Text, TextInput, StatusBar } from 'react-native'
 import React,  {useState} from 'react'
 import {Divider} from 'react-native-paper'
 import styles from './styles'
 import {SafeAreaView} from 'react-native-safe-area-context'
import NavBarGeneral from '../../../../components/general/navbar'
import {generalStyles} from '../../../../styles'
import { useIsFocused } from '@react-navigation/core'
import { saveUserField } from '../../../../services/user'
import {useNavigation} from '@react-navigation/native'
import NavBarGeneralBlack from '../../../../components/general/navbarBlack'
import FocusAwareStatusBar from '../../../../components/general/lightStatusBar'
 
 export default function EditProfileFieldScreen({route}) {

   const {title, field, value} = route.params
   const navigation = useNavigation()

   const [textInputValue, setTextInputValue] = useState(value)

   const onSave = () => {
       saveUserField(field, textInputValue)
       .then(() => navigation.goBack())
   }

   return (
     <SafeAreaView style={styles.container}>
      <FocusAwareStatusBar barStyle="light-content"/>
       <NavBarGeneralBlack title={title} rightButton={{display: true, name: 'save', action: onSave}}/>
       <Divider />
       <View style={styles.mainContainer}>
           <Text style={styles.title}>{title}</Text>
           <TextInput style={styles.textInput} onChangeText={setTextInputValue} value={textInputValue}/>
       </View>
     </SafeAreaView>
   )
 }