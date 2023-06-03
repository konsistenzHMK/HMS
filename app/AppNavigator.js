import * as React from 'react'
import { Icon } from '@draftbit/ui'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import theme from './themes/DraftbitTheme.js'
import LinkingConfiguration from './LinkingConfiguration.js'

import BakarrUIScreen from './screens/BakarrUIScreen'
import CreatePostScreen from './screens/CreatePostScreen'
import EditNotificationPrefsScreen from './screens/EditNotificationPrefsScreen'
import EditPostScreen from './screens/EditPostScreen'
import EditProfileScreen from './screens/EditProfileScreen'
import FanClubSingleScreen from './screens/FanClubSingleScreen'
import HomeScreen from './screens/HomeScreen'
import MatchDaySingleScreen from './screens/MatchDaySingleScreen'
import MatchDaysAllScreen from './screens/MatchDaysAllScreen'
import MyFanClubsScreen from './screens/MyFanClubsScreen'
import MyProfileScreen from './screens/MyProfileScreen'
import MySettingsScreen from './screens/MySettingsScreen'
import OnboardingScreen from './screens/OnboardingScreen'
import OthersProfileScreen from './screens/OthersProfileScreen'
import PostDetailsScreen from './screens/PostDetailsScreen'
import SearchScreen from './screens/SearchScreen'
import SignupOTPScreen from './screens/SignupOTPScreen'
import SignupStartScreen from './screens/SignupStartScreen'
import TestuserdataScreen from './screens/TestuserdataScreen'

const Stack = createStackNavigator()
const Tab = createBottomTabNavigator()

const ScreenOptions = {
  headerShown: false,
  tabBarActiveTintColor: 'rgb(237, 70, 52)',
  tabBarInactiveTintColor: 'rgb(66, 66, 66)',
  tabBarShowLabel: false,
  tabBarLabelStyle: {
    fontSize: 10,
    letterSpacing: 0,
    lineHeight: 16,
  },
  tabBarStyle: [
    {
      display: 'flex',
    },
    null,
  ],
}

function Tabs() {
  return (
    <Tab.Navigator initialRouteName="HomeScreen" screenOptions={ScreenOptions} backBehavior="history">
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          title: 'Home',
          tabBarIcon: ({ focused, color }) => (
            <Icon
              name="Foundation/home"
              size={25}
              color={focused ? theme.colors['PF-Primary'] : theme.colors['PF-Grey']}
            />
          ),
          tabBarLabel: 'Home',
        }}
      />
      <Tab.Screen
        name="MatchDaysAllScreen"
        component={MatchDaysAllScreen}
        options={{
          title: 'MatchDaysAll',
          tabBarIcon: ({ focused, color }) => (
            <Icon
              name="MaterialIcons/sports-cricket"
              size={25}
              color={focused ? theme.colors['PF-Primary'] : theme.colors['PF-Grey']}
            />
          ),
          tabBarLabel: 'My Matches',
        }}
      />
      <Tab.Screen
        name="MyFanClubsScreen"
        component={MyFanClubsScreen}
        options={{
          title: 'MyFanClubs',
          tabBarIcon: ({ focused, color }) => (
            <Icon
              name="FontAwesome/group"
              size={25}
              color={focused ? theme.colors['PF-Primary'] : theme.colors['PF-Grey']}
            />
          ),
          tabBarLabel: 'My Clubs',
        }}
      />
      <Tab.Screen
        name="SearchScreen"
        component={SearchScreen}
        options={{
          title: 'Search',
          tabBarIcon: ({ focused, color }) => (
            <Icon
              name="FontAwesome/search"
              size={25}
              color={focused ? theme.colors['PF-Primary'] : theme.colors['PF-Grey']}
            />
          ),
          tabBarLabel: 'Search',
        }}
      />
      <Tab.Screen
        name="MyProfileScreen"
        component={MyProfileScreen}
        options={{
          title: 'MyProfile',
          tabBarIcon: ({ focused, color }) => (
            <Icon
              name="FontAwesome/user-circle"
              size={25}
              color={focused ? theme.colors['PF-Primary'] : theme.colors['PF-Grey']}
            />
          ),
          tabBarLabel: 'Profile',
        }}
      />
    </Tab.Navigator>
  )
}

export default function RootAppNavigator() {
  return (
    <NavigationContainer linking={LinkingConfiguration}>
      <Stack.Navigator screenOptions={ScreenOptions} initialRouteName="Tabs">
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
          name="EditNotificationPrefsScreen"
          component={EditNotificationPrefsScreen}
          options={{
            title: 'Edit Notification Prefs',
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
          name="OnboardingScreen"
          component={OnboardingScreen}
          options={{
            title: 'Onboarding',
          }}
        />
        <Stack.Screen
          name="BakarrUIScreen"
          component={BakarrUIScreen}
          options={{
            title: 'Bakarr-UI',
          }}
        />
        <Stack.Screen
          name="TestuserdataScreen"
          component={TestuserdataScreen}
          options={{
            title: 'Test - user data',
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
        <Stack.Screen name="Tabs" component={Tabs} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
