import { Icon, withTheme } from '@draftbit/ui'
import React from 'react'
import { View, Text, StyleSheet, Image, Pressable } from 'react-native'

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
}) => {
  const styles = StyleSheet.create({
    container: {
      padding: 10,
      backgroundColor: 'white',
      borderRadius: 8,
      marginBottom: 16,
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 4,
      elevation: 6,
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
      marginRight: 5,
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
      color: 'rgb(153, 153, 153)',
      justifyContent: 'center',
      marginLeft: 5,
      marginTop: 4.3,
      fontFamily: 'Rubik_400Regular',
    },
    highlight: {
      borderWidth: 1,
      borderColor: '#FF4545',
    },
  })

  const convertUtcToDateString = (utcString) => {
    const dateObject = new Date(utcString)

    const options = { day: 'numeric', month: 'long', year: 'numeric' }
    const dateString = dateObject.toLocaleDateString(undefined, options)

    const day = dateObject.getDate()
    const daySuffix = getDaySuffix(day)
    return dateString.replace('{day}', `${day}${daySuffix}`)
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
          <Text style={styles.heading}>{heading}</Text>
          <Text style={styles.subheading}>{subheading}</Text>
        </View>
      </View>
      <Text style={styles.description}>{description}</Text>
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
          <Text style={styles.date}>{convertUtcToDateString(createdAt)}</Text>
        </View>
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
