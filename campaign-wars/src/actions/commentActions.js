import * as types from '../constants/actionTypes';

export const addCommentAction = (comment) => ({
  type: types.ADD_CHARACTER_COMMENT,
  comment: {
    characterId: comment.characterId,
    text: comment.text
  }
});
