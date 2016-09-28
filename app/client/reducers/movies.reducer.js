import * as type from '../constant/actionType';

export default function movie(state = {
  isFetching: false,
  items: [],
  searchResult: [],
}, action) {
  switch (action.type) {
    case type.FETCH_MOVIES_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
      });
    case type.FETCH_MOVIES_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        items: action.data
      });
    case type.FETCH_MOVIES_INFO:
      return Object.assign({}, state, {
        isFetching: false,
        items: state.items.concat(action.data)
      });
    case type.SEARCH_MOVIES_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        searchResult: action.data,
      });
    default:
      return state;
  }
}