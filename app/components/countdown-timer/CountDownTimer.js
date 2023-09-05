import React, { useState, useEffect } from 'react'
import { View, Text } from 'react-native'
import { theme } from '../../themes'

const CountdownTimer = ({ initialSeconds, onTimerEnd }) => {
  const [timeRemaining, setTimeRemaining] = useState(initialSeconds)

  useEffect(() => {
    let timer

    if (timeRemaining > 0) {
      timer = setInterval(() => {
        setTimeRemaining((prevTime) => Math.max(prevTime - 1, 0)) // Ensure the timer doesn't go below 0
      }, 1000)
    } else {
      // Call the provided function when the timer reaches 0
      onTimerEnd()
    }

    return () => {
      if (timer) {
        clearInterval(timer)
      }
    }
  }, [timeRemaining, onTimerEnd])

  const formatTime = (time) => {
    const hours = Math.floor(time / 3600)
    const minutes = Math.floor((time % 3600) / 60)
    const seconds = time % 60

    let formattedTime = ''

    if (hours > 0) {
      formattedTime += `${hours}h `
    }

    if (minutes > 0 || hours > 0) {
      formattedTime += `${minutes}m `
    }

    return formattedTime
  }

  return (
    <View>
      <Text
        style={{
          fontSize: 12,
          color: theme.colors['White'],
          backgroundColor: theme.colors['LightGrey'],
          paddingRight: 8,
          paddingVertical: 2,
          borderBottomRightRadius: 20,
          borderTopRightRadius: 20,
        }}
      >
        {formatTime(timeRemaining)}
      </Text>
    </View>
  )
}

export default CountdownTimer
