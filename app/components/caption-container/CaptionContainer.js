import React, { useState } from 'react'
import { View, Text, TouchableOpacity, ScrollView } from 'react-native'

const CaptionContainer = ({ text, maxChars }) => {
  const [expanded, setExpanded] = useState(false)

  const toggleExpand = () => {
    setExpanded(!expanded)
  }

  return (
    <View style={{ paddingTop: 10, marginBottom: 3, width: '100%' }}>
      {!expanded ? (
        <Text numberOfLines={3} style={{ color: 'black', fontSize: 14 }}>
          {text.length > maxChars ? text.substring(0, maxChars) + '...' : text}
        </Text>
      ) : (
        <ScrollView style={{ maxHeight: 100 }} nestedScrollEnabled>
          <Text style={{ color: 'black', fontSize: 14 }}>{text}</Text>
        </ScrollView>
      )}
      {text.length > maxChars && (
        <TouchableOpacity onPress={toggleExpand}>
          <Text style={{ color: 'gray', marginTop: 3 }}>{expanded ? 'Less' : 'More'}</Text>
        </TouchableOpacity>
      )}
    </View>
  )
}

export default CaptionContainer
