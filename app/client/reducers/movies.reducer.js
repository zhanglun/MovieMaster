import * as type from '../constant/actionType';

export default function movie(state = {
  isFetching: false,
  items: [],
  searchResult: [],
  detail: {},
}, action) {
  switch (action.type) {
    case type.LOAD_LOCAL_DATA:
      return Object.assign({}, state, {
        items: state.items.concat(action.data),
      });
    case type.SEARCH_MOVIES_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
      });
      break;
    case type.SEARCH_MOVIES_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        searchResult: action.data,
      });
      break;
    case type.SEARCH_MOVIES_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        error: action.error,
      });
      break;
    default:
      return state;
  }
}