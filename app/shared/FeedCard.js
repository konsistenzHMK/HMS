import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { BlurImage, Image } from '../components'
import { theme } from '../themes'

export const FeedCard = ({ feed }) => {
  const navigation = useNavigation()

  const handlePress = () => {
    navigation.navigate('PostDetailsScreen', {
      post_id: feed?.id,
    })
  }

  return (
    <Pressable onPress={handlePress} style={styles.main}>
      <BlurImage
        style={styles.blurContainer}
        resizeMode="cover"
        blurRadius={50}
        source={{ uri: `${feed?.image_path}` }}
      >
        <Image resizeMode="contain" style={styles.image} source={{ uri: `${feed?.image_path}` }} />
        {/* Details */}
        <View style={styles.captionContainer}>
          {/* Title */}
          <Text style={styles.captionText} ellipsizeMode={'tail'} numberOfLines={2}>
            {'🖖 '}
            {feed?.caption}
          </Text>
        </View>
      </BlurImage>
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
  },
  captionText: {
    color: theme.colors.custom_rgb255_255_255,
    fontFamily: 'Inter_400Regular',
    fontSize: 10,
    padding: 2,
  },
})
