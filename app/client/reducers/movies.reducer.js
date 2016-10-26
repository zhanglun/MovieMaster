import * as type from '../constant/actionType';

export default function movie(state = {
  isFetching: false,
  items: [],
  searchResult: {
    subjects: [{
      "rating": {
        "max": 10,
        "average": 9.2,
        "stars": "50",
        "min": 0
      },
      "genres": [
        "剧情",
        "动画",
        "奇幻"
      ],
      "title": "千与千寻",
      "casts": [
        {
          "alt": "https://movie.douban.com/celebrity/1023337/",
          "avatars": {
            "small": "https://img3.doubanio.com/img/celebrity/small/1463193210.13.jpg",
            "large": "https://img3.doubanio.com/img/celebrity/large/1463193210.13.jpg",
            "medium": "https://img3.doubanio.com/img/celebrity/medium/1463193210.13.jpg"
          },
          "name": "柊瑠美",
          "id": "1023337"
        },
        {
          "alt": "https://movie.douban.com/celebrity/1005438/",
          "avatars": {
            "small": "https://img3.doubanio.com/img/celebrity/small/44986.jpg",
            "large": "https://img3.doubanio.com/img/celebrity/large/44986.jpg",
            "medium": "https://img3.doubanio.com/img/celebrity/medium/44986.jpg"
          },
          "name": "入野自由",
          "id": "1005438"
        },
        {
          "alt": "https://movie.douban.com/celebrity/1045797/",
          "avatars": {
            "small": "https://img3.doubanio.com/img/celebrity/small/18785.jpg",
            "large": "https://img3.doubanio.com/img/celebrity/large/18785.jpg",
            "medium": "https://img3.doubanio.com/img/celebrity/medium/18785.jpg"
          },
          "name": "夏木真理",
          "id": "1045797"
        }
      ],
      "collect_count": 752707,
      "original_title": "千と千尋の神隠し",
      "subtype": "movie",
      "directors": [
        {
          "alt": "https://movie.douban.com/celebrity/1054439/",
          "avatars": {
            "small": "https://img3.doubanio.com/img/celebrity/small/616.jpg",
            "large": "https://img3.doubanio.com/img/celebrity/large/616.jpg",
            "medium": "https://img3.doubanio.com/img/celebrity/medium/616.jpg"
          },
          "name": "宫崎骏",
          "id": "1054439"
        }
      ],
      "year": "2001",
      "images": {
        "small": "https://img3.doubanio.com/view/movie_poster_cover/ipst/public/p1910830216.jpg",
        "large": "https://img3.doubanio.com/view/movie_poster_cover/lpst/public/p1910830216.jpg",
        "medium": "https://img3.doubanio.com/view/movie_poster_cover/spst/public/p1910830216.jpg"
      },
      "alt": "https://movie.douban.com/subject/1291561/",
      "id": "1291561"
    }],
  },
  detail: {},
}, action) {
  switch (action.type) {
    case type.LOAD_LOCAL_DATA:
      return Object.assign({}, state, {
        items: state.items.concat(action.data),
      });
    case type.SEARCH_MOVIES_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
      });
      break;
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