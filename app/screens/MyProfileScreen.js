import React from 'react'
import * as GlobalStyles from '../GlobalStyles.js'
import * as PagalFanBEApi from '../apis/PagalFanBEApi.js'
import * as GlobalVariables from '../config/GlobalVariableContext'
import Images from '../config/Images'
import * as StyleSheet from '../utils/StyleSheet'
import {
  Checkbox,
  Circle,
  CircleImage,
  Icon,
  LinearGradient,
  Pressable,
  ScreenContainer,
  Surface,
  TabView,
  TabViewItem,
  Touchable,
  withTheme,
} from '@draftbit/ui'
import {
  ActivityIndicator,
  FlatList,
  ImageBackground,
  Modal,
  ScrollView,
  Text,
  View,
  useWindowDimensions,
} from 'react-native'
import FastImage from 'react-native-fast-image'
import { BlurImage, Image } from '../components'

const MyProfileScreen = (props) => {
  const dimensions = useWindowDimensions()
  const Constants = GlobalVariables.useValues()
  const Variables = Constants

  const { theme } = props
  const { navigation } = props

  const [accountFriend, setAccountFriend] = React.useState(false)
  const [actionSheet, setActionSheet] = React.useState(false)
  const [menuTab1, setMenuTab1] = React.useState(true)
  const [menuTab2, setMenuTab2] = React.useState(false)
  const [menuTab3, setMenuTab3] = React.useState(false)
  const [modalOpen, setModalOpen] = React.useState(false)

  const [Followers, setFollwers] = React.useState(0)

  return (
    <ScreenContainer
      style={StyleSheet.applyWidth(
        {
          backgroundColor: theme.colors.communityWhite,
          marginLeft: 10,
          marginRight: 10,
        },
        dimensions.width,
      )}
      hasSafeArea={true}
      scrollable={false}
    >
      <PagalFanBEApi.FetchFetchSingleUserGET id={Constants['LOGGED_IN_USER']}>
        {({ loading, error, data, refetchFetchSingleUser }) => {
          const fetchData = data
          if (!fetchData || loading) {
            return <ActivityIndicator />
          }

          if (error) {
            return <Text style={{ textAlign: 'center' }}>There was a problem fetching this data</Text>
          }

          return (
            <>
              {/* Navigation Frame */}
              <View
                style={StyleSheet.applyWidth(
                  {
                    flexDirection: 'row',
                    flexGrow: 0,
                    flexShrink: 0,
                    paddingLeft: 12,
                    paddingRight: 12,
                    zIndex: 12,
                  },
                  dimensions.width,
                )}
              >
                {/* Left Frame */}
                <View style={StyleSheet.applyWidth({ paddingBottom: 7, paddingTop: 7 }, dimensions.width)}>
                  {/* Flex Frame for Touchable */}
                  <View
                    style={StyleSheet.applyWidth(
                      { flexGrow: 1, flexShrink: 0, justifyContent: 'center' },
                      dimensions.width,
                    )}
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
                      <Circle size={31} bgColor={theme.colors.communityModalOpacityOverlay}>
                        <Icon name={'Ionicons/caret-back'} size={18} color={theme.colors.communityWhite} />
                      </Circle>
                    </Touchable>
                  </View>
                </View>
                {/* Middle Frame */}
                <View
                  style={StyleSheet.applyWidth(
                    {
                      flexGrow: 1,
                      flexShrink: 0,
                      paddingBottom: 12,
                      paddingLeft: 12,
                      paddingRight: 12,
                      paddingTop: 12,
                    },
                    dimensions.width,
                  )}
                ></View>
                {/* Right Frame */}
                <View
                  style={StyleSheet.applyWidth(
                    { flexDirection: 'row', paddingBottom: 7, paddingTop: 7 },
                    dimensions.width,
                  )}
                >
                  {/* Share Frame */}
                  <View
                    style={StyleSheet.applyWidth(
                      {
                        flexGrow: 1,
                        flexShrink: 0,
                        justifyContent: 'center',
                        marginRight: 12,
                      },
                      dimensions.width,
                    )}
                  >
                    <Touchable>
                      <Circle size={31} bgColor={theme.colors.communityModalOpacityOverlay}>
                        <Icon name={'Ionicons/ios-share'} size={18} color={theme.colors.communityWhite} />
                      </Circle>
                    </Touchable>
                  </View>
                  {/* Edit Frame */}
                  <View
                    style={StyleSheet.applyWidth(
                      { flexGrow: 1, flexShrink: 0, justifyContent: 'center' },
                      dimensions.width,
                    )}
                  >
                    <Touchable
                      onPress={() => {
                        try {
                          navigation.navigate('MySettingsScreen')
                        } catch (err) {
                          console.error(err)
                        }
                      }}
                    >
                      <Circle size={31} bgColor={theme.colors.communityModalOpacityOverlay}>
                        <Icon size={18} color={theme.colors.communityWhite} name={'Ionicons/ios-settings-outline'} />
                      </Circle>
                    </Touchable>
                  </View>
                </View>
              </View>
              {/* Hero Frame */}
              <View
                style={StyleSheet.applyWidth(
                  {
                    marginBottom: 6,
                    marginLeft: 3,
                    marginRight: 3,
                    marginTop: -54,
                    overflow: 'hidden',
                  },
                  dimensions.width,
                )}
              >
                <Image
                  style={StyleSheet.applyWidth({ height: 150, width: 500 }, dimensions.width)}
                  source={Images.JonathanBorbaKgCSRo4SiT8Unsplash}
                  resizeMode={'cover'}
                />
              </View>
              {/* Profile Image Frame */}
              <View
                style={StyleSheet.applyWidth(
                  {
                    alignItems: 'flex-end',
                    marginTop: -40,
                    paddingRight: 18,
                    zIndex: 20,
                  },
                  dimensions.width,
                )}
              >
                {/* Profile Image Background */}
                <Circle size={96} bgColor={theme.colors.communityWhite}>
                  {/* Profile Image */}
                  {fetchData?.[0]?.profile_image && (
                    <CircleImage
                      size={90}
                      source={{
                        uri: `${fetchData[0].profile_image}`,
                      }}
                    />
                  )}
                </Circle>
                <PagalFanBEApi.FetchFetchSingleFollowGET followeeId={Constants['LOGGED_IN_USER']}>
                  {({ data }) => {
                    if (data) {
                      setFollwers(data.length)
                    }
                  }}
                </PagalFanBEApi.FetchFetchSingleFollowGET>
                <Text
                  style={StyleSheet.applyWidth(
                    {
                      alignItems: 'flex-start',
                      color: theme.colors.LightGrey,
                      fontFamily: 'Rubik_400Regular',
                      fontSize: 12,
                      paddingRight: 15,
                    },
                    dimensions.width,
                  )}
                >
                  {Followers} Followers
                </Text>
              </View>
              {/* Profile Detail Frame */}
              <View
                style={StyleSheet.applyWidth(
                  {
                    backgroundColor: theme.colors.communityWhite,
                    flexGrow: 0,
                    flexShrink: 0,
                    marginTop: -36,
                  },
                  dimensions.width,
                )}
              >
                {/* Bio Frame */}
                <View
                  style={StyleSheet.applyWidth(
                    { paddingBottom: 12, paddingLeft: 12, paddingRight: 12 },
                    dimensions.width,
                  )}
                >
                  {/* User Name */}
                  <Text
                    style={StyleSheet.applyWidth(
                      {
                        color: theme.colors.communityDarkUI,
                        fontFamily: 'Rubik_700Bold',
                        fontSize: 20,
                        lineHeight: 26,
                      },
                      dimensions.width,
                    )}
                  >
                    {(fetchData && fetchData[0])?.first_name} {(fetchData && fetchData[0])?.last_name}
                  </Text>
                  {/* User Handle */}
                  <Text
                    style={StyleSheet.applyWidth(
                      {
                        color: theme.colors.communityDarkUI,
                        fontFamily: 'Rubik_400Regular',
                        fontSize: 12,
                        lineHeight: 18,
                        marginBottom: 12,
                      },
                      dimensions.width,
                    )}
                  >
                    {(fetchData && fetchData[0])?.handle}
                  </Text>
                  {/* User Bio */}
                  <Text
                    style={StyleSheet.applyWidth(
                      {
                        color: theme.colors.communityTrueOption,
                        fontFamily: 'Rubik_400Regular',
                        fontSize: 12,
                        lineHeight: 18,
                      },
                      dimensions.width,
                    )}
                    numberOfLines={4}
                    ellipsizeMode={'tail'}
                  >
                    {(fetchData && fetchData[0])?.bio}
                  </Text>
                </View>
                {/* Action Frame */}
                <View
                  style={StyleSheet.applyWidth(
                    {
                      flexDirection: 'row',
                      paddingLeft: 12,
                      paddingRight: 12,
                      paddingTop: 12,
                    },
                    dimensions.width,
                  )}
                ></View>
              </View>
            </>
          )
        }}
      </PagalFanBEApi.FetchFetchSingleUserGET>
      {/* TabFrame */}
      <TabView
        style={StyleSheet.applyWidth({ flex: 1, fontSize: 12 }, dimensions.width)}
        tabBarPosition={'top'}
        keyboardDismissMode={'auto'}
        swipeEnabled={true}
        pressColor={theme.colors.primary}
        tabsBackgroundColor={theme.colors.background}
        indicatorColor={theme.colors['Secondary']}
        activeColor={theme.colors['Secondary']}
      >
        {/* Posted */}
        <TabViewItem
          style={StyleSheet.applyWidth(GlobalStyles.TabViewItemStyles(theme)['Tab View Item'], dimensions.width)}
          title={'Posted'}
        >
          {/* Posted-Feed */}
          <View style={StyleSheet.applyWidth(GlobalStyles.ViewStyles(theme)['PF-Feed 2'], dimensions.width)}>
            <ScrollView
              contentContainerStyle={StyleSheet.applyWidth({ flexDirection: 'column' }, dimensions.width)}
              bounces={true}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
            >
              <PagalFanBEApi.FetchFetchAllPostsUploadedByUserGET userId={Constants['LOGGED_IN_USER']}>
                {({ loading, error, data, refetchFetchAllPostsUploadedByUser }) => {
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
                      listKey={'l9BdpIAA'}
                      keyExtractor={(listData) => listData?.id || listData?.uuid || JSON.stringify(listData)}
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
                                  <BlurImage
                                    style={StyleSheet.applyWidth(
                                      {
                                        alignItems: 'flex-start',
                                        height: 130,
                                        justifyContent: 'space-between',
                                        width: '100%',
                                      },
                                      dimensions.width,
                                    )}
                                    resizeMode={'cover'}
                                    blurRadius={50}
                                    source={{ uri: `${listData?.image_path}` }}
                                  >
                                    <FastImage
                                      resizeMode="contain"
                                      style={{ height: '100%', width: '100%' }}
                                      source={{ uri: `${listData?.image_path}` }}
                                    />
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
                                        {listData?.caption}
                                      </Text>
                                    </View>
                                  </BlurImage>
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
              </PagalFanBEApi.FetchFetchAllPostsUploadedByUserGET>
            </ScrollView>
          </View>
        </TabViewItem>
        {/* Saved */}
        <TabViewItem
          style={StyleSheet.applyWidth(GlobalStyles.TabViewItemStyles(theme)['Tab View Item'], dimensions.width)}
          title={'Saved'}
        >
          {/* Saved-Feed */}
          <View style={StyleSheet.applyWidth(GlobalStyles.ViewStyles(theme)['PF-Feed 2'], dimensions.width)}>
            <ScrollView
              contentContainerStyle={StyleSheet.applyWidth({ flexDirection: 'column' }, dimensions.width)}
              bounces={true}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
            >
              <PagalFanBEApi.FetchFetchAllPostsSavedByUserGET userId={Constants['LOGGED_IN_USER']}>
                {({ loading, error, data, refetchFetchAllPostsSavedByUser }) => {
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
                      listKey={'mm2A8R7y'}
                      keyExtractor={(listData) => listData?.id || listData?.uuid || JSON.stringify(listData)}
                      renderItem={({ item }) => {
                        const listData = item
                        return (
                          <Pressable
                            onPress={() => {
                              try {
                                navigation.navigate('PostDetailsScreen', {
                                  post_id: listData?.post_id,
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
                                    resizeMode={'cover'}
                                    source={{
                                      uri: `${listData?.posts?.image_path}`,
                                    }}
                                  >
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
                                        {listData?.posts?.caption}
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
              </PagalFanBEApi.FetchFetchAllPostsSavedByUserGET>
            </ScrollView>
          </View>
        </TabViewItem>
        <TabViewItem
          style={StyleSheet.applyWidth(GlobalStyles.TabViewItemStyles(theme)['Tab View Item'], dimensions.width)}
          title={'Followers'}
        >
          {/* Followers-Feed */}
          <View style={StyleSheet.applyWidth(GlobalStyles.ViewStyles(theme)['PF-Feed 2'], dimensions.width)}>
            <ScrollView
              contentContainerStyle={StyleSheet.applyWidth({ flex: 1 }, dimensions.width)}
              bounces={true}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
            >
              <PagalFanBEApi.FetchFetchAllFollowersOfUserGET
                followeeId={Constants['LOGGED_IN_USER']}
              >
                {({ loading, error, data, refetchFetchAllPostsSavedByUser }) => {
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
                      listKey={'96XJJXKTT'}
                      renderItem={({ item }) => {
                        return (
                          <View style={{ marginTop:20 ,marginLeft:10}}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Circle size={70} bgColor={theme.colors.communityWhite}
                              style={{ width: 50, height: 50, marginRight: 20 }}
                            >
                              {/* Profile Image */}
                              {(item)?.user_profiles?.profile_image && (
                                <CircleImage
                                  size={90}
                                  source={{
                                    uri: `${item.user_profiles?.profile_image}`,
                                  }}
                                />
                              )}
                            </Circle>
                            <Text 
                            style={StyleSheet.applyWidth(
                              {
                                alignItems: 'flex-start',
                                color: theme.colors.Studily_Dark_UI,
                                fontFamily: 'Rubik_500Bold',
                                fontSize: 14,
                                paddingRight: 15
                              },
                              dimensions.width,
                            )}>
                              {item.user_profiles?.first_name} {item.user_profiles?.last_name} 
                            </Text>
                            </View>
                          </View>
                        )
                      }}
                    />
                  )}}  
              </PagalFanBEApi.FetchFetchAllFollowersOfUserGET>
            </ScrollView>
          </View>
        </TabViewItem>

        {/* Following */}
        <TabViewItem
          style={StyleSheet.applyWidth(GlobalStyles.TabViewItemStyles(theme)['Tab View Item'], dimensions.width)}
          title={'Following'}
        >
          {/* Following-Feed */}
          <View style={StyleSheet.applyWidth(GlobalStyles.ViewStyles(theme)['PF-Feed 2'], dimensions.width)}>
            <ScrollView
              contentContainerStyle={StyleSheet.applyWidth({ flex: 1 }, dimensions.width)}
              bounces={true}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
            >
              <PagalFanBEApi.FetchFetchAllFollowedByUserGET
                followerId={Constants['LOGGED_IN_USER']}
              >
                {({ loading, error, data, refetchFetchAllPostsSavedByUser }) => {
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
                      listKey={'96XJJXKTT'}
                      renderItem={({ item }) => {
                        return (
                          <View style={{ marginTop:20 ,marginLeft:10}}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Circle size={70} bgColor={theme.colors.communityWhite}
                              style={{ width: 50, height: 50, marginRight: 20 }}
                            >
                              {/* Profile Image */}
                              {(item)?.user_profiles?.profile_image && (
                                <CircleImage
                                  size={90}
                                  source={{
                                    uri: `${item.user_profiles?.profile_image}`,
                                  }}
                                />
                              )}
                            </Circle>
                            <Text 
                            style={StyleSheet.applyWidth(
                              {
                                alignItems: 'flex-start',
                                color: theme.colors.Studily_Dark_UI,
                                fontFamily: 'Rubik_500Bold',
                                fontSize: 14,
                                paddingRight: 15
                              },
                              dimensions.width,
                            )}>
                              {item.user_profiles?.first_name} {item.user_profiles?.last_name} 
                            </Text>
                            </View>
                          </View>
                        )
                      }}
                    />
                  )}}  
              </PagalFanBEApi.FetchFetchAllFollowedByUserGET>
            </ScrollView>
          </View>
        </TabViewItem>
      </TabView>
    </ScreenContainer>
  )
}

export default withTheme(MyProfileScreen)
