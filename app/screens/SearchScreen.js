import React, { useEffect, useState } from 'react'
import * as GlobalStyles from '../GlobalStyles.js'
import * as PagalFanBEApi from '../apis/PagalFanBEApi.js'
import * as StyleSheet from '../utils/StyleSheet'
import { Circle, Divider, Icon, ScreenContainer, Touchable, withTheme } from '@draftbit/ui'
import { ActivityIndicator, FlatList, ScrollView, Text, TextInput, View, useWindowDimensions } from 'react-native'
import { FeedCard } from '../shared'
import * as GlobalVariables from '../config/GlobalVariableContext'

const SearchScreen = (props) => {
  const Constants = GlobalVariables.useValues()
  const dimensions = useWindowDimensions()

  const FilterList = (list) => {
    if (list.length) {
      return list?.filter((item) => item.caption.toLowerCase().includes(textInputValue.toLowerCase()))
    }
    return list
  }

  const { theme } = props
  const { navigation } = props
  const [posts, setPosts] = useState([])

  const [textInputValue, setTextInputValue] = React.useState('')

  useEffect(() => {
    fetch('https://pvbtcdjiibcaleqjdrih.supabase.co/rest/v1/posts?caption=ilike.*' + textInputValue + '*', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        apiKey: Constants['API_KEY_HEADER'],
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (textInputValue !== '') setPosts(data || [])
      })
  }, [textInputValue])

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
              onChangeText={setTextInputValue}
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
                  data={posts.length > 0 ? posts : FilterList(fetchData)}
                  listKey={'IZLOjasU'}
                  keyExtractor={(listData) => listData?.id}
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
          </PagalFanBEApi.FetchFetchAllPostsGET>
        </ScrollView>
      </View>
    </ScreenContainer>
  )
}

export default withTheme(SearchScreen)
