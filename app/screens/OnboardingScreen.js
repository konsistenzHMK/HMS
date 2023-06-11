import React from 'react'
import * as GlobalStyles from '../GlobalStyles.js'
import * as PagalFanBEApi from '../apis/PagalFanBEApi.js'
import * as GlobalVariables from '../config/GlobalVariableContext'
import Breakpoints from '../utils/Breakpoints'
import * as StyleSheet from '../utils/StyleSheet'
import getPushTokenUtil from '../utils/getPushToken'
import { Button, Icon, ScreenContainer, Swiper, SwiperItem, Switch, withTheme } from '@draftbit/ui'
import { FlashList } from '@shopify/flash-list'
import { ActivityIndicator, ScrollView, Text, TextInput, View, useWindowDimensions } from 'react-native'
import { useSnackbar } from '../components'

const OnboardingScreen = (props) => {
  const dimensions = useWindowDimensions()
  const Constants = GlobalVariables.useValues()
  const Variables = Constants
  const setGlobalVariableValue = GlobalVariables.useSetValue()

  // Adds to sports list if user toggles selection switch to Yes
  const addToSportsPrefs = (Variables, sportId) => {
    sportsPref.push(sportId)
    return
  }

  // Removes the sport if uses toggles switch to No
  const removeFromSportsPrefs = (Variables, sportId) => {
    const index = sportsPref.indexOf(sportId)
    if (index > -1) {
      sportsPref.splice(index, 1)
    }
    return sportsPref
  }

  const { theme } = props
  const { navigation } = props

  const pagalFanBECreateUserProfilePOST = PagalFanBEApi.useCreateUserProfilePOST()
  const pagalFanBEUpdateExpoTokenPATCH = PagalFanBEApi.useUpdateExpoTokenPATCH()

  const [age, setAge] = React.useState(0)
  const [firstName, setFirstName] = React.useState('')
  const [lastName, setLastName] = React.useState('')
  const [pickedMedia, setPickedMedia] = React.useState('')
  const [pickerValue, setPickerValue] = React.useState('')
  const [sportsPref, setSportsPref] = React.useState([])
  const [switchValue, setSwitchValue] = React.useState(false)
  const [test, setTest] = React.useState(false)
  const [textInputValue, setTextInputValue] = React.useState('')

  const snackbar = useSnackbar()

  return (
    <ScreenContainer
      style={StyleSheet.applyWidth({ marginLeft: 20, marginRight: 20, marginTop: 20 }, dimensions.width)}
      scrollable={false}
      hasSafeArea={true}
    >
      <Swiper
        style={StyleSheet.applyWidth(
          StyleSheet.compose(GlobalStyles.SwiperStyles(theme)['Swiper'], {
            height: 600,
          }),
          dimensions.width,
        )}
        dotColor={theme.colors.light}
        dotsTouchable={true}
        dotActiveColor={theme.colors['PF-Primary']}
      >
        {/* Swiper Intro */}
        <SwiperItem>
          {/* Welcome */}
          <View style={StyleSheet.applyWidth({ alignItems: 'center', marginTop: 60 }, dimensions.width)}>
            <Text
              style={StyleSheet.applyWidth(
                StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                  color: theme.colors['Secondary'],
                  fontFamily: 'Rubik_700Bold',
                  fontSize: 24,
                  marginBottom: 5,
                }),
                dimensions.width,
              )}
            >
              {'Welcome'}
            </Text>

            <Text
              style={StyleSheet.applyWidth(
                StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                  color: theme.colors['Secondary'],
                  fontFamily: 'Rubik_700Bold',
                  fontSize: 24,
                  marginBottom: 5,
                }),
                dimensions.width,
              )}
            >
              {'to'}
            </Text>

            <Text
              style={StyleSheet.applyWidth(
                StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                  color: theme.colors['Secondary'],
                  fontFamily: 'Rubik_700Bold',
                  fontSize: 40,
                  letterSpacing: 2,
                  marginBottom: 10,
                }),
                dimensions.width,
              )}
            >
              {'PagalFan'}
            </Text>
          </View>
          {/* Pic */}
          <View style={StyleSheet.applyWidth({ alignItems: 'center', marginTop: 40 }, dimensions.width)}>
            {/* Emoji */}
            <Text
              style={StyleSheet.applyWidth(
                StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                  fontSize: 48,
                }),
                dimensions.width,
              )}
            >
              {'🤟'}
            </Text>
          </View>
          {/* Instructions */}
          <View
            style={StyleSheet.applyWidth(
              {
                alignItems: 'center',
                marginLeft: 20,
                marginRight: 20,
                marginTop: 60,
              },
              dimensions.width,
            )}
          >
            <Text
              style={StyleSheet.applyWidth(
                StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                  color: theme.colors['PF-Grey'],
                  fontFamily: 'Rubik_300Light',
                  fontSize: 12,
                  textAlign: 'center',
                }),
                dimensions.width,
              )}
            >
              {"We'll ask you a couple of questions to personalise the app for you. It will take 30 secs of your time."}
            </Text>
          </View>
          {/* Instructions2 */}
          <View
            style={StyleSheet.applyWidth(
              {
                alignItems: 'center',
                marginLeft: 20,
                marginRight: 20,
                marginTop: 60,
              },
              dimensions.width,
            )}
          >
            <Text
              style={StyleSheet.applyWidth(
                StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                  color: theme.colors['Secondary'],
                  fontFamily: 'Rubik_500Medium',
                  fontSize: 12,
                  textAlign: 'center',
                }),
                dimensions.width,
              )}
            >
              {'Swipe to proceed -->'}
            </Text>
          </View>
        </SwiperItem>
        {/* Swiper Name */}
        <SwiperItem>
          {/* Title View */}
          <View style={StyleSheet.applyWidth({ alignItems: 'center', marginTop: 40 }, dimensions.width)}>
            <Text
              style={StyleSheet.applyWidth(
                StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                  color: theme.colors['PF-Grey'],
                  fontFamily: 'Rubik_500Medium',
                  fontSize: 20,
                }),
                dimensions.width,
              )}
            >
              {"what's your full name?"}
            </Text>
          </View>
          {/* Input View */}
          <View
            style={StyleSheet.applyWidth(
              {
                flexDirection: 'row',
                justifyContent: 'center',
                marginLeft: 20,
                marginRight: 20,
                marginTop: 60,
              },
              dimensions.width,
            )}
          >
            {/* First Name */}
            <TextInput
              onChangeText={(newFirstNameValue) => {
                try {
                  setFirstName(newFirstNameValue)
                } catch (err) {
                  console.error(err)
                }
              }}
              style={StyleSheet.applyWidth(
                StyleSheet.compose(GlobalStyles.TextInputStyles(theme)['Text Input'], {
                  color: theme.colors['PF-Grey'],
                  fontFamily: 'Rubik_400Regular',
                  marginRight: 20,
                  width: 140,
                }),
                dimensions.width,
              )}
              placeholder={'first'}
              value={firstName}
              autoCapitalize={'none'}
            />
            {/* Last Name */}
            <TextInput
              onChangeText={(newLastNameValue) => {
                try {
                  setLastName(newLastNameValue)
                } catch (err) {
                  console.error(err)
                }
              }}
              style={StyleSheet.applyWidth(
                StyleSheet.compose(GlobalStyles.TextInputStyles(theme)['Text Input'], {
                  color: theme.colors['PF-Grey'],
                  fontFamily: 'Rubik_400Regular',
                  width: 140,
                }),
                dimensions.width,
              )}
              placeholder={'last'}
              value={lastName}
              autoCapitalize={'none'}
            />
          </View>
          {/* Notes View */}
          <View
            style={StyleSheet.applyWidth(
              {
                alignItems: 'center',
                marginLeft: 20,
                marginRight: 20,
                marginTop: 40,
              },
              dimensions.width,
            )}
          >
            <Text
              style={StyleSheet.applyWidth(
                StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                  color: theme.colors['Studily_Slate_Gray'],
                  fontFamily: 'Rubik_300Light',
                  fontSize: 12,
                }),
                dimensions.width,
              )}
            >
              {'People use real names in PagalFan'}
            </Text>
          </View>
        </SwiperItem>
        {/* Swiper Age */}
        <SwiperItem>
          {/* Title View */}
          <View style={StyleSheet.applyWidth({ alignItems: 'center', marginTop: 40 }, dimensions.width)}>
            <Text
              style={StyleSheet.applyWidth(
                StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                  color: theme.colors['PF-Grey'],
                  fontFamily: 'Rubik_500Medium',
                  fontSize: 20,
                }),
                dimensions.width,
              )}
            >
              {"what's your age?"}
            </Text>
          </View>
          {/* Input View */}
          <View
            style={StyleSheet.applyWidth(
              {
                flexDirection: 'row',
                justifyContent: 'center',
                marginLeft: 20,
                marginRight: 20,
                marginTop: 60,
              },
              dimensions.width,
            )}
          >
            {/* Age */}
            <TextInput
              onChangeText={(newAgeValue) => {
                try {
                  setAge(newAgeValue)
                } catch (err) {
                  console.error(err)
                }
              }}
              style={StyleSheet.applyWidth(
                StyleSheet.compose(GlobalStyles.TextInputStyles(theme)['Text Input'], {
                  marginRight: 20,
                  textAlign: 'center',
                  width: 140,
                }),
                dimensions.width,
              )}
              placeholder={'age'}
              value={age}
              autoCapitalize={'none'}
            />
          </View>
          {/* Notes View */}
          <View
            style={StyleSheet.applyWidth(
              {
                alignItems: 'center',
                alignSelf: 'auto',
                marginLeft: 20,
                marginRight: 20,
                marginTop: 40,
              },
              dimensions.width,
            )}
          >
            <Text
              style={StyleSheet.applyWidth(
                StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                  alignSelf: 'auto',
                  color: theme.colors['Studily_Slate_Gray'],
                  fontFamily: 'Rubik_300Light',
                  fontSize: 12,
                  textAlign: 'center',
                }),
                dimensions.width,
              )}
            >
              {'This is to personalise your experience and will not be visible on your profile.'}
            </Text>
          </View>
        </SwiperItem>
        {/* Swiper Sports */}
        <SwiperItem>
          {/* Title View */}
          <View style={StyleSheet.applyWidth({ alignItems: 'center', marginTop: 40 }, dimensions.width)}>
            <Text
              style={StyleSheet.applyWidth(
                StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                  color: theme.colors['PF-Grey'],
                  fontFamily: 'Rubik_500Medium',
                  fontSize: 20,
                  textAlign: 'center',
                }),
                dimensions.width,
              )}
            >
              {'what are 3 sports you enjoy watching or playing?'}
            </Text>
          </View>
          {/* Notes View */}
          <View
            style={StyleSheet.applyWidth(
              {
                alignItems: 'center',
                alignSelf: 'auto',
                marginLeft: 20,
                marginRight: 20,
                marginTop: 20,
              },
              dimensions.width,
            )}
          >
            <Text
              style={StyleSheet.applyWidth(
                StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                  alignSelf: 'auto',
                  color: theme.colors['Studily_Slate_Gray'],
                  fontFamily: 'Rubik_300Light',
                  fontSize: 12,
                  textAlign: 'center',
                }),
                dimensions.width,
              )}
            >
              {'These sports appear on your profile and help you find interesting matches, players and fanclubs!'}
            </Text>
          </View>
          {/* Sports List */}
          <View
            style={StyleSheet.applyWidth(
              {
                flexDirection: 'column',
                justifyContent: 'flex-start',
                marginBottom: 20,
                marginLeft: 40,
                marginRight: 40,
                marginTop: 40,
              },
              dimensions.width,
            )}
          >
            <ScrollView
              style={StyleSheet.applyWidth({ height: 300 }, dimensions.width)}
              contentContainerStyle={StyleSheet.applyWidth({ flex: 1 }, dimensions.width)}
              showsHorizontalScrollIndicator={true}
              showsVerticalScrollIndicator={true}
              bounces={true}
            >
              <PagalFanBEApi.FetchFetchAllSportsGET>
                {({ loading, error, data, refetchFetchAllSports }) => {
                  const fetchData = data
                  if (!fetchData || loading) {
                    return <ActivityIndicator />
                  }

                  if (error) {
                    return <Text style={{ textAlign: 'center' }}>There was a problem fetching this data</Text>
                  }

                  return (
                    <FlashList
                      data={fetchData}
                      listKey={JSON.stringify(fetchData)}
                      keyExtractor={(flashListData) =>
                        flashListData?.id || flashListData?.uuid || JSON.stringify(flashListData)
                      }
                      renderItem={({ item }) => {
                        const flashListData = item
                        return (
                          <>
                            {/* Sport */}
                            <View
                              style={StyleSheet.applyWidth(
                                {
                                  backgroundColor: theme.colors['BG Gray'],
                                  borderRadius: 12,
                                  flexDirection: 'row',
                                  justifyContent: 'flex-start',
                                  marginBottom: 10,
                                  marginLeft: 30,
                                  marginRight: 30,
                                  padding: 5,
                                },
                                dimensions.width,
                              )}
                            >
                              {/* Left */}
                              <View
                                style={StyleSheet.applyWidth(
                                  {
                                    alignItems: 'center',
                                    flexDirection: 'row',
                                    width: 150,
                                  },
                                  dimensions.width,
                                )}
                              >
                                <Icon
                                  style={StyleSheet.applyWidth({ marginRight: 10 }, dimensions.width)}
                                  size={24}
                                  color={theme.colors['Secondary']}
                                  name={'MaterialCommunityIcons/star-three-points-outline'}
                                />
                                <Text
                                  style={StyleSheet.applyWidth(
                                    StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                                      color: theme.colors['PF-Grey'],
                                      fontFamily: 'Rubik_400Regular',
                                    }),
                                    dimensions.width,
                                  )}
                                >
                                  {flashListData?.name}
                                </Text>
                              </View>
                              <Switch
                                onValueChange={(newSwitchValue) => {
                                  try {
                                    const valuehSUVQ3cE = newSwitchValue
                                    setSwitchValue(valuehSUVQ3cE)
                                    const switchVal = valuehSUVQ3cE
                                    if (switchVal === true) {
                                      addToSportsPrefs(Variables, flashListData?.id)
                                    }
                                    if (switchVal === false) {
                                      removeFromSportsPrefs(Variables, flashListData?.id)
                                    }
                                    console.log(sportsPref)
                                  } catch (err) {
                                    console.error(err)
                                  }
                                }}
                                activeTrackColor={theme.colors['Secondary']}
                              />
                            </View>
                          </>
                        )
                      }}
                      estimatedItemSize={50}
                      numColumns={1}
                      onEndReachedThreshold={0.5}
                      showsVerticalScrollIndicator={true}
                      showsHorizontalScrollIndicator={false}
                    />
                  )
                }}
              </PagalFanBEApi.FetchFetchAllSportsGET>
            </ScrollView>
          </View>
          {/* Start Button */}
          <Button
            onPress={() => {
              const handler = async () => {
                try {
                  snackbar.show({ title: 'Saving user details …' })
                  await pagalFanBECreateUserProfilePOST.mutateAsync({
                    age: age,
                    firstName: firstName,
                    lastName: lastName,
                    sportsList: sportsPref,
                    userId: Constants['LOGGED_IN_USER'],
                    userOnboarded: true,
                  })
                  const onboarded = setGlobalVariableValue({
                    key: 'user_onboarded',
                    value: true,
                  })
                  // const expo_token = await getPushTokenUtil({})
                  // await pagalFanBEUpdateExpoTokenPATCH.mutateAsync({
                  //   expoToken: expo_token,
                  //   userId: Constants['LOGGED_IN_USER'],
                  // })
                  navigation.navigate('Tabs', { screen: 'HomeScreen' })
                } catch (err) {
                  snackbar.show({ title: 'Error saving user details …', variant: 'negative' })
                  console.error(err)
                }
              }
              handler()
            }}
            style={StyleSheet.applyWidth(
              StyleSheet.compose(GlobalStyles.ButtonStyles(theme)['Button'], {
                backgroundColor: theme.colors['Secondary'],
                fontFamily: 'Rubik_700Bold',
                fontSize: 14,
                marginLeft: 20,
                marginRight: 20,
              }),
              dimensions.width,
            )}
            title={'Get Started'}
          />
        </SwiperItem>
      </Swiper>
    </ScreenContainer>
  )
}

export default withTheme(OnboardingScreen)
