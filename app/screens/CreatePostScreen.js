import React, { useRef, useState } from 'react'
import * as GlobalStyles from '../GlobalStyles.js'
import * as PagalFanBEApi from '../apis/PagalFanBEApi.js'
import * as GlobalVariables from '../config/GlobalVariableContext'
import uploadFile from '../global-functions/uploadFile'
import * as StyleSheet from '../utils/StyleSheet'
import openImagePickerUtil from '../utils/openImagePicker'
import openCamera from '../utils/openCamera.js'
import { Button, Circle, Icon, ScreenContainer, withTheme } from '@draftbit/ui'
import { Keyboard, ScrollView, Text, TextInput, View, useWindowDimensions, Pressable, Alert } from 'react-native'
import { Modal, useSnackbar, VideoPlayer, Image, Loader } from '../components'

const CreatePostScreen = (props) => {
  const dimensions = useWindowDimensions()
  const Constants = GlobalVariables.useValues()
  const snackbar = useSnackbar()

  const { theme } = props
  const { navigation } = props

  const pagalFanBEAddNewPostPOST = PagalFanBEApi.useAddNewPostPOST()
  const [mediaTypeSelectModalVisible, setMediaTypeSelectModalVisible] = useState(false)
  const [pickedMedia, setPickedMedia] = React.useState('')
  const [textAreaValue, setTextAreaValue] = React.useState('')
  const [loadingPostUpload, setLoadingPostUpload] = React.useState(false)
  const pickerTypeRef = useRef()
  const pickerMediaTypeRef = useRef()

  const handlePostNowPress = async () => {
    Keyboard.dismiss()
    try {
      if (!pickedMedia || !textAreaValue) {
        snackbar.show({ title: "Post can't be empty" })
        return
      }
      setLoadingPostUpload(true)
      // snackbar.show({ title: 'Uploading post …' })

      const subDir = pickerMediaTypeRef.current === 'photo' ? 'images' : 'videos'
      const remoteUrl = await uploadFile('post-bucket', pickedMedia, subDir)
      setPickedMedia(remoteUrl)
      await pagalFanBEAddNewPostPOST.mutateAsync({
        caption: textAreaValue,
        image_url: remoteUrl,
        posted_by: Constants['LOGGED_IN_USER'],
      })
      navigation.goBack()
    } catch (err) {
      snackbar.show({ title: 'Error uploading post', variant: 'negative' })
      console.error(err)
    }
    setLoadingPostUpload(false)
  }

  const handleSelectMediaPress = async (type) => {
    pickerTypeRef.current = type
    setMediaTypeSelectModalVisible(true)
  }

  const handleMediaTypePress = async (mediaType) => {
    hideMediaTypeSelectModal()

    try {
      const asset = await (pickerTypeRef.current === 'camera'
        ? openCamera({ mediaType, durationLimit: 15 })
        : openImagePickerUtil({ mediaType }))

      if (asset) {
        if (mediaType === 'video' && asset.duration > 15) {
          Alert.alert('Please select media not more than 15 seconds')
          return
        }
        pickerMediaTypeRef.current = mediaType
        setPickedMedia(asset.uri)
      }
    } catch (err) {
      console.error(err)
    }
  }

  const hideMediaTypeSelectModal = () => {
    setMediaTypeSelectModalVisible(false)
  }

  return (
    <ScreenContainer hasSafeArea={true} scrollable={false}>
      {/* Header */}
      <View
        style={StyleSheet.applyWidth(
          {
            alignItems: 'center',
            flexDirection: 'row',
            height: 48,
            marginHorizontal: 10,
            justifyContent: 'space-between',
          },
          dimensions.width,
        )}
      >
        {/* PF-BackHeader */}
        <View style={StyleSheet.applyWidth(GlobalStyles.ViewStyles(theme)['PF-BackHeader 6'], dimensions.width)}>
          {/* Flex Frame for Pressable */}
          <View
            style={StyleSheet.applyWidth({ flexGrow: 1, flexShrink: 0, justifyContent: 'center' }, dimensions.width)}
          >
            <Pressable
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
            </Pressable>
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

      <ScrollView contentContainerStyle={{ marginHorizontal: 10 }} keyboardShouldPersistTaps="handled">
        {/* Post Content */}
        <View style={{ margin: 10 }}>
          {pickedMedia ? (
            pickerMediaTypeRef.current === 'photo' ? (
              <Image
                style={StyleSheet.applyWidth({ borderRadius: 5, height: 250, width: '100%' }, dimensions.width)}
                resizeMode="contain"
                source={{ uri: pickedMedia }}
              />
            ) : (
              <VideoPlayer playing uri={pickedMedia} style={{ borderRadius: 5, height: 250, width: '100%' }} />
            )
          ) : (
            <View
              style={{
                borderRadius: 5,
                height: 250,
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: theme.colors['Border Color'],
              }}
            >
              <Text style={{ fontSize: 20, fontWeight: 'bold' }}>No Media Selected</Text>
            </View>
          )}
          {/* EditView */}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 10,
            }}
          >
            <Pressable
              onPress={() => handleSelectMediaPress('camera')}
              style={StyleSheet.applyWidth(
                {
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: theme.colors['Social Orange'],
                  borderRadius: 25,
                  height: 40,
                  width: 40,
                  marginHorizontal: 20,
                },
                dimensions.width,
              )}
            >
              <Icon color={theme.colors['Background']} name={'AntDesign/camera'} size={18} />
            </Pressable>
            <Pressable
              onPress={() => handleSelectMediaPress('gallery')}
              style={StyleSheet.applyWidth(
                {
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: theme.colors['Community_Highlight_Blue'],
                  borderRadius: 25,
                  height: 40,
                  width: 40,
                  marginHorizontal: 20,
                },
                dimensions.width,
              )}
            >
              <Icon color={theme.colors['Background']} name={'AntDesign/picture'} size={18} />
            </Pressable>
          </View>
          {/* Caption */}
          <TextInput
            onChangeText={setTextAreaValue}
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
          onPress={handlePostNowPress}
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
      <Modal visible={mediaTypeSelectModalVisible} onDismiss={hideMediaTypeSelectModal}>
        <View style={{ padding: 30, backgroundColor: '#fff' }}>
          <Text style={{ textAlign: 'center', fontSize: 18, fontWeight: 'bold' }}>Choose media type</Text>
          <Button
            title="Image"
            onPress={() => handleMediaTypePress('photo')}
            style={{ marginVertical: 20, fontSize: 16, fontWeight: '600', backgroundColor: theme.colors['Secondary'] }}
          />
          <Button
            title="Video"
            onPress={() => handleMediaTypePress('video')}
            style={{ fontSize: 16, fontWeight: '600', backgroundColor: theme.colors['Secondary'] }}
          />
          <Text
            style={{
              color: theme.colors['PF-Grey'],
              fontFamily: 'Rubik_300Light_Italic',
              fontSize: 9,
              textAlign: 'center',
              marginTop: 3,
            }}
            numberOfLines={4}
          >
            {'*Video should not be more than 15s'}
          </Text>
        </View>
      </Modal>
      {loadingPostUpload && <Loader size={30} title={'Uploading post...'} />}
    </ScreenContainer>
  )
}

export default withTheme(CreatePostScreen)
