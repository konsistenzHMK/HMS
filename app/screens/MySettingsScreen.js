import React from 'react'
import * as GlobalStyles from '../GlobalStyles.js'
import * as GlobalVariables from '../config/GlobalVariableContext'
import Breakpoints from '../utils/Breakpoints'
import * as StyleSheet from '../utils/StyleSheet'
import { Circle, Divider, Icon, ScreenContainer, Touchable, withTheme } from '@draftbit/ui'
import { Text, View, useWindowDimensions } from 'react-native'

const MySettingsScreen = (props) => {
  const dimensions = useWindowDimensions()
  const Constants = GlobalVariables.useValues()
  const Variables = Constants
  const setGlobalVariableValue = GlobalVariables.useSetValue()

  const { theme } = props
  const { navigation } = props

  return (
    <ScreenContainer
      style={StyleSheet.applyWidth({ marginLeft: 10, marginRight: 10 }, dimensions.width)}
      scrollable={true}
      hasSafeArea={true}
    >
      {/* PF-BackHeader */}
      <View style={StyleSheet.applyWidth(GlobalStyles.ViewStyles(theme)['PF-BackHeader 3'], dimensions.width)}>
        {/* Flex Frame for Touchable */}
        <View style={StyleSheet.applyWidth({ flexGrow: 1, flexShrink: 0, justifyContent: 'center' }, dimensions.width)}>
          <Touchable
            onPress={() => {
              try {
                navigation.navigate('Tabs', { screen: 'MySettingsScreen' })
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
      {/* Header Wrapper */}
      <View
        style={StyleSheet.applyWidth(
          {
            alignItems: 'center',
            flexGrow: 1,
            flexShrink: 0,
            justifyContent: 'center',
          },
          dimensions.width,
        )}
      >
        {/* Settings */}
        <Text
          style={StyleSheet.applyWidth(
            {
              color: theme.colors.strong,
              fontFamily: 'System',
              fontSize: 20,
              fontWeight: '600',
              lineHeight: 24,
              marginBottom: 6,
            },
            dimensions.width,
          )}
        >
          {'Settings'}
        </Text>
      </View>
      {/* Content Wrapper */}
      <View
        style={StyleSheet.applyWidth({ flexGrow: 1, flexShrink: 0, marginLeft: 24, marginRight: 24 }, dimensions.width)}
      >
        <Touchable
          onPress={() => {
            try {
              navigation.navigate('EditProfileScreen')
            } catch (err) {
              console.error(err)
            }
          }}
        >
          {/* Row Wrapper */}
          <View
            style={StyleSheet.applyWidth(
              {
                flexDirection: 'row',
                height: 60,
                justifyContent: 'space-between',
              },
              dimensions.width,
            )}
          >
            {/* Left Aligned */}
            <View
              style={StyleSheet.applyWidth({ alignItems: 'center', flex: 1, flexDirection: 'row' }, dimensions.width)}
            >
              <Icon color={theme.colors.strong} name={'FontAwesome/user-circle'} size={24} />
              <Text
                style={StyleSheet.applyWidth(
                  {
                    color: theme.colors.strong,
                    fontFamily: 'System',
                    fontWeight: '600',
                    marginLeft: 12,
                  },
                  dimensions.width,
                )}
                allowFontScaling={true}
                ellipsizeMode={'tail'}
                textBreakStrategy={'highQuality'}
              >
                {'Account Settings'}
              </Text>
            </View>
            {/* Right Aligned */}
            <View style={StyleSheet.applyWidth({ alignItems: 'center', flexDirection: 'row' }, dimensions.width)}>
              <Icon name={'MaterialIcons/chevron-right'} color={theme.colors.strong} size={24} />
            </View>
          </View>
          <Divider
            style={StyleSheet.applyWidth({ height: 1 }, dimensions.width)}
            height={1}
            color={theme.colors.divider}
          />
        </Touchable>

        <Touchable
          onPress={() => {
            try {
              navigation.navigate('EditNotificationPrefsScreen')
            } catch (err) {
              console.error(err)
            }
          }}
        >
          {/* Row Wrapper */}
          <View
            style={StyleSheet.applyWidth(
              {
                flexDirection: 'row',
                height: 60,
                justifyContent: 'space-between',
              },
              dimensions.width,
            )}
          >
            {/* Left Aligned */}
            <View
              style={StyleSheet.applyWidth({ alignItems: 'center', flex: 1, flexDirection: 'row' }, dimensions.width)}
            >
              <Icon color={theme.colors.strong} name={'FontAwesome/bell'} size={24} />
              <Text
                style={StyleSheet.applyWidth(
                  {
                    color: theme.colors.strong,
                    fontFamily: 'System',
                    fontWeight: '600',
                    marginLeft: 12,
                  },
                  dimensions.width,
                )}
                allowFontScaling={true}
                ellipsizeMode={'tail'}
                textBreakStrategy={'highQuality'}
              >
                {'Notifications'}
              </Text>
            </View>
            {/* Right Aligned */}
            <View style={StyleSheet.applyWidth({ alignItems: 'center', flexDirection: 'row' }, dimensions.width)}>
              <Icon name={'MaterialIcons/chevron-right'} color={theme.colors.strong} size={24} />
            </View>
          </View>
          <Divider
            style={StyleSheet.applyWidth({ height: 1 }, dimensions.width)}
            height={1}
            color={theme.colors.divider}
          />
        </Touchable>

        <Touchable>
          {/* Row Wrapper */}
          <View
            style={StyleSheet.applyWidth(
              {
                flexDirection: 'row',
                height: 60,
                justifyContent: 'space-between',
              },
              dimensions.width,
            )}
          >
            {/* Left Aligned */}
            <View
              style={StyleSheet.applyWidth({ alignItems: 'center', flex: 1, flexDirection: 'row' }, dimensions.width)}
            >
              <Icon color={theme.colors.strong} name={'MaterialIcons/chat-bubble'} size={24} />
              <Text
                style={StyleSheet.applyWidth(
                  {
                    color: theme.colors.strong,
                    fontFamily: 'System',
                    fontSize: 14,
                    fontWeight: '600',
                    marginLeft: 12,
                  },
                  dimensions.width,
                )}
                allowFontScaling={true}
                ellipsizeMode={'tail'}
                textBreakStrategy={'highQuality'}
              >
                {'Support'}
              </Text>
            </View>
            {/* Right Aligned */}
            <View style={StyleSheet.applyWidth({ alignItems: 'center', flexDirection: 'row' }, dimensions.width)}>
              <Icon name={'MaterialIcons/chevron-right'} color={theme.colors.strong} size={24} />
            </View>
          </View>
          <Divider
            style={StyleSheet.applyWidth({ height: 1 }, dimensions.width)}
            height={1}
            color={theme.colors.divider}
          />
        </Touchable>

        <Touchable>
          {/* Row Wrapper */}
          <View
            style={StyleSheet.applyWidth(
              {
                flexDirection: 'row',
                height: 60,
                justifyContent: 'space-between',
              },
              dimensions.width,
            )}
          >
            {/* Left Aligned */}
            <View
              style={StyleSheet.applyWidth({ alignItems: 'center', flex: 1, flexDirection: 'row' }, dimensions.width)}
            >
              <Icon color={theme.colors.strong} name={'AntDesign/questioncircle'} size={24} />
              <Text
                style={StyleSheet.applyWidth(
                  {
                    color: theme.colors.strong,
                    fontFamily: 'System',
                    fontWeight: '600',
                    marginLeft: 12,
                  },
                  dimensions.width,
                )}
                allowFontScaling={true}
                ellipsizeMode={'tail'}
                textBreakStrategy={'highQuality'}
              >
                {'FAQ'}
              </Text>
            </View>
            {/* Row Aligned */}
            <View style={StyleSheet.applyWidth({ alignItems: 'center', flexDirection: 'row' }, dimensions.width)}>
              <Icon name={'MaterialIcons/chevron-right'} color={theme.colors.strong} size={24} />
            </View>
          </View>
          <Divider
            style={StyleSheet.applyWidth({ height: 1 }, dimensions.width)}
            height={1}
            color={theme.colors.divider}
          />
        </Touchable>

        <Touchable>
          {/* Row Wrapper */}
          <View
            style={StyleSheet.applyWidth(
              {
                flexDirection: 'row',
                height: 60,
                justifyContent: 'space-between',
              },
              dimensions.width,
            )}
          >
            {/* Left Aligned */}
            <View
              style={StyleSheet.applyWidth({ alignItems: 'center', flex: 1, flexDirection: 'row' }, dimensions.width)}
            >
              <Icon color={theme.colors.strong} name={'AntDesign/infocirlce'} size={24} />
              <Text
                style={StyleSheet.applyWidth(
                  {
                    color: theme.colors.strong,
                    fontFamily: 'System',
                    fontWeight: '600',
                    marginLeft: 12,
                  },
                  dimensions.width,
                )}
                allowFontScaling={true}
                ellipsizeMode={'tail'}
                textBreakStrategy={'highQuality'}
              >
                {'About'}
              </Text>
            </View>
            {/* Right Aligned */}
            <View style={StyleSheet.applyWidth({ alignItems: 'center', flexDirection: 'row' }, dimensions.width)}>
              <Icon name={'MaterialIcons/chevron-right'} color={theme.colors.strong} size={24} />
            </View>
          </View>
          <Divider
            style={StyleSheet.applyWidth({ height: 1 }, dimensions.width)}
            height={1}
            color={theme.colors.divider}
          />
        </Touchable>
      </View>
      {/* Footer Wrapper */}
      <View style={StyleSheet.applyWidth({ flexGrow: 1, flexShrink: 0 }, dimensions.width)}>
        <Touchable
          onPress={() => {
            try {
              const auth_token = setGlobalVariableValue({
                key: 'AUTHORIZATION_HEADER',
                value: '',
              })
              const logged_id = setGlobalVariableValue({
                key: 'LOGGED_IN_USER',
                value: '',
              })
              navigation.navigate('SignupStartScreen')
            } catch (err) {
              console.error(err)
            }
          }}
        >
          {/* Button Wrapper */}
          <View
            style={StyleSheet.applyWidth(
              {
                flexGrow: 1,
                flexShrink: 0,
                justifyContent: 'center',
                minHeight: 54,
              },
              dimensions.width,
            )}
          >
            {/* Sign Out Text */}
            <Text style={StyleSheet.applyWidth({ color: theme.colors.primary, textAlign: 'center' }, dimensions.width)}>
              {'Sign Out'}
            </Text>
          </View>
        </Touchable>
      </View>
    </ScreenContainer>
  )
}

export default withTheme(MySettingsScreen)
