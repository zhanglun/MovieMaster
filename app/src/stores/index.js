import {createStore} from 'redux';
import {AppReducer} from '../reducers';
const AppStore = createStore(AppReducer);
export default AppStore;