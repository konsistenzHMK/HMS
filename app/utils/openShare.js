import { Platform, Share } from 'react-native'

const openShare = (text) => {
  const isUrl = text.startsWith('http://') || text.startsWith('https://')
  const isIOS = Platform.OS === 'ios'

  Share.share({
    url: isIOS && isUrl ? text : null,
    message: !isIOS || !isUrl ? text : null,
  })
}

export default openShare
