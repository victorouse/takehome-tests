import React from 'react'
import { Font, Image, Asset } from 'expo'
import R from 'ramda'
import ErrorText from './components/ErrorText'

export const cacheImages = images =>
  images.map(image => {
    if (typeof image === 'string') {
      return Image.prefetch(image)
    }

    return Asset.fromModule(image).downloadAsync()
  })

export const cacheFonts = fonts => fonts.map(font => Font.loadAsync(font))

export const transformServerFormErrors = R.pipe(
  R.toPairs,
  R.map(([k, v]) => ({ name: k, error: v })),
)

export const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

export const uppercase = string =>
  string.slice(0, 1).toUpperCase() + string.slice(1)

export const stringIsValid = string =>
  string && string.length > 2 && string.length < 20

export const emailIsValid = email =>
  /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)

export const renderError = error =>
  Object.entries(error).map(([k, v]) => (
    <ErrorText key={k}>{[uppercase(k), v].join(' ')}</ErrorText>
  ))

export const COGNI_HQ_LOCATION = {
  latitude: 40.7274061,
  longitude: -74.0082387,
}

export const DEFAULT_DELTA = {
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
}

export const withDefaultLocation = R.defaultTo({
  ...COGNI_HQ_LOCATION,
  ...DEFAULT_DELTA,
})
