import React from 'react'
import { Text, View } from 'react-native'

const DetailsScreen = ({ venue }) => (
  <View>
    <Text>{`Name: ${venue.name}`}</Text>
    <Text>{`City: ${venue.city}`}</Text>
    <Text>{`Cashback: ${venue.cashback}%`}</Text>
    {venue.user_id && <Text>{`Created by: ${venue.user_id}`}</Text>}
  </View>
)

export default DetailsScreen
