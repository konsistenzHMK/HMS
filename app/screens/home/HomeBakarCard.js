import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Pressable, StyleSheet, Text, View, Modal } from 'react-native'
import { theme } from '../../themes'
import * as PagalFanBEApi from '../../apis/PagalFanBEApi'
import * as GlobalVariables from '../../config/GlobalVariableContext'
import isDatetimeInRange from '../../global-functions/isDatetimeInRange'
import { Logger } from '../../utils/logger'
import { Image, ShimmerPlaceHolder } from '../../components'
import { Button, Divider, Icon } from '@draftbit/ui'
import Images from '../../config/Images'
import convertUTCtoIST from '../../global-functions/convertUTCtoIST'

export const HomeBakarCard = (props) => {
  const { t: translate } = useTranslation()
  const { navigation } = props
  const Constants = GlobalVariables.useValues()

  const [isSessionLive, setIsSessionLive] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [data, setData] = useState(null)

  const [showBakarrPopup, setShowBakarrPopup] = useState(false)

  const fetchNextBakarSession = async () => {
    try {
      setLoading(true)
      const fetchData = await PagalFanBEApi.fetchNextBakarrSessionGET(Constants)
      const isLive = isDatetimeInRange(fetchData && fetchData[0]?.session_start, fetchData && fetchData[0]?.session_end)
      setIsSessionLive(isLive)
      setData(fetchData)
      setError(false)
    } catch (e) {
      setError(true)
      Logger.log(e)
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchNextBakarSession()
  }, [])

  if (loading) {
    return <ShimmerPlaceHolder style={styles.bakarShimmer} />
  }

  if (error) {
    return <Text style={{ textAlign: 'center' }}>There was a problem fetching this data</Text>
  }

  const handleStartBakerRoomPress = () => {
    try {
      setShowBakarrPopup(false)
      const roomCode = Constants['HMS_ROOM_CODE']
      const username = `${Constants['user_first_name']} ${Constants['user_last_name']}`
      navigation.navigate('BakarRoomScreen', { roomCode, username })
    } catch (err) {
      Logger.error(err)
    }
  }

  return (
    <>
      <View style={styles.container}>
        {/* LiveBadge */}
        {isSessionLive ? (
          <View style={styles.liveBadgeContainer}>
            <Text style={styles.liveText}>{translate('HomeScreen.Text.LiveNow')}</Text>
            <Icon name={'Feather/radio'} size={20} color={theme.colors['PF-BG']} />
          </View>
        ) : null}
        {/* Details */}
        <View style={styles.flexRow}>
          <Image style={styles.image} resizeMode={'cover'} source={Images.Mic1} />
          {/* CardRight */}
          <View style={styles.cardRight}>
            {/* Header */}
            <View style={styles.cardRightHeader}>
              <Text style={styles.bakarText}>{translate('HomeScreen.Text.Bakarr')}</Text>
              {/* Time */}
              <Text style={styles.bakarTime}> {convertUTCtoIST(data && data[0]?.session_start)} </Text>
            </View>
            {/* Title */}
            <Text style={styles.bakarTitle}>{data && data[0]?.session_title}</Text>

            <Text style={styles.bakarRoomText}>{translate('HomeScreen.Text.BakarrRoom')}</Text>

            {isSessionLive ? (
              <Pressable style={styles.diveInButton} onPress={() => setShowBakarrPopup(true)}>
                <Text style={styles.diveInText}>{translate('HomeScreen.Text.DiveIn')}</Text>
              </Pressable>
            ) : null}
          </View>
        </View>
      </View>
      {!showBakarrPopup ? null : (
        <Modal animationType={'slide'} transparent={true}>
          <View style={styles.bakarModalContainer} />
          <View style={styles.bakarModalSubContainer}>
            <Text style={styles.bakarModalTitle}>{translate('HomeScreen.Text.EnteringBakarrRoom')}</Text>
            <Divider style={styles.bakarModalDivider} color={theme.colors.divider} />
            {/* Join Bakarr room */}
            <Button
              onPress={handleStartBakerRoomPress}
              style={styles.bakarModalJoinButton}
              title={translate('HomeScreen.Button.Proceed')}
            />
            {/* SkipButton */}
            <Button
              onPress={() => setShowBakarrPopup(false)}
              style={styles.bakarModalSkipButton}
              title={translate('HomeScreen.Text.Skip')}
            />
          </View>
        </Modal>
      )}
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 2,
    borderColor: theme.colors['Secondary'],
    borderWidth: 1,
    padding: 5,
  },
  liveBadgeContainer: {
    alignItems: 'center',
    backgroundColor: theme.colors['PF-Primary'],
    flexDirection: 'row',
    paddingHorizontal: 2,
    width: 100,
  },
  liveText: {
    color: theme.colors['PF-BG'],
    fontFamily: 'Inter_600SemiBold',
    fontSize: 10,
    marginRight: 4,
  },
  flexRow: {
    flexDirection: 'row',
  },
  image: {
    borderRadius: 20,
    height: 80,
    marginRight: 10,
    width: 80,
  },
  cardRight: {
    alignItems: 'flex-start',
    flexWrap: 'nowrap',
    marginLeft: 8,
  },
  cardRightHeader: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  bakarText: {
    color: theme.colors['Secondary'],
    fontFamily: 'Rubik_600SemiBold',
    fontSize: 12,
    marginRight: 4,
  },
  bakarTime: {
    color: theme.colors['PF-Grey'],
    fontFamily: 'Rubik_400Regular',
    fontSize: 10,
  },
  bakarTitle: {
    color: theme.colors['PF-Primary'],
    fontFamily: 'Rubik_400Regular',
    fontSize: 10,
    marginBottom: 4,
  },
  bakarRoomText: {
    fontFamily: 'Rubik_400Regular',
    fontSize: 10,
    color: theme.colors['PF-Grey'],
    marginBottom: 4,
  },
  diveInButton: {
    marginRight: 40,
    alignContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: theme.colors['Secondary'],
    borderRadius: 20,
    height: 22,
    justifyContent: 'center',
    marginTop: 2,
    width: 125,
  },
  diveInText: {
    color: theme.colors['PF-BG'],
    fontFamily: 'Montserrat_700Bold',
    fontSize: 12,
  },

  bakarModalContainer: {
    bottom: 0,
    left: 0,
    opacity: 0.3,
    position: 'absolute',
    right: 0,
    top: 0,
  },
  bakarModalSubContainer: {
    backgroundColor: theme.colors['Community_Cream'],
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    bottom: 0,
    height: 200,
    left: 0,
    paddingBottom: 15,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 15,
    position: 'absolute',
    right: 0,
    width: '100%',
  },
  bakarModalTitle: {
    alignSelf: 'center',
    color: theme.colors['Secondary'],
    fontFamily: 'Rubik_600SemiBold',
    fontSize: 18,
    marginBottom: 10,
    marginTop: 10,
  },
  bakarModalDivider: {
    height: 1,
  },
  bakarModalJoinButton: {
    borderRadius: 8,
    fontFamily: 'System',
    fontWeight: '700',
    textAlign: 'center',
  },
  bakarModalSkipButton: {
    backgroundColor: '"rgba(0, 0, 0, 0)"',
    color: theme.colors['PF-Grey'],
    fontFamily: 'System',
    fontSize: 12,
    fontWeight: '400',
  },

  bakarShimmer: {
    height: 80,
    width: '100%',
    borderRadius: 10,
    marginBottom: 10,
  },
})
