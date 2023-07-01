import { launchCamera } from 'react-native-image-picker'
import { getMimeTypeFromFilename } from '@shopify/mime-types'

async function openCamera({ mediaType = 'photo', cameraType = 'back', durationLimit, quality = 1 }) {
  let result = await launchCamera({
    cameraType,
    durationLimit,
    mediaType,
    quality,
    includeBase64: true,
  })
  let asset = result.assets[0]
  if (!result.didCancel && asset) {
    const mimeType = getMimeTypeFromFilename(asset.uri)
    return 'data:' + mimeType + ';base64,' + asset.base64
  }
  return null
}

export default openCamera
