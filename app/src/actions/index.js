import * as type from '../../constant/actionType';

export function fetchMoviesInfo () {
  return (dispatch, getState) => {
    window.fetch('http://localhost:8888/api/v1.0/movies')
      .then((response)=> {
        return response.json();
      })
      .then((data) => {
        dispatch(receiveMoviesInfo(data))
      });
  };
}

export function requestMoviesInfo (movies) {
  return {
    type: type.FETCH_MOVIES_REQUEST,
    data: []
  }
}

export function receiveMoviesInfo (movies) {
  return {
    type: type.FETCH_MOVIES_SUCCESS,
    data: movies
  }
}