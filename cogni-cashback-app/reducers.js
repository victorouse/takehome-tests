import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { createActions, combineActions, handleActions } from 'redux-actions'
import R from 'ramda'

/**
 * Actions
 */

export const actions = createActions({
  SET_AUTH_MODE: null,
  MAP: {
    USER_LOCATION: {
      GET: null,
      SET: null,
    },
  },
  VENUES: {
    CALL: null,
    SUCCESS: null,
    ERROR: null,
    NEW: {
      CALL: null,
      SUCCESS: null,
      ERROR: null,
    },
  },
  LOGIN: {
    CALL: null,
    SUCCESS: null,
    ERROR: null,
  },
  SIGNUP: {
    CALL: null,
    SUCCESS: null,
    ERROR: null,
  },
  LOGOUT: null,
})

/**
 * User Interface Reducer
 */

const uiInitialState = {
  authMode: 'login',
}

const uiReducer = handleActions(
  {
    [actions.setAuthMode]: (state, action) =>
      R.mergeDeepRight(state, { authMode: action.payload.authMode }),
    [actions.logout]: () => uiInitialState,
  },
  uiInitialState,
)

/**
 * Map Reducer
 */

const mapInitialState = {
  userLocation: undefined,
  venues: {
    locations: [],
    loading: false,
    errors: {},
  },
}

const mapReducer = handleActions(
  {
    [actions.map.userLocation.set]: (state, action) =>
      R.mergeDeepRight(state, {
        userLocation: action.payload.coords,
      }),
    [actions.venues.call]: state =>
      R.mergeDeepRight(state, {
        venues: { locations: [], loading: true, errors: {} },
      }),
    [actions.venues.success]: (state, action) =>
      R.mergeDeepRight(state, {
        venues: { locations: action.payload.venues, loading: false },
      }),
    [actions.venues.error]: (state, action) =>
      R.mergeDeepRight(state, {
        venues: { loading: false, errors: action.payload.errors },
      }),
  },
  mapInitialState,
)

/**
 * Auth Reducer
 */

const authInitialState = {
  token: false,
  errors: {},
  loading: false,
}

const authReducer = handleActions(
  {
    [combineActions(actions.login.call, actions.signup.call)]: state =>
      R.mergeDeepRight(state, { loading: true, errors: {} }),
    [combineActions(actions.login.success, actions.signup.success)]: (
      state,
      action,
    ) =>
      R.mergeDeepRight(state, {
        token: action.payload.token,
        loading: false,
      }),
    [combineActions(actions.login.error, actions.signup.error)]: (
      state,
      action,
    ) =>
      R.mergeDeepRight(state, {
        errors: action.payload.errors,
        loading: false,
      }),
    [actions.logout]: () => authInitialState,
  },
  authInitialState,
)

/**
 * Venue Reducer
 */

const venueInitialState = {
  newVenue: {
    loading: false,
    errors: {},
  },
}

const venuesReducer = handleActions(
  {
    [actions.venues.new.call]: state =>
      R.mergeDeepRight(state, {
        newVenue: { loading: true, errors: {} },
      }),
    [actions.venues.new.success]: state =>
      R.mergeDeepRight(state, {
        newVenue: { loading: false },
      }),
    [actions.venues.new.error]: (state, action) =>
      R.mergeDeepRight(state, {
        newVenue: { loading: false, errors: action.payload.errors },
      }),
  },
  venueInitialState,
)

/**
 *  Redux persist configurations
 */

const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['token'],
}

export default combineReducers({
  ui: uiReducer,
  auth: persistReducer(authPersistConfig, authReducer),
  map: mapReducer,
  venues: venuesReducer,
})
