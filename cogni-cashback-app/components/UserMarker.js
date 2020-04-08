import React from 'react'
import { View } from 'react-native'
import { MapView } from 'expo'
import styled from 'styled-components'

const RADIUS_SIZE = 50
const MARKER_SIZE = 20

const Circle = styled(View)`
  height: ${MARKER_SIZE};
  width: ${MARKER_SIZE};
  border-width: 3;
  border-color: white;
  border-radius: ${MARKER_SIZE / 2};
  overflow: hidden;
  background-color: #007aff;
`

const Radius = styled(View)`
  height: ${RADIUS_SIZE};
  width: ${RADIUS_SIZE};
  border-radius: ${RADIUS_SIZE / 2};
  overflow: hidden;
  background-color: rgba(0, 122, 255, 0.1);
  border-color: rgba(0, 122, 255, 0.3);
  border-width: 1;
  align-items: center;
  justify-content: center;
`

const UserMarker = props => (
  <MapView.Marker {...props}>
    <Radius>
      <Circle />
    </Radius>
  </MapView.Marker>
)

export default UserMarker
