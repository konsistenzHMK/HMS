import React from 'react'
import * as GlobalStyles from '../GlobalStyles.js'
import * as PagalFanBEApi from '../apis/PagalFanBEApi.js'
import * as GlobalVariables from '../config/GlobalVariableContext'
import * as StyleSheet from '../utils/StyleSheet'
import {
  Circle,
  Divider,
  Icon,
  IconButton,
  Pressable,
  ScreenContainer,
  Surface,
  Touchable,
  withTheme,
} from '@draftbit/ui'
import {
  ActivityIndicator,
  FlatList,
  ImageBackground,
  ScrollView,
  Text,
  TextInput,
  View,
  useWindowDimensions,
} from 'react-native'

const SearchScreen = (props) => {
  const dimensions = useWindowDimensions()
  const Constants = GlobalVariables.useValues()
  const Variables = Constants

  const FilterList = (list) => {
    if (list.length) {
      return list?.filter((item) => item.caption.toLowerCase().includes(textInputValue.toLowerCase()))
    }
    return list
  }

  const { theme } = props
  const { navigation } = props

  const [textInputValue, setTextInputValue] = React.useState('')

  return (
    <ScreenContainer
      style={StyleSheet.applyWidth(
        {
          backgroundColor: theme.colors['PF-BG'],
          marginLeft: 10,
          marginRight: 10,
          marginTop: 10,
        },
        dimensions.width,
      )}
      hasSafeArea={false}
      hasTopSafeArea={true}
      hasBottomSafeArea={true}
      scrollable={true}
    >
      {/* PF-BackHeader */}
      <View style={StyleSheet.applyWidth(GlobalStyles.ViewStyles(theme)['PF-BackHeader 8'], dimensions.width)}>
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
      {/* Search and Filter */}
      <View style={StyleSheet.applyWidth({ flexDirection: 'row' }, dimensions.width)}>
        {/* SearchView */}
        <View style={StyleSheet.applyWidth({ flex: 1, flexDirection: 'column' }, dimensions.width)}>
          <View
            style={StyleSheet.applyWidth(
              {
                alignItems: 'center',
                borderBottomWidth: 1,
                borderColor: theme.colors['BG Gray'],
                borderLeftWidth: 1,
                borderRadius: 16,
                borderRightWidth: 1,
                borderTopWidth: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingLeft: 10,
                paddingRight: 10,
              },
              dimensions.width,
            )}
          >
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
                  borderBottomWidth: 0,
                  borderLeftWidth: 0,
                  borderRightWidth: 0,
                  borderTopWidth: 0,
                  color: theme.colors['Custom #5f5a53'],
                  fontFamily: 'Rubik_400Regular',
                  fontSize: 12,
                  width: '100%',
                }),
                dimensions.width,
              )}
              placeholder={'Search anything...'}
              value={textInputValue}
              autoCapitalize={'none'}
              placeholderTextColor={theme.colors['PF-Grey']}
            />
            <Icon size={24} name={'Feather/filter'} color={theme.colors['PF-Grey']} />
          </View>
        </View>
      </View>
      <Divider
        style={StyleSheet.applyWidth(
          StyleSheet.compose(GlobalStyles.DividerStyles(theme)['Divider'], {
            height: 0.5,
            marginBottom: 10,
            marginLeft: 80,
            marginTop: 10,
            width: '50%',
          }),
          dimensions.width,
        )}
        color={theme.colors['PF-Grey']}
      />
      {/* PF-Feed */}
      <View style={StyleSheet.applyWidth(GlobalStyles.ViewStyles(theme)['PF-Feed 4'], dimensions.width)}>
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
                return <ActivityIndicator />
              }

              if (error) {
                return <Text style={{ textAlign: 'center' }}>There was a problem fetching this data</Text>
              }

              return (
                <FlatList
                  data={FilterList(fetchData)}
                  listKey={'IZLOjasU'}
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
    </ScreenContainer>
  )
}

export default withTheme(SearchScreen)
