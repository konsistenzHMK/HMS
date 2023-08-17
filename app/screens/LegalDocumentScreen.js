import { Circle, Icon, Touchable, withTheme } from '@draftbit/ui'
import React from 'react'
import { Text, ScrollView, StyleSheet, View } from 'react-native'
import legalDocs from '../legal-docs/legalDocs'

const LegalDocumentScreen = (props) => {
  const docName = props?.route?.params?.docName
  const { navigation } = props

  const pickDocumentToDisplay = () => {
    switch (docName) {
      case 'tnc':
        return legalDocs.tnc
      case 'privacyPolicy':
        return legalDocs.privacyPolicy
      case 'aboutUs':
        return legalDocs.aboutUs
      case 'support':
        return legalDocs.support

      default:
        return 'Something wrong with the file'
    }
  }

  return (
    <View style={styles.container}>
      <Touchable
        style={{ marginBottom: 5 }}
        onPress={() => {
          try {
            navigation.goBack()
          } catch (error) {
            console.log(error)
          }
        }}
      >
        <Circle size={31} bgColor="rgb(244, 246, 249)">
          <Icon name={'Ionicons/caret-back'} size={18} color="rgb(135, 140, 144)" />
        </Circle>
      </Touchable>
      <ScrollView>
        <Text style={styles.text}>{pickDocumentToDisplay()}</Text>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white',
  },
  text: {
    fontSize: 14,
    // lineHeight: 24,
    color: 'black',
  },
})

export default withTheme(LegalDocumentScreen)
