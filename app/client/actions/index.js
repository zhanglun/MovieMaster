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

// async actions


export function searchMovieInDoubanAsync(keyword) {
  return (dispatch) => {
    // dispatch(requestSearchInDouban());
    window.fetch('https://api.douban.com/v2/movie/search?q=' + keyword)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        dispatch(receiveSearchInDouban(data));
      })
      .catch((err) => {
        dispatch(requestSearchInDoubanFailure(err));
      })
  }
}

