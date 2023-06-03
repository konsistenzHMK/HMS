import React from 'react'
import * as GlobalStyles from '../GlobalStyles.js'
import * as PagalFanBEApi from '../apis/PagalFanBEApi.js'
import * as GlobalVariables from '../config/GlobalVariableContext'
import uploadImage from '../global-functions/uploadImage'
import Breakpoints from '../utils/Breakpoints'
import * as StyleSheet from '../utils/StyleSheet'
import openImagePickerUtil from '../utils/openImagePicker'
import { Button, Circle, Icon, ScreenContainer, Touchable, withTheme } from '@draftbit/ui'
import { useIsFocused } from '@react-navigation/native'
import { Image, Text, TextInput, View, useWindowDimensions } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

const EditProfileScreen = (props) => {
  const dimensions = useWindowDimensions()
  const Constants = GlobalVariables.useValues()
  const Variables = Constants

  const { theme } = props
  const { navigation } = props

  const pagalFanBEUpdateUserProfilePATCH = PagalFanBEApi.useUpdateUserProfilePATCH()

  const isFocused = useIsFocused()
  React.useEffect(() => {
    const handler = async () => {
      try {
        if (!isFocused) {
          return
        }
        const userDetails = await PagalFanBEApi.fetchSingleUserGET(Constants, {
          id: Constants['LOGGED_IN_USER'],
        })
        console.log(userDetails)
        setFirstName(userDetails?.[0]?.first_name)
        setLastName(userDetails && userDetails[0]?.last_name)
        setUserHandle(userDetails && userDetails[0]?.handle)
        setBriefBio(userDetails?.[0]?.bio)
        setUserPic(
          (() => {
            const e = userDetails?.[0]?.profile_image
            console.log(e)
            return e
          })(),
        )
      } catch (err) {
        console.error(err)
      }
    }
    handler()
  }, [isFocused])

  const [briefBio, setBriefBio] = React.useState('')
  const [datePickerValue, setDatePickerValue] = React.useState(new Date())
  const [firstName, setFirstName] = React.useState('')
  const [lastName, setLastName] = React.useState('')
  const [textAreaValue, setTextAreaValue] = React.useState('')
  const [textInputValue, setTextInputValue] = React.useState('')
  const [userHandle, setUserHandle] = React.useState('')
  const [userPic, setUserPic] = React.useState('')

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
          <View style={StyleSheet.applyWidth({ alignItems: 'center', alignSelf: 'auto' }, dimensions.width)}>
            <Touchable
              onPress={() => {
                const handler = async () => {
                  try {
                    const imgPicked = await openImagePickerUtil({
                      allowsEditing: true,
                    })
                    setUserPic(imgPicked)
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
                    height: 100,
                    width: 100,
                  }),
                  dimensions.width,
                )}
                resizeMode={'cover'}
                source={{ uri: `${userPic}` }}
              />
              <Icon
                style={StyleSheet.applyWidth({ bottom: 5, height: 20, marginLeft: 42, width: 20 }, dimensions.width)}
                size={20}
                name={'Feather/edit'}
                color={theme.colors['Secondary']}
              />
            </Touchable>
          </View>
          {/* Name */}
          <View
            style={StyleSheet.applyWidth(
              {
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 10,
              },
              dimensions.width,
            )}
          >
            {/* First Name */}
            <View style={StyleSheet.applyWidth({ width: 150 }, dimensions.width)}>
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
                {'First Name'}
              </Text>
              <TextInput
                onChangeText={(newTextInputValue) => {
                  try {
                    setFirstName(newTextInputValue)
                  } catch (err) {
                    console.error(err)
                  }
                }}
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
                    paddingLeft: 10,
                    paddingRight: 10,
                    paddingTop: 8,
                  },
                  dimensions.width,
                )}
                value={firstName}
                autoCapitalize={'none'}
                placeholder={'Enter a value...'}
              />
            </View>
            {/* Last Name */}
            <View style={StyleSheet.applyWidth({ width: 150 }, dimensions.width)}>
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
                {'Last Name'}
              </Text>
              <TextInput
                onChangeText={(newTextInputValue) => {
                  try {
                    setLastName(newTextInputValue)
                  } catch (err) {
                    console.error(err)
                  }
                }}
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
                    paddingLeft: 10,
                    paddingRight: 10,
                    paddingTop: 8,
                  },
                  dimensions.width,
                )}
                value={lastName}
                autoCapitalize={'none'}
                placeholder={'Enter a value...'}
              />
            </View>
          </View>
          {/* User Handle */}
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
              onChangeText={(newTextInputValue) => {
                try {
                  setUserHandle(newTextInputValue)
                } catch (err) {
                  console.error(err)
                }
              }}
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
                  paddingLeft: 10,
                  paddingRight: 10,
                  paddingTop: 8,
                },
                dimensions.width,
              )}
              value={userHandle}
              autoCapitalize={'none'}
              placeholder={'Enter a value...'}
            />
          </View>
          {/* Bio */}
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
              onChangeText={(newTextAreaValue) => {
                try {
                  setBriefBio(newTextAreaValue)
                } catch (err) {
                  console.error(err)
                }
              }}
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
                  paddingLeft: 10,
                  paddingRight: 10,
                  paddingTop: 12,
                },
                dimensions.width,
              )}
              value={briefBio}
              placeholder={
                "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s."
              }
              textAlignVertical={'top'}
              multiline={true}
              numberOfLines={4}
            />
          </View>
        </View>
        {/* Update */}
        <Button
          onPress={() => {
            const handler = async () => {
              try {
                const remoteUrl = await uploadImage('user-bucket', userPic)

                const valueQdKRlmdM = remoteUrl
                setUserPic(valueQdKRlmdM)
                const newImgUrl = valueQdKRlmdM
                await pagalFanBEUpdateUserProfilePATCH.mutateAsync({
                  briefBio: briefBio,
                  firstName: firstName,
                  imgUrl: newImgUrl,
                  lastName: lastName,
                  userHandle: userHandle,
                  userId: Constants['LOGGED_IN_USER'],
                })
                navigation.navigate('MySettingsScreen')
              } catch (err) {
                console.error(err)
              }
            }
            handler()
          }}
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
        />
      </KeyboardAwareScrollView>
    </ScreenContainer>
  )
}

export default withTheme(EditProfileScreen)
