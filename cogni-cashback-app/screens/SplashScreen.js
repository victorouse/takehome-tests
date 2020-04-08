import React from 'react'
import { connect } from 'react-redux'
import { View } from 'react-native'
import { Font } from 'expo'
import { Actions } from 'react-native-router-flux'

import { delay, cacheImages, cacheFonts } from '../utils'
import SplashLoading from '../components/SplashLoading'

const logoFont = require('../assets/fonts/typographExtraBold.ttf')
const cogniLogoWhite = require('../assets/cogni-logo-white.png')
const authBg = require('../assets/auth-bg.jpeg')

class SplashScreen extends React.Component {
  state = {
    appReady: false,
    assetsReady: false,
  }

  async componentDidMount() {
    await this.loadAssets()
    this.setState({ assetsReady: true })
    await delay(1400)
    this.setState({ appReady: true })
  }

  componentDidUpdate() {
    const { appReady } = this.state
    const { token } = this.props

    if (appReady) {
      if (token) {
        Actions.map()
      } else {
        Actions.auth()
      }
    }
  }

  loadAssets = () => {
    const imageAssets = cacheImages([cogniLogoWhite, authBg])
    const fontAssets = cacheFonts([{ logoFont }])

    return Promise.all([...imageAssets, ...fontAssets])
  }

  render() {
    const { assetsReady } = this.state

    if (assetsReady) {
      return (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#fff',
          }}
        >
          <SplashLoading />
        </View>
      )
    }

    return null
  }
}

const mapStateToProps = state => ({
  token: state.auth.token,
})

const withConnect = connect(mapStateToProps)

export default withConnect(SplashScreen)
