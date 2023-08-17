import React from 'react'
import * as GlobalStyles from '../GlobalStyles.js'
import * as PagalFanBEApi from '../apis/PagalFanBEApi.js'
import * as GlobalVariables from '../config/GlobalVariableContext'
import Images from '../config/Images'
import * as StyleSheet from '../utils/StyleSheet'
import { Button, ScreenContainer, TextInput, withTheme } from '@draftbit/ui'
import { Image, Text, View, useWindowDimensions } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import messaging from '@react-native-firebase/messaging'
import { useSnackbar } from '../components/index.js'
import { useNavigationContext } from '../navigation/NavigationContext.js'
import { useTranslation } from 'react-i18next'

const SignupOTPScreen = (props) => {
  const dimensions = useWindowDimensions()
  const Constants = GlobalVariables.useValues()
  const setGlobalVariableValue = GlobalVariables.useSetValue()
  const pagalFanBEUpdateExpoTokenPATCH = PagalFanBEApi.useUpdateExpoTokenPATCH()
  const { t: translate } = useTranslation()

  const snackbar = useSnackbar()

  const { theme } = props
  const { navigation } = props
  const [signupOTP, setSignupOTP] = React.useState('')
  const { setStack } = useNavigationContext()

  const handleSignUpPress = async () => {
    snackbar.show({ title: translate('SignupOTPScreen.Toast.CheckOTPText') })
    try {
      const responseJson = await PagalFanBEApi.loginViaEmailOTPPOST(Constants, {
        emailId: props.route?.params?.user_email,
        otp: signupOTP,
      })
      const message = responseJson?.msg
      setGlobalVariableValue({
        key: 'ERROR_MESSAGE',
        value: message,
      })
      if (message) {
        snackbar.show({ title: message, variant: 'negative' })
        return
      }
      const accessToken = responseJson?.access_token
      setGlobalVariableValue({
        key: 'AUTHORIZATION_HEADER',
        value: 'Bearer ' + accessToken,
      })
      const userId = responseJson?.user.id
      setGlobalVariableValue({
        key: 'LOGGED_IN_USER',
        value: userId,
      })
      const onboarded = await PagalFanBEApi.fetchUserOnboardingStatusGET(Constants, { id: userId })
      if (onboarded?.[0]?.onboarded === true) {
        const token = await messaging().getToken()
        // expoToken -> notification_token
        await pagalFanBEUpdateExpoTokenPATCH.mutateAsync({
          expoToken: token,
          userId,
        })
        // Navigate to Home Screen
        setStack('app')
      } else {
        navigation.navigate('OnboardingScreen')
      }
    } catch (err) {
      console.error(err)
    }
  }

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
            source={Images.PFBanner1}
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
              {translate('SignupOTPScreen.Text.EnterOTPText')}
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
            {translate('SignupOTPScreen.Text.SentText')}
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
            {translate('SignupOTPScreen.Text.Text')}
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
              placeholder={translate('SignupOTPScreen.Text.OTPPlaceholder')}
              value={signupOTP}
              autoCapitalize={'none'}
            />
          </View>
          {/* Continue Button */}
          <Button
            onPress={handleSignUpPress}
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
            title={translate('SignupOTPScreen.Text.Continue')}
          >
            {translate('SignupOTPScreen.Button.SignUp')}
          </Button>
        </View>
      </KeyboardAwareScrollView>
    </ScreenContainer>
  )
}

export default withTheme(SignupOTPScreen)
