import React from 'react'
import { connect } from 'react-redux'
import { Actions, Router, Scene } from 'react-native-router-flux'
import { Button, Text } from 'react-native'

import {
  AuthScreen,
  MapScreen,
  DetailsScreen,
  NewVenueScreen,
  SplashScreen,
} from './screens'
import { actions } from './reducers'

const Routes = ({ logout }) => (
  <Router>
    <Scene key="root">
      <Scene key="splash" hideNavBar component={SplashScreen} initial />
      <Scene
        key="map"
        title="Explore"
        component={MapScreen}
        renderLeftButton={() => (
          <Button title="Add Venue" onPress={() => Actions.addVenue()} />
        )}
        renderRightButton={() => (
          <Button title="Logout" onPress={() => logout()} />
        )}
      />
      <Scene key="auth" hideNavBar title="Login" component={AuthScreen} />
      <Scene
        key="details"
        renderTitle={({ venue }) => <Text>{venue.name}</Text>}
        component={({ venue }) => <DetailsScreen venue={venue} />}
      />
      <Scene key="addVenue" title="New Venue" component={NewVenueScreen} />
    </Scene>
  </Router>
)

const mapStateToProps = null
const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(actions.logout()),
})
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
)

export default withConnect(Routes)
