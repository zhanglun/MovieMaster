import {combineReducers} from 'redux';
import files from './files.reducer';

const rootReducers = combineReducers({
  files
});

export default rootReducers;