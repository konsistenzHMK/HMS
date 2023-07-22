import { Icon, ScreenContainer } from '@draftbit/ui'
import React, { useEffect, useRef, useState } from 'react'
import { Dimensions, Pressable, StyleSheet, Text, View } from 'react-native'
import { theme } from '../themes'
import { FlashList } from '@shopify/flash-list'
import { BlurImage, Image, Modal, VideoPlayer, useSnackbar } from '../components'
import * as PagalFanBEApi from '../apis/PagalFanBEApi'
import * as GlobalVariables from '../config/GlobalVariableContext'
import { getMimeTypeFromFilename } from '@shopify/mime-types'
import openShareUtil from '../utils/openShare'
import branch from 'react-native-branch'

/** Todo
 * Add Comment Modal
 * Add pagination
 * post viewed api
 */

const ScreenHeight = Dimensions.get('screen').height
const PostHeight = ScreenHeight * 0.6

const PostListScreen = ({ navigation, route }) => {
  const Constants = GlobalVariables.useValues()

  const [posts, setPosts] = useState([])
  const [showShareModal, setShowShareModal] = useState(false)
  const selectedPost = useRef(null)
  const [focusedPostIndex, setFocusedPostIndex] = useState(0)
  const fetchNextPosts = async (id) => {
    try {
      const response = await PagalFanBEApi.fetchSinglePostWithNext10PostsGET(Constants, { id })
      if (!posts.length) {
        setPosts(response)
      }
    } catch (e) {
      console.error(e)
    }
  }

  useEffect(() => {
    fetchNextPosts(route.params.post_id)
  }, [])

  const handleCommentPress = () => {}

  const handleSharePress = (post) => {
    selectedPost.current = post
    setShowShareModal(true)
  }

  const hideShareModal = () => {
    selectedPost.current = null
    setShowShareModal(false)
  }

  const handlePostHeaderPress = (item) => {
    const userid = item?.posted_by_id
    if (userid === Constants['LOGGED_IN_USER']) {
      navigation.navigate('MyProfileScreen')
    } else {
      navigation.navigate('OthersProfileScreen', {
        userid: item?.posted_by_id,
      })
    }
  }

  const renderPost = ({ item, index }) => {
    const visible = Math.abs(focusedPostIndex - index) <= 1
    const focused = index === focusedPostIndex

    return (
      <PostCard
        key={`${item.id}`}
        post={item}
        onCommentPress={handleCommentPress}
        onSharePress={handleSharePress}
        onHeaderPress={handlePostHeaderPress}
        visible={visible}
        focused={focused}
      />
    )
  }

  const onPostScroll = ({ nativeEvent }) => {
    const { contentOffset, layoutMeasurement } = nativeEvent

    // find the minimum item index on screen
    const index = Math.floor(contentOffset.y / PostHeight)

    const focusA = PostHeight * (index + 1) - contentOffset.y // find focused height of fist item on screen
    const focusB = layoutMeasurement.height - focusA // find focused height of second item on screen
    const fIndex = focusA > focusB ? index : index + 1
    if (fIndex !== focusedPostIndex) {
      setFocusedPostIndex(fIndex)
    }
  }

  return (
    <ScreenContainer hasSafeArea>
      <View style={styles.header}>
        <Pressable style={styles.backButtonContainer} onPress={navigation.goBack}>
          <Icon name={'Ionicons/caret-back'} size={20} color={theme.colors.communityIconFill} />
        </Pressable>
      </View>
      <FlashList
        data={posts}
        renderItem={renderPost}
        onScroll={onPostScroll}
        keyExtractor={(item) => `${item.id}`}
        extraData={focusedPostIndex}
        estimatedItemSize={PostHeight}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={100}
      />
      {/* ShareModal */}
      {showShareModal && <ShareModal visible={showShareModal} onDismiss={hideShareModal} post={selectedPost.current} />}
    </ScreenContainer>
  )
}

const PostCard = ({ post, onCommentPress, visible, focused, onSharePress, onHeaderPress }) => {
  const { user_profiles, count_views, id, caption } = post

  const username = `${user_profiles?.first_name} ${user_profiles?.last_name}`
  const profileImage = user_profiles?.profile_image
  const handle = user_profiles?.handle

  const type = getMimeTypeFromFilename(post?.image_path)
  const isVideo = type && type.includes('video')

  const [liked, setLiked] = useState(false)
  const [likesCount, setLikesCount] = useState(0)

  const [commentsCount, setCommentsCount] = useState(0)
  const [viewsCount, setViewsCount] = useState(count_views ?? 0)

  const viewUpdatedRef = useRef(false)
  const [uri, setUri] = useState(isVideo ? null : post?.image_path)

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
      } else {
        await PagalFanBEApi.addPostLikePOSTStatusAndText(Constants, {
          post_id: id,
          user_id: userId,
        })
      }
      fetchLikesCount()
    } catch (e) {
      // do nothign
    }
  }

  const fetchLikesCount = async () => {
    const response = await PagalFanBEApi.fetchPostLikeGETCount(Constants, { postId: id, userId })
    response.map((item) => {
      if (item.post_id == id && item.user_id == userId) {
        setLiked(true)
      }
    })
    setLikesCount(response.length)
  }

  const fetchCommentsCount = async () => {
    try {
      const response = await PagalFanBEApi.fetchAllCommentsForAPostGET(Constants, { id })
      setCommentsCount(response.length)
    } catch (e) {
      // do nothing
    }
  }

  const updateViewsCount = async () => {
    if (viewUpdatedRef.current) {
      return
    }

    try {
      await PagalFanBEApi.updatePostPATCHViews(Constants, { postId: id, views: viewsCount + 1 })
      setViewsCount(viewsCount + 1)
      viewUpdatedRef.current = true
    } catch (e) {
      // do nothing
    }
  }

  useEffect(() => {
    fetchLikesCount()
    fetchCommentsCount()
  }, [])

  if (!post) {
    return <React.Fragment />
  }

  return (
    <View style={styles.postContainer}>
      <Pressable onPress={() => onHeaderPress(post)} style={styles.postTitleContainer}>
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
      {visible ? (
        isVideo ? (
          <VideoPlayer style={styles.postMediaContainer} uri={post?.image_path} playing={focused} />
        ) : (
          <BlurImage style={styles.postMediaContainer} resizeMode="cover" blurRadius={50} source={{ uri }}>
            <Image style={styles.postMediaImage} source={{ uri }} resizeMode={'contain'} />
          </BlurImage>
        )
      ) : (
        <></>
      )}

      <View style={styles.postActionsContainer}>
        {/* Like */}
        <Pressable onPress={handleLikePress} style={styles.subActionContainer}>
          <Icon size={18} color={theme.colors.communityDarkRed} name={`${liked ? 'FontAwesome' : 'Feather'}/heart`} />
          <Text style={styles.actionCount}>{likesCount}</Text>
        </Pressable>
        {/* comments */}
        <View style={styles.subActionContainer}>
          <Icon
            name={'MaterialCommunityIcons/message-bulleted'}
            size={18}
            color={theme.colors.communityHighlightBlue}
          />
          <Text style={styles.actionCount}>{commentsCount}</Text>
        </View>
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
  )
}

const ShareModal = ({ visible, onDismiss, post }) => {
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
  header: {
    paddingHorizontal: 10,
    height: 60,
    justifyContent: 'center',
    backgroundColor: '#fff',
    elevation: 1,
  },
  backButtonContainer: {
    height: 40,
    width: 40,
    borderRadius: 20,
    backgroundColor: '#fff',
    // elevation: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
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

export default PostListScreen
