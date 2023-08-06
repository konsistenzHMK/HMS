import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { BlurImage, Image } from '../components'
import { theme } from '../themes'
import { Icon } from '@draftbit/ui'

export const FeedCard = ({ feed, onPress }) => {
  const navigation = useNavigation()

  const { image_path: uri, video_url } = feed

  const handlePress = () => {
    if (onPress) {
      onPress()
      return
    }

    navigation.navigate('PostListScreen', {
      post_id: feed?.id,
    })
  }

  return (
    <Pressable onPress={handlePress} style={styles.main}>
      {uri && (
        <BlurImage style={styles.blurContainer} resizeMode="cover" blurRadius={50} source={{ uri }}>
          <Image resizeMode="contain" style={styles.image} source={{ uri }} />
        </BlurImage>
      )}
      {video_url && <Icon style={styles.videoIcon} name="FontAwesome/video-camera" size={12} color="#fff" />}
      {/* Details */}
      <View style={styles.captionContainer}>
        {/* Title */}
        <Text style={styles.captionText} ellipsizeMode={'tail'} numberOfLines={2}>
          {'🖖 '}
          {feed?.caption}
        </Text>
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  main: {
    marginVertical: 5,
    width: '49%',
    margin: 2,
    height: 130,
    elevation: 10,
  },
  blurContainer: {
    flex: 1,
    borderRadius: 12,
  },
  image: {
    height: '100%',
    width: '100%',
  },
  captionContainer: {
    alignItems: 'flex-start',
    backgroundColor: theme.colors['Studily_Opacity_25'],
    bottom: 0,
    padding: 4,
    height: 40,
    position: 'absolute',
    width: '100%',
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  captionText: {
    color: theme.colors.custom_rgb255_255_255,
    fontFamily: 'Inter_400Regular',
    fontSize: 10,
    padding: 2,
  },
  videoIcon: {
    position: 'absolute',
    right: 5,
    top: 5,
    backgroundColor: 'rgba(0,0,0,0.1)',
    height: 22,
    width: 22,
    borderRadius: 11,
  },
})