import * as type from '../constant/actionType';

let initState = {
  isFetching: false,
  items: [],
  searchResult: {},
  detail: {},
};

export default function movie(state = initState, action) {
  switch (action.type) {
    case type.LOAD_LOCAL_DATA:
      // var result = Object.assign({}, state);
      // action.data.map((item) => {
      //   result.items[item['_id']] = item;
      // });
      return Object.assign({}, state, {
        items: state.items.concat(action.data),
      });
    case type.LOAD_MOVIE_INFO_FROM_LOCAL:
      var { payload } = action;
      var detail = payload.detail;
      var result = Object.assign({}, state);
      result.detail[detail['_id']] = detail;
      result.isFetching = false;
      return result;
    case type.SEARCH_MOVIES_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
      });
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