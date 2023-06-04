/**
 * @format
 */

import { AppRegistry, LogBox } from 'react-native'
// import { BakarRoom as App } from './app/bakar-room/BakarRoom'
import App from './app/App'
import { name as appName } from './app.json'

LogBox.ignoreLogs(['new NativeEventEmitter']) // Ignore log notification by message
LogBox.ignoreAllLogs() //Ignore all log notifications

AppRegistry.registerComponent(appName, () => App)
