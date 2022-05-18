import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import React, {useState, useEffect} from 'react'
import { Image } from 'react-native'
import {useSelector} from 'react-redux'
import styles from './styles'
import {Ionicons} from '@expo/vector-icons'
import { addComment, clearCommentListener, commentListener } from '../../../services/posts'
import { FlatList } from 'react-native'
import CommentItem from './item'
import generalStyles from '../../../styles/generalStyles'

const CommentModal = ({ post }) => {

  const [comment, setComment] = useState('')
  const [commentList, setCommentList] = useState('')
  const currentUser = useSelector(state => state.auth.currentUser)

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
  }

  const renderItem = ({item}) => {
      return <CommentItem item={item}/>
  }

  return (
    <View style={styles.container}>
        <FlatList
            data={commentList}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
        />
      <View style={styles.containerInput}>
        <Image style={generalStyles.avatarSmall} source={{uri: currentUser.photoURL}}/>
        <TextInput style={styles.input} value={comment} onChangeText={setComment} placeholder="Add comment..."/>
        <TouchableOpacity onPress={() => handleCommentSend()}>
            <Ionicons name='arrow-up-circle' size={34} color={'crimson'}/>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default CommentModal