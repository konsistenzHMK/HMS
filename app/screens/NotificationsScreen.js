import { Circle, Icon, ScreenContainer } from '@draftbit/ui'
import React, { useEffect } from 'react'
import { useWindowDimensions, Text, View, Touchable, FlatList, Pressable } from 'react-native'
import * as StyleSheet from '../utils/StyleSheet'
import { notificationStore } from '../store/notification'
import AsyncStorage from '@react-native-async-storage/async-storage'
import moment from 'moment'

function NotificationItem({ title = '', body = '', time }) {
  console.log('time', time)
  const ago = moment(time).fromNow()

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 10,
      }}
    >
      <Circle
        size={40}
        style={{
          backgroundColor: 'rgb(237, 70, 52)',
          marginRight: 10,
        }}
      >
        <Icon size={24} name={'Feather/bell'} />
      </Circle>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <View>
          <Text
            style={{
              fontFamily: 'Inter_500Medium',
              fontSize: 14,
            }}
          >
            {title}
          </Text>
          <Text
            style={{
              fontFamily: 'Inter_400Regular',
              fontSize: 12,
            }}
          >
            {body}
          </Text>
        </View>
        <View>
          <Text style={{ fontSize: 12 }}>{ago}</Text>
        </View>
      </View>
    </View>
  )
}

function NotificationsScreen(props) {
  const { navigation } = props
  const dimensions = useWindowDimensions()
  const notifications = notificationStore.useState((s) => s.notifications)
  console.log('abc', notifications)

  useEffect(() => {
    // set unread to false

    notificationStore.update((s) => {
      // s.notifications = s.notifications.map((n) => {
      //   return {
      //     ...n,
      //     unread: false,
      //   }
      // })
    })
  }, [])

  return (
    <ScreenContainer
      style={StyleSheet.applyWidth(
        {
          // backgroundColor: theme.colors['PF-BG'],
          marginLeft: 10,
          marginRight: 10,
          marginTop: 10,
        },
        dimensions.width,
      )}
      hasTopSafeArea={false}
      hasBottomSafeArea={false}
      scrollable={false}
      hasSafeArea={true}
    >
      <View
        style={StyleSheet.applyWidth(
          {
            alignItems: 'center',
            flexDirection: 'row',
          },
          dimensions.width,
        )}
      >
        {/* Screen Heading */}
        <Pressable
          onPress={() => {
            navigation.goBack()
          }}
        >
          <Icon name={'Ionicons/caret-back'} size={18} />
        </Pressable>
        <Text
          style={StyleSheet.applyWidth(
            {
              fontFamily: 'Inter_500Medium',
              fontSize: 16,
              marginLeft: 10,
            },
            dimensions.width,
          )}
        >
          {'Notifications'}
        </Text>

        <View style={{ flex: 1 }} />

        <Pressable
          onPress={() => {
            notificationStore.update((s) => {
              s.notifications = []
              AsyncStorage.setItem('@notification', JSON.stringify([]))
            })
          }}
        >
          <Icon name={'Ionicons/trash'} size={18} />
        </Pressable>
      </View>

      <FlatList
        data={[...notifications].reverse()}
        renderItem={({ item }) => <NotificationItem title={item.title} body={item.body} time={item.time} />}
        keyExtractor={(item) => item.id}
      />
    </ScreenContainer>
  )
}

export default NotificationsScreen
