import React from 'react'
import { Image, Text, View } from 'react-native'
import { MapView } from 'expo'
import styled from 'styled-components'

const Wrapper = styled(View)`
  background-color: transparent;
`

const Bubble = styled(View)`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;

  width: 75;
  height: 50;

  background-color: white;
  border-color: #d9d9d9;
  border-radius: 10;

  box-shadow: 3px 10px 15px rgba(0, 0, 0, 0.3);
  padding: 5px;
`

const BubbleImage = styled(Image)`
  width: 25;
  height: 25;
`

const BubbleText = styled(Text)`
  font-weight: bold;
`

const Triangle = styled(View)`
  position: absolute;
  bottom: -13;
  left: 18;

  width: 0;
  height: 0;

  border-left-color: transparent;
  border-left-width: 6;

  border-top-color: white;
  border-top-width: 13;

  border-right-color: transparent;
  border-right-width: 6;
`
const logos = [
  'starbucks.com',
  'trumptowerny.com',
  'dunkindonuts.com',
  'walmart.com',
  'jambajuice.com',
]

const randomLogo = () =>
  [
    'https://logo.clearbit.com/',
    logos[Math.floor(Math.random() * logos.length)],
  ].join('')

const PlaceMarker = ({ coordinate, venue, onPress }) => (
  <MapView.Marker coordinate={coordinate} onPress={onPress}>
    <Wrapper>
      <Bubble>
        <BubbleImage source={{ uri: randomLogo() }} />
        <BubbleText>{`${venue.cashback}%`}</BubbleText>
      </Bubble>
      <Triangle />
    </Wrapper>
  </MapView.Marker>
)

export default PlaceMarker
