import * as types from '../constants/actionTypes';

const initialState = {
  characters: {},
  error: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case types.LOAD_CHARACTERS_SUCCESS:
      return {
        ...state,
        characters: {
          ...state.characters,
          ...action.characters
        }
      };

    case types.LOAD_CHARACTER_SUCCESS:
      const newCharacter = action.character;
      return {
        ...state,
        characters: {
          ...state.characters,
          ...newCharacter
        }
      };

    case types.LOAD_CHARACTER_ERROR:
      return {
        ...state,
        error: action.error
      };

    case types.LOAD_CHARACTER_HOMEWORLD_SUCCESS:
      return {
        ...state,
        characters: {
          ...state.characters,
          [action.characterId]: {
            ...state.characters[action.characterId],
            homeworld: action.homeworld
          }
        }
      };

    case types.LOAD_CHARACTER_HOMEWOLRD_ERROR:
      return {
        ...state,
        error: action.error
      };

    default:
      return state;
  }
}
