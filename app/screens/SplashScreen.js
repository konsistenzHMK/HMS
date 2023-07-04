import React from 'react'
import { Image, StatusBar, StyleSheet, View } from 'react-native'

const SPLASH_SOURCE = require('../assets/app/splash.png')

const SplashScreen = () => {
  return (
    <View>
      <StatusBar hidden />
      <Image source={SPLASH_SOURCE} style={style.main} />
    </View>
  )
}

const style = StyleSheet.create({
  main: {
    height: '100%',
    width: '100%',
  },
})

export default SplashScreen
