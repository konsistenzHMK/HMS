import React, { useEffect, useRef } from 'react'
import { Animated, Dimensions, Pressable, StyleSheet } from 'react-native'

const ScreenHeight = Dimensions.get('screen').height

const Modal = ({ visible, children, onDismiss }) => {
  const translateY = useRef(new Animated.Value(ScreenHeight)).current

  useEffect(() => {
    visible ? showModal() : hideModal()
  }, [visible])

  function showModal() {
    Animated.timing(translateY, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start()
  }

  function hideModal() {
    Animated.timing(translateY, {
      toValue: ScreenHeight,
      duration: 300,
      useNativeDriver: true,
    }).start()
  }

  const animatedStyle = {
    transform: [{ translateY }],
  }

  return (
    <Animated.View style={[styles.main, animatedStyle]}>
      <Pressable onPress={onDismiss} style={styles.body} />
      {children}
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  main: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  body: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
})

export default Modal
