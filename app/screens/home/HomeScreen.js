import React, { useCallback, useEffect, useRef, useState } from 'react'
import { CircleImage, Divider, Icon, IconButton, Pressable, ScreenContainer, Surface, withTheme } from '@draftbit/ui'
import * as GlobalVariables from '../../config/GlobalVariableContext'
import { useTranslation } from 'react-i18next'
import * as PagalFanBEApi from '../../apis/PagalFanBEApi'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { notificationStore } from '../../store/notification'
import messaging from '@react-native-firebase/messaging'
import branch from 'react-native-branch'
import { RefreshControl, StyleSheet, Text, View } from 'react-native'
import { theme } from '../../themes'
import { HomeBakarCard } from './HomeBakarCard'
import { Logger } from '../../utils/logger'
import { HomeBakarRecordings } from './HomeBakarRecordings'
import { Image, ShimmerPlaceHolder } from '../../components'
import Images from '../../config/Images'
import { HomeMatchList } from './HomeMatchList'
import { FeedCard } from '../../shared'
import { FlashList } from '@shopify/flash-list'

const FEED_PER_PAGE = 10

const HomeScreen = (props) => {
  const Constants = GlobalVariables.useValues()
  const setGlobalVariableValue = GlobalVariables.useSetValue()
  const [unread, setUnread] = useState(false)
  const [feedLoadTimestamp, setFeedLoadTimestamp] = useState(Date.now())
  const [openBakarrPopup,setOpenBakarrPopup] = useState(false)

  const { t: translate } = useTranslation()
  const { theme } = props
  const { navigation } = props

  const [feedData, setFeedData] = useState([])
  const [loadingFeed, setLoadingFeed] = useState(false)
  const page = useRef(0)

  const fetchFeeds = async () => {
    try {
      setLoadingFeed(true)
      const params = {
        limit: FEED_PER_PAGE,
        offset: page.current * FEED_PER_PAGE,
      }
      let data = await PagalFanBEApi.fetchAllPostsGET(Constants, params)

      // append feeds if its not first page
      if (page.current > 0) {
        data = [...feedData, ...data]
      }

      setFeedData(data)
    } catch (e) {
      Logger.error(e)
    }
    setLoadingFeed(false)
  }

  const fetchNextPage = () => {
    if (feedData?.length >= FEED_PER_PAGE && !loadingFeed) {
      page.current++
      fetchFeeds()
    }
  }

  const renderFeedItem = useCallback(({ item }) => {
    return <FeedCard feed={item} style={styles.feedCard} />
  }, [])

  const fetchUserDetails = async () => {
    try {
      const apiResponseResult = await PagalFanBEApi.fetchSingleUserGET(Constants, { id: Constants['LOGGED_IN_USER'] })
      setGlobalVariableValue({
        key: 'user_can_post',
        value: apiResponseResult && apiResponseResult[0]?.can_post,
      })

      if ((apiResponseResult && apiResponseResult?.[0]?.profile_image)?.length > 0) {
        setGlobalVariableValue({
          key: 'user_profile_pic_url',
          value: apiResponseResult && apiResponseResult?.[0]?.profile_image,
        })
      }
      setGlobalVariableValue({
        key: 'user_first_name',
        value: apiResponseResult && apiResponseResult[0]?.first_name,
      })
      setGlobalVariableValue({
        key: 'user_last_name',
        value: apiResponseResult && apiResponseResult[0]?.last_name,
      })
    } catch (err) {
      Logger.error(err)
    }
  }

  const handleDeeplink = (data) => {
    if (data.post_id) {
      navigation.navigate('PostListScreen', {
        post_id: data.post_id,
      })
    }
    if (data.follower_id) {
      navigation.navigate('OthersProfileScreen', {
        userid: data.follower_id,
      })
    }
    if (data.bakarr_post_id) {
      navigation.navigate('BakarrRecordingsScreen', {
        id: data.bakarr_post_id,
        timestamp: Date.now(),
      })
    }
    if(data.shouldOpenBakarrModal){
      setOpenBakarrPopup(true)
    }
  }

  useEffect(() => {
    fetchUserDetails()

    AsyncStorage.getItem('@notification').then((notifications) => {
      if (notifications) {
        notificationStore.update((s) => {
          s.notifications = JSON.parse(notifications)
        })
      }
    })

    messaging()
      .getInitialNotification()
      .then((remoteMessage) => {
        if (remoteMessage) {
          handleDeeplink(remoteMessage.data)
        }
      })

    const u1 = messaging().setBackgroundMessageHandler(async (remoteMessage) => {
      setUnread(true)
      notificationStore.update((s) => {
        s.notifications.push({ ...remoteMessage.notification, time: Date.now(), unread: true })
        AsyncStorage.setItem('@notification', JSON.stringify(s.notifications)).then(() => {
          Logger.log('notification saved')
        })
      })
    })

    const u2 = messaging().onMessage(async (remoteMessage) => {
      setUnread(true)
      notificationStore.update((s) => {
        s.notifications.push({
          ...remoteMessage.notification,
          data: remoteMessage.data,
          time: Date.now(),
          unread: true,
        })
        AsyncStorage.setItem('@notification', JSON.stringify(s.notifications)).then(() => {
          console.log('notification saved')
        })
      })
    })

    const unsubscribe = branch.subscribe({
      onOpenComplete: ({ error, params }) => {
        if (!error) {
          handleDeeplink(params)
        }
      },
    })

    return () => {
      // remove messaging handler
      u1()
      u2()
      unsubscribe()
    }
  }, [])

  useEffect(() => {
    page.current = 0
    fetchFeeds()
  }, [feedLoadTimestamp])

  const handleNotificationIconClick = () => {
    setUnread(false)
    navigation.navigate('NotificationsScreen')
  }

  const onRefreshFeeds = () => {
    setFeedLoadTimestamp(Date.now())
  }

  const keyExtractor = (listData, index) => `${listData?.id}-${index}`

  return (
    <ScreenContainer hasTopSafeArea style={styles.container}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerSubTitle}>{translate('HomeScreen.Text.Yo')}</Text>
          <Text style={styles.headerTitle}>{translate('HomeScreen.Text.PagalFan')}</Text>
        </View>
        <View style={styles.headerRightContainer}>
          <Pressable onPress={handleNotificationIconClick} style={styles.headerNotifIconContainer}>
            {/* Notif */}
            <Icon size={24} name={'Feather/bell'} color={theme.colors['PF-Grey']} />
            {/* New */}
            <Icon
              style={styles.headerNewIcon}
              name={'Entypo/dot-single'}
              color={theme.colors['PF-Primary']}
              size={unread ? 32 : 0}
            />
          </Pressable>
          <Pressable
            onPress={() => {
              navigation.navigate('MyProfileScreen')
            }}
          >
            <Surface style={styles.profileIcon} elevation={3}>
              {/* userpic */}
              {Constants['user_profile_pic_url'] && (
                <CircleImage size={24} source={{ uri: `${Constants['user_profile_pic_url']}` }} />
              )}
            </Surface>
          </Pressable>
        </View>
      </View>
      <HomeBakarCard navigation={navigation} openBakarrPopup={openBakarrPopup ? openBakarrPopup : false}/>
      <FlashList
        data={feedData}
        keyExtractor={keyExtractor}
        showsVerticalScrollIndicator={false}
        numColumns={2}
        renderItem={renderFeedItem}
        onEndReached={fetchNextPage}
        estimatedItemSize={100}
        refreshControl={<RefreshControl refreshing={false} onRefresh={onRefreshFeeds} />}
        ListHeaderComponent={
          <>
            {/* Bakar recordings */}
            <HomeBakarRecordings navigation={navigation} translate={translate} />
            <Divider style={styles.divider} color={theme.colors['PF-Primary']} />

            {/* PF Banner */}
            <Image style={styles.addContaiiner} source={Images.PFBanner1} resizeMode={'stretch'} />
            <Divider style={styles.divider} color={theme.colors['PF-Primary']} />
            {/* Match list */}
            <HomeMatchList navigation={navigation} translate={translate} />
            <Divider style={styles.divider} color={theme.colors['PF-Primary']} />
          </>
        }
        ListEmptyComponent={loadingFeed && !feedData?.length && <FeedLoader />}
      />

      {/* AddPostView */}
      {!Constants['user_can_post'] ? null : (
        <IconButton
          onPress={() => navigation.navigate('CreatePostScreen')}
          style={styles.addPostButton}
          icon={'MaterialIcons/add-circle'}
          color={theme.colors['Secondary']}
          size={50}
        />
      )}
    </ScreenContainer>
  )
}

const FeedLoader = () => {
  return (
    <View style={styles.shimmerContainer}>
      <ShimmerPlaceHolder style={styles.feedShimmer} />
      <ShimmerPlaceHolder style={styles.feedShimmer} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors['PF-BG'],
    marginHorizontal: 10,
    marginTop: 10,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  headerTitleContainer: {
    alignItems: 'flex-start',
  },
  headerTitle: {
    color: theme.colors['PF-Grey'],
    fontFamily: 'Inter_700Bold',
    fontSize: 24,
  },
  headerSubTitle: {
    color: theme.colors['PF-Grey'],
    fontFamily: 'Inter_400Regular',
    fontSize: 12,
  },
  headerRightContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
  },
  headerNotifIconContainer: {
    marginRight: 10,
  },
  headerNewIcon: {
    backgroundColor: '"rgba(0, 0, 0, 0)"',
    position: 'absolute',
    right: -10,
    top: -12,
    zIndex: 2,
  },
  profileIcon: {
    borderRadius: 20,
    justifyContent: 'center',
    overflow: 'hidden',
  },

  addPostButton: {
    bottom: 10,
    position: 'absolute',
    alignSelf: 'center',
    zIndex: 999,
    backgroundColor: '#fff',
    borderRadius: 50,
  },

  divider: {
    height: 0.5,
    marginBottom: 10,
    marginLeft: 80,
    marginTop: 10,
    width: '50%',
  },
  addContaiiner: {
    height: 110,
    width: '100%',
  },

  shimmerContainer: {
    flexDirection: 'row',
  },
  feedShimmer: {
    borderRadius: 12,
    margin: 2,
    marginBottom: 10,
    height: 100,
    width: '49%',
  },

  feedCard: {
    width: '98%',
  },
})

export default withTheme(HomeScreen)
