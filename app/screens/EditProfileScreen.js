import React, { useEffect, useRef, useState } from 'react'
import * as GlobalStyles from '../GlobalStyles.js'
import * as PagalFanBEApi from '../apis/PagalFanBEApi.js'
import * as GlobalVariables from '../config/GlobalVariableContext'
import uploadFile from '../global-functions/uploadFile'
import openImagePickerUtil from '../utils/openImagePicker'
import { Button, Circle, Icon, ScreenContainer, Touchable } from '@draftbit/ui'
import { Image, Text, TextInput, View, StyleSheet, TouchableOpacity } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Modal, useSnackbar } from '../components'
import theme from '../themes/DraftbitTheme'
import openCamera from '../utils/openCamera.js'
import { useTranslation } from 'react-i18next'

const EditProfileScreen = (props) => {
  const Constants = GlobalVariables.useValues()
  const snackbar = useSnackbar()
  const { t: translate } = useTranslation()

  const pagalFanBEUpdateUserProfilePATCH = PagalFanBEApi.useUpdateUserProfilePATCH()
  const { navigation } = props

  const [briefBio, setBriefBio] = React.useState('')
  const [firstName, setFirstName] = React.useState('')
  const [lastName, setLastName] = React.useState('')
  const [userHandle, setUserHandle] = React.useState('')
  const [userPic, setUserPic] = React.useState('')
  const profilePicUpdated = useRef(false)
  const [pickerTypeModalVisible, setPickerTypeModalVisible] = useState(false)

  const fetchProfileData = async () => {
    try {
      const userDetails = await PagalFanBEApi.fetchSingleUserGET(Constants, {
        id: Constants['LOGGED_IN_USER'],
      })
      setFirstName(userDetails?.[0]?.first_name)
      setLastName(userDetails && userDetails[0]?.last_name)
      setUserHandle(userDetails && userDetails[0]?.handle)
      setBriefBio(userDetails?.[0]?.bio)
      setUserPic(userDetails?.[0]?.profile_image)
    } catch (err) {
      console.error(err)
    }
  }

  const handleProfileUpdate = async () => {
    try {
      snackbar.show({ title: translate('EditProfileScreen.Toast.Update') })

      let imgUrl = userPic
      if (profilePicUpdated.current) {
        imgUrl = await uploadFile('user-bucket', userPic)
      }

      await pagalFanBEUpdateUserProfilePATCH.mutateAsync({
        briefBio,
        firstName,
        imgUrl,
        lastName,
        userHandle,
        userId: Constants['LOGGED_IN_USER'],
      })
      navigation.navigate('MySettingsScreen')
    } catch (err) {
      console.error(translate('EditProfileScreen.Error.ImageUpload'), err)
    }
  }

  const handlePickerTypeSelect = async (type) => {
    hidePickerTypeModal()
    try {
      const imgPicked = await (type === 'camera' ? openCamera() : openImagePickerUtil())
      profilePicUpdated.current = true
      setUserPic(imgPicked.uri)
    } catch (err) {
      console.error(err)
    }
  }

  const showPickerTypeModal = () => {
    setPickerTypeModalVisible(true)
  }

  const hidePickerTypeModal = () => {
    setPickerTypeModalVisible(false)
  }

  useEffect(() => {
    fetchProfileData()
  }, [])

  return (
    <>
      <ScreenContainer style={styles.conatiner} scrollable={false} hasSafeArea={true}>
        {/* PF-BackHeader */}
        <View style={GlobalStyles.ViewStyles(theme)['PF-BackHeader 5']}>
          {/* Flex Frame for Touchable */}
          <Touchable onPress={navigation.goBack}>
            <Circle size={31} bgColor={theme.colors.communityIconBGColor}>
              <Icon name={'Ionicons/caret-back'} size={18} color={theme.colors.communityIconFill} />
            </Circle>
          </Touchable>
        </View>
        {/* Header */}
        <View style={styles.header}>
          {/* Screen Heading */}
          <Text style={styles.headerTitle}>{translate('EditProfileScreen.Text.EditProfile')}</Text>
        </View>

        <KeyboardAwareScrollView contentContainerStyle={styles.body} showsVerticalScrollIndicator={false}>
          {/* Profile Pic */}
          <TouchableOpacity style={styles.profilePicContainer} onPress={showPickerTypeModal} activeOpacity={0.8}>
            {userPic && <Image style={styles.profilePic} resizeMode={'cover'} source={{ uri: `${userPic}` }} />}
            <Icon style={styles.profileEditIcon} size={20} name={'Feather/edit'} color={theme.colors['Secondary']} />
          </TouchableOpacity>
          {/* Name */}
          <View style={styles.nameContainer}>
            {/* First Name */}
            <View style={styles.firstNameContainer}>
              <Text style={styles.inputTitle}>{translate('EditProfileScreen.Text.FirstName')}</Text>
              <TextInput
                onChangeText={setFirstName}
                style={styles.textInput}
                value={firstName}
                autoCapitalize={'none'}
                placeholder={translate('EditProfileScreen.Text.FirstNamePlaceholder')}
              />
            </View>
            {/* Last Name */}
            <View style={styles.lastNameContainer}>
              <Text style={styles.inputTitle}>{translate('EditProfileScreen.Text.LastName')}</Text>
              <TextInput
                onChangeText={setLastName}
                style={styles.textInput}
                value={lastName}
                autoCapitalize={'none'}
                placeholder={translate('EditProfileScreen.Text.LastNamePlaceholder')}
              />
            </View>
          </View>
          {/* User Handle */}
          <View style={styles.inputContainer}>
            <Text style={styles.userHandle}>{translate('EditProfileScreen.Text.UserHandle')}</Text>
            <View style={styles.userHandleInputContainer}>
              <Text style={styles.userHandleInputPrefix}>@</Text>
              <View style={{ flex: 1 }}>
                <TextInput
                  onChangeText={setUserHandle}
                  style={styles.textInput}
                  value={userHandle}
                  autoCapitalize={'none'}
                  placeholder={translate('EditProfileScreen.Text.UserHandlePlaceholder')}
                />
              </View>
            </View>
          </View>
          {/* Bio */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputTitle}>{translate('EditProfileScreen.Text.Bio')}</Text>
            <TextInput
              onChangeText={setBriefBio}
              style={styles.textInputBio}
              value={briefBio}
              placeholder={translate('EditProfileScreen.BioPlaceholder')}
              textAlignVertical={'top'}
              multiline={true}
              numberOfLines={4}
            />
          </View>
          {/* Update */}
          <Button
            onPress={handleProfileUpdate}
            style={styles.updateButton}
            activeOpacity={0.8}
            disabledOpacity={0.8}
            title={translate('EditProfileScreen.Button.Update')}
          />
        </KeyboardAwareScrollView>
      </ScreenContainer>
      <Modal visible={pickerTypeModalVisible} onDismiss={hidePickerTypeModal}>
        <View style={{ padding: 30, backgroundColor: '#fff' }}>
          <Text style={{ textAlign: 'center', fontSize: 18, fontWeight: 'bold' }}>{translate('EditProfileScreen.Text.MediaType')}</Text>
          <Button
            title="Camera"
            onPress={() => handlePickerTypeSelect('camera')}
            style={{ marginVertical: 20, fontSize: 16, fontWeight: '600', backgroundColor: theme.colors['Secondary'] }}
          />
          <Button
            title="Gallery"
            onPress={() => handlePickerTypeSelect('gallery')}
            style={{ fontSize: 16, fontWeight: '600', backgroundColor: theme.colors['Secondary'] }}
          />
        </View>
      </Modal>
    </>
  )
}

const styles = StyleSheet.create({
  conatiner: {
    marginHorizontal: 10,
  },
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  headerTitle: {
    color: theme.colors.strong,
    fontFamily: 'Inter_500Medium',
    fontSize: 16,
    marginLeft: 10,
  },
  body: {
    padding: 20,
  },
  profilePicContainer: {
    alignSelf: 'center',
  },
  profilePic: {
    ...GlobalStyles.ImageStyles(theme)['Image'],
    borderRadius: 80,
    height: 100,
    width: 100,
  },
  profileEditIcon: {
    bottom: 5,
    height: 20,
    marginLeft: 42,
    width: 20,
  },
  nameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    marginBottom: 10,
  },
  firstNameContainer: {
    flex: 1,
    marginRight: 10,
  },
  lastNameContainer: {
    flex: 1,
    marginLeft: 10,
  },
  inputContainer: {
    marginVertical: 10,
  },
  inputTitle: {
    color: theme.colors.strong,
    fontFamily: 'Inter_400Regular',
    opacity: 0.85,
  },
  textInput: {
    fontFamily: 'Inter_400Regular',
    borderColor: theme.colors['Light'],
    borderWidth: 1,
    borderRadius: 8,
    height: 48,
    marginVertical: 8,
    paddingHorizontal: 10,
  },
  textInputBio: {
    fontFamily: 'Inter_400Regular',
    borderColor: theme.colors['Light'],
    borderWidth: 1,
    borderRadius: 8,
    maxHeight: 100,
    marginVertical: 8,
    paddingHorizontal: 10,
  },
  userHandle: {
    color: theme.colors.strong,
    fontFamily: 'Inter_400Regular',
    opacity: 0.85,
  },
  userHandleInputContainer: {
    flexDirection: 'row',
  },
  userHandleInputPrefix: {
    textAlignVertical: 'center',
    marginRight: 10,
  },
  updateButton: {
    backgroundColor: theme.colors['Secondary'],
    borderRadius: 12,
    fontFamily: 'System',
    fontWeight: '700',
    height: 52,
    marginTop: 20,
    textAlign: 'center',
  },
})

export default EditProfileScreen
