import React from 'react'
import { connect } from 'react-redux'
import { View, ActivityIndicator, StatusBar } from 'react-native'
import { Actions } from 'react-native-router-flux'

class AuthLoadingScreen extends React.Component {
  componentDidMount() {
    const { auth } = this.props

    setTimeout(() => {
      if (auth) {
        Actions.map()
      } else {
        Actions.auth()
      }
    }, 0)
  }

  render() {
    return (
      <View>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    )
  }
}

const mapStateToProps = ({ auth }) => ({
  auth,
})

const withConnect = connect(mapStateToProps)

export default withConnect(AuthLoadingScreen)
