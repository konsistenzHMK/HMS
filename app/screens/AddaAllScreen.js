import React from 'react'
import * as GlobalStyles from '../GlobalStyles.js'
import * as StyleSheet from '../utils/StyleSheet'
import { Divider, Icon, Pressable, ScreenContainer, withTheme } from '@draftbit/ui'
import { Text, View, useWindowDimensions } from 'react-native'

const AddaAllScreen = (props) => {
  const dimensions = useWindowDimensions()

  const { theme } = props
  const { navigation } = props

  return (
    <ScreenContainer
      style={StyleSheet.applyWidth({ marginLeft: 10, marginRight: 10, marginTop: 10 }, dimensions.width)}
      scrollable={false}
      hasSafeArea={true}
    >
      {/* Header */}
      <View style={StyleSheet.applyWidth(GlobalStyles.ViewStyles(theme)['PF-GoBack 3'], dimensions.width)}>
        {/* Left Section */}
        <View style={StyleSheet.applyWidth({ alignItems: 'center', flexDirection: 'row' }, dimensions.width)}>
          <Pressable
            onPress={() => {
              try {
                navigation.navigate('RootNavigator')
              } catch (err) {
                console.error(err)
              }
            }}
          >
            <Icon name={'AntDesign/arrowleft'} size={24} />
          </Pressable>
        </View>
      </View>
      {/* Events */}
      <View>
        {/* Title */}
        <View>
          <Text
            style={StyleSheet.applyWidth(
              StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                fontFamily: 'Inter_600SemiBold',
                fontSize: 20,
              }),
              dimensions.width,
            )}
          >
            {'upcoming for you'}
          </Text>
        </View>
        {/* Live */}
        <View style={StyleSheet.applyWidth({ marginBottom: 18, marginTop: 18, paddingRight: 18 }, dimensions.width)}>
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
                  width: 60,
                },
                dimensions.width,
              )}
            >
              <Text
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                    color: theme.colors['PF-BG'],
                    fontFamily: 'Inter_600SemiBold',
                    fontSize: 14,
                  }),
                  dimensions.width,
                )}
              >
                {'live\n'}
              </Text>
              <Icon size={24} name={'Ionicons/ios-radio-outline'} color={theme.colors['PF-BG']} />
            </View>

            <Text
              style={StyleSheet.applyWidth(
                StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                  color: theme.colors['Secondary'],
                  fontFamily: 'Inter_700Bold',
                  fontSize: 12,
                }),
                dimensions.width,
              )}
            >
              {'Join Now'}
            </Text>
          </View>
          {/* EventTitle */}
          <Text
            style={StyleSheet.applyWidth(
              StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                color: theme.colors['Strong'],
                fontFamily: 'Rubik_600SemiBold',
                fontSize: 14,
              }),
              dimensions.width,
            )}
          >
            {'Ind-Aus Day 1 - Before Toss'}
          </Text>

          <Text
            style={StyleSheet.applyWidth(
              StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                color: theme.colors['Strong'],
                fontFamily: 'Rubik_400Regular_Italic',
                fontSize: 12,
              }),
              dimensions.width,
            )}
          >
            {
              'Time for the toss. All three Tests so far have been won by sides losing the toss. Might a team be tempted to bowl after winning the toss?'
            }
          </Text>
        </View>
        <Divider
          style={StyleSheet.applyWidth(
            StyleSheet.compose(GlobalStyles.DividerStyles(theme)['Divider'], {
              marginLeft: 80,
              width: '50%',
            }),
            dimensions.width,
          )}
          color={theme.colors['PF-Primary']}
        />
        {/* Future */}
        <View style={StyleSheet.applyWidth({ marginBottom: 18, marginTop: 18, paddingRight: 18 }, dimensions.width)}>
          <Text
            style={StyleSheet.applyWidth(
              StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                color: theme.colors['Studily_Light_Navy_Secondary'],
                fontFamily: 'Inter_600SemiBold',
                fontSize: 16,
                marginBottom: 18,
              }),
              dimensions.width,
            )}
          >
            {'coming soon\n'}
          </Text>
          {/* AddaCard */}
          <View style={StyleSheet.applyWidth({ marginBottom: 18 }, dimensions.width)}>
            {/* DateBadgeView */}
            <View
              style={StyleSheet.applyWidth(
                {
                  alignContent: 'flex-start',
                  alignItems: 'center',
                  backgroundColor: '"rgba(0, 0, 0, 0)"',
                  flexDirection: 'row',
                  height: 20,
                  justifyContent: 'space-between',
                  marginBottom: 5,
                },
                dimensions.width,
              )}
            >
              <Text
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                    fontFamily: 'Inter_600SemiBold',
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
                  color: theme.colors['Strong'],
                  fontFamily: 'Rubik_600SemiBold',
                  fontSize: 14,
                }),
                dimensions.width,
              )}
            >
              {'Ind-Aus Day 2 - Before Start'}
            </Text>

            <Text
              style={StyleSheet.applyWidth(
                StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                  color: theme.colors['Strong'],
                  fontFamily: 'Rubik_400Regular_Italic',
                  fontSize: 12,
                }),
                dimensions.width,
              )}
            >
              {
                'Time for the toss. All three Tests so far have been won by sides losing the toss. Might a team be tempted to bowl after winning the toss?'
              }
            </Text>
          </View>
          {/* AddaCard */}
          <View style={StyleSheet.applyWidth({ marginBottom: 18 }, dimensions.width)}>
            {/* DateBadgeView */}
            <View
              style={StyleSheet.applyWidth(
                {
                  alignContent: 'flex-start',
                  alignItems: 'center',
                  backgroundColor: '"rgba(0, 0, 0, 0)"',
                  flexDirection: 'row',
                  height: 20,
                  justifyContent: 'space-between',
                  marginBottom: 5,
                },
                dimensions.width,
              )}
            >
              <Text
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                    fontFamily: 'Inter_600SemiBold',
                  }),
                  dimensions.width,
                )}
              >
                {'tomorrow 5:30 pm'}
              </Text>
              <Icon size={24} name={'FontAwesome/calendar-plus-o'} />
            </View>
            {/* EventTitle */}
            <Text
              style={StyleSheet.applyWidth(
                StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                  color: theme.colors['Strong'],
                  fontFamily: 'Rubik_600SemiBold',
                  fontSize: 14,
                }),
                dimensions.width,
              )}
            >
              {'Ind-Aus Day 2 - Day End'}
            </Text>

            <Text
              style={StyleSheet.applyWidth(
                StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                  color: theme.colors['Strong'],
                  fontFamily: 'Rubik_400Regular_Italic',
                  fontSize: 12,
                }),
                dimensions.width,
              )}
            >
              {
                'Time for the toss. All three Tests so far have been won by sides losing the toss. Might a team be tempted to bowl after winning the toss?'
              }
            </Text>
          </View>
        </View>
      </View>
    </ScreenContainer>
  )
}

export default withTheme(AddaAllScreen)
