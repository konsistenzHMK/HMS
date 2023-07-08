import React, { useRef } from 'react'
import * as GlobalStyles from '../GlobalStyles.js'
import * as PagalFanBEApi from '../apis/PagalFanBEApi.js'
import * as GlobalVariables from '../config/GlobalVariableContext'
import * as StyleSheet from '../utils/StyleSheet'
import { Button, Icon, ScreenContainer, Switch, withTheme } from '@draftbit/ui'
import { FlashList } from '@shopify/flash-list'
import {
  ActivityIndicator,
  FlatList,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  useWindowDimensions,
  StyleSheet as RNStyleSheet,
  Pressable,
} from 'react-native'
import { Image, useSnackbar } from '../components'
import messaging from '@react-native-firebase/messaging'
import { RemoteAvatars } from '../config/Images'
import { useNavigationContext } from '../navigation/NavigationContext.js'

const SWIPE_SCREENS = Array(4).fill()

const OnboardingScreen = (props) => {
  const dimensions = useWindowDimensions()
  const Constants = GlobalVariables.useValues()
  const Variables = Constants
  const { setStack } = useNavigationContext()

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
  const pagalFanBECreateUserProfilePOST = PagalFanBEApi.useCreateUserProfilePOST()
  const pagalFanBEUpdateExpoTokenPATCH = PagalFanBEApi.useUpdateExpoTokenPATCH()

  const [age, setAge] = React.useState(0)
  const [firstName, setFirstName] = React.useState('')
  const [lastName, setLastName] = React.useState('')
  const [sportsPref, setSportsPref] = React.useState([])
  const swiperRef = useRef(null)
  const [currentTabIndex, setCurrentTabIndex] = React.useState(0)
  const [selectedAvatarIndex, setSelectedAvatarIndex] = React.useState(0)

  const snackbar = useSnackbar()

  const validatUserDetails = () => {
    let message = null

    if (!firstName.length || !lastName.length) {
      message = 'Please enter valid first and last name'
    } else if (isNaN(age)) {
      message = 'Please enter valid age'
    } else if (sportsPref.length < 3) {
      message = 'Please select at least 3 sports'
    }

    if (message) {
      snackbar.show({ title: message, variant: 'negative' })
      return false
    }

    return true
  }

  const handleGetStarted = async () => {
    try {
      if (!validatUserDetails()) {
        return
      }

      snackbar.show({ title: 'Saving user details …' })

      await pagalFanBECreateUserProfilePOST.mutateAsync({
        age: age,
        firstName: firstName,
        lastName: lastName,
        sportsList: sportsPref,
        userId: Constants['LOGGED_IN_USER'],
        userOnboarded: true,
        imgUrl: RemoteAvatars[selectedAvatarIndex],
      })

      const token = await messaging().getToken()
      // expoToken -> notification_token
      await pagalFanBEUpdateExpoTokenPATCH.mutateAsync({
        expoToken: token,
        userId: Constants['LOGGED_IN_USER'],
      })

      // navigate to home screen
      setStack('app')
    } catch (err) {
      snackbar.show({ title: 'Error saving user details …', variant: 'negative' })
      console.error(err)
    }
  }

  const swipeToPage = (index) => {
    swiperRef.current?.scrollToIndex?.({ index, animated: true })
    setCurrentTabIndex(index)
  }

  const handleSubmit = () => {
    swipeToPage(currentTabIndex + 1)
  }

  const renderSwipeIntroPage = () => {
    return (
      <View>
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
      </View>
    )
  }

  const renderSwipeNamePage = () => {
    return (
      <View>
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
            {"What's your full name?"}
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
            onChangeText={setFirstName}
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
            returnKeyType="next"
            onSubmitEditing={handleSubmit}
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
      </View>
    )
  }

  const renderSwipeAgePage = () => {
    return (
      <View>
        {/* Title */}
        <Text style={[styles.title, { color: theme.colors['PF-Grey'] }]}>{"What's your age?"}</Text>
        {/* Age Input View */}
        <TextInput
          onChangeText={setAge}
          style={StyleSheet.applyWidth(
            StyleSheet.compose(GlobalStyles.TextInputStyles(theme)['Text Input'], {
              margin: 20,
              alignSelf: 'center',
              textAlign: 'center',
              width: 140,
            }),
            dimensions.width,
          )}
          placeholder={'age'}
          value={age}
          autoCapitalize={'none'}
          returnKeyType="Done"
        />
        {/* Notes View */}
        <Text
          style={StyleSheet.applyWidth(
            StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
              alignSelf: 'auto',
              color: theme.colors['Studily_Slate_Gray'],
              fontFamily: 'Rubik_300Light',
              fontSize: 12,
              textAlign: 'center',
              marginBottom: 40,
            }),
            dimensions.width,
          )}
        >
          {'This is to personalise your experience and will not be visible on your profile.'}
        </Text>
        {/* Avatar Title */}
        <Text style={[styles.title, { color: theme.colors['PF-Grey'] }]}>{'Pick your Avatar'}</Text>
        <View style={styles.avatarContainer}>
          {RemoteAvatars.map((item, index) => (
            <Pressable
              key={index}
              style={[styles.avatar, index === selectedAvatarIndex && styles.avatarSelected]}
              onPress={() => setSelectedAvatarIndex(index)}
            >
              <Image style={styles.avatarIcon} source={{ uri: item }} />
            </Pressable>
          ))}
        </View>
        <Pressable onPress={handleSubmit} style={styles.nextContainer}>
          <Text
            style={StyleSheet.applyWidth(
              StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                color: theme.colors['Secondary'],
                fontFamily: 'Rubik_500Medium',
                fontSize: 15,
                textAlign: 'center',
              }),
              dimensions.width,
            )}
          >
            {'Swipe next -->'}
          </Text>
        </Pressable>
      </View>
    )
  }

  const renderSwipeSportPage = () => {
    return (
      <View>
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
            {'What are 3 sports you enjoy watching or playing?'}
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
              {({ loading, error, data }) => {
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
                                  const switchVal = valuehSUVQ3cE
                                  if (switchVal === true) {
                                    addToSportsPrefs(Variables, flashListData?.id)
                                  }
                                  if (switchVal === false) {
                                    removeFromSportsPrefs(Variables, flashListData?.id)
                                  }
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
          onPress={handleGetStarted}
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
      </View>
    )
  }

  const renderSwipeItem = (index) => {
    switch (index) {
      case 0:
        return renderSwipeIntroPage()
      case 1:
        return renderSwipeNamePage()
      case 2:
        return renderSwipeAgePage()
      case 3:
        return renderSwipeSportPage()
      default:
        return null
    }
  }

  const renderDots = () => {
    return (
      <View
        style={StyleSheet.applyWidth(
          {
            flexDirection: 'row',
            justifyContent: 'center',
            marginBottom: 20,
          },
          dimensions.width,
        )}
      >
        {SWIPE_SCREENS.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={StyleSheet.applyWidth(
              {
                height: 10,
                aspectRatio: 1,
                borderRadius: 10,
                marginHorizontal: 3,
                backgroundColor: index === currentTabIndex ? theme.colors['PF-Primary'] : theme.colors.light,
              },
              dimensions.width,
            )}
            onPress={() => swipeToPage(index)}
          />
        ))}
      </View>
    )
  }

  const onScroll = ({ nativeEvent }) => {
    const { contentOffset, layoutMeasurement } = nativeEvent
    const index = Math.floor((contentOffset.x + layoutMeasurement.width / 2) / layoutMeasurement.width)

    if (index !== currentTabIndex) {
      setCurrentTabIndex(index)
    }
  }

  return (
    <ScreenContainer scrollable={false} hasSafeArea={true}>
      <FlatList
        ref={swiperRef}
        horizontal
        data={SWIPE_SCREENS}
        renderItem={({ index }) => {
          return (
            <View style={StyleSheet.applyWidth({ width: dimensions.width, padding: 20 }, dimensions.width)}>
              {renderSwipeItem(index)}
            </View>
          )
        }}
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={onScroll}
      />
      {renderDots()}
    </ScreenContainer>
  )
}

const styles = RNStyleSheet.create({
  title: {
    fontFamily: 'Rubik_500Medium',
    fontSize: 20,
    alignSelf: 'center',
    marginTop: 20,
  },
  avatarContainer: {
    alignSelf: 'center',
    flexDirection: 'row',
    width: 324,
    flexWrap: 'wrap',
    marginHorizontal: 30,
    marginTop: 30,
  },
  avatar: {
    height: 70,
    aspectRatio: 1,
    margin: 5,
  },
  avatarSelected: {
    borderColor: 'rgb(35, 197, 98)',
    borderWidth: 3,
    borderRadius: 40,
  },
  avatarIcon: {
    width: '100%',
    height: '100%',
  },
  nextContainer: {
    alignSelf: 'center',
    marginTop: 60,
  },
})

export default withTheme(OnboardingScreen)
