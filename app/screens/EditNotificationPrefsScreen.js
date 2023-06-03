import React from 'react'
import * as GlobalStyles from '../GlobalStyles.js'
import Breakpoints from '../utils/Breakpoints'
import * as StyleSheet from '../utils/StyleSheet'
import { Circle, Divider, Icon, Link, ScreenContainer, Switch, Touchable, withTheme } from '@draftbit/ui'
import { Text, View, useWindowDimensions } from 'react-native'

const EditNotificationPrefsScreen = (props) => {
  const dimensions = useWindowDimensions()

  const { theme } = props
  const { navigation } = props

  return (
    <ScreenContainer
      style={StyleSheet.applyWidth({ marginLeft: 10, marginRight: 10 }, dimensions.width)}
      scrollable={true}
      hasSafeArea={true}
    >
      {/* PF-BackHeader */}
      <View
        style={StyleSheet.applyWidth(
          StyleSheet.compose(GlobalStyles.ViewStyles(theme)['PF-BackHeader 4'], { alignItems: 'stretch' }),
          dimensions.width,
        )}
      >
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
      {/* Heading */}
      <View
        style={StyleSheet.applyWidth({ alignItems: 'center', paddingBottom: 24, paddingTop: 44 }, dimensions.width)}
      >
        {/* Notifications */}
        <Text
          style={StyleSheet.applyWidth(
            {
              color: theme.colors.strong,
              typography: theme.typography.headline4,
            },
            dimensions.width,
          )}
        >
          {'Notifications'}
        </Text>
      </View>
      {/* Notifications */}
      <View
        style={StyleSheet.applyWidth(
          {
            paddingBottom: 24,
            paddingLeft: 32,
            paddingRight: 32,
            paddingTop: 24,
          },
          dimensions.width,
        )}
      >
        {/* Direct Messages */}
        <View>
          <View
            style={StyleSheet.applyWidth(
              {
                alignItems: 'center',
                flexDirection: 'row',
                justifyContent: 'space-between',
              },
              dimensions.width,
            )}
          >
            <View
              style={StyleSheet.applyWidth({ alignItems: 'center', flex: 1, flexDirection: 'row' }, dimensions.width)}
            >
              <View style={StyleSheet.applyWidth({ flex: 1 }, dimensions.width)}>
                <Text
                  style={StyleSheet.applyWidth(
                    {
                      color: theme.colors.strong,
                      typography: theme.typography.headline6,
                    },
                    dimensions.width,
                  )}
                  allowFontScaling={true}
                  ellipsizeMode={'tail'}
                  textBreakStrategy={'highQuality'}
                >
                  {'Direct Messages'}
                </Text>

                <Text
                  style={StyleSheet.applyWidth(
                    {
                      color: theme.colors.medium,
                      typography: theme.typography.caption,
                    },
                    dimensions.width,
                  )}
                  allowFontScaling={true}
                  ellipsizeMode={'tail'}
                  textBreakStrategy={'highQuality'}
                >
                  {'@userhandle sent you a private message'}
                </Text>
              </View>
            </View>
            <Switch color={theme.colors.primary} />
          </View>
        </View>
        <Divider
          style={StyleSheet.applyWidth({ height: 1, marginBottom: 24, marginTop: 24 }, dimensions.width)}
          height={1}
          color={theme.colors.divider}
        />
        {/* Mentions */}
        <View>
          <View
            style={StyleSheet.applyWidth(
              {
                alignItems: 'center',
                flexDirection: 'row',
                justifyContent: 'space-between',
              },
              dimensions.width,
            )}
          >
            <View
              style={StyleSheet.applyWidth({ alignItems: 'center', flex: 1, flexDirection: 'row' }, dimensions.width)}
            >
              <View style={StyleSheet.applyWidth({ flex: 1 }, dimensions.width)}>
                <Text
                  style={StyleSheet.applyWidth(
                    {
                      color: theme.colors.strong,
                      typography: theme.typography.headline6,
                    },
                    dimensions.width,
                  )}
                  allowFontScaling={true}
                  ellipsizeMode={'tail'}
                  textBreakStrategy={'highQuality'}
                >
                  {'Mentions'}
                </Text>

                <Text
                  style={StyleSheet.applyWidth(
                    {
                      color: theme.colors.medium,
                      typography: theme.typography.caption,
                    },
                    dimensions.width,
                  )}
                  allowFontScaling={true}
                  ellipsizeMode={'tail'}
                  textBreakStrategy={'highQuality'}
                >
                  {'@userhandle mentioned you in a post'}
                </Text>
              </View>
            </View>
            <Switch color={theme.colors.primary} />
          </View>
        </View>
        <Divider
          style={StyleSheet.applyWidth({ height: 1, marginBottom: 24, marginTop: 24 }, dimensions.width)}
          height={1}
          color={theme.colors.divider}
        />
        {/* Posts */}
        <View>
          <View
            style={StyleSheet.applyWidth(
              {
                alignItems: 'center',
                flexDirection: 'row',
                justifyContent: 'space-between',
              },
              dimensions.width,
            )}
          >
            <View
              style={StyleSheet.applyWidth({ alignItems: 'center', flex: 1, flexDirection: 'row' }, dimensions.width)}
            >
              <View style={StyleSheet.applyWidth({ flex: 1 }, dimensions.width)}>
                <Text
                  style={StyleSheet.applyWidth(
                    {
                      color: theme.colors.strong,
                      typography: theme.typography.headline6,
                    },
                    dimensions.width,
                  )}
                  allowFontScaling={true}
                  ellipsizeMode={'tail'}
                  textBreakStrategy={'highQuality'}
                >
                  {'Posts'}
                </Text>

                <Text
                  style={StyleSheet.applyWidth(
                    {
                      color: theme.colors.medium,
                      typography: theme.typography.caption,
                    },
                    dimensions.width,
                  )}
                  allowFontScaling={true}
                  ellipsizeMode={'tail'}
                  textBreakStrategy={'highQuality'}
                >
                  {'Posts from people you follow'}
                </Text>
              </View>
            </View>
            <Switch color={theme.colors.primary} />
          </View>
        </View>
        <Divider
          style={StyleSheet.applyWidth({ height: 1, marginBottom: 24, marginTop: 24 }, dimensions.width)}
          height={1}
          color={theme.colors.divider}
        />
        {/* App Updates */}
        <View>
          <View
            style={StyleSheet.applyWidth(
              {
                alignItems: 'center',
                flexDirection: 'row',
                justifyContent: 'space-between',
              },
              dimensions.width,
            )}
          >
            <View
              style={StyleSheet.applyWidth({ alignItems: 'center', flex: 1, flexDirection: 'row' }, dimensions.width)}
            >
              <View style={StyleSheet.applyWidth({ flex: 1 }, dimensions.width)}>
                <Text
                  style={StyleSheet.applyWidth(
                    {
                      color: theme.colors.strong,
                      typography: theme.typography.headline6,
                    },
                    dimensions.width,
                  )}
                  allowFontScaling={true}
                  ellipsizeMode={'tail'}
                  textBreakStrategy={'highQuality'}
                >
                  {'App Updates'}
                </Text>

                <Text
                  style={StyleSheet.applyWidth(
                    {
                      color: theme.colors.medium,
                      typography: theme.typography.caption,
                    },
                    dimensions.width,
                  )}
                  allowFontScaling={true}
                  ellipsizeMode={'tail'}
                  textBreakStrategy={'highQuality'}
                >
                  {'New features and announcements'}
                </Text>
              </View>
            </View>
            <Switch color={theme.colors.primary} />
          </View>
        </View>
      </View>
    </ScreenContainer>
  )
}

export default withTheme(EditNotificationPrefsScreen)
