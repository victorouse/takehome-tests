import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { MapView } from 'expo'
import { Actions } from 'react-native-router-flux'

import { actions } from '../reducers'
import { withDefaultLocation } from '../utils'
import UserMarker from '../components/UserMarker'
import PlaceMarker from '../components/PlaceMarker'

class MapScreen extends React.Component {
  async componentDidMount() {
    const { getUserLocation, getVenues } = this.props
    console.log('cdm MapScreen')
    getUserLocation()
    getVenues()
  }

  render() {
    const { userLocation, venues } = this.props

    return (
      <MapView style={{ flex: 1 }} region={withDefaultLocation(userLocation)}>
        {userLocation && <UserMarker coordinate={userLocation} />}
        {venues.locations.length > 0 &&
          venues.locations.map(venue => (
            <PlaceMarker
              key={venue.id || `${venue.lat}-${venue.lon}`}
              coordinate={{ longitude: venue.long, latitude: venue.lat }}
              venue={venue}
              onPress={() => Actions.details({ venue })}
            />
          ))}
      </MapView>
    )
  }
}

const mapStateToProps = state => ({
  userLocation: state.map.userLocation,
  venues: state.map.venues,
})
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getUserLocation: actions.map.userLocation.get,
      getVenues: actions.venues.call,
    },
    dispatch,
  )

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
)

export default withConnect(MapScreen)
