import React, { useEffect, useState } from 'react'
import * as GlobalStyles from '../GlobalStyles.js'
import * as PagalFanBEApi from '../apis/PagalFanBEApi.js'
import * as GlobalVariables from '../config/GlobalVariableContext'
import Images from '../config/Images'
import convertNullToTBD from '../global-functions/convertNullToTBD'
import convertUTCtoIST from '../global-functions/convertUTCtoIST'
import endDate from '../global-functions/endDate'
import getCorrectDateFormat from '../global-functions/getCorrectDateFormat'
import checkMatchDates from '../global-functions/matchType.js'
import getCorrectTimeFormat from '../global-functions/getCorrectTimeFormat'
import isDatetimeInRange from '../global-functions/isDatetimeInRange'
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
import { FlashList } from '@shopify/flash-list'
import {
  FlatList,
  Modal,
  ScrollView,
  Text,
  View,
  useWindowDimensions,
  StyleSheet as RNStyleSheet,
  RefreshControl,
} from 'react-native'
import messaging from '@react-native-firebase/messaging'
import { notificationStore } from '../store/notification.js'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Image, ShimmerPlaceHolder } from '../components'
import { FeedCard } from '../shared'
import branch from 'react-native-branch'
import { useTranslation } from 'react-i18next'

let nextPageFn = null

const HomeScreen = (props) => {
  const dimensions = useWindowDimensions()
  const Constants = GlobalVariables.useValues()
  const setGlobalVariableValue = GlobalVariables.useSetValue()
  const [unread, setUnread] = useState(false)
  const [feedLoadTimestamp, setFeedLoadTimestamp] = useState(Date.now())

  const { t: translate } = useTranslation()
  const { theme } = props
  const { navigation } = props

  useEffect(() => {
    const handler = async () => {
      try {
        const apiResponseResult = await PagalFanBEApi.fetchSingleUserGET(Constants, { id: Constants['LOGGED_IN_USER'] })
        setGlobalVariableValue({
          key: 'user_can_post',
          value: apiResponseResult && apiResponseResult[0]?.can_post,
        })

        if ((apiResponseResult && apiResponseResult?.[0]?.profile_image)?.length > 0) {
          setGlobalVariableValue({
            key: 'user_profile_pic_url',
            value: apiResponseResult && apiResponseResult?.[0]?.profile_image,
          })
        }
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
      }
    }
    handler()
  }, [])

  const handleDeeplink = (data) => {
    if (data.post_id) {
      navigation.navigate('PostListScreen', {
        post_id: data.post_id,
      })
    }
    if (data.follower_id) {
      navigation.navigate('OthersProfileScreen', {
        userid: data.follower_id,
      })
    }
    if (data.bakarr_post_id) {
      navigation.navigate('BakarrRecordingsScreen', {
        id: data.bakarr_post_id,
        timestamp: Date.now(),
      })
    }
  }

  useEffect(async () => {
    AsyncStorage.getItem('@notification').then((notifications) => {
      if (notifications) {
        notificationStore.update((s) => {
          s.notifications = JSON.parse(notifications)
        })
      }
    })

    messaging()
      .getInitialNotification()
      .then((remoteMessage) => {
        if (remoteMessage) {
          handleDeeplink(remoteMessage.data)
        }
      })

    const u1 = messaging().setBackgroundMessageHandler(async (remoteMessage) => {
      setUnread(true)
      notificationStore.update((s) => {
        s.notifications.push({ ...remoteMessage.notification, time: Date.now(), unread: true })
        AsyncStorage.setItem('@notification', JSON.stringify(s.notifications)).then(() => {
          console.log('notification saved')
        })
      })
    })

    const u2 = messaging().onMessage(async (remoteMessage) => {
      setUnread(true)
      notificationStore.update((s) => {
        s.notifications.push({
          ...remoteMessage.notification,
          data: remoteMessage.data,
          time: Date.now(),
          unread: true,
        })
        AsyncStorage.setItem('@notification', JSON.stringify(s.notifications)).then(() => {
          console.log('notification saved')
        })
      })
    })

    return () => {
      // remove messaging handler
      u1()
      u2()
    }
  }, [])

  useEffect(() => {
    const unsubscribe = branch.subscribe({
      onOpenComplete: ({ error, params }) => {
        if (!error) {
          handleDeeplink(params)
        }
      },
    })
    return unsubscribe
  }, [])

  const [isSessionLive, setIsSessionLive] = React.useState(false)
  const [showBakarrPopup, setShowBakarrPopup] = React.useState(false)

  const handleStartBakerRoomPress = () => {
    try {
      setShowBakarrPopup(false)
      const roomCode = Constants['HMS_ROOM_CODE']
      const username = `${Constants['user_first_name']} ${Constants['user_last_name']}`
      navigation.navigate('BakarRoomScreen', { roomCode, username })
    } catch (err) {
      console.error(err)
    }
  }

  const renderFeedItem = ({ item }) => {
    return <FeedCard feed={item} />
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
      hasTopSafeArea={true}
      hasBottomSafeArea={false}
      scrollable={false}
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
            {translate('HomeScreen.Text.Yo')}
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
            {translate('HomeScreen.Text.PagalFan')}
          </Text>
        </View>
        {/* TopRight */}
        <Pressable
          onPress={() => {
            setUnread(false)
            navigation.navigate('NotificationsScreen')
          }}
        >
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
                size={unread ? 32 : 0}
              />
            </View>

            <Pressable
              onPress={() => {
                try {
                  navigation.navigate('MyProfileScreen')
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
        </Pressable>
      </View>
      {/* Bakarr View */}
      <View style={StyleSheet.applyWidth({ flexDirection: 'column' }, dimensions.width)}>
        <PagalFanBEApi.FetchFetchNextBakarrSessionGET
          onData={(fetchData) => {
            try {
              const isLive = isDatetimeInRange(
                fetchData && fetchData[0]?.session_start,
                fetchData && fetchData[0]?.session_end,
              )
              setIsSessionLive(isLive)
            } catch (err) {
              console.error(err)
            }
          }}
        >
          {({ loading, error, data }) => {
            const fetchData = data
            if (!fetchData || loading) {
              return <BakarLoader />
            }

            if (error) {
              return <Text style={{ textAlign: 'center' }}>There was a problem fetching this data</Text>
            }

            return (
              <View
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(GlobalStyles.ViewStyles(theme)['BakarrHeader'], {
                    marginVertical: 2,
                    borderColor: theme.colors['Secondary'],
                    borderWidth: 1,
                    padding: 5,
                  }),
                  dimensions.width,
                )}
              >
                {/* LiveBadge */}
                <>
                  {!isSessionLive ? null : (
                    <View
                      style={StyleSheet.applyWidth(
                        {
                          alignItems: 'center',
                          backgroundColor: theme.colors['PF-Primary'],
                          flexDirection: 'row',
                          paddingLeft: 2,
                          paddingRight: 2,
                          width: 100,
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
                        {translate('HomeScreen.Text.LiveNow')}
                        {/* {"LIVE NOW"} */}
                      </Text>
                      <Icon
                        style={StyleSheet.applyWidth({ marginLeft: 4 }, dimensions.width)}
                        name={'Feather/radio'}
                        size={20}
                        color={theme.colors['PF-BG']}
                      />
                    </View>
                  )}
                </>
                {/* Details */}
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
                    {/* Header */}
                    <View
                      style={StyleSheet.applyWidth({ alignItems: 'center', flexDirection: 'row' }, dimensions.width)}
                    >
                      <Text
                        style={StyleSheet.applyWidth(
                          StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                            color: theme.colors['Secondary'],
                            fontFamily: 'Rubik_600SemiBold',
                            fontSize: 12,
                            marginRight: 4,
                          }),
                          dimensions.width,
                        )}
                      >
                        {translate('HomeScreen.Text.Bakarr')}
                      </Text>
                      {/* Time */}
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
                        {' '}
                        {convertUTCtoIST(fetchData && fetchData[0]?.session_start)}{' '}
                      </Text>
                    </View>
                    {/* Title */}
                    <Text
                      style={StyleSheet.applyWidth(
                        StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                          color: theme.colors['PF-Primary'],
                          fontFamily: 'Rubik_400Regular',
                          fontSize: 10,
                          marginBottom: 4,
                        }),
                        dimensions.width,
                      )}
                    >
                      {fetchData && fetchData[0]?.session_title}
                    </Text>

                    <Text
                      style={StyleSheet.applyWidth(
                        StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                          fontFamily: 'Rubik_400Regular',
                          fontSize: 10,
                          marginBottom: 4,
                        }),
                        dimensions.width,
                      )}
                    >
                      {translate('HomeScreen.Text.BakarrRoom')}
                    </Text>

                    {isSessionLive ? (
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
                            {translate('HomeScreen.Text.DiveIn')}
                          </Text>
                        </View>
                      </Pressable>
                    ) : null}
                  </View>
                </View>
              </View>
            )
          }}
        </PagalFanBEApi.FetchFetchNextBakarrSessionGET>
      </View>

      <ScrollView
        contentContainerStyle={StyleSheet.applyWidth({ flexDirection: 'column' }, dimensions.width)}
        bounces={true}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        onScroll={(e) => {
          let paddingToBottom = 5
          paddingToBottom += e.nativeEvent.layoutMeasurement.height

          if (e.nativeEvent.contentOffset.y >= e.nativeEvent.contentSize.height - paddingToBottom) {
            if (nextPageFn) nextPageFn()
          }
        }}
        refreshControl={<RefreshControl refreshing={false} onRefresh={() => setFeedLoadTimestamp(Date.now())} />}
      >
        {/* Bakarr Recordings */}
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
              {translate('HomeScreen.Text.BakarrRecordings')}
            </Text>

            <Pressable
              onPress={() => {
                try {
                  navigation.navigate('BakarrRecordingsScreen')
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
                {translate('HomeScreen.Text.ViewAll')}
              </Text>
            </Pressable>
          </View>

          <PagalFanBEApi.FetchFetchAllBakarrRecordingsGET>
            {({ loading, error, data }) => {
              const fetchData = data
              if (!fetchData || loading) {
                return <FanClubLoader />
              }

              if (error) {
                return <Text style={{ textAlign: 'center' }}>{translate('HomeScreen.Text.ProblemFetchData')}</Text>
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
                              navigation.navigate('BakarrRecordingsScreen', {
                                id: flashListData?.id,
                                timestamp: Date.now(),
                              })
                            } catch (err) {
                              console.error(err)
                            }
                          }}
                        >
                          {/* BakarrCard */}
                          <View
                            style={StyleSheet.applyWidth(
                              {
                                alignItems: 'center',
                                marginRight: 10,
                                width: 90,
                              },
                              dimensions.width,
                            )}
                          >
                            <Image
                              style={StyleSheet.applyWidth(
                                StyleSheet.compose(GlobalStyles.ImageStyles(theme)['Image'], {
                                  // borderBottomWidth: 3,
                                  borderColor: theme.colors['App Green'],
                                  borderRadius: 50,
                                  borderWidth: 1,
                                  marginBottom: 3,
                                  // borderTopWidth: 1,
                                  height: 70,
                                  width: 70,
                                }),
                                dimensions.width,
                              )}
                              resizeMode={'stretch'}
                              source={{
                                uri: `${flashListData?.image_url}`,
                              }}
                            />
                            <Text
                              style={StyleSheet.applyWidth(
                                StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                                  fontFamily: 'Inter_400Regular',
                                  fontSize: 9,
                                  textAlign: 'center',
                                }),
                                dimensions.width,
                              )}
                              numberOfLines={2}
                              ellipsizeMode={'tail'}
                            >
                              {flashListData?.session_title}
                            </Text>
                            <Text
                              style={StyleSheet.applyWidth(
                                StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                                  fontFamily: 'Inter_400Regular',
                                  fontSize: 7,
                                  marginBottom: 9,
                                }),
                                dimensions.width,
                              )}
                              numberOfLines={1}
                              ellipsizeMode={'tail'}
                            >
                              {'(' + flashListData?.language + ')'}
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
          </PagalFanBEApi.FetchFetchAllBakarrRecordingsGET>
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
              marginBottom: 7,
              marginLeft: 80,
              marginTop: 7,
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
                {translate('HomeScreen.Text.MatchesHeader')}
              </Text>
            </View>

            <Pressable
              onPress={() => {
                try {
                  navigation.navigate('MatchDaysAllScreen')
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
                {translate('HomeScreen.Text.ViewAll')}
              </Text>
            </Pressable>
          </View>

          <PagalFanBEApi.FetchFetchAllUpcomingMatchesGET>
            {({ loading, error, data }) => {
              const fetchData = data
              if (!fetchData || loading) {
                return <LiveUpcomingLoader />
              }

              if (error) {
                return <Text style={{ textAlign: 'center' }}>{translate('HomeScreen.Text.ProblemFetchData')}</Text>
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
                                  {translate('HomeScreen.Text.Live')}
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
                              {translate('HomeScreen.Text.vs')}
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
                              {checkMatchDates(flashListData?.match_date, flashListData?.end_date)
                                ? getCorrectDateFormat(flashListData?.match_date)
                                : getCorrectDateFormat(flashListData?.match_date)}
                              {checkMatchDates(flashListData?.match_date, flashListData?.end_date)
                                ? null
                                : endDate(flashListData?.end_date)}
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
                              {translate('HomeScreen.Text.IST')}
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
        {/* <Divider
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
        /> */}
        {/* ClubScroll */}
        {/* <View>
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
              {translate('HomeScreen.Text.FindFanClub')}
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
                {translate('HomeScreen.Text.ViewAll')}
              </Text>
            </Pressable>
          </View>

          <PagalFanBEApi.FetchFetchAllFanClubsGET>
            {({ loading, error, data }) => {
              const fetchData = data
              if (!fetchData || loading) {
                return <FanClubLoader />
              }

              if (error) {
                return <Text style={{ textAlign: 'center' }}>{translate('HomeScreen.Text.ProblemFetchData')}</Text>
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
        </View> */}

        <Divider
          style={StyleSheet.applyWidth(
            StyleSheet.compose(GlobalStyles.DividerStyles(theme)['Divider'], {
              height: 0.5,
              marginBottom: 5,
              marginLeft: 80,
              marginTop: 7,
              width: '50%',
            }),
            dimensions.width,
          )}
          color={theme.colors['PF-Primary']}
        />
        {/* Feed */}
        <View style={StyleSheet.applyWidth({ flex: 1 }, dimensions.width)}>
          <PagalFanBEApi.FetchFetchAllPostsGET key={`${feedLoadTimestamp}`}>
            {({ loading, error, data, nextPage }) => {
              nextPageFn = nextPage
              const fetchData = data
              if (!fetchData || loading) {
                return <FeedLoader />
              }

              if (error) {
                return <Text style={{ textAlign: 'center' }}>{translate('HomeScreen.Text.ProblemFetchData')}</Text>
              }

              return (
                <FlatList
                  data={fetchData}
                  listKey={'IOYEaY2u'}
                  keyExtractor={(listData) => listData?.id}
                  renderItem={renderFeedItem}
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
        </View>
      </ScrollView>
      {/* OPAddPostView */}
      <>
        {!Constants['user_can_post'] ? null : (
          <IconButton
            onPress={() => {
              try {
                navigation.navigate('CreatePostScreen')
              } catch (err) {
                console.error(err)
              }
            }}
            style={StyleSheet.applyWidth(
              {
                bottom: 10,
                position: 'absolute',
                alignSelf: 'center',
                zIndex: 999,
                backgroundColor: '#fff',
                borderRadius: 50,
              },
              dimensions.width,
            )}
            icon={'MaterialIcons/add-circle'}
            color={theme.colors['Secondary']}
            size={50}
          />
        )}
      </>
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
                  height: 200,
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
                {translate('HomeScreen.Text.EnteringBakarrRoom')}
              </Text>
              <Divider
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(GlobalStyles.DividerStyles(theme)['Divider'], { marginBottom: 10 }),
                  dimensions.width,
                )}
                color={theme.colors.divider}
              />
              {/* Join Bakarr room */}
              <Button
                onPress={handleStartBakerRoomPress}
                style={StyleSheet.applyWidth(GlobalStyles.ButtonStyles(theme)['Button'], dimensions.width)}
                title={translate('HomeScreen.Button.Proceed')}
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
                title={translate('HomeScreen.Text.Skip')}
              />
            </View>
          </Modal>
        )}
      </>
    </ScreenContainer>
  )
}

const LiveUpcomingLoader = () => {
  return (
    <View style={styles.shimmerContainer}>
      <ShimmerPlaceHolder style={styles.liveUpcomingShimmer} />
      <ShimmerPlaceHolder style={styles.liveUpcomingShimmer} />
    </View>
  )
}

const FanClubLoader = () => {
  return (
    <View style={styles.shimmerContainer}>
      <ShimmerPlaceHolder style={styles.fanClubShimmer} />
      <ShimmerPlaceHolder style={styles.fanClubShimmer} />
      <ShimmerPlaceHolder style={styles.fanClubShimmer} />
    </View>
  )
}

const FeedLoader = () => {
  return (
    <View style={styles.shimmerContainer}>
      <ShimmerPlaceHolder style={styles.feedShimmer} />
      <ShimmerPlaceHolder style={styles.feedShimmer} />
    </View>
  )
}

const BakarLoader = () => {
  return <ShimmerPlaceHolder style={styles.bakarShimmer} />
}

const styles = RNStyleSheet.create({
  shimmerContainer: {
    flexDirection: 'row',
  },
  liveUpcomingShimmer: {
    borderRadius: 12,
    height: 100,
    marginRight: 14,
    width: 160,
  },
  fanClubShimmer: {
    marginRight: 14,
    width: 80,
    height: 80,
    borderRadius: 45,
  },
  feedShimmer: {
    borderRadius: 12,
    margin: 2,
    marginBottom: 10,
    height: 100,
    width: '49%',
  },
  bakarShimmer: {
    height: 100,
    width: '100%',
    borderRadius: 10,
    marginBottom: 10,
  },
})

export default withTheme(HomeScreen)
