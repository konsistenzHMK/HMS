import { Platform } from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import * as FileSystem from 'expo-file-system'
import { getMimeTypeFromFilename } from '@shopify/mime-types'

async function openImagePicker({
  mediaTypes = ImagePicker.MediaTypeOptions.Images,
  allowsEditing = false,
  cameraType = 'back',
  videoMaxDuration,
  quality = 1,
}) {
  if (Platform.OS !== 'web') {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()

    if (status !== 'granted') {
      alert('Sorry, we need media library permissions to make this work!')
    }
  }

  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes,
    allowsEditing,
    cameraType,
    videoMaxDuration,
    quality,
    base64: true,
  })

  let asset = result.assets[0]

  if (!result.canceled && asset) {
    if (Platform.OS === 'web') return asset.uri

    const mimeType = getMimeTypeFromFilename(asset.uri)

    if (result.type === 'video') {
      const base64Video = await FileSystem.readAsStringAsync(asset.uri, {
        encoding: 'base64',
      })

      return 'data:' + mimeType + ';base64,' + base64Video
    }

    return 'data:' + mimeType + ';base64,' + asset.base64
  }
}

export default openImagePicker
