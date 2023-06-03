import React from 'react'
import * as GlobalStyles from '../GlobalStyles.js'
import * as StyleSheet from '../utils/StyleSheet'
import { Button, ScreenContainer, withTheme } from '@draftbit/ui'
import { View, useWindowDimensions } from 'react-native'

const Testscreen2Screen = (props) => {
  const dimensions = useWindowDimensions()

  const { theme } = props

  return (
    <ScreenContainer scrollable={false} hasSafeArea={false}>
      <View style={StyleSheet.applyWidth({ marginTop: 20 }, dimensions.width)}>
        <Button
          style={StyleSheet.applyWidth(GlobalStyles.ButtonStyles(theme)['Button'], dimensions.width)}
          title={'Get Token'}
        />
      </View>
    </ScreenContainer>
  )
}

export default withTheme(Testscreen2Screen)
