import React, { useEffect, useState } from 'react'
import { Modal, useSnackbar } from '../../components'
import * as GlobalVariables from '../../config/GlobalVariableContext'
import branch from 'react-native-branch'
import openShareUtil from '../../utils/openShare'
import * as PagalFanBEApi from '../../apis/PagalFanBEApi'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { Icon } from '@draftbit/ui'
import { theme } from '../../themes'

const PostShareModal = ({ visible, onDismiss, post }) => {
  const [postSaved, setPostSaved] = useState(false)
  const snackbar = useSnackbar()
  const Constants = GlobalVariables.useValues()
  const userId = Constants['LOGGED_IN_USER']

  const handleSharePress = async () => {
    if (!post) {
      return
    }

    try {
      let buo = await branch.createBranchUniversalObject(`post/${post.id}`, {
        title: post.caption,
        contentImageUrl: post.image_path,
        contentMetadata: {
          customMetadata: {
            post_id: String(post.id),
          },
        },
      })

      const response = await buo.generateShortUrl()
      openShareUtil(response.url)
      onDismiss()
    } catch (e) {
      console.error(e)
    }
  }

  const handleSavePress = async () => {
    try {
      if (!postSaved) {
        snackbar.show({ title: 'Saving post …' })
        await PagalFanBEApi.addPostSavePOST(Constants, {
          post_id: post.id,
          user_id: userId,
        })
      } else {
        await PagalFanBEApi.deletePostSaveDELETE(Constants, {
          postId: post.id,
          userId: userId,
        })
      }
      setPostSaved(!postSaved)
    } catch (err) {
      console.error(err)
    }
  }

  const handleReportPress = () => {
    snackbar.show({ title: 'Reporting post to admin…' })
  }

  const fetchPostSaved = async () => {
    try {
      const response = await PagalFanBEApi.fetchPostSaveGET(Constants, { postId: post.id, userId })
      setPostSaved(response.length > 0)
    } catch (e) {
      // do nothing
    }
  }

  useEffect(() => {
    if (visible) {
      fetchPostSaved()
    }
  }, [visible])

  if (!visible) {
    return <></>
  }

  return (
    <Modal visible={visible} onDismiss={onDismiss}>
      <View style={styles.shareModalContainer}>
        <View style={styles.shareModalSmallLine} />
        {/* ActionLinks */}
        <View style={styles.shareModalActionsContainer}>
          {/* PressableShare */}
          <Pressable onPress={handleSharePress}>
            <Icon
              style={styles.shareModalActionIcon}
              size={24}
              name={'AntDesign/sharealt'}
              color={theme.colors['PF-Grey']}
            />
            <Text style={styles.shareModalActionText}>{'Share'}</Text>
          </Pressable>
          {/* PressableSave */}
          <Pressable onPress={handleSavePress}>
            <Icon
              style={styles.shareModalActionIcon}
              size={24}
              color={theme.colors['PF-Grey']}
              name={postSaved ? 'Ionicons/bookmark' : 'Ionicons/bookmark-outline'}
            />
            <Text style={styles.shareModalActionText}>{postSaved ? 'Unsave' : 'Save'}</Text>
          </Pressable>
          {/* PressableReport */}
          <Pressable onPress={handleReportPress}>
            <Icon
              style={styles.shareModalActionIcon}
              size={24}
              name={'Octicons/report'}
              color={theme.colors['Community_Dark_Red']}
            />

            <Text style={styles.shareModalActionText}>{'Report...'}</Text>
          </Pressable>
        </View>
        <View style={styles.shareModalDivider} />
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  shareModalContainer: {
    backgroundColor: theme.colors['Background'],
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    width: '100%',
    bottom: 0,
    height: 140,
    paddingVertical: 5,
    paddingHorizontal: 20,
    position: 'absolute',
  },
  shareModalSmallLine: {
    alignSelf: 'center',
    backgroundColor: '#000',
    height: 2,
    width: 20,
    marginTop: 10,
    marginBottom: 20,
  },
  shareModalDivider: {
    backgroundColor: theme.colors['PF-Grey'],
    height: 1,
    marginHorizontal: 20,
    marginVertical: 10,
  },
  shareModalActionsContainer: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-evenly',
  },
  shareModalActionIcon: {
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: theme.colors['PF-Grey'],
    borderRadius: 50,
    borderWidth: 1,
    height: 50,
    width: 50,
  },
  shareModalActionText: {
    alignSelf: 'center',
    color: theme.colors['PF-Grey'],
    fontFamily: 'Rubik_400Regular',
    fontSize: 12,
    marginTop: 2,
  },
})

export default PostShareModal
