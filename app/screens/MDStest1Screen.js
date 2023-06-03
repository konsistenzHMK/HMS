import React from 'react'
import * as GlobalStyles from '../GlobalStyles.js'
import Images from '../config/Images'
import Breakpoints from '../utils/Breakpoints'
import * as StyleSheet from '../utils/StyleSheet'
import {
  Circle,
  CircleImage,
  Divider,
  Icon,
  ScreenContainer,
  TabView,
  TabViewItem,
  Touchable,
  withTheme,
} from '@draftbit/ui'
import { FlatList, ScrollView, Text, TextInput, View, useWindowDimensions } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

const MDStest1Screen = (props) => {
  const dimensions = useWindowDimensions()

  const { theme } = props
  const { navigation } = props

  return (
    <ScreenContainer
      style={StyleSheet.applyWidth({ marginLeft: 10, marginRight: 10, marginTop: 10 }, dimensions.width)}
      scrollable={false}
      hasSafeArea={true}
    >
      {/* Navigation Frame */}
      <View style={StyleSheet.applyWidth(GlobalStyles.ViewStyles(theme)['PF-HeaderFrame'], dimensions.width)}>
        {/* Left Frame */}
        <View style={StyleSheet.applyWidth({ paddingBottom: 7, paddingTop: 7 }, dimensions.width)}>
          {/* Flex Frame for Touchable */}
          <View
            style={StyleSheet.applyWidth({ flexGrow: 1, flexShrink: 0, justifyContent: 'center' }, dimensions.width)}
          >
            <Touchable
              onPress={() => {
                try {
                  navigation.navigate('Tabs', { screen: 'HomeScreen' })
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
        {/* Middle Frame */}
        <View
          style={StyleSheet.applyWidth(
            {
              flexDirection: 'row',
              flexGrow: 1,
              flexShrink: 0,
              paddingLeft: 12,
              paddingRight: 12,
            },
            dimensions.width,
          )}
        >
          {/* Left Side */}
          <View style={StyleSheet.applyWidth({ justifyContent: 'center' }, dimensions.width)}>
            {/* Circle Image Frame */}
            <View>
              <CircleImage size={30} source={Images.IndAusDay1} />
            </View>
          </View>
          {/* Right Side */}
          <View style={StyleSheet.applyWidth({ justifyContent: 'center', paddingLeft: 12 }, dimensions.width)}>
            {/* Rubik Headline Style 18/24 Bold */}
            <Text
              style={StyleSheet.applyWidth(
                {
                  color: theme.colors.communityTrueOption,
                  fontFamily: 'Rubik_700Bold',
                  fontSize: 13,
                  lineHeight: 19,
                },
                dimensions.width,
              )}
              numberOfLines={2}
            >
              {'IND-AUS 4th Test'}
            </Text>
            {/* Rubik Text Style 12/18 Regular */}
            <Text
              style={StyleSheet.applyWidth(
                {
                  color: theme.colors.communityLightBlack,
                  fontFamily: 'Rubik_400Regular',
                  fontSize: 12,
                  lineHeight: 18,
                },
                dimensions.width,
              )}
            >
              {'Ahmedabad 9-13 Mar'}
            </Text>
          </View>
        </View>
      </View>
      {/* TabFrame */}
      <TabView
        tabBarPosition={'top'}
        keyboardDismissMode={'auto'}
        swipeEnabled={true}
        pressColor={theme.colors.primary}
        tabsBackgroundColor={theme.colors.background}
        indicatorColor={theme.colors['Secondary']}
        scrollEnabled={false}
        activeColor={theme.colors['Secondary']}
      >
        {/* Bakarr */}
        <TabViewItem
          style={StyleSheet.applyWidth(GlobalStyles.TabViewItemStyles(theme)['Tab View Item'], dimensions.width)}
          title={'BAKARR'}
        >
          {/* Upcoming */}
          <View
            style={StyleSheet.applyWidth(
              StyleSheet.compose(GlobalStyles.ViewStyles(theme)['LiveAdda'], {
                marginBottom: 10,
                marginTop: 10,
                paddingRight: 2,
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
              {/* NonLiveBadgeView */}
              <View
                style={StyleSheet.applyWidth(
                  {
                    alignContent: 'flex-start',
                    alignItems: 'center',
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
                      color: theme.colors['Secondary'],
                      fontFamily: 'Inter_600SemiBold',
                      fontSize: 14,
                      marginRight: 5,
                    }),
                    dimensions.width,
                  )}
                >
                  {'coming soon'}
                </Text>
                <Icon size={24} name={'Ionicons/ios-radio-outline'} color={theme.colors['Secondary']} />
              </View>
            </View>

            <View
              style={StyleSheet.applyWidth(
                {
                  alignItems: 'center',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginRight: 10,
                },
                dimensions.width,
              )}
            >
              {/* EventTitle */}
              <Text
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                    color: theme.colors['Community_Medium_Black'],
                    fontFamily: 'Rubik_600SemiBold',
                    fontSize: 14,
                    marginBottom: 10,
                    marginTop: 10,
                  }),
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
                  color: theme.colors['Community_Medium_Black'],
                  fontFamily: 'Rubik_600SemiBold',
                  fontSize: 14,
                }),
                dimensions.width,
              )}
            >
              {'Ind-Aus Day 5 - Pre Match Day'}
            </Text>
            {/* Caption */}
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
              {
                'Will Aus be able to save 3-1? Or will they turn the tables and make it 2-2? \n\nJoin our experts in this analysis.'
              }
            </Text>
          </View>
          <Divider
            style={StyleSheet.applyWidth(GlobalStyles.DividerStyles(theme)['Divider'], dimensions.width)}
            color={theme.colors.divider}
          />
          <KeyboardAwareScrollView
            contentContainerStyle={StyleSheet.applyWidth({ flexShrink: 2 }, dimensions.width)}
            keyboardShouldPersistTaps={'never'}
            showsVerticalScrollIndicator={false}
          >
            {/* Content Frame with Scroll */}
            <ScrollView bounces={true} showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
              {/* Fetch Frame */}
              <View style={StyleSheet.applyWidth({ flexGrow: 1, flexShrink: 1, marginTop: 10 }, dimensions.width)}>
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
                        paddingLeft: 2,
                        paddingRight: 2,
                      }),
                      dimensions.width,
                    )}
                  >
                    {'match thread'}
                  </Text>
                  <Icon color={theme.colors['PF-BG']} size={20} name={'MaterialCommunityIcons/wechat'} />
                </View>
                <FlatList
                  data={fetchData}
                  listKey={'uWLgYXEP'}
                  keyExtractor={(listData) => listData?.id || listData?.uuid || JSON.stringify(listData)}
                  renderItem={({ item }) => {
                    const listData = item
                    return (
                      <>
                        {/* Record Frame */}
                        <View style={StyleSheet.applyWidth({ flexGrow: 0, flexShrink: 0 }, dimensions.width)}>
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
                                    <CircleImage source={Images.JoelMottLaK153ghdigUnsplash} size={36} />
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
                                {/* Rubik Headline Style 18/24 Bold */}
                                <Text
                                  style={StyleSheet.applyWidth(
                                    {
                                      color: theme.colors.communityDarkUI,
                                      fontFamily: 'Inter_600SemiBold',
                                      fontSize: 13,
                                      lineHeight: 19,
                                    },
                                    dimensions.width,
                                  )}
                                >
                                  {'Sherry James'}
                                </Text>
                                {/* Rubik Text Style 12/18 Regular */}
                                <Text
                                  style={StyleSheet.applyWidth(
                                    {
                                      color: theme.colors.communityTrueOption,
                                      fontFamily: 'Inter_400Regular',
                                      fontSize: 11,
                                      lineHeight: 17,
                                    },
                                    dimensions.width,
                                  )}
                                >
                                  {'I love the Holi colors on our players! 🎊🎉🪅❣️'}
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
              </View>
            </ScrollView>
            {/* Keyboard Component Frame */}
            <View
              style={StyleSheet.applyWidth(GlobalStyles.ViewStyles(theme)['PF-InputCommentFrame'], dimensions.width)}
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
                  style={StyleSheet.applyWidth({ alignItems: 'center', flexGrow: 1, flexShrink: 0 }, dimensions.width)}
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
                  style={StyleSheet.applyWidth({ alignItems: 'center', flexGrow: 1, flexShrink: 0 }, dimensions.width)}
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
                  style={StyleSheet.applyWidth({ alignItems: 'center', flexGrow: 1, flexShrink: 0 }, dimensions.width)}
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
                  style={StyleSheet.applyWidth({ alignItems: 'center', flexGrow: 1, flexShrink: 0 }, dimensions.width)}
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
                  style={StyleSheet.applyWidth({ alignItems: 'center', flexGrow: 1, flexShrink: 0 }, dimensions.width)}
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
                    paddingBottom: 12,
                    paddingLeft: 12,
                    paddingRight: 12,
                    paddingTop: 12,
                  },
                  dimensions.width,
                )}
              >
                {/* Flex Input */}
                <View style={StyleSheet.applyWidth({ flexGrow: 1, flexShrink: 0, paddingLeft: 30 }, dimensions.width)}>
                  <TextInput
                    style={StyleSheet.applyWidth(
                      {
                        borderBottomWidth: 1,
                        borderColor: theme.colors.communityIconFill,
                        borderLeftWidth: 1,
                        borderRadius: 60,
                        borderRightWidth: 1,
                        borderTopWidth: 1,
                        marginLeft: 12,
                        marginRight: 12,
                        paddingBottom: 15,
                        paddingLeft: 12,
                        paddingRight: 12,
                        paddingTop: 15,
                      },
                      dimensions.width,
                    )}
                    placeholder={'Type something...'}
                    placeholderTextColor={theme.colors.communityLightBlack}
                  />
                </View>
                {/* Flex Frame for Touchable */}
                <View style={StyleSheet.applyWidth({ flexGrow: 0, flexShrink: 0 }, dimensions.width)}>
                  <Touchable>
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
          </KeyboardAwareScrollView>
        </TabViewItem>
        {/* Scores */}
        <TabViewItem
          style={StyleSheet.applyWidth(GlobalStyles.TabViewItemStyles(theme)['Tab View Item'], dimensions.width)}
          title={'SCORES'}
        >
          <View
            style={StyleSheet.applyWidth(
              {
                alignItems: 'center',
                backgroundColor: theme.colors['Studily_Mint_Green'],
                height: 80,
                justifyContent: 'center',
              },
              dimensions.width,
            )}
          >
            <Text
              style={StyleSheet.applyWidth(
                StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                  color: theme.colors['PF-BG'],
                  fontFamily: 'Inter_700Bold',
                  fontSize: 14,
                }),
                dimensions.width,
              )}
            >
              {'Even we\'re waiting for the match to start 🤘😎🎊'}
            </Text>
          </View>
        </TabViewItem>
        {/* Moments */}
        <TabViewItem
          style={StyleSheet.applyWidth(GlobalStyles.TabViewItemStyles(theme)['Tab View Item'], dimensions.width)}
          title={'MOMENTS'}
        />
      </TabView>
    </ScreenContainer>
  )
}

export default withTheme(MDStest1Screen)
