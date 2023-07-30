import React, { useEffect, useRef, useState } from 'react'
import { StyleSheet, Text } from 'react-native'
import TrackPlayer from 'react-native-track-player'
import BakarrCard from '../components/bakarr-card/BakarrCard'
import { setupPlayer, addTracks, playbackService } from '../utils/TrackPlayerService'
import { useTranslation } from 'react-i18next'
import * as GlobalVariables from '../config/GlobalVariableContext'
import * as PagalFanBEApi from '../apis/PagalFanBEApi'
import { ScreenContainer } from '@draftbit/ui'
import { FlashList } from '@shopify/flash-list'

function BakarrRecordingsScreen({ route }) {
  const [bakarList, setBakarList] = useState([])
  const [isPlayerReady, setIsPlayerReady] = useState(false)
  const [currentPlayingId, setCurrentPlayingId] = useState(-1)
  const [isPaused, setIsPaused] = useState(true)

  const { t: translate } = useTranslation()
  const [highlight, setHighlight] = useState(false)
  const listRef = useRef(null)

  const Constants = GlobalVariables.useValues()

  const fetchBakarRecordings = async () => {
    const response = await PagalFanBEApi.fetchAllBakarrRecordingsGET(Constants)
    setBakarList(response)
  }

  function checkScrollToItem() {
    let scrollToId = route?.params?.id
    const index = bakarList.findIndex((p) => p.id === scrollToId)

    if (index >= 0) {
      listRef.current?.scrollToIndex?.({
        index,
        animated: true,
      })
      setHighlight(scrollToId)
      setTimeout(() => {
        setHighlight(-1)
      }, 3000)
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
      />
    )
  }

  return (
    <ScreenContainer hasTopSafeArea style={styles.container}>
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
  },
})

export default BakarrRecordingsScreen
