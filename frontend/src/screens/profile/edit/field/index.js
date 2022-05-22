 import { View, Text, TextInput } from 'react-native'
 import React,  {useState} from 'react'
 import {Divider} from 'react-native-paper'
 import styles from './styles'
 import {SafeAreaView} from 'react-native-safe-area-context'
import NavBarGeneral from '../../../../components/general/navbar'
import {generalStyles} from '../../../../styles'
import { saveUserField } from '../../../../services/user'
import {useNavigation} from '@react-navigation/native'
 
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
       <NavBarGeneral title={title} rightButton={{display: true, name: 'save', action: onSave}}/>
       <Divider />
       <View style={styles.mainContainer}>
           <Text style={styles.title}>{title}</Text>
           <TextInput style={generalStyles.textInput} onChangeText={setTextInputValue} value={textInputValue}/>
       </View>
     </SafeAreaView>
   )
 }