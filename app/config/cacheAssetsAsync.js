import { Image } from 'react-native'
import { Asset } from 'expo-asset'
import * as Font from 'expo-font'
import {
  AntDesign,
  Entypo,
  Feather,
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
  Octicons,
} from '@expo/vector-icons'

import IMAGES from './Images.js'

function cacheImages(images) {
  return images.map((image) => {
    if (typeof image === 'string') {
      return Image.prefetch(image)
    } else {
      return Asset.fromModule(image).downloadAsync()
    }
  })
}

function cacheFonts(fonts) {
  return fonts.map((font) => Font.loadAsync(font))
}

export default function cacheAssetsAsync() {
  const imageAssets = cacheImages(Object.values(IMAGES))
  const iconAssets = cacheFonts([
    AntDesign.font,
    Entypo.font,
    Feather.font,
    FontAwesome.font,
    Ionicons.font,
    MaterialCommunityIcons.font,
    MaterialIcons.font,
    Octicons.font,
  ])

  return Promise.all([...imageAssets, ...iconAssets])
}
