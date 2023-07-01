import React, { useState } from 'react'
import * as GlobalStyles from '../GlobalStyles.js'
import * as PagalFanBEApi from '../apis/PagalFanBEApi.js'
import * as GlobalVariables from '../config/GlobalVariableContext'
import * as StyleSheet from '../utils/StyleSheet'
import { Circle, Divider, Icon, Pressable, ScreenContainer, Touchable, withTheme } from '@draftbit/ui'
import { ActivityIndicator, FlatList, ScrollView, Text, View, useWindowDimensions } from 'react-native'
import { useSnackbar, Image } from '../components'
import { FeedCard } from '../shared'

const FanClubSingleScreen = (props) => {
  const dimensions = useWindowDimensions()
  const Constants = GlobalVariables.useValues()
  const snackbar = useSnackbar()

  const [follwersCount, setFollowersCount] = useState(0)

  const { theme } = props
  const { navigation } = props

  const pagalFanBEAddNewFanClubFollowsPOST = PagalFanBEApi.useAddNewFanClubFollowsPOST()
  const pagalFanBEDeleteFanClubFollowsDELETE = PagalFanBEApi.useDeleteFanClubFollowsDELETE()

  const [clubfriend, setClubfriend] = React.useState(false)
  const [team_initials, setTeam_initials] = React.useState('')

  return (
    <ScreenContainer
      style={StyleSheet.applyWidth({ marginLeft: 10, marginRight: 10, marginTop: 10 }, dimensions.width)}
      scrollable={false}
      hasSafeArea={true}
    >
      {/* Header */}
      <View style={StyleSheet.applyWidth({ alignItems: 'flex-start', flexDirection: 'row' }, dimensions.width)}>
        {/* Back */}
        <View style={StyleSheet.applyWidth(GlobalStyles.ViewStyles(theme)['PF-BackHeader'], dimensions.width)}>
          {/* Flex Frame for Touchable */}
          <View
            style={StyleSheet.applyWidth(
              { flexGrow: 1, flexShrink: 0, justifyContent: 'flex-start' },
              dimensions.width,
            )}
          >
            <Touchable onPress={navigation.goBack}>
              <Circle size={31} bgColor={theme.colors.communityIconBGColor}>
                <Icon name={'Ionicons/caret-back'} size={18} color={theme.colors.communityIconFill} />
              </Circle>
            </Touchable>
          </View>
        </View>
        {/* Profile */}
        <View
          style={StyleSheet.applyWidth(
            {
              alignItems: 'stretch',
              borderColor: theme.colors['Divider'],
              flexDirection: 'column',
              marginLeft: 10,
              marginTop: 10,
              width: '80%',
            },
            dimensions.width,
          )}
        >
          <PagalFanBEApi.FetchFetchSingleFanClubGET
            id={props.route?.params?.id ?? 1}
            onData={(fetchData) => {
              try {
                setTeam_initials((fetchData && fetchData[0])?.name_initials)
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
                return <Text style={{ textAlign: 'center' }}>There was a problem fetching this data</Text>
              }

              return (
                <>
                  {/* ProfileCard */}
                  <>
                    {!(fetchData && fetchData[0]) ? null : (
                      <View
                        style={StyleSheet.applyWidth(
                          {
                            alignContent: 'space-between',
                            alignItems: 'stretch',
                            flexDirection: 'column',
                            marginBottom: 10,
                            padding: 2,
                            width: 150,
                          },
                          dimensions.width,
                        )}
                      >
                        {/* Top */}
                        <View
                          style={StyleSheet.applyWidth(
                            {
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                            },
                            dimensions.width,
                          )}
                        >
                          <Image
                            style={StyleSheet.applyWidth({ borderRadius: 20, height: 80, width: 80 }, dimensions.width)}
                            resizeMode={'stretch'}
                            source={{
                              uri: `${(fetchData && fetchData[0])?.teams?.logo_path}`,
                            }}
                          />
                          <View
                            style={StyleSheet.applyWidth(
                              {
                                justifyContent: 'space-between',
                                marginLeft: 20,
                              },
                              dimensions.width,
                            )}
                          >
                            {/* Name */}
                            <Text
                              style={StyleSheet.applyWidth(
                                {
                                  color: theme.colors['PF-Grey'],
                                  fontFamily: 'Rubik_600SemiBold',
                                  fontSize: 16,
                                },
                                dimensions.width,
                              )}
                            >
                              {(fetchData && fetchData[0])?.name}
                            </Text>
                            {/* HomeGround */}
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
                              {(fetchData && fetchData[0])?.teams.home_ground}
                            </Text>
                            {/* Stats */}
                            <Text
                              style={StyleSheet.applyWidth(
                                {
                                  color: theme.colors.strong,
                                  fontFamily: 'Rubik_400Regular',
                                  fontSize: 12,
                                  marginBottom: 6,
                                  marginTop: 6,
                                },
                                dimensions.width,
                              )}
                            >
                              {follwersCount} Followers
                            </Text>

                            <View
                              style={StyleSheet.applyWidth(
                                {
                                  alignItems: 'flex-start',
                                  borderBottomWidth: 1,
                                  borderColor: theme.colors['Secondary'],
                                  borderLeftWidth: 1,
                                  borderRadius: 6,
                                  borderRightWidth: 1,
                                  borderTopWidth: 1,
                                  height: 22,
                                  justifyContent: 'center',
                                  marginRight: 4,
                                  width: 50,
                                },
                                dimensions.width,
                              )}
                            >
                              <Text
                                style={StyleSheet.applyWidth(
                                  {
                                    color: theme.colors['Strong'],
                                    fontFamily: 'Inter_400Regular',
                                    fontSize: 12,
                                    opacity: 0.75,
                                    padding: 2,
                                  },
                                  dimensions.width,
                                )}
                              >
                                {'Cricket'}
                              </Text>
                            </View>
                          </View>
                        </View>
                      </View>
                    )}
                  </>
                  {/* Follows Frame */}
                  <View
                    style={StyleSheet.applyWidth(GlobalStyles.ViewStyles(theme)['Follows Frame'], dimensions.width)}
                  >
                    <Pressable
                      onPress={() => {
                        const handler = async () => {
                          try {
                            const value4s0mHPCd = !clubfriend
                            setClubfriend(value4s0mHPCd)
                            const newfollowstatus = value4s0mHPCd
                            if (newfollowstatus) {
                              await pagalFanBEAddNewFanClubFollowsPOST.mutateAsync({
                                fanclubId: props.route?.params?.id ?? 1,
                                userId: Constants['LOGGED_IN_USER'],
                              })
                              snackbar.show({ title: 'Fanclub followed successfully' })
                            }
                            if (!newfollowstatus) {
                              await pagalFanBEDeleteFanClubFollowsDELETE.mutateAsync({
                                fanclubId: props.route?.params?.id ?? 1,
                                userId: Constants['LOGGED_IN_USER'],
                              })
                              snackbar.show({ title: 'Fanclub unfollowed successfully' })
                            }
                          } catch (err) {
                            console.error(err)
                          }
                        }
                        handler()
                      }}
                    >
                      <PagalFanBEApi.FetchFetchSingleFanClubFollowsGET
                        fanclubId={props.route?.params?.id ?? 1}
                        userId={Constants['LOGGED_IN_USER']}
                        onData={(fetchData) => {
                          try {
                            var b = false
                            setFollowersCount(fetchData.length)
                            fetchData.map((item) => {
                              if (
                                item.fanclub_id == props.route?.params?.id &&
                                item.user_id == Constants['LOGGED_IN_USER']
                              )
                                b = true
                            })
                            setClubfriend(b)
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
                            return <Text style={{ textAlign: 'center' }}>There was a problem fetching this data</Text>
                          }

                          return (
                            <>
                              {/* Following Frame */}
                              <>
                                {!clubfriend ? null : (
                                  <View>
                                    {/* Button Frame True */}
                                    <View
                                      style={StyleSheet.applyWidth(
                                        {
                                          backgroundColor: theme.colors['Secondary'],
                                          borderBottomWidth: 2,
                                          borderColor: theme.colors.communityPrimaryAlt,
                                          borderLeftWidth: 2,
                                          borderRadius: 64,
                                          borderRightWidth: 2,
                                          borderTopWidth: 2,
                                          flexDirection: 'row',
                                          justifyContent: 'center',
                                          paddingBottom: 10,
                                          paddingLeft: 10,
                                          paddingRight: 10,
                                          paddingTop: 10,
                                        },
                                        dimensions.width,
                                      )}
                                    >
                                      {/* Following Text */}
                                      <Text
                                        style={StyleSheet.applyWidth(
                                          {
                                            color: theme.colors['Background'],
                                            fontFamily: 'Rubik_400Regular',
                                            fontSize: 15,
                                            lineHeight: 21,
                                          },
                                          dimensions.width,
                                        )}
                                      >
                                        {'Following'}
                                      </Text>
                                      {/* Flex Frame for Icons */}
                                      <View
                                        style={StyleSheet.applyWidth(
                                          {
                                            justifyContent: 'center',
                                            marginLeft: 12,
                                          },
                                          dimensions.width,
                                        )}
                                      >
                                        <Icon
                                          color={theme.colors.communityPrimaryAlt}
                                          name={'Feather/user-check'}
                                          size={18}
                                        />
                                      </View>
                                    </View>
                                  </View>
                                )}
                              </>
                              {/* Follow Frame */}
                              <>
                                {clubfriend ? null : (
                                  <View>
                                    {/* Button Frame False */}
                                    <View
                                      style={StyleSheet.applyWidth(
                                        {
                                          backgroundColor: theme.colors['Secondary'],
                                          borderRadius: 64,
                                          flexDirection: 'row',
                                          justifyContent: 'center',
                                          paddingBottom: 12,
                                          paddingLeft: 12,
                                          paddingRight: 12,
                                          paddingTop: 12,
                                        },
                                        dimensions.width,
                                      )}
                                    >
                                      {/* Follow Text */}
                                      <Text
                                        style={StyleSheet.applyWidth(
                                          {
                                            color: theme.colors.communityWhite,
                                            fontFamily: 'Rubik_700Bold',
                                            fontSize: 15,
                                            lineHeight: 21,
                                          },
                                          dimensions.width,
                                        )}
                                      >
                                        {'Follow'}
                                      </Text>
                                      {/* Flex Frame for Icons */}
                                      <View
                                        style={StyleSheet.applyWidth(
                                          {
                                            alignItems: 'stretch',
                                            justifyContent: 'center',
                                            marginLeft: 12,
                                          },
                                          dimensions.width,
                                        )}
                                      >
                                        <Icon name={'FontAwesome/user'} size={18} color={theme.colors.communityWhite} />
                                      </View>
                                    </View>
                                  </View>
                                )}
                              </>
                            </>
                          )
                        }}
                      </PagalFanBEApi.FetchFetchSingleFanClubFollowsGET>
                    </Pressable>
                  </View>
                </>
              )
            }}
          </PagalFanBEApi.FetchFetchSingleFanClubGET>
        </View>
      </View>
      <Divider
        style={StyleSheet.applyWidth(
          StyleSheet.compose(GlobalStyles.DividerStyles(theme)['Divider'], {
            marginLeft: 80,
            marginTop: 10,
            width: '50%',
          }),
          dimensions.width,
        )}
        color={theme.colors['PF-Primary']}
      />
      <ScrollView bounces={true} showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
        {/* Feed */}
        <View style={StyleSheet.applyWidth(GlobalStyles.ViewStyles(theme)['PF-Feed'], dimensions.width)}>
          <ScrollView
            contentContainerStyle={StyleSheet.applyWidth({ flexDirection: 'column' }, dimensions.width)}
            bounces={true}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
          >
            <PagalFanBEApi.FetchFetchAllPostsTaggedByFanclubNameGET substring={team_initials}>
              {({ loading, error, data }) => {
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
                    listKey={'avX33S5V'}
                    keyExtractor={(listData) => listData?.id || listData?.uuid || JSON.stringify(listData)}
                    renderItem={({ item }) => <FeedCard feed={item} />}
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
            </PagalFanBEApi.FetchFetchAllPostsTaggedByFanclubNameGET>
          </ScrollView>
        </View>
      </ScrollView>
    </ScreenContainer>
  )
}

export default withTheme(FanClubSingleScreen)
