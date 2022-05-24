import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView } from 'react-native'
import React, {useState, useEffect, useContext} from 'react'
import { Image } from 'react-native'
import {useSelector} from 'react-redux'
import styles from './styles'
import {Ionicons} from '@expo/vector-icons'
import { addComment, clearCommentListener, commentListener } from '../../../services/posts'
import { FlatList } from 'react-native'
import CommentItem from './item'
import generalStyles from '../../../styles/generalStyles'
import { CommentOffsetContext } from '../../../Context/CommentContext'
import {SafeAreaView} from 'react-native-safe-area-context'
import BottomSheet, { BottomSheetTextInput } from "@gorhom/bottom-sheet";

const CommentModal = ({ post }) => {

  const [comment, setComment] = useState('')
  const [commentList, setCommentList] = useState('')
  const currentUser = useSelector(state => state.auth.currentUser)

  const {commentOffset, setCommentOffset} = useContext(CommentOffsetContext)

  useEffect(() => {
    commentListener(post.id, setCommentList)
    return () => clearCommentListener()
  }, [])

  const handleCommentSend = () => {
      if(comment.length == 0) {
          return;
      }
      setComment('')
      addComment(post.id, currentUser.uid, comment)
      setCommentOffset(commentOffset + 1)
  }

  const renderItem = ({item}) => {
      return <CommentItem item={item}/>
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
            data={commentList}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
      />
      <View style={styles.containerInput}>
        <Image style={generalStyles.avatarSmall} source={{uri: currentUser.photoURL}}/>
        <BottomSheetTextInput style={styles.input} value={comment} onChangeText={setComment} placeholder="Add comment..."/>
        <TouchableOpacity onPress={() => handleCommentSend()}>
            <Ionicons name='arrow-up-circle' size={34} color={'crimson'}/>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default CommentModal