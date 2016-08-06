import { combineReducers } from 'redux';
import counter from './counter.reducer';
import movie from './movie.reducer';

const rootReducers = combineReducers({
  counter,
  movie,
});

export default rootReducers;