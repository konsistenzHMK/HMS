import { Icon } from '@draftbit/ui'
import React from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'

const BakarrCard = ({
  imageSource,
  heading,
  subheading,
  description,
  onPressPlay,
  id,
  podcastUrl,
  onPressPause,
  isPaused,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.thumbnailContainer}>
        <Image source={{ uri: imageSource }} style={styles.thumbnail} />
        <View style={styles.headingContainer}>
          <Text style={styles.heading}>{heading}</Text>
          <Text style={styles.subheading}>{subheading}</Text>
        </View>
      </View>
      <View>
        <Text style={styles.description}>{description}</Text>
      </View>
      <View style={styles.bottomContainer}>
        {isPaused ? (
          <Icon
            style={styles.playIcon}
            name="FontAwesome/play"
            size={25}
            color="black"
            onPress={() => {
              onPressPlay(podcastUrl, id, heading, subheading)
            }}
          />
        ) : (
          <Icon style={styles.playIcon} name="FontAwesome/pause" size={25} color="black" onPress={onPressPause} />
        )}
        <Text style={styles.date}>20th Jul 2023</Text>
      </View>
    </View>
  )
}

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
  },
  bottomContainer: {
    display: 'flex',
    flexDirection: 'row',
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
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  subheading: {
    fontSize: 14,
    color: 'gray',
    flex: 1,
  },
  description: {
    marginTop: 8,
    fontSize: 14,
    color: 'gray',
  },
  date: {
    display: 'flex',
    color: 'gray',
    justifyContent: 'center',
  },
})

export default BakarrCard
