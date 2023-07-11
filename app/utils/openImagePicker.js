import { launchImageLibrary } from 'react-native-image-picker'

async function openImagePicker(params = {}) {
  params = { mediaType: 'photo', quality: 1, ...params }
  let result = await launchImageLibrary(params)
  let asset = result.assets[0]
  if (!result.didCancel && asset) {
    return asset
  }
  return null
}

export default openImagePicker
