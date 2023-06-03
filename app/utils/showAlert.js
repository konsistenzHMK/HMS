import { Alert, Platform } from 'react-native'

const showAlert = ({ title, message, buttonText }) => {
  if (Platform.OS === 'web') {
    return message ? alert(message) : console.log('A message is required for an alert on the web.')
  }

  return Alert.alert(title, message, [{ text: buttonText }])
}

export default showAlert
