import React from 'react'
import * as GlobalStyles from '../GlobalStyles.js'
import * as PagalFanBEApi from '../apis/PagalFanBEApi.js'
import * as GlobalVariables from '../config/GlobalVariableContext'
import Images from '../config/Images'
import uploadImage from '../global-functions/uploadImage'
import Breakpoints from '../utils/Breakpoints'
import * as StyleSheet from '../utils/StyleSheet'
import openImagePickerUtil from '../utils/openImagePicker'
import {
  Button,
  CheckboxRow,
  Circle,
  Icon,
  IconButton,
  Picker,
  ScreenContainer,
  Touchable,
  withTheme,
} from '@draftbit/ui'
import { FlatList, Image, Modal, ScrollView, Text, TextInput, View, useWindowDimensions } from 'react-native'

const CreatePostScreen = (props) => {
  const dimensions = useWindowDimensions()
  const Constants = GlobalVariables.useValues()
  const Variables = Constants

  const submitSetTimer = async () => {
    setSubmitted(true)
    console.log(submitted)

    const timer = () => {
      console.log(submitted)
      setSubmitted(false)
    }

    setTimeout(timer, 1000)
  }

  // a Javascript ES6 function that takes in a long string of hashtags and returns a string representation of an array
  const hashtagsToArray = (hashtags) => {
    // Remove any leading or trailing whitespaces and split the string by commas
    const hashtagList = hashtags.trim().split(',')

    // Map over the array and remove the '#' character from each string
    const strippedList = hashtagList.map((hashtag) => {
      return hashtag.trim().replace('#', '')
    })

    // Return the array as a string representation
    return `{${strippedList.join(',')}}`
  }

  const filterFansList = (list) => {
    //console.log(list)

    if (list.length) {
      return list?.filter((item) => item.label.toLowerCase().includes(searchField.toLowerCase()))
    }
    return list
  }

  const addItemToFanClubsList = (item) => {
    // if(selectedFanClubs.includes(item)){
    //     setSelectedFanClubs( list => list.filter( i => i == item))
    // }else{
    //     setSelectedFanClubs(list => [...list,item])
    // }

    const includesObj = (arr, obj) => arr.some((item) => JSON.stringify(item) === JSON.stringify(obj))

    if (includesObj(selectedFanClubs, item)) {
      setSelectedFanClubs((list) => list.filter((i) => JSON.stringify(i) != JSON.stringifyitem))
    } else {
      setSelectedFanClubs((list) => [...list, item])
    }
  }

  const convertObjectArrayToStringArray = (objArray) => {
    const idArray = objArray.map((item) => item.value)
    return idArray
  }

  // Transforms an input Json string into the format needed for Picker component
  const transformToPickerOptions = (inputJson) => {
    return inputJson.map((item) => {
      return { label: item.name, value: item.id }
    })
  }

  const RemoveItemFromSelectedFansList = (item) => {
    return setSelectedFanClubs((ext) => ext.filter((d) => d.label !== item.label))
  }

  const { theme } = props
  const { navigation } = props

  const pagalFanBEAddNewPostPOST = PagalFanBEApi.useAddNewPostPOST()

  const [checkboxRowValue, setCheckboxRowValue] = React.useState('')
  const [fanclub_options, setFanclub_options] = React.useState('')
  const [hashtags, setHashtags] = React.useState([])
  const [match_options, setMatch_options] = React.useState('')
  const [pickedImage, setPickedImage] = React.useState('')
  const [pickerValue, setPickerValue] = React.useState('')
  const [pickerValue2, setPickerValue2] = React.useState('')
  const [searchField, setSearchField] = React.useState('')
  const [selectedFanClubs, setSelectedFanClubs] = React.useState([])
  const [showfanClubModel, setShowfanClubModel] = React.useState(false)
  const [sports_options, setSports_options] = React.useState('')
  const [submitted, setSubmitted] = React.useState('')
  const [taggedFanClubs, setTaggedFanClubs] = React.useState([])
  const [taggedMatch, setTaggedMatch] = React.useState('')
  const [taggedSport, setTaggedSport] = React.useState('')
  const [textAreaValue, setTextAreaValue] = React.useState('')
  const [textInputValue, setTextInputValue] = React.useState('')

  return (
    <ScreenContainer
      style={StyleSheet.applyWidth({ marginLeft: 10, marginRight: 10, marginTop: 10 }, dimensions.width)}
      hasSafeArea={true}
      scrollable={false}
    >
      {/* Header */}
      <View
        style={StyleSheet.applyWidth(
          {
            alignItems: 'center',
            flexDirection: 'row',
            height: 48,
            justifyContent: 'space-between',
          },
          dimensions.width,
        )}
      >
        {/* PF-BackHeader */}
        <View style={StyleSheet.applyWidth(GlobalStyles.ViewStyles(theme)['PF-BackHeader 6'], dimensions.width)}>
          {/* Flex Frame for Touchable */}
          <View
            style={StyleSheet.applyWidth({ flexGrow: 1, flexShrink: 0, justifyContent: 'center' }, dimensions.width)}
          >
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
        {/* Title */}
        <Text
          style={StyleSheet.applyWidth(
            {
              color: theme.colors['Strong'],
              fontFamily: 'Poppins_500Medium',
              fontSize: 20,
              textAlign: 'center',
            },
            dimensions.width,
          )}
        >
          {'New Post'}
        </Text>
        <View
          style={StyleSheet.applyWidth(
            {
              alignItems: 'center',
              height: 48,
              justifyContent: 'center',
              width: 48,
            },
            dimensions.width,
          )}
        />
      </View>

      <ScrollView showsVerticalScrollIndicator={true} bounces={true}>
        {/* Post Content */}
        <View style={StyleSheet.applyWidth({ marginTop: 10, paddingLeft: 10, paddingRight: 10 }, dimensions.width)}>
          {/* ImageView */}
          <View
            style={StyleSheet.applyWidth(
              {
                alignItems: 'center',
                flexDirection: 'column',
                height: 200,
                justifyContent: 'flex-start',
                width: 350,
              },
              dimensions.width,
            )}
          >
            {/* Picked */}
            <>
              {!pickedImage ? null : (
                <Image
                  style={StyleSheet.applyWidth({ borderRadius: 5, height: 180, width: '100%' }, dimensions.width)}
                  resizeMode={'cover'}
                  source={{ uri: `${pickedImage}` }}
                />
              )}
            </>
            {/* Placeholder */}
            <>
              {pickedImage ? null : (
                <Image
                  style={StyleSheet.applyWidth({ borderRadius: 5, height: 180, width: '100%' }, dimensions.width)}
                  resizeMode={'cover'}
                  source={Images.ImgPlaceholder}
                />
              )}
            </>
            {/* EditView */}
            <View style={StyleSheet.applyWidth({ flexDirection: 'row', left: 70 }, dimensions.width)}>
              {/* UploadImg */}
              <Touchable
                onPress={() => {
                  const handler = async () => {
                    try {
                      const imgPicked = await openImagePickerUtil({
                        allowsEditing: true,
                      })
                      setPickedImage(imgPicked)
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
                      borderColor: theme.colors['BG Gray'],
                      borderLeftWidth: 1,
                      borderRadius: 5,
                      borderRightWidth: 1,
                      borderTopWidth: 1,
                      height: 50,
                      justifyContent: 'center',
                      width: 50,
                    },
                    dimensions.width,
                  )}
                >
                  <Circle bgColor={theme.colors['Social Orange']} size={36}>
                    <Icon color={theme.colors['Background']} name={'AntDesign/edit'} size={24} />
                  </Circle>
                </View>
              </Touchable>

              <View style={StyleSheet.applyWidth({ justifyContent: 'center', paddingLeft: 2 }, dimensions.width)}>
                {/* Min */}
                <Text
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                      color: theme.colors['PF-Grey'],
                      fontFamily: 'Rubik_300Light_Italic',
                      fontSize: 9,
                      marginTop: 2,
                    }),
                    dimensions.width,
                  )}
                >
                  {'Minimum: 500 x 300px'}
                </Text>
                {/* Reco */}
                <Text
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                      color: theme.colors['PF-Grey'],
                      fontFamily: 'Rubik_300Light_Italic',
                      fontSize: 9,
                      marginTop: 2,
                    }),
                    dimensions.width,
                  )}
                >
                  {'Recommended: 1080 x 566px'}
                </Text>
              </View>
            </View>
          </View>
          {/* Caption */}
          <TextInput
            onChangeText={(newCaptionValue) => {
              try {
                if (newCaptionValue) {
                  setTextAreaValue(newCaptionValue)
                }
              } catch (err) {
                console.error(err)
              }
            }}
            style={StyleSheet.applyWidth(
              {
                borderBottomWidth: 1,
                borderColor: theme.colors['Custom Color_34'],
                borderLeftWidth: 1,
                borderRadius: 8,
                borderRightWidth: 1,
                borderStyle: 'dotted',
                borderTopWidth: 1,
                color: theme.colors['Custom Color_35'],
                fontFamily: 'Rubik_500Medium',
                fontSize: 14,
                height: 120,
                marginBottom: 20,
                marginTop: 40,
                paddingBottom: 8,
                paddingLeft: 4,
                paddingRight: 4,
                paddingTop: 8,
              },
              dimensions.width,
            )}
            placeholder={'what do you want to say?'}
            value={textAreaValue}
            editable={true}
            textAlignVertical={'top'}
            multiline={true}
            numberOfLines={4}
            placeholderTextColor={theme.colors['Custom Color_35']}
          />
          <Text
            style={StyleSheet.applyWidth(
              StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                fontFamily: 'Rubik_300Light',
                fontSize: 10,
                paddingLeft: 4,
                paddingRight: 4,
              }),
              dimensions.width,
            )}
          >
            {
              'Add hashtags at the end for sports, matches, fanclubs etc that you want to tag. e.g. Smashing innings #ViratKohli #Cricket #IPL2023 #RCB'
            }
          </Text>
        </View>
        {/* Post Now */}
        <Button
          onPress={() => {
            const handler = async () => {
              try {
                const remoteUrl = await uploadImage('post-bucket', pickedImage)
                setPickedImage(remoteUrl)
                const newpostresponse = await pagalFanBEAddNewPostPOST.mutateAsync({
                  caption: textAreaValue,
                  image_url: remoteUrl,
                  posted_by: Constants['LOGGED_IN_USER'],
                })
                await submitSetTimer()
              } catch (err) {
                console.error(err)
              }
            }
            handler()
          }}
          style={StyleSheet.applyWidth(
            {
              backgroundColor: theme.colors['Secondary'],
              borderRadius: 8,
              color: theme.colors['PF-BG'],
              fontFamily: 'Rubik_600SemiBold',
              height: 50,
              marginBottom: 20,
              marginLeft: 20,
              marginRight: 20,
              marginTop: 50,
              textAlign: 'center',
            },
            dimensions.width,
          )}
          title={'Post Now'}
        />
      </ScrollView>
      <>
        {!submitted ? null : (
          <Text
            style={StyleSheet.applyWidth(
              StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                alignSelf: 'center',
                color: 'rgb(55, 249, 14)',
                fontSize: 20,
              }),
              dimensions.width,
            )}
          >
            {'Posted'}
          </Text>
        )}
      </>
    </ScreenContainer>
  )
}

export default withTheme(CreatePostScreen)
