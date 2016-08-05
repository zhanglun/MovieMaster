import {combineReducers} from 'redux';
import counter from './counter.reducer';

const rootReducers = combineReducers({
  counter
});

export default rootReducers;