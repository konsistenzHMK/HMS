import React from 'react'
import * as GlobalStyles from '../GlobalStyles.js'
import * as PagalFanBEApi from '../apis/PagalFanBEApi.js'
import * as GlobalVariables from '../config/GlobalVariableContext'
import Images from '../config/Images'
import convertNullToTBD from '../global-functions/convertNullToTBD'
import getCorrectDateFormat from '../global-functions/getCorrectDateFormat'
import getCorrectTimeFormat from '../global-functions/getCorrectTimeFormat'
import * as StyleSheet from '../utils/StyleSheet'
import {
  Button,
  CircleImage,
  Divider,
  Icon,
  IconButton,
  Pressable,
  ScreenContainer,
  Surface,
  withTheme,
} from '@draftbit/ui'
import { useIsFocused } from '@react-navigation/native'
import { FlashList } from '@shopify/flash-list'
import {
  ActivityIndicator,
  FlatList,
  Image,
  ImageBackground,
  Modal,
  ScrollView,
  Text,
  View,
  useWindowDimensions,
} from 'react-native'

const HomeScreen = (props) => {
  const dimensions = useWindowDimensions()
  const Constants = GlobalVariables.useValues()
  const setGlobalVariableValue = GlobalVariables.useSetValue()

  const navigateOnInvalidAuth = () => {
    return props.navigation.navigate('SignupStartScreen')
  }

  const { theme } = props
  const { navigation } = props

  const isFocused = useIsFocused()
  React.useEffect(() => {
    const handler = async () => {
      console.log('Screen ON_SCREEN_FOCUS Start')
      let error = null
      try {
        if (!isFocused) {
          return
        }
        console.log('Start ON_SCREEN_FOCUS:0 CUSTOM_FUNCTION')
        if (!Constants['AUTHORIZATION_HEADER']) {
          navigateOnInvalidAuth()
          console.log('Complete ON_SCREEN_FOCUS:0 CUSTOM_FUNCTION')
        } else {
          console.log('Skipped ON_SCREEN_FOCUS:0 CUSTOM_FUNCTION: condition not met')
        }
        console.log('Start ON_SCREEN_FOCUS:1 TERMINATION_CHECK')
        if (!Constants['AUTHORIZATION_HEADER']) {
          return
        }
        console.log('Complete ON_SCREEN_FOCUS:1 TERMINATION_CHECK')
        console.log('Start ON_SCREEN_FOCUS:2 FETCH_REQUEST')
        const apiResponseResult = await PagalFanBEApi.fetchSingleUserGET(Constants, {
          id: Constants['LOGGED_IN_USER'],
        })
        console.log('Complete ON_SCREEN_FOCUS:2 FETCH_REQUEST', {
          apiResponseResult,
        })
        console.log('Start ON_SCREEN_FOCUS:3 SET_GLOBAL_VARIABLE')
        const test = setGlobalVariableValue({
          key: 'user_can_post',
          value: apiResponseResult && apiResponseResult[0]?.can_post,
        })
        console.log('Complete ON_SCREEN_FOCUS:3 SET_GLOBAL_VARIABLE', { test })
        const prof = (() => {
          console.log('Start ON_SCREEN_FOCUS:4 SET_GLOBAL_VARIABLE')
          if ((apiResponseResult && apiResponseResult[0].profile_image)?.length > 0) {
            const __result = setGlobalVariableValue({
              key: 'user_profile_pic_url',
              value: apiResponseResult && apiResponseResult[0]?.profile_image,
            })
            console.log('Complete ON_SCREEN_FOCUS:4 SET_GLOBAL_VARIABLE', {
              prof,
            })
            return __result
          } else {
            console.log('Skipped ON_SCREEN_FOCUS:4 SET_GLOBAL_VARIABLE: condition not met')
          }
        })()
        setGlobalVariableValue({
          key: 'user_first_name',
          value: apiResponseResult && apiResponseResult[0]?.first_name,
        })
        setGlobalVariableValue({
          key: 'user_last_name',
          value: apiResponseResult && apiResponseResult[0]?.last_name,
        })
      } catch (err) {
        console.error(err)
        error = err.message ?? err
      }
      console.log('Screen ON_SCREEN_FOCUS Complete', error ? { error } : 'no error')
    }
    handler()
  }, [isFocused])

  const [TestVar, setTestVar] = React.useState({})
  const [loading, setLoading] = React.useState(true)
  const [showBakarrPopup, setShowBakarrPopup] = React.useState(false)
  const [textInputValue, setTextInputValue] = React.useState('')

  const handleStartBakerRoomPress = () => {
    try {
      setShowBakarrPopup(false)
      const roomCode = Constants['HMS_ROOM_CODE']
      const username = `${Constants['user_first_name']} ${Constants['user_last_name']}`
      console.log('Username ', username)
      navigation.navigate('BakarRoom', { roomCode, username })
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <ScreenContainer
      style={StyleSheet.applyWidth(
        {
          backgroundColor: theme.colors['PF-BG'],
          marginLeft: 10,
          marginRight: 10,
          marginTop: 10,
        },
        dimensions.width,
      )}
      hasTopSafeArea={false}
      hasBottomSafeArea={false}
      scrollable={false}
      hasSafeArea={true}
    >
      {/* Header */}
      <View
        style={StyleSheet.applyWidth(
          {
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 10,
          },
          dimensions.width,
        )}
      >
        {/* TopLeft */}
        <View style={StyleSheet.applyWidth({ alignItems: 'flex-start', flexDirection: 'column' }, dimensions.width)}>
          <Text
            style={StyleSheet.applyWidth(
              StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                color: theme.colors['PF-Grey'],
                fontFamily: 'Inter_400Regular',
                fontSize: 12,
              }),
              dimensions.width,
            )}
          >
            {'Yo'}
          </Text>

          <Text
            style={StyleSheet.applyWidth(
              StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                color: theme.colors['PF-Grey'],
                fontFamily: 'Inter_700Bold',
                fontSize: 24,
              }),
              dimensions.width,
            )}
          >
            {'PagalFan 🤟'}
          </Text>
        </View>
        {/* TopRight */}
        <View
          style={StyleSheet.applyWidth(
            { flexDirection: 'row', justifyContent: 'flex-end', marginTop: 10 },
            dimensions.width,
          )}
        >
          <View style={StyleSheet.applyWidth({ marginRight: 10 }, dimensions.width)}>
            {/* Notif */}
            <Icon size={24} name={'Feather/bell'} color={theme.colors['PF-Grey']} />
            {/* New */}
            <Icon
              style={StyleSheet.applyWidth(
                {
                  backgroundColor: '"rgba(0, 0, 0, 0)"',
                  position: 'absolute',
                  right: -10,
                  top: -12,
                  zIndex: 2,
                },
                dimensions.width,
              )}
              name={'Entypo/dot-single'}
              color={theme.colors['PF-Primary']}
              size={32}
            />
          </View>

          <Pressable
            onPress={() => {
              try {
                navigation.navigate('Tabs', { screen: 'MyProfileScreen' })
              } catch (err) {
                console.error(err)
              }
            }}
          >
            <Surface
              style={StyleSheet.applyWidth(
                {
                  borderRadius: 20,
                  justifyContent: 'center',
                  overflow: 'hidden',
                },
                dimensions.width,
              )}
              elevation={3}
            >
              {/* userpic */}
              {Constants['user_profile_pic_url'] && (
                <CircleImage size={24} source={{ uri: `${Constants['user_profile_pic_url']}` }} />
              )}
            </Surface>
          </Pressable>
        </View>
      </View>
      {/* BakarrView */}
      <View
        style={StyleSheet.applyWidth(
          StyleSheet.compose(GlobalStyles.ViewStyles(theme)['BakarrHeader'], {
            marginBottom: 2,
            marginTop: 2,
          }),
          dimensions.width,
        )}
      >
        {/* Card */}
        <View
          style={StyleSheet.applyWidth(
            {
              borderBottomWidth: 1,
              borderColor: theme.colors['Secondary'],
              borderLeftWidth: 1,
              borderRightWidth: 1,
              borderTopWidth: 1,
              paddingLeft: 4,
            },
            dimensions.width,
          )}
        >
          <View style={StyleSheet.applyWidth({ flexDirection: 'column' }, dimensions.width)}>
            {/* LiveBadge */}
            <View
              style={StyleSheet.applyWidth(
                {
                  alignItems: 'center',
                  backgroundColor: theme.colors['PF-Primary'],
                  flexDirection: 'row',
                  paddingLeft: 2,
                  paddingRight: 2,
                  width: 80,
                },
                dimensions.width,
              )}
            >
              <Text
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                    color: theme.colors['PF-BG'],
                    fontFamily: 'Inter_600SemiBold',
                    fontSize: 10,
                  }),
                  dimensions.width,
                )}
              >
                {'LIVE NOW'}
              </Text>
              <Icon
                style={StyleSheet.applyWidth({ marginLeft: 4 }, dimensions.width)}
                name={'Feather/radio'}
                size={20}
                color={theme.colors['PF-BG']}
              />
            </View>

            <View style={StyleSheet.applyWidth({ flexDirection: 'row' }, dimensions.width)}>
              <Image
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(GlobalStyles.ImageStyles(theme)['Image'], {
                    borderRadius: 20,
                    height: 80,
                    marginRight: 10,
                    width: 80,
                  }),
                  dimensions.width,
                )}
                resizeMode={'cover'}
                source={Images.Mic1}
              />
              {/* CardRight */}
              <View
                style={StyleSheet.applyWidth(
                  {
                    alignItems: 'flex-start',
                    flexWrap: 'nowrap',
                    marginLeft: 8,
                  },
                  dimensions.width,
                )}
              >
                {/* Title */}
                <Text
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                      color: theme.colors['Secondary'],
                      fontFamily: 'Rubik_600SemiBold',
                      fontSize: 12,
                    }),
                    dimensions.width,
                  )}
                >
                  {'Post-Match BAKARR'}
                </Text>

                <Text
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                      fontSize: 10,
                      marginBottom: 4,
                    }),
                    dimensions.width,
                  )}
                >
                  {
                    'What could CSK have done differently to win? \nOr was MI more likely to win on a turning pitch? \nAssert your views in the PagalFan audio chatroom!!'
                  }
                </Text>

                <Pressable
                  onPress={() => {
                    try {
                      setShowBakarrPopup(true)
                    } catch (err) {
                      console.error(err)
                    }
                  }}
                  style={StyleSheet.applyWidth({ height: 25, marginRight: 40, width: '100%' }, dimensions.width)}
                >
                  <View
                    style={StyleSheet.applyWidth(
                      {
                        alignContent: 'flex-start',
                        alignItems: 'center',
                        backgroundColor: theme.colors['Secondary'],
                        borderRadius: 20,
                        height: 22,
                        justifyContent: 'center',
                        marginTop: 2,
                        width: 125,
                      },
                      dimensions.width,
                    )}
                  >
                    <Text
                      style={StyleSheet.applyWidth(
                        StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                          color: theme.colors['PF-BG'],
                          fontFamily: 'Montserrat_700Bold',
                          fontSize: 12,
                        }),
                        dimensions.width,
                      )}
                    >
                      {'DIVE IN 👋'}
                    </Text>
                  </View>
                </Pressable>
              </View>
            </View>
          </View>
        </View>
      </View>

      <ScrollView bounces={true} showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
        {/* AdView */}
        <View>
          {/* PF Banner */}
          <Image
            style={StyleSheet.applyWidth(
              StyleSheet.compose(GlobalStyles.ImageStyles(theme)['Image'], {
                height: 110,
                width: '100%',
              }),
              dimensions.width,
            )}
            source={Images.PFBanner1}
            resizeMode={'stretch'}
          />
        </View>
        <Divider
          style={StyleSheet.applyWidth(
            StyleSheet.compose(GlobalStyles.DividerStyles(theme)['Divider'], {
              height: 0.5,
              marginBottom: 10,
              marginLeft: 80,
              marginTop: 10,
              width: '50%',
            }),
            dimensions.width,
          )}
          color={theme.colors['PF-Primary']}
        />
        {/* MatchScroll */}
        <View>
          {/* SectionTitle */}
          <View
            style={StyleSheet.applyWidth({ flexDirection: 'row', justifyContent: 'space-between' }, dimensions.width)}
          >
            <View style={StyleSheet.applyWidth({ flexDirection: 'row' }, dimensions.width)}>
              <Text
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                    color: theme.colors['Community_Medium_Black'],
                    fontFamily: 'Inter_600SemiBold',
                    fontSize: 14,
                    marginBottom: 10,
                  }),
                  dimensions.width,
                )}
              >
                {'Live / Upcoming Matches'}
              </Text>
            </View>

            <Pressable
              onPress={() => {
                try {
                  navigation.navigate('Tabs', { screen: 'MatchDaysAllScreen' })
                } catch (err) {
                  console.error(err)
                }
              }}
            >
              <Text
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                    color: theme.colors['Secondary'],
                    fontFamily: 'Inter_300Light',
                    fontSize: 10,
                    marginBottom: 10,
                  }),
                  dimensions.width,
                )}
              >
                {'View All'}
              </Text>
            </Pressable>
          </View>

          <PagalFanBEApi.FetchFetchAllUpcomingMatchesGET>
            {({ loading, error, data, refetchFetchAllUpcomingMatches }) => {
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
                  listKey={'4s9ucyo4'}
                  keyExtractor={(flashListData) =>
                    flashListData?.id || flashListData?.uuid || JSON.stringify(flashListData)
                  }
                  renderItem={({ item }) => {
                    const flashListData = item
                    return (
                      <Pressable
                        onPress={() => {
                          try {
                            navigation.navigate('MatchDaySingleScreen', {
                              match_id: flashListData?.id,
                            })
                          } catch (err) {
                            console.error(err)
                          }
                        }}
                      >
                        {/* MatchCard */}
                        <View
                          style={StyleSheet.applyWidth(
                            {
                              alignItems: 'stretch',
                              borderBottomWidth: 1,
                              borderColor: theme.colors['App Green'],
                              borderLeftWidth: 1,
                              borderRadius: 12,
                              borderRightWidth: 1,
                              height: 100,
                              marginRight: 14,
                              padding: 2,
                              paddingTop: 2,
                              width: 160,
                            },
                            dimensions.width,
                          )}
                        >
                          {/* LiveBadge */}
                          <>
                            {!flashListData?.match_is_live ? null : (
                              <View
                                style={StyleSheet.applyWidth(
                                  {
                                    backgroundColor: theme.colors['PF-Primary'],
                                    marginBottom: 2,
                                    paddingLeft: 2,
                                    paddingRight: 2,
                                  },
                                  dimensions.width,
                                )}
                              >
                                <Text
                                  style={StyleSheet.applyWidth(
                                    StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                                      color: theme.colors['Background'],
                                      fontFamily: 'Inter_600SemiBold',
                                      fontSize: 7,
                                    }),
                                    dimensions.width,
                                  )}
                                >
                                  {'LIVE'}
                                </Text>
                              </View>
                            )}
                          </>
                          <View
                            style={StyleSheet.applyWidth(
                              {
                                backgroundColor: theme.colors['Custom #eb3a4a'],
                                borderTopLeftRadius: 12,
                                borderTopRightRadius: 12,
                                marginBottom: 4,
                              },
                              dimensions.width,
                            )}
                          >
                            {/* MatchName */}
                            <Text
                              style={StyleSheet.applyWidth(
                                StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                                  alignSelf: 'center',
                                  color: theme.colors['Community_White'],
                                  fontFamily: 'Inter_600SemiBold',
                                  fontSize: 13,
                                  marginBottom: 2,
                                  textDecorationLine: 'none',
                                }),
                                dimensions.width,
                              )}
                            >
                              {flashListData?.title}
                            </Text>
                          </View>
                          {/* Teams */}
                          <View
                            style={StyleSheet.applyWidth(
                              {
                                alignItems: 'center',
                                flexDirection: 'row',
                                justifyContent: 'space-around',
                                marginBottom: 4,
                                marginTop: 4,
                              },
                              dimensions.width,
                            )}
                          >
                            {/* Team-1 */}
                            <View
                              style={StyleSheet.applyWidth(
                                {
                                  alignItems: 'center',
                                  flexDirection: 'row',
                                  justifyContent: 'space-between',
                                },
                                dimensions.width,
                              )}
                            >
                              {/* Logo */}
                              <Image
                                style={StyleSheet.applyWidth(
                                  StyleSheet.compose(GlobalStyles.ImageStyles(theme)['Image'], {
                                    height: 24,
                                    marginRight: 1,
                                    width: 24,
                                  }),
                                  dimensions.width,
                                )}
                                resizeMode={'cover'}
                                source={{
                                  uri: `${flashListData?.team_1?.logo_path}`,
                                }}
                              />
                              {/* Name */}
                              <Text
                                style={StyleSheet.applyWidth(
                                  StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                                    color: theme.colors['Community_Highlight_Blue'],
                                    fontFamily: 'Inter_600SemiBold',
                                    fontSize: 13,
                                    marginLeft: 2,
                                  }),
                                  dimensions.width,
                                )}
                              >
                                {convertNullToTBD(flashListData?.team_1?.team_initials)}
                              </Text>
                            </View>
                            {/* vs */}
                            <Text
                              style={StyleSheet.applyWidth(
                                StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                                  color: theme.colors['Custom #eb3a4a'],
                                  fontFamily: 'Inter_600SemiBold',
                                  fontSize: 12,
                                }),
                                dimensions.width,
                              )}
                            >
                              {'v/s'}
                            </Text>
                            {/* Team-2 */}
                            <View
                              style={StyleSheet.applyWidth(
                                {
                                  alignItems: 'center',
                                  flexDirection: 'row',
                                  justifyContent: 'space-between',
                                },
                                dimensions.width,
                              )}
                            >
                              {/* Name */}
                              <Text
                                style={StyleSheet.applyWidth(
                                  StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                                    color: theme.colors['Community_Highlight_Blue'],
                                    fontFamily: 'Inter_600SemiBold',
                                    fontSize: 13,
                                    marginRight: 2,
                                  }),
                                  dimensions.width,
                                )}
                              >
                                {convertNullToTBD(flashListData?.team_2?.team_initials)}
                              </Text>
                              {/* Logo */}
                              <Image
                                style={StyleSheet.applyWidth(
                                  StyleSheet.compose(GlobalStyles.ImageStyles(theme)['Image'], {
                                    height: 20,
                                    marginRight: 1,
                                    width: 20,
                                  }),
                                  dimensions.width,
                                )}
                                resizeMode={'cover'}
                                source={{
                                  uri: `${flashListData?.team_2?.logo_path}`,
                                }}
                              />
                            </View>
                          </View>
                          {/* Details */}
                          <View
                            style={StyleSheet.applyWidth(
                              {
                                alignItems: 'center',
                                flexDirection: 'row',
                                justifyContent: 'center',
                                marginBottom: 4,
                                marginTop: 4,
                              },
                              dimensions.width,
                            )}
                          >
                            {/* Date */}
                            <Text
                              style={StyleSheet.applyWidth(
                                StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                                  color: theme.colors['PF-Grey'],
                                  fontFamily: 'Inter_600SemiBold',
                                  fontSize: 8,
                                  marginRight: 4,
                                }),
                                dimensions.width,
                              )}
                            >
                              {getCorrectDateFormat(flashListData?.match_date)}
                            </Text>
                            {/* StartTime */}
                            <Text
                              style={StyleSheet.applyWidth(
                                StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                                  color: theme.colors['PF-Grey'],
                                  fontFamily: 'Inter_600SemiBold',
                                  fontSize: 8,
                                }),
                                dimensions.width,
                              )}
                            >
                              {getCorrectTimeFormat(flashListData?.start_time)}
                            </Text>
                          </View>
                          {/* venue */}
                          <Text
                            style={StyleSheet.applyWidth(
                              StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                                alignSelf: 'center',
                                color: theme.colors['PF-Grey'],
                                fontFamily: 'Inter_600SemiBold',
                                fontSize: 10,
                              }),
                              dimensions.width,
                            )}
                          >
                            {flashListData?.venue_city}
                          </Text>
                        </View>
                      </Pressable>
                    )
                  }}
                  estimatedItemSize={50}
                  numColumns={1}
                  onEndReachedThreshold={0.5}
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                  showsVerticalScrollIndicator={false}
                />
              )
            }}
          </PagalFanBEApi.FetchFetchAllUpcomingMatchesGET>
        </View>
        <Divider
          style={StyleSheet.applyWidth(
            StyleSheet.compose(GlobalStyles.DividerStyles(theme)['Divider'], {
              height: 0.5,
              marginBottom: 10,
              marginLeft: 80,
              marginTop: 10,
              width: '50%',
            }),
            dimensions.width,
          )}
          color={theme.colors['PF-Primary']}
        />
        {/* ClubScroll */}
        <View>
          {/* Title */}
          <View
            style={StyleSheet.applyWidth({ flexDirection: 'row', justifyContent: 'space-between' }, dimensions.width)}
          >
            <Text
              style={StyleSheet.applyWidth(
                StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                  color: theme.colors['Community_Medium_Black'],
                  fontFamily: 'Inter_600SemiBold',
                  fontSize: 14,
                  marginBottom: 10,
                }),
                dimensions.width,
              )}
            >
              {'Find Your PagalFan Club'}
            </Text>

            <Pressable
              onPress={() => {
                try {
                  navigation.navigate('MyFanClubsScreen')
                } catch (err) {
                  console.error(err)
                }
              }}
            >
              <Text
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                    color: theme.colors['Secondary'],
                    fontFamily: 'Inter_300Light',
                    fontSize: 10,
                    marginBottom: 10,
                  }),
                  dimensions.width,
                )}
              >
                {'View All'}
              </Text>
            </Pressable>
          </View>

          <PagalFanBEApi.FetchFetchAllFanClubsGET>
            {({ loading, error, data, refetchFetchAllFanClubs }) => {
              const fetchData = data
              if (!fetchData || loading) {
                return <ActivityIndicator />
              }

              if (error) {
                return <Text style={{ textAlign: 'center' }}>There was a problem fetching this data</Text>
              }

              return (
                <>
                  <FlashList
                    data={fetchData}
                    listKey={'b48x7awR'}
                    keyExtractor={(flashListData) =>
                      flashListData?.id || flashListData?.uuid || JSON.stringify(flashListData)
                    }
                    renderItem={({ item }) => {
                      const flashListData = item
                      return (
                        <Pressable
                          onPress={() => {
                            try {
                              navigation.navigate('FanClubSingleScreen', {
                                id: flashListData?.id,
                              })
                            } catch (err) {
                              console.error(err)
                            }
                          }}
                        >
                          {/* ClubCard */}
                          <View
                            style={StyleSheet.applyWidth(
                              {
                                alignItems: 'center',
                                marginRight: 14,
                                width: 90,
                              },
                              dimensions.width,
                            )}
                          >
                            <Image
                              style={StyleSheet.applyWidth(
                                StyleSheet.compose(GlobalStyles.ImageStyles(theme)['Image'], {
                                  borderBottomWidth: 1,
                                  borderColor: theme.colors['App Green'],
                                  borderRadius: 12,
                                  borderTopWidth: 1,
                                  height: 80,
                                  width: 80,
                                }),
                                dimensions.width,
                              )}
                              resizeMode={'stretch'}
                              source={{
                                uri: `${flashListData?.teams?.logo_path}`,
                              }}
                            />
                            <Text
                              style={StyleSheet.applyWidth(
                                StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                                  fontFamily: 'Inter_400Regular',
                                  fontSize: 8,
                                }),
                                dimensions.width,
                              )}
                              numberOfLines={1}
                              ellipsizeMode={'tail'}
                            >
                              {flashListData?.name}
                            </Text>
                          </View>
                        </Pressable>
                      )
                    }}
                    estimatedItemSize={50}
                    numColumns={1}
                    onEndReachedThreshold={0.5}
                    horizontal={true}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                  />
                </>
              )
            }}
          </PagalFanBEApi.FetchFetchAllFanClubsGET>
        </View>
        <Divider
          style={StyleSheet.applyWidth(
            StyleSheet.compose(GlobalStyles.DividerStyles(theme)['Divider'], {
              height: 0.5,
              marginBottom: 0,
              marginLeft: 80,
              marginTop: 10,
              width: '50%',
            }),
            dimensions.width,
          )}
          color={theme.colors['PF-Primary']}
        />
        {/* OPAddPostView */}
        <>
          {!Constants['user_can_post'] ? null : (
            <View style={StyleSheet.applyWidth({ alignItems: 'center', height: 20, zIndex: 1 }, dimensions.width)}>
              {/* AddPostButton */}
              <IconButton
                onPress={() => {
                  try {
                    navigation.navigate('CreatePostScreen')
                  } catch (err) {
                    console.error(err)
                  }
                }}
                style={StyleSheet.applyWidth({ bottom: -10, position: 'relative' }, dimensions.width)}
                icon={'MaterialIcons/add-circle'}
                color={theme.colors['Secondary']}
                size={50}
              />
            </View>
          )}
        </>
        {/* Feed */}
        <View style={StyleSheet.applyWidth({ flex: 1 }, dimensions.width)}>
          <ScrollView
            contentContainerStyle={StyleSheet.applyWidth({ flexDirection: 'column' }, dimensions.width)}
            bounces={true}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
          >
            <PagalFanBEApi.FetchFetchAllPostsGET>
              {({ loading, error, data, refetchFetchAllPosts }) => {
                const fetchData = data
                if (!fetchData || loading) {
                  return <ActivityIndicator />
                }

                if (error) {
                  return <Text style={{ textAlign: 'center' }}>There was a problem fetching this data</Text>
                }

                return (
                  <FlatList
                    data={fetchData}
                    listKey={'IOYEaY2u'}
                    keyExtractor={(listData) => listData?.id}
                    renderItem={({ item }) => {
                      const listData = item
                      return (
                        <Pressable
                          onPress={() => {
                            try {
                              navigation.navigate('PostDetailsScreen', {
                                post_id: listData?.id,
                              })
                            } catch (err) {
                              console.error(err)
                            }
                          }}
                          style={StyleSheet.applyWidth({ marginTop: 16, width: '50%' }, dimensions.width)}
                        >
                          <Surface
                            style={StyleSheet.applyWidth(
                              {
                                borderColor: theme.colors.viewBG,
                                borderLeftWidth: 1,
                                borderRadius: 12,
                                borderRightWidth: 1,
                                margin: 2,
                                marginBottom: 10,
                                minHeight: 40,
                              },
                              dimensions.width,
                            )}
                            elevation={3}
                          >
                            <View
                              style={StyleSheet.applyWidth(
                                {
                                  alignItems: 'flex-start',
                                  flex: 1,
                                  justifyContent: 'space-between',
                                  overflow: 'hidden',
                                  width: '100%',
                                },
                                dimensions.width,
                              )}
                            >
                              <View
                                style={StyleSheet.applyWidth(
                                  {
                                    borderRadius: 12,
                                    overflow: 'hidden',
                                    width: '100%',
                                  },
                                  dimensions.width,
                                )}
                              >
                                <ImageBackground
                                  style={StyleSheet.applyWidth(
                                    {
                                      alignItems: 'flex-start',
                                      height: 130,
                                      justifyContent: 'space-between',
                                      width: '100%',
                                    },
                                    dimensions.width,
                                  )}
                                  resizeMode={'stretch'}
                                  source={{ uri: `${listData?.image_path}` }}
                                >
                                  <Surface
                                    style={StyleSheet.applyWidth(
                                      {
                                        alignItems: 'center',
                                        backgroundColor: theme.colors['Studily_Opacity_25'],
                                        borderRadius: 12,
                                        height: 24,
                                        justifyContent: 'center',
                                        marginTop: 4,
                                        position: 'absolute',
                                        right: 2,
                                        top: 0,
                                        width: 24,
                                      },
                                      dimensions.width,
                                    )}
                                  >
                                    <Text
                                      style={StyleSheet.applyWidth(
                                        StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], { fontSize: 12 }),
                                        dimensions.width,
                                      )}
                                    >
                                      {listData?.emoji}
                                    </Text>
                                  </Surface>
                                  {/* Details */}
                                  <View
                                    style={StyleSheet.applyWidth(
                                      {
                                        alignItems: 'flex-start',
                                        backgroundColor: theme.colors['Studily_Opacity_25'],
                                        borderColor: theme.colors['Studily_Opacity_25'],
                                        bottom: 0,
                                        flex: 1,
                                        justifyContent: 'center',
                                        padding: 4,
                                        position: 'absolute',
                                        width: '100%',
                                      },
                                      dimensions.width,
                                    )}
                                  >
                                    {/* Title */}
                                    <Text
                                      style={StyleSheet.applyWidth(
                                        {
                                          color: theme.colors.custom_rgb255_255_255,
                                          fontFamily: 'Inter_400Regular',
                                          fontSize: 10,
                                          padding: 2,
                                        },
                                        dimensions.width,
                                      )}
                                      ellipsizeMode={'tail'}
                                      numberOfLines={2}
                                    >
                                      {'🖖 '}
                                      {listData?.caption}
                                    </Text>
                                  </View>
                                </ImageBackground>
                              </View>
                            </View>
                          </Surface>
                        </Pressable>
                      )
                    }}
                    style={StyleSheet.applyWidth(
                      StyleSheet.compose(GlobalStyles.FlatListStyles(theme)['List'], { width: '100%' }),
                      dimensions.width,
                    )}
                    contentContainerStyle={StyleSheet.applyWidth(
                      GlobalStyles.FlatListStyles(theme)['List'],
                      dimensions.width,
                    )}
                    onEndReachedThreshold={0.5}
                    showsVerticalScrollIndicator={false}
                    numColumns={2}
                    showsHorizontalScrollIndicator={false}
                  />
                )
              }}
            </PagalFanBEApi.FetchFetchAllPostsGET>
          </ScrollView>
        </View>
      </ScrollView>
      {/* BakarrModal */}
      <>
        {!showBakarrPopup ? null : (
          <Modal animationType={'slide'} transparent={true}>
            <View
              style={StyleSheet.applyWidth(
                {
                  bottom: 0,
                  left: 0,
                  opacity: 0.3,
                  position: 'absolute',
                  right: 0,
                  top: 0,
                },
                dimensions.width,
              )}
            />
            <View
              style={StyleSheet.applyWidth(
                {
                  backgroundColor: theme.colors['Community_Cream'],
                  borderTopLeftRadius: 24,
                  borderTopRightRadius: 24,
                  bottom: 0,
                  height: 254,
                  left: 0,
                  paddingBottom: 15,
                  paddingLeft: 20,
                  paddingRight: 20,
                  paddingTop: 15,
                  position: 'absolute',
                  right: 0,
                  width: '100%',
                },
                dimensions.width,
              )}
            >
              <Text
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                    alignSelf: 'center',
                    color: theme.colors['Secondary'],
                    fontFamily: 'Rubik_600SemiBold',
                    fontSize: 18,
                    marginBottom: 10,
                    marginTop: 10,
                  }),
                  dimensions.width,
                )}
              >
                {'Fan BAKARR - Event Details'}
              </Text>
              <Divider
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(GlobalStyles.DividerStyles(theme)['Divider'], { marginBottom: 10 }),
                  dimensions.width,
                )}
                color={theme.colors.divider}
              />
              {/* Event */}
              <View style={StyleSheet.applyWidth(GlobalStyles.ViewStyles(theme)['AddaCard'], dimensions.width)}>
                {/* DateBadgeView */}
                <View
                  style={StyleSheet.applyWidth(
                    {
                      alignContent: 'flex-start',
                      alignItems: 'center',
                      backgroundColor: '"rgba(0, 0, 0, 0)"',
                      flexDirection: 'row',
                      height: 20,
                      justifyContent: 'space-between',
                      marginBottom: 5,
                    },
                    dimensions.width,
                  )}
                >
                  <Text
                    style={StyleSheet.applyWidth(
                      StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], { fontFamily: 'Inter_600SemiBold' }),
                      dimensions.width,
                    )}
                  >
                    {'Today 7:30 pm'}
                  </Text>
                  <Icon size={24} name={'FontAwesome/calendar-plus-o'} />
                </View>
                {/* EventTitle */}
                <Text
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                      color: theme.colors['Strong'],
                      fontFamily: 'Rubik_600SemiBold',
                      fontSize: 14,
                    }),
                    dimensions.width,
                  )}
                >
                  {'CSK v/s MI - Post match'}
                </Text>

                <Text
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                      color: theme.colors['Strong'],
                      fontFamily: 'Rubik_400Regular_Italic',
                      fontSize: 12,
                    }),
                    dimensions.width,
                  )}
                >
                  {'What could either team have done better?'}
                </Text>
              </View>
              {/* Join Bakarr room */}
              <Button
                onPress={handleStartBakerRoomPress}
                style={StyleSheet.applyWidth(GlobalStyles.ButtonStyles(theme)['Button'], dimensions.width)}
                title={'START 🎙'}
              />
              {/* SkipButton */}
              <Button
                onPress={() => {
                  try {
                    setShowBakarrPopup(false)
                  } catch (err) {
                    console.error(err)
                  }
                }}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(GlobalStyles.ButtonStyles(theme)['Button'], {
                    backgroundColor: '"rgba(0, 0, 0, 0)"',
                    color: theme.colors['PF-Grey'],
                    fontFamily: 'System',
                    fontSize: 12,
                    fontWeight: '400',
                  }),
                  dimensions.width,
                )}
                title={'Skip for now'}
              />
            </View>
          </Modal>
        )}
      </>
    </ScreenContainer>
  )
}

export default withTheme(HomeScreen)
