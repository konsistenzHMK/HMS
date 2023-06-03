import React from 'react'
import * as GlobalStyles from '../GlobalStyles.js'
import * as GlobalVariables from '../config/GlobalVariableContext'
import * as StyleSheet from '../utils/StyleSheet'
import { Divider, ScreenContainer, withTheme } from '@draftbit/ui'
import { Text, useWindowDimensions } from 'react-native'

const TestuserdataScreen = (props) => {
  const dimensions = useWindowDimensions()
  const Constants = GlobalVariables.useValues()
  const Variables = Constants

  const { theme } = props

  const [OTP, setOTP] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [showOTPform, setShowOTPform] = React.useState(false)
  const [textInputValue, setTextInputValue] = React.useState('')

  return (
    <ScreenContainer
      style={StyleSheet.applyWidth({ marginLeft: 10, marginRight: 10, marginTop: 20 }, dimensions.width)}
      scrollable={false}
      hasSafeArea={true}
    >
      <Text
        style={StyleSheet.applyWidth(
          StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
            color: theme.colors['Secondary'],
            fontFamily: 'Rubik_700Bold',
            marginBottom: 20,
            textAlign: 'center',
          }),
          dimensions.width,
        )}
      >
        {'EMAIL OTP'}
      </Text>
      {/* User id */}
      <Text
        style={StyleSheet.applyWidth(
          StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
            fontFamily: 'Rubik_400Regular',
            marginBottom: 20,
            textAlign: 'auto',
          }),
          dimensions.width,
        )}
      >
        {'User id: '}
        {Constants['LOGGED_IN_USER']}
      </Text>
      {/* onboarded */}
      <Text
        style={StyleSheet.applyWidth(
          StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
            fontFamily: 'Rubik_400Regular',
            marginBottom: 20,
            textAlign: 'auto',
          }),
          dimensions.width,
        )}
      >
        {'User onboarded: '}
        {Constants['user_onboarded']}
      </Text>
      {/* auth token */}
      <Text
        style={StyleSheet.applyWidth(
          StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
            fontFamily: 'Rubik_400Regular',
            marginBottom: 20,
            textAlign: 'auto',
          }),
          dimensions.width,
        )}
      >
        {'auth token: '}
        {Constants['AUTHORIZATION_HEADER']}
      </Text>
      {/* api key */}
      <Text
        style={StyleSheet.applyWidth(
          StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
            fontFamily: 'Rubik_400Regular',
            marginBottom: 20,
            textAlign: 'auto',
          }),
          dimensions.width,
        )}
      >
        {'api key: '}
        {Constants['API_KEY_HEADER']}
      </Text>
      {/* language */}
      <Text
        style={StyleSheet.applyWidth(
          StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
            fontFamily: 'Rubik_400Regular',
            marginBottom: 20,
            textAlign: 'auto',
          }),
          dimensions.width,
        )}
      >
        {'language: '}
        {Constants['Language']}
      </Text>
      <Divider
        style={StyleSheet.applyWidth(GlobalStyles.DividerStyles(theme)['Divider'], dimensions.width)}
        color={theme.colors.divider}
      />
    </ScreenContainer>
  )
}

export default withTheme(TestuserdataScreen)
