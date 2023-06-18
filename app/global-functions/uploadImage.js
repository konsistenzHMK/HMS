import * as CustomPackages from '../custom-files/CustomPackages'

const uploadImage = async (folder, string) => {
  // for empty or remote url don't upload image
  if (!string || string.includes('https') || !string.trim().length) return string

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

  const dir = `${folder}/images`
  const { data } = await CustomPackages.supabase.storage
    .from(dir)
    .upload(folder + Date.now() + '.' + type.split('/')[1], _base64ToArrayBuffer(string.split(';')[1].split(',')[1]), {
      contentType: type,
    })

  const {
    data: { publicUrl },
  } = CustomPackages.supabase.storage.from(dir).getPublicUrl(data.path)
  console.log('Image upload public url', publicUrl)
  return publicUrl
}

export default uploadImage
