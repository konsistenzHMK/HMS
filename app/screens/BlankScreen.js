import React from 'react'
import * as GlobalStyles from '../GlobalStyles.js'
import * as ToastNotification from '../ToastNotification'
import * as GlobalVariables from '../config/GlobalVariableContext'
import Images from '../config/Images'
import * as log1 from '../custom-files/log1'
import * as Utils from '../utils'
import Breakpoints from '../utils/Breakpoints'
import * as StyleSheet from '../utils/StyleSheet'
import { Button, Circle, CircleImage, Icon, ScreenContainer, Surface, Touchable, withTheme } from '@draftbit/ui'
import { Text, View, useWindowDimensions } from 'react-native'

const BlankScreen = (props) => {
  const dimensions = useWindowDimensions()
  const Constants = GlobalVariables.useValues()
  const Variables = Constants

  const submitSetTimer = () => {
    return ToastNotification.Toast
  }

  const { theme } = props
  const { navigation } = props

  const [submitted, setSubmitted] = React.useState(false)

  return (
    <ScreenContainer
      style={StyleSheet.applyWidth(
        {
          flexDirection: 'column',
          marginLeft: 10,
          marginRight: 10,
          marginTop: 10,
        },
        dimensions.width,
      )}
      scrollable={false}
      hasSafeArea={true}
    >
      {/* toast-surface */}
      <>
        {!submitted ? null : (
          <Surface
            style={StyleSheet.applyWidth(
              StyleSheet.compose(GlobalStyles.SurfaceStyles(theme)['Surface'], {
                alignItems: 'center',
                backgroundColor: theme.colors['Background'],
                borderRadius: 8,
                justifyContent: 'center',
                paddingBottom: 5,
                paddingLeft: 10,
                paddingRight: 10,
                paddingTop: 5,
              }),
              dimensions.width,
            )}
          >
            {/* toast-msg */}
            <Text
              style={StyleSheet.applyWidth(
                StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                  color: theme.colors['Primary'],
                  fontFamily: 'Rubik_300Light',
                  fontSize: 12,
                }),
                dimensions.width,
              )}
            >
              {'Action done'}
            </Text>
          </Surface>
        )}
      </>
      {/* dummy header */}
      <View style={StyleSheet.applyWidth(GlobalStyles.ViewStyles(theme)['PF-HeaderFrame 3'], dimensions.width)}>
        {/* Left Frame */}
        <View
          style={StyleSheet.applyWidth({ flexDirection: 'row', paddingBottom: 7, paddingTop: 7 }, dimensions.width)}
        >
          {/* Flex Frame for Touchable */}
          <View
            style={StyleSheet.applyWidth({ flexGrow: 1, flexShrink: 0, justifyContent: 'center' }, dimensions.width)}
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
          {/* Left Side */}
          <View style={StyleSheet.applyWidth({ justifyContent: 'center' }, dimensions.width)}>
            {/* Circle Image Frame */}
            <View>
              <CircleImage size={30} source={Images.RCB2020} />
            </View>
          </View>
          {/* Right Side */}
          <View style={StyleSheet.applyWidth({ justifyContent: 'center', paddingLeft: 12 }, dimensions.width)}>
            {/* Team */}
            <Text
              style={StyleSheet.applyWidth(
                {
                  color: theme.colors.communityTrueOption,
                  fontFamily: 'Rubik_700Bold',
                  fontSize: 13,
                  lineHeight: 19,
                },
                dimensions.width,
              )}
              numberOfLines={2}
            >
              {'Royal Challengers'}
            </Text>
            {/* handle */}
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
              {'@RoyalCB'}
            </Text>
          </View>
        </View>
        {/* Right Frame */}
        <View
          style={StyleSheet.applyWidth({ flexDirection: 'row', paddingBottom: 7, paddingTop: 7 }, dimensions.width)}
        >
          {/* Flex Frame for Touchable */}
          <View
            style={StyleSheet.applyWidth({ flexGrow: 1, flexShrink: 0, justifyContent: 'center' }, dimensions.width)}
          >
            <Touchable>
              <Circle size={31} bgColor={theme.colors.communityIconBGColor}>
                <Icon name={'Ionicons/grid'} size={18} color={theme.colors.communityIconFill} />
              </Circle>
            </Touchable>
          </View>
        </View>
      </View>
      <Button
        onPress={() => {
          try {
            submitSetTimer()
          } catch (err) {
            console.error(err)
          }
        }}
        style={StyleSheet.applyWidth(
          StyleSheet.compose(GlobalStyles.ButtonStyles(theme)['Button'], {
            marginTop: 200,
          }),
          dimensions.width,
        )}
        title={'Submit'}
      />
      <Utils.CustomCodeErrorBoundary>
        <></>
      </Utils.CustomCodeErrorBoundary>
    </ScreenContainer>
  )
}

export default withTheme(BlankScreen)
