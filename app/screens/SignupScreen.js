import React from 'react'
import * as GlobalStyles from '../GlobalStyles.js'
import * as PagalFanBEApi from '../apis/PagalFanBEApi.js'
import * as GlobalVariables from '../config/GlobalVariableContext'
import Images from '../config/Images'
import * as StyleSheet from '../utils/StyleSheet'
import { Button, Link, ScreenContainer, Spacer, withTheme } from '@draftbit/ui'
import { Image, Text, TextInput, View, useWindowDimensions } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

const SignupScreen = (props) => {
  const dimensions = useWindowDimensions()
  const Constants = GlobalVariables.useValues()
  const Variables = Constants
  const setGlobalVariableValue = GlobalVariables.useSetValue()

  const { theme } = props
  const { navigation } = props

  const [signupEmail, setSignupEmail] = React.useState('')
  const [signupPassword, setSignupPassword] = React.useState('')

  return (
    <ScreenContainer hasSafeArea={true}>
      <KeyboardAwareScrollView
        contentContainerStyle={StyleSheet.applyWidth({ justifyContent: 'center' }, dimensions.width)}
        enableOnAndroid={true}
        keyboardShouldPersistTaps={'always'}
      >
        {/* Header */}
        <View>
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
              {'Welcome!'}
            </Text>
            {/* Subtitle */}
            <Text
              style={StyleSheet.applyWidth(
                {
                  color: theme.colors.strong,
                  fontFamily: 'System',
                  fontWeight: '400',
                  marginTop: 4,
                  textAlign: 'center',
                },
                dimensions.width,
              )}
            >
              {'Create an account to get started'}
            </Text>
          </View>
        </View>
        {/* Register Form */}
        <View style={StyleSheet.applyWidth({ marginTop: 24, paddingLeft: 36, paddingRight: 36 }, dimensions.width)}>
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
            {null}
          </Text>
          {/* Email Input */}
          <TextInput
            onChangeText={(newEmailInputValue) => {
              try {
                setSignupEmail(newEmailInputValue)
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
                paddingBottom: 16,
                paddingLeft: 16,
                paddingRight: 16,
                paddingTop: 16,
              },
              dimensions.width,
            )}
            placeholder={'Enter Email'}
            value={signupEmail}
            autoCapitalize={'none'}
            keyboardType={'email-address'}
            textContentType={'emailAddress'}
          />
          <Spacer top={12} right={8} bottom={8} left={8} />
          {/* Password Input */}
          <TextInput
            onChangeText={(newPasswordInputValue) => {
              try {
                setSignupPassword(newPasswordInputValue)
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
                paddingBottom: 16,
                paddingLeft: 16,
                paddingRight: 16,
                paddingTop: 16,
              },
              dimensions.width,
            )}
            placeholder={'Enter Password'}
            value={signupPassword}
            secureTextEntry={true}
            autoCapitalize={'none'}
            textContentType={'password'}
          />
          <Spacer right={8} left={8} top={20} bottom={20} />
          {/* Sign Up Button */}
          <Button
            onPress={() => {
              const handler = async () => {
                try {
                  const signupResponseJson = await PagalFanBEApi.signupPOST(Constants, {
                    signupEmail: signupEmail,
                    signupPassword: signupPassword,
                  })
                  const message = signupResponseJson?.msg
                  setGlobalVariableValue({
                    key: 'ERROR_MESSAGE',
                    value: message,
                  })
                  if (message) {
                    return
                  }
                  const accessToken = signupResponseJson?.access_token
                  setGlobalVariableValue({
                    key: 'AUTHORIZATION_HEADER',
                    value: 'Bearer ' + accessToken,
                  })
                  const userId = signupResponseJson?.user.id
                  setGlobalVariableValue({
                    key: 'LOGGED_IN_USER',
                    value: userId,
                  })
                  navigation.navigate('OnboardingScreen')
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
                fontFamily: 'Rubik_700Bold',
                paddingBottom: 16,
                paddingLeft: 16,
                paddingRight: 16,
                paddingTop: 16,
                textAlign: 'center',
              },
              dimensions.width,
            )}
            title={'Sign up'}
          >
            {'Sign Up'}
          </Button>
          <Spacer top={16} right={8} bottom={16} left={8} />
          <View style={StyleSheet.applyWidth({ flexDirection: 'row', justifyContent: 'center' }, dimensions.width)}>
            <Text style={StyleSheet.applyWidth({ color: theme.colors.strong, marginRight: 2 }, dimensions.width)}>
              {'Have an account?'}
            </Text>
            <Spacer top={8} right={2} bottom={8} left={2} />
            {/* Sign In Link */}
            <Link
              onPress={() => {
                try {
                  navigation.navigate('LoginScreen')
                } catch (err) {
                  console.error(err)
                }
              }}
              style={StyleSheet.applyWidth({ color: theme.colors.primary }, dimensions.width)}
              title={'Sign in.'}
            />
          </View>
        </View>
      </KeyboardAwareScrollView>
    </ScreenContainer>
  )
}

export default withTheme(SignupScreen)
