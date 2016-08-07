import * as type from '../../constant/actionType';

// const state = {};

export default function directory(state =[], action) {
  switch(action.type){
    case type.LOAD_DIRECTORY:
      return state.concat(data);
    default:
      return state;
  }
}