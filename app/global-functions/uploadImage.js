import React from 'react'
import * as CustomPackages from '../custom-files/CustomPackages'

const uploadImage = async (folder, string) => {
  // for empty or remote url don't upload image
  if (!string || string.includes('https') || !string.trim().length) return string
  const byteNumbers = new Array(string.length) // create an array to store bytes

  const type = string.split(';')[0].split(':')[1] // take the raw base64 string
  // function to convert base64 to array buffer
  function _base64ToArrayBuffer(base64) {
    var binary_string = CustomPackages.decode(base64)
    var len = binary_string.length
    var bytes = new Uint8Array(len)
    for (var i = 0; i < len; i++) {
      bytes[i] = binary_string.charCodeAt(i)
    }
    return bytes.buffer
  }

  // supabase 1.35.7 js client
  // folder is the path the image
  const { data: lsBucData, error: lsBucErr } = await CustomPackages.supabase.storage.listBuckets()

  console.log(lsBucData, lsBucErr)

  const { data, error } = await CustomPackages.supabase.storage
    .from(`${folder}/images`)
    .upload(folder + Date.now() + '.' + type.split('/')[1], _base64ToArrayBuffer(string.split(';')[1].split(',')[1]), {
      contentType: type,
    })

  // return the remote url of uploaded image
  console.log(error)

  console.log('https://pvbtcdjiibcaleqjdrih.supabase.co/storage/v1/object/public/' + data.Key)

  return 'https://pvbtcdjiibcaleqjdrih.supabase.co/storage/v1/object/public/' + data.Key
}

export default uploadImage
