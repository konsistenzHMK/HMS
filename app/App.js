import React, { useEffect } from 'react'
import { SafeAreaProvider, initialWindowMetrics } from 'react-native-safe-area-context'
import { Provider as ThemeProvider } from '@draftbit/ui'
import { QueryClient, QueryClientProvider } from 'react-query'
import { AppFonts } from './themes/fonts'
import DraftbitTheme from './themes/DraftbitTheme.js'
import cacheAssetsAsync from './config/cacheAssetsAsync'
import { GlobalVariableProvider } from './config/GlobalVariableContext'
import { useFonts } from 'expo-font'
import { SnackbarProvider } from './components'
import messaging from '@react-native-firebase/messaging'
import { PermissionsAndroid, LogBox, StatusBar } from 'react-native'
import SplashScreen from './screens/SplashScreen'
import { AppNavigator } from './navigation/AppNavigator'

PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS)

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
              <StatusBar barStyle="dark-content" backgroundColor="#fff" />
              <AppNavigator />
            </SnackbarProvider>
          </ThemeProvider>
        </QueryClientProvider>
      </GlobalVariableProvider>
    </SafeAreaProvider>
  )
}

export default App
