import React from 'react'
import * as GlobalStyles from '../GlobalStyles.js'
import * as PagalFanBEApi from '../apis/PagalFanBEApi.js'
import * as GlobalVariables from '../config/GlobalVariableContext'
import * as StyleSheet from '../utils/StyleSheet'
import { Button, Circle, Icon, ScreenContainer, Touchable, withTheme } from '@draftbit/ui'
import { useIsFocused } from '@react-navigation/native'
import { Image, ScrollView, Text, TextInput, View, useWindowDimensions } from 'react-native'
import { useSnackbar } from '../components'

const EditPostScreen = (props) => {
  const dimensions = useWindowDimensions()
  const Constants = GlobalVariables.useValues()
  const snackbar = useSnackbar()

  const concatStrings = (text1, text2) => {
    return text1 + ' ' + text2
  }

  const { theme } = props
  const { navigation } = props

  const pagalFanBEUpdatePostPATCH = PagalFanBEApi.useUpdatePostPATCH()

  const isFocused = useIsFocused()
  React.useEffect(() => {
    const handler = async () => {
      try {
        if (!isFocused) {
          return
        }
        const postDetails = await PagalFanBEApi.fetchSinglePostGET(Constants, {
          id: props.route?.params?.post_id ?? 1,
        })
        setPickedImage(postDetails?.[0]?.image_path)
        setOriginalCaption(postDetails?.[0]?.caption)
      } catch (err) {
        console.error(err)
      }
    }
    handler()
  }, [isFocused])

  const [originalCaption, setOriginalCaption] = React.useState('')
  const [pickedImage, setPickedImage] = React.useState('')
  const [textAreaValue, setTextAreaValue] = React.useState('')

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
            justifyContent: 'flex-start',
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

        <View style={StyleSheet.applyWidth({ alignItems: 'center', left: 60 }, dimensions.width)}>
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
            {'Edit Post'}
          </Text>
          {/* Note1 */}
          <Text
            style={StyleSheet.applyWidth(
              StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                color: theme.colors['PF-Primary'],
                fontFamily: 'Rubik_400Regular',
                fontSize: 8,
              }),
              dimensions.width,
            )}
          >
            {'Original image and caption cannot be changed.'}
          </Text>
          {/* Note2 */}
          <Text
            style={StyleSheet.applyWidth(
              StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                fontFamily: 'Rubik_400Regular',
                fontSize: 8,
              }),
              dimensions.width,
            )}
          >
            {'You can only add additional text below. '}
          </Text>
        </View>
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
                justifyContent: 'center',
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
                  source={{ uri: `${pickedImage}` }}
                  resizeMode={'center'}
                />
              )}
            </>
          </View>
          {/* OriginalCaption */}
          <Text
            style={StyleSheet.applyWidth(
              StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                fontFamily: 'Rubik_300Light',
                fontSize: 11,
                paddingLeft: 4,
                paddingRight: 4,
              }),
              dimensions.width,
            )}
          >
            {originalCaption}
          </Text>
          {/* AddCaption */}
          <TextInput
            onChangeText={(newAddCaptionValue) => {
              try {
                if (newAddCaptionValue) {
                  setTextAreaValue(newAddCaptionValue)
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
                color: theme.colors['PF-Grey'],
                fontFamily: 'Rubik_400Regular',
                fontSize: 12,
                height: 120,
                marginBottom: 20,
                marginTop: 30,
                paddingBottom: 8,
                paddingLeft: 4,
                paddingRight: 4,
                paddingTop: 8,
              },
              dimensions.width,
            )}
            placeholder={'what more do you want to say?'}
            value={textAreaValue}
            editable={true}
            textAlignVertical={'top'}
            multiline={true}
            placeholderTextColor={theme.colors['Custom Color_35']}
            numberOfLines={3}
          />
          {/* Note3 */}
          <Text
            style={StyleSheet.applyWidth(
              StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                fontFamily: 'Rubik_300Light_Italic',
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
        {/* Update */}
        <Button
          onPress={() => {
            const handler = async () => {
              try {
                snackbar.show({ title: 'Updating post …' })
                const newCaption = concatStrings(originalCaption, textAreaValue)
                await pagalFanBEUpdatePostPATCH.mutateAsync({
                  postId: props.route?.params?.post_id ?? 1,
                  updatedCaption: newCaption,
                })
              } catch (err) {
                snackbar.show({ title: 'Error updating post', variant: 'negative' })
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
              marginTop: 40,
              textAlign: 'center',
            },
            dimensions.width,
          )}
          title={'Update'}
        />
      </ScrollView>
    </ScreenContainer>
  )
}

export default withTheme(EditPostScreen)
