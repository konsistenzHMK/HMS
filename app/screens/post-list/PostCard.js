import React, { useEffect, useState } from 'react'
import { theme } from '../../themes'
import * as GlobalVariables from '../../config/GlobalVariableContext'
import { BlurImage, Image, VideoPlayer, useSnackbar } from '../../components'
import * as PagalFanBEApi from '../../apis/PagalFanBEApi'
import { Dimensions, Keyboard, Pressable, StyleSheet, Text, View } from 'react-native'
import { Icon } from '@draftbit/ui'
import PostCommentModal from './PostCommentModal'

const ScreenHeight = Dimensions.get('screen').height
export const PostHeight = ScreenHeight * 0.6

const PostCard = ({ post, visible, focused, onSharePress, onHeaderPress }) => {
  const { user_profiles, count_views, id, caption, count_likes, count_comments } = post

  const username = `${user_profiles?.first_name} ${user_profiles?.last_name}`
  const profileImage = user_profiles?.profile_image
  const handle = user_profiles?.handle
  const uri = post?.image_path
  const videoUrl = post?.video_url

  const [liked, setLiked] = useState(false)
  const [likesCount, setLikesCount] = useState(count_likes || 0)
  const [comments, setComments] = useState([])
  const [viewsCount, setViewsCount] = useState(count_views ?? 0)
  const [showCommentModal, setShowCommentModal] = useState(false)

  const Constants = GlobalVariables.useValues()
  const userId = Constants['LOGGED_IN_USER']

  const snackbar = useSnackbar()

  const handleLikePress = async () => {
    setLiked(!liked)

    try {
      snackbar.show({ title: 'Saving post like…' })
      if (liked) {
        await PagalFanBEApi.deletePostLikeDELETEStatusAndText(Constants, {
          postId: id,
          userId,
        })
        setLikesCount(likesCount - 1)
      } else {
        await PagalFanBEApi.addPostLikePOSTStatusAndText(Constants, {
          post_id: id,
          user_id: userId,
        })
        setLikesCount(likesCount + 1)
      }
    } catch (e) {
      // do nothign
    }
  }

  const fetchComments = async () => {
    try {
      const response = await PagalFanBEApi.fetchAllCommentsForAPostGET(Constants, { id })
      setComments(response)
    } catch (e) {
      // do nothing
    }
  }

  useEffect(() => {
    if (!post.viewCountUpdated && focused) {
      PagalFanBEApi.updatePostPATCHViews(Constants, { postId: id, views: viewsCount + 1 })
        .then(() => {
          setViewsCount(viewsCount + 1)
          post.viewCountUpdated = true
        })
        .catch(() => {
          // do nothing
        })
    }
  }, [focused])

  useEffect(() => {
    fetchComments()
  }, [])

  if (!post) {
    return <React.Fragment />
  }

  const handleSendComment = async (comment) => {
    try {
      await PagalFanBEApi.addNewCommentPOST(Constants, {
        comment_text: comment,
        post_id: post.id,
        user_id: Constants['LOGGED_IN_USER'],
      })
      Keyboard.dismiss()
      fetchComments()
    } catch (err) {
      console.error(err)
    }
  }

  const handleCommentPress = () => {
    setShowCommentModal(true)
  }

  const hideCommentModal = () => {
    setShowCommentModal(false)
  }

  return (
    <>
      <View style={styles.postContainer}>
        <Pressable onPress={() => onHeaderPress(post.posted_by_id)} style={styles.postTitleContainer}>
          {profileImage ? (
            <Image style={styles.postUserAvatar} source={{ uri: profileImage }} />
          ) : (
            <Icon name="FontAwesome/user" style={styles.postUserAvatar} size={20} color="#000" />
          )}
          <View>
            <Text style={styles.postUserName}>{username}</Text>
            {handle && <Text style={styles.postUserHandle}>@{handle}</Text>}
          </View>
        </Pressable>
        {visible &&
          (videoUrl ? (
            <VideoPlayer style={styles.postMediaContainer} uri={videoUrl} playing={focused} />
          ) : (
            <BlurImage style={styles.postMediaContainer} resizeMode="cover" blurRadius={50} source={{ uri }}>
              <Image style={styles.postMediaImage} source={{ uri }} resizeMode={'contain'} />
            </BlurImage>
          ))}
        <View style={styles.postActionsContainer}>
          {/* Like */}
          <Pressable onPress={handleLikePress} style={styles.subActionContainer}>
            <Icon size={18} color={theme.colors.communityDarkRed} name={`${liked ? 'FontAwesome' : 'Feather'}/heart`} />
            <Text style={styles.actionCount}>{likesCount}</Text>
          </Pressable>
          {/* comments */}
          <Pressable onPress={handleCommentPress} style={styles.subActionContainer}>
            <Icon
              name={'MaterialCommunityIcons/message-bulleted'}
              size={18}
              color={theme.colors.communityHighlightBlue}
            />
            <Text style={styles.actionCount}>{count_comments}</Text>
          </Pressable>
          {/* views */}
          <View style={styles.subActionContainer}>
            <Icon name={'AntDesign/eye'} size={18} color={theme.colors.communityYellow} />
            <Text style={styles.actionCount}>{viewsCount}</Text>
          </View>
          {/* Share */}
          <Pressable onPress={() => onSharePress(post)}>
            <Icon name={'Ionicons/share'} size={18} color={theme.colors.communityIconFill} />
          </Pressable>
        </View>
        <View style={styles.postCaptionContainer}>
          <Text style={styles.captionText} numberOfLines={3}>
            {caption}
          </Text>
        </View>
      </View>
      {showCommentModal && (
        <PostCommentModal
          visible={showCommentModal}
          onDismiss={hideCommentModal}
          onSendComment={handleSendComment}
          comments={comments}
          onAuthorPress={onHeaderPress}
        />
      )}
    </>
  )
}

const styles = StyleSheet.create({
  postContainer: {
    paddingHorizontal: 10,
    height: PostHeight,
  },
  postTitleContainer: {
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  postUserAvatar: {
    height: 40,
    width: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  postUserName: {
    marginHorizontal: 10,
    fontSize: 15,
    color: '#000',
    fontWeight: '600',
  },
  postUserHandle: {
    marginHorizontal: 10,
    fontSize: 15,
    color: theme.colors.communityLightBlack,
    fontWeight: '600',
  },
  postMediaContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.1)',
    borderRadius: 5,
  },
  postMediaImage: {
    height: '100%',
    width: '100%',
  },
  postActionsContainer: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: '80%',
    height: 50,
    borderRadius: 25,
    marginTop: -25,
    elevation: 2,
  },
  subActionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionCount: {
    color: theme.colors.communityTrueOption,
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 5,
  },
  postCaptionContainer: {
    height: 60,
    paddingTop: 10,
    width: '100%',
  },
  captionText: {
    color: theme.colors.communityTrueOption,
    fontSize: 14,
    fontWeight: '500',
  },
})

export default PostCard
