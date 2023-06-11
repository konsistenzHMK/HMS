import React from 'react'
import * as GlobalStyles from '../GlobalStyles.js'
import * as PagalFanBEApi from '../apis/PagalFanBEApi.js'
import * as GlobalVariables from '../config/GlobalVariableContext'
import Images from '../config/Images'
import Breakpoints from '../utils/Breakpoints'
import * as StyleSheet from '../utils/StyleSheet'
import { Button, ScreenContainer, TextInput, withTheme } from '@draftbit/ui'
import { useIsFocused } from '@react-navigation/native'
import { Image, Text, View, useWindowDimensions } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useSnackbar } from '../components/index.js'

const SignupOTPScreen = (props) => {
  const dimensions = useWindowDimensions()
  const Constants = GlobalVariables.useValues()
  const Variables = Constants
  const setGlobalVariableValue = GlobalVariables.useSetValue()

  const snackbar = useSnackbar()

  const { theme } = props
  const { navigation } = props

  const isFocused = useIsFocused()
  React.useEffect(() => {
    try {
      if (!isFocused) {
        return
      }
      console.log(Constants['user_onboarded'])
    } catch (err) {
      console.error(err)
    }
  }, [isFocused])

  const [signupOTP, setSignupOTP] = React.useState('')
  const [textInputValue, setTextInputValue] = React.useState('')

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
                  fontFamily: 'Rubik_600SemiBold',
                  fontSize: 24,
                  marginLeft: 36,
                  marginTop: 20,
                  textAlign: 'auto',
                },
                dimensions.width,
              )}
            >
              {'Enter the 6 digit OTP'}
            </Text>
          </View>
        </View>
        {/* Register Form */}
        <View style={StyleSheet.applyWidth({ marginTop: 10, paddingLeft: 36, paddingRight: 36 }, dimensions.width)}>
          {/* Note 1 */}
          <Text
            style={StyleSheet.applyWidth(
              {
                color: theme.colors['PF-Grey'],
                fontFamily: 'Rubik_400Regular',
                fontSize: 14,
                marginBottom: 4,
                marginTop: 10,
                textAlign: 'auto',
              },
              dimensions.width,
            )}
          >
            {'Sent to your email: '}
            {props.route?.params?.user_email ?? 'sg-ml1@yopmail.com'}
          </Text>
          {/* Note 2 */}
          <Text
            style={StyleSheet.applyWidth(
              {
                color: theme.colors['PF-Grey'],
                fontFamily: 'Rubik_400Regular_Italic',
                fontSize: 12,
                marginBottom: 4,
                marginTop: 10,
                textAlign: 'auto',
              },
              dimensions.width,
            )}
          >
            {"In case you don't find it, check your spam folder"}
          </Text>
          {/* OTP row */}
          <View
            style={StyleSheet.applyWidth(
              {
                alignItems: 'center',
                flexDirection: 'row',
                marginBottom: 40,
                marginTop: 40,
              },
              dimensions.width,
            )}
          >
            {/* OTP Input */}
            <TextInput
              onChangeText={(newOTPInputValue) => {
                try {
                  setSignupOTP(newOTPInputValue)
                } catch (err) {
                  console.error(err)
                }
              }}
              style={StyleSheet.applyWidth(
                StyleSheet.compose(GlobalStyles.TextInputStyles(theme)['Text Input'], {
                  borderColor: theme.colors['Secondary'],
                  color: theme.colors['PF-Grey'],
                  fontFamily: 'Rubik_400Regular',
                  marginBottom: 10,
                  marginTop: 10,
                  width: '100%',
                }),
                dimensions.width,
              )}
              placeholder={'Enter OTP'}
              value={signupOTP}
              autoCapitalize={'none'}
            />
          </View>
          {/* Continue Button */}
          <Button
            onPress={() => {
              const handler = async () => {
                snackbar.show({ title: 'Checking OTP …' })
                console.log('Continue Button ON_PRESS Start')
                let error = null
                try {
                  console.log('Start ON_PRESS:0 FETCH_REQUEST')
                  const responseJson = await PagalFanBEApi.loginViaEmailOTPPOST(Constants, {
                    emailId: props.route?.params?.user_email ?? 'sg-ml1@yopmail.com',
                    otp: signupOTP,
                  })
                  console.log('Complete ON_PRESS:0 FETCH_REQUEST', {
                    responseJson,
                  })
                  console.log('Start ON_PRESS:1 EXTRACT_KEY')
                  const message = responseJson?.msg
                  console.log('Complete ON_PRESS:1 EXTRACT_KEY', { message })
                  console.log('Start ON_PRESS:2 SET_GLOBAL_VARIABLE')
                  setGlobalVariableValue({
                    key: 'ERROR_MESSAGE',
                    value: message,
                  })
                  console.log('Complete ON_PRESS:2 SET_GLOBAL_VARIABLE')
                  console.log('Start ON_PRESS:3 TERMINATION_CHECK')
                  if (message) {
                    snackbar.show({ title: message, variant: 'negative' })
                    return
                  }
                  console.log('Complete ON_PRESS:3 TERMINATION_CHECK')
                  console.log('Start ON_PRESS:4 EXTRACT_KEY')
                  const accessToken = responseJson?.access_token
                  console.log('Complete ON_PRESS:4 EXTRACT_KEY', {
                    accessToken,
                  })
                  console.log('Start ON_PRESS:5 SET_GLOBAL_VARIABLE')
                  setGlobalVariableValue({
                    key: 'AUTHORIZATION_HEADER',
                    value: (() => {
                      const e = 'Bearer ' + accessToken
                      console.log(e)
                      return e
                    })(),
                  })
                  console.log('Complete ON_PRESS:5 SET_GLOBAL_VARIABLE')
                  console.log('Start ON_PRESS:6 EXTRACT_KEY')
                  const userId = responseJson?.user.id
                  console.log('Complete ON_PRESS:6 EXTRACT_KEY', { userId })
                  console.log('Start ON_PRESS:7 SET_GLOBAL_VARIABLE')
                  setGlobalVariableValue({
                    key: 'LOGGED_IN_USER',
                    value: (() => {
                      const e = userId
                      console.log(e)
                      return e
                    })(),
                  })
                  console.log('Complete ON_PRESS:7 SET_GLOBAL_VARIABLE')
                  console.log('Start ON_PRESS:8 NAVIGATE_SCREEN')
                  if (Constants['user_onboarded'] === false) {
                    navigation.navigate('OnboardingScreen')
                    console.log('Complete ON_PRESS:8 NAVIGATE_SCREEN')
                    return
                  } else {
                    console.log('Skipped ON_PRESS:8 NAVIGATE_SCREEN: condition not met')
                  }
                  console.log('Start ON_PRESS:9 NAVIGATE_SCREEN')
                  if (Constants['user_onboarded'] === true) {
                    navigation.navigate('Tabs', { screen: 'HomeScreen' })
                    console.log('Complete ON_PRESS:9 NAVIGATE_SCREEN')
                    return
                  } else {
                    console.log('Skipped ON_PRESS:9 NAVIGATE_SCREEN: condition not met')
                  }
                } catch (err) {
                  console.error(err)
                  error = err.message ?? err
                }
                snackbar.show({ title: 'Error please try again' })
                console.log('Continue Button ON_PRESS Complete', error ? { error } : 'no error')
              }
              handler()
            }}
            style={StyleSheet.applyWidth(
              {
                backgroundColor: theme.colors['Secondary'],
                borderRadius: 8,
                fontFamily: 'Rubik_700Bold',
                marginTop: 20,
                paddingBottom: 16,
                paddingLeft: 16,
                paddingRight: 16,
                paddingTop: 16,
                textAlign: 'center',
              },
              dimensions.width,
            )}
            title={'CONTINUE'}
          >
            {'Sign Up'}
          </Button>
        </View>
      </KeyboardAwareScrollView>
    </ScreenContainer>
  )
}

export default withTheme(SignupOTPScreen)
