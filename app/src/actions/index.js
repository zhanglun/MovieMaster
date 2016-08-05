import * as type from '../../constant/actionType';

export function loadDirectory (path) {
  return {
    type: type.LOAD_DIRECTORY,
    path
  }
};