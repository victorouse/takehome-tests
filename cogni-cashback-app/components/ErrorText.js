import React from 'react'
import { Text } from 'react-native'

const ErrorText = ({ children, ...props }) => (
  <Text
    style={{
      color: 'red',
      paddingTop: 10,
      paddingBottom: 20,
      alignSelf: 'flex-start',
    }}
    {...props}
  >
    {children}
  </Text>
)

export default ErrorText
