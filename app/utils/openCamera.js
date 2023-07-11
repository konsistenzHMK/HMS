import { launchCamera } from 'react-native-image-picker'
import { PERMISSIONS, request, RESULTS } from 'react-native-permissions'
import { Platform } from 'react-native'

async function checkCameraPermissions() {
  if (Platform.OS === 'ios') {
    return true
  }
  const result = await request(PERMISSIONS.ANDROID.CAMERA)
  return result === RESULTS.GRANTED
}

async function openCamera(params = {}) {
  params = { mediaType: 'photo', cameraType: 'back', quality: 1, ...params }
  try {
    if (await checkCameraPermissions()) {
      let result = await launchCamera(params)
      if (!result.didCancel && !result.errorCode) {
        return result.assets[0]
      }
    }
    return null
  } catch (e) {
    console.error(e)
  }
}

export default openCamera
