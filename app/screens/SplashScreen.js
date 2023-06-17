import React from 'react'
import { Image, StyleSheet } from 'react-native'

const SPLASH_SOURCE = require('../assets/app/splash.png')

const SplashScreen = () => {
  return <Image source={SPLASH_SOURCE} style={style.main} />
}

const style = StyleSheet.create({
  main: {
    height: '100%',
    width: '100%',
  },
})

export default SplashScreen
