import * as types from '../constants/actionTypes';

export const upVoteAction = ({ characterId }) => ({
  type: types.UPVOTE_CHARACTER,
  characterId
});

export const downVoteAction = ({ characterId }) => ({
  type: types.DOWNVOTE_CHARACTER,
  characterId
});
