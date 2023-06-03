import * as Location from 'expo-location'

async function getLocation() {
  const { status } = await Location.requestForegroundPermissionsAsync()
  if (status !== 'granted') {
    return
  }

  const { coords } = await Location.getCurrentPositionAsync({})
  return coords
}

export default getLocation
