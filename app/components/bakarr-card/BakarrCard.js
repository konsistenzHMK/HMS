import { Icon, withTheme } from '@draftbit/ui'
import React from 'react'
import { View, Text, StyleSheet, Image, Pressable } from 'react-native'
import CaptionContainer from '../caption-container/CaptionContainer'
import TrackPlayer, { useProgress } from 'react-native-track-player'
import { Slider } from '@miblanchard/react-native-slider'

const BakarrCard = ({
  theme,
  imageSource,
  heading,
  subheading,
  description,
  id,
  podcastUrl,
  onTogglePlayPress,
  isPaused,
  highlight,
  createdAt,
  handleSharePress,
  item,
  currentPlayingId
}) => {
  const { duration, position } = useProgress(1000)

  const styles = StyleSheet.create({
    container: {
      padding: 10,
      backgroundColor: 'white',
      borderRadius: 8,
      marginBottom: 16,
      marginHorizontal: 1,
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 4,
      elevation: 3,
    },
    thumbnailContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    headingContainer: {
      marginLeft: 10,
      flex: 1,
    },
    bottomContainer: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 2,
      textAlign: 'center',
      alignContent: 'center',
      alignItems: "center"
    },
    thumbnail: {
      width: 80,
      height: 80,
      borderRadius: 8,
    },
    playButton: {
      // backgroundColor: '#333333',
      width: 45,
      height: 45,
      borderRadius: 50,
      alignItems: 'center',
    },
    playIcon: {
      // backgroundColor: 'gray',
      // borderRadius: 100,
      // marginRight: 5,
    },
    contentContainer: {
      flex: 1,
      marginLeft: 16,
    },
    heading: {
      fontSize: 17,
      fontWeight: 'bold',
      color: 'rgb(102, 102, 102)',
      fontFamily: 'Rubik_600SemiBold',
    },
    subheading: {
      fontSize: 13,
      color: 'rgb(102, 102, 102)',
      fontFamily: 'Rubik_300Light',
      flex: 1,
      marginTop: 5,
    },
    description: {
      marginTop: 8,
      fontSize: 13,
      color: 'rgb(102, 102, 102)',
      fontFamily: 'Rubik_300Light',
    },
    date: {
      display: 'flex',
      color: theme.colors['PF-Primary'],
      justifyContent: 'center',
      fontFamily: 'Rubik_500Medium',
      opacity:0.7
    },
    highlight: {
      borderWidth: 1,
      borderColor: '#FF4545',
    },
    seekButton: {
      marginHorizontal: 6,
      width: 33,
      justifyContent: 'center',
      borderWidth: 1,
      borderRadius: 50,
      borderColor: theme.colors['PF-Grey'],
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
    },
  })

  function convertUtcToDateString(utcTimeString) {
    const utcDate = new Date(utcTimeString)
    const dd = String(utcDate.getUTCDate()).padStart(2, '0')
    const mm = String(utcDate.getUTCMonth() + 1).padStart(2, '0') // Months are zero-based
    const yy = String(utcDate.getUTCFullYear()).slice(-2)

    return `${dd}-${mm}-${yy}`
  }

  function formatTime(seconds) {
    const totalSeconds = Math.floor(seconds); // Round down to nearest whole second
  
    const minutes = Math.floor(totalSeconds / 60);
    const remainingSeconds = totalSeconds % 60;
  
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');
  
    return `${formattedMinutes}:${formattedSeconds}`;
  }


  const getDaySuffix = (day) => {
    if (day >= 11 && day <= 13) {
      return 'th'
    }
    const lastDigit = day % 10
    switch (lastDigit) {
      case 1:
        return 'st'
      case 2:
        return 'nd'
      case 3:
        return 'rd'
      default:
        return 'th'
    }
  }

  return (
    <View style={[styles.container, highlight && styles.highlight]}>
      <View style={styles.thumbnailContainer}>
        <Image source={{ uri: imageSource }} style={styles.thumbnail} />
        <View style={styles.headingContainer}>
          <Text style={styles.date}>{convertUtcToDateString(createdAt)}</Text>
          <Text style={styles.heading}>{heading}</Text>
          <Text style={styles.subheading}>{subheading}</Text>
        </View>
      </View>
      <View style={styles.description}>
        <CaptionContainer text={description} maxChars={90} textColor="rgb(102, 102, 102)" />
      </View>
      <View style={styles.bottomContainer}>
        <View style={{ flexDirection: 'row' }}>
          <Pressable
            onPress={() => {
              onTogglePlayPress(podcastUrl, id, heading, subheading)
            }}
          >
            <Icon
              style={styles.playIcon}
              size={25}
              name={`FontAwesome/${isPaused ? 'play' : 'pause'}`}
              color={highlight ? '#FF4545' : 'black'}
            />
          </Pressable>
        </View>
        {(currentPlayingId == id) && (
        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems:"center" }}>
          <Pressable
            style={styles.seekButton}
            onPress={() => {
              TrackPlayer.seekTo(Math.max(0, position - 10))
            }}
          >
            <Text>-10</Text>
          </Pressable>
          
          <Text>{formatTime(position)}</Text>
          <View style={{width:120, marginHorizontal:4}}>
          <Slider
            minimumValue={0}
            maximumValue={duration}
            value={position}
            onSlidingComplete={val => {
              TrackPlayer.seekTo(Number(val));
            }}
          />
          </View>
          <Text>{formatTime(duration)}</Text>
          <Pressable
            style={styles.seekButton}
            onPress={() => {
              TrackPlayer.seekTo(Math.min(duration, position + 10))
            }}
          >
            <Text>+10</Text>
          </Pressable>
        </View>
      )}
        <Pressable onPress={() => handleSharePress(item)}>
          <Icon
            style={styles.shareModalActionIcon}
            size={24}
            name={'AntDesign/sharealt'}
            color={theme.colors['PF-Grey']}
          />
        </Pressable>
      </View>

    </View>
  )
}

export default withTheme(BakarrCard)
