import React, { useEffect } from 'react'
import * as Notifications from 'expo-notifications'
import { SafeAreaProvider, initialWindowMetrics } from 'react-native-safe-area-context'
import { Provider as ThemeProvider } from '@draftbit/ui'
import { QueryClient, QueryClientProvider } from 'react-query'
import { AppFonts } from './themes/fonts'
import AppNavigator from './AppNavigator'
import DraftbitTheme from './themes/DraftbitTheme.js'
import cacheAssetsAsync from './config/cacheAssetsAsync'
import { GlobalVariableProvider } from './config/GlobalVariableContext'
import { useFonts } from 'expo-font'
import { SnackbarProvider } from './components'
import messaging from '@react-native-firebase/messaging'
import { PermissionsAndroid, LogBox } from 'react-native'
import OneSignal from 'react-native-onesignal'

PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS)
OneSignal.setAppId('e51a8dc2-3942-491a-85f9-b78d6ca8479f')
import SplashScreen from './screens/SplashScreen'

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
})

LogBox.ignoreLogs([/Warning/])

async function requestUserPermission() {
  const authStatus = await messaging().requestPermission()
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED || authStatus === messaging.AuthorizationStatus.PROVISIONAL

  if (enabled) {
    console.log('Authorization status:', authStatus)
  }
}

const queryClient = new QueryClient()

const App = () => {
  const [isReady, setIsReady] = React.useState(false)
  const [fontsLoaded] = useFonts(AppFonts)

  useEffect(() => {
    setTimeout(async () => {
      try {
        requestUserPermission()
        await cacheAssetsAsync()
        await messaging().registerDeviceForRemoteMessages()
      } catch (e) {
        console.warn(e)
      }
      setIsReady(true)
    }, 3000) // show splash screen for 3 seconds atleast
  }, [])

  if (!isReady || !fontsLoaded) {
    return <SplashScreen />
  }

  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <GlobalVariableProvider>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider theme={DraftbitTheme}>
            <SnackbarProvider>
              <AppNavigator />
            </SnackbarProvider>
          </ThemeProvider>
        </QueryClientProvider>
      </GlobalVariableProvider>
    </SafeAreaProvider>
  )
}

export default App
