import React from 'react'
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'

const Loader = ({ size = 30, title }) => {
  return (
    <View style={styles.main}>
      <View style={styles.body}>
        <ActivityIndicator size={size} />
        {title && <Text style={styles.title}>{title}</Text>}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  main: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  body: {
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#fff',
    width: 170,
    alignItems: 'center',
  },
  title: {
    fontSize: 15,
    color: '#000',
    marginTop: 20,
  },
})

export default Loader
