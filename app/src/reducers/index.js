import { combineReducers } from 'redux';
import movies from './movies.reducer';

const rootReducers = combineReducers({
  movies,
});

export default rootReducers;