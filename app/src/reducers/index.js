import { combineReducers } from 'redux';
import movies from './movies.reducer';
import directorys from './directorys.reducer';

const rootReducers = combineReducers({
  directorys,
  movies,
});

export default rootReducers;