import React from 'react'
import * as GlobalStyles from '../GlobalStyles.js'
import * as PagalFanBEApi from '../apis/PagalFanBEApi.js'
import * as GlobalVariables from '../config/GlobalVariableContext'
import Breakpoints from '../utils/Breakpoints'
import * as StyleSheet from '../utils/StyleSheet'
import { ScreenContainer, TabView, TabViewItem, withTheme } from '@draftbit/ui'
import { useIsFocused } from '@react-navigation/native'
import { FlashList } from '@shopify/flash-list'
import { ActivityIndicator, FlatList, Text, View, useWindowDimensions } from 'react-native'
import { Fetch } from 'react-request'

const MatchScoreTestScreen = (props) => {
  const dimensions = useWindowDimensions()
  const Constants = GlobalVariables.useValues()
  const Variables = Constants

  const giveTossStatement = () => {
    var winner = jsonfeed?.data?.toss?.winner
    var name = jsonfeed?.data?.teams?.[winner]?.name
    var elected = jsonfeed?.data?.toss?.elected

    return name + ' won the toss and elected to ' + elected + ' first'
  }

  const myFunctionName = (result) => {
    if (result == 'completed') return 'RESULT'

    if (result == 'not_started') return 'Yet To Start'

    if (result == 'started') return 'Live'
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

  const NameMVP = () => {
    var mvp = jsonfeed?.data?.play?.result?.pom

    return jsonfeed?.data?.players?.[mvp]?.player?.name
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

  // This will set the first team and second team according to batting order
  const setTeamSequence = () => {
    var team1
    var team2

    team1 = jsonfeed?.data?.play?.first_batting

    if (team1 == 'a') team2 = 'b'
    else team2 = 'a'

    return
  }

  const Convert2Decimal = (int_val) => {
    var numFixed = int_val.toFixed(2)

    return numFixed
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

  const Team1Name = () => {
    var team1
    var team2

    team1 = jsonfeed?.data?.play?.first_batting
    if (team1 == undefined) team1 = 'a'
    if (team1 == 'a') team2 = 'b'
    else team2 = 'a'

    return jsonfeed?.data?.teams?.[team1]?.name
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

  const showOutNotout = (rawName) => {
    var status_msg = jsonfeed?.data?.players?.[rawName]?.score?.['1']?.batting?.dismissal
    if (status_msg == null) {
      return 'not out'
    }

    return status_msg?.msg
  }

  const isStarted = (result) => {
    if (result == 'completed') return true

    if (result == 'not_started') return false

    if (result == 'started') return true
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

  const Team2Name = () => {
    var team1
    var team2

    team1 = jsonfeed?.data?.play?.first_batting
    if (team1 == undefined) team1 = 'a'

    if (team1 == 'a') team2 = 'b'
    else team2 = 'a'

    return jsonfeed?.data?.teams?.[team2]?.name
  }

  const { theme } = props

  const [jsonfeed, setJsonfeed] = React.useState('Loading')
  const [parsedString, setParsedString] = React.useState([])
  const [team1, setTeam1] = React.useState('b')
  const [team2, setTeam2] = React.useState('\'b\'')
  const [textInputValue, setTextInputValue] = React.useState('')

  return (
    <ScreenContainer
      style={StyleSheet.applyWidth({ margin: 20 }, dimensions.width)}
      scrollable={false}
      hasSafeArea={true}
    >
      <PagalFanBEApi.FetchFetchFeedForSingleMatchGET
        refetchInterval={30000}
        matchid={70}
        onData={(fetchData) => {
          try {
            const valuejMGMx7dw = JSON.parse(fetchData && fetchData[0]?.match_data)
            setJsonfeed(valuejMGMx7dw)
            const parsedJsonFeed = valuejMGMx7dw
            setTeamSequence()
            console.log(parsedJsonFeed)
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
              <>
                {isStarted(jsonfeed?.data?.status) ? null : (
                  <View
                    style={StyleSheet.applyWidth(
                      {
                        alignItems: 'center',
                        alignSelf: 'center',
                        justifyContent: 'center',
                        marginTop: 300,
                      },
                      dimensions.width,
                    )}
                  >
                    <Text
                      style={StyleSheet.applyWidth(
                        StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], { fontSize: 20 }),
                        dimensions.width,
                      )}
                    >
                      {'Match Yet To Start '}
                    </Text>
                  </View>
                )}
              </>
              <>
                {!isStarted(jsonfeed?.data?.status) ? null : (
                  <View>
                    {/* Title of Match */}
                    <View
                      style={StyleSheet.applyWidth(
                        {
                          backgroundColor: theme.colors['Background'],
                          flexDirection: 'column',
                        },
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
                        {myFunctionName(jsonfeed?.data?.status)}
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
                    {/* Result  */}
                    <View style={StyleSheet.applyWidth({ marginTop: 10 }, dimensions.width)}>
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

                    <TabView
                      tabBarPosition={'top'}
                      keyboardDismissMode={'auto'}
                      swipeEnabled={true}
                      activeColor={theme.colors.primary}
                      pressColor={theme.colors.primary}
                      indicatorColor={theme.colors.primary}
                      tabsBackgroundColor={theme.colors.background}
                    >
                      <TabViewItem
                        style={StyleSheet.applyWidth(
                          StyleSheet.compose(GlobalStyles.TabViewItemStyles(theme)['Tab View Item'], {
                            marginTop: -20,
                          }),
                          dimensions.width,
                        )}
                        title={'TEAM1'}
                      >
                        {/* Individual Team Scores */}
                        <View style={StyleSheet.applyWidth({ marginTop: 40, position: 'relative' }, dimensions.width)}>
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
                            <View>
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
                                <View style={StyleSheet.applyWidth({ alignSelf: 'flex-start' }, dimensions.width)}>
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
                                        marginRight: 15,
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
                                        marginRight: 10,
                                      }),
                                      dimensions.width,
                                    )}
                                  >
                                    {'SR'}
                                  </Text>
                                </View>
                              </View>
                              <FlatList
                                data={Team1BattingOrder()}
                                listKey={'LFUpbUBh'}
                                keyExtractor={(listData) => listData?.id || listData?.uuid || JSON.stringify(listData)}
                                renderItem={({ item }) => {
                                  const listData = item
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
                                            style={StyleSheet.applyWidth({ alignSelf: 'flex-start' }, dimensions.width)}
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
                                              {GiveBatsmanDetails(listData)?.name}
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
                                              {GiveBatsmanDetails(listData)?.runs}
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
                                              {GiveBatsmanDetails(listData)?.balls}
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
                                              {GiveBatsmanDetails(listData)?.fours}
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
                                              {GiveBatsmanDetails(listData)?.sixes}
                                            </Text>
                                            {/* Strike rate */}
                                            <Text
                                              style={StyleSheet.applyWidth(
                                                StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                                                  fontSize: 12,
                                                  marginRight: 0,
                                                  opacity: 1,
                                                }),
                                                dimensions.width,
                                              )}
                                            >
                                              {Convert2Decimal(GiveBatsmanDetails(listData)?.sr)}
                                              {'\n'}
                                            </Text>
                                          </View>
                                        </View>
                                        {/* View 2 */}
                                        <View style={StyleSheet.applyWidth({ marginLeft: 3 }, dimensions.width)}>
                                          <Text
                                            style={StyleSheet.applyWidth(
                                              StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                                                fontSize: 9,
                                              }),
                                              dimensions.width,
                                            )}
                                          >
                                            {' '}
                                            {showOutNotout(listData)}
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
                            <View style={StyleSheet.applyWidth({ marginTop: 30 }, dimensions.width)}>
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
                                <View style={StyleSheet.applyWidth({ alignSelf: 'flex-start' }, dimensions.width)}>
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
                                        marginRight: 10,
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
                                listKey={'zVvPsWhs'}
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
                                          style={StyleSheet.applyWidth({ alignSelf: 'flex-start' }, dimensions.width)}
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
                                                marginRight: 10,
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
                      </TabViewItem>
                      {/* Tab View Item 2 */}
                      <TabViewItem
                        style={StyleSheet.applyWidth(
                          StyleSheet.compose(GlobalStyles.TabViewItemStyles(theme)['Tab View Item'], {
                            marginTop: -20,
                          }),
                          dimensions.width,
                        )}
                        title={'TEAM2'}
                      >
                        {/* Individual Team Scores */}
                        <View style={StyleSheet.applyWidth({ marginTop: 40 }, dimensions.width)}>
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
                              {Team2Name()}{' '}
                            </Text>
                            {/* Batting Score  */}
                            <View>
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
                                <View style={StyleSheet.applyWidth({ alignSelf: 'flex-start' }, dimensions.width)}>
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
                                        marginRight: 10,
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
                                        marginRight: 20,
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
                                        marginRight: 10,
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
                                listKey={'vWDsdc73'}
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
                                            style={StyleSheet.applyWidth({ alignSelf: 'flex-start' }, dimensions.width)}
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
                                                  marginRight: 10,
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
                                        <View style={StyleSheet.applyWidth({ marginLeft: 3 }, dimensions.width)}>
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
                            <View style={StyleSheet.applyWidth({ marginTop: 30 }, dimensions.width)}>
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
                                <View style={StyleSheet.applyWidth({ alignSelf: 'flex-start' }, dimensions.width)}>
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
                                        marginRight: 10,
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
                                listKey={'f0bCawLw'}
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
                                          style={StyleSheet.applyWidth({ alignSelf: 'flex-start' }, dimensions.width)}
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
                                                marginRight: 10,
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
                      </TabViewItem>
                    </TabView>
                    {/* Match Details */}
                    <View style={StyleSheet.applyWidth({ alignSelf: 'auto' }, dimensions.width)}>
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
                  </View>
                )}
              </>
            </>
          )
        }}
      </PagalFanBEApi.FetchFetchFeedForSingleMatchGET>
    </ScreenContainer>
  )
}

export default withTheme(MatchScoreTestScreen)
