import Datastore from 'nedb';
import config from '../../config';
import * as type from '../constant/actionType';

const db = new Datastore({ filename: config.dataPath, autoload: true });


export function fetchMoviesInfo (files) {
  return (dispatch, getState) => {
    dispatch(requestMoviesInfo());
    window.fetch('http://localhost:4444/api/v1.0/movies')
      .then((response)=> {
        return response.json();
      })
      .then((data) => {
        console.log(files);
        dispatch(receiveMoviesInfo(files))
      });
  };
}

export function requestMoviesInfo () {
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

export function requestSearchMovie (keyword) {
  return (dispatch, getState) => {
    window.fetch('http://localhost:4444/api/v1.0/search/movies?q=title:' + keyword)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        dispatch(receiveSearchMovie(data));
      })
  }
}

export function requestSearchMovieInDouban (keyword) {
  return (dispatch, getState) => {
    window.fetch('http://api.douban.com/v2/movie/search?q=' + keyword)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        db.find({}, function(err, result){
          console.log(result);
        });
        dispatch(receiveSearchMovie(data.subjects));
      })
  }
}

export function receiveSearchMovie (movies) {
  return {
    type: type.SEARCH_MOVIES_SUCCESS,
    data: movies
  }
}