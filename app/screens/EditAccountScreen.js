import React from 'react'
import * as GlobalStyles from '../GlobalStyles.js'
import Images from '../config/Images'
import Breakpoints from '../utils/Breakpoints'
import * as StyleSheet from '../utils/StyleSheet'
import openImagePickerUtil from '../utils/openImagePicker'
import { Button, Circle, Icon, ScreenContainer, Touchable, withTheme } from '@draftbit/ui'
import { Image, Text, TextInput, View, useWindowDimensions } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

const EditAccountScreen = (props) => {
  const dimensions = useWindowDimensions()

  const { theme } = props
  const { navigation } = props

  const [datePickerValue, setDatePickerValue] = React.useState(new Date())
  const [textAreaValue, setTextAreaValue] = React.useState('')
  const [textInputValue, setTextInputValue] = React.useState('')

  return (
    <ScreenContainer
      style={StyleSheet.applyWidth({ marginLeft: 10, marginRight: 10 }, dimensions.width)}
      scrollable={false}
      hasSafeArea={true}
    >
      {/* PF-BackHeader */}
      <View style={StyleSheet.applyWidth(GlobalStyles.ViewStyles(theme)['PF-BackHeader 5'], dimensions.width)}>
        {/* Flex Frame for Touchable */}
        <View style={StyleSheet.applyWidth({ flexGrow: 1, flexShrink: 0, justifyContent: 'center' }, dimensions.width)}>
          <Touchable
            onPress={() => {
              try {
                navigation.goBack()
              } catch (err) {
                console.error(err)
              }
            }}
          >
            <Circle size={31} bgColor={theme.colors.communityIconBGColor}>
              <Icon name={'Ionicons/caret-back'} size={18} color={theme.colors.communityIconFill} />
            </Circle>
          </Touchable>
        </View>
      </View>
      {/* Header */}
      <View
        style={StyleSheet.applyWidth(
          {
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'center',
          },
          dimensions.width,
        )}
      >
        {/* Screen Heading */}
        <Text
          style={StyleSheet.applyWidth(
            {
              color: theme.colors.strong,
              fontFamily: 'Inter_500Medium',
              fontSize: 16,
              marginLeft: 10,
            },
            dimensions.width,
          )}
        >
          {'Edit Profile'}
        </Text>
      </View>

      <KeyboardAwareScrollView
        contentContainerStyle={StyleSheet.applyWidth(
          {
            flex: 1,
            justifyContent: 'space-between',
            paddingBottom: 20,
            paddingLeft: 20,
            paddingRight: 20,
            paddingTop: 20,
          },
          dimensions.width,
        )}
        showsVerticalScrollIndicator={true}
        keyboardShouldPersistTaps={'never'}
      >
        <View>
          {/* Profile Pic */}
          <View style={StyleSheet.applyWidth({ alignItems: 'center' }, dimensions.width)}>
            <Touchable
              onPress={() => {
                const handler = async () => {
                  try {
                    await openImagePickerUtil({})
                  } catch (err) {
                    console.error(err)
                  }
                }
                handler()
              }}
              activeOpacity={0.8}
              disabledOpacity={0.8}
            >
              <Image
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(GlobalStyles.ImageStyles(theme)['Image'], {
                    borderRadius: 80,
                  }),
                  dimensions.width,
                )}
                resizeMode={'cover'}
                source={Images.MalikSkydsgaardIgkwHPbVk8Unsplash}
              />
              {/* Edit */}
              <Image
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(GlobalStyles.ImageStyles(theme)['Image'], {
                    bottom: 5,
                    height: 20,
                    marginLeft: 42,
                    width: 20,
                  }),
                  dimensions.width,
                )}
                resizeMode={'cover'}
                source={Images.Edit}
              />
            </Touchable>
            <View style={StyleSheet.applyWidth({ alignItems: 'center' }, dimensions.width)} />
          </View>
          {/* Full name */}
          <View>
            <Text
              style={StyleSheet.applyWidth(
                {
                  color: theme.colors.strong,
                  fontFamily: 'Inter_400Regular',
                  opacity: 0.85,
                },
                dimensions.width,
              )}
            >
              {'Full name'}
            </Text>
            <TextInput
              style={StyleSheet.applyWidth(
                {
                  borderBottomWidth: 1,
                  borderColor: theme.colors['Light'],
                  borderLeftWidth: 1,
                  borderRadius: 8,
                  borderRightWidth: 1,
                  borderTopWidth: 1,
                  fontFamily: 'Inter_400Regular',
                  height: 48,
                  marginTop: 8,
                  paddingBottom: 8,
                  paddingLeft: 20,
                  paddingRight: 20,
                  paddingTop: 8,
                },
                dimensions.width,
              )}
              autoCapitalize={'none'}
              placeholder={'Enter a value...'}
              defaultValue={'Thomas Slebew'}
            />
          </View>
          {/* Email address */}
          <View style={StyleSheet.applyWidth({ marginTop: 20 }, dimensions.width)}>
            <Text
              style={StyleSheet.applyWidth(
                {
                  color: theme.colors.strong,
                  fontFamily: 'Inter_400Regular',
                  opacity: 0.85,
                },
                dimensions.width,
              )}
            >
              {'Email address'}
            </Text>
            <TextInput
              style={StyleSheet.applyWidth(
                {
                  borderBottomWidth: 1,
                  borderColor: theme.colors['Light'],
                  borderLeftWidth: 1,
                  borderRadius: 8,
                  borderRightWidth: 1,
                  borderTopWidth: 1,
                  fontFamily: 'Inter_400Regular',
                  height: 48,
                  marginTop: 8,
                  paddingBottom: 8,
                  paddingLeft: 20,
                  paddingRight: 20,
                  paddingTop: 8,
                },
                dimensions.width,
              )}
              autoCapitalize={'none'}
              placeholder={'Enter a value...'}
              defaultValue={'thomas@gmail.com'}
            />
          </View>
          {/* Birth date */}
          <View style={StyleSheet.applyWidth({ marginTop: 20 }, dimensions.width)}>
            <Text
              style={StyleSheet.applyWidth(
                {
                  color: theme.colors.strong,
                  fontFamily: 'Inter_400Regular',
                  opacity: 0.85,
                },
                dimensions.width,
              )}
            >
              {'User handle'}
            </Text>
            <TextInput
              style={StyleSheet.applyWidth(
                {
                  borderBottomWidth: 1,
                  borderColor: theme.colors['Light'],
                  borderLeftWidth: 1,
                  borderRadius: 8,
                  borderRightWidth: 1,
                  borderTopWidth: 1,
                  fontFamily: 'Inter_400Regular',
                  height: 48,
                  marginTop: 8,
                  paddingBottom: 8,
                  paddingLeft: 20,
                  paddingRight: 20,
                  paddingTop: 8,
                },
                dimensions.width,
              )}
              autoCapitalize={'none'}
              placeholder={'Enter a value...'}
              defaultValue={'@thomassle'}
            />
          </View>
          {/* Full address */}
          <View style={StyleSheet.applyWidth({ marginTop: 20 }, dimensions.width)}>
            <Text
              style={StyleSheet.applyWidth(
                {
                  color: theme.colors.strong,
                  fontFamily: 'Inter_400Regular',
                  opacity: 0.85,
                },
                dimensions.width,
              )}
            >
              {'Brief Bio'}
            </Text>
            <TextInput
              style={StyleSheet.applyWidth(
                {
                  borderBottomWidth: 1,
                  borderColor: theme.colors['Light'],
                  borderLeftWidth: 1,
                  borderRadius: 8,
                  borderRightWidth: 1,
                  borderTopWidth: 1,
                  fontFamily: 'Inter_400Regular',
                  height: 120,
                  marginTop: 8,
                  paddingBottom: 8,
                  paddingLeft: 20,
                  paddingRight: 20,
                  paddingTop: 12,
                },
                dimensions.width,
              )}
              placeholder={
                "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s."
              }
              textAlignVertical={'top'}
              multiline={true}
              numberOfLines={4}
              defaultValue={'Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum'}
            />
          </View>
        </View>
        {/* Update */}
        {/* <Button
          style={StyleSheet.applyWidth(
            {
              backgroundColor: theme.colors['Secondary'],
              borderRadius: 12,
              fontFamily: 'System',
              fontWeight: '700',
              height: 52,
              marginTop: 20,
              textAlign: 'center',
            },
            dimensions.width,
          )}
          activeOpacity={0.8}
          disabledOpacity={0.8}
          title={'Update '}
        /> */}
      </KeyboardAwareScrollView>
    </ScreenContainer>
  )
}

export default withTheme(EditAccountScreen)
