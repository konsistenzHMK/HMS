import React from 'react'
import FastImage from 'react-native-fast-image'
import { BlurView } from '@react-native-community/blur'
import { StyleSheet } from 'react-native'

const BlurImage = (props) => {
  return (
    <FastImage {...props}>
      <BlurView style={styles.blurView} blurAmount={100} blurType="light" />
      {props.children}
    </FastImage>
  )
}

const styles = StyleSheet.create({
  blurView: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
})

export default BlurImage
