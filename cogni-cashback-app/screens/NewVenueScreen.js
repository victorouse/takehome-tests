import React from 'react'
import { Text, View } from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Formik } from 'formik'
import R from 'ramda'

import { renderError } from '../utils'
import { actions } from '../reducers'
import TextInput from '../components/TextInput'
import Button from '../components/Button'

const submitForm = addNewVenue => ({ name, city, lat, long, cashback }) => {
  console.log({ name, city, lat, long, cashback })
  addNewVenue({ name, city, lat, long, cashback })
}

const validate = values => {
  const errors = {}

  if (!values.name) {
    errors.name = 'Name is required'
  }

  if (!values.city) {
    errors.city = 'City is required'
  }

  if (values.lat) {
    if (Number.isNaN(parseFloat(values.lat))) {
      errors.lat = 'Latitude must be a number'
    } else if (parseFloat(values.lat) < -85 || parseFloat(values.lat) > 85) {
      errors.lat = 'Latitude must be between -85 and 85'
    }
  } else {
    errors.lat = 'Latitude is required'
  }

  if (values.long) {
    if (Number.isNaN(parseFloat(values.long))) {
      errors.long = 'Longitude must be a number'
    } else if (
      parseFloat(values.long) < -180 ||
      parseFloat(values.long) > 180
    ) {
      errors.long = 'Longitude must be between -180 and 180'
    }
  } else {
    errors.long = 'Longitude is required'
  }

  if (values.cashback) {
    if (Number.isNaN(parseFloat(values.cashback))) {
      errors.cashback = 'Cashback must be a number'
    } else if (
      parseFloat(values.cashback) <= 0 ||
      parseFloat(values.cashback) > 80
    ) {
      errors.cashback = 'Cashback must be between 0 and 80'
    }
  } else {
    errors.cashback = 'Cashback is required'
  }

  return errors
}

export const AddVenueScreen = ({ newVenue, addNewVenue }) => (
  <View style={{ padding: 20 }}>
    <Formik onSubmit={submitForm(addNewVenue)} validate={validate}>
      {({ handleSubmit, handleChange, handleBlur, errors, touched }) => (
        <React.Fragment>
          <TextInput
            placeholder="Name"
            onChangeText={handleChange('name')}
            onBlur={handleBlur('name')}
            style={!(touched.name && errors.name) && { marginBottom: 20 }}
          />

          {touched.name &&
            errors.name && <Text style={{ color: 'red' }}>{errors.name}</Text>}

          <TextInput
            placeholder="City"
            onChangeText={handleChange('city')}
            onBlur={handleBlur('city')}
            style={!(touched.city && errors.city) && { marginBottom: 20 }}
          />

          {touched.city &&
            errors.city && <Text style={{ color: 'red' }}>{errors.city}</Text>}

          <View style={{ flexDirection: 'row' }}>
            <View style={{ flex: 1, marginRight: 10 }}>
              <TextInput
                placeholder="Latitude"
                onChangeText={handleChange('lat')}
                onBlur={handleBlur('lat')}
                style={
                  !(touched.lat && errors.lat)
                    ? { marginBottom: 20, justifyContent: 'flex-start' }
                    : { justifyContent: 'flex-start' }
                }
              />

              {touched.lat &&
                errors.lat && (
                  <Text style={{ color: 'red' }}>{errors.lat}</Text>
                )}
            </View>

            <View style={{ flex: 1, marinLeft: 10 }}>
              <TextInput
                placeholder="Longitude"
                onChangeText={handleChange('long')}
                onBlur={handleBlur('long')}
                style={
                  !(touched.long && errors.long)
                    ? { marginBottom: 20, justifyContent: 'flex-end' }
                    : { justifyContent: 'flex-end' }
                }
              />

              {touched.long &&
                errors.long && (
                  <Text style={{ color: 'red' }}>{errors.long}</Text>
                )}
            </View>
          </View>

          <TextInput
            placeholder="Cashback"
            onChangeText={handleChange('cashback')}
            onBlur={handleBlur('cashback')}
            style={
              !(touched.cashback && errors.cashback) && { marginBottom: 20 }
            }
          />

          {touched.cashback &&
            errors.cashback && (
              <Text style={{ color: 'red' }}>{errors.cashback}</Text>
            )}

          {!R.isEmpty(newVenue.errors) && (
            <View style={{ alignItems: 'center' }}>
              {Array.isArray(newVenue.errors)
                ? newVenue.errors.map(renderError)
                : renderError(newVenue.errors)}
            </View>
          )}

          <Button
            title={newVenue.loading ? 'Loading...' : 'Add Venue'}
            disabled={newVenue.loading}
            onPress={handleSubmit}
          />
        </React.Fragment>
      )}
    </Formik>
  </View>
)

const mapStateToProps = state => ({
  newVenue: state.venues.newVenue,
})
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      addNewVenue: actions.venues.new.call,
    },
    dispatch,
  )

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
)

export default withConnect(AddVenueScreen)
