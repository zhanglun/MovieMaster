import * as type from '../../constant/actionType';

export default function movie(state = {
  isFetching: false,
  items: []
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
      return [].concat(action.data);
    default:
      return state;
  }
}