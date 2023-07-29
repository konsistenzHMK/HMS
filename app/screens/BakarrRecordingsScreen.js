import React, { useEffect, useRef, useState } from 'react'
import { StyleSheet, View, ActivityIndicator, Text } from 'react-native'
import TrackPlayer from 'react-native-track-player'
import BakarrCard from '../components/bakarr-card/BakarrCard'
import { setupPlayer, addTracks, playbackService } from '../utils/TrackPlayerService'
import { ScrollView } from 'react-native-gesture-handler'
import { useTranslation } from 'react-i18next'

import * as PagalFanBEApi from '../apis/PagalFanBEApi'

function BakarrRecordingsScreen(props) {
  const [isPlayerReady, setIsPlayerReady] = useState(false)
  const [currentPlayingId, setCurrentPlayingId] = useState(null)
  const [isPaused, setIsPaused] = useState(true)
  //const { position, duration, buffered } = useProgress(200)
  const { t: translate } = useTranslation()
  const [podcast, setPodcast] = useState([])
  const [yCoordinates, setYCoordinates] = useState(null)
  const [highlight, setHighlight] = useState(false)
  const scrollRef = useRef(null)
  let scrollToId = props.route?.params?.id ?? null

  useEffect(() => {
    TrackPlayer.registerPlaybackService(() => {
      playbackService
    })
  }, [])

  useEffect(() => {
    let scrollToId = props.route?.params?.id ?? null
    if (podcast.length > 0 && scrollToId && yCoordinates) {
      scrollRef.current.scrollTo({
        y: yCoordinates,
        animated: true,
      })
    }
    if (scrollToId) {
      setHighlight(true)
      setTimeout(() => {
        setHighlight(false)
      }, 3000)
    }
  }, [yCoordinates])

  //Start the player when play button is clicked
  const onPressPlay = async (trackUrl, id, heading, subheading) => {
    //condition for resume playing
    if (id === currentPlayingId) {
      TrackPlayer.play()
    }
    //if a new podcast is being played
    else {
      const setup = async (trackUrl) => {
        let isSetup = await setupPlayer(trackUrl)

        const queue = await TrackPlayer.getQueue()
        if (isSetup && queue.length <= 0) {
          await addTracks(trackUrl, id, heading, subheading)
          await TrackPlayer.skipToNext()
        }
        setIsPlayerReady(isSetup)
        TrackPlayer.play()
      }
      //if podcast being played for the first time, setup the player first
      if (!isPlayerReady) {
        setup(trackUrl)
      }
      // reset the track player so as to remove the last podcast and start playing the new one
      else {
        await TrackPlayer.pause()
        await addTracks(trackUrl, id, heading, subheading)
        await TrackPlayer.skipToNext()
        TrackPlayer.play()
      }
      setCurrentPlayingId(id)
    }
    setIsPaused(false)
  }

  const onPressPause = () => {
    TrackPlayer.pause()
    setIsPaused(true)
  }

  return (
    <View style={styles.container}>
      <Text style={styles.mainHeading}> {translate('BakarrRecordingsScreen.Text.Bakarr')}</Text>
      <PagalFanBEApi.FetchFetchAllBakarrRecordingsGET>
        {({ loading, error, data }) => {
          const fetchData = data
          setPodcast(fetchData)
          if (!fetchData || loading) {
            return <ActivityIndicator />
          }
          if (error) {
            return <Text style={{ textAlign: 'center' }}>There was a problem fetching this data</Text>
          }
          return (
            <ScrollView
              bounces={true}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              ref={scrollRef}
            >
              {fetchData.map((podcast) => {
                return (
                  <View
                    onLayout={(event) => {
                      const layout = event.nativeEvent.layout
                      if (podcast.id === scrollToId) {
                        setYCoordinates(layout.y)
                      }
                    }}
                    key={podcast.id}
                  >
                    <BakarrCard
                      id={podcast.id}
                      imageSource={podcast.image_url}
                      heading={podcast.session_title}
                      subheading={podcast.sub_title}
                      description={podcast.description}
                      onPressPlay={onPressPlay}
                      onPressPause={onPressPause}
                      podcastUrl={podcast.session_recorded_link}
                      isPaused={podcast.id !== currentPlayingId || isPaused}
                      highlight={podcast.id === scrollToId && highlight}
                      createdAt={podcast.created_at}
                    />
                  </View>
                )
              })}
            </ScrollView>
          )
        }}
      </PagalFanBEApi.FetchFetchAllBakarrRecordingsGET>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    paddingBottom: 30,
  },
  trackProgress: {
    marginTop: 40,
    textAlign: 'center',
    fontSize: 24,
    color: '#eee',
  },
  mainHeading: {
    fontSize: 20,
    marginTop: 5,
    marginBottom: 5,
    fontWeight: 600,
  },
})

export default BakarrRecordingsScreen
