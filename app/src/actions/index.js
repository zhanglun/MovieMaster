import * as type from '../../constant/actionType';

export function loadDirectory (path) {
  return {
    type: type.LOAD_DIRECTORY,
    path
  }
}

export function fetchMoviesInfo () {
  console.log('fetch movie info');
  let data = [{
    "name": "肖申克的救赎",
    "origin_name": "The Shawshank Redemption",
    "poster": "http://img31.mtime.cn/mt/2014/03/07/123549.37376649_270X405X4.jpg",
    "type": "犯罪,剧情,1994年9月23日",
    "director": "弗兰克&#183;德拉邦特",
    "screen_writer": "斯蒂芬&#183;金,弗兰克&#183;德拉邦特",
    "region": "美国",
    "release_company": "哥伦比亚电影公司,...",
    "release_date": 1994,
    "alias": "刺激1995,月黑高飞",
    "synopsis": "银行家安迪因被陷害杀害妻子与她的情夫，被判两个终身监禁。入狱后，影片便以黑人狱友瑞德冷静的旁白来推进。监狱数十年如一日的改造会使原本自由的心灵习惯了牢笼的禁锢，而这也将是安迪的命运？"
  },
    {
      "name": "盗梦空间",
      "origin_name": "Inception",
      "poster": "http://img31.mtime.cn/mg/2014/01/06/105513.87424776_270X405X4.jpg",
      "type": "惊悚,科幻,冒险,2010年9月1日",
      "director": "克里斯托弗&#183;诺兰",
      "screen_writer": "克里斯托弗&#183;诺兰",
      "region": "美国,英国",
      "release_company": "华纳兄弟影片公司,...",
      "release_date": 2010,
      "alias": "全面启动,潜行凶间",
      "synopsis": "多姆·柯布能够潜入人们的梦境中，窃取潜意识中有价值的秘密，这也使他成为了一名国际逃犯。为了重回原本的生活，柯布和他的团队接受了一项任务，这次不是窃取思想，而是植入思想。如果他们成功，这就是一次完美犯罪。"
    },
    {
      "name": "阿甘正传",
      "origin_name": "Forrest Gump",
      "poster": "http://img31.mtime.cn/mg/2014/06/17/145458.79721395_270X405X4.jpg",
      "type": "战争,喜剧,爱情,1994年6月23日",
      "director": "罗伯特&#183;泽米吉斯",
      "screen_writer": "温斯顿&#183;格鲁姆,艾瑞克&#183;罗斯",
      "region": "美国",
      "release_company": "派拉蒙影业公司,...",
      "release_date": 1994,
      "synopsis": "阿甘的智商只有75，但凭借跑步的天赋，他顺利大学毕业。在越南战场，他结识了“捕虾迷”布巴和丹中尉。回国后，阿甘机缘巧合累积了大量资产。不过，钱并不是阿甘所看重的东西。阿甘和珍妮青梅竹马，可珍妮有自己的梦想……"
    },];
  return {
    type: type.FETCH_MOVIES_INFO,
    data,
  }
}