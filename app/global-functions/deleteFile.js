import * as CustomPackages from '../custom-files/CustomPackages'

const deleteFile = async (bucket, directory, fileName) => {
  try {
    const fileKey = directory + '/' + fileName
    const { data, error } = await CustomPackages.supabase.storage.from(bucket).remove([fileKey])
    console.log(data, error)
  } catch (err) {
    console.log(err)
  }
}

export default deleteFile
