import React, { useState } from 'react'
import * as GlobalStyles from '../GlobalStyles.js'
import * as PagalFanBEApi from '../apis/PagalFanBEApi.js'
import * as GlobalVariables from '../config/GlobalVariableContext'
import Images from '../config/Images'
import TimeAgo from '../global-functions/TimeAgo'
import * as StyleSheet from '../utils/StyleSheet'
import openShareUtil from '../utils/openShare'
import {
  Circle,
  CircleImage,
  Divider,
  Icon,
  LinearGradient,
  Pressable,
  ScreenContainer,
  Touchable,
  withTheme,
} from '@draftbit/ui'
import {
  ActivityIndicator,
  FlatList,
  ImageBackground,
  Keyboard,
  ScrollView,
  Text,
  TextInput,
  View,
  useWindowDimensions,
  StyleSheet as RNStyleSheet,
} from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useSnackbar, Modal } from '../components'

const EMOTICONS = ['😀', '😠', '😭', '😳', '😎', '👍', '👎', '🙏']

const PostDetailsScreen = (props) => {
  const [likeCount, setLikesCount] = useState(0)
  const [commentsCount, setCommentsCount] = useState(0)

  const dimensions = useWindowDimensions()
  const Constants = GlobalVariables.useValues()
  const snackbar = useSnackbar()

  const { theme } = props
  const { navigation } = props

  const pagalFanBEAddPostLikePOST = PagalFanBEApi.useAddPostLikePOST()
  const pagalFanBEDeletePostLikeDELETE = PagalFanBEApi.useDeletePostLikeDELETE()
  const pagalFanBEAddNewCommentPOST = PagalFanBEApi.useAddNewCommentPOST()
  const pagalFanBEAddPostSavePOST = PagalFanBEApi.useAddPostSavePOST()
  const pagalFanBEDeletePostSaveDELETE = PagalFanBEApi.useDeletePostSaveDELETE()

  const [isLiked, setIsLiked] = React.useState(false)
  const [isSaved, setIsSaved] = React.useState(false)
  const [showShareModal, setShowShareModal] = React.useState(false)
  const [textInputValue, setTextInputValue] = React.useState('')

  function hideModal() {
    setShowShareModal(false)
  }

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

  return (
    <>
      <ScreenContainer
        style={StyleSheet.applyWidth(
          { marginBottom: 10, marginLeft: 10, marginRight: 10, marginTop: 10 },
          dimensions.width,
        )}
        hasSafeArea={true}
        scrollable={false}
      >
        <KeyboardAwareScrollView
          style={StyleSheet.applyWidth({ flexGrow: 0 }, dimensions.width)}
          contentContainerStyle={StyleSheet.applyWidth({ flexShrink: 2 }, dimensions.width)}
          enableOnAndroid={true}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps={'always'}
        >
          <PagalFanBEApi.FetchFetchSinglePostGET id={props.route?.params?.post_id ?? 1}>
            {({ loading, error, data, refetchFetchSinglePost }) => {
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
                  listKey={'GUkR33bu'}
                  keyExtractor={(listData) => listData?.id || listData?.uuid || JSON.stringify(listData)}
                  renderItem={({ item }) => {
                    const listData = item
                    return (
                      <>
                        {/* Navigation Frame */}
                        <View
                          style={StyleSheet.applyWidth(
                            { flexDirection: 'row', flexGrow: 0, flexShrink: 0 },
                            dimensions.width,
                          )}
                        >
                          {/* Left Frame */}
                          <View style={StyleSheet.applyWidth({ paddingBottom: 7, paddingTop: 7 }, dimensions.width)}>
                            {/* Back */}
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
                                    navigation.navigate('Tabs', {
                                      screen: 'HomeScreen',
                                    })
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
                            <Pressable
                              onPress={() => {
                                try {
                                  navigation.navigate('OthersProfileScreen', {
                                    userid: listData?.posted_by_id,
                                  })
                                } catch (err) {
                                  console.error(err)
                                }
                              }}
                            >
                              <View style={StyleSheet.applyWidth({ flexDirection: 'row' }, dimensions.width)}>
                                {/* Left Side */}
                                <View style={StyleSheet.applyWidth({ justifyContent: 'center' }, dimensions.width)}>
                                  {/* Circle Image Frame */}
                                  <View>
                                    {/* imgOP */}
                                    <CircleImage size={30} source={Images.IconProfile} />
                                  </View>
                                </View>
                                {/* Right Side */}
                                <View
                                  style={StyleSheet.applyWidth(
                                    { justifyContent: 'center', paddingLeft: 12 },
                                    dimensions.width,
                                  )}
                                >
                                  {/* NameandTimeAgo */}
                                  <View
                                    style={StyleSheet.applyWidth(
                                      {
                                        alignItems: 'center',
                                        flexDirection: 'row',
                                      },
                                      dimensions.width,
                                    )}
                                  >
                                    {/* nameOP */}
                                    <Text
                                      style={StyleSheet.applyWidth(
                                        {
                                          color: theme.colors.communityTrueOption,
                                          fontFamily: 'Rubik_700Bold',
                                          fontSize: 13,
                                          lineHeight: 19,
                                          marginRight: 14,
                                        },
                                        dimensions.width,
                                      )}
                                      numberOfLines={2}
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
                                  {/* handleOP */}
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
                                    {listData?.user_profiles?.handle}
                                  </Text>
                                </View>
                              </View>
                            </Pressable>
                          </View>
                          {/* Right Frame */}
                          <>
                            {!(listData?.posted_by_id === Constants['LOGGED_IN_USER']) ? null : (
                              <View
                                style={StyleSheet.applyWidth({ paddingBottom: 7, paddingTop: 7 }, dimensions.width)}
                              >
                                {/* Edit Post */}
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
                                        navigation.navigate('EditPostScreen', {
                                          post_id: props.route?.params?.post_id ?? 1,
                                        })
                                      } catch (err) {
                                        console.error(err)
                                      }
                                    }}
                                  >
                                    <Circle size={31} bgColor={theme.colors.communityIconBGColor}>
                                      <Icon name={'Ionicons/grid'} size={18} color={theme.colors.communityIconFill} />
                                    </Circle>
                                  </Touchable>
                                </View>
                              </View>
                            )}
                          </>
                        </View>
                        {/* Content Frame with Scroll */}
                        <ScrollView
                          bounces={true}
                          showsVerticalScrollIndicator={false}
                          showsHorizontalScrollIndicator={false}
                        >
                          {/* Image Frame */}
                          <View
                            style={StyleSheet.applyWidth(
                              {
                                alignItems: 'center',
                                flexGrow: 0,
                                flexShrink: 0,
                                paddingTop: 12,
                              },
                              dimensions.width,
                            )}
                          >
                            {/* Flex for Image */}
                            <View
                              style={StyleSheet.applyWidth(
                                {
                                  borderColor: theme.colors.background,
                                  borderRadius: 12,
                                  flexShrink: 0,
                                  height: 300,
                                  overflow: 'hidden',
                                  width: 350,
                                },
                                dimensions.width,
                              )}
                            >
                              <ImageBackground
                                style={StyleSheet.applyWidth(
                                  StyleSheet.compose(GlobalStyles.ImageBackgroundStyles(theme)['Image Background'], {
                                    flexBasis: 0,
                                    flexGrow: 1,
                                    flexShrink: 0,
                                  }),
                                  dimensions.width,
                                )}
                                source={{ uri: `${listData?.image_path}` }}
                                resizeMode={'contain'}
                              ></ImageBackground>
                            </View>
                          </View>
                          {/* Actions Frame */}
                          <View
                            style={StyleSheet.applyWidth(
                              {
                                backgroundColor: theme.colors.communityWhite,
                                borderRadius: 64,
                                flexDirection: 'row',
                                flexGrow: 0,
                                flexShrink: 0,
                                marginLeft: 36,
                                marginRight: 36,
                                marginTop: -30,
                                paddingBottom: 6,
                                paddingLeft: 12,
                                paddingRight: 12,
                                paddingTop: 6,
                                zIndex: 50,
                              },
                              dimensions.width,
                            )}
                          >
                            {/* LikesCountFrame */}
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
                              <Pressable
                                onPress={() => {
                                  const handler = async () => {
                                    try {
                                      const valueQwbJ5IFg = !isLiked
                                      setIsLiked(valueQwbJ5IFg)
                                      const newlike = valueQwbJ5IFg
                                      if (newlike) {
                                        snackbar.show({ title: 'Saving post like…' })
                                        await pagalFanBEAddPostLikePOST.mutateAsync({
                                          post_id: props.route?.params?.post_id ?? 1,
                                          user_id: Constants['LOGGED_IN_USER'],
                                        })
                                      }
                                      if (!newlike) {
                                        await pagalFanBEDeletePostLikeDELETE.mutateAsync({
                                          postId: props.route?.params?.post_id ?? 1,
                                          userId: Constants['LOGGED_IN_USER'],
                                        })
                                      }
                                    } catch (err) {
                                      console.error(err)
                                    }
                                  }
                                  handler()
                                }}
                              >
                                {/* Likes */}
                                <View
                                  style={StyleSheet.applyWidth(
                                    {
                                      flexDirection: 'row',
                                      flexGrow: 1,
                                      flexShrink: 0,
                                      paddingBottom: 12,
                                      paddingLeft: 12,
                                      paddingRight: 12,
                                      paddingTop: 12,
                                    },
                                    dimensions.width,
                                  )}
                                >
                                  {/* Left Side */}
                                  <View>
                                    <PagalFanBEApi.FetchFetchPostLikeGETCount
                                      postId={props.route?.params?.post_id ?? 1}
                                      userId={Constants['LOGGED_IN_USER']}
                                      onData={(fetchData) => {
                                        try {
                                          console.log(fetchData)
                                          let value0wzmJ6EV = false
                                          fetchData.map((item) => {
                                            if (
                                              item.post_id == props.route?.params?.post_id &&
                                              item.user_id == Constants['LOGGED_IN_USER']
                                            )
                                              value0wzmJ6EV = true
                                          })
                                          setLikesCount(fetchData.length)
                                          setIsLiked(value0wzmJ6EV)
                                          const newlikestatus = value0wzmJ6EV
                                          console.log(newlikestatus)
                                        } catch (err) {
                                          console.error(err)
                                        }
                                      }}
                                    >
                                      {({ loading, error, data, refetchFetchPostLike }) => {
                                        const fetchData = data
                                        if (!fetchData || loading) {
                                          return <ActivityIndicator />
                                        }

                                        if (error) {
                                          return (
                                            <Text style={{ textAlign: 'center' }}>
                                              There was a problem fetching this data
                                            </Text>
                                          )
                                        }

                                        return (
                                          <>
                                            {/* Flex Frame for Icons */}
                                            <View
                                              style={StyleSheet.applyWidth(
                                                {
                                                  flexDirection: 'row',
                                                  width: 20,
                                                },
                                                dimensions.width,
                                              )}
                                            >
                                              {/* heart-outline */}
                                              <>
                                                {isLiked ? null : (
                                                  <Icon
                                                    size={18}
                                                    color={theme.colors.communityDarkRed}
                                                    name={'Feather/heart'}
                                                  />
                                                )}
                                              </>
                                              {/* heart-filled */}
                                              <>
                                                {!isLiked ? null : (
                                                  <Icon
                                                    size={18}
                                                    color={theme.colors.communityDarkRed}
                                                    name={'FontAwesome/heart'}
                                                  />
                                                )}
                                              </>
                                            </View>
                                          </>
                                        )
                                      }}
                                    </PagalFanBEApi.FetchFetchPostLikeGETCount>
                                  </View>
                                  {/* Data Point Frame */}
                                  <View style={StyleSheet.applyWidth({ marginLeft: 6 }, dimensions.width)}>
                                    {/* LikesCount */}
                                    <Text
                                      style={StyleSheet.applyWidth(
                                        {
                                          color: theme.colors.communityTrueOption,
                                          fontFamily: 'Inter_400Regular',
                                          fontSize: 12,
                                          lineHeight: 18,
                                        },
                                        dimensions.width,
                                      )}
                                    >
                                      {likeCount}
                                    </Text>
                                  </View>
                                </View>
                              </Pressable>
                            </View>
                            {/* CommentsCountFrame */}
                            <View style={StyleSheet.applyWidth({ flexGrow: 1, flexShrink: 0 }, dimensions.width)}>
                              {/* Action 1 Frame */}
                              <View
                                style={StyleSheet.applyWidth(
                                  {
                                    flexDirection: 'row',
                                    flexGrow: 1,
                                    flexShrink: 0,
                                    paddingBottom: 12,
                                    paddingLeft: 12,
                                    paddingRight: 12,
                                    paddingTop: 12,
                                  },
                                  dimensions.width,
                                )}
                              >
                                {/* Left Side */}
                                <View>
                                  {/* Flex Frame for Icons */}
                                  <View>
                                    <Icon
                                      name={'MaterialCommunityIcons/message-bulleted'}
                                      size={18}
                                      color={theme.colors.communityHighlightBlue}
                                    />
                                  </View>
                                </View>
                                {/* Data Point Frame */}
                                <View style={StyleSheet.applyWidth({ marginLeft: 6 }, dimensions.width)}>
                                  <PagalFanBEApi.FetchFetchAllCommentsForAPostGET
                                    id={props.route?.params?.post_id ?? 1}
                                  >
                                    {({ loading, error, data, refetchFetchAllCommentsForAPost }) => {
                                      const fetchData = data
                                      if (fetchData) setCommentsCount(fetchData.length)
                                    }}
                                  </PagalFanBEApi.FetchFetchAllCommentsForAPostGET>
                                  {/* CommentsCount */}
                                  <Text
                                    style={StyleSheet.applyWidth(
                                      {
                                        color: theme.colors.communityTrueOption,
                                        fontFamily: 'Inter_400Regular',
                                        fontSize: 12,
                                        lineHeight: 18,
                                      },
                                      dimensions.width,
                                    )}
                                  >
                                    {commentsCount}
                                  </Text>
                                </View>
                              </View>
                            </View>
                            {/* ViewsCountFrame */}
                            <View style={StyleSheet.applyWidth({ flexGrow: 1, flexShrink: 0 }, dimensions.width)}>
                              {/* Action 1 Frame */}
                              <View
                                style={StyleSheet.applyWidth(
                                  {
                                    flexDirection: 'row',
                                    flexGrow: 1,
                                    flexShrink: 0,
                                    paddingBottom: 12,
                                    paddingLeft: 12,
                                    paddingRight: 12,
                                    paddingTop: 12,
                                  },
                                  dimensions.width,
                                )}
                              >
                                {/* Left Side */}
                                <View>
                                  {/* Flex Frame for Icons */}
                                  <View>
                                    <Icon name={'AntDesign/eye'} size={18} color={theme.colors.communityYellow} />
                                  </View>
                                </View>
                                {/* Data Point Frame */}
                                <View style={StyleSheet.applyWidth({ marginLeft: 6 }, dimensions.width)}>
                                  {/* ViewsCount */}
                                  <Text
                                    style={StyleSheet.applyWidth(
                                      {
                                        color: theme.colors.communityTrueOption,
                                        fontFamily: 'Inter_400Regular',
                                        fontSize: 12,
                                        lineHeight: 18,
                                      },
                                      dimensions.width,
                                    )}
                                  >
                                    {'104k'}
                                  </Text>
                                </View>
                              </View>
                            </View>
                            {/* ShareFrame */}
                            <View style={StyleSheet.applyWidth({ flexGrow: 1, flexShrink: 0 }, dimensions.width)}>
                              <Pressable
                                onPress={() => {
                                  try {
                                    setShowShareModal(true)
                                  } catch (err) {
                                    console.error(err)
                                  }
                                }}
                              >
                                {/* Action 1 Frame */}
                                <View
                                  style={StyleSheet.applyWidth(
                                    {
                                      flexDirection: 'row',
                                      flexGrow: 1,
                                      flexShrink: 0,
                                      paddingBottom: 12,
                                      paddingLeft: 12,
                                      paddingRight: 12,
                                      paddingTop: 12,
                                    },
                                    dimensions.width,
                                  )}
                                >
                                  {/* Left Side */}
                                  <View>
                                    {/* Flex Frame for Icons */}
                                    <View>
                                      <Icon name={'Ionicons/share'} size={18} color={theme.colors.communityIconFill} />
                                    </View>
                                  </View>
                                </View>
                              </Pressable>
                            </View>
                          </View>
                          {/* Three Tabs Gradient for Aesthetic */}
                          <View
                            style={StyleSheet.applyWidth(
                              {
                                borderBottomLeftRadius: 24,
                                borderBottomRightRadius: 24,
                                flexGrow: 0,
                                flexShrink: 0,
                                height: 36,
                                marginLeft: 36,
                                marginRight: 36,
                                marginTop: -30,
                              },
                              dimensions.width,
                            )}
                          >
                            <LinearGradient
                              style={StyleSheet.applyWidth(
                                {
                                  borderBottomLeftRadius: 24,
                                  borderBottomRightRadius: 24,
                                  height: '100%',
                                  width: '100%',
                                },
                                dimensions.width,
                              )}
                              startY={0}
                              color1={theme.colors.communityWhite}
                              color2={theme.colors.communityStoneGray}
                            />
                          </View>
                          {/* Post Frame */}
                          <View
                            style={StyleSheet.applyWidth(
                              {
                                alignContent: 'flex-start',
                                flexGrow: 0,
                                flexShrink: 0,
                                paddingBottom: 12,
                                paddingLeft: 4,
                                paddingRight: 4,
                                paddingTop: 18,
                              },
                              dimensions.width,
                            )}
                          >
                            {/* Content Frame */}
                            <View>
                              {/* postCaption */}
                              <Text
                                style={StyleSheet.applyWidth(
                                  {
                                    color: theme.colors.communityTrueOption,
                                    fontFamily: 'Rubik_400Regular',
                                    fontSize: 11,
                                    lineHeight: 12,
                                  },
                                  dimensions.width,
                                )}
                              >
                                {listData?.caption}
                              </Text>
                            </View>
                          </View>
                          {/* CommentsFrame */}
                          <View style={StyleSheet.applyWidth({ flexGrow: 1, flexShrink: 1 }, dimensions.width)}>
                            {/* Keyboard Component Frame */}
                            <View style={StyleSheet.applyWidth({ flexGrow: 1, flexShrink: 0 }, dimensions.width)}>
                              {renderEmoticons()}
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
                                {/* CommentInput */}
                                <View style={StyleSheet.applyWidth({ flexGrow: 1, flexShrink: 0 }, dimensions.width)}>
                                  {/* CommentText */}
                                  <TextInput
                                    onChangeText={(newCommentTextValue) => {
                                      try {
                                        setTextInputValue(newCommentTextValue)
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
                                    value={textInputValue}
                                    placeholderTextColor={theme.colors.communityLightBlack}
                                  />
                                </View>
                                {/* SendFrame */}
                                <View style={StyleSheet.applyWidth({ flexGrow: 0, flexShrink: 0 }, dimensions.width)}>
                                  <Touchable
                                    onPress={() => {
                                      const handler = async () => {
                                        try {
                                          snackbar.show({ title: 'Uploading comment …' })
                                          await pagalFanBEAddNewCommentPOST.mutateAsync({
                                            comment_text: textInputValue,
                                            post_id: props.route?.params?.post_id ?? 1,
                                            user_id: Constants['LOGGED_IN_USER'],
                                          })
                                          Keyboard.dismiss()
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

                            <PagalFanBEApi.FetchFetchAllCommentsForAPostGET id={props.route?.params?.post_id ?? 1}>
                              {({ loading, error, data, refetchFetchAllCommentsForAPost }) => {
                                const fetchData = data
                                if (!fetchData || loading) {
                                  return <ActivityIndicator />
                                }

                                if (error) {
                                  return (
                                    <Text style={{ textAlign: 'center' }}>There was a problem fetching this data</Text>
                                  )
                                }

                                return (
                                  <FlatList
                                    data={fetchData}
                                    listKey={JSON.stringify(fetchData)}
                                    keyExtractor={(listData) =>
                                      listData?.id || listData?.uuid || JSON.stringify(listData)
                                    }
                                    renderItem={({ item }) => {
                                      const listData = item
                                      return (
                                        <>
                                          {/* Record Frame */}
                                          <View
                                            style={StyleSheet.applyWidth(
                                              { flexGrow: 0, flexShrink: 0 },
                                              dimensions.width,
                                            )}
                                          >
                                            {/* Message Frame */}
                                            <View
                                              style={StyleSheet.applyWidth(
                                                {
                                                  flexDirection: 'row',
                                                  flexGrow: 1,
                                                  flexShrink: 0,
                                                  paddingTop: 10,
                                                },
                                                dimensions.width,
                                              )}
                                            >
                                              {/* Left Side Frame */}
                                              <View>
                                                {/* Flex Frame for Touchable */}
                                                <View>
                                                  <Pressable
                                                    onPress={() => {
                                                      try {
                                                        if (
                                                          listData?.user_profiles?.user_id !==
                                                          Constants['LOGGED_IN_USER']
                                                        ) {
                                                          navigation.navigate('OthersProfileScreen', {
                                                            userid: listData?.user_profiles?.user_id,
                                                          })
                                                        }
                                                        if (
                                                          listData?.user_profiles?.user_id ===
                                                          Constants['LOGGED_IN_USER']
                                                        ) {
                                                          navigation.navigate('Tabs', {
                                                            screen: 'MyProfileScreen',
                                                          })
                                                        }
                                                      } catch (err) {
                                                        console.error(err)
                                                      }
                                                    }}
                                                  >
                                                    {/* Commenter Image */}
                                                    <View
                                                      style={StyleSheet.applyWidth(
                                                        {
                                                          flexGrow: 1,
                                                          flexShrink: 0,
                                                          paddingBottom: 12,
                                                          paddingLeft: 12,
                                                          paddingRight: 6,
                                                          paddingTop: 18,
                                                        },
                                                        dimensions.width,
                                                      )}
                                                    >
                                                      {listData?.user_profiles?.profile_image && (
                                                        <CircleImage
                                                          size={36}
                                                          source={{
                                                            uri: `${listData.user_profiles.profile_image}`,
                                                          }}
                                                        />
                                                      )}
                                                    </View>
                                                  </Pressable>
                                                </View>
                                              </View>
                                              {/* Commenter Details */}
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
                                                  {/* NameandTimeago */}
                                                  <View
                                                    style={StyleSheet.applyWidth(
                                                      {
                                                        alignItems: 'center',
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
                                                          fontFamily: 'Inter_600SemiBold',
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
                                                        fontFamily: 'Inter_400Regular',
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
                            </PagalFanBEApi.FetchFetchAllCommentsForAPostGET>
                          </View>
                        </ScrollView>
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
          </PagalFanBEApi.FetchFetchSinglePostGET>
        </KeyboardAwareScrollView>
      </ScreenContainer>
      {/* ShareModal */}
      <Modal visible={showShareModal} onDismiss={hideModal}>
        <View
          style={StyleSheet.applyWidth(
            {
              backgroundColor: theme.colors['Background'],
              borderColor: theme.colors['Border Color'],
              borderLeftWidth: 1,
              borderRightWidth: 1,
              borderTopLeftRadius: 24,
              borderTopRightRadius: 24,
              borderTopWidth: 1,
              bottom: 0,
              height: 150,
              left: 0,
              paddingBottom: 5,
              paddingLeft: 20,
              paddingRight: 20,
              paddingTop: 5,
              position: 'absolute',
              right: 0,
              width: '100%',
            },
            dimensions.width,
          )}
        >
          {/* HorLine */}
          <View
            style={StyleSheet.applyWidth(
              {
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'row',
                height: 20,
                marginBottom: 20,
              },
              dimensions.width,
            )}
          >
            <Icon
              style={StyleSheet.applyWidth({ marginTop: 2, top: -8 }, dimensions.width)}
              name={'MaterialIcons/horizontal-rule'}
              color={theme.colors['PF-Grey']}
              size={36}
            />
          </View>
          {/* ActionLinks */}
          <View
            style={StyleSheet.applyWidth(
              StyleSheet.compose(GlobalStyles.ViewStyles(theme)['AddaCard'], {
                flexDirection: 'row',
                justifyContent: 'space-around',
              }),
              dimensions.width,
            )}
          >
            {/* PressableShare */}
            <Pressable
              onPress={() => {
                const handler = async () => {
                  try {
                    await openShareUtil(`Check out this post on PagalFan
draftbit://PostDetailsScreen/:${props.route?.params?.post_id ?? 1}`)
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
                    borderBottomWidth: 1,
                    borderColor: theme.colors['PF-Grey'],
                    borderLeftWidth: 1,
                    borderRadius: 50,
                    borderRightWidth: 1,
                    borderTopWidth: 1,
                    height: 50,
                    justifyContent: 'center',
                    width: 50,
                  },
                  dimensions.width,
                )}
              >
                <Icon size={24} name={'AntDesign/sharealt'} color={theme.colors['PF-Grey']} />
              </View>

              <Text
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                    alignSelf: 'center',
                    color: theme.colors['PF-Grey'],
                    fontFamily: 'Rubik_400Regular',
                    fontSize: 12,
                    marginTop: 2,
                  }),
                  dimensions.width,
                )}
              >
                {'Share'}
              </Text>
            </Pressable>
            {/* PressableSave */}
            <Pressable
              onPress={() => {
                const handler = async () => {
                  try {
                    const valueWbd6vXTs = !isSaved
                    const newsaved = valueWbd6vXTs
                    if (newsaved) {
                      snackbar.show({ title: 'Saving post …' })
                      await pagalFanBEAddPostSavePOST.mutateAsync({
                        post_id: props.route?.params?.post_id ?? 1,
                        user_id: Constants['LOGGED_IN_USER'],
                      })
                    }
                    if (!newsaved) {
                      await pagalFanBEDeletePostSaveDELETE.mutateAsync({
                        postId: props.route?.params?.post_id ?? 1,
                        userId: Constants['LOGGED_IN_USER'],
                      })
                    }
                    setIsSaved(newsaved)
                  } catch (err) {
                    console.error(err)
                  }
                }
                handler()
              }}
            >
              <PagalFanBEApi.FetchFetchPostSaveGET
                postId={props.route?.params?.post_id ?? 1}
                userId={Constants['LOGGED_IN_USER']}
                onData={(fetchData) => {
                  try {
                    const valuedy0iqvgX = fetchData?.length > 0
                    setIsSaved(valuedy0iqvgX)
                    const savedstatus = valuedy0iqvgX
                  } catch (err) {
                    console.error(err)
                  }
                }}
              >
                {({ loading, error, data, refetchFetchPostSave }) => {
                  const fetchData = data
                  if (!fetchData || loading) {
                    return <ActivityIndicator />
                  }

                  if (error) {
                    return <Text style={{ textAlign: 'center' }}>There was a problem fetching this data</Text>
                  }

                  return (
                    <>
                      {/* IconView */}
                      <View
                        style={StyleSheet.applyWidth(
                          {
                            alignItems: 'center',
                            borderBottomWidth: 1,
                            borderColor: theme.colors['PF-Grey'],
                            borderLeftWidth: 1,
                            borderRadius: 50,
                            borderRightWidth: 1,
                            borderTopWidth: 1,
                            flexDirection: 'row',
                            height: 50,
                            justifyContent: 'center',
                            width: 50,
                          },
                          dimensions.width,
                        )}
                      >
                        {/* unsaved */}
                        <>
                          {isSaved ? null : (
                            <Icon size={24} color={theme.colors['PF-Grey']} name={'Ionicons/bookmark-outline'} />
                          )}
                        </>
                        {/* saved */}
                        <>
                          {!isSaved ? null : (
                            <Icon size={24} color={theme.colors['PF-Grey']} name={'Ionicons/bookmark'} />
                          )}
                        </>
                      </View>
                      {/* TextView */}
                      <View
                        style={StyleSheet.applyWidth(
                          {
                            flexDirection: 'row',
                            justifyContent: 'center',
                          },
                          dimensions.width,
                        )}
                      >
                        {/* Save */}
                        <>
                          {isSaved ? null : (
                            <Text
                              style={StyleSheet.applyWidth(
                                StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                                  alignSelf: 'center',
                                  color: theme.colors['PF-Grey'],
                                  fontFamily: 'Rubik_400Regular',
                                  fontSize: 12,
                                  marginTop: 2,
                                }),
                                dimensions.width,
                              )}
                            >
                              {'Save'}
                            </Text>
                          )}
                        </>
                        {/* Unsave */}
                        <>
                          {!isSaved ? null : (
                            <Text
                              style={StyleSheet.applyWidth(
                                StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                                  alignSelf: 'center',
                                  color: theme.colors['PF-Grey'],
                                  fontFamily: 'Rubik_400Regular',
                                  fontSize: 12,
                                  marginTop: 2,
                                }),
                                dimensions.width,
                              )}
                            >
                              {'Unsave'}
                            </Text>
                          )}
                        </>
                      </View>
                    </>
                  )
                }}
              </PagalFanBEApi.FetchFetchPostSaveGET>
            </Pressable>
            {/* PressableReport */}
            <Pressable
              onPress={() => {
                snackbar.show({ title: 'Reporting post to admin…' })
              }}
            >
              <View
                style={StyleSheet.applyWidth(
                  {
                    alignItems: 'center',
                    borderBottomWidth: 1,
                    borderColor: theme.colors['Community_Dark_Red'],
                    borderLeftWidth: 1,
                    borderRadius: 50,
                    borderRightWidth: 1,
                    borderTopWidth: 1,
                    height: 50,
                    justifyContent: 'center',
                    width: 50,
                  },
                  dimensions.width,
                )}
              >
                <Icon size={24} name={'Octicons/report'} color={theme.colors['Community_Dark_Red']} />
              </View>

              <Text
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                    alignSelf: 'center',
                    color: theme.colors['Community_Dark_Red'],
                    fontFamily: 'Rubik_400Regular',
                    fontSize: 12,
                    marginTop: 2,
                  }),
                  dimensions.width,
                )}
              >
                {'Report...'}
              </Text>
            </Pressable>
          </View>
          <Divider
            style={StyleSheet.applyWidth(GlobalStyles.DividerStyles(theme)['Divider'], dimensions.width)}
            color={theme.colors['PF-Grey']}
          />
        </View>
      </Modal>
    </>
  )
}

const styles = RNStyleSheet.create({
  emoticonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    height: 50,
  },
  emoticon: {
    fontSize: 25,
  },
})

export default withTheme(PostDetailsScreen)
