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
import SplashScreen from './screens/SplashScreen'
import { Platform } from 'react-native'

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
})

const queryClient = new QueryClient()

const App = () => {
  const [isReady, setIsReady] = React.useState(false)
  const [fontsLoaded] = useFonts(AppFonts)

  useEffect(() => {
    setTimeout(async () => {
      try {
        await cacheAssetsAsync()
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