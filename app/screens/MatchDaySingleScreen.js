import React from 'react'
import * as GlobalStyles from '../GlobalStyles.js'
import * as PagalFanBEApi from '../apis/PagalFanBEApi.js'
import * as GlobalVariables from '../config/GlobalVariableContext'
import TimeAgo from '../global-functions/TimeAgo'
import convertNullToTBD from '../global-functions/convertNullToTBD'
import convertUTCtoIST from '../global-functions/convertUTCtoIST'
import endDate from '../global-functions/endDate'
import getCorrectDateFormat from '../global-functions/getCorrectDateFormat'
import getCorrectTimeFormat from '../global-functions/getCorrectTimeFormat'
import isDatetimeInRange from '../global-functions/isDatetimeInRange'
import * as StyleSheet from '../utils/StyleSheet'
import { useTranslation } from 'react-i18next'

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
  TextInput,
  Touchable,
  withTheme,
} from '@draftbit/ui'
import { FlashList } from '@shopify/flash-list'
import {
  ActivityIndicator,
  FlatList,
  Modal,
  ScrollView,
  Text,
  View,
  useWindowDimensions,
  StyleSheet as RNStyleSheet,
} from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useSnackbar, Image } from '../components'

const EMOTICONS = ['😀', '😠', '😭', '😳', '😎', '👍', '👎', '🙏']

const MatchDaySingleScreen = (props) => {
  const { t: translate } = useTranslation()
  const dimensions = useWindowDimensions()
  const Constants = GlobalVariables.useValues()

  const snackbar = useSnackbar()

  const MatchText = () => {
    const winner = jsonfeed?.data?.toss?.winner
    const name = jsonfeed?.data?.teams?.[winner]?.name
    var elected = jsonfeed?.data?.toss?.elected
    if (elected == 'bowl') elected = 'Bowl'
    else elected = 'Bat'
    var toss = name + ' Won The Toss and Elected to ' + elected + ' First'

    if (jsonfeed?.data?.play_status == 'pre_match') return toss
    return 'Live feed starting soon...'
  }

  const checkMatchDates = (str1, str2) => {
    const [year1, month1, day1] = str1.split('-');
    const [year2, month2, day2] = str2.split('-');

    if (year1 == year2 && month1 == month2 && day1 == day2) return true;
    return false;
  }

  const YetToBat1 = () => {
    var team1
    var team2

    team1 = jsonfeed?.data?.play?.first_batting
    if (team1 == undefined) team1 = 'a'

    if (team1 == 'a') team2 = 'b'
    else team2 = 'a'

    const playingAll = jsonfeed?.data?.squad?.[team1].playing_xi;

    if (jsonfeed?.data?.squad?.[team2].playing_xi.length == 0) {
      return false;
    }

    var st
    if (team1 == 'a') st = 'a_1'
    else st = 'b_1'

    const batted = jsonfeed?.data?.play?.innings?.[st]?.batting_order;
    // console.log(batted);

    const ans = playingAll.filter((ele) => {
      var t = true;
      batted.forEach((ele2) => {
        if (ele == ele2) t = false;
      })
      return t;
    })

    return ans;
  }

  const YetToBat2 = () => {
    var team1
    var team2

    team1 = jsonfeed?.data?.play?.first_batting
    if (team1 == undefined) team1 = 'a'

    if (team1 == 'a') team2 = 'b'
    else team2 = 'a'

    const playingAll = jsonfeed?.data?.squad?.[team2].playing_xi;

    console.log(Object.keys(playingAll).length);
    if (Object.keys(playingAll).length == 0) {
      return false;
    }

    var st
    if (team2 == 'a') st = 'a_1'
    else st = 'b_1'

    const batted = jsonfeed?.data?.play?.innings?.[st]?.batting_order;
    // console.log(batted);

    const ans = playingAll.filter((ele) => {
      var t = true;
      batted.forEach((ele2) => {
        if (ele == ele2) t = false;
      })
      return t;
    })
    return ans;
  }

  const GiveBowlingDetails = (rawName) => {
    var response = {
      name: jsonfeed?.data?.players?.[rawName]?.player?.name,
      runs: jsonfeed?.data?.players?.[rawName]?.score?.['1']?.bowling?.score?.runs,
      overs:
        jsonfeed?.data?.players?.[rawName]?.score?.['1']?.bowling?.score?.overs[0] +
        '.' +
        jsonfeed?.data?.players?.[rawName]?.score?.['1']?.bowling?.score?.overs[1],
      economy: jsonfeed?.data?.players?.[rawName]?.score?.['1']?.bowling?.score?.economy,
      wickets: jsonfeed?.data?.players?.[rawName]?.score?.['1']?.bowling?.score?.wickets,
      maiden: jsonfeed?.data?.players?.[rawName]?.score?.['1']?.bowling?.score?.maiden_overs,
    }
    if (jsonfeed?.data?.players?.[rawName]?.score?.['1']?.bowling?.score?.overs[1] == 0) {
      response.overs = jsonfeed?.data?.players?.[rawName]?.score?.['1']?.bowling?.score?.overs[0];
    }
    return response
  }

  const printWhole = (overs) => {
    let whole = overs;
    return whole;
  }
  const GiveBowlingDetails2ndInnings = (rawName) => {
    var response = {
      name: jsonfeed?.data?.players?.[rawName]?.player?.name,
      runs: jsonfeed?.data?.players?.[rawName]?.score?.['2']?.bowling?.score?.runs,
      overs:
        jsonfeed?.data?.players?.[rawName]?.score?.['2']?.bowling?.score?.overs[0] +
        '.' +
        jsonfeed?.data?.players?.[rawName]?.score?.['2']?.bowling?.score?.overs[1],
      economy: jsonfeed?.data?.players?.[rawName]?.score?.['2']?.bowling?.score?.economy,
      wickets: jsonfeed?.data?.players?.[rawName]?.score?.['2']?.bowling?.score?.wickets,
      maiden: jsonfeed?.data?.players?.[rawName]?.score?.['2']?.bowling?.score?.maiden_overs,
    }
    if (jsonfeed?.data?.players?.[rawName]?.score?.['1']?.bowling?.score?.overs[1] == 0) {
      response.overs = jsonfeed?.data?.players?.[rawName]?.score?.['1']?.bowling?.score?.overs[0];
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
  const team2BattingOrder2ndInnings = () => {
    var team1
    var team2

    team1 = jsonfeed?.data?.play?.first_batting
    if (team1 == undefined) team1 = 'a'

    if (team1 == 'a') team2 = 'b'
    else team2 = 'a'

    var st, st2
    if (team2 == 'a') {
      st = 'a_1'
      st2 = 'a_2'
    } else {
      st = 'b_1'
      st2 = 'b_2'
    }

    return jsonfeed?.data?.play?.innings?.[st2]?.batting_order
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
  const Team2Score2ndInnings = () => {
    var team1
    var team2

    team1 = jsonfeed?.data?.play?.first_batting
    if (team1 == undefined) team1 = 'a'

    if (team1 == 'a') team2 = 'b'
    else team2 = 'a'

    var st, st2
    console.log(team1, team2)
    if (team2 == 'a') {
      st = 'a_1'
      st2 = 'a_2'
    } else {
      st = 'b_1'
      st2 = 'b_2'
    }
    return jsonfeed?.data?.play?.innings?.[st2]?.score_str
  }
  const Team2ScoreBoth = () => {
    var team1
    var team2

    team1 = jsonfeed?.data?.play?.first_batting

    var st, str2;
    if (team1 == 'a') {
      st = 'b_1'
      str2 = 'b_2'
    }
    else {
      st = 'a_1'
      str2 = 'a_2'
    }

    var ans1 = jsonfeed?.data?.play?.innings?.[st]?.score_str
    var ans2 = jsonfeed?.data?.play?.innings?.[str2]?.score_str
    if (ans2 == undefined) ans2 = ''
    else ans2 = ' & ' + ans2
    return ans1 + ans2
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
  const GiveBatsmanDetails2ndInnings = (rawName) => {
    var response = {
      name: jsonfeed?.data?.players?.[rawName]?.player?.name,
      runs: jsonfeed?.data?.players?.[rawName]?.score?.['2']?.batting?.score?.runs,
      balls: jsonfeed?.data?.players?.[rawName]?.score?.['2']?.batting?.score?.balls,
      fours: jsonfeed?.data?.players?.[rawName]?.score?.['2']?.batting?.score?.fours,
      sixes: jsonfeed?.data?.players?.[rawName]?.score?.['2']?.batting?.score?.sixes,
      sr: jsonfeed?.data?.players?.[rawName]?.score?.['2']?.batting?.score?.strike_rate,
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

    var ans = ''

    if (jsonfeed?.data?.play_status == 'result') ans = jsonfeed?.data?.play?.result?.msg

    if (jsonfeed?.data?.play_status == 'in_play' || jsonfeed?.data?.play_status == 'stumps') {
      ans = jsonfeed?.data?.play?.live?.required_score?.title
      if (ans == undefined) ans = jsonfeed?.data?.play?.live?.score?.msg_trail_by
      if (ans == undefined) ans = jsonfeed?.data?.play?.live?.score?.msg_lead_by
    }
    if (jsonfeed?.data?.play_status == 'scheduled') {
      ans = 'Match is yet to start'
    }
    return ans
  }

  const check2InningsTeamA = () => {
    let innings = jsonfeed?.data?.play?.innings_order

    let ans = false
    for (let i = 0; i < innings?.length; i++) {
      if (innings[i] == 'a_2') ans = true
    }
    console.log(1)
    console.log(ans)
    return ans
  }
  const check2InningsTeamB = () => {
    let innings = jsonfeed?.data?.play?.innings_order

    let ans = false
    for (let i = 0; i < innings?.length; i++) {
      if (innings[i] == 'b_2') ans = true
    }
    return ans
  }

  const showOutNotout = (rawName) => {
    var status_msg = jsonfeed?.data?.players?.[rawName]?.score?.['1']?.batting?.dismissal
    if (status_msg == null) {
      return 'Not Out'
    }

    return status_msg?.msg
  }

  const showOutNotout2ndInnings = (rawName) => {
    var status_msg = jsonfeed?.data?.players?.[rawName]?.score?.['2']?.batting?.dismissal
    if (status_msg == null) {
      return 'Not Out'
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

    var st, st2
    if (team1 == 'a') {
      st = 'a_1'
      st2 = 'a_2'
    } else {
      st = 'b_1'
      st2 = 'b_2'
    }

    var ans1 = jsonfeed?.data?.play?.innings?.[st]?.score_str
    return ans1
  }

  const Team1Score2ndInnings = () => {
    var team1
    var team2

    team1 = jsonfeed?.data?.play?.first_batting
    if (team1 == undefined) team1 = 'a'

    if (team1 == 'a') team2 = 'b'
    else team2 = 'a'

    var st, st2
    if (team1 == 'a') {
      st = 'a_1'
      st2 = 'a_2'
    } else {
      st = 'b_1'
      st2 = 'b_2'
    }

    var ans1 = jsonfeed?.data?.play?.innings?.[st2]?.score_str
    return ans1
  }
  const Team1ScoreBoth = () => {
    var team1
    var team2

    team1 = jsonfeed?.data?.play?.first_batting
    if (team1 == undefined) team1 = 'a'

    if (team1 == 'a') team2 = 'b'
    else team2 = 'a'

    var st, st2
    if (team1 == 'a') {
      st = 'a_1'
      st2 = 'a_2'
    } else {
      st = 'b_1'
      st2 = 'b_2'
    }

    var ans1 = jsonfeed?.data?.play?.innings?.[st]?.score_str
    var ans2 = jsonfeed?.data?.play?.innings?.[st2]?.score_str
    if (ans2 == undefined) ans2 = ''
    else ans2 = ' & ' + ans2
    return ans1 + ans2
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
  const Team2BowlingOrder2ndInnings = () => {
    var team1
    var team2

    team1 = jsonfeed?.data?.play?.first_batting
    if (team1 == undefined) team1 = 'a'

    if (team1 == 'a') team2 = 'b'
    else team2 = 'a'

    var st, st2
    if (team2 == 'a') {
      st = 'a_1'
      st2 = 'a_2'
    } else {
      st = 'b_1'
      st2 = 'b_2'
    }

    return jsonfeed?.data?.play?.innings?.[st2]?.bowling_order
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

  const Team1BattingOrder2ndInnings = () => {
    var team1
    var team2

    team1 = jsonfeed?.data?.play?.first_batting
    if (team1 == undefined) team1 = 'a'

    if (team1 == 'a') team2 = 'b'
    else team2 = 'a'

    var st, st2
    if (team1 == 'a') {
      st = 'a_1'
      st2 = 'a_2'
    } else {
      st = 'b_1'
      st2 = 'b_2'
    }

    return jsonfeed?.data?.play?.innings?.[st2]?.batting_order
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
  const Team1BowlingOrder2ndInnings = () => {
    var team1
    var team2

    team1 = jsonfeed?.data?.play?.first_batting
    if (team1 == undefined) team1 = 'a'

    if (team1 == 'a') team2 = 'b'
    else team2 = 'a'

    var st, st2
    if (team1 == 'a') {
      st = 'a_1'
      st2 = 'a_2'
    } else {
      st = 'b_1'
      st2 = 'b_2'
    }

    return jsonfeed?.data?.play?.innings?.[st2]?.bowling_order
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
  const Team2RR2ndInnings = () => {
    var team1
    var team2

    team1 = jsonfeed?.data?.play?.first_batting
    if (team1 == undefined) team1 = 'a'

    if (team1 == 'a') team2 = 'b'
    else team2 = 'a'

    var st, str2
    if (team2 == 'a') {
      st = 'a_1'
      str2 = 'a_2'
    } else {
      st = 'b_1'
      str2 = 'b_2'
    }

    return jsonfeed?.data?.play?.innings?.[str2]?.score?.run_rate
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
  const Team1RR2ndInnings = () => {
    var team1
    var team2

    team1 = jsonfeed?.data?.play?.first_batting
    if (team1 == undefined) team1 = 'a'

    if (team1 == 'a') team2 = 'b'
    else team2 = 'a'

    var st, st2
    if (team1 == 'a') {
      st = 'a_1'
      st2 = 'a_2'
    } else {
      st = 'b_1'
      st2 = 'b_2'
    }

    return jsonfeed?.data?.play?.innings?.[st2]?.score?.run_rate
  }

  const { theme } = props
  const { navigation } = props

  const pagalFanBEAddNewMatchCommentPOST = PagalFanBEApi.useAddNewMatchCommentPOST()

  const [Rz_match_key, setRz_match_key] = React.useState('')
  const [isSessionLive, setIsSessionLive] = React.useState(false)
  const [jsonfeed, setJsonfeed] = React.useState('Loading...')
  const [showBakarrPopup, setShowBakarrPopup] = React.useState(false)
  const [team1_name, setTeam1_name] = React.useState('')
  const [team2_name, setTeam2_name] = React.useState('')
  const [textInputValue, setTextInputValue] = React.useState('')
  const [matchCommentary, setMatchCommentary] = React.useState(null);

  const [feedAvailable, setFeedAvailable] = React.useState(true)

  const handleEmoticonPress = (item) => {
    setTextInputValue(textInputValue + item)
  }

  const renderEmoticons = () => {
    return (
      <View style={styles.emoticonsContainer}>
        {EMOTICONS.map((item, index) => (
          <Pressable key={index} onPress={() => handleEmoticonPress(item)}>
            <Text style={styles.emoticon}>{item}</Text>
          </Pressable>
        ))}
      </View>
    )
  }

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

  return (
    <ScreenContainer hasSafeArea={true} scrollable={false}>
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        enableOnAndroid={true}
        keyboardShouldPersistTaps={'always'}
        viewIsInsideTabBar={false}
      >
        {/* PF-BackHeader */}
        <View
          style={StyleSheet.applyWidth(
            StyleSheet.compose(GlobalStyles.ViewStyles(theme)['PF-BackHeader 7'], {
              paddingBottom: 4,
              paddingTop: 4,
              margin: 10,
            }),
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
          <PagalFanBEApi.FetchFetchSingleMatchGET id={props.route?.params?.match_id ?? 77}
            onData={(data) => {
              if (data && data[0]?.feed_available == false) setFeedAvailable(false);
            }}
          >
            {({ loading, error, data, refetchFetchSingleMatch }) => {
              const fetchData = data
              // console.log(data);
              if (!fetchData || loading) {
                return <ActivityIndicator />
              }

              if (error) {
                return <Text style={{ textAlign: 'center' }}>{translate('MatchDaySingleScreen.Text.ProblemFetchData')}</Text>
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
                                    {translate('MatchDaySingleScreen.Text.Live')}
                                  </Text>
                                </View>
                              )}
                            </>
                            {listData?.feed_available ? (
                              <>
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
                                    {translate('MatchDaySingleScreen.Text.vs')}
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
                              </>
                            ) : (
                              <>
                                <>
                                  {/*Image to cover if not feed is not available*/}
                                  <Image
                                    source={{ uri: listData?.thumbnail_path }}
                                    style={{
                                      height: '100%',
                                      width: '100%',
                                      borderRadius: 12,
                                    }}
                                    resizeMode="contain"
                                  />
                                </>
                              </>
                            )}
                          </View>
                          {/* Details */}
                          <View
                            style={StyleSheet.applyWidth(
                              {
                                alignItems: 'flex-end',
                                flexDirection: 'column',
                                justifyContent: 'flex-start',
                                marginTop: 11,
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
                                  fontSize: 12,
                                  marginBottom: 2,
                                }),
                                dimensions.width,
                              )}
                            >
                              {checkMatchDates(listData?.match_date, listData?.end_date) ? getCorrectDateFormat(listData?.match_date) : getCorrectDateFormat(listData?.match_date)}
                              {checkMatchDates(listData?.match_date, listData?.end_date) ? null : endDate(listData?.end_date)}
                            </Text>
                            {/* StartTime */}
                            <Text
                              style={StyleSheet.applyWidth(
                                StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                                  color: theme.colors['PF-Grey'],
                                  fontFamily: 'System',
                                  fontSize: 12,
                                  fontWeight: '400',
                                }),
                                dimensions.width,
                              )}
                            >
                              {getCorrectTimeFormat(listData?.start_time)} {" "}
                              {translate('MatchDaySingleScreen.Text.IST')}
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
                              marginHorizontal: 10,
                            }),
                            dimensions.width,
                          )}
                        >
                          <PagalFanBEApi.FetchFetchNextBakarrSessionForMatchGET
                            matchId={listData?.id}
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
                                return <ActivityIndicator />
                              }

                              if (error) {
                                return (
                                  <Text style={{ textAlign: 'center' }}>{translate('MatchDaySingleScreen.Text.ProblemFetchData')}</Text>
                                )
                              }

                              return (
                                <>
                                  {/* Live View */}
                                  <>
                                    {!isSessionLive ? null : (
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
                                          >{translate('MatchDaySingleScreen.Text.LiveBakarr')}
                                          </Text>
                                          <Icon
                                            size={24}
                                            name={'Ionicons/ios-radio-outline'}
                                            color={theme.colors['PF-BG']}
                                          />
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
                                            {translate('MatchDaySingleScreen.Text.Join')}
                                          </Text>
                                        </Pressable>
                                      </View>
                                    )}
                                  </>
                                  {/* TitleView */}
                                  <View style={StyleSheet.applyWidth({ flexDirection: 'column' }, dimensions.width)}>
                                    {/* Header */}
                                    <View
                                      style={StyleSheet.applyWidth(
                                        {
                                          alignItems: 'center',
                                          flexDirection: 'row',
                                        },
                                        dimensions.width,
                                      )}
                                    >
                                      <Text
                                        style={StyleSheet.applyWidth(
                                          StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                                            color: theme.colors['Secondary'],
                                            fontFamily: 'Rubik_700Bold',
                                            fontSize: 12,
                                            marginBottom: 4,
                                            marginRight: 4,
                                          }),
                                          dimensions.width,
                                        )}
                                      >
                                        {translate('MatchDaySingleScreen.Text.BakarrSession')}
                                      </Text>
                                      {/* Time */}
                                      <Text
                                        style={StyleSheet.applyWidth(
                                          StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                                            color: theme.colors['PF-Grey'],
                                            fontFamily: 'Rubik_400Regular',
                                            fontSize: 10,
                                            marginBottom: 4,
                                          }),
                                          dimensions.width,
                                        )}
                                      >
                                        {convertUTCtoIST(fetchData && fetchData[0]?.session_start)}
                                      </Text>
                                    </View>
                                    {/* Title */}
                                    <Text
                                      style={StyleSheet.applyWidth(
                                        StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                                          color: theme.colors['PF-Primary'],
                                          fontFamily: 'Rubik_400Regular',
                                          fontSize: 12,
                                          marginBottom: 4,
                                        }),
                                        dimensions.width,
                                      )}
                                    >
                                      {fetchData && fetchData[0]?.session_title}
                                    </Text>
                                  </View>

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
                                    {translate('MatchDaySingleScreen.Text.BakarrRoom')}
                                  </Text>
                                </>
                              )
                            }}
                          </PagalFanBEApi.FetchFetchNextBakarrSessionForMatchGET>
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
            {/* FanChat */}
            <TabViewItem
              style={[
                StyleSheet.applyWidth(GlobalStyles.TabViewItemStyles(theme)['Tab View Item'], dimensions.width),
                { marginHorizontal: 10 },
              ]}
              title={translate('MatchDaySingleScreen.Text.FanChat')}
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
                      height: 25,
                      justifyContent: 'space-between',
                      paddingLeft: 2,
                      paddingRight: 2,
                      paddingTop: 2,
                      width: 145,
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
                    {translate('MatchDaySingleScreen.Text.FanReaction')}
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
                  {renderEmoticons()}
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
                        paddingTop: 2,
                      },
                      dimensions.width,
                    )}
                  >
                    {/* Flex Input */}
                    <View
                      style={StyleSheet.applyWidth({ flexGrow: 1, flexShrink: 0, paddingLeft: 20 }, dimensions.width)}
                    >
                      <TextInput
                        onChangeText={setTextInputValue}
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
                            paddingLeft: 16,
                            paddingRight: 12,
                            paddingTop: 8,
                            color: theme.colors['PF-Grey']
                          },
                          dimensions.width,
                        )}
                        placeholder={translate('MatchDaySingleScreen.Text.InputPlaceholder')}
                        value={textInputValue}
                        placeholderTextColor={theme.colors.communityLightBlack}
                        multiline={false}
                        scrollEnabled={false}
                      />
                    </View>
                    {/* Flex Frame for Touchable */}
                    <View style={StyleSheet.applyWidth({ flexGrow: 0, flexShrink: 0 }, dimensions.width)}>
                      <Touchable
                        disabled={!textInputValue.trim()}
                        onPress={() => {
                          const handler = async () => {
                            try {
                              snackbar.show({ title: translate('MatchDaySingleScreen.Toast.Upload') })
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
                      return <Text style={{ textAlign: 'center' }}>{translate('MatchDaySingleScreen.Text.ProblemFetchData')}</Text>
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
                                      <View style={{flex:1}}>
                                        <Text
                                          style={StyleSheet.applyWidth(
                                            {
                                              color: theme.colors.communityTrueOption,
                                              fontFamily: 'Rubik_400Regular',
                                              fontSize: 11,
                                              lineHeight: 17,
                                              width: dimensions.width * 0.75
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
                              </View>
                            </>
                          )
                        }}
                        numColumns={1}
                        showsVerticalScrollIndicator={false}
                        nestedScrollEnabled
                      />
                    )
                  }}
                </PagalFanBEApi.FetchFetchAllCommentsForAMatchGET>
              </View>
            </TabViewItem>

            {feedAvailable && 

            // Scores
            <TabViewItem
              style={StyleSheet.applyWidth(
                StyleSheet.compose(GlobalStyles.TabViewItemStyles(theme)['Tab View Item'], {
                  paddingHorizontal: 10,
                  backgroundColor: theme.colors['PF-Grey'],
                }),
                dimensions.width,
              )}
              title={translate('MatchDaySingleScreen.Text.Scores')}
            >
              {feedAvailable ?
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
                      return <Text style={{ textAlign: 'center' }}>{translate('MatchDaySingleScreen.Text.ProblemFetchData')}</Text>
                    }

                    return (
                      <>
                        {/* Match Live  */}
                        <>
                          {!showScorecard(jsonfeed) ?
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
                                    color: '#fff',
                                  }),
                                  dimensions.width,
                                )}
                              >
                                {MatchText()}
                                {'\n'}
                              </Text>
                            </View>
                            : (
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
                                      { marginBottom: 5 }
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
                                            color: '#fff',
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
                                            color: '#fff',
                                          }),
                                          dimensions.width,
                                        )}
                                      >
                                        {Team1ScoreBoth()} {Team1ScoreBoth() ? 'Overs' : null}
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
                                        { marginBottom: 5 }
                                      )}
                                    >
                                      {/* Team_name_2 */}
                                      <Text
                                        style={StyleSheet.applyWidth(
                                          StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                                            fontFamily: 'System',
                                            fontSize: 13,
                                            fontWeight: '700',
                                            color: '#fff',
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
                                            color: '#fff',
                                          }),
                                          dimensions.width,
                                        )}
                                      >
                                        {Team2ScoreBoth()}{Team2ScoreBoth() ? ' Overs' : null}
                                        {'\n'}
                                      </Text>
                                    </View>
                                    {/* Text 3 */}
                                    <Text
                                      style={StyleSheet.applyWidth(
                                        StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                                          fontSize: 11,
                                          color: '#fff',
                                          marginBottom: -5
                                        }),
                                        dimensions.width,
                                      )}
                                    >
                                      {getGameStatus(jsonfeed?.data?.status)}: {StatusData()}
                                      {'\n'}
                                    </Text>
                                  </View>
                                  {/* Layer-2 */}
                                  <View>
                                    {/* Match Title */}
                                    <Text
                                      style={StyleSheet.applyWidth(
                                        StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                                          fontSize: 11,
                                          textAlign: 'left',
                                          color: '#fff',
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
                                    style={{
                                      borderTopColor: '#fff',
                                      borderTopWidth: 1,
                                      fontSize: 13,
                                    }}
                                    tabBarPosition={'top'}
                                    keyboardDismissMode={'auto'}
                                    swipeEnabled={true}
                                    activeColor={theme.colors.peoplebitSalmonRed}
                                    pressColor={theme.colors.peoplebitSalmonRed}
                                    indicatorColor={theme.colors.peoplebitSalmonRed}
                                    tabsBackgroundColor={theme.colors['PF-Grey']}
                                  >
                                    {/* Tab Team1 */}
                                    {console.log(YetToBat1())}
                                    {YetToBat1()?.length == 11? null :
                                      <TabViewItem title={Team1Name()} >
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
                                              { color: '	rgb(255, 0, 102)' },
                                            )}
                                          >
                                            {/* Team1 */}
                                            <View>
                                              {/* Team_Name */}
                                              <Text
                                                style={StyleSheet.applyWidth(
                                                  StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                                                    fontFamily: 'System',
                                                    fontWeight: '700',
                                                    color: '#fff',
                                                  }),
                                                  dimensions.width,
                                                )}
                                              >
                                                {Team1Name()}{' '}
                                                {jsonfeed?.data?.format == 'test' ? (
                                                  <Text>(1st Innings)</Text>
                                                ) : (
                                                  <Text></Text>
                                                )}
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
                                                          color: '#fff',
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
                                                          // marginRight: 20,
                                                          color: '#fff',
                                                          width: 40,
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
                                                          width: 40,
                                                          color: '#fff',
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
                                                          width: 40,
                                                          color: '#fff',
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
                                                          width: 40,
                                                          color: '#fff',
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
                                                          color: '#fff',
                                                          width: 40,
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
                                                              marginBottom: 1
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
                                                                    color: '#fff',
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
                                                                    width: 40,
                                                                    color: '#fff',
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
                                                                    width: 40,
                                                                    color: '#fff',
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
                                                                    width: 40,
                                                                    color: '#fff',
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
                                                                    width: 40,
                                                                    color: '#fff',
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
                                                                    color: '#fff',
                                                                    width: 50,
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
                                                            style={StyleSheet.applyWidth({ marginTop: 1 }, dimensions.width)}
                                                          >
                                                            <Text
                                                              style={StyleSheet.applyWidth(
                                                                StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                                                                  fontSize: 9,
                                                                  color: '#fff',
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
                                                        color: '#fff',
                                                        fontSize: 16
                                                      }),
                                                      dimensions.width,
                                                    )}
                                                  >
                                                    {'Total:\n'}
                                                  </Text>

                                                  <View
                                                    style={StyleSheet.applyWidth(
                                                      {
                                                        flexDirection: 'row',
                                                        justifyContent: 'space-between',
                                                        width: 200,
                                                        paddingLeft: -30
                                                      },
                                                      dimensions.width,
                                                    )}
                                                  >
                                                    <Text
                                                      style={StyleSheet.applyWidth(
                                                        StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                                                          fontFamily: 'System',
                                                          fontWeight: '600',
                                                          marginLeft: 5,
                                                          color: '#fff',
                                                        }),
                                                        dimensions.width,
                                                      )}
                                                    >
                                                      {Team1Score()} {"Ovs"}
                                                    </Text>

                                                    <Text
                                                      style={StyleSheet.applyWidth(
                                                        StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                                                          fontFamily: 'System',
                                                          fontWeight: '600',
                                                          marginLeft: 10,
                                                          color: '#fff',
                                                        }),
                                                        dimensions.width,
                                                      )}
                                                    >
                                                      {'RR: '}
                                                      {Team1RR()}
                                                    </Text>
                                                  </View>
                                                </View>
                                              </View>
                                              {YetToBat1()?.length == 0 ? null :
                                                <View
                                                  style={StyleSheet.applyWidth(
                                                    {
                                                      flexDirection: 'row',
                                                      justifyContent: 'space-between',
                                                      marginTop: 3,
                                                      alignSelf: 'baseline'
                                                    },
                                                    dimensions.width,
                                                  )}
                                                >
                                                  <Text
                                                    style={StyleSheet.applyWidth(
                                                      StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                                                        fontFamily: 'System',
                                                        fontWeight: '600',
                                                        color: '#fff',

                                                      }),
                                                      dimensions.width,
                                                    )}
                                                  >
                                                    {getGameStatus() == 'RESULT' ? 'Did not bat:' : 'Yet to bat:'}
                                                  </Text>
                                                  <View
                                                    style={{
                                                      flexDirection: 'row',
                                                      justifyContent: 'space-between',
                                                      marginTop: 3,
                                                      marginLeft: 5,
                                                      width: 300,
                                                      flexWrap: 'wrap'
                                                    }}
                                                  >
                                                    <FlatList
                                                      data={YetToBat1()}
                                                      contentContainerStyle={{ flexDirection: "row", flexWrap: "wrap" }}
                                                      listKey={'o1Om4XPq'}
                                                      renderItem={({ item, index }) => {
                                                        return (
                                                          <Text
                                                            style={StyleSheet.applyWidth(
                                                              StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                                                                fontSize: 11,
                                                                color: '#fff',
                                                              }),
                                                              dimensions.width,
                                                            )}
                                                          >

                                                            {GiveBatsmanDetails(item).name}
                                                            {index == YetToBat1()?.length - 1 ? "" : ", "}
                                                          </Text>
                                                        )
                                                      }}
                                                    >
                                                    </FlatList>
                                                  </View>
                                                </View>
                                              }
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
                                                          color: '#fff',
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
                                                          width: 40,
                                                          color: '#fff',
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
                                                          width: 40,
                                                          color: '#fff',
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
                                                          width: 40,
                                                          color: '#fff',
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
                                                          width: 40,
                                                          color: '#fff',
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
                                                          color: '#fff',
                                                          width: 40,
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
                                                                  color: '#fff',
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
                                                                  width: 40,
                                                                  color: '#fff',
                                                                }),
                                                                dimensions.width,
                                                              )}
                                                            >
                                                              {printWhole(GiveBowlingDetails(flashListData)?.overs)}
                                                            </Text>
                                                            {/* Maiden */}
                                                            <Text
                                                              style={StyleSheet.applyWidth(
                                                                StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                                                                  fontSize: 12,
                                                                  width: 40,
                                                                  color: '#fff',
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
                                                                  width: 40,
                                                                  color: '#fff',
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
                                                                  width: 40,
                                                                  color: '#fff',
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
                                                                  color: '#fff',
                                                                  width: 40,
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
                                            {check2InningsTeamA() == true ? (
                                              <View>
                                                {/* Team_Name */}
                                                <Text
                                                  style={{
                                                    borderBottomColor: 'white',
                                                    borderBottomWidth: 1,
                                                    color: '#fff',
                                                  }}
                                                ></Text>
                                                <Text
                                                  style={StyleSheet.applyWidth(
                                                    StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                                                      fontFamily: 'System',
                                                      fontWeight: '700',
                                                      color: '#fff',
                                                      marginTop: 5,
                                                    }),
                                                    dimensions.width,
                                                  )}
                                                >
                                                  {Team1Name()}{' '}
                                                  {jsonfeed?.data?.format == 'test' ? (
                                                    <Text>(2nd Innings)</Text>
                                                  ) : (
                                                    <Text></Text>
                                                  )}
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
                                                            color: '#fff',
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
                                                            width: 40,
                                                            color: '#fff',
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
                                                            width: 40,
                                                            color: '#fff',
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
                                                            width: 40,
                                                            color: '#fff',
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
                                                            width: 40,
                                                            color: '#fff',
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
                                                            color: '#fff',
                                                            width: 40,
                                                          }),
                                                          dimensions.width,
                                                        )}
                                                      >
                                                        {'SR'}
                                                      </Text>
                                                    </View>
                                                  </View>
                                                  <FlashList
                                                    data={Team1BattingOrder2ndInnings()}
                                                    listKey={'xb06IoKb'}
                                                    keyExtractor={(flashListData) =>
                                                      flashListData?.id ||
                                                      flashListData?.uuid ||
                                                      JSON.stringify(flashListData)
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
                                                                marginBottom: 1
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
                                                                    StyleSheet.compose(
                                                                      GlobalStyles.TextStyles(theme)['Text'],
                                                                      {
                                                                        fontSize: 12,
                                                                        color: '#fff',
                                                                      },
                                                                    ),
                                                                    dimensions.width,
                                                                  )}
                                                                >
                                                                  {GiveBatsmanDetails2ndInnings(flashListData)?.name}
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
                                                                    StyleSheet.compose(
                                                                      GlobalStyles.TextStyles(theme)['Text'],
                                                                      {
                                                                        fontSize: 12,
                                                                        width: 40,
                                                                        color: '#fff',

                                                                      },
                                                                    ),
                                                                    dimensions.width,
                                                                  )}
                                                                >
                                                                  {GiveBatsmanDetails2ndInnings(flashListData)?.runs}
                                                                </Text>
                                                                {/* Balls */}
                                                                <Text
                                                                  style={StyleSheet.applyWidth(
                                                                    StyleSheet.compose(
                                                                      GlobalStyles.TextStyles(theme)['Text'],
                                                                      {
                                                                        fontSize: 12,
                                                                        width: 40,
                                                                        color: '#fff',
                                                                      },
                                                                    ),
                                                                    dimensions.width,
                                                                  )}
                                                                >
                                                                  {GiveBatsmanDetails2ndInnings(flashListData)?.balls}
                                                                </Text>
                                                                {/* Fours */}
                                                                <Text
                                                                  style={StyleSheet.applyWidth(
                                                                    StyleSheet.compose(
                                                                      GlobalStyles.TextStyles(theme)['Text'],
                                                                      {
                                                                        fontSize: 12,
                                                                        width: 40,
                                                                        color: '#fff',
                                                                      },
                                                                    ),
                                                                    dimensions.width,
                                                                  )}
                                                                >
                                                                  {GiveBatsmanDetails2ndInnings(flashListData)?.fours}
                                                                  {'\n'}
                                                                </Text>
                                                                {/* Sixes */}
                                                                <Text
                                                                  style={StyleSheet.applyWidth(
                                                                    StyleSheet.compose(
                                                                      GlobalStyles.TextStyles(theme)['Text'],
                                                                      {
                                                                        fontSize: 12,
                                                                        width: 40,
                                                                        color: '#fff',
                                                                      },
                                                                    ),
                                                                    dimensions.width,
                                                                  )}
                                                                >
                                                                  {GiveBatsmanDetails2ndInnings(flashListData)?.sixes}
                                                                </Text>
                                                                {/* Strike rate */}
                                                                <Text
                                                                  style={StyleSheet.applyWidth(
                                                                    StyleSheet.compose(
                                                                      GlobalStyles.TextStyles(theme)['Text'],
                                                                      {
                                                                        fontSize: 12,
                                                                        opacity: 1,
                                                                        color: '#fff',
                                                                        width: 50,
                                                                      },
                                                                    ),
                                                                    dimensions.width,
                                                                  )}
                                                                >
                                                                  {Convert2Decimal(
                                                                    GiveBatsmanDetails2ndInnings(flashListData)?.sr,
                                                                  )}
                                                                  {'\n'}
                                                                </Text>
                                                              </View>
                                                            </View>
                                                            {/* View 2 */}
                                                            <View
                                                              style={StyleSheet.applyWidth(
                                                                { marginTop: 1 },
                                                                dimensions.width,
                                                              )}
                                                            >
                                                              <Text
                                                                style={StyleSheet.applyWidth(
                                                                  StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                                                                    fontSize: 9,
                                                                    color: '#fff',
                                                                  }),
                                                                  dimensions.width,
                                                                )}
                                                              >
                                                                {' '}
                                                                {showOutNotout2ndInnings(flashListData)}
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
                                                          color: '#fff',
                                                          fontSize: 16
                                                        }),
                                                        dimensions.width,
                                                      )}
                                                    >
                                                      {'Total:\n'}
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
                                                            color: '#fff',
                                                          }),
                                                          dimensions.width,
                                                        )}
                                                      >
                                                        {Team1Score2ndInnings()}
                                                      </Text>

                                                      <Text
                                                        style={StyleSheet.applyWidth(
                                                          StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                                                            fontFamily: 'System',
                                                            fontWeight: '600',
                                                            marginLeft: 10,
                                                            color: '#fff',
                                                          }),
                                                          dimensions.width,
                                                        )}
                                                      >
                                                        {'RR -'}
                                                        {Team1RR2ndInnings()}
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
                                                            color: '#fff',
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
                                                            width: 40,
                                                            color: '#fff',
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
                                                            width: 40,
                                                            color: '#fff',
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
                                                            width: 40,
                                                            color: '#fff',
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
                                                            width: 40,
                                                            color: '#fff',
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
                                                            color: '#fff',
                                                            width: 40,
                                                          }),
                                                          dimensions.width,
                                                        )}
                                                      >
                                                        {'Econ'}
                                                      </Text>
                                                    </View>
                                                  </View>
                                                  <FlashList
                                                    data={Team2BowlingOrder2ndInnings()}
                                                    listKey={'YR7ZDSL2'}
                                                    keyExtractor={(flashListData) =>
                                                      flashListData?.id ||
                                                      flashListData?.uuid ||
                                                      JSON.stringify(flashListData)
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
                                                                    color: '#fff',
                                                                  }),
                                                                  dimensions.width,
                                                                )}
                                                              >
                                                                {GiveBowlingDetails2ndInnings(flashListData)?.name}
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
                                                                    width: 40,
                                                                    color: '#fff',
                                                                  }),
                                                                  dimensions.width,
                                                                )}
                                                              >
                                                                {GiveBowlingDetails2ndInnings(flashListData)?.overs}
                                                              </Text>
                                                              {/* Maiden */}
                                                              <Text
                                                                style={StyleSheet.applyWidth(
                                                                  StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                                                                    fontSize: 12,
                                                                    width: 40,
                                                                    color: '#fff',
                                                                  }),
                                                                  dimensions.width,
                                                                )}
                                                              >
                                                                {GiveBowlingDetails2ndInnings(flashListData)?.maiden}
                                                              </Text>
                                                              {/* Runs */}
                                                              <Text
                                                                style={StyleSheet.applyWidth(
                                                                  StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                                                                    fontSize: 12,
                                                                    width: 40,
                                                                    color: '#fff',
                                                                  }),
                                                                  dimensions.width,
                                                                )}
                                                              >
                                                                {GiveBowlingDetails2ndInnings(flashListData)?.runs}
                                                                {'\n'}
                                                              </Text>
                                                              {/* Wickets */}
                                                              <Text
                                                                style={StyleSheet.applyWidth(
                                                                  StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                                                                    fontSize: 12,
                                                                    width: 40,
                                                                    color: '#fff',
                                                                  }),
                                                                  dimensions.width,
                                                                )}
                                                              >
                                                                {GiveBowlingDetails2ndInnings(flashListData)?.wickets}
                                                              </Text>
                                                              {/* Economy */}
                                                              <Text
                                                                style={StyleSheet.applyWidth(
                                                                  StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                                                                    fontSize: 12,
                                                                    color: '#fff',
                                                                    width: 40,
                                                                  }),
                                                                  dimensions.width,
                                                                )}
                                                              >
                                                                {Convert2Decimal(
                                                                  GiveBowlingDetails2ndInnings(flashListData)?.economy,
                                                                )}
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
                                            ) : (
                                              <Text></Text>
                                            )}
                                          </View>
                                        </ScrollView>
                                      </TabViewItem>
                                    }
                                    {/* Tab Team2 */}
                                    {/* {console.log("Yet to Bat", YetToBat2())} */}
                                    {(YetToBat2()?.length == 11) ? null :
                                      <TabViewItem
                                        style={StyleSheet.applyWidth(
                                          StyleSheet.compose(GlobalStyles.TabViewItemStyles(theme)['Tab View Item']),
                                          dimensions.width,
                                        )}
                                        title={Team2Name()}
                                      >
                                        <ScrollView
                                          bounces={true}
                                          showsHorizontalScrollIndicator={false}
                                          showsVerticalScrollIndicator={false}
                                        >
                                          {/* Individual Team Scores */}
                                          <View style={StyleSheet.applyWidth({ marginTop: 10 }, dimensions.width)}>
                                            {/* Team2 */}
                                            <View>
                                              {/* Team_Name */}
                                              <Text
                                                style={StyleSheet.applyWidth(
                                                  StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                                                    fontFamily: 'System',
                                                    fontWeight: '700',
                                                    color: '#fff',
                                                  }),
                                                  dimensions.width,
                                                )}
                                              >
                                                {Team2Name()}{' '}
                                                {jsonfeed?.data?.format == 'test' ? (
                                                  <Text>(1st Innings)</Text>
                                                ) : (
                                                  <Text></Text>
                                                )}
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
                                                          color: '#fff',
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
                                                          width: 40,
                                                          color: '#fff',
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
                                                          width: 40,
                                                          color: '#fff',
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
                                                          width: 40,
                                                          color: '#fff',
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
                                                          width: 40,
                                                          color: '#fff',
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
                                                          color: '#fff',
                                                          width: 40,
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
                                                              marginBottom: 1
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
                                                                    color: '#fff',
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
                                                                    width: 40,
                                                                    color: '#fff',
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
                                                                    width: 40,
                                                                    color: '#fff',
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
                                                                    width: 40,
                                                                    color: '#fff',
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
                                                                    width: 40,
                                                                    color: '#fff',
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
                                                                    color: '#fff',
                                                                    width: 50,
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
                                                            style={StyleSheet.applyWidth({ marginTop: 1 }, dimensions.width)}
                                                          >
                                                            <Text
                                                              style={StyleSheet.applyWidth(
                                                                StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                                                                  fontSize: 9,
                                                                  color: '#fff',
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
                                                        color: '#fff',
                                                        fontSize: 16
                                                      }),
                                                      dimensions.width,
                                                    )}
                                                  >
                                                    {'Total:\n'}
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
                                                          color: '#fff',
                                                        }),
                                                        dimensions.width,
                                                      )}
                                                    >
                                                      {Team2Score()}{" Ovs"}
                                                    </Text>

                                                    <Text
                                                      style={StyleSheet.applyWidth(
                                                        StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                                                          fontFamily: 'System',
                                                          fontWeight: '600',
                                                          marginLeft: 10,
                                                          color: '#fff',
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
                                              {YetToBat2()?.length == 0 ? null :
                                                <View
                                                  style={StyleSheet.applyWidth(
                                                    {
                                                      flexDirection: 'row',
                                                      justifyContent: 'space-between',
                                                      marginTop: 3,
                                                      alignSelf: 'baseline'
                                                    },
                                                    dimensions.width,
                                                  )}
                                                >
                                                  <Text
                                                    style={StyleSheet.applyWidth(
                                                      StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                                                        fontFamily: 'System',
                                                        fontWeight: '600',
                                                        color: '#fff',

                                                      }),
                                                      dimensions.width,
                                                    )}
                                                  >
                                                    {getGameStatus() == 'RESULT' ? 'Did not bat:' : 'Yet to bat:'}
                                                  </Text>
                                                  <View
                                                    style={{
                                                      flexDirection: 'row',
                                                      justifyContent: 'space-between',
                                                      marginTop: 3,
                                                      marginLeft: 5,
                                                      width: 300,
                                                      flexWrap: 'wrap'
                                                    }}
                                                  >
                                                    <FlatList
                                                      data={YetToBat2()}
                                                      contentContainerStyle={{ flexDirection: "row", flexWrap: "wrap" }}
                                                      listKey={'o1Om4XPq'}
                                                      renderItem={({ item, index }) => {
                                                        return (
                                                          <Text
                                                            style={StyleSheet.applyWidth(
                                                              StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                                                                fontSize: 11,
                                                                color: '#fff',
                                                              }),
                                                              dimensions.width,
                                                            )}
                                                          >

                                                            {GiveBatsmanDetails(item).name}
                                                            {index == YetToBat2()?.length - 1 ? "" : ", "}
                                                          </Text>
                                                        )
                                                      }}
                                                    >
                                                    </FlatList>
                                                  </View>
                                                </View>
                                              }
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
                                                          color: '#fff',
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
                                                          width: 40,
                                                          color: '#fff',
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
                                                          width: 40,
                                                          color: '#fff',
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
                                                          width: 40,
                                                          color: '#fff',
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
                                                          width: 40,
                                                          color: '#fff',
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
                                                          color: '#fff',
                                                          width: 40,
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
                                                                  color: '#fff',
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
                                                                  width: 40,
                                                                  color: '#fff',
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
                                                                  width: 40,
                                                                  color: '#fff',
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
                                                                  width: 40,
                                                                  color: '#fff',
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
                                                                  width: 40,
                                                                  color: '#fff',
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
                                                                  color: '#fff',
                                                                  width: 40,
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
                                            {check2InningsTeamB() == true ? (
                                              <View>
                                                {/* Team_Name */}
                                                <Text
                                                  style={{
                                                    borderBottomColor: 'white',
                                                    borderBottomWidth: 1,
                                                  }}
                                                ></Text>
                                                <Text
                                                  style={StyleSheet.applyWidth(
                                                    StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                                                      fontFamily: 'System',
                                                      fontWeight: '700',
                                                      color: '#fff',
                                                    }),
                                                    dimensions.width,
                                                  )}
                                                >
                                                  {Team2Name()}{' '}
                                                  {jsonfeed?.data?.format == 'test' ? (
                                                    <Text>(2nd Innings)</Text>
                                                  ) : (
                                                    <Text></Text>
                                                  )}
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
                                                            color: '#fff',
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
                                                            width: 40,
                                                            color: '#fff',
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
                                                            width: 40,
                                                            color: '#fff',
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
                                                            width: 40,
                                                            color: '#fff',
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
                                                            width: 40,
                                                            color: '#fff',
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
                                                            color: '#fff',
                                                            width: 40,
                                                          }),
                                                          dimensions.width,
                                                        )}
                                                      >
                                                        {'SR'}
                                                      </Text>
                                                    </View>
                                                  </View>
                                                  <FlashList
                                                    data={team2BattingOrder2ndInnings()}
                                                    listKey={'0OabhL3m'}
                                                    keyExtractor={(flashListData) =>
                                                      flashListData?.id ||
                                                      flashListData?.uuid ||
                                                      JSON.stringify(flashListData)
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
                                                                marginBottom: 1
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
                                                                    StyleSheet.compose(
                                                                      GlobalStyles.TextStyles(theme)['Text'],
                                                                      {
                                                                        fontSize: 12,
                                                                        color: '#fff',
                                                                      },
                                                                    ),
                                                                    dimensions.width,
                                                                  )}
                                                                >
                                                                  {GiveBatsmanDetails2ndInnings(flashListData)?.name}
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
                                                                    StyleSheet.compose(
                                                                      GlobalStyles.TextStyles(theme)['Text'],
                                                                      {
                                                                        fontSize: 12,
                                                                        width: 40,
                                                                        color: '#fff',
                                                                      },
                                                                    ),
                                                                    dimensions.width,
                                                                  )}
                                                                >
                                                                  {GiveBatsmanDetails2ndInnings(flashListData)?.runs}
                                                                </Text>
                                                                {/* Balls */}
                                                                <Text
                                                                  style={StyleSheet.applyWidth(
                                                                    StyleSheet.compose(
                                                                      GlobalStyles.TextStyles(theme)['Text'],
                                                                      {
                                                                        fontSize: 12,
                                                                        width: 40,
                                                                        color: '#fff',
                                                                      },
                                                                    ),
                                                                    dimensions.width,
                                                                  )}
                                                                >
                                                                  {GiveBatsmanDetails2ndInnings(flashListData)?.balls}
                                                                </Text>
                                                                {/* Fours */}
                                                                <Text
                                                                  style={StyleSheet.applyWidth(
                                                                    StyleSheet.compose(
                                                                      GlobalStyles.TextStyles(theme)['Text'],
                                                                      {
                                                                        fontSize: 12,
                                                                        width: 40,
                                                                        color: '#fff',
                                                                      },
                                                                    ),
                                                                    dimensions.width,
                                                                  )}
                                                                >
                                                                  {GiveBatsmanDetails2ndInnings(flashListData)?.fours}
                                                                  {'\n'}
                                                                </Text>
                                                                {/* Sixes */}
                                                                <Text
                                                                  style={StyleSheet.applyWidth(
                                                                    StyleSheet.compose(
                                                                      GlobalStyles.TextStyles(theme)['Text'],
                                                                      {
                                                                        fontSize: 12,
                                                                        width: 40,
                                                                        color: '#fff',
                                                                      },
                                                                    ),
                                                                    dimensions.width,
                                                                  )}
                                                                >
                                                                  {GiveBatsmanDetails2ndInnings(flashListData)?.sixes}
                                                                </Text>
                                                                {/* Strike rate */}
                                                                <Text
                                                                  style={StyleSheet.applyWidth(
                                                                    StyleSheet.compose(
                                                                      GlobalStyles.TextStyles(theme)['Text'],
                                                                      {
                                                                        fontSize: 12,
                                                                        color: '#fff',
                                                                        width: 50,
                                                                      },
                                                                    ),
                                                                    dimensions.width,
                                                                  )}
                                                                >
                                                                  {Convert2Decimal(
                                                                    GiveBatsmanDetails2ndInnings(flashListData)?.sr,
                                                                  )}
                                                                  {'\n'}
                                                                </Text>
                                                              </View>
                                                            </View>
                                                            {/* View 2 */}
                                                            <View
                                                              style={StyleSheet.applyWidth(
                                                                { marginTop: 1 },
                                                                dimensions.width,
                                                              )}
                                                            >
                                                              <Text
                                                                style={StyleSheet.applyWidth(
                                                                  StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                                                                    fontSize: 9,
                                                                    color: '#fff',
                                                                  }),
                                                                  dimensions.width,
                                                                )}
                                                              >
                                                                {showOutNotout2ndInnings(flashListData)}
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
                                                          color: '#fff',
                                                          fontSize: 16
                                                        }),
                                                        dimensions.width,
                                                      )}
                                                    >
                                                      {'Total:\n'}
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
                                                            color: '#fff',
                                                          }),
                                                          dimensions.width,
                                                        )}
                                                      >
                                                        {Team2Score2ndInnings()}
                                                      </Text>

                                                      <Text
                                                        style={StyleSheet.applyWidth(
                                                          StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                                                            fontFamily: 'System',
                                                            fontWeight: '600',
                                                            marginLeft: 10,
                                                            color: '#fff',
                                                          }),
                                                          dimensions.width,
                                                        )}
                                                      >
                                                        {'RR - '}
                                                        {Team2RR2ndInnings()}{' '}
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
                                                            color: '#fff',
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
                                                            width: 40,
                                                            color: '#fff',
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
                                                            width: 40,
                                                            color: '#fff',
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
                                                            width: 40,
                                                            color: '#fff',
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
                                                            width: 40,
                                                            color: '#fff',
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
                                                            color: '#fff',
                                                            width: 40,
                                                          }),
                                                          dimensions.width,
                                                        )}
                                                      >
                                                        {'Econ'}
                                                      </Text>
                                                    </View>
                                                  </View>
                                                  <FlashList
                                                    data={Team1BowlingOrder2ndInnings()}
                                                    listKey={'CIgn0RwB'}
                                                    keyExtractor={(flashListData) =>
                                                      flashListData?.id ||
                                                      flashListData?.uuid ||
                                                      JSON.stringify(flashListData)
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
                                                                    color: '#fff',
                                                                  }),
                                                                  dimensions.width,
                                                                )}
                                                              >
                                                                {GiveBowlingDetails2ndInnings(flashListData)?.name}
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
                                                                    width: 40,
                                                                    color: '#fff',
                                                                  }),
                                                                  dimensions.width,
                                                                )}
                                                              >
                                                                {GiveBowlingDetails2ndInnings(flashListData)?.overs}
                                                              </Text>
                                                              {/* Maiden */}
                                                              <Text
                                                                style={StyleSheet.applyWidth(
                                                                  StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                                                                    fontSize: 12,
                                                                    width: 40,
                                                                    color: '#fff',
                                                                  }),
                                                                  dimensions.width,
                                                                )}
                                                              >
                                                                {GiveBowlingDetails2ndInnings(flashListData)?.maiden}
                                                              </Text>
                                                              {/* Runs */}
                                                              <Text
                                                                style={StyleSheet.applyWidth(
                                                                  StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                                                                    fontSize: 12,
                                                                    width: 40,
                                                                    color: '#fff',
                                                                  }),
                                                                  dimensions.width,
                                                                )}
                                                              >
                                                                {GiveBowlingDetails2ndInnings(flashListData)?.runs}
                                                                {'\n'}
                                                              </Text>
                                                              {/* Wickets */}
                                                              <Text
                                                                style={StyleSheet.applyWidth(
                                                                  StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                                                                    fontSize: 12,
                                                                    width: 40,
                                                                    color: '#fff',
                                                                  }),
                                                                  dimensions.width,
                                                                )}
                                                              >
                                                                {GiveBowlingDetails2ndInnings(flashListData)?.wickets}
                                                              </Text>
                                                              {/* Economy */}
                                                              <Text
                                                                style={StyleSheet.applyWidth(
                                                                  StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                                                                    fontSize: 12,
                                                                    color: '#fff',
                                                                    width: 40,
                                                                  }),
                                                                  dimensions.width,
                                                                )}
                                                              >
                                                                {Convert2Decimal(
                                                                  GiveBowlingDetails2ndInnings(flashListData)?.economy,
                                                                )}
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
                                            ) : (
                                              <Text></Text>
                                            )}
                                          </View>
                                        </ScrollView>
                                      </TabViewItem>
                                    }
                                  </TabView>
                                  {/* Layer-4 */}
                                  {/* style={StyleSheet.applyWidth(
                                                        {
                                                          flexDirection: 'row',
                                                          justifyContent: 'space-around',
                                                          width: 200,
                                                        },
                                                        dimensions.width,
                                                      )} */}
                                  <View
                                    style={
                                      StyleSheet.applyWidth(
                                        StyleSheet.compose(GlobalStyles.ViewStyles(theme)['Layer-4'], { marginTop: 10 }),
                                        {
                                          height: 500
                                        },
                                        dimensions.width,
                                      )
                                    }
                                  >
                                    {/* Header */}
                                    <Text
                                      style={StyleSheet.applyWidth(
                                        StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                                          fontFamily: 'System',
                                          fontWeight: '700',
                                          textAlign: 'center',
                                          color: '#fff',
                                          fontSize: 14,
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
                                          color: '#fff',
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
                                            color: '#fff',
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
                                            fontSize: 12,
                                            fontWeight: '400',
                                            color: '#fff',
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
                                          marginBottom: 1
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
                                            color: '#fff',
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
                                            fontSize: 12,
                                            fontWeight: '400',
                                            color: '#fff',
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
                                          marginBottom: 1
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
                                            color: '#fff',
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
                                            fontSize: 12,
                                            fontWeight: '400',
                                            color: '#fff',
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
                                          marginBottom: 4
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
                                            color: '#fff',
                                          }),
                                          dimensions.width,
                                        )}
                                      >
                                        {'Match Title : '}
                                      </Text>
                                      {/* Dynamic  */}
                                      <Text
                                        style={StyleSheet.applyWidth(
                                          StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                                            alignSelf: 'center',
                                            fontFamily: 'System',
                                            fontSize: 11,
                                            fontWeight: '400',
                                            color: '#fff',
                                            width: 200,
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
                      </>
                    )
                  }}
                </PagalFanBEApi.FetchFetchFeedForSingleMatchGET>
                :

                <View style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                  {/* API call to get match dommentary for this match id , if match commentary is present show that else show Match Commentary not availabe */}
                  <PagalFanBEApi.FetchFetchCommentrayForSingleMatchGET
                    refetchInterval={30000}
                    matchid={props.route?.params?.match_id ?? 77}
                    onData={(fetchData) => {
                      try {
                        console.log(fetchData[0]?.match_update);
                        console.log(props.route?.params?.match_id);
                        setMatchCommentary(fetchData[0]?.match_update);
                      } catch (err) {
                        console.error(err)
                      }
                    }}
                  >
                    {({ loading, error, data, refetchFetchFeedForSingleMatch }) => {
                      console.log(matchCommentary);
                      return (
                        <>
                          {!matchCommentary ?
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
                                    color: '#fff',
                                  }),
                                  dimensions.width,
                                )}
                              >
                                {MatchText()}
                                {'\n'}
                              </Text>
                            </View>
                            :
                            <FlatList
                              inverted={true}
                              data={matchCommentary}
                              listKey={'o1Om4XPf'}
                              renderItem={({ item }) => {
                                return (
                                  <View
                                    style={{
                                      maxWidth: 800,
                                      marginHorizontal: 'auto',
                                      padding: 10,
                                      shadowColor: '#000',
                                      shadowOffset: {
                                        width: 0,
                                        height: 2,
                                      },
                                      shadowOpacity: 0.1,
                                      shadowRadius: 4,
                                      elevation: 5,
                                    }}
                                  >
                                    <Text
                                      style={{
                                        fontSize: 16,
                                        fontWeight: 'bold',
                                        color: '#FFFFFF',
                                        marginBottom: 10,
                                      }}
                                    >
                                      {item.title}
                                    </Text>
                                    <Text
                                      style={{
                                        fontSize: 12,
                                        color: '#F5FFFA',
                                      }}
                                    >
                                      {/* Place your commentary content here */}
                                      {item.desc}
                                    </Text>
                                  </View>
                                )
                              }}
                            ></FlatList>
                          }
                        </>
                      )

                    }}
                  </PagalFanBEApi.FetchFetchCommentrayForSingleMatchGET>
                </View>
              }
            </TabViewItem>
             }

            {/* Moments */}
            <TabViewItem
              style={StyleSheet.applyWidth(GlobalStyles.TabViewItemStyles(theme)['Tab View Item'], dimensions.width)}
              title={translate('MatchDaySingleScreen.Text.Moments')}
            >
              <PagalFanBEApi.FetchFetchMatchMomentsGET matchId={props.route?.params?.match_id ?? 77}>
                {({ loading, error, data, refetchFetchMatchMoments }) => {
                  const fetchData = data
                  if (!fetchData || loading) {
                    return <ActivityIndicator />
                  }

                  if (error) {
                    return <Text style={{ textAlign: 'center' }}>{translate('MatchDaySingleScreen.Text.ProblemFetchData')}</Text>
                  }
                  return (
                    <FlatList
                      data={fetchData}
                      listKey={'o1Om4XPv'}
                      style={{ marginTop : 5 }}
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
                                  minHeight : 80,
                                  marginHorizontal: 2,
                                  marginBottom: 4,
                                  marginTop: 4,
                                },
                                dimensions.width,
                              )}
                            >
                              {/* Image */}
                              <View style={StyleSheet.applyWidth({ marginLeft: 5, marginRight: 4 }, dimensions.width)}>
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
                              <View style={StyleSheet.applyWidth({ flexWrap:"wrap",marginLeft:7 ,display:"flex", flexDirection:"column", marginVertical:4 }, dimensions.width)}>
                                {/* Time */}
                                <Text
                                  style={StyleSheet.applyWidth(
                                    StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                                      color: theme.colors['PF-Grey'],
                                      fontFamily: 'Rubik_400Regular',
                                      fontSize: 12,
                                      paddingBottom:3,
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
                                      width: dimensions.width * 0.7
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
                      nestedScrollEnabled
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
                    color: theme.colors['PF-Primary'],
                    fontFamily: 'Rubik_600SemiBold',
                    fontSize: 18,
                    marginBottom: 10,
                    marginTop: 10,
                  }),
                  dimensions.width,
                )}
              >
                {"Entering PagalFan's BAKARR room!"}
              </Text>
              <Divider
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(GlobalStyles.DividerStyles(theme)['Divider'], { marginBottom: 10 }),
                  dimensions.width,
                )}
                color={theme.colors.divider}
              />
              <Button
                onPress={handleStartBakerRoomPress}
                style={StyleSheet.applyWidth(GlobalStyles.ButtonStyles(theme)['Button'], dimensions.width)}
                title={'PROCEED 🎙'}
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

const styles = RNStyleSheet.create({
  emoticonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    height: 50,
    marginTop: 20,
  },
  emoticon: {
    fontSize: 25,
  },
})


export default withTheme(MatchDaySingleScreen)
