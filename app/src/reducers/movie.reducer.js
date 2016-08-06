import * as type from '../../constant/actionType';

export default function movie (state = [], action) {
  switch (action.type) {
    case type.FETCH_MOVIES_INFO:
      return [].concat(action.data);
    default:
      return state;
  }
}