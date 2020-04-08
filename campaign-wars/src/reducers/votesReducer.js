import * as types from '../constants/actionTypes';

const initialState = {
  votes: {
    total: 0
  }
};

export default function(state = initialState, action) {
  switch (action.type) {
    case types.UPVOTE_CHARACTER:
      const characterUpVotes = state.votes.hasOwnProperty(action.characterId) ?
        state.votes[action.characterId].upVotes : false;

      if (characterUpVotes) {
        return {
          ...state,
          votes: {
            ...state.votes,
            [action.characterId]: {
              ...state.votes[action.characterId],
              upVotes: characterUpVotes + 1
            }
          }
        };
      }

      return {
        ...state,
        votes: {
          ...state.votes,
          [action.characterId]: {
            ...state.votes[action.characterId],
            upVotes: 1
          }
        }
      }

    case types.DOWNVOTE_CHARACTER:
      const characterDownVotes = state.votes.hasOwnProperty(action.characterId) ?
        state.votes[action.characterId].downVotes : false;

      if (characterDownVotes) {
        return {
          ...state,
          votes: {
            ...state.votes,
            [action.characterId]: {
              ...state.votes[action.characterId],
              downVotes: characterDownVotes + 1
            }
          }
        };
      }

      return {
        ...state,
        votes: {
          ...state.votes,
          [action.characterId]: {
            ...state.votes[action.characterId],
            downVotes: 1
          }
        }
      }

    default:
      return state;
  }
}
