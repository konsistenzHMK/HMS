import * as CustomPackages from '../custom-files/CustomPackages'
import RNFS from 'react-native-fs'
import { getMimeTypeFromFilename } from '@shopify/mime-types'

const uploadFile = async (folder, uri, subDir = 'images', mimeType) => {
  const type = mimeType || getMimeTypeFromFilename(uri)

  function _base64ToArrayBuffer(base64) {
    var binary_string = CustomPackages.decode(base64)
    var len = binary_string.length
    var bytes = new Uint8Array(len)
    for (var i = 0; i < len; i++) {
      bytes[i] = binary_string.charCodeAt(i)
    }
    return bytes.buffer
  }

  const dir = `${folder}/${subDir}`
  const { data } = await CustomPackages.supabase.storage
    .from(dir)
    .upload(folder + Date.now() + '.' + type.split('/')[1], _base64ToArrayBuffer(await RNFS.readFile(uri, 'base64')), {
      contentType: type,
    })

  const {
    data: { publicUrl },
  } = CustomPackages.supabase.storage.from(dir).getPublicUrl(data.path)
  return publicUrl
}

export default uploadFile
