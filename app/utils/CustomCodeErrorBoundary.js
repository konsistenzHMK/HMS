import React from 'react'
import { Text, View } from 'react-native'

export default class CustomCodeErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: undefined }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  render() {
    if (this.state.hasError) {
      return (
        <View style={{ padding: 8, backgroundColor: 'red' }}>
          <Text style={{ color: 'white' }}>
            There was a problem with your custom code. Check your custom code and make sure there are no errors.
          </Text>
          {this.state.error ? (
            <Text style={{ color: 'white' }}>
              {`
Error:
${this.state.error.toString()}`}
            </Text>
          ) : null}
        </View>
      )
    }

    return this.props.children
  }
}
