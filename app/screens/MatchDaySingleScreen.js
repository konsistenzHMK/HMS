import React from 'react'
import * as GlobalStyles from '../GlobalStyles.js'
import * as PagalFanBEApi from '../apis/PagalFanBEApi.js'
import * as GlobalVariables from '../config/GlobalVariableContext'
import Images from '../config/Images'
import TimeAgo from '../global-functions/TimeAgo'
import convertNullToTBD from '../global-functions/convertNullToTBD'
import convertUTCtoIST from '../global-functions/convertUTCtoIST'
import getCorrectDateFormat from '../global-functions/getCorrectDateFormat'
import getCorrectTimeFormat from '../global-functions/getCorrectTimeFormat'
import Breakpoints from '../utils/Breakpoints'
import * as StyleSheet from '../utils/StyleSheet'
import {
  Button,
  Circle,
  CircleImage,
  Divider,
  Icon,
  Pressable,
  ScreenContainer,
  TabView,
  TabViewItem,
  Touchable,
  withTheme,
} from '@draftbit/ui'
import { useIsFocused } from '@react-navigation/native'
import { FlashList } from '@shopify/flash-list'
import {
  ActivityIndicator,
  FlatList,
  Image,
  Modal,
  ScrollView,
  Text,
  TextInput,
  View,
  useWindowDimensions,
} from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Fetch } from 'react-request'

const MatchDaySingleScreen = (props) => {
  const dimensions = useWindowDimensions()
  const Constants = GlobalVariables.useValues()
  const Variables = Constants

  const MatchText = () => {
    const winner = jsonfeed?.data?.toss?.winner
    const name = jsonfeed?.data?.teams?.[winner]?.name
    var elected = jsonfeed?.data?.toss?.elected
    if (elected == 'bowl') elected = 'Bowl'
    else elected = 'Bat'
    var toss = name + ' Won The Toss and Elected to ' + elected + ' First'

    if (jsonfeed?.data?.play_status == 'pre_match') return toss
    return 'Match Yet To Start'
  }

  const hashtagsToArray = (hashtags) => {
    // Remove any leading or trailing whitespaces and split the string by commas
    const hashtagList = hashtags.trim().split(',')

    // Map over the array and remove the '#' character from each string
    const strippedList = hashtagList.map((hashtag) => {
      return hashtag.trim().replace('#', '')
    })

    // Return the array as a string representation
    return `{${strippedList.join(',')}}`
  }

  const GiveBowlingDetails = (rawName) => {
    var response = {
      name: jsonfeed?.data?.players?.[rawName]?.player?.name,
      runs: jsonfeed?.data?.players?.[rawName]?.score?.['1']?.bowling?.score?.runs,
      overs: jsonfeed?.data?.players?.[rawName]?.score?.['1']?.bowling?.score?.overs[0],
      economy: jsonfeed?.data?.players?.[rawName]?.score?.['1']?.bowling?.score?.economy,
      wickets: jsonfeed?.data?.players?.[rawName]?.score?.['1']?.bowling?.score?.wickets,
      maiden: jsonfeed?.data?.players?.[rawName]?.score?.['1']?.bowling?.score?.maiden_overs,
    }
    return response
  }

  const team2BattingOrder = () => {
    var team1
    var team2

    team1 = jsonfeed?.data?.play?.first_batting
    if (team1 == undefined) team1 = 'a'

    if (team1 == 'a') team2 = 'b'
    else team2 = 'a'

    var st
    if (team2 == 'a') st = 'a_1'
    else st = 'b_1'

    return jsonfeed?.data?.play?.innings?.[st]?.batting_order
  }

  const Team1Name = () => {
    var team1
    var team2

    team1 = jsonfeed?.data?.play?.first_batting
    if (team1 == undefined) team1 = 'a'
    if (team1 == 'a') team2 = 'b'
    else team2 = 'a'

    return jsonfeed?.data?.teams?.[team1]?.name
  }

  const Team2Score = () => {
    var team1
    var team2

    team1 = jsonfeed?.data?.play?.first_batting
    if (team1 == undefined) team1 = 'a'

    if (team1 == 'a') team2 = 'b'
    else team2 = 'a'

    var st
    console.log(team1, team2)
    if (team2 == 'a') st = 'a_1'
    else st = 'b_1'
    return jsonfeed?.data?.play?.innings?.[st]?.score_str
  }

  const GiveBatsmanDetails = (rawName) => {
    var response = {
      name: jsonfeed?.data?.players?.[rawName]?.player?.name,
      runs: jsonfeed?.data?.players?.[rawName]?.score?.['1']?.batting?.score?.runs,
      balls: jsonfeed?.data?.players?.[rawName]?.score?.['1']?.batting?.score?.balls,
      fours: jsonfeed?.data?.players?.[rawName]?.score?.['1']?.batting?.score?.fours,
      sixes: jsonfeed?.data?.players?.[rawName]?.score?.['1']?.batting?.score?.sixes,
      sr: jsonfeed?.data?.players?.[rawName]?.score?.['1']?.batting?.score?.strike_rate,
    }
    return response
  }

  const Team2Name = () => {
    var team1
    var team2

    team1 = jsonfeed?.data?.play?.first_batting
    if (team1 == undefined) team1 = 'a'

    if (team1 == 'a') team2 = 'b'
    else team2 = 'a'

    return jsonfeed?.data?.teams?.[team2]?.name
  }

  const Convert2Decimal = (int_val) => {
    var numFixed = int_val.toFixed(2)

    return numFixed
  }

  const StatusData = () => {
    var team1
    var team2

    team1 = jsonfeed?.data?.play?.first_batting

    if (team1 == 'a') team2 = 'b'
    else team2 = 'a'

    var ans

    if (jsonfeed?.data?.play_status == 'result') ans = jsonfeed?.data?.play?.result?.msg

    if (jsonfeed?.data?.play_status == 'in_play') {
      ans = jsonfeed?.data?.play?.live?.required_score?.title
    }
    if (jsonfeed?.data?.play_status == 'scheduled') {
      ans = 'Match is yet to start'
    }
    return ans
  }

  const showOutNotout = (rawName) => {
    var status_msg = jsonfeed?.data?.players?.[rawName]?.score?.['1']?.batting?.dismissal
    if (status_msg == null) {
      return 'not out'
    }

    return status_msg?.msg
  }

  const Team1Score = () => {
    var team1
    var team2

    team1 = jsonfeed?.data?.play?.first_batting
    if (team1 == undefined) team1 = 'a'

    if (team1 == 'a') team2 = 'b'
    else team2 = 'a'

    var st
    if (team1 == 'a') st = 'a_1'
    else st = 'b_1'
    return jsonfeed?.data?.play?.innings?.[st]?.score_str
  }

  const Team2BowlingOrder = () => {
    var team1
    var team2

    team1 = jsonfeed?.data?.play?.first_batting
    if (team1 == undefined) team1 = 'a'

    if (team1 == 'a') team2 = 'b'
    else team2 = 'a'

    var st
    if (team2 == 'a') st = 'a_1'
    else st = 'b_1'

    return jsonfeed?.data?.play?.innings?.[st]?.bowling_order
  }

  const setTeamSequence = () => {
    var team1
    var team2

    team1 = jsonfeed?.data?.play?.first_batting

    if (team1 == 'a') team2 = 'b'
    else team2 = 'a'

    return
  }

  const giveTossStatement = () => {
    var winner = jsonfeed?.data?.toss?.winner
    var name = jsonfeed?.data?.teams?.[winner]?.name
    var elected = jsonfeed?.data?.toss?.elected

    return name + ' won the toss and elected to ' + elected + ' first'
  }

  const Team1BattingOrder = () => {
    var team1
    var team2

    team1 = jsonfeed?.data?.play?.first_batting
    if (team1 == undefined) team1 = 'a'

    if (team1 == 'a') team2 = 'b'
    else team2 = 'a'

    var st
    if (team1 == 'a') st = 'a_1'
    else st = 'b_1'

    return jsonfeed?.data?.play?.innings?.[st]?.batting_order
  }

  const Team1BowlingOrder = () => {
    var team1
    var team2

    team1 = jsonfeed?.data?.play?.first_batting
    if (team1 == undefined) team1 = 'a'

    if (team1 == 'a') team2 = 'b'
    else team2 = 'a'

    var st
    if (team1 == 'a') st = 'a_1'
    else st = 'b_1'

    return jsonfeed?.data?.play?.innings?.[st]?.bowling_order
  }

  const NameMVP = () => {
    var mvp = jsonfeed?.data?.play?.result?.pom

    return jsonfeed?.data?.players?.[mvp]?.player?.name
  }

  const Team2RR = () => {
    var team1
    var team2

    team1 = jsonfeed?.data?.play?.first_batting
    if (team1 == undefined) team1 = 'a'

    if (team1 == 'a') team2 = 'b'
    else team2 = 'a'

    var st
    if (team2 == 'a') st = 'a_1'
    else st = 'b_1'

    return jsonfeed?.data?.play?.innings?.[st]?.score?.run_rate
  }

  const showScorecard = (result) => {
    //if(jsonfeed?.data?.play_status=="result" || jsonfeed?.data?.play_status=="in_play"
    //  || jsonfeed?.data?.play_status=="rain_delay") return true;

    if (jsonfeed?.data?.status == 'started' || jsonfeed?.data?.status == 'completed') return true
    return false
  }

  const getGameStatus = () => {
    if (jsonfeed?.data?.play_status == 'result') return 'RESULT'

    //if(jsonfeed?.data?.play_status=="in_play") return "Live";

    //play_status can even be "rain_delay" etc; hence checking for 'status' field instead
    if (jsonfeed?.data?.status == 'started') return 'Live'

    if (jsonfeed?.data?.play_status == 'scheduled') return 'Yet to start'

    if (jsonfeed?.data?.play_status == 'rain_delay') return 'Rain delay'
  }

  const boolCurrentTime = (time) => {
    var d = new Date()
    var curr_hour = d.getHours()
    var curr_min = d.getMinutes()

    var current = curr_hour * 60 + curr_min

    const myArray = time.split(':')
    var hr = parseInt(myArray[0])
    var min = parseInt(myArray[1])

    var matchTime = hr * 60 + min

    if (current >= matchTime) return true
    return false
  }

  const Team1RR = () => {
    var team1
    var team2

    team1 = jsonfeed?.data?.play?.first_batting
    if (team1 == undefined) team1 = 'a'

    if (team1 == 'a') team2 = 'b'
    else team2 = 'a'

    var st
    if (team1 == 'a') st = 'a_1'
    else st = 'b_1'

    return jsonfeed?.data?.play?.innings?.[st]?.score?.run_rate
  }

  const { theme } = props
  const { navigation } = props

  const pagalFanBEAddNewMatchCommentPOST = PagalFanBEApi.useAddNewMatchCommentPOST()

  const [Rz_match_key, setRz_match_key] = React.useState('')
  const [jsonfeed, setJsonfeed] = React.useState('Loading...')
  const [showBakarrPopup, setShowBakarrPopup] = React.useState(false)
  const [team1_name, setTeam1_name] = React.useState('')
  const [team2_name, setTeam2_name] = React.useState('')
  const [textInputValue, setTextInputValue] = React.useState('')

  return (
    <ScreenContainer
      style={StyleSheet.applyWidth({ marginLeft: 10, marginRight: 10, marginTop: 10 }, dimensions.width)}
      hasSafeArea={true}
      scrollable={false}
    >
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        enableOnAndroid={true}
        keyboardShouldPersistTaps={'always'}
        viewIsInsideTabBar={false}
      >
        {/* PF-BackHeader */}
        <View
          style={StyleSheet.applyWidth(
            StyleSheet.compose(GlobalStyles.ViewStyles(theme)['PF-BackHeader 7'], { paddingBottom: 4, paddingTop: 4 }),
            dimensions.width,
          )}
        >
          {/* Flex Frame for Touchable */}
          <View
            style={StyleSheet.applyWidth({ flexGrow: 1, flexShrink: 0, justifyContent: 'center' }, dimensions.width)}
          >
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
        {/* MatchHeader */}
        <View>
          <PagalFanBEApi.FetchFetchSingleMatchGET id={props.route?.params?.match_id ?? 77}>
            {({ loading, error, data, refetchFetchSingleMatch }) => {
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
                  listKey={'Ifl6UquP'}
                  keyExtractor={(listData) => listData?.id || listData?.uuid || JSON.stringify(listData)}
                  renderItem={({ item }) => {
                    const listData = item
                    return (
                      <>
                        {/* MatchDetailsView */}
                        <View
                          style={StyleSheet.applyWidth(
                            {
                              flexDirection: 'row',
                              flexShrink: 0,
                              justifyContent: 'space-around',
                              marginLeft: 10,
                            },
                            dimensions.width,
                          )}
                        >
                          {/* MatchCard */}
                          <View
                            style={StyleSheet.applyWidth(
                              StyleSheet.compose(GlobalStyles.ViewStyles(theme)['PF-MatchCard'], {
                                height: 100,
                                justifyContent: 'flex-start',
                                marginRight: 10,
                                width: 200,
                              }),
                              dimensions.width,
                            )}
                          >
                            {/* LiveBadge */}
                            <>
                              {!(getGameStatus(jsonfeed) === 'Live') ? null : (
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
                                        fontSize: 8,
                                      }),
                                      dimensions.width,
                                    )}
                                  >
                                    {'LIVE'}
                                  </Text>
                                </View>
                              )}
                            </>
                            {/* Teams */}
                            <View
                              style={StyleSheet.applyWidth(
                                {
                                  alignItems: 'center',
                                  flexDirection: 'column',
                                  justifyContent: 'space-around',
                                  marginBottom: 4,
                                  marginTop: 2,
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
                                    justifyContent: 'space-around',
                                  },
                                  dimensions.width,
                                )}
                              >
                                {/* Logo */}
                                <Image
                                  style={StyleSheet.applyWidth(
                                    StyleSheet.compose(GlobalStyles.ImageStyles(theme)['Image'], {
                                      height: 30,
                                      marginRight: 1,
                                      width: 30,
                                    }),
                                    dimensions.width,
                                  )}
                                  resizeMode={'cover'}
                                  source={{
                                    uri: `${listData?.team_1?.logo_path}`,
                                  }}
                                />
                                {/* Name */}
                                <Text
                                  style={StyleSheet.applyWidth(
                                    StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                                      color: theme.colors['PF-Grey'],
                                      fontFamily: 'Rubik_600SemiBold',
                                      fontSize: 14,
                                    }),
                                    dimensions.width,
                                  )}
                                >
                                  {convertNullToTBD(listData?.team_1?.team_name)}
                                </Text>
                              </View>
                              {/* vs */}
                              <Text
                                style={StyleSheet.applyWidth(
                                  StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                                    color: theme.colors['PF-Grey'],
                                    fontFamily: 'System',
                                    fontSize: 12,
                                    fontStyle: 'italic',
                                    fontWeight: '600',
                                    marginBottom: 2,
                                    marginTop: 2,
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
                                {/* Logo */}
                                <Image
                                  style={StyleSheet.applyWidth(
                                    StyleSheet.compose(GlobalStyles.ImageStyles(theme)['Image'], {
                                      height: 30,
                                      marginRight: 1,
                                      width: 30,
                                    }),
                                    dimensions.width,
                                  )}
                                  resizeMode={'cover'}
                                  source={{
                                    uri: `${listData?.team_2?.logo_path}`,
                                  }}
                                />
                                {/* Name */}
                                <Text
                                  style={StyleSheet.applyWidth(
                                    StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                                      color: theme.colors['PF-Grey'],
                                      fontFamily: 'Rubik_600SemiBold',
                                      fontSize: 14,
                                    }),
                                    dimensions.width,
                                  )}
                                >
                                  {convertNullToTBD(listData?.team_2?.team_name)}
                                </Text>
                              </View>
                            </View>
                          </View>
                          {/* Details */}
                          <View
                            style={StyleSheet.applyWidth(
                              {
                                alignItems: 'flex-end',
                                flexDirection: 'column',
                                justifyContent: 'flex-start',
                                marginTop: 20,
                                paddingLeft: 4,
                                paddingRight: 4,
                              },
                              dimensions.width,
                            )}
                          >
                            {/* MatchName */}
                            <Text
                              style={StyleSheet.applyWidth(
                                StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                                  color: theme.colors['Secondary'],
                                  fontFamily: 'Rubik_600SemiBold',
                                  fontSize: 12,
                                  marginBottom: 8,
                                  textDecorationLine: 'none',
                                }),
                                dimensions.width,
                              )}
                            >
                              {listData?.title}
                            </Text>
                            {/* Venue */}
                            <Text
                              style={StyleSheet.applyWidth(
                                StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                                  color: theme.colors['PF-Grey'],
                                  fontFamily: 'Rubik_400Regular',
                                  fontSize: 12,
                                  marginBottom: 2,
                                }),
                                dimensions.width,
                              )}
                            >
                              {listData?.venue_city}
                            </Text>
                            {/* Date */}
                            <Text
                              style={StyleSheet.applyWidth(
                                StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                                  color: theme.colors['PF-Grey'],
                                  fontFamily: 'Rubik_400Regular',
                                  fontSize: 11,
                                  marginBottom: 2,
                                }),
                                dimensions.width,
                              )}
                            >
                              {getCorrectDateFormat(listData?.match_date)}
                            </Text>
                            {/* StartTime */}
                            <Text
                              style={StyleSheet.applyWidth(
                                StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                                  color: theme.colors['PF-Grey'],
                                  fontFamily: 'System',
                                  fontSize: 11,
                                  fontWeight: '400',
                                }),
                                dimensions.width,
                              )}
                            >
                              {getCorrectTimeFormat(listData?.start_time)}
                              {' (IST)'}
                            </Text>
                          </View>
                        </View>
                        {/* BakarrView */}
                        <View
                          style={StyleSheet.applyWidth(
                            StyleSheet.compose(GlobalStyles.ViewStyles(theme)['LiveAdda'], {
                              marginBottom: 10,
                              marginTop: 10,
                              paddingLeft: 4,
                              paddingRight: 4,
                            }),
                            dimensions.width,
                          )}
                        >
                          {/* Top */}
                          <View
                            style={StyleSheet.applyWidth(
                              {
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                paddingRight: 0,
                              },
                              dimensions.width,
                            )}
                          >
                            {/* LiveBadgeView */}
                            <View
                              style={StyleSheet.applyWidth(
                                {
                                  alignContent: 'flex-start',
                                  alignItems: 'center',
                                  backgroundColor: theme.colors['PF-Primary'],
                                  flexDirection: 'row',
                                  height: 20,
                                  justifyContent: 'space-around',
                                  marginBottom: 5,
                                  paddingLeft: 2,
                                  paddingRight: 2,
                                },
                                dimensions.width,
                              )}
                            >
                              <Text
                                style={StyleSheet.applyWidth(
                                  StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                                    color: theme.colors['PF-BG'],
                                    fontFamily: 'Rubik_600SemiBold',
                                    fontSize: 14,
                                    marginRight: 5,
                                  }),
                                  dimensions.width,
                                )}
                              >
                                {'live bakarr'}
                              </Text>
                              <Icon size={24} name={'Ionicons/ios-radio-outline'} color={theme.colors['PF-BG']} />
                            </View>

                            <Pressable
                              onPress={() => {
                                try {
                                  setShowBakarrPopup(true)
                                } catch (err) {
                                  console.error(err)
                                }
                              }}
                            >
                              <Text
                                style={StyleSheet.applyWidth(
                                  StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                                    color: theme.colors['Secondary'],
                                    fontFamily: 'Rubik_700Bold',
                                    fontSize: 12,
                                  }),
                                  dimensions.width,
                                )}
                              >
                                {'Join Now'}
                              </Text>
                            </Pressable>
                          </View>
                          {/* EventTitle */}
                          <Text
                            style={StyleSheet.applyWidth(
                              StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                                color: theme.colors['Community_Medium_Black'],
                                fontFamily: 'Rubik_600SemiBold',
                                fontSize: 12,
                              }),
                              dimensions.width,
                            )}
                          >
                            {listData?.team_1?.team_name}
                            {' vs '}
                            {listData?.team_2?.team_name}
                            {' - Before Start'}
                          </Text>

                          <Text
                            style={StyleSheet.applyWidth(
                              StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                                color: theme.colors['Community_Medium_Black'],
                                fontFamily: 'Rubik_400Regular_Italic',
                                fontSize: 12,
                              }),
                              dimensions.width,
                            )}
                          >
                            {'Will '}
                            {listData?.team_1?.team_initials}
                            {' be able to dominate '}
                            {listData?.team_2?.team_initials}
                            {'? Or will '}
                            {listData?.team_2?.team_initials}
                            {' prove too strong for '}
                            {listData?.team_1?.team_initials}
                            {'? Who would be the key players to watch out for? Join our experts in this analysis.'}
                          </Text>
                        </View>
                      </>
                    )
                  }}
                  contentContainerStyle={StyleSheet.applyWidth({ flexDirection: 'column' }, dimensions.width)}
                  numColumns={1}
                  onEndReachedThreshold={0.5}
                  showsHorizontalScrollIndicator={false}
                  showsVerticalScrollIndicator={false}
                />
              )
            }}
          </PagalFanBEApi.FetchFetchSingleMatchGET>
        </View>
        {/* TabView */}
        <View>
          {/* TabFrame */}
          <TabView
            style={StyleSheet.applyWidth({ flex: 1, height: 1000 }, dimensions.width)}
            tabBarPosition={'top'}
            keyboardDismissMode={'auto'}
            pressColor={theme.colors.primary}
            tabsBackgroundColor={theme.colors.background}
            indicatorColor={theme.colors['Secondary']}
            swipeEnabled={true}
            scrollEnabled={false}
            activeColor={theme.colors['Secondary']}
          >
            {/* Scores */}
            <TabViewItem
              style={StyleSheet.applyWidth(
                StyleSheet.compose(GlobalStyles.TabViewItemStyles(theme)['Tab View Item'], {
                  marginLeft: 2,
                  marginRight: 2,
                  marginTop: 4,
                }),
                dimensions.width,
              )}
              title={'SCORES'}
            >
              <PagalFanBEApi.FetchFetchFeedForSingleMatchGET
                refetchInterval={30000}
                matchid={props.route?.params?.match_id ?? 77}
                onData={(fetchData) => {
                  try {
                    const valueqsF9k609 = JSON.parse(fetchData && fetchData[0].match_data)
                    setJsonfeed(valueqsF9k609)
                    const parsedJsonFeed = valueqsF9k609
                    setTeamSequence()
                  } catch (err) {
                    console.error(err)
                  }
                }}
              >
                {({ loading, error, data, refetchFetchFeedForSingleMatch }) => {
                  const fetchData = data
                  if (!fetchData || loading) {
                    return <ActivityIndicator />
                  }

                  if (error) {
                    return <Text style={{ textAlign: 'center' }}>There was a problem fetching this data</Text>
                  }

                  return (
                    <>
                      {/* Match Live  */}
                      <>
                        {!showScorecard(jsonfeed) ? null : (
                          <View style={StyleSheet.applyWidth({ flex: 1 }, dimensions.width)}>
                            <ScrollView
                              contentContainerStyle={StyleSheet.applyWidth({ flex: 1 }, dimensions.width)}
                              bounces={true}
                              showsHorizontalScrollIndicator={false}
                              showsVerticalScrollIndicator={false}
                            >
                              {/* Layer-1 */}
                              <View
                                style={StyleSheet.applyWidth(
                                  GlobalStyles.ViewStyles(theme)['Layer-1'],
                                  dimensions.width,
                                )}
                              >
                                {/* Team_1 */}
                                <View
                                  style={StyleSheet.applyWidth(
                                    {
                                      flexDirection: 'row',
                                      justifyContent: 'space-between',
                                    },
                                    dimensions.width,
                                  )}
                                >
                                  {/* Team_name_1 */}
                                  <Text
                                    style={StyleSheet.applyWidth(
                                      StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                                        fontFamily: 'System',
                                        fontSize: 13,
                                        fontWeight: '700',
                                      }),
                                      dimensions.width,
                                    )}
                                  >
                                    {Team1Name()}
                                  </Text>
                                  {/* Team_score_1 */}
                                  <Text
                                    style={StyleSheet.applyWidth(
                                      StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                                        alignSelf: 'center',
                                        fontFamily: 'System',
                                        fontSize: 10,
                                        fontWeight: '600',
                                      }),
                                      dimensions.width,
                                    )}
                                  >
                                    {Team1Score()}
                                    {'\n'}
                                  </Text>
                                </View>
                                {/* Team_2 */}
                                <View
                                  style={StyleSheet.applyWidth(
                                    {
                                      flexDirection: 'row',
                                      justifyContent: 'space-between',
                                    },
                                    dimensions.width,
                                  )}
                                >
                                  {/* Team_name_2 */}
                                  <Text
                                    style={StyleSheet.applyWidth(
                                      StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                                        fontFamily: 'System',
                                        fontSize: 13,
                                        fontWeight: '700',
                                      }),
                                      dimensions.width,
                                    )}
                                  >
                                    {Team2Name()}
                                  </Text>
                                  {/* Team_score_2 */}
                                  <Text
                                    style={StyleSheet.applyWidth(
                                      StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                                        alignSelf: 'center',
                                        fontFamily: 'System',
                                        fontSize: 10,
                                        fontWeight: '600',
                                      }),
                                      dimensions.width,
                                    )}
                                  >
                                    {Team2Score()}
                                    {'\n'}
                                  </Text>
                                </View>
                                {/* Text 3 */}
                                <Text
                                  style={StyleSheet.applyWidth(
                                    StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], { fontSize: 11 }),
                                    dimensions.width,
                                  )}
                                >
                                  {StatusData()}
                                  {'\n'}
                                </Text>
                              </View>
                              {/* Layer-2 */}
                              <View
                                style={StyleSheet.applyWidth(
                                  GlobalStyles.ViewStyles(theme)['Layer-2'],
                                  dimensions.width,
                                )}
                              >
                                {/* Match Status */}
                                <Text
                                  style={StyleSheet.applyWidth(
                                    StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                                      fontFamily: 'System',
                                      fontSize: 12,
                                      fontWeight: '600',
                                      marginBottom: 4,
                                      textTransform: 'uppercase',
                                    }),
                                    dimensions.width,
                                  )}
                                >
                                  {getGameStatus(jsonfeed?.data?.status)}
                                  {'\n'}
                                </Text>
                                {/* Match Title */}
                                <Text
                                  style={StyleSheet.applyWidth(
                                    StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                                      fontSize: 8,
                                      textAlign: 'left',
                                    }),
                                    dimensions.width,
                                  )}
                                >
                                  {jsonfeed?.data?.title}
                                  {'\n'}
                                </Text>
                              </View>
                              {/* Layer-3 */}
                              <TabView
                                style={StyleSheet.applyWidth(
                                  {
                                    backgroundColor: theme.colors['Community_Cream'],
                                    minHeight: 350,
                                  },
                                  dimensions.width,
                                )}
                                tabBarPosition={'top'}
                                keyboardDismissMode={'auto'}
                                swipeEnabled={true}
                                activeColor={theme.colors.primary}
                                pressColor={theme.colors.primary}
                                indicatorColor={theme.colors.primary}
                                tabsBackgroundColor={theme.colors.background}
                              >
                                {/* Tab Team1 */}
                                <TabViewItem
                                  style={StyleSheet.applyWidth(
                                    GlobalStyles.TabViewItemStyles(theme)['Tab View Item'],
                                    dimensions.width,
                                  )}
                                  title={'TEAM1'}
                                >
                                  <ScrollView
                                    bounces={true}
                                    showsHorizontalScrollIndicator={false}
                                    showsVerticalScrollIndicator={false}
                                  >
                                    {/* Individual Team Scores */}
                                    <View
                                      style={StyleSheet.applyWidth(
                                        { marginTop: 10, position: 'relative' },
                                        dimensions.width,
                                      )}
                                    >
                                      {/* Team1 */}
                                      <View>
                                        {/* Team_Name */}
                                        <Text
                                          style={StyleSheet.applyWidth(
                                            StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                                              color: theme.colors['Community_Highlight_Blue'],
                                              fontFamily: 'System',
                                              fontWeight: '700',
                                            }),
                                            dimensions.width,
                                          )}
                                        >
                                          {Team1Name()}{' '}
                                        </Text>
                                        {/* Batting Score  */}
                                        <View style={StyleSheet.applyWidth({ marginRight: 10 }, dimensions.width)}>
                                          {/* Batting Header */}
                                          <View
                                            style={StyleSheet.applyWidth(
                                              {
                                                alignContent: 'space-between',
                                                alignItems: 'stretch',
                                                flexDirection: 'row',
                                                justifyContent: 'space-between',
                                              },
                                              dimensions.width,
                                            )}
                                          >
                                            {/* Left */}
                                            <View
                                              style={StyleSheet.applyWidth(
                                                { alignSelf: 'flex-start' },
                                                dimensions.width,
                                              )}
                                            >
                                              {/* Batting */}
                                              <Text
                                                style={StyleSheet.applyWidth(
                                                  StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                                                    fontFamily: 'System',
                                                    fontSize: 14,
                                                    fontWeight: '600',
                                                  }),
                                                  dimensions.width,
                                                )}
                                              >
                                                {'Batting\n'}
                                              </Text>
                                            </View>
                                            {/* Right */}
                                            <View
                                              style={StyleSheet.applyWidth(
                                                {
                                                  alignContent: 'center',
                                                  flexDirection: 'row',
                                                  justifyContent: 'space-between',
                                                  width: 200,
                                                },
                                                dimensions.width,
                                              )}
                                            >
                                              {/* Runs */}
                                              <Text
                                                style={StyleSheet.applyWidth(
                                                  StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                                                    fontFamily: 'System',
                                                    fontWeight: '600',
                                                    marginRight: 20,
                                                  }),
                                                  dimensions.width,
                                                )}
                                              >
                                                {'R\n'}
                                              </Text>
                                              {/* Balls */}
                                              <Text
                                                style={StyleSheet.applyWidth(
                                                  StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                                                    fontFamily: 'System',
                                                    fontWeight: '600',
                                                    marginRight: 18,
                                                  }),
                                                  dimensions.width,
                                                )}
                                              >
                                                {'B'}
                                              </Text>
                                              {/* Fours */}
                                              <Text
                                                style={StyleSheet.applyWidth(
                                                  StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                                                    fontFamily: 'System',
                                                    fontWeight: '600',
                                                    marginRight: 15,
                                                  }),
                                                  dimensions.width,
                                                )}
                                              >
                                                {'4s\n'}
                                              </Text>
                                              {/* Sixes */}
                                              <Text
                                                style={StyleSheet.applyWidth(
                                                  StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                                                    fontFamily: 'System',
                                                    fontWeight: '600',
                                                    marginRight: 18,
                                                  }),
                                                  dimensions.width,
                                                )}
                                              >
                                                {'6s'}
                                              </Text>
                                              {/* Strike rate */}
                                              <Text
                                                style={StyleSheet.applyWidth(
                                                  StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                                                    fontFamily: 'System',
                                                    fontWeight: '600',
                                                  }),
                                                  dimensions.width,
                                                )}
                                              >
                                                {'SR'}
                                              </Text>
                                            </View>
                                          </View>
                                          <FlashList
                                            data={Team1BattingOrder()}
                                            listKey={'xb06IoKb'}
                                            keyExtractor={(flashListData) =>
                                              flashListData?.id || flashListData?.uuid || JSON.stringify(flashListData)
                                            }
                                            renderItem={({ item }) => {
                                              const flashListData = item
                                              return (
                                                <>
                                                  {/* Batting Dynamic  */}
                                                  <View
                                                    style={StyleSheet.applyWidth(
                                                      {
                                                        alignItems: 'stretch',
                                                        alignSelf: 'auto',
                                                        flexDirection: 'column',
                                                        height: 33,
                                                        justifyContent: 'flex-start',
                                                      },
                                                      dimensions.width,
                                                    )}
                                                  >
                                                    <View
                                                      style={StyleSheet.applyWidth(
                                                        {
                                                          flexDirection: 'row',
                                                          height: 15,
                                                          justifyContent: 'space-between',
                                                        },
                                                        dimensions.width,
                                                      )}
                                                    >
                                                      {/* Left */}
                                                      <View
                                                        style={StyleSheet.applyWidth(
                                                          {
                                                            alignSelf: 'flex-start',
                                                          },
                                                          dimensions.width,
                                                        )}
                                                      >
                                                        {/* Batting */}
                                                        <Text
                                                          style={StyleSheet.applyWidth(
                                                            StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                                                              fontSize: 12,
                                                            }),
                                                            dimensions.width,
                                                          )}
                                                        >
                                                          {GiveBatsmanDetails(flashListData)?.name}
                                                          {'\n\n\n\n'}
                                                        </Text>
                                                      </View>
                                                      {/* Right */}
                                                      <View
                                                        style={StyleSheet.applyWidth(
                                                          {
                                                            flexDirection: 'row',
                                                            justifyContent: 'space-between',
                                                            width: 200,
                                                          },
                                                          dimensions.width,
                                                        )}
                                                      >
                                                        {/* Runs */}
                                                        <Text
                                                          style={StyleSheet.applyWidth(
                                                            StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                                                              fontSize: 12,
                                                              marginRight: 20,
                                                            }),
                                                            dimensions.width,
                                                          )}
                                                        >
                                                          {GiveBatsmanDetails(flashListData)?.runs}
                                                        </Text>
                                                        {/* Balls */}
                                                        <Text
                                                          style={StyleSheet.applyWidth(
                                                            StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                                                              fontSize: 12,
                                                              marginRight: 20,
                                                            }),
                                                            dimensions.width,
                                                          )}
                                                        >
                                                          {GiveBatsmanDetails(flashListData)?.balls}
                                                        </Text>
                                                        {/* Fours */}
                                                        <Text
                                                          style={StyleSheet.applyWidth(
                                                            StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                                                              fontSize: 12,
                                                              marginRight: 20,
                                                            }),
                                                            dimensions.width,
                                                          )}
                                                        >
                                                          {GiveBatsmanDetails(flashListData)?.fours}
                                                          {'\n'}
                                                        </Text>
                                                        {/* Sixes */}
                                                        <Text
                                                          style={StyleSheet.applyWidth(
                                                            StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                                                              fontSize: 12,
                                                              marginRight: 10,
                                                            }),
                                                            dimensions.width,
                                                          )}
                                                        >
                                                          {GiveBatsmanDetails(flashListData)?.sixes}
                                                        </Text>
                                                        {/* Strike rate */}
                                                        <Text
                                                          style={StyleSheet.applyWidth(
                                                            StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                                                              fontSize: 12,
                                                              opacity: 1,
                                                            }),
                                                            dimensions.width,
                                                          )}
                                                        >
                                                          {Convert2Decimal(GiveBatsmanDetails(flashListData)?.sr)}
                                                          {'\n'}
                                                        </Text>
                                                      </View>
                                                    </View>
                                                    {/* View 2 */}
                                                    <View
                                                      style={StyleSheet.applyWidth({ marginLeft: 3 }, dimensions.width)}
                                                    >
                                                      <Text
                                                        style={StyleSheet.applyWidth(
                                                          StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                                                            fontSize: 9,
                                                          }),
                                                          dimensions.width,
                                                        )}
                                                      >
                                                        {' '}
                                                        {showOutNotout(flashListData)}
                                                      </Text>
                                                    </View>
                                                  </View>
                                                </>
                                              )
                                            }}
                                            numColumns={1}
                                            onEndReachedThreshold={0.5}
                                            showsHorizontalScrollIndicator={false}
                                            showsVerticalScrollIndicator={true}
                                            estimatedItemSize={20}
                                          />
                                          {/* Footer */}
                                          <View
                                            style={StyleSheet.applyWidth(
                                              {
                                                flexDirection: 'row',
                                                justifyContent: 'space-between',
                                                marginTop: 5,
                                              },
                                              dimensions.width,
                                            )}
                                          >
                                            <Text
                                              style={StyleSheet.applyWidth(
                                                StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                                                  fontFamily: 'System',
                                                  fontWeight: '600',
                                                }),
                                                dimensions.width,
                                              )}
                                            >
                                              {'Total\n'}
                                            </Text>

                                            <View
                                              style={StyleSheet.applyWidth(
                                                {
                                                  flexDirection: 'row',
                                                  justifyContent: 'space-between',
                                                  width: 200,
                                                },
                                                dimensions.width,
                                              )}
                                            >
                                              <Text
                                                style={StyleSheet.applyWidth(
                                                  StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                                                    fontFamily: 'System',
                                                    fontWeight: '600',
                                                    marginLeft: 10,
                                                  }),
                                                  dimensions.width,
                                                )}
                                              >
                                                {Team1Score()}
                                              </Text>

                                              <Text
                                                style={StyleSheet.applyWidth(
                                                  StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                                                    fontFamily: 'System',
                                                    fontWeight: '600',
                                                    marginLeft: 10,
                                                  }),
                                                  dimensions.width,
                                                )}
                                              >
                                                {'RR - '}
                                                {Team1RR()}
                                              </Text>
                                            </View>
                                          </View>
                                        </View>
                                        {/* Bowling Score  */}
                                        <View
                                          style={StyleSheet.applyWidth(
                                            { marginRight: 10, marginTop: 30 },
                                            dimensions.width,
                                          )}
                                        >
                                          {/* Bowling Header */}
                                          <View
                                            style={StyleSheet.applyWidth(
                                              {
                                                alignContent: 'space-between',
                                                alignItems: 'stretch',
                                                flexDirection: 'row',
                                                justifyContent: 'space-between',
                                              },
                                              dimensions.width,
                                            )}
                                          >
                                            {/* Left */}
                                            <View
                                              style={StyleSheet.applyWidth(
                                                { alignSelf: 'flex-start' },
                                                dimensions.width,
                                              )}
                                            >
                                              {/* Bowling */}
                                              <Text
                                                style={StyleSheet.applyWidth(
                                                  StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                                                    fontFamily: 'System',
                                                    fontSize: 14,
                                                    fontWeight: '600',
                                                  }),
                                                  dimensions.width,
                                                )}
                                              >
                                                {'Bowling\n'}
                                              </Text>
                                            </View>
                                            {/* Right */}
                                            <View
                                              style={StyleSheet.applyWidth(
                                                {
                                                  alignContent: 'center',
                                                  flexDirection: 'row',
                                                  justifyContent: 'space-between',
                                                  width: 200,
                                                },
                                                dimensions.width,
                                              )}
                                            >
                                              {/* Overs */}
                                              <Text
                                                style={StyleSheet.applyWidth(
                                                  StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                                                    fontFamily: 'System',
                                                    fontWeight: '600',
                                                    marginRight: 20,
                                                  }),
                                                  dimensions.width,
                                                )}
                                              >
                                                {'O\n'}
                                              </Text>
                                              {/* Maiden */}
                                              <Text
                                                style={StyleSheet.applyWidth(
                                                  StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                                                    fontFamily: 'System',
                                                    fontWeight: '600',
                                                    marginRight: 22,
                                                  }),
                                                  dimensions.width,
                                                )}
                                              >
                                                {'M'}
                                              </Text>
                                              {/* Runs */}
                                              <Text
                                                style={StyleSheet.applyWidth(
                                                  StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                                                    fontFamily: 'System',
                                                    fontWeight: '600',
                                                    marginRight: 20,
                                                  }),
                                                  dimensions.width,
                                                )}
                                              >
                                                {'R'}
                                              </Text>
                                              {/* Wickets */}
                                              <Text
                                                style={StyleSheet.applyWidth(
                                                  StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                                                    fontFamily: 'System',
                                                    fontWeight: '600',
                                                    marginRight: 20,
                                                  }),
                                                  dimensions.width,
                                                )}
                                              >
                                                {'W'}
                                              </Text>
                                              {/* Economy */}
                                              <Text
                                                style={StyleSheet.applyWidth(
                                                  StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                                                    fontFamily: 'System',
                                                    fontWeight: '600',
                                                  }),
                                                  dimensions.width,
                                                )}
                                              >
                                                {'Econ'}
                                              </Text>
                                            </View>
                                          </View>
                                          <FlashList
                                            data={Team2BowlingOrder()}
                                            listKey={'YR7ZDSL2'}
                                            keyExtractor={(flashListData) =>
                                              flashListData?.id || flashListData?.uuid || JSON.stringify(flashListData)
                                            }
                                            renderItem={({ item }) => {
                                              const flashListData = item
                                              return (
                                                <>
                                                  {/* Bowling Dynamic  */}
                                                  <View
                                                    style={StyleSheet.applyWidth(
                                                      {
                                                        flexDirection: 'row',
                                                        height: 20,
                                                        justifyContent: 'space-between',
                                                      },
                                                      dimensions.width,
                                                    )}
                                                  >
                                                    {/* Left */}
                                                    <View
                                                      style={StyleSheet.applyWidth(
                                                        {
                                                          alignSelf: 'flex-start',
                                                        },
                                                        dimensions.width,
                                                      )}
                                                    >
                                                      {/* Bowler */}
                                                      <Text
                                                        style={StyleSheet.applyWidth(
                                                          StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                                                            fontSize: 12,
                                                          }),
                                                          dimensions.width,
                                                        )}
                                                      >
                                                        {GiveBowlingDetails(flashListData)?.name}
                                                        {'\n\n\n\n'}
                                                      </Text>
                                                    </View>
                                                    {/* Right */}
                                                    <View
                                                      style={StyleSheet.applyWidth(
                                                        {
                                                          flexDirection: 'row',
                                                          justifyContent: 'space-around',
                                                          width: 200,
                                                        },
                                                        dimensions.width,
                                                      )}
                                                    >
                                                      {/* Overs */}
                                                      <Text
                                                        style={StyleSheet.applyWidth(
                                                          StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                                                            fontSize: 12,
                                                            marginRight: 20,
                                                          }),
                                                          dimensions.width,
                                                        )}
                                                      >
                                                        {GiveBowlingDetails(flashListData)?.overs}
                                                      </Text>
                                                      {/* Maiden */}
                                                      <Text
                                                        style={StyleSheet.applyWidth(
                                                          StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                                                            fontSize: 12,
                                                            marginRight: 20,
                                                          }),
                                                          dimensions.width,
                                                        )}
                                                      >
                                                        {GiveBowlingDetails(flashListData)?.maiden}
                                                      </Text>
                                                      {/* Runs */}
                                                      <Text
                                                        style={StyleSheet.applyWidth(
                                                          StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                                                            fontSize: 12,
                                                            marginRight: 20,
                                                          }),
                                                          dimensions.width,
                                                        )}
                                                      >
                                                        {GiveBowlingDetails(flashListData)?.runs}
                                                        {'\n'}
                                                      </Text>
                                                      {/* Wickets */}
                                                      <Text
                                                        style={StyleSheet.applyWidth(
                                                          StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                                                            fontSize: 12,
                                                            marginRight: 20,
                                                          }),
                                                          dimensions.width,
                                                        )}
                                                      >
                                                        {GiveBowlingDetails(flashListData)?.wickets}
                                                      </Text>
                                                      {/* Economy */}
                                                      <Text
                                                        style={StyleSheet.applyWidth(
                                                          StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                                                            fontSize: 12,
                                                          }),
                                                          dimensions.width,
                                                        )}
                                                      >
                                                        {Convert2Decimal(GiveBowlingDetails(flashListData)?.economy)}
                                                        {'\n'}
                                                      </Text>
                                                    </View>
                                                  </View>
                                                </>
                                              )
                                            }}
                                            estimatedItemSize={50}
                                            numColumns={1}
                                            onEndReachedThreshold={0.5}
                                            showsHorizontalScrollIndicator={true}
                                            showsVerticalScrollIndicator={false}
                                          />
                                        </View>
                                      </View>
                                    </View>
                                  </ScrollView>
                                </TabViewItem>
                                {/* Tab Team2 */}
                                <TabViewItem
                                  style={StyleSheet.applyWidth(
                                    StyleSheet.compose(GlobalStyles.TabViewItemStyles(theme)['Tab View Item'], {
                                      marginTop: -20,
                                    }),
                                    dimensions.width,
                                  )}
                                  title={'TEAM2'}
                                >
                                  <ScrollView
                                    bounces={true}
                                    showsHorizontalScrollIndicator={false}
                                    showsVerticalScrollIndicator={false}
                                  >
                                    {/* Individual Team Scores */}
                                    <View style={StyleSheet.applyWidth({ marginTop: 40 }, dimensions.width)}>
                                      {/* Team2 */}
                                      <View>
                                        {/* Team_Name */}
                                        <Text
                                          style={StyleSheet.applyWidth(
                                            StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                                              color: theme.colors['Community_Highlight_Blue'],
                                              fontFamily: 'System',
                                              fontWeight: '700',
                                            }),
                                            dimensions.width,
                                          )}
                                        >
                                          {Team2Name()}{' '}
                                        </Text>
                                        {/* Batting Score  */}
                                        <View style={StyleSheet.applyWidth({ marginRight: 10 }, dimensions.width)}>
                                          {/* Batting Header */}
                                          <View
                                            style={StyleSheet.applyWidth(
                                              {
                                                alignContent: 'space-between',
                                                alignItems: 'stretch',
                                                flexDirection: 'row',
                                                justifyContent: 'space-between',
                                              },
                                              dimensions.width,
                                            )}
                                          >
                                            {/* Left */}
                                            <View
                                              style={StyleSheet.applyWidth(
                                                { alignSelf: 'flex-start' },
                                                dimensions.width,
                                              )}
                                            >
                                              {/* Batting */}
                                              <Text
                                                style={StyleSheet.applyWidth(
                                                  StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                                                    fontFamily: 'System',
                                                    fontSize: 14,
                                                    fontWeight: '600',
                                                  }),
                                                  dimensions.width,
                                                )}
                                              >
                                                {'Batting\n'}
                                              </Text>
                                            </View>
                                            {/* Right */}
                                            <View
                                              style={StyleSheet.applyWidth(
                                                {
                                                  alignContent: 'center',
                                                  flexDirection: 'row',
                                                  justifyContent: 'space-between',
                                                  width: 200,
                                                },
                                                dimensions.width,
                                              )}
                                            >
                                              {/* Runs */}
                                              <Text
                                                style={StyleSheet.applyWidth(
                                                  StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                                                    fontFamily: 'System',
                                                    fontWeight: '600',
                                                    marginRight: 24,
                                                  }),
                                                  dimensions.width,
                                                )}
                                              >
                                                {'R\n'}
                                              </Text>
                                              {/* Balls */}
                                              <Text
                                                style={StyleSheet.applyWidth(
                                                  StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                                                    fontFamily: 'System',
                                                    fontWeight: '600',
                                                    marginRight: 20,
                                                  }),
                                                  dimensions.width,
                                                )}
                                              >
                                                {'B'}
                                              </Text>
                                              {/* Fours */}
                                              <Text
                                                style={StyleSheet.applyWidth(
                                                  StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                                                    fontFamily: 'System',
                                                    fontWeight: '600',
                                                    marginRight: 20,
                                                  }),
                                                  dimensions.width,
                                                )}
                                              >
                                                {'4s\n'}
                                              </Text>
                                              {/* Sixes */}
                                              <Text
                                                style={StyleSheet.applyWidth(
                                                  StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                                                    fontFamily: 'System',
                                                    fontWeight: '600',
                                                    marginRight: 32,
                                                  }),
                                                  dimensions.width,
                                                )}
                                              >
                                                {'6s'}
                                              </Text>
                                              {/* Strike rate */}
                                              <Text
                                                style={StyleSheet.applyWidth(
                                                  StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                                                    fontFamily: 'System',
                                                    fontWeight: '600',
                                                  }),
                                                  dimensions.width,
                                                )}
                                              >
                                                {'SR'}
                                              </Text>
                                            </View>
                                          </View>
                                          <FlashList
                                            data={team2BattingOrder()}
                                            listKey={'0OabhL3m'}
                                            keyExtractor={(flashListData) =>
                                              flashListData?.id || flashListData?.uuid || JSON.stringify(flashListData)
                                            }
                                            renderItem={({ item }) => {
                                              const flashListData = item
                                              return (
                                                <>
                                                  {/* Batting Dynamic  */}
                                                  <View
                                                    style={StyleSheet.applyWidth(
                                                      {
                                                        flexDirection: 'column',
                                                        height: 33,
                                                        justifyContent: 'flex-start',
                                                      },
                                                      dimensions.width,
                                                    )}
                                                  >
                                                    <View
                                                      style={StyleSheet.applyWidth(
                                                        {
                                                          flexDirection: 'row',
                                                          height: 15,
                                                          justifyContent: 'space-between',
                                                        },
                                                        dimensions.width,
                                                      )}
                                                    >
                                                      {/* Left */}
                                                      <View
                                                        style={StyleSheet.applyWidth(
                                                          {
                                                            alignSelf: 'flex-start',
                                                          },
                                                          dimensions.width,
                                                        )}
                                                      >
                                                        {/* Batting */}
                                                        <Text
                                                          style={StyleSheet.applyWidth(
                                                            StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                                                              fontSize: 12,
                                                            }),
                                                            dimensions.width,
                                                          )}
                                                        >
                                                          {GiveBatsmanDetails(flashListData)?.name}
                                                          {'\n\n\n\n'}
                                                        </Text>
                                                      </View>
                                                      {/* Right */}
                                                      <View
                                                        style={StyleSheet.applyWidth(
                                                          {
                                                            flexDirection: 'row',
                                                            justifyContent: 'space-between',
                                                            width: 200,
                                                          },
                                                          dimensions.width,
                                                        )}
                                                      >
                                                        {/* Runs */}
                                                        <Text
                                                          style={StyleSheet.applyWidth(
                                                            StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                                                              fontSize: 12,
                                                              marginRight: 20,
                                                            }),
                                                            dimensions.width,
                                                          )}
                                                        >
                                                          {GiveBatsmanDetails(flashListData)?.runs}
                                                        </Text>
                                                        {/* Balls */}
                                                        <Text
                                                          style={StyleSheet.applyWidth(
                                                            StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                                                              fontSize: 12,
                                                              marginRight: 20,
                                                            }),
                                                            dimensions.width,
                                                          )}
                                                        >
                                                          {GiveBatsmanDetails(flashListData)?.balls}
                                                        </Text>
                                                        {/* Fours */}
                                                        <Text
                                                          style={StyleSheet.applyWidth(
                                                            StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                                                              fontSize: 12,
                                                              marginRight: 20,
                                                            }),
                                                            dimensions.width,
                                                          )}
                                                        >
                                                          {GiveBatsmanDetails(flashListData)?.fours}
                                                          {'\n'}
                                                        </Text>
                                                        {/* Sixes */}
                                                        <Text
                                                          style={StyleSheet.applyWidth(
                                                            StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                                                              fontSize: 12,
                                                              marginRight: 20,
                                                            }),
                                                            dimensions.width,
                                                          )}
                                                        >
                                                          {GiveBatsmanDetails(flashListData)?.sixes}
                                                        </Text>
                                                        {/* Strike rate */}
                                                        <Text
                                                          style={StyleSheet.applyWidth(
                                                            StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                                                              fontSize: 12,
                                                            }),
                                                            dimensions.width,
                                                          )}
                                                        >
                                                          {Convert2Decimal(GiveBatsmanDetails(flashListData)?.sr)}
                                                          {'\n'}
                                                        </Text>
                                                      </View>
                                                    </View>
                                                    {/* View 2 */}
                                                    <View
                                                      style={StyleSheet.applyWidth({ marginLeft: 3 }, dimensions.width)}
                                                    >
                                                      <Text
                                                        style={StyleSheet.applyWidth(
                                                          StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                                                            fontSize: 9,
                                                          }),
                                                          dimensions.width,
                                                        )}
                                                      >
                                                        {showOutNotout(flashListData)}
                                                      </Text>
                                                    </View>
                                                  </View>
                                                </>
                                              )
                                            }}
                                            estimatedItemSize={50}
                                            numColumns={1}
                                            onEndReachedThreshold={0.5}
                                            showsHorizontalScrollIndicator={true}
                                            showsVerticalScrollIndicator={false}
                                          />
                                          {/* Footer */}
                                          <View
                                            style={StyleSheet.applyWidth(
                                              {
                                                flexDirection: 'row',
                                                justifyContent: 'space-between',
                                                marginTop: 5,
                                              },
                                              dimensions.width,
                                            )}
                                          >
                                            <Text
                                              style={StyleSheet.applyWidth(
                                                StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                                                  fontFamily: 'System',
                                                  fontWeight: '600',
                                                }),
                                                dimensions.width,
                                              )}
                                            >
                                              {'Total\n'}
                                            </Text>

                                            <View
                                              style={StyleSheet.applyWidth(
                                                {
                                                  flexDirection: 'row',
                                                  justifyContent: 'space-between',
                                                  width: 200,
                                                },
                                                dimensions.width,
                                              )}
                                            >
                                              <Text
                                                style={StyleSheet.applyWidth(
                                                  StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                                                    fontFamily: 'System',
                                                    fontWeight: '600',
                                                    marginLeft: 10,
                                                  }),
                                                  dimensions.width,
                                                )}
                                              >
                                                {Team2Score()}
                                              </Text>

                                              <Text
                                                style={StyleSheet.applyWidth(
                                                  StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                                                    fontFamily: 'System',
                                                    fontWeight: '600',
                                                    marginLeft: 10,
                                                  }),
                                                  dimensions.width,
                                                )}
                                              >
                                                {'RR - '}
                                                {Team2RR()}{' '}
                                              </Text>
                                            </View>
                                          </View>
                                        </View>
                                        {/* Bowling Score  */}
                                        <View
                                          style={StyleSheet.applyWidth(
                                            { marginRight: 10, marginTop: 30 },
                                            dimensions.width,
                                          )}
                                        >
                                          {/* Bowling Header */}
                                          <View
                                            style={StyleSheet.applyWidth(
                                              {
                                                alignContent: 'space-between',
                                                alignItems: 'stretch',
                                                flexDirection: 'row',
                                                justifyContent: 'space-between',
                                              },
                                              dimensions.width,
                                            )}
                                          >
                                            {/* Left */}
                                            <View
                                              style={StyleSheet.applyWidth(
                                                { alignSelf: 'flex-start' },
                                                dimensions.width,
                                              )}
                                            >
                                              {/* Bowling */}
                                              <Text
                                                style={StyleSheet.applyWidth(
                                                  StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                                                    fontFamily: 'System',
                                                    fontSize: 14,
                                                    fontWeight: '600',
                                                  }),
                                                  dimensions.width,
                                                )}
                                              >
                                                {'Bowling\n'}
                                              </Text>
                                            </View>
                                            {/* Right */}
                                            <View
                                              style={StyleSheet.applyWidth(
                                                {
                                                  alignContent: 'center',
                                                  flexDirection: 'row',
                                                  justifyContent: 'space-between',
                                                  width: 200,
                                                },
                                                dimensions.width,
                                              )}
                                            >
                                              {/* Overs */}
                                              <Text
                                                style={StyleSheet.applyWidth(
                                                  StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                                                    fontFamily: 'System',
                                                    fontWeight: '600',
                                                    marginRight: 20,
                                                  }),
                                                  dimensions.width,
                                                )}
                                              >
                                                {'O\n'}
                                              </Text>
                                              {/* Maiden */}
                                              <Text
                                                style={StyleSheet.applyWidth(
                                                  StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                                                    fontFamily: 'System',
                                                    fontWeight: '600',
                                                    marginRight: 20,
                                                  }),
                                                  dimensions.width,
                                                )}
                                              >
                                                {'M'}
                                              </Text>
                                              {/* Runs */}
                                              <Text
                                                style={StyleSheet.applyWidth(
                                                  StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                                                    fontFamily: 'System',
                                                    fontWeight: '600',
                                                    marginRight: 20,
                                                  }),
                                                  dimensions.width,
                                                )}
                                              >
                                                {'R'}
                                              </Text>
                                              {/* Wickets */}
                                              <Text
                                                style={StyleSheet.applyWidth(
                                                  StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                                                    fontFamily: 'System',
                                                    fontWeight: '600',
                                                    marginRight: 20,
                                                  }),
                                                  dimensions.width,
                                                )}
                                              >
                                                {'W'}
                                              </Text>
                                              {/* Economy */}
                                              <Text
                                                style={StyleSheet.applyWidth(
                                                  StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                                                    fontFamily: 'System',
                                                    fontWeight: '600',
                                                  }),
                                                  dimensions.width,
                                                )}
                                              >
                                                {'Econ'}
                                              </Text>
                                            </View>
                                          </View>
                                          <FlashList
                                            data={Team1BowlingOrder()}
                                            listKey={'CIgn0RwB'}
                                            keyExtractor={(flashListData) =>
                                              flashListData?.id || flashListData?.uuid || JSON.stringify(flashListData)
                                            }
                                            renderItem={({ item }) => {
                                              const flashListData = item
                                              return (
                                                <>
                                                  {/* Bowling Dynamic  */}
                                                  <View
                                                    style={StyleSheet.applyWidth(
                                                      {
                                                        flexDirection: 'row',
                                                        height: 20,
                                                        justifyContent: 'space-between',
                                                      },
                                                      dimensions.width,
                                                    )}
                                                  >
                                                    {/* Left */}
                                                    <View
                                                      style={StyleSheet.applyWidth(
                                                        {
                                                          alignSelf: 'flex-start',
                                                        },
                                                        dimensions.width,
                                                      )}
                                                    >
                                                      {/* Bowler */}
                                                      <Text
                                                        style={StyleSheet.applyWidth(
                                                          StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                                                            fontSize: 12,
                                                          }),
                                                          dimensions.width,
                                                        )}
                                                      >
                                                        {GiveBowlingDetails(flashListData)?.name}
                                                        {'\n\n\n\n'}
                                                      </Text>
                                                    </View>
                                                    {/* Right */}
                                                    <View
                                                      style={StyleSheet.applyWidth(
                                                        {
                                                          flexDirection: 'row',
                                                          justifyContent: 'space-around',
                                                          width: 200,
                                                        },
                                                        dimensions.width,
                                                      )}
                                                    >
                                                      {/* Overs */}
                                                      <Text
                                                        style={StyleSheet.applyWidth(
                                                          StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                                                            fontSize: 12,
                                                            marginRight: 20,
                                                          }),
                                                          dimensions.width,
                                                        )}
                                                      >
                                                        {GiveBowlingDetails(flashListData)?.overs}
                                                      </Text>
                                                      {/* Maiden */}
                                                      <Text
                                                        style={StyleSheet.applyWidth(
                                                          StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                                                            fontSize: 12,
                                                            marginRight: 20,
                                                          }),
                                                          dimensions.width,
                                                        )}
                                                      >
                                                        {GiveBowlingDetails(flashListData)?.maiden}
                                                      </Text>
                                                      {/* Runs */}
                                                      <Text
                                                        style={StyleSheet.applyWidth(
                                                          StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                                                            fontSize: 12,
                                                            marginRight: 20,
                                                          }),
                                                          dimensions.width,
                                                        )}
                                                      >
                                                        {GiveBowlingDetails(flashListData)?.runs}
                                                        {'\n'}
                                                      </Text>
                                                      {/* Wickets */}
                                                      <Text
                                                        style={StyleSheet.applyWidth(
                                                          StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                                                            fontSize: 12,
                                                            marginRight: 20,
                                                          }),
                                                          dimensions.width,
                                                        )}
                                                      >
                                                        {GiveBowlingDetails(flashListData)?.wickets}
                                                      </Text>
                                                      {/* Economy */}
                                                      <Text
                                                        style={StyleSheet.applyWidth(
                                                          StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                                                            fontSize: 12,
                                                          }),
                                                          dimensions.width,
                                                        )}
                                                      >
                                                        {Convert2Decimal(GiveBowlingDetails(flashListData)?.economy)}
                                                        {'\n'}
                                                      </Text>
                                                    </View>
                                                  </View>
                                                </>
                                              )
                                            }}
                                            estimatedItemSize={50}
                                            numColumns={1}
                                            onEndReachedThreshold={0.5}
                                            showsHorizontalScrollIndicator={true}
                                            showsVerticalScrollIndicator={false}
                                          />
                                        </View>
                                      </View>
                                    </View>
                                  </ScrollView>
                                </TabViewItem>
                              </TabView>
                              {/* Layer-4 */}
                              <View
                                style={StyleSheet.applyWidth(
                                  StyleSheet.compose(GlobalStyles.ViewStyles(theme)['Layer-4'], { marginTop: 20 }),
                                  dimensions.width,
                                )}
                              >
                                {/* Header */}
                                <Text
                                  style={StyleSheet.applyWidth(
                                    StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                                      fontFamily: 'System',
                                      fontWeight: '700',
                                      textAlign: 'center',
                                    }),
                                    dimensions.width,
                                  )}
                                >
                                  {'MATCH DETAILS'}
                                </Text>
                                {/* Venue */}
                                <Text
                                  style={StyleSheet.applyWidth(
                                    StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                                      fontFamily: 'System',
                                      fontSize: 12,
                                      fontWeight: '600',
                                      marginTop: 2,
                                    }),
                                    dimensions.width,
                                  )}
                                >
                                  {jsonfeed?.data?.venue?.name}
                                  {', '}
                                  {jsonfeed?.data?.venue?.city}
                                  {' , '}
                                  {jsonfeed?.data?.venue?.country?.name}
                                </Text>
                                {/* Toss */}
                                <View
                                  style={StyleSheet.applyWidth(
                                    {
                                      alignItems: 'center',
                                      flexDirection: 'row',
                                      justifyContent: 'flex-start',
                                    },
                                    dimensions.width,
                                  )}
                                >
                                  {/* Static */}
                                  <Text
                                    style={StyleSheet.applyWidth(
                                      StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                                        alignSelf: 'center',
                                        fontFamily: 'System',
                                        fontSize: 12,
                                        fontWeight: '600',
                                      }),
                                      dimensions.width,
                                    )}
                                  >
                                    {'Toss : '}
                                  </Text>
                                  {/* Dynamic  */}
                                  <Text
                                    style={StyleSheet.applyWidth(
                                      StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                                        alignSelf: 'center',
                                        fontFamily: 'System',
                                        fontSize: 11,
                                        fontWeight: '400',
                                      }),
                                      dimensions.width,
                                    )}
                                  >
                                    {giveTossStatement()}
                                  </Text>
                                </View>
                                {/* Series */}
                                <View
                                  style={StyleSheet.applyWidth(
                                    {
                                      alignItems: 'center',
                                      flexDirection: 'row',
                                      justifyContent: 'flex-start',
                                    },
                                    dimensions.width,
                                  )}
                                >
                                  {/* Static */}
                                  <Text
                                    style={StyleSheet.applyWidth(
                                      StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                                        alignSelf: 'center',
                                        fontFamily: 'System',
                                        fontSize: 12,
                                        fontWeight: '600',
                                      }),
                                      dimensions.width,
                                    )}
                                  >
                                    {'Series : '}
                                  </Text>
                                  {/* Dynamic  */}
                                  <Text
                                    style={StyleSheet.applyWidth(
                                      StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                                        alignSelf: 'center',
                                        fontFamily: 'System',
                                        fontSize: 11,
                                        fontWeight: '400',
                                      }),
                                      dimensions.width,
                                    )}
                                  >
                                    {jsonfeed?.data?.tournament?.name}
                                  </Text>
                                </View>
                                {/* MVP */}
                                <View
                                  style={StyleSheet.applyWidth(
                                    {
                                      alignItems: 'center',
                                      flexDirection: 'row',
                                      justifyContent: 'flex-start',
                                    },
                                    dimensions.width,
                                  )}
                                >
                                  {/* Static */}
                                  <Text
                                    style={StyleSheet.applyWidth(
                                      StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                                        alignSelf: 'flex-start',
                                        fontFamily: 'System',
                                        fontSize: 12,
                                        fontWeight: '600',
                                      }),
                                      dimensions.width,
                                    )}
                                  >
                                    {'Player Of The Match : '}
                                  </Text>
                                  {/* Dynamic  */}
                                  <Text
                                    style={StyleSheet.applyWidth(
                                      StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                                        alignSelf: 'center',
                                        fontFamily: 'System',
                                        fontSize: 11,
                                        fontWeight: '400',
                                      }),
                                      dimensions.width,
                                    )}
                                  >
                                    {NameMVP()}{' '}
                                  </Text>
                                </View>
                                {/* Dates */}
                                <View
                                  style={StyleSheet.applyWidth(
                                    {
                                      alignItems: 'center',
                                      flexDirection: 'row',
                                      justifyContent: 'flex-start',
                                    },
                                    dimensions.width,
                                  )}
                                >
                                  {/* Static */}
                                  <Text
                                    style={StyleSheet.applyWidth(
                                      StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                                        alignSelf: 'center',
                                        fontFamily: 'System',
                                        fontSize: 12,
                                        fontWeight: '600',
                                      }),
                                      dimensions.width,
                                    )}
                                  >
                                    {'Match Dates :  \n'}
                                  </Text>
                                  {/* Dynamic  */}
                                  <Text
                                    style={StyleSheet.applyWidth(
                                      StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                                        alignSelf: 'center',
                                        fontFamily: 'System',
                                        fontSize: 11,
                                        fontWeight: '400',
                                      }),
                                      dimensions.width,
                                    )}
                                  >
                                    {jsonfeed?.data?.sub_title}
                                  </Text>
                                </View>
                              </View>
                            </ScrollView>
                          </View>
                        )}
                      </>
                      {/* Before match */}
                      <>
                        {showScorecard(jsonfeed) ? null : (
                          <View
                            style={StyleSheet.applyWidth(
                              StyleSheet.compose(GlobalStyles.ViewStyles(theme)['Before match'], {
                                alignContent: 'center',
                                marginTop: 200,
                              }),
                              dimensions.width,
                            )}
                          >
                            <Text
                              style={StyleSheet.applyWidth(
                                StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                                  alignSelf: 'center',
                                  fontSize: 20,
                                  textAlign: 'center',
                                }),
                                dimensions.width,
                              )}
                            >
                              {MatchText()}
                              {'\n'}
                            </Text>
                          </View>
                        )}
                      </>
                    </>
                  )
                }}
              </PagalFanBEApi.FetchFetchFeedForSingleMatchGET>
            </TabViewItem>
            {/* FanChat */}
            <TabViewItem
              style={StyleSheet.applyWidth(GlobalStyles.TabViewItemStyles(theme)['Tab View Item'], dimensions.width)}
              title={'FAN CHAT'}
            >
              {/* Comments Frame */}
              <View style={StyleSheet.applyWidth({ flexGrow: 1, flexShrink: 1, marginTop: 10 }, dimensions.width)}>
                {/* TitleView */}
                <View
                  style={StyleSheet.applyWidth(
                    {
                      backgroundColor: theme.colors['Secondary'],
                      flexDirection: 'row',
                      flexWrap: 'nowrap',
                      height: 20,
                      justifyContent: 'space-between',
                      paddingLeft: 2,
                      paddingRight: 2,
                      width: 130,
                    },
                    dimensions.width,
                  )}
                >
                  <Text
                    style={StyleSheet.applyWidth(
                      StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                        color: theme.colors['PF-BG'],
                        fontFamily: 'Inter_600SemiBold',
                      }),
                      dimensions.width,
                    )}
                  >
                    {'fan reactions'}
                  </Text>
                  <Icon color={theme.colors['PF-BG']} size={20} name={'MaterialCommunityIcons/wechat'} />
                </View>
                {/* InputComments */}
                <View
                  style={StyleSheet.applyWidth(
                    GlobalStyles.ViewStyles(theme)['PF-InputCommentFrame'],
                    dimensions.width,
                  )}
                >
                  {/* Emoticons Frame */}
                  <View
                    style={StyleSheet.applyWidth(
                      {
                        backgroundColor: theme.colors.communityWhite,
                        flexDirection: 'row',
                        flexGrow: 0,
                        flexShrink: 0,
                        paddingBottom: 12,
                        paddingLeft: 12,
                        paddingRight: 12,
                        paddingTop: 12,
                      },
                      dimensions.width,
                    )}
                  >
                    {/* Flex Frame for Touchable */}
                    <View
                      style={StyleSheet.applyWidth(
                        { alignItems: 'center', flexGrow: 1, flexShrink: 0 },
                        dimensions.width,
                      )}
                    >
                      <Touchable>
                        {/* Flex Frame for Icons */}
                        <View>
                          <Icon
                            name={'MaterialCommunityIcons/emoticon'}
                            size={30}
                            color={theme.colors.communitySecondaryAlt}
                          />
                        </View>
                      </Touchable>
                    </View>
                    {/* Flex Frame for Touchable */}
                    <View
                      style={StyleSheet.applyWidth(
                        { alignItems: 'center', flexGrow: 1, flexShrink: 0 },
                        dimensions.width,
                      )}
                    >
                      <Touchable>
                        {/* Flex Frame for Icons */}
                        <View>
                          <Icon
                            name={'MaterialCommunityIcons/emoticon-angry'}
                            size={30}
                            color={theme.colors.communitySecondaryAlt}
                          />
                        </View>
                      </Touchable>
                    </View>
                    {/* Flex Frame for Touchable */}
                    <View
                      style={StyleSheet.applyWidth(
                        { alignItems: 'center', flexGrow: 1, flexShrink: 0 },
                        dimensions.width,
                      )}
                    >
                      <Touchable>
                        {/* Flex Frame for Icons */}
                        <View>
                          <Icon
                            name={'MaterialCommunityIcons/emoticon-confused'}
                            size={30}
                            color={theme.colors.communitySecondaryAlt}
                          />
                        </View>
                      </Touchable>
                    </View>
                    {/* Flex Frame for Touchable */}
                    <View
                      style={StyleSheet.applyWidth(
                        { alignItems: 'center', flexGrow: 1, flexShrink: 0 },
                        dimensions.width,
                      )}
                    >
                      <Touchable>
                        {/* Flex Frame for Icons */}
                        <View>
                          <Icon
                            name={'MaterialCommunityIcons/emoticon-cool'}
                            size={30}
                            color={theme.colors.communitySecondaryAlt}
                          />
                        </View>
                      </Touchable>
                    </View>
                    {/* Flex Frame for Touchable */}
                    <View
                      style={StyleSheet.applyWidth(
                        { alignItems: 'center', flexGrow: 1, flexShrink: 0 },
                        dimensions.width,
                      )}
                    >
                      <Touchable>
                        {/* Flex Frame for Icons */}
                        <View>
                          <Icon
                            name={'MaterialCommunityIcons/emoticon-cry'}
                            size={30}
                            color={theme.colors.communitySecondaryAlt}
                          />
                        </View>
                      </Touchable>
                    </View>
                  </View>
                  {/* Keyboard Input Frame */}
                  <View
                    style={StyleSheet.applyWidth(
                      {
                        alignItems: 'center',
                        backgroundColor: theme.colors.communityWhite,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginBottom: 10,
                        paddingBottom: 4,
                        paddingLeft: 12,
                        paddingRight: 12,
                        paddingTop: 4,
                      },
                      dimensions.width,
                    )}
                  >
                    {/* Flex Input */}
                    <View
                      style={StyleSheet.applyWidth({ flexGrow: 1, flexShrink: 0, paddingLeft: 20 }, dimensions.width)}
                    >
                      <TextInput
                        onChangeText={(newTextInputValue) => {
                          try {
                            setTextInputValue(newTextInputValue)
                          } catch (err) {
                            console.error(err)
                          }
                        }}
                        style={StyleSheet.applyWidth(
                          {
                            borderBottomWidth: 1,
                            borderColor: theme.colors.communityIconFill,
                            borderLeftWidth: 1,
                            borderRadius: 60,
                            borderRightWidth: 1,
                            borderTopWidth: 1,
                            marginLeft: 0,
                            marginRight: 4,
                            paddingBottom: 8,
                            paddingLeft: 12,
                            paddingRight: 12,
                            paddingTop: 8,
                          },
                          dimensions.width,
                        )}
                        placeholder={'Type something...'}
                        value={textInputValue}
                        placeholderTextColor={theme.colors.communityLightBlack}
                        multiline={false}
                        scrollEnabled={false}
                      />
                    </View>
                    {/* Flex Frame for Touchable */}
                    <View style={StyleSheet.applyWidth({ flexGrow: 0, flexShrink: 0 }, dimensions.width)}>
                      <Touchable
                        onPress={() => {
                          const handler = async () => {
                            try {
                              await pagalFanBEAddNewMatchCommentPOST.mutateAsync({
                                comment_text: textInputValue,
                                match_id: props.route?.params?.match_id ?? 77,
                                user_id: Constants['LOGGED_IN_USER'],
                              })
                              setTextInputValue('')
                            } catch (err) {
                              console.error(err)
                            }
                          }
                          handler()
                        }}
                      >
                        <Circle size={48} bgColor={theme.colors.communityTertiaryGreen}>
                          {/* Flex Frame for Icons */}
                          <View
                            style={StyleSheet.applyWidth(
                              {
                                flexGrow: 0,
                                flexShrink: 0,
                                justifyContent: 'center',
                              },
                              dimensions.width,
                            )}
                          >
                            <Icon name={'FontAwesome/send'} size={24} color={theme.colors.communityWhite} />
                          </View>
                        </Circle>
                      </Touchable>
                    </View>
                  </View>
                </View>
                {/* FetchComments */}
                <PagalFanBEApi.FetchFetchAllCommentsForAMatchGET id={props.route?.params?.match_id ?? 77}>
                  {({ loading, error, data, refetchFetchAllCommentsForAMatch }) => {
                    const fetchCommentsData = data
                    if (!fetchCommentsData || loading) {
                      return <ActivityIndicator />
                    }

                    if (error) {
                      return <Text style={{ textAlign: 'center' }}>There was a problem fetching this data</Text>
                    }

                    return (
                      <FlatList
                        data={fetchCommentsData}
                        listKey={'Z2C3fhw6'}
                        keyExtractor={(listData) => listData?.id || listData?.uuid || JSON.stringify(listData)}
                        renderItem={({ item }) => {
                          const listData = item
                          return (
                            <>
                              {/* Record Frame */}
                              <View style={StyleSheet.applyWidth({ flexGrow: 1, flexShrink: 1 }, dimensions.width)}>
                                {/* Message Frame */}
                                <View
                                  style={StyleSheet.applyWidth(
                                    {
                                      flexDirection: 'row',
                                      flexGrow: 1,
                                      flexShrink: 0,
                                    },
                                    dimensions.width,
                                  )}
                                >
                                  {/* Left Side Frame */}
                                  <View>
                                    {/* Flex Frame for Touchable */}
                                    <View>
                                      <Touchable>
                                        {/* Circle Image Frame */}
                                        <View
                                          style={StyleSheet.applyWidth(
                                            {
                                              flexGrow: 1,
                                              flexShrink: 0,
                                              paddingBottom: 10,
                                              paddingLeft: 12,
                                              paddingRight: 6,
                                              paddingTop: 10,
                                            },
                                            dimensions.width,
                                          )}
                                        >
                                          <CircleImage
                                            size={36}
                                            source={{
                                              uri: `${listData?.user_profiles?.profile_image}`,
                                            }}
                                          />
                                        </View>
                                      </Touchable>
                                    </View>
                                  </View>
                                  {/* Right Side Frame */}
                                  <View
                                    style={StyleSheet.applyWidth(
                                      {
                                        flexGrow: 1,
                                        flexShrink: 0,
                                        justifyContent: 'center',
                                        marginLeft: 12,
                                      },
                                      dimensions.width,
                                    )}
                                  >
                                    {/* Data Frame */}
                                    <View>
                                      {/* NameandTimeAgo */}
                                      <View
                                        style={StyleSheet.applyWidth(
                                          {
                                            alignItems: 'center',
                                            alignSelf: 'auto',
                                            flexDirection: 'row',
                                          },
                                          dimensions.width,
                                        )}
                                      >
                                        {/* Commenter Name */}
                                        <Text
                                          style={StyleSheet.applyWidth(
                                            {
                                              color: theme.colors.communityDarkUI,
                                              fontFamily: 'Rubik_600SemiBold',
                                              fontSize: 13,
                                              lineHeight: 19,
                                              marginRight: 10,
                                            },
                                            dimensions.width,
                                          )}
                                        >
                                          {listData?.user_profiles?.first_name}
                                        </Text>
                                        {/* TimeAgo */}
                                        <Text
                                          style={StyleSheet.applyWidth(
                                            StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                                              color: theme.colors['PF-Grey'],
                                              fontFamily: 'System',
                                              fontSize: 10,
                                              fontWeight: '200',
                                            }),
                                            dimensions.width,
                                          )}
                                        >
                                          {TimeAgo(listData?.created_at)}
                                        </Text>
                                      </View>
                                      {/* Comment */}
                                      <Text
                                        style={StyleSheet.applyWidth(
                                          {
                                            color: theme.colors.communityTrueOption,
                                            fontFamily: 'Rubik_400Regular',
                                            fontSize: 11,
                                            lineHeight: 17,
                                          },
                                          dimensions.width,
                                        )}
                                      >
                                        {listData?.comment}
                                      </Text>
                                    </View>
                                  </View>
                                </View>
                              </View>
                            </>
                          )
                        }}
                        numColumns={1}
                      />
                    )
                  }}
                </PagalFanBEApi.FetchFetchAllCommentsForAMatchGET>
              </View>
            </TabViewItem>
            {/* Moments */}
            <TabViewItem
              style={StyleSheet.applyWidth(GlobalStyles.TabViewItemStyles(theme)['Tab View Item'], dimensions.width)}
              title={'MOMENTS'}
            >
              <PagalFanBEApi.FetchFetchMatchMomentsGET matchId={props.route?.params?.match_id ?? 77}>
                {({ loading, error, data, refetchFetchMatchMoments }) => {
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
                      listKey={'o1Om4XPv'}
                      keyExtractor={(listData) => listData?.id || listData?.uuid || JSON.stringify(listData)}
                      renderItem={({ item }) => {
                        const listData = item
                        return (
                          <>
                            {/* Moment Card */}
                            <View
                              style={StyleSheet.applyWidth(
                                {
                                  alignItems: 'center',
                                  borderBottomWidth: 1,
                                  borderColor: theme.colors['Secondary'],
                                  borderRadius: 20,
                                  borderTopWidth: 1,
                                  flexDirection: 'row',
                                  height: 80,
                                  marginBottom: 4,
                                  marginTop: 4,
                                },
                                dimensions.width,
                              )}
                            >
                              {/* Image */}
                              <View style={StyleSheet.applyWidth({ marginLeft: 2, marginRight: 4 }, dimensions.width)}>
                                <Image
                                  style={StyleSheet.applyWidth(
                                    StyleSheet.compose(GlobalStyles.ImageStyles(theme)['Image'], {
                                      borderRadius: 20,
                                      height: 70,
                                      width: 70,
                                    }),
                                    dimensions.width,
                                  )}
                                  resizeMode={'cover'}
                                  source={{ uri: `${listData?.image_url}` }}
                                />
                              </View>
                              {/* Moment */}
                              <View style={StyleSheet.applyWidth({ flexWrap: 'wrap' }, dimensions.width)}>
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
                                  {convertUTCtoIST(listData?.created_at)}
                                </Text>

                                <Text
                                  style={StyleSheet.applyWidth(
                                    StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                                      color: theme.colors['PF-Grey'],
                                      fontFamily: 'Rubik_400Regular',
                                      fontSize: 12,
                                    }),
                                    dimensions.width,
                                  )}
                                >
                                  {listData?.moment}
                                </Text>
                              </View>
                            </View>
                          </>
                        )
                      }}
                      numColumns={1}
                      onEndReachedThreshold={0.5}
                      showsHorizontalScrollIndicator={true}
                      showsVerticalScrollIndicator={true}
                    />
                  )
                }}
              </PagalFanBEApi.FetchFetchMatchMomentsGET>
            </TabViewItem>
          </TabView>
        </View>
      </KeyboardAwareScrollView>
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
                    color: theme.colors['PF-Primary'],
                    fontFamily: 'Rubik_600SemiBold',
                    fontSize: 18,
                    marginBottom: 10,
                    marginTop: 10,
                  }),
                  dimensions.width,
                )}
              >
                {'PagalFan ADDA - Event Details'}
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
                    {'tomorrow 8:30 am'}
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
                  {'Ind-Aus Day 2 - Before Start'}
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
                  {
                    'Time for the toss. All three Tests so far have been won by sides losing the toss. Might a team be tempted to bowl after winning the toss?'
                  }
                </Text>
              </View>
              <Button
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

export default withTheme(MatchDaySingleScreen)
