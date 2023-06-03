import { Platform } from 'react-native'
import * as DocumentPicker from 'expo-document-picker'
import * as FileSystem from 'expo-file-system'

const selectFile = async ({ returnNameAndValue = false }) => {
  try {
    const data = await DocumentPicker.getDocumentAsync()

    if (data?.type === 'success') {
      const name = data.name

      const value =
        Platform.OS === 'web'
          ? data.uri
          : 'data:' +
            data.mimeType +
            ';base64,' +
            (await FileSystem.readAsStringAsync(data.uri, {
              encoding: FileSystem.EncodingType.Base64,
            }))

      return returnNameAndValue ? { name, value } : value
    }
  } catch (error) {
    console.error(error)
  }
}

export default selectFile
