import { Icon, ScreenContainer } from '@draftbit/ui'
import React, { useEffect, useRef, useState } from 'react'
import { Pressable, StyleSheet, View } from 'react-native'
import { theme } from '../../themes'
import { FlashList } from '@shopify/flash-list'
import * as PagalFanBEApi from '../../apis/PagalFanBEApi'
import * as GlobalVariables from '../../config/GlobalVariableContext'
import PostShareModal from './PostShareModal'
import PostCard, { PostHeight } from './PostCard'

const PostListScreen = ({ navigation, route }) => {
  const Constants = GlobalVariables.useValues()

  const [posts, setPosts] = useState([])
  const [showShareModal, setShowShareModal] = useState(false)
  const selectedPost = useRef(null)
  const [focusedPostIndex, setFocusedPostIndex] = useState(0)

  const fetchNextPosts = async (refresh = false) => {
    try {
      const refetch = refresh || !posts.length
      const id = refetch ? route.params.post_id : posts[posts.length - 1].id

      const response = await PagalFanBEApi.fetchSinglePostWithNext10PostsGET(Constants, { id })

      if (response?.length) {
        let _posts
        if (refetch) {
          _posts = response
        } else {
          response.shift()
          _posts = posts.concat(response)
        }
        setPosts(_posts)
      }
    } catch (e) {
      console.error(e)
    }
  }

  useEffect(() => {
    fetchNextPosts(true)
  }, [])

  const handleSharePress = (post) => {
    selectedPost.current = post
    setShowShareModal(true)
  }

  const hideShareModal = () => {
    selectedPost.current = null
    setShowShareModal(false)
  }

  const showProfileScreen = (userid) => {
    if (userid === Constants['LOGGED_IN_USER']) {
      navigation.navigate('MyProfileScreen')
    } else {
      navigation.navigate('OthersProfileScreen', {
        userid,
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
        onSharePress={handleSharePress}
        onHeaderPress={showProfileScreen}
        visible={visible}
        focused={focused}
        onComment={() => {
          // increase comment by one
          setPosts((prevPosts) => {
            const _posts = [...prevPosts]
            _posts[index].count_comments = (_posts[index].count_comments ?? 0) + 1
            return _posts
          })
        }}
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
        onEndReached={fetchNextPosts}
        onEndReachedThreshold={1}
      />
      {/* ShareModal */}
      {showShareModal && (
        <PostShareModal visible={showShareModal} onDismiss={hideShareModal} post={selectedPost.current} />
      )}
    </ScreenContainer>
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
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default PostListScreen
