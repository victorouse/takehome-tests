import { fork } from 'redux-saga/effects';
import {
  watchLoadCharactersRequest,
  watchLoadCharacterRequest,
  watchLoadCharacterHomeworldRequest
} from './watcher';

export default function* startForeman() {
  yield fork(watchLoadCharactersRequest);
  yield fork(watchLoadCharacterRequest);
  yield fork(watchLoadCharacterHomeworldRequest);
}
