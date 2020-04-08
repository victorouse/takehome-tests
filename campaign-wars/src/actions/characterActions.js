import * as types from '../constants/actionTypes';

export const loadCharactersAction = () => ({
  type: types.LOAD_CHARACTERS_REQUEST
});

export const loadCharacterAction = (characterId) => ({
  type: types.LOAD_CHARACTER_REQUEST,
  characterId
});

export const loadCharacterHomeworldAction = (characterId, homeworldUrl) => ({
  type: types.LOAD_CHARACTER_HOMEWORLD_REQUEST,
  characterId,
  homeworldUrl
});
