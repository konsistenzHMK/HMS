import React, { useEffect, useMemo, useState } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import { BottomTabNavigation } from './BottomTabNavigation'
import OnboardingScreen from '../screens/OnboardingScreen'
import SignupStartScreen from '../screens/SignupStartScreen'
import SignupOTPScreen from '../screens/SignupOTPScreen'
import FanClubSingleScreen from '../screens/FanClubSingleScreen'
import PostDetailsScreen from '../screens/PostDetailsScreen'
import MatchDaySingleScreen from '../screens/MatchDaySingleScreen'
import MySettingsScreen from '../screens/MySettingsScreen'
import EditProfileScreen from '../screens/EditProfileScreen'
import CreatePostScreen from '../screens/CreatePostScreen'
import OthersProfileScreen from '../screens/OthersProfileScreen'
import BakarRoomScreen from '../bakar-room/BakarRoomScreen'
import EditPostScreen from '../screens/EditPostScreen'
import NotificationsScreen from '../screens/NotificationsScreen'
import { navigationRef } from './NavigationRef'
import NavigationContext from './NavigationContext'
import * as GlobalVariables from '../config/GlobalVariableContext'
import SplashScreen from '../screens/SplashScreen'

export const AppNavigator = () => {
  const [stack, setStack] = useState('loading')
  const Stack = createStackNavigator()
  const Constants = GlobalVariables.useValues()

  useEffect(() => {
    if (!Constants['AUTHORIZATION_HEADER']) {
      setStack('login')
    } else {
      setStack('app')
    }
  }, [])

  const getCurrentStack = () => {
    switch (stack) {
      case 'loading':
        return <Stack.Screen options={{ headerShown: false }} name="Loading" component={SplashScreen} />
      case 'login':
        return (
          <React.Fragment>
            <Stack.Screen
              name="SignupStartScreen"
              component={SignupStartScreen}
              options={{
                title: 'Signup-Start',
              }}
            />
            <Stack.Screen
              name="SignupOTPScreen"
              component={SignupOTPScreen}
              options={{
                title: 'Signup-OTP',
              }}
            />
            <Stack.Screen
              name="OnboardingScreen"
              component={OnboardingScreen}
              options={{
                title: 'Onboarding',
              }}
            />
          </React.Fragment>
        )
      case 'app':
        return (
          <React.Fragment>
            <Stack.Screen name="App" component={BottomTabNavigation} />
            <Stack.Screen
              name="FanClubSingleScreen"
              component={FanClubSingleScreen}
              options={{
                title: 'FanClubSingle',
              }}
            />
            <Stack.Screen
              name="PostDetailsScreen"
              component={PostDetailsScreen}
              options={{
                title: 'PostDetails',
              }}
            />
            <Stack.Screen
              name="MatchDaySingleScreen"
              component={MatchDaySingleScreen}
              options={{
                title: 'MatchDaySingle',
              }}
            />
            <Stack.Screen
              name="MySettingsScreen"
              component={MySettingsScreen}
              options={{
                title: 'MySettings',
              }}
            />
            <Stack.Screen
              name="EditProfileScreen"
              component={EditProfileScreen}
              options={{
                title: 'Edit Profile',
              }}
            />
            <Stack.Screen
              name="CreatePostScreen"
              component={CreatePostScreen}
              options={{
                title: 'CreatePost',
              }}
            />
            <Stack.Screen
              name="OthersProfileScreen"
              component={OthersProfileScreen}
              options={{
                title: 'OthersProfile',
              }}
            />

            <Stack.Screen
              name="BakarRoomScreen"
              component={BakarRoomScreen}
              options={{
                title: 'Bakarr-Room',
              }}
            />
            <Stack.Screen
              name="EditPostScreen"
              component={EditPostScreen}
              options={{
                title: 'Edit Post',
              }}
            />

            <Stack.Screen
              name="NotificationsScreen"
              component={NotificationsScreen}
              options={{
                title: 'Notifications',
              }}
            />
          </React.Fragment>
        )
    }
  }

  const navigationContextValue = useMemo(() => ({ stack, setStack }), [stack, setStack])

  return (
    <NavigationContainer ref={navigationRef}>
      <NavigationContext.Provider value={navigationContextValue}>
        <Stack.Navigator screenOptions={{ headerShown: false }}>{getCurrentStack()}</Stack.Navigator>
      </NavigationContext.Provider>
    </NavigationContainer>
  )
}
