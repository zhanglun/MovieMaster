import { createStore } from 'redux';
import rootReducers from '../reducers';
const AppStore = createStore(rootReducers);
export default AppStore;