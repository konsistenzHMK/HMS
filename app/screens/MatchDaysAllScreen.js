/* eslint-disable quotes */

import React from 'react'
import * as GlobalStyles from '../GlobalStyles.js'
import * as PagalFanBEApi from '../apis/PagalFanBEApi.js'
import * as GlobalVariables from '../config/GlobalVariableContext'
import convertNullToTBD from '../global-functions/convertNullToTBD'
import getCorrectDateFormat from '../global-functions/getCorrectDateFormat'
import Breakpoints from '../utils/Breakpoints'
import * as StyleSheet from '../utils/StyleSheet'
import { Circle, CircleImage, Icon, ScreenContainer, TabView, TabViewItem, Touchable, withTheme } from '@draftbit/ui'
import { useIsFocused } from '@react-navigation/native'
import { ActivityIndicator, FlatList, ScrollView, Text, TextInput, View, useWindowDimensions } from 'react-native'

const MatchDaysAllScreen = (props) => {
  const dimensions = useWindowDimensions()
  const Constants = GlobalVariables.useValues()
  const Variables = Constants

  const FilterList = (list) => {
    //if (item.team_1?.team_name.length == 0) item.team_1.team_name = TBD
    //if (item.team_2?.team_name.length == 0) item.team_2.team_name = TBD

    if (list.length) {
      return list.filter(
        (item) =>
          (item.team_1?.team_name || 'TBD').toLowerCase().includes(textInputValue.toLowerCase()) ||
          (item.team_2?.team_name || 'TBD').toLowerCase().includes(textInputValue.toLowerCase()),
      )
    }
    return list
  }

  const { theme } = props
  const { navigation } = props

  const [textInputValue, setTextInputValue] = React.useState('')

  return (
    <ScreenContainer
      style={StyleSheet.applyWidth({ marginLeft: 10, marginRight: 10, marginTop: 10 }, dimensions.width)}
      scrollable={false}
      hasSafeArea={true}
    >
      {/* Back Frame */}
      <View style={StyleSheet.applyWidth({ paddingBottom: 7, paddingTop: 7 }, dimensions.width)}>
        {/* Flex Frame for Touchable */}
        <View style={StyleSheet.applyWidth({ flexGrow: 1, flexShrink: 0, justifyContent: 'center' }, dimensions.width)}>
          <Touchable
            onPress={() => {
              try {
                navigation.navigate('HomeScreen')
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
      {/* Title Frame */}
      <View style={StyleSheet.applyWidth(GlobalStyles.ViewStyles(theme)['PF-HeaderFrame'], dimensions.width)}>
        {/* Middle Frame */}
        <View
          style={StyleSheet.applyWidth(
            {
              alignItems: 'center',
              flexDirection: 'row',
              flexGrow: 1,
              flexShrink: 0,
              marginLeft: 20,
            },
            dimensions.width,
          )}
        >
          {/* Left Side */}
          <View style={StyleSheet.applyWidth({ justifyContent: 'center' }, dimensions.width)} />
          {/* Right Side */}
          <View style={StyleSheet.applyWidth({ justifyContent: 'center', paddingLeft: 12 }, dimensions.width)}>
            {/* Title */}
            <Text
              style={StyleSheet.applyWidth(
                {
                  color: theme.colors.communityTrueOption,
                  fontFamily: 'Rubik_700Bold',
                  fontSize: 20,
                  lineHeight: 19,
                },
                dimensions.width,
              )}
              numberOfLines={2}
            >
              {`Matches ... all of 'em`}
            </Text>
          </View>
        </View>
        {/* Right Frame */}
        <View
          style={StyleSheet.applyWidth(
            { justifyContent: 'flex-start', paddingBottom: 7, paddingTop: 7 },
            dimensions.width,
          )}
        >
          {/* Flex Frame for Touchable */}
          <View
            style={StyleSheet.applyWidth({ flexGrow: 1, flexShrink: 0, justifyContent: 'center' }, dimensions.width)}
          >
            <Touchable>
              <Circle size={31} bgColor={theme.colors.communityIconBGColor}>
                <Icon size={18} color={theme.colors.communityIconFill} name={'Ionicons/filter'} />
              </Circle>
            </Touchable>
          </View>
        </View>
      </View>

      <TabView
        tabBarPosition={'top'}
        keyboardDismissMode={'auto'}
        swipeEnabled={true}
        pressColor={theme.colors.primary}
        tabsBackgroundColor={theme.colors.background}
        activeColor={theme.colors['Secondary']}
        indicatorColor={theme.colors['Secondary']}
      >
        {/* Upcoming */}
        <TabViewItem
          style={StyleSheet.applyWidth(GlobalStyles.TabViewItemStyles(theme)['Tab View Item'], dimensions.width)}
          title={'LIVE / UPCOMING'}
        >
          {/* Search Filter */}
          <View>
            <TextInput
              onChangeText={(newTextInputValue) => {
                const textInputValue = newTextInputValue
                try {
                  setTextInputValue(newTextInputValue)
                } catch (err) {
                  console.error(err)
                }
              }}
              style={StyleSheet.applyWidth(
                StyleSheet.compose(GlobalStyles.TextInputStyles(theme)['Text Input'], {
                  color: theme.colors['PF-Grey'],
                  fontSize: 12,
                }),
                dimensions.width,
              )}
              placeholder={'Search by team...'}
              value={textInputValue}
              autoCapitalize={'none'}
              placeholderTextColor={theme.colors['PF-Grey']}
            />
          </View>
          {/* MatchesView */}
          <ScrollView bounces={true} showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
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
                  <FlatList
                    data={FilterList(fetchData)}
                    listKey={'JTxLFwUQ'}
                    keyExtractor={(listData) => listData?.id || listData?.uuid || JSON.stringify(listData)}
                    renderItem={({ item }) => {
                      const listData = item
                      return (
                        <>
                          {/* Single Match Frame */}
                          <View
                            style={StyleSheet.applyWidth(
                              StyleSheet.compose(GlobalStyles.ViewStyles(theme)['PF-HeaderFrame'], {
                                marginBottom: 10,
                                marginTop: 10,
                              }),
                              dimensions.width,
                            )}
                          >
                            {/* Left Frame */}
                            <View>
                              {/* Flex Frame for Touchable */}
                              <View
                                style={StyleSheet.applyWidth(
                                  {
                                    flexGrow: 1,
                                    flexShrink: 0,
                                    justifyContent: 'center',
                                  },
                                  dimensions.width,
                                )}
                              >
                                <Touchable
                                  onPress={() => {
                                    try {
                                      navigation.navigate('RootNavigator')
                                    } catch (err) {
                                      console.error(err)
                                    }
                                  }}
                                >
                                  <Circle bgColor={theme.colors.communityIconBGColor} size={24}>
                                    <Icon name={'Entypo/dot-single'} color={theme.colors['App Green']} size={24} />
                                  </Circle>
                                </Touchable>
                              </View>
                            </View>
                            {/* Middle Frame */}
                            <View
                              style={StyleSheet.applyWidth(
                                {
                                  flexDirection: 'row',
                                  flexGrow: 1,
                                  flexShrink: 0,
                                  paddingLeft: 4,
                                  paddingRight: 4,
                                },
                                dimensions.width,
                              )}
                            >
                              {/* Left Side */}
                              <View style={StyleSheet.applyWidth({ justifyContent: 'center' }, dimensions.width)}>
                                {/* Circle Image Frame */}
                                <View>
                                  {listData?.thumbnail_path && (
                                    <CircleImage
                                      size={30}
                                      source={{
                                        uri: `${listData?.thumbnail_path}`,
                                      }}
                                    />
                                  )}
                                </View>
                              </View>
                              {/* Right Side */}
                              <View
                                style={StyleSheet.applyWidth(
                                  {
                                    justifyContent: 'center',
                                    paddingLeft: 12,
                                    width: 240,
                                  },
                                  dimensions.width,
                                )}
                              >
                                {/* Match Title */}
                                <Text
                                  style={StyleSheet.applyWidth(
                                    {
                                      color: theme.colors['Community_Medium_Black'],
                                      fontFamily: 'Rubik_600SemiBold',
                                      fontSize: 12,
                                      lineHeight: 19,
                                    },
                                    dimensions.width,
                                  )}
                                  numberOfLines={2}
                                >
                                  {'['}
                                  {listData?.title}
                                  {']: '}
                                  {convertNullToTBD(listData?.team_1?.team_name)}
                                  {' vs '}
                                  {convertNullToTBD(listData?.team_2?.team_name)}
                                </Text>
                                {/* Match City and Date */}
                                <Text
                                  style={StyleSheet.applyWidth(
                                    {
                                      color: theme.colors.communityLightBlack,
                                      fontFamily: 'Rubik_400Regular',
                                      fontSize: 10,
                                      lineHeight: 18,
                                    },
                                    dimensions.width,
                                  )}
                                >
                                  {listData?.venue_city}
                                  {', '}
                                  {getCorrectDateFormat(listData?.match_date)}
                                </Text>
                              </View>
                            </View>
                            {/* Right Frame */}
                            <View style={StyleSheet.applyWidth({ paddingBottom: 7, paddingTop: 7 }, dimensions.width)}>
                              {/* Flex Frame for Touchable */}
                              <View
                                style={StyleSheet.applyWidth(
                                  {
                                    flexGrow: 1,
                                    flexShrink: 0,
                                    justifyContent: 'center',
                                  },
                                  dimensions.width,
                                )}
                              >
                                <Touchable
                                  onPress={() => {
                                    try {
                                      navigation.navigate('MatchDaySingleScreen', { match_id: listData?.id })
                                    } catch (err) {
                                      console.error(err)
                                    }
                                  }}
                                >
                                  <Circle size={31} bgColor={theme.colors.communityIconBGColor}>
                                    <Icon
                                      name={'Ionicons/caret-forward'}
                                      size={18}
                                      color={theme.colors.communityIconFill}
                                    />
                                  </Circle>
                                </Touchable>
                              </View>
                            </View>
                          </View>
                        </>
                      )
                    }}
                    style={StyleSheet.applyWidth(GlobalStyles.FlatListStyles(theme)['List'], dimensions.width)}
                    contentContainerStyle={StyleSheet.applyWidth(
                      StyleSheet.compose(GlobalStyles.FlatListStyles(theme)['List'], { marginTop: 4 }),
                      dimensions.width,
                    )}
                    numColumns={1}
                    onEndReachedThreshold={0.5}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                  />
                )
              }}
            </PagalFanBEApi.FetchFetchAllUpcomingMatchesGET>
          </ScrollView>
        </TabViewItem>
        {/* Past */}
        <TabViewItem
          style={StyleSheet.applyWidth(GlobalStyles.TabViewItemStyles(theme)['Tab View Item'], dimensions.width)}
          title={'PAST'}
        >
          {/* Search Filter */}
          <View>
            <TextInput
              onChangeText={(newTextInputValue) => {
                const textInputValue = newTextInputValue
                try {
                  setTextInputValue(newTextInputValue)
                } catch (err) {
                  console.error(err)
                }
              }}
              style={StyleSheet.applyWidth(
                StyleSheet.compose(GlobalStyles.TextInputStyles(theme)['Text Input'], {
                  color: theme.colors['PF-Grey'],
                  fontSize: 12,
                }),
                dimensions.width,
              )}
              placeholder={'Search by team...'}
              autoCapitalize={'none'}
              value={textInputValue}
              placeholderTextColor={theme.colors['PF-Grey']}
            />
          </View>
          {/* MatchesViewPast */}
          <ScrollView bounces={true} showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
            <PagalFanBEApi.FetchFetchAllPastMatchesGET>
              {({ loading, error, data, refetchFetchAllPastMatches }) => {
                const fetchData = data
                if (!fetchData || loading) {
                  return <ActivityIndicator />
                }

                if (error) {
                  return <Text style={{ textAlign: 'center' }}>There was a problem fetching this data</Text>
                }

                return (
                  <FlatList
                    data={FilterList(fetchData)}
                    listKey={'qH2rZQRo'}
                    keyExtractor={(listData) => listData?.id || listData?.uuid || JSON.stringify(listData)}
                    renderItem={({ item }) => {
                      const listData = item
                      return (
                        <>
                          {/* Single Match Frame */}
                          <View
                            style={StyleSheet.applyWidth(
                              StyleSheet.compose(GlobalStyles.ViewStyles(theme)['PF-HeaderFrame'], {
                                marginBottom: 10,
                                marginTop: 10,
                              }),
                              dimensions.width,
                            )}
                          >
                            {/* Left Frame */}
                            <View>
                              {/* Flex Frame for Touchable */}
                              <View
                                style={StyleSheet.applyWidth(
                                  {
                                    flexGrow: 1,
                                    flexShrink: 0,
                                    justifyContent: 'center',
                                  },
                                  dimensions.width,
                                )}
                              >
                                <Touchable
                                  onPress={() => {
                                    try {
                                      navigation.navigate('RootNavigator')
                                    } catch (err) {
                                      console.error(err)
                                    }
                                  }}
                                >
                                  <Circle bgColor={theme.colors.communityIconBGColor} size={24}>
                                    <Icon name={'Entypo/dot-single'} size={24} color={theme.colors['Primary']} />
                                  </Circle>
                                </Touchable>
                              </View>
                            </View>
                            {/* Middle Frame */}
                            <View
                              style={StyleSheet.applyWidth(
                                {
                                  flexDirection: 'row',
                                  flexGrow: 1,
                                  flexShrink: 0,
                                  paddingLeft: 4,
                                  paddingRight: 4,
                                },
                                dimensions.width,
                              )}
                            >
                              {/* Left Side */}
                              <View style={StyleSheet.applyWidth({ justifyContent: 'center' }, dimensions.width)}>
                                {/* Circle Image Frame */}
                                <View>
                                  {listData?.thumbnail_path && (
                                    <CircleImage
                                      size={30}
                                      source={{
                                        uri: `${listData?.thumbnail_path}`,
                                      }}
                                    />
                                  )}
                                </View>
                              </View>
                              {/* Right Side */}
                              <View
                                style={StyleSheet.applyWidth(
                                  {
                                    justifyContent: 'center',
                                    paddingLeft: 12,
                                    width: 240,
                                  },
                                  dimensions.width,
                                )}
                              >
                                {/* Match Title */}
                                <Text
                                  style={StyleSheet.applyWidth(
                                    {
                                      color: theme.colors['Community_Medium_Black'],
                                      fontFamily: 'Rubik_600SemiBold',
                                      fontSize: 12,
                                      lineHeight: 19,
                                    },
                                    dimensions.width,
                                  )}
                                  numberOfLines={2}
                                >
                                  {'['}
                                  {listData?.title}
                                  {']: '}
                                  {convertNullToTBD(listData?.team_1?.team_name)}
                                  {' vs '}
                                  {convertNullToTBD(listData?.team_2?.team_name)}
                                </Text>
                                {/* Match City and Date */}
                                <Text
                                  style={StyleSheet.applyWidth(
                                    {
                                      color: theme.colors.communityLightBlack,
                                      fontFamily: 'Rubik_400Regular',
                                      fontSize: 10,
                                      lineHeight: 18,
                                    },
                                    dimensions.width,
                                  )}
                                >
                                  {listData?.venue_city}
                                  {', '}
                                  {listData?.match_date}
                                </Text>
                              </View>
                            </View>
                            {/* Right Frame */}
                            <View style={StyleSheet.applyWidth({ paddingBottom: 7, paddingTop: 7 }, dimensions.width)}>
                              {/* Flex Frame for Touchable */}
                              <View
                                style={StyleSheet.applyWidth(
                                  {
                                    flexGrow: 1,
                                    flexShrink: 0,
                                    justifyContent: 'center',
                                  },
                                  dimensions.width,
                                )}
                              >
                                <Touchable
                                  onPress={() => {
                                    try {
                                      navigation.navigate('MatchDaySingleScreen', { match_id: listData?.id })
                                    } catch (err) {
                                      console.error(err)
                                    }
                                  }}
                                >
                                  <Circle size={31} bgColor={theme.colors.communityIconBGColor}>
                                    <Icon
                                      name={'Ionicons/caret-forward'}
                                      size={18}
                                      color={theme.colors.communityIconFill}
                                    />
                                  </Circle>
                                </Touchable>
                              </View>
                            </View>
                          </View>
                        </>
                      )
                    }}
                    style={StyleSheet.applyWidth(GlobalStyles.FlatListStyles(theme)['List'], dimensions.width)}
                    contentContainerStyle={StyleSheet.applyWidth(
                      StyleSheet.compose(GlobalStyles.FlatListStyles(theme)['List'], { marginTop: 4 }),
                      dimensions.width,
                    )}
                    numColumns={1}
                    onEndReachedThreshold={0.5}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                  />
                )
              }}
            </PagalFanBEApi.FetchFetchAllPastMatchesGET>
          </ScrollView>
        </TabViewItem>
      </TabView>
    </ScreenContainer>
  )
}

export default withTheme(MatchDaysAllScreen)
