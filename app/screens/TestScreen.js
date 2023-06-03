import React from 'react'
import * as GlobalStyles from '../GlobalStyles.js'
import * as GlobalVariables from '../config/GlobalVariableContext'
import * as StyleSheet from '../utils/StyleSheet'
import { Button, Divider, ScreenContainer, Swiper, SwiperItem, Switch, withTheme } from '@draftbit/ui'
import { Modal, ScrollView, Text, View, useWindowDimensions } from 'react-native'

const TestScreen = (props) => {
  const dimensions = useWindowDimensions()
  const Constants = GlobalVariables.useValues()
  const Variables = Constants

  const addIdToArray = (Variables, id) => {
    testArray.push(id)
    return
  }

  const removeIdFromArray = (Variables, id) => {
    const index = testArray.indexOf(id)
    if (index > -1) {
      testArray.splice(index, 1)
    }
    return testArray
  }

  const { theme } = props

  const [showModal, setShowModal] = React.useState(false)
  const [switchValue, setSwitchValue] = React.useState(false)
  const [switchValue1, setSwitchValue1] = React.useState(false)
  const [switchValue2, setSwitchValue2] = React.useState(false)
  const [switchValue3, setSwitchValue3] = React.useState(false)
  const [switchValue4, setSwitchValue4] = React.useState(false)
  const [testArray, setTestArray] = React.useState([])

  return (
    <ScreenContainer
      style={StyleSheet.applyWidth({ marginLeft: 10, marginRight: 10, marginTop: 40 }, dimensions.width)}
      scrollable={false}
      hasSafeArea={true}
    >
      <Swiper
        style={StyleSheet.applyWidth(GlobalStyles.SwiperStyles(theme)['Swiper'], dimensions.width)}
        dotColor={theme.colors.light}
        dotActiveColor={theme.colors.primary}
        dotsTouchable={true}
      >
        <SwiperItem>
          {/* switch1 */}
          <View
            style={StyleSheet.applyWidth(
              {
                borderRadius: 12,
                flexDirection: 'row',
                justifyContent: 'space-around',
                marginBottom: 10,
                marginLeft: 20,
                marginRight: 20,
                padding: 6,
              },
              dimensions.width,
            )}
          >
            <Text style={StyleSheet.applyWidth(GlobalStyles.TextStyles(theme)['Text'], dimensions.width)}>
              {'Id 1'}
            </Text>
            <Switch
              onValueChange={(newSwitchValue) => {
                const switchValue = newSwitchValue
                try {
                  const valuexMksNWeU = newSwitchValue
                  setSwitchValue1(valuexMksNWeU)
                  const switch1 = valuexMksNWeU
                  if (switch1 === true) {
                    addIdToArray(Variables, 1)
                  }
                  if (switch1 === false) {
                    removeIdFromArray(Variables, 1)
                  }
                  console.log(testArray)
                } catch (err) {
                  console.error(err)
                }
              }}
              value={switchValue1}
            />
          </View>
          {/* switch2 */}
          <View
            style={StyleSheet.applyWidth(
              {
                borderRadius: 12,
                flexDirection: 'row',
                justifyContent: 'space-around',
                marginBottom: 30,
                marginLeft: 20,
                marginRight: 20,
                padding: 6,
              },
              dimensions.width,
            )}
          >
            <Text style={StyleSheet.applyWidth(GlobalStyles.TextStyles(theme)['Text'], dimensions.width)}>
              {'Id 2'}
            </Text>
            <Switch
              onValueChange={(newSwitchValue) => {
                try {
                  const valuexN8bR5o7 = newSwitchValue
                  setSwitchValue2(valuexN8bR5o7)
                  const switch2 = valuexN8bR5o7
                  if (switch2 === true) {
                    addIdToArray(Variables, 2)
                  }
                  if (switch2 === false) {
                    removeIdFromArray(Variables, 2)
                  }
                  console.log(testArray)
                } catch (err) {
                  console.error(err)
                }
              }}
              value={switchValue2}
            />
          </View>
        </SwiperItem>

        <SwiperItem>
          {/* switch3 */}
          <View
            style={StyleSheet.applyWidth(
              {
                borderRadius: 12,
                flexDirection: 'row',
                justifyContent: 'space-around',
                marginBottom: 10,
                marginLeft: 20,
                marginRight: 20,
                padding: 6,
              },
              dimensions.width,
            )}
          >
            <Text style={StyleSheet.applyWidth(GlobalStyles.TextStyles(theme)['Text'], dimensions.width)}>
              {'Id 3'}
            </Text>
            <Switch
              onValueChange={(newSwitchValue) => {
                const switchValue = newSwitchValue
                try {
                  setSwitchValue(switchValue)
                  addIdToArray(Variables, 3)
                  removeIdFromArray(Variables, 3)
                  console.log(testArray)
                } catch (err) {
                  console.error(err)
                }
              }}
              value={switchValue}
            />
          </View>
          {/* switch4 */}
          <View
            style={StyleSheet.applyWidth(
              {
                borderRadius: 12,
                flexDirection: 'row',
                justifyContent: 'space-around',
                marginBottom: 30,
                marginLeft: 20,
                marginRight: 20,
                padding: 6,
              },
              dimensions.width,
            )}
          >
            <Text style={StyleSheet.applyWidth(GlobalStyles.TextStyles(theme)['Text'], dimensions.width)}>
              {'Id 4'}
            </Text>
            <Switch
              onValueChange={(newSwitchValue) => {
                try {
                  addIdToArray(Variables, 4)
                  removeIdFromArray(Variables, 4)
                  console.log(testArray)
                } catch (err) {
                  console.error(err)
                }
              }}
            />
          </View>
        </SwiperItem>
      </Swiper>
      <Divider
        style={StyleSheet.applyWidth(
          StyleSheet.compose(GlobalStyles.DividerStyles(theme)['Divider'], {
            marginBottom: 30,
          }),
          dimensions.width,
        )}
        color={theme.colors['Divider']}
      />
    </ScreenContainer>
  )
}

export default withTheme(TestScreen)
