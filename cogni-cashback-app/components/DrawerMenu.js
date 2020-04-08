import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Button, ScrollView } from 'react-native'

import { actions } from '../reducers'

const DrawerMenu = ({ logout }) => (
  <ScrollView>
    <Button title="Logout" onPress={() => logout()} />
  </ScrollView>
)

const mapStateToProps = null
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      logout: actions.logout,
    },
    dispatch,
  )

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
)

export default withConnect(DrawerMenu)
