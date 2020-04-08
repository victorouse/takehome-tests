import React from 'react'
import { View, ImageBackground } from 'react-native'

const authBg = require('../assets/auth-bg.jpeg')

const BackgroundImage = ({ children }) => (
  <ImageBackground
    style={{
      backgroundColor: '#fff',
      flex: 1,
      position: 'absolute',
      width: '100%',
      height: '100%',
      justifyContent: 'center',
    }}
    source={authBg}
  >
    <View style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.65)' }}>
      {children}
    </View>
  </ImageBackground>
)

export default BackgroundImage
