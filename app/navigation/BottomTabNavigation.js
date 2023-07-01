import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeScreen from '../screens/HomeScreen'
import MatchDaysAllScreen from '../screens/MatchDaysAllScreen'
import MyFanClubsScreen from '../screens/MyFanClubsScreen'
import MyProfileScreen from '../screens/MyProfileScreen'
import SearchScreen from '../screens/SearchScreen'
import { Icon } from '@draftbit/ui'
import theme from '../themes/DraftbitTheme'

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

export const BottomTabNavigation = () => {
  return (
    <Tab.Navigator initialRouteName="HomeScreen" screenOptions={ScreenOptions} backBehavior="history">
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          title: 'Home',
          tabBarIcon: ({ focused }) => (
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
          tabBarIcon: ({ focused }) => (
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
          tabBarIcon: ({ focused }) => (
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
          tabBarIcon: ({ focused }) => (
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
          tabBarIcon: ({ focused }) => (
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
