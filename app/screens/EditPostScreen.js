import React, { useState } from 'react'
import * as GlobalStyles from '../GlobalStyles.js'
import * as PagalFanBEApi from '../apis/PagalFanBEApi.js'
import * as GlobalVariables from '../config/GlobalVariableContext'
import * as StyleSheet from '../utils/StyleSheet'
import { Button, Circle, Icon, ScreenContainer, Touchable, withTheme } from '@draftbit/ui'
import { useIsFocused } from '@react-navigation/native'
import {
  Image,
  Keyboard,
  ScrollView,
  Text,
  TextInput,
  View,
  useWindowDimensions,
  Modal,
  TouchableOpacity,
} from 'react-native'
import { VideoPlayer, useSnackbar } from '../components'
import { useTranslation } from 'react-i18next'
import deleteFile from '../global-functions/deleteFile.js'

const EditPostScreen = (props) => {
  const dimensions = useWindowDimensions()
  const Constants = GlobalVariables.useValues()
  const snackbar = useSnackbar()
  const { t: translate } = useTranslation()

  const [postDetails, setPostDetails] = useState()
  const [textAreaValue, setTextAreaValue] = React.useState('')
  const [deleteModalOpen, setDeleteModalOpen] = React.useState(false)

  const pagalFanBEDeleteUserUploadedPostDELETE = PagalFanBEApi.useDeleteUserUploadedPostDELETE()
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
        setPostDetails(postDetails?.[0])
      } catch (err) {
        console.error(err)
      }
    }
    handler()
  }, [isFocused])

  const handlePostUpdatePress = async () => {
    try {
      Keyboard.dismiss()

      if (!textAreaValue) {
        snackbar.show({ title: translate('EditPostScreen.Toast.AddPost') })
        return
      }

      snackbar.show({ title: translate('EditPostScreen.Toast.UpdatePost') })
      const newCaption = concatStrings(postDetails?.caption, textAreaValue)
      await pagalFanBEUpdatePostPATCH.mutateAsync({
        postId: props.route?.params?.post_id ?? 1,
        updatedCaption: newCaption,
      })
    } catch (err) {
      snackbar.show({ title: translate('EditPostScreen.Toast.ErrorUpdate'), variant: 'negative' })
      console.error(err)
    }
  }

  const handlePostDeletePress = () => {
    setDeleteModalOpen(true)
  }

  const cleanFilePathAndDelete = (filePath, directory) => {
    const cleanUrl = filePath.replace(/\/+$/, '')

    const parts = cleanUrl.split('/')
    const fileName = parts[parts.length - 1]
    deleteFile('post-bucket', directory, fileName)
  }

  const handlePostDeleteConfirmPress = async () => {
    const id = props.route?.params?.post_id
    if (!id) {
      console.log('Post id invalid')
      return
    }
    try {
      await pagalFanBEDeleteUserUploadedPostDELETE.mutateAsync({
        postId: id,
        post: postDetails,
      })

      cleanFilePathAndDelete(postDetails.image_path, 'images')
      if (postDetails.video_url) {
        cleanFilePathAndDelete(postDetails.video_url, 'videos')
      }
      snackbar.show({ title: 'Post deleted Suceessfully' })
      setTimeout(() => {
        navigation.navigate('HomeScreen')
      }, 400)
    } catch (error) {
      console.log(error)
    }
  }

  const deleteModalDismiss = () => {
    setDeleteModalOpen(false)
  }

  const styles = StyleSheet.create({
    modal: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.6)',
    },
    container: {
      backgroundColor: theme.colors['Background'],
      borderTopLeftRadius: 24,
      borderTopRightRadius: 24,
      borderTop: 1,
      borderColor: theme.colors['PF-Grey'],
      width: '100%',
      bottom: 0,
      padding: 20,
      position: 'absolute',
      height: '20%',
    },
  })

  return (
    <ScreenContainer
      style={StyleSheet.applyWidth({ marginLeft: 10, marginRight: 10, marginTop: 10 }, dimensions.width)}
      hasSafeArea={true}
      scrollable={false}
    >
      {/*Delete Modal*/}
      <Modal visible={deleteModalOpen} onDismiss={deleteModalDismiss} transparent animationType="slide">
        <TouchableOpacity onPress={deleteModalDismiss} style={styles.modal} activeOpacity={1} />
        <View style={styles.container}>
          <View>
            <Text
              style={StyleSheet.applyWidth(
                StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                  color: theme.colors['Custom Color_34'],
                  fontFamily: 'Rubik_400Regular',
                  fontSize: 15,
                  textAlign: 'center',
                }),
                dimensions.width,
              )}
            >
              Are you sure you want to delete this post?
            </Text>
          </View>
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
            <Button
              style={StyleSheet.applyWidth(
                {
                  backgroundColor: theme.colors['PF-Primary'],
                  borderRadius: 8,
                  color: theme.colors['White'],
                  fontFamily: 'Rubik_600SemiBold',
                  height: 50,
                  marginTop: 40,
                  textAlign: 'center',
                  width: 130,
                },
                dimensions.width,
              )}
              title="Delete"
              onPress={handlePostDeleteConfirmPress}
            />
            <Button
              style={StyleSheet.applyWidth(
                {
                  backgroundColor: theme.colors['PF-Grey'],
                  borderRadius: 8,
                  color: theme.colors['White'],
                  fontFamily: 'Rubik_600SemiBold',
                  height: 50,
                  marginTop: 40,
                  textAlign: 'center',
                  width: 130,
                },
                dimensions.width,
              )}
              title="Cancel"
              onPress={deleteModalDismiss}
            />
          </View>
        </View>
      </Modal>
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
            <Touchable onPress={navigation.goBack}>
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
            {translate('EditPostScreen.Text.EditPostTitle')}
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
            {translate('EditPostScreen.Text.SubHeading')}
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
            {translate('EditPostScreen.Text.Add')}
          </Text>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={true} bounces={true} keyboardShouldPersistTaps="handled">
        {/* Post Content */}
        <View style={StyleSheet.applyWidth({ marginTop: 10, paddingLeft: 10, paddingRight: 10 }, dimensions.width)}>
          {/* ImageView */}
          <View
            style={StyleSheet.applyWidth(
              {
                borderColor: theme.colors.background,
                borderRadius: 12,
                height: 300,
                overflow: 'hidden',
                marginVertical: 10,
              },
              dimensions.width,
            )}
          >
            {postDetails?.video_url ? (
              <VideoPlayer uri={postDetails?.video_url} playing />
            ) : (
              <Image
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(GlobalStyles.ImageBackgroundStyles(theme)['Image Background'], {
                    flexBasis: 0,
                    flexGrow: 1,
                    flexShrink: 0,
                  }),
                  dimensions.width,
                )}
                source={{ uri: postDetails?.image_path }}
                resizeMode={'contain'}
              />
            )}
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
            {postDetails?.caption}
          </Text>
          {/* AddCaption */}
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
            placeholder={translate('EditPostScreen.Text.InputPlaceholder')}
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
            {translate('EditPostScreen.Text.AddHashtags')}
          </Text>
        </View>
        {/* Update */}
        <Button
          onPress={handlePostUpdatePress}
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
          title={translate('EditPostScreen.Text.Button')}
        />
        {/* Delete */}
        <Button
          onPress={handlePostDeletePress}
          style={StyleSheet.applyWidth(
            {
              backgroundColor: theme.colors['White'],
              borderRadius: 8,
              color: 'red',
              borderWidth: 0.5,
              borderColor: 'red',
              fontFamily: 'Rubik_600SemiBold',
              height: 50,
              marginBottom: 20,
              marginLeft: 20,
              marginRight: 20,
              textAlign: 'center',
            },
            dimensions.width,
          )}
          title={translate('EditPostScreen.Text.DeleteButton')}
        />
      </ScrollView>
    </ScreenContainer>
  )
}

export default withTheme(EditPostScreen)
