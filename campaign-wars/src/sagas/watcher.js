import { takeLatest } from 'redux-saga/effects';
import { getCharactersSaga, getCharacterSaga, getCharacterHomeworldSaga } from './characterSaga';
import * as types from '../constants/actionTypes';

export function* watchLoadCharactersRequest() {
  yield takeLatest(types.LOAD_CHARACTERS_REQUEST, getCharactersSaga);
}

export function* watchLoadCharacterRequest() {
  yield takeLatest(types.LOAD_CHARACTER_REQUEST, getCharacterSaga);
}

export function* watchLoadCharacterHomeworldRequest() {
  yield takeLatest(types.LOAD_CHARACTER_HOMEWORLD_REQUEST, getCharacterHomeworldSaga);
}
