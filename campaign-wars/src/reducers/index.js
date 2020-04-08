import { combineReducers } from 'redux';

import characters from '../reducers/charactersReducer';
import comments from '../reducers/commentsReducer';
import votes from '../reducers/votesReducer';

const rootReducer = combineReducers({
  characters,
  comments,
  votes
});

export default rootReducer;
