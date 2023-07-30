import TrackPlayer, { AppKilledPlaybackBehavior, Capability, RepeatMode, Event } from 'react-native-track-player'

export async function setupPlayer() {
  let isSetup = false
  try {
    await TrackPlayer.getCurrentTrack()
    isSetup = true
  } catch {
    await TrackPlayer.setupPlayer()
    await TrackPlayer.updateOptions({
      android: {
        appKilledPlaybackBehavior: AppKilledPlaybackBehavior.StopPlaybackAndRemoveNotification,
      },
      capabilities: [
        Capability.Play,
        Capability.Pause,
        Capability.SkipToNext,
        Capability.SkipToPrevious,
        Capability.SeekTo,
      ],
      compactCapabilities: [Capability.Play, Capability.Pause, Capability.SkipToNext],
      progressUpdateEventInterval: 2,
    })
    isSetup = true
  }
  return isSetup
}

export async function addTracks(trackUrl, id, heading, subheading) {
  await TrackPlayer.add([
    {
      id: id,
      url: trackUrl,
      title: heading,
      artist: subheading,
    },
  ])
  await TrackPlayer.setRepeatMode(RepeatMode.Off)
}

export async function playbackService() {
  TrackPlayer.addEventListener(Event.RemotePause, () => {
    console.log('Event.RemotePause')
    TrackPlayer.pause()
  })

  TrackPlayer.addEventListener(Event.RemotePlay, () => {
    console.log('Event.RemotePlay')
    TrackPlayer.play()
  })

  TrackPlayer.addEventListener(Event.PlaybackProgressUpdated, () => {
    console.log('Event.PlaybackProgressUpdated')
  })
}
