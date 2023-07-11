import React, { useEffect, useState } from 'react'
import { ActivityIndicator, StyleSheet, TouchableOpacity, View } from 'react-native'
import Video from 'react-native-video'
import { Icon } from '@draftbit/ui'

const VideoPlayer = ({ uri, style, playing, repeat = true, mute = true }) => {
  const [isPlaying, setIsPlaying] = useState(playing)
  const [isMuted, setIsMuted] = useState(mute)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setIsPlaying(playing)
  }, [playing])

  useEffect(() => {
    setIsMuted(mute)
  }, [mute])

  const toggleMute = () => {
    setIsMuted(!isMuted)
  }

  const onVideoLoadComplete = () => {
    setLoading(false)
  }

  return (
    <View style={[styles.main, style]}>
      <Video
        style={styles.video}
        source={{ uri }}
        resizeMode="contain"
        paused={!isPlaying}
        muted={isMuted}
        repeat={repeat}
        onLoad={onVideoLoadComplete}
      />
      <TouchableOpacity disabled={!isPlaying} onPress={toggleMute} style={styles.muteIconContainer}>
        <Icon color="#fff" name={`MaterialIcons/${isMuted ? 'volume-off' : 'volume-up'}`} size={13} />
      </TouchableOpacity>
      {loading && <ActivityIndicator style={styles.loader} size={50} />}
    </View>
  )
}

const styles = StyleSheet.create({
  main: {
    width: '100%',
    height: '100%',
    backgroundColor: '#000',
    overflow: 'hidden',
    justifyContent: 'center',
  },
  video: {
    width: '100%',
    height: '100%',
  },
  muteIconContainer: {
    height: 25,
    aspectRatio: 1,
    borderRadius: 13,
    position: 'absolute',
    right: 20,
    top: 10,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loader: {
    position: 'absolute',
    alignSelf: 'center',
  },
})

export default VideoPlayer
