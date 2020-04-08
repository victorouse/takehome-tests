import { put, call } from 'redux-saga/effects';
import { swapi } from '../api';
import * as types from '../constants/actionTypes';

export function* getCharactersSaga() {
  try {
    const characters = yield call(swapi.getCharacters);
    yield put({ type: types.LOAD_CHARACTERS_SUCCESS, characters });
  } catch (error) {
    yield put({ type: types.LOAD_CHARACTER_ERROR, error });
  }
}

export function* getCharacterSaga({ characterId }) {
  try {
    const character = yield call(swapi.getCharacter, characterId);

    if (character.error) {
      yield put({ type: types.LOAD_CHARACTER_ERROR, error: character.message });
    } else {
      yield put({ type: types.LOAD_CHARACTER_SUCCESS, character });
    }
  } catch (error) {
    yield put({ type: types.LOAD_CHARACTER_ERROR, error });
  }
}

export function* getCharacterHomeworldSaga({ characterId, homeworldUrl }) {
  try {
    const homeworld = yield call(swapi.getCharacterHomeworld, homeworldUrl);

    if (homeworld.error) {
      yield put({ type: types.LOAD_CHARACTER_HOMEWORLD_ERROR, error: homeworld.message });
    } else {
      yield put({ type: types.LOAD_CHARACTER_HOMEWORLD_SUCCESS, characterId, homeworld });
    }
  } catch (error) {
    yield put({ type: types.LOAD_CHARACTER_HOMEWORLD_ERROR, error });
  }
}
