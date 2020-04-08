import { Alert } from 'react-native'
import { takeLatest, call, put, select } from 'redux-saga/effects'
import { Actions } from 'react-native-router-flux'
import { Location, Permissions } from 'expo'
import R from 'ramda'

import { COGNI_HQ_LOCATION, DEFAULT_DELTA } from './utils'
import { persistor } from './store'
import { actions } from './reducers'

const cogniBaseUrl = 'https://cashback-explorer-api.herokuapp.com/'

const httpRequest = baseUrl =>
  function* callServer({ endpoint, params = {}, method, body }) {
    const token = yield select(R.path(['auth', 'token']))
    const contentType = { 'Content-Type': 'application/json' }
    const authorization = { Token: `${token}` }
    const headers = token
      ? { ...authorization, ...contentType }
      : { ...contentType }

    const queryString = Object.entries(params)
      .map(([k, v]) => `${k}=${encodeURIComponent(v)}`)
      .map((x, i) => (i === 0 ? `?${x}` : x))
      .join('&')

    const url = [baseUrl, endpoint, queryString].join('')

    const requestBody =
      method !== 'GET' ? { body: JSON.stringify(body || {}) } : {}

    try {
      const response = yield call(fetch, url, {
        headers: new Headers(headers),
        method,
        ...requestBody,
      })

      const responseBody = yield call([response, response.json])

      return {
        data: responseBody,
        headers: response.headers,
        status: response.status,
      }
    } catch (error) {
      return { error }
    }
  }

const cogniApiRequest = httpRequest(cogniBaseUrl)

function* loginSaga({ payload }) {
  const { email, name } = payload

  const { data, headers, error } = yield call(cogniApiRequest, {
    method: 'POST',
    endpoint: 'login',
    body: { email, name },
  })

  if (error) {
    yield put(actions.signup.error({ errors: [error] }))
  } else if (data.errors) {
    yield put(
      actions.signup.error({
        errors: data.errors,
      }),
    )
  } else {
    yield put(actions.signup.success({ token: headers.get('token') }))
    yield call(Actions.map)
  }
}

function* signupSaga({ payload }) {
  const { email, name } = payload

  const { data, headers, error } = yield call(cogniApiRequest, {
    method: 'POST',
    endpoint: 'users',
    body: { email, name },
  })

  if (error) {
    yield put(actions.signup.error({ errors: [error] }))
  } else if (data.errors) {
    yield put(
      actions.signup.error({
        errors: data.errors,
      }),
    )
  } else if (data.name === 'error' && data.detail) {
    Alert.alert(`Error: ${data.detail}`)
    yield put(actions.signup.success({ token: false }))
  } else {
    yield put(actions.signup.success({ token: headers.get('token') }))
    yield call(Actions.map)
  }
}

function* logoutSaga() {
  yield call(persistor.purge)
  yield call(Actions.auth)
}

function* getUserLocationSaga() {
  try {
    const { status } = yield call(Permissions.askAsync, Permissions.LOCATION)

    if (status === 'granted') {
      const location = yield call(Location.getCurrentPositionAsync, {})
      const coords = R.pick(['longitude', 'latitude'], location.coords)

      yield put(
        actions.map.userLocation.set({
          coords: { ...coords, ...DEFAULT_DELTA },
        }),
      )
    } else {
      yield put(
        actions.map.userLocation.set({
          coords: { ...COGNI_HQ_LOCATION, ...DEFAULT_DELTA },
        }),
      )
    }
  } catch (_) {
    yield put(
      actions.map.userLocation.set({
        coords: { ...COGNI_HQ_LOCATION, ...DEFAULT_DELTA },
      }),
    )
  }
}

function* getVenuesSaga() {
  const { data, error } = yield call(cogniApiRequest, {
    method: 'GET',
    endpoint: 'venues',
    params: { city: 'New York' },
  })

  if (error) {
    yield put(actions.venues.error({ errors: [error] }))
  } else {
    yield put(actions.venues.success({ venues: data.venues }))
  }
}

function* addVenuesSaga(action) {
  const { name, city, lat, long, cashback } = action.payload
  const { data, error } = yield call(cogniApiRequest, {
    method: 'POST',
    endpoint: 'venues',
    body: {
      name,
      city,
      lat: parseFloat(lat),
      long: parseFloat(long),
      cashback: parseFloat(cashback),
    },
  })

  if (error) {
    yield put(actions.venues.new.error({ errors: [error] }))
  } else if (data.errors) {
    yield put(
      actions.venues.new.error({
        errors: data.errors,
      }),
    )
  } else {
    const venues = yield select(state => state.map.venues.locations)
    venues.push(data.venue)
    yield put(actions.venues.success({ venues }))
    yield call(Actions.map)
  }
}

function* rootSaga() {
  yield takeLatest(actions.venues.new.call, addVenuesSaga)
  yield takeLatest(actions.venues.call, getVenuesSaga)
  yield takeLatest(actions.map.userLocation.get, getUserLocationSaga)
  yield takeLatest(actions.login.call, loginSaga)
  yield takeLatest(actions.signup.call, signupSaga)
  yield takeLatest(actions.logout, logoutSaga)
}

export default rootSaga
