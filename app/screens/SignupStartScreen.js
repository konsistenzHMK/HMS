import React from 'react'
import * as GlobalStyles from '../GlobalStyles.js'
import * as PagalFanBEApi from '../apis/PagalFanBEApi.js'
import * as GlobalVariables from '../config/GlobalVariableContext'
import Images from '../config/Images'
import * as StyleSheet from '../utils/StyleSheet'
import { Button, Checkbox, Icon, ScreenContainer, withTheme } from '@draftbit/ui'
import { useIsFocused } from '@react-navigation/native'
import { Image, Text, TextInput, View, useWindowDimensions } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useSnackbar } from '../components'

const SignupStartScreen = (props) => {
  const dimensions = useWindowDimensions()
  const Constants = GlobalVariables.useValues()
  const Variables = Constants

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

  const [checkboxValue, setCheckboxValue] = React.useState(false)
  const [signupEmail, setSignupEmail] = React.useState('')

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
          {/* Subtitle */}
          <Text
            style={StyleSheet.applyWidth(
              {
                color: theme.colors['PF-Grey'],
                fontFamily: 'Rubik_700Bold',
                fontSize: 16,
                marginBottom: 4,
                marginTop: 10,
                textAlign: 'auto',
              },
              dimensions.width,
            )}
          >
            {'Login / Register'}
          </Text>
          {/* Note */}
          <Text
            style={StyleSheet.applyWidth(
              {
                color: theme.colors['PF-Grey'],
                fontFamily: 'Rubik_400Regular',
                fontSize: 12,
                marginBottom: 10,
                marginTop: 4,
                textAlign: 'auto',
              },
              dimensions.width,
            )}
          >
            {'We will send an OTP to your mail id'}
          </Text>
          {/* Mail row */}
          <View
            style={StyleSheet.applyWidth(
              {
                alignItems: 'center',
                borderBottomWidth: 1,
                borderColor: theme.colors['Secondary'],
                flexDirection: 'row',
                marginBottom: 40,
                marginTop: 10,
              },
              dimensions.width,
            )}
          >
            {/* Mail */}
            <Icon size={24} name={'AntDesign/mail'} color={theme.colors['PF-Grey']} />
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
                  color: theme.colors['PF-Grey'],
                  fontFamily: 'Rubik_400Regular',
                  marginLeft: 2,
                  paddingBottom: 10,
                  paddingLeft: 8,
                  paddingRight: 8,
                  paddingTop: 10,
                  width: '90%',
                },
                dimensions.width,
              )}
              placeholder={'Enter Email id'}
              value={signupEmail}
              autoCapitalize={'none'}
              keyboardType={'email-address'}
              textContentType={'emailAddress'}
            />
          </View>

          <View
            style={StyleSheet.applyWidth(
              { alignItems: 'center', flexDirection: 'row', marginBottom: 10 },
              dimensions.width,
            )}
          >
            <Checkbox
              onPress={(newCheckboxValue) => {
                const checkboxValue = newCheckboxValue
                try {
                  setCheckboxValue(newCheckboxValue)
                } catch (err) {
                  console.error(err)
                }
              }}
              status={checkboxValue}
              color={theme.colors['Secondary']}
              uncheckedColor={theme.colors['Secondary']}
            />
            {/* Disclaimer */}
            <Text
              style={StyleSheet.applyWidth(
                StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                  color: theme.colors['PF-Grey'],
                  fontFamily: 'Rubik_400Regular',
                  fontSize: 10,
                }),
                dimensions.width,
              )}
            >
              {'I agree with the Terms of Use and Privacy Policy of PagalFan'}
            </Text>
          </View>
          {/* Proceed Button */}
          <Button
            onPress={() => {
              const handler = async () => {
                try {
                  snackbar.show({ title: 'Sending OTP …' })
                  const result = await PagalFanBEApi.signupWithMailOTPPOST(Constants, { emailId: signupEmail })
                  navigation.navigate('SignupOTPScreen', {
                    user_email: signupEmail,
                  })
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
            disabled={!checkboxValue}
            title={'Get OTP by Email'}
          >
            {'Sign Up'}
          </Button>
        </View>
      </KeyboardAwareScrollView>
    </ScreenContainer>
  )
}

export default withTheme(SignupStartScreen)
