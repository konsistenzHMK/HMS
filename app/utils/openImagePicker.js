import { getMimeTypeFromFilename } from '@shopify/mime-types'
import { launchImageLibrary } from 'react-native-image-picker'

async function openImagePicker({ mediaType = 'photo', quality = 1 }) {
  let result = await launchImageLibrary({
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

export default openImagePicker
