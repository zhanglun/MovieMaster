import * as type from '../../constant/actionType';

export function fetchMoviesInfo() {
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
    }, {
      "name": "辛德勒的名单",
      "origin_name": "Schindler's List",
      "poster": "http://img31.mtime.cn/mt/2013/11/29/102947.25583478_270X405X4.jpg",
      "type": "传记,剧情,历史,1993年12月15日",
      "director": "史蒂文&#183;斯皮尔伯格",
      "screen_writer": "斯蒂文&#183;泽里安,托马斯&#183;肯尼利",
      "region": "美国",
      "release_company": "United International Pictures y C&#237;a. S.R.C.,...",
      "release_date": 1993,
      "alias": "舒特拉的名单,辛特勒名单",
      "synopsis": "　　二战期间，商人奥斯卡·辛德勒开厂生产军需用品，大发战争财，他贿赂军官，让自己的工厂成为了犹太人的避难所。德国战败前夕，辛德勒向德军军官开出了1200人的名单，倾家荡产买下了这些犹太人的生命……"
    },
    {
      "name": "教父",
      "origin_name": "The Godfather",
      "poster": "http://img31.mtime.cn/mt/2013/12/23/133539.17727433_270X405X4.jpg",
      "type": "剧情,惊悚,犯罪,1972年3月24日",
      "director": "弗朗西斯&#183;福特&#183;科波拉",
      "screen_writer": "弗朗西斯&#183;福特&#183;科波拉,马里奥&#183;普佐",
      "region": "美国",
      "release_company": "派拉蒙影业公司,...",
      "release_date": 1972,
      "synopsis": "影片讲述了教父唐·科里昂的小儿子迈克尔如何成为新教父的故事，把小说中虚构的纽约黑手党塑造成一个实现美国梦的家族奋斗史。血雨腥风和温情脉脉，在这部里程碑式的黑帮史诗巨片里真实上演。"
    },
    {
      "name": "海豚湾",
      "origin_name": "The Cove",
      "poster": "http://img31.mtime.cn/mt/2014/02/23/070114.19968280_270X405X4.jpg",
      "type": "纪录片,犯罪,2009年7月31日",
      "director": "路易&#183;西霍尤斯",
      "screen_writer": "马克&#183;孟罗",
      "region": "美国",
      "release_company": "狮门影业,...",
      "release_date": 2009,
      "alias": "血色海湾,海湾",
      "synopsis": "在海洋哺乳类动物专家里克·奥巴瑞的带领下，一群爱冒险的激进分子扛着顶级的装备走进了日本太地町的一个海湾，在这里每年有23000头海豚被日本渔民捕杀。他们深入现场，真实而客观地记录下了人类这一残忍的行为。"
    },
    {
      "name": "机器人总动员",
      "origin_name": "WALL&#183;E",
      "poster": "http://img31.mtime.cn/mt/2013/11/20/172527.42989246_270X405X4.jpg",
      "type": "剧情,科幻,冒险,2008年6月27日",
      "director": "安德鲁&#183;斯坦顿",
      "screen_writer": "安德鲁&#183;斯坦顿,彼特&#183;道格特,...",
      "region": "美国",
      "release_company": "华特&#183;迪士尼电影工作室,...",
      "release_date": 2008,
      "alias": "瓦力,太空奇兵&#183;威E",
      "synopsis": "机器人WALL·E已经在地球上孤独地生活几百年了，他的任务就是清理地球上堆积如山的垃圾。有一天一艘飞船突然降落，一个女机器人EVE来到地球执行搜寻任务，WALL·E爱上了EVE，并跟随着她展开了一场充满奇幻的太空之旅。"
    },
    {
      "name": "这个杀手不太冷",
      "origin_name": "L&#233;on",
      "poster": "http://img31.mtime.cn/mg/2014/09/12/102735.29315066_270X405X4.jpg",
      "type": "惊悚,剧情,犯罪,1994年9月14日",
      "director": "吕克&#183;贝松",
      "screen_writer": "吕克&#183;贝松",
      "region": "法国",
      "release_company": "Gaumont International,...",
      "release_date": 1994,
      "alias": "终极追杀令,杀手莱昂",
      "synopsis": "纽约贫民区住着一个意大利人，名叫里昂（让·雷诺 饰），他是一名职业杀手。一天，邻居家小姑娘马蒂尔德（娜塔莉·波特曼 饰）敲开了他的房门，要求在他这里暂避杀身之祸。原来，邻居家的主人是警察的眼线，因贪污了一小包毒品而遭恶警.."
    },
    {
      "name": "霸王别姬",
      "origin_name": "Farewell My Concubine",
      "poster": "http://img31.mtime.cn/mg/2014/03/12/145744.58512488_270X405X4.jpg",
      "type": "爱情,剧情,音乐,1993年1月1日",
      "director": "陈凯歌",
      "screen_writer": "李碧华,芦苇,...",
      "region": "中国,中国香港",
      "release_company": "人造眼,...",
      "release_date": 1993,
      "synopsis": "演生角的段小楼与演旦角的程蝶衣是自小在一起长大的师兄弟。两人合演的《霸王别姬》誉满京城，他们约定合演一辈子《霸王别姬》。后来段小楼娶了名妓菊仙为妻，三人之间的爱恨情仇随着时代风云的变迁不断升级，终酿成悲剧。"
    },
    {
      "name": "天堂电影院",
      "origin_name": "Nuovo cinema Paradiso",
      "poster": "http://img31.mtime.cn/mt/2014/02/22/230204.38226096_270X405X4.jpg",
      "type": "剧情,1988年11月17日",
      "director": "朱塞佩&#183;托纳多雷",
      "screen_writer": "朱塞佩&#183;托纳多雷,万纳&#183;帕奥里",
      "region": "意大利,法国",
      "release_company": "米拉麦克斯影业公司,...",
      "release_date": 1988,
      "alias": "新天堂乐园,星光伴我心",
      "synopsis": "西西里岛上的吉安加村有座小教堂，教堂前有一家电影院，叫做“天堂戏院”。小镇上古灵精怪的小男孩多多喜欢看电影，更喜欢看放映师艾佛特放电影，他和艾佛特成为了忘年之交，在胶片中找到了童年生活的乐趣。"
    },
    {
      "name": "如果和母亲一起生活",
      "origin_name": "Haha to kuraseba",
      "poster": "http://img31.mtime.cn/mg/2015/12/15/102627.91852055_270X405X4.jpg",
      "type": "剧情,2015年12月12日",
      "director": "山田洋次",
      "screen_writer": "山田洋次,平松惠美子",
      "region": "日本",
      "release_company": "松竹映画,...",
      "release_date": 2015,
      "synopsis": "1948年8月9日，日本长崎。饱经沧桑的助产护士福原伸子（吉永小百合饰）呆呆望着儿子浩二（二宫和也饰）的相片。平静的外表下，内心则是百感交集。三年前，投向长崎的原子弹带走了无数人的性命，风华正茂的浩二未能幸免于难，和相依为命.."
    },
    {
      "name": "残秽 不可以住的房间",
      "origin_name": "残穢 住んではいけない部屋",
      "poster": "http://img31.mtime.cn/mg/2015/09/16/103337.42402423_270X405X4.jpg",
      "type": "恐怖,2016年1月30日",
      "director": "中村义洋",
      "screen_writer": "铃木谦一,小野不由美",
      "region": "日本",
      "release_company": "松竹映画,...",
      "release_date": 2015,
      "synopsis": "“我”（竹内结子饰）是一名生活在京都的作家，我的作品主要面向成年读者，作品风格从少女轻小说到恐怖故事均有涉猎。半年前我应邀为某怪谈杂志撰写恐怖故事，期间曾向读者募集真实的恐怖故事和体验。虽则如此，我本人对灵异事件却抱着.."
    },];
  return (dispatch, getState) => {
    fetch('http://localhost:5000/api/movies')
      .then((response)=> {
        return response.json();
      })
      .then((data) => {
        dispatch(receiveMoviesInfo(data))
      });
  };
}

export function requestMoviesInfo(movies) {
  return {
    type: type.FETCH_MOVIES_REQUEST,
    movies
  }
}

export function receiveMoviesInfo(movies) {
  return {
    type: type.FETCH_MOVIES_SUCCESS,
    data: movies
  }
}