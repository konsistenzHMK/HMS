import React, { useRef } from 'react'
import * as GlobalStyles from '../GlobalStyles.js'
import * as PagalFanBEApi from '../apis/PagalFanBEApi.js'
import * as GlobalVariables from '../config/GlobalVariableContext'
import Images from '../config/Images'
import * as StyleSheet from '../utils/StyleSheet'
import { Circle, Divider, Icon, Pressable, ScreenContainer, Surface, Touchable, withTheme } from '@draftbit/ui'
import { FlashList } from '@shopify/flash-list'
import {
  FlatList,
  Image,
  ImageBackground,
  ScrollView,
  Text,
  TextInput,
  View,
  useWindowDimensions,
  StyleSheet as RNStyleSheet,
} from 'react-native'
import { ShimmerPlaceHolder, useSnackbar } from '../components'

const MyFanClubsScreen = (props) => {
  const dimensions = useWindowDimensions()
  const Constants = GlobalVariables.useValues()
  const snackbar = useSnackbar()
  const fetchFanClubsFollowedByUserRef = useRef(null)

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
        {/* Followed Clubs */}
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
              fetchFanClubsFollowedByUserRef.current = refetchFetchFanClubsFollowedByUser
              if (!followedClubsData && loading) {
                return <FollowedFanClubLoader />
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
                        {/* Club card */}
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
                            {/* Followers */}
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
                              {/* number */}
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
                return <RecommendedFanClubLoader />
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
                        {/* Club card */}
                        <View
                          style={StyleSheet.applyWidth(
                            {
                              alignItems: 'center',
                              alignSelf: 'auto',
                              borderColor: theme.colors['Secondary'],
                              borderLeftWidth: 1,
                              borderRadius: 20,
                              borderRightWidth: 1,
                              flexDirection: 'column',
                              height: 170,
                              justifyContent: 'flex-start',
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
                          {/* Logo */}
                          <Image
                            style={StyleSheet.applyWidth({ borderRadius: 20, height: 60, width: 60 }, dimensions.width)}
                            resizeMode={'contain'}
                            source={{
                              uri: `${flashListData?.teams?.logo_path}`,
                            }}
                          />
                          {/* Details */}
                          <View
                            style={StyleSheet.applyWidth(
                              { alignItems: 'center', flex: 1, marginTop: 10 },
                              dimensions.width,
                            )}
                          >
                            {/* Club Name */}
                            <View
                              style={StyleSheet.applyWidth(
                                {
                                  alignItems: 'center',
                                  flexDirection: 'row',
                                  justifyContent: 'center',
                                  marginBottom: 4,
                                },
                                dimensions.width,
                              )}
                            >
                              <Text
                                style={StyleSheet.applyWidth(
                                  {
                                    color: theme.colors.strong,
                                    fontFamily: 'Rubik_500Medium',
                                    fontSize: 12,
                                  },
                                  dimensions.width,
                                )}
                              >
                                {flashListData?.name}
                              </Text>
                            </View>
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
                                  paddingLeft: 1,
                                  paddingRight: 1,
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
                            {/* Followers */}
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
                              {/* number */}
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
                                {'180K fans'}
                              </Text>
                            </View>
                            {/* Follow */}
                            <Pressable
                              onPress={() => {
                                const handler = async () => {
                                  try {
                                    await pagalFanBEAddNewFanClubFollowsPOST.mutateAsync({
                                      fanclubId: flashListData?.id,
                                      userId: Constants['LOGGED_IN_USER'],
                                    })
                                    refetchFetchRecommendedFanClubs()
                                    fetchFanClubsFollowedByUserRef.current()
                                    console.log(
                                      'fetchFanClubsFollowedByUserRef.current',
                                      fetchFanClubsFollowedByUserRef.current,
                                    )
                                    snackbar.show({ title: 'Fanclub followed successfully' })
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
                                    justifyContent: 'center',
                                    marginBottom: 4,
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
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                  showsVerticalScrollIndicator={false}
                />
              )
            }}
          </PagalFanBEApi.FetchFetchRecommendedFanClubsGET>
        </View>
        <Divider
          style={StyleSheet.applyWidth(
            StyleSheet.compose(GlobalStyles.DividerStyles(theme)['Divider'], {
              marginLeft: 80,
              marginTop: 20,
              width: '50%',
            }),
            dimensions.width,
          )}
          color={theme.colors['PF-Primary']}
        />
        {/* PF-Feed */}
        <View style={StyleSheet.applyWidth(GlobalStyles.ViewStyles(theme)['PF-Feed 5'], dimensions.width)}>
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
                  return <FeedLoader />
                }

                if (error) {
                  return <Text style={{ textAlign: 'center' }}>There was a problem fetching this data</Text>
                }

                return (
                  <FlatList
                    data={fetchData}
                    listKey={'ZamU1eFh'}
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
                                  source={{ uri: `${listData?.image_path}` }}
                                  resizeMode={'cover'}
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
    </ScreenContainer>
  )
}

const FollowedFanClubLoader = () => {
  return (
    <View style={styles.loaderContainer}>
      <ShimmerPlaceHolder style={styles.followedFanClubLoader} />
      <ShimmerPlaceHolder style={styles.followedFanClubLoader} />
    </View>
  )
}

const RecommendedFanClubLoader = () => {
  return (
    <View style={styles.loaderContainer}>
      <ShimmerPlaceHolder style={styles.recommendedFanClubLoader} />
      <ShimmerPlaceHolder style={styles.recommendedFanClubLoader} />
    </View>
  )
}

const FeedLoader = () => {
  return (
    <View style={styles.loaderContainer}>
      <ShimmerPlaceHolder style={styles.feedLoader} />
      <ShimmerPlaceHolder style={styles.feedLoader} />
    </View>
  )
}

const styles = RNStyleSheet.create({
  loaderContainer: {
    flexDirection: 'row',
  },
  followedFanClubLoader: {
    borderRadius: 20,
    height: 120,
    width: 140,
    marginRight: 10,
  },
  recommendedFanClubLoader: {
    borderRadius: 20,
    height: 170,
    marginTop: 10,
    marginRight: 10,
    width: 140,
  },
  feedLoader: {
    borderRadius: 12,
    margin: 2,
    marginVertical: 10,
    height: 130,
    width: '49%',
  },
})

export default withTheme(MyFanClubsScreen)
