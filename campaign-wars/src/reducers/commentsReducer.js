import * as types from '../constants/actionTypes';

const initialState = {
  comments: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case types.ADD_CHARACTER_COMMENT:
      const commentId = state.comments[action.comment.characterId] ?
        state.comments[action.comment.characterId].reduce((maxId, comment) => Math.max(comment.id, maxId), -1) + 1
      : 0;

      const characterComments = state.comments[action.comment.characterId] ? state.comments[action.comment.characterId] : false;

      if (characterComments) {
        return {
          ...state,
          comments: {
            ...state.comments,
            [action.comment.characterId]:
              [
                ...state.comments[action.comment.characterId],
                {
                  id: commentId,
                  text: action.comment.text
                }
              ]
          }
        };
      }

      return {
        ...state,
        comments: {
          ...state.comments,
          [action.comment.characterId]:
            [
              {
                id: commentId,
                text: action.comment.text
              }
            ]
        }
      };

    default:
      return state;
  }
}
