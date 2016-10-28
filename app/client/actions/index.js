import * as type from '../constant/actionType';

export function loadLocalData(movies) {
  return {
    type: type.LOAD_LOCAL_DATA,
    data: movies,
  }
}

export function requestSearchInDouban(movies) {
  return {
    type: type.SEARCH_MOVIES_REQUEST,
    data: movies
  }
}
export function receiveSearchInDouban(movies) {
  return {
    type: type.SEARCH_MOVIES_SUCCESS,
    data: movies
  }
}
export function requestSearchInDoubanFailure(err) {
  return {
    type: type.SEARCH_MOVIES_FAILURE,
    error: err,
  }
}

export function loadMovieInfoFromLocal(detail){
  return {
    type: type.LOAD_MOVIE_INFO_FROM_LOCAL,
    detail: detail,
  }
}

// async actions
export function searchMovieInDoubanAsync(keyword, callback) {
  return (dispatch) => {
    dispatch(requestSearchInDouban());
    window.fetch('https://api.douban.com/v2/movie/search?q=' + keyword)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        callback();
        dispatch(receiveSearchInDouban(data));
      })
      .catch((err) => {
        callback();
        dispatch(requestSearchInDoubanFailure(err));
      })
  }
}

