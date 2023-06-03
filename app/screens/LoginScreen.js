import React from 'react'
import * as GlobalStyles from '../GlobalStyles.js'
import * as PagalFanBEApi from '../apis/PagalFanBEApi.js'
import * as GlobalVariables from '../config/GlobalVariableContext'
import Images from '../config/Images'
import Breakpoints from '../utils/Breakpoints'
import * as StyleSheet from '../utils/StyleSheet'
import { Button, Link, ScreenContainer, Spacer, withTheme } from '@draftbit/ui'
import { Image, Text, TextInput, View, useWindowDimensions } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

const LoginScreen = (props) => {
  const dimensions = useWindowDimensions()
  const Constants = GlobalVariables.useValues()
  const Variables = Constants
  const setGlobalVariableValue = GlobalVariables.useSetValue()

  const { theme } = props
  const { navigation } = props

  const [emailInputValue, setEmailInputValue] = React.useState('')
  const [passwordInputValue, setPasswordInputValue] = React.useState('')

  return (
    <ScreenContainer hasSafeArea={true}>
      <KeyboardAwareScrollView
        contentContainerStyle={StyleSheet.applyWidth({ justifyContent: 'center' }, dimensions.width)}
        keyboardShouldPersistTaps={'always'}
        enableOnAndroid={true}
      >
        {/* Header */}
        <View style={StyleSheet.applyWidth({ alignItems: 'center' }, dimensions.width)}>
          <Image
            style={StyleSheet.applyWidth(
              StyleSheet.compose(GlobalStyles.ImageStyles(theme)['Image'], {
                height: 300,
                width: '100%',
              }),
              dimensions.width,
            )}
            resizeMode={'cover'}
            source={Images.PFLogin}
          />
          <View style={StyleSheet.applyWidth({ marginTop: 20 }, dimensions.width)}>
            {/* Title */}
            <Text
              style={StyleSheet.applyWidth(
                {
                  fontFamily: 'System',
                  fontSize: 36,
                  fontWeight: '600',
                  textAlign: 'center',
                },
                dimensions.width,
              )}
            >
              {'Welcome Back!'}
            </Text>
            {/* Subtitle */}
            <Text
              style={StyleSheet.applyWidth(
                {
                  alignSelf: 'center',
                  fontFamily: 'System',
                  fontSize: 14,
                  fontWeight: '400',
                  marginTop: 4,
                },
                dimensions.width,
              )}
            >
              {'Sign in to your account to continue'}
            </Text>
          </View>
        </View>
        {/* Login Form */}
        <View style={StyleSheet.applyWidth({ marginTop: 16, paddingLeft: 36, paddingRight: 36 }, dimensions.width)}>
          {/* Error Message */}
          <Text
            style={StyleSheet.applyWidth(
              {
                color: theme.colors.error,
                fontSize: 12,
                marginBottom: 16,
                textAlign: 'center',
              },
              dimensions.width,
            )}
          >
            {Constants['ERROR_MESSAGE']}
          </Text>
          {/* Email Input */}
          <TextInput
            onChangeText={(newEmailInputValue) => {
              try {
                setEmailInputValue(newEmailInputValue)
              } catch (err) {
                console.error(err)
              }
            }}
            style={StyleSheet.applyWidth(
              {
                borderBottomWidth: 1,
                borderColor: theme.colors.divider,
                borderLeftWidth: 1,
                borderRadius: 8,
                borderRightWidth: 1,
                borderTopWidth: 1,
                fontFamily: 'System',
                fontWeight: '400',
                paddingBottom: 16,
                paddingLeft: 16,
                paddingRight: 16,
                paddingTop: 16,
              },
              dimensions.width,
            )}
            value={emailInputValue}
            placeholder={'Email'}
            keyboardType={'email-address'}
            textContentType={'emailAddress'}
            autoCapitalize={'none'}
          />
          <Spacer top={12} right={8} bottom={12} left={8} />
          {/* Password Input */}
          <TextInput
            onChangeText={(newPasswordInputValue) => {
              try {
                setPasswordInputValue(newPasswordInputValue)
              } catch (err) {
                console.error(err)
              }
            }}
            style={StyleSheet.applyWidth(
              {
                borderBottomWidth: 1,
                borderColor: theme.colors.divider,
                borderLeftWidth: 1,
                borderRadius: 8,
                borderRightWidth: 1,
                borderTopWidth: 1,
                fontFamily: 'System',
                fontWeight: '400',
                paddingBottom: 16,
                paddingLeft: 16,
                paddingRight: 16,
                paddingTop: 16,
              },
              dimensions.width,
            )}
            value={passwordInputValue}
            placeholder={'Password'}
            secureTextEntry={true}
          />
          <Spacer right={8} left={8} top={20} bottom={20} />
          {/* Sign In Button */}
          <Button
            onPress={() => {
              const handler = async () => {
                try {
                  const loginResponseJson = await PagalFanBEApi.loginPOST(Constants, {
                    loginEmail: emailInputValue,
                    loginPassword: passwordInputValue,
                  })
                  const accessToken = loginResponseJson?.access_token
                  const userid = loginResponseJson?.user.id
                  const message = loginResponseJson?.error_description
                  setGlobalVariableValue({
                    key: 'ERROR_MESSAGE',
                    value: message,
                  })
                  if (!accessToken) {
                    return
                  }
                  const authHeader = setGlobalVariableValue({
                    key: 'AUTHORIZATION_HEADER',
                    value: 'Bearer ' + accessToken,
                  })
                  const loggedinUser = setGlobalVariableValue({
                    key: 'LOGGED_IN_USER',
                    value: userid,
                  })
                  console.log(authHeader)
                  console.log(loggedinUser)
                  navigation.navigate('Tabs', { screen: 'HomeScreen' })
                } catch (err) {
                  console.error(err)
                }
              }
              handler()
            }}
            style={StyleSheet.applyWidth(
              {
                backgroundColor: theme.colors['Secondary'],
                borderRadius: 8,
                fontFamily: 'System',
                fontWeight: '700',
                paddingBottom: 16,
                paddingTop: 16,
                textAlign: 'center',
              },
              dimensions.width,
            )}
            title={'Sign in'}
          >
            {'Sign Up'}
          </Button>
          <Spacer top={16} right={8} bottom={16} left={8} />
          <View
            style={StyleSheet.applyWidth(
              {
                flexDirection: 'row',
                justifyContent: 'center',
                marginBottom: 12,
              },
              dimensions.width,
            )}
          >
            <Text>{'New user?'}</Text>
            <Spacer top={8} right={2} bottom={8} left={2} />
            {/* Sign Up Link */}
            <Link
              onPress={() => {
                try {
                  navigation.navigate('SignupScreen')
                } catch (err) {
                  console.error(err)
                }
              }}
              style={StyleSheet.applyWidth({ color: theme.colors.primary }, dimensions.width)}
              title={'Sign up!'}
            />
          </View>
        </View>
      </KeyboardAwareScrollView>
    </ScreenContainer>
  )
}

export default withTheme(LoginScreen)
