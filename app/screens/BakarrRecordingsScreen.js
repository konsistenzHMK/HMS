import React, { useEffect, useRef, useState } from 'react'
import { StyleSheet, Text, View, useWindowDimensions } from 'react-native'
import TrackPlayer from 'react-native-track-player'
import { Event } from 'react-native-track-player'
import BakarrCard from '../components/bakarr-card/BakarrCard'
import { setupPlayer, addTracks } from '../utils/TrackPlayerService'
import openShareUtil from '../utils/openShare'
import { useTranslation } from 'react-i18next'
import * as GlobalVariables from '../config/GlobalVariableContext'
import * as PagalFanBEApi from '../apis/PagalFanBEApi'
import { Circle, Icon, ScreenContainer, Touchable } from '@draftbit/ui'
import { FlashList } from '@shopify/flash-list'
import branch from 'react-native-branch'

function BakarrRecordingsScreen({ navigation, route }) {
  const [bakarList, setBakarList] = useState([])
  const [isPlayerReady, setIsPlayerReady] = useState(false)
  const [currentPlayingId, setCurrentPlayingId] = useState(-1)
  const [isPaused, setIsPaused] = useState(true)

  const { t: translate } = useTranslation()
  const [highlight, setHighlight] = useState(false)
  const listRef = useRef(null)

  const Constants = GlobalVariables.useValues()

  const dimensions = useWindowDimensions()

  const fetchBakarRecordings = async () => {
    const response = await PagalFanBEApi.fetchAllBakarrRecordingsGET(Constants)
    setBakarList(response)
  }

  function checkScrollToItem() {
    let scrollToId = Number(route?.params?.id)
    const index = bakarList.findIndex((p) => p.id === scrollToId)
    if (index >= 0) {
      listRef.current?.scrollToIndex?.({
        index,
        animated: true,
      })
      setHighlight(scrollToId)
      const trackToPlay = bakarList[index]
      // onTogglePlayPress(trackToPlay.session_recorded_link, trackToPlay.id, trackToPlay.session_title, trackToPlay.sub_title)
      setTimeout(() => {
        setHighlight(-1)
      }, 3000)
    }
  }

  async function playbackService() {
    TrackPlayer.addEventListener(Event.RemotePause, () => {
      TrackPlayer.pause()
      setIsPaused(true)
    })

    TrackPlayer.addEventListener(Event.RemotePlay, () => {
      TrackPlayer.play()
      setIsPaused(false)
    })

    TrackPlayer.addEventListener(Event.PlaybackProgressUpdated, () => {})
  }

  const handleSharePress = async (bakarrPost) => {
    if (!bakarrPost) {
      return
    }

    try {
      let buo = await branch.createBranchUniversalObject(`bakarrRecordings/${bakarrPost.id}`, {
        title: bakarrPost.session_title,
        contentImageUrl: bakarrPost.image_url,
        contentMetadata: {
          customMetadata: {
            bakarr_post_id: String(bakarrPost.id),
          },
        },
      })

      const response = await buo.generateShortUrl()
      openShareUtil(response.url)
    } catch (e) {
      console.error(e)
    }
  }

  useEffect(() => {
    TrackPlayer.registerPlaybackService(() => playbackService)
    fetchBakarRecordings()
  }, [])

  useEffect(() => {
    checkScrollToItem()
  }, [bakarList])

  useEffect(() => {
    checkScrollToItem()
    // timestamp will be updated on if screen lanched from home screen this will fix the issue of not showing highlight on 2nd time from home
  }, [route?.params?.id, route?.params?.timestamp])

  const onTogglePlayPress = async (trackUrl, id, heading, subheading) => {
    if (id === currentPlayingId) {
      // case of play/pause same track
      isPaused ? TrackPlayer.play() : TrackPlayer.pause()
      setIsPaused(!isPaused)
      return
    }

    //if podcast being played for the first time, setup the player first
    if (!isPlayerReady) {
      let isSetup = await setupPlayer()
      setIsPlayerReady(isSetup)
    }

    await TrackPlayer.pause()
    await addTracks(trackUrl, id, heading, subheading)
    await TrackPlayer.skipToNext()
    TrackPlayer.play()
    setIsPaused(false)
    setCurrentPlayingId(id)
  }

  const renderItem = ({ item }) => {
    const { id, image_url, session_title, sub_title, description, session_recorded_link, created_at } = item
    return (
      <BakarrCard
        id={id}
        imageSource={image_url}
        heading={session_title}
        subheading={sub_title}
        description={description}
        onTogglePlayPress={onTogglePlayPress}
        podcastUrl={session_recorded_link}
        isPaused={id !== currentPlayingId || isPaused}
        highlight={id === highlight}
        createdAt={created_at}
        handleSharePress={handleSharePress}
        item={item}
      />
    )
  }

  const styles = StyleSheet.create({
    container: {
      paddingHorizontal: 10,
    },
    trackProgress: {
      marginTop: 40,
      textAlign: 'center',
      fontSize: 24,
      color: '#eee',
    },
    mainHeading: {
      fontSize: 20,
      marginVertical: 10,
      fontWeight: 600,
      fontFamily: 'Rubik_700Bold',
      color: 'rgb(60, 63, 66)',
    },
  })

  return (
    <ScreenContainer hasTopSafeArea style={styles.container}>
      {/* Back Frame */}
      <View style={{ paddingTop: 16, paddingBottom: 4 }}>
        <Touchable
          onPress={() => {
            try {
              navigation.navigate('HomeScreen')
            } catch (error) {
              console.log(error)
            }
          }}
        >
          <Circle size={31} bgColor="rgb(244, 246, 249)">
            <Icon name={'Ionicons/caret-back'} size={18} color="rgb(135, 140, 144)" />
          </Circle>
        </Touchable>
      </View>
      <Text style={styles.mainHeading}> {translate('BakarrRecordingsScreen.Text.Bakarr')}</Text>
      <FlashList
        bounces={true}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        ref={listRef}
        data={bakarList}
        renderItem={renderItem}
        estimatedItemSize={150}
        extraData={`${currentPlayingId} ${isPaused} ${highlight}`}
      />
    </ScreenContainer>
  )
}

export default BakarrRecordingsScreen
