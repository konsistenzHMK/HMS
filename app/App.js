import React, { useEffect } from 'react'
import * as Notifications from 'expo-notifications'
import * as SplashScreen from 'expo-splash-screen'
import { SafeAreaProvider, initialWindowMetrics } from 'react-native-safe-area-context'
import { Provider as ThemeProvider } from '@draftbit/ui'
import { QueryClient, QueryClientProvider } from 'react-query'
import { AppFonts } from './themes/fonts'
import AppNavigator from './AppNavigator'
import DraftbitTheme from './themes/DraftbitTheme.js'
import cacheAssetsAsync from './config/cacheAssetsAsync'
import { GlobalVariableProvider } from './config/GlobalVariableContext'
import { useFonts } from 'expo-font'

SplashScreen.preventAutoHideAsync()

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
    async function prepare() {
      try {
        await cacheAssetsAsync()
      } catch (e) {
        console.warn(e)
      } finally {
        setIsReady(true)
      }
    }
    prepare()
  }, [])

  const onLayoutRootView = React.useCallback(async () => {
    if (isReady && fontsLoaded) {
      await SplashScreen.hideAsync()
    }
  }, [isReady, fontsLoaded])

  if (!isReady || !fontsLoaded) {
    return null
  }

  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics} onLayout={onLayoutRootView}>
      <GlobalVariableProvider>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider theme={DraftbitTheme}>
            <AppNavigator />
          </ThemeProvider>
        </QueryClientProvider>
      </GlobalVariableProvider>
    </SafeAreaProvider>
  )
}

export default App
