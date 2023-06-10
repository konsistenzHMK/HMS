import React, { useRef, useState } from 'react'
import { StyleSheet, Text, Animated } from 'react-native'
import { SnackbarContext } from './SnackbarContext'

const SnackbarProvider = ({ children }) => {
  const [snackbarVisible, setSnackbarVisible] = useState(false)
  const [snackbarTitle, setSnackbarTitle] = useState('')
  const [snackbarVariant, setSnackbarVariant] = useState()
  const opacity = useRef(new Animated.Value(0)).current

  const show = (params) => {
    const { title, autoHide = true, variant = 'neutral' } = params
    setSnackbarTitle(title)
    setSnackbarVariant(variant)
    setSnackbarVisible(true)
    startShowAnimation()

    if (autoHide) {
      setTimeout(() => {
        startHideAnimation()
      }, 4000)
    }
  }

  const startShowAnimation = () => {
    Animated.timing(opacity, {
      toValue: 0.8,
      duration: 500,
      useNativeDriver: true,
    }).start()
  }

  const startHideAnimation = () => {
    Animated.timing(opacity, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start(() => {
      setSnackbarVisible(false)
    })
  }

  const animatedStyle = {
    opacity,
    transform: [
      {
        scale: opacity.interpolate({
          inputRange: [0, 0.8],
          outputRange: [0.3, 1],
        }),
      },
    ],
  }

  return (
    <SnackbarContext.Provider value={{ show }}>
      {children}
      {snackbarVisible && (
        <Animated.View
          style={[
            styles.snackbarContainer,
            snackbarVariant === 'positive' && styles.positiveSnackbarContainer,
            snackbarVariant === 'negative' && styles.negativeSnackbarContainer,
            animatedStyle,
          ]}
        >
          <Text style={styles.title}>{snackbarTitle}</Text>
        </Animated.View>
      )}
    </SnackbarContext.Provider>
  )
}

const styles = StyleSheet.create({
  snackbarContainer: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#000',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 30,
    opacity: 0.8,
    position: 'absolute',
    bottom: 80,
  },
  positiveSnackbarContainer: {
    backgroundColor: 'green',
  },
  negativeSnackbarContainer: {
    backgroundColor: 'red',
  },
  title: {
    color: '#fff',
    fontWeight: '400',
    fontSize: 16,
    marginHorizontal: 10,
    marginBottom: 2,
  },
})

export default SnackbarProvider
