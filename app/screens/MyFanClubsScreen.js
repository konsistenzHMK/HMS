import React from 'react'
import * as GlobalStyles from '../GlobalStyles.js'
import * as PagalFanBEApi from '../apis/PagalFanBEApi.js'
import * as GlobalVariables from '../config/GlobalVariableContext'
import Images from '../config/Images'
import * as StyleSheet from '../utils/StyleSheet'
import { Circle, Divider, Icon, Pressable, ScreenContainer, Touchable, withTheme } from '@draftbit/ui'
import { FlashList } from '@shopify/flash-list'
import { ActivityIndicator, Image, ScrollView, Text, TextInput, View, useWindowDimensions } from 'react-native'

const MyFanClubsScreen = (props) => {
  const dimensions = useWindowDimensions()
  const Constants = GlobalVariables.useValues()
  const Variables = Constants

  const removeFollowed = (list) => {
    if (list.length) {
      return list?.filter((item) => item.fanclub_followers.length === 0)
    }
    return list
  }

  // Filters from list of Fanclubs
  const FilterList = (list) => {
    if (list.length) {
      return list?.filter((item) => item.teams.team_name.toLowerCase().includes(textInputValue.toLowerCase()))
    }
    return list
  }

  const { theme } = props
  const { navigation } = props

  const pagalFanBEAddNewFanClubFollowsPOST = PagalFanBEApi.useAddNewFanClubFollowsPOST()

  const [selectedTab, setSelectedTab] = React.useState('category')
  const [textInputValue, setTextInputValue] = React.useState('')

  return (
    <ScreenContainer
      style={StyleSheet.applyWidth({ marginLeft: 10, marginRight: 10, marginTop: 10 }, dimensions.width)}
      scrollable={false}
      hasTopSafeArea={false}
      hasSafeArea={true}
    >
      {/* Header */}
      <View style={StyleSheet.applyWidth({ flexDirection: 'row', justifyContent: 'space-between' }, dimensions.width)}>
        {/* Left Frame */}
        <View style={StyleSheet.applyWidth(GlobalStyles.ViewStyles(theme)['PF-BackHeader 2'], dimensions.width)}>
          {/* Flex Frame for Touchable */}
          <View
            style={StyleSheet.applyWidth({ flexGrow: 1, flexShrink: 0, justifyContent: 'center' }, dimensions.width)}
          >
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
      </View>

      <ScrollView bounces={true} showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
        {/* Followed FanClubs */}
        <View>
          {/* heading */}
          <View
            style={StyleSheet.applyWidth(
              {
                alignItems: 'center',
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginBottom: 10,
              },
              dimensions.width,
            )}
          >
            <Text
              style={StyleSheet.applyWidth(
                {
                  color: theme.colors['PF-Grey'],
                  fontFamily: 'Rubik_700Bold',
                  fontSize: 20,
                  lineHeight: 19,
                },
                dimensions.width,
              )}
            >
              {'Followed PagalFan Clubs'}
            </Text>
          </View>
          {/* FollowedClubs */}
          <PagalFanBEApi.FetchFetchFanClubsFollowedByUserGET userId={Constants['LOGGED_IN_USER']}>
            {({ loading, error, data, refetchFetchFanClubsFollowedByUser }) => {
              const followedClubsData = data
              if (!followedClubsData || loading) {
                return <ActivityIndicator />
              }

              if (error) {
                return <Text style={{ textAlign: 'center' }}>There was a problem fetching this data</Text>
              }

              return (
                <FlashList
                  data={followedClubsData}
                  listKey={'I7b4bbDf'}
                  keyExtractor={(flashListData) =>
                    flashListData?.id || flashListData?.uuid || JSON.stringify(flashListData)
                  }
                  renderItem={({ item }) => {
                    const flashListData = item
                    return (
                      <Touchable
                        onPress={() => {
                          try {
                            navigation.navigate('FanClubSingleScreen', {
                              id: flashListData?.fanclubs?.id,
                            })
                          } catch (err) {
                            console.error(err)
                          }
                        }}
                      >
                        <View
                          style={StyleSheet.applyWidth(
                            {
                              alignContent: 'flex-start',
                              alignItems: 'center',
                              borderBottomWidth: 1,
                              borderColor: theme.colors['Secondary'],
                              borderLeftWidth: 1,
                              borderRadius: 20,
                              borderRightWidth: 1,
                              borderTopWidth: 1,
                              flexDirection: 'column',
                              height: 120,
                              marginRight: 10,
                              paddingBottom: 2,
                              paddingLeft: 2,
                              paddingRight: 2,
                              paddingTop: 4,
                              width: 140,
                            },
                            dimensions.width,
                          )}
                        >
                          <Image
                            style={StyleSheet.applyWidth({ borderRadius: 20, height: 60, width: 60 }, dimensions.width)}
                            resizeMode={'contain'}
                            source={{
                              uri: `${flashListData?.fanclubs?.teams?.logo_path}`,
                            }}
                          />
                          <View
                            style={StyleSheet.applyWidth(
                              {
                                alignContent: 'flex-start',
                                alignItems: 'center',
                                marginTop: 10,
                              },
                              dimensions.width,
                            )}
                          >
                            {/* Name */}
                            <Text
                              style={StyleSheet.applyWidth(
                                {
                                  alignSelf: 'center',
                                  color: theme.colors.strong,
                                  fontFamily: 'Rubik_500Medium',
                                  fontSize: 12,
                                },
                                dimensions.width,
                              )}
                            >
                              {flashListData?.fanclubs?.name}
                            </Text>

                            <View
                              style={StyleSheet.applyWidth(
                                {
                                  alignItems: 'center',
                                  flexDirection: 'row',
                                  justifyContent: 'center',
                                  marginLeft: 5,
                                  marginTop: 8,
                                },
                                dimensions.width,
                              )}
                            >
                              <Circle size={8} bgColor={theme.colors['App Green']} />
                              {/* viewers */}
                              <Text
                                style={StyleSheet.applyWidth(
                                  {
                                    color: theme.colors.strong,
                                    fontFamily: 'Inter_400Regular',
                                    fontSize: 10,
                                    marginLeft: 8,
                                  },
                                  dimensions.width,
                                )}
                              >
                                {'245K fans'}
                              </Text>
                            </View>
                          </View>
                        </View>
                      </Touchable>
                    )
                  }}
                  contentContainerStyle={StyleSheet.applyWidth({ flex: 1, flexDirection: 'row' }, dimensions.width)}
                  estimatedItemSize={50}
                  numColumns={1}
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                  showsVerticalScrollIndicator={false}
                />
              )
            }}
          </PagalFanBEApi.FetchFetchFanClubsFollowedByUserGET>
        </View>
        <Divider
          style={StyleSheet.applyWidth(
            StyleSheet.compose(GlobalStyles.DividerStyles(theme)['Divider'], {
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
        <View style={StyleSheet.applyWidth({ paddingLeft: 5 }, dimensions.width)}>
          {/* PF Banner */}
          <Image
            style={StyleSheet.applyWidth(
              StyleSheet.compose(GlobalStyles.ImageStyles(theme)['Image'], {
                height: 120,
                maxWidth: 350,
                width: '100%',
              }),
              dimensions.width,
            )}
            resizeMode={'cover'}
            source={Images.PFBanner1}
          />
        </View>
        <Divider
          style={StyleSheet.applyWidth(
            StyleSheet.compose(GlobalStyles.DividerStyles(theme)['Divider'], {
              marginBottom: 10,
              marginLeft: 80,
              marginTop: 10,
              width: '50%',
            }),
            dimensions.width,
          )}
          color={theme.colors['PF-Primary']}
        />
        {/* Recommended Clubs */}
        <View>
          {/* heading */}
          <View
            style={StyleSheet.applyWidth(
              {
                alignItems: 'center',
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingTop: 10,
              },
              dimensions.width,
            )}
          >
            <Text
              style={StyleSheet.applyWidth(
                {
                  color: theme.colors['PF-Grey'],
                  fontFamily: 'Rubik_600SemiBold',
                  fontSize: 20,
                  lineHeight: 19,
                },
                dimensions.width,
              )}
            >
              {'Recommended FanClubs For You'}
            </Text>
          </View>
          {/* Search Filter */}
          <View style={StyleSheet.applyWidth({ marginTop: 10 }, dimensions.width)}>
            <TextInput
              onChangeText={(newTextInputValue) => {
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
              placeholder={'Search by name...'}
              value={textInputValue}
              autoCapitalize={'none'}
              placeholderTextColor={theme.colors['PF-Grey']}
            />
          </View>

          <PagalFanBEApi.FetchFetchRecommendedFanClubsGET userId={Constants['LOGGED_IN_USER']}>
            {({ loading, error, data, refetchFetchRecommendedFanClubs }) => {
              const fetchData = data
              if (!fetchData || loading) {
                return <ActivityIndicator />
              }

              if (error) {
                return <Text style={{ textAlign: 'center' }}>There was a problem fetching this data</Text>
              }

              return (
                <FlashList
                  data={FilterList(removeFollowed(fetchData))}
                  listKey={'cCk3ev0M'}
                  keyExtractor={(flashListData) =>
                    flashListData?.id || flashListData?.uuid || JSON.stringify(flashListData)
                  }
                  renderItem={({ item }) => {
                    const flashListData = item
                    return (
                      <Touchable
                        onPress={() => {
                          try {
                            navigation.navigate('FanClubSingleScreen', {
                              id: flashListData?.id,
                            })
                          } catch (err) {
                            console.error(err)
                          }
                        }}
                        style={StyleSheet.applyWidth({ marginTop: 20 }, dimensions.width)}
                      >
                        <View
                          style={StyleSheet.applyWidth(
                            {
                              alignItems: 'flex-start',
                              borderBottomWidth: 1,
                              borderColor: theme.colors['Studily_Mint_Green'],
                              borderLeftWidth: 1,
                              borderRadius: 20,
                              borderRightWidth: 1,
                              borderTopWidth: 1,
                              flexDirection: 'row',
                              height: 125,
                              justifyContent: 'space-between',
                              paddingBottom: 4,
                              paddingTop: 4,
                            },
                            dimensions.width,
                          )}
                        >
                          <Image
                            style={StyleSheet.applyWidth(
                              { borderRadius: 16, height: 100, width: 160 },
                              dimensions.width,
                            )}
                            resizeMode={'contain'}
                            source={{
                              uri: `${flashListData?.teams?.logo_path}`,
                            }}
                          />
                          <View style={StyleSheet.applyWidth({ flex: 1 }, dimensions.width)}>
                            <View
                              style={StyleSheet.applyWidth(
                                { alignItems: 'center', flexDirection: 'row' },
                                dimensions.width,
                              )}
                            >
                              <Text
                                style={StyleSheet.applyWidth(
                                  {
                                    color: theme.colors.strong,
                                    fontFamily: 'Rubik_500Medium',
                                    fontSize: 14,
                                  },
                                  dimensions.width,
                                )}
                              >
                                {flashListData?.name}
                              </Text>
                            </View>

                            <Text
                              style={StyleSheet.applyWidth(
                                {
                                  color: theme.colors.strong,
                                  fontFamily: 'Rubik_300Light',
                                  fontSize: 11,
                                  marginBottom: 8,
                                  marginTop: 8,
                                },
                                dimensions.width,
                              )}
                            >
                              {'Captain: '}
                              {flashListData?.teams?.captain}
                              {'\nCoach: '}
                              {flashListData?.teams?.coach}
                            </Text>
                            {/* Sport */}
                            <View
                              style={StyleSheet.applyWidth(
                                {
                                  alignItems: 'center',
                                  borderBottomWidth: 1,
                                  borderColor: theme.colors['Light'],
                                  borderLeftWidth: 1,
                                  borderRadius: 6,
                                  borderRightWidth: 1,
                                  borderTopWidth: 1,
                                  height: 20,
                                  justifyContent: 'center',
                                  marginRight: 7,
                                  width: 40,
                                },
                                dimensions.width,
                              )}
                            >
                              <Text
                                style={StyleSheet.applyWidth(
                                  {
                                    color: theme.colors['Strong'],
                                    fontFamily: 'Inter_400Regular',
                                    fontSize: 11,
                                    opacity: 0.75,
                                    paddingBottom: 3,
                                    paddingLeft: 5,
                                    paddingRight: 5,
                                    paddingTop: 3,
                                  },
                                  dimensions.width,
                                )}
                              >
                                {'Cricket'}
                              </Text>
                            </View>

                            <Pressable
                              onPress={() => {
                                const handler = async () => {
                                  try {
                                    await pagalFanBEAddNewFanClubFollowsPOST.mutateAsync({
                                      fanclubId: flashListData?.id,
                                      userId: Constants['LOGGED_IN_USER'],
                                    })
                                  } catch (err) {
                                    console.error(err)
                                  }
                                }
                                handler()
                              }}
                            >
                              <View
                                style={StyleSheet.applyWidth(
                                  {
                                    alignItems: 'center',
                                    backgroundColor: theme.colors['Secondary'],
                                    borderRadius: 32,
                                    height: 20,
                                    marginTop: 8,
                                    width: 100,
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
                                  {'Follow'}
                                </Text>
                              </View>
                            </Pressable>
                          </View>
                        </View>
                      </Touchable>
                    )
                  }}
                  contentContainerStyle={StyleSheet.applyWidth({ flex: 1, flexDirection: 'column' }, dimensions.width)}
                  estimatedItemSize={50}
                  numColumns={1}
                  horizontal={false}
                />
              )
            }}
          </PagalFanBEApi.FetchFetchRecommendedFanClubsGET>
        </View>
      </ScrollView>
    </ScreenContainer>
  )
}

export default withTheme(MyFanClubsScreen)
