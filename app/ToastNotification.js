import React from 'react'
import { View, Text, Animated } from 'react-native'

const Toast = () => {
  return (
    <Animated.View
      style={{
        top: 70,
        backgroundColor: '#20639B',
        width: '90%',
        position: 'absolute',
        borderRadius: 5,
        padding: 20,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        shadowColor: '#003049',
        shadowOpacity: 0.4,
        shadowRadius: 2,
        shadowOffset: { width: 0, height: 1 },
        elevation: 2,
      }}
    >
      <View>
        <Text
          style={{
            color: '#F6F4F4',
            fontWeight: 'bold',
            marginLeft: 10,
            fontSize: 16,
          }}
        >
          Info
        </Text>
        <Text
          style={{
            color: '#F6F4F4',
            fontWeight: '500',
            marginLeft: 10,
            fontSize: 14,
          }}
        >
          Check Description for the Source Code
        </Text>
      </View>
    </Animated.View>
  )
}

export default Toast
