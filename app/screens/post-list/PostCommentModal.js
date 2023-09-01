import React from 'react'
import { Image } from '../../components'
import { Dimensions, Pressable, StyleSheet, Text, TextInput, View, Modal, TouchableOpacity } from 'react-native'
import { theme } from '../../themes'
import { Icon } from '@draftbit/ui'
import { FlashList } from '@shopify/flash-list'
import TimeAgo from '../../global-functions/TimeAgo'

const ScreenHeight = Dimensions.get('screen').height
const EMOTICONS = ['😀', '😠', '😭', '😳', '😎', '👍', '👎', '🙏']

const PostCommentModal = ({ visible, onDismiss, comments, onAuthorPress, onSendComment }) => {
  const [textInputValue, setTextInputValue] = React.useState('')

  if (!visible) {
    return <></>
  }

  const onSendCommentPress = () => {
    const comment = textInputValue.trim()
    if (comment) {
      onSendComment(comment)
      setTextInputValue('')
    }
  }

  const handleEmoticonPress = (item) => {
    setTextInputValue(textInputValue + item)
  }

  const handleDismiss = () => {
    setTextInputValue('')
    onDismiss()
  }

  const commentAuthorPress = (comment) => {
    onDismiss()
    onAuthorPress(comment.user_id)
  }

  const renderCommentItem = ({ item }) => {
    const profileImage = item.user_profiles?.profile_image

    return (
      <View style={styles.commentContainer}>
        <Pressable onPress={() => commentAuthorPress(item)}>
          <View style={styles.avatarContainer}>
            {profileImage && (
              <Image
                style={styles.avatar}
                source={{
                  uri: profileImage,
                }}
              />
            )}
          </View>
        </Pressable>
        <View style={styles.rightContainer}>
          <View style={styles.usernameContainer}>
            <Text style={styles.username}>{item.user_profiles?.first_name}</Text>
            <Text style={styles.commentTimeAgo}>{TimeAgo(item.created_at)}</Text>
          </View>
          <Text style={styles.commentText}>{item.comment}</Text>
        </View>
      </View>
    )
  }

  return (
    <Modal visible={visible} onDismiss={handleDismiss} transparent animationType="slide">
      <TouchableOpacity onPress={handleDismiss} style={styles.modal} activeOpacity={1} />
      <View style={styles.container}>
        <View style={styles.emoticonsContainer}>
          {EMOTICONS.map((item, index) => (
            <Pressable key={index} onPress={() => handleEmoticonPress(item)}>
              <Text style={styles.emoticon}>{item}</Text>
            </Pressable>
          ))}
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            onChangeText={setTextInputValue}
            style={styles.input}
            
            placeholder={'Type something...'}
            value={textInputValue}
            placeholderTextColor={theme.colors.communityLightBlack}
          />
          <Pressable style={styles.sendButton} disabled={!textInputValue.trim()} onPress={onSendCommentPress}>
            <Icon name={'FontAwesome/send'} size={24} color={theme.colors.communityWhite} />
          </Pressable>
        </View>
        <FlashList data={comments} renderItem={renderCommentItem} estimatedItemSize={50} scrollEnabled />
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  container: {
    backgroundColor: theme.colors['Background'],
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    width: '100%',
    bottom: 0,
    padding: 20,
    position: 'absolute',
    height: ScreenHeight * 0.55,
  },
  emoticonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  emoticon: {
    fontSize: 25,
  },
  inputContainer: {
    backgroundColor: theme.colors.communityWhite,
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  input: {
    borderColor: theme.colors.communityIconFill,
    borderWidth: 1,
    borderRadius: 60,
    marginHorizontal: 12,
    paddingVertical: 15,
    paddingHorizontal: 12,
    flex: 1,
    color: theme.colors['PF-Grey']
  },
  sendButton: {
    height: 48,
    width: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.communityTertiaryGreen,
  },
  commentContainer: {
    flexDirection: 'row',
    paddingTop: 10,
  },
  avatarContainer: {
    height: 40,
    width: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.1)',
    overflow: 'hidden',
  },
  avatar: {
    height: '100%',
    width: '100%',
  },
  rightContainer: {
    justifyContent: 'center',
    marginLeft: 12,
  },
  usernameContainer: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  username: {
    color: theme.colors.communityDarkUI,
    fontFamily: 'Inter_600SemiBold',
    fontSize: 13,
    lineHeight: 19,
    marginRight: 10,
  },
  commentText: {
    color: theme.colors.communityTrueOption,
    fontFamily: 'Inter_400Regular',
    fontSize: 11,
  },
  commentTimeAgo: {
    color: theme.colors['PF-Grey'],
    fontFamily: 'System',
    fontSize: 10,
    fontWeight: '200',
  },
})

export default PostCommentModal
