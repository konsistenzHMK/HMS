import { Icon } from '@draftbit/ui'
import React from 'react'
import { View, Text, StyleSheet, Image, Pressable } from 'react-native'
import convertUTCtoIST from '../../global-functions/convertUTCtoIST'

const BakarrCard = ({
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
}) => {
  return (
    <View style={[styles.container, highlight && styles.highlight]}>
      <View style={styles.thumbnailContainer}>
        <Image source={{ uri: imageSource }} style={styles.thumbnail} />
        <View style={styles.headingContainer}>
          <Text style={styles.heading}>{heading}</Text>
          <View>
            <Text style={styles.subheading}>{subheading}</Text>
          </View>
        </View>
      </View>
      <Text style={styles.description}>{description}</Text>
      <View style={styles.bottomContainer}>
        <Pressable
          onPress={() => {
            onTogglePlayPress(podcastUrl, id, heading, subheading)
          }}
        >
          <Icon
            style={styles.playIcon}
            size={25}
            name={`FontAwesome/${isPaused ? 'play' : 'pause'}`}
            color={highlight ? '#f2aaa5' : 'black'}
          />
        </Pressable>
        <Text style={styles.date}>{convertUTCtoIST(createdAt)}</Text>
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
    marginLeft: 5,
    marginTop: 2,
  },
  highlight: {
    borderWidth: 1,
    borderColor: 'gray',
  },
})

export default BakarrCard
