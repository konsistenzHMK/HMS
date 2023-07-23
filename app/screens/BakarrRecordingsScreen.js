import React, { useEffect, useState } from 'react'
import { SafeAreaView, StyleSheet, View, Button, ActivityIndicator, Text } from 'react-native'
import TrackPlayer, { useProgress } from 'react-native-track-player'
import BakarrCard from '../components/bakarr-card/BakarrCard'
import { setupPlayer, addTracks } from '../utils/TrackPlayerService'
import { ScrollView } from 'react-native-gesture-handler'

import * as PagalFanBEApi from '../apis/PagalFanBEApi'

function BakarrRecordingsScreen() {
  const [isPlayerReady, setIsPlayerReady] = useState(false)
  const [currentPlayingId, setCurrentPlayingId] = useState(null)
  const [isPaused, setIsPaused] = useState(true)
  //const { position, duration, buffered } = useProgress(200)

  function TrackProgress() {
    function format(seconds) {
      let mins = parseInt(seconds / 60)
        .toString()
        .padStart(2, '0')
      let secs = (Math.trunc(seconds) % 60).toString().padStart(2, '0')
      return `${mins}:${secs}`
    }

    return (
      <View>
        <Text style={styles.trackProgress}>
          {format(position)} / {format(duration)}
        </Text>
      </View>
    )
  }

  //Start the player when play button is clicked
  const onPressPlay = async (trackUrl, id, heading, subheading) => {
    //condition for resume playing
    if (id === currentPlayingId) {
      TrackPlayer.play()
    }
    //if a new podcast is being played
    else {
      async function setup(trackUrl) {
        let isSetup = await setupPlayer(trackUrl)

        const queue = await TrackPlayer.getQueue()
        if (isSetup && queue.length <= 0) {
          await TrackPlayer.reset()
          await addTracks(trackUrl)
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
        await TrackPlayer.reset()
        await addTracks(trackUrl, id, heading, subheading)
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
    <SafeAreaView style={styles.container}>
      <Text style={styles.mainHeading}>Past Bakarr Sessions</Text>

      <PagalFanBEApi.FetchFetchAllBakarrRecordingsGET>
        {({ loading, error, data, refetchFetchAllBakarrRecordings }) => {
          const fetchData = data
          if (!fetchData || loading) {
            return <ActivityIndicator />
          }
          if (error) {
            return <Text style={{ textAlign: 'center' }}>There was a problem fetching this data</Text>
          }
          return (
            <ScrollView bounces={true} showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
              {fetchData.map((podcast) => {
                return (
                  <BakarrCard
                    id={podcast.id}
                    imageSource={podcast.image_url}
                    heading={podcast.session_title}
                    subheading={podcast.sub_title}
                    description={podcast.description}
                    key={podcast.id}
                    onPressPlay={onPressPlay}
                    onPressPause={onPressPause}
                    podcastUrl={podcast.session_recorded_link}
                    isPaused={podcast.id !== currentPlayingId || isPaused}
                  />
                )
              })}
            </ScrollView>
          )
        }}
      </PagalFanBEApi.FetchFetchAllBakarrRecordingsGET>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: 'white',
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
