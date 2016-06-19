var configs = {
    enableProxy: true, // 开启自动IP代理
    domains: ["movie.mtime.com"],
    scanUrls: [ 'http://movie.mtime.com/movie/search/section/#type=5995'],
    contentUrlRegexes: ["http://movie\\.mtime\\.com/\\d+/$"],
    // helperUrlRegexes: ["http://movie\\.mtime.com/movie/search/section/#sortType=4&viewType=0&rating=4_10&(\\?/pageIndex=\\d+)?"], //可留空
    fields: [{
        // 电影中文译名
        name: "name",
        selector: '//*[@id="db_head"]/div[2]/div/div[1]/h1/text()', //默认使用XPath
        required: true //是否不能为空
    }, {
        // 原名
        name: "origin_name",
        selector: '//*[@id="db_head"]/div[2]/div/div[1]/p[2]/text()', //使用正则的抽取规则
        required: false //是否不能为空
    }, {
        name: 'poster',
        selector: '//*[@id="db_head"]/div[1]/div/div/div/a/img/@src'
    }, {
      name: 'type',
      selector: '//*[@id="db_head"]/div[2]/div/div[2]',
    }, {
        name: 'rating',
        selector: '//*[@id="ratingRegion"]/div/b'
    }, {
        name: 'director',
        selector: '//*[@id="movie_warp"]/div[2]/div[3]/div/div[4]/div[2]/div[1]/div[2]/div[1]/dl/dd[1]'
    }, {
        name: 'screen_writer',
        selector: '//*[@id="movie_warp"]/div[2]/div[3]/div/div[4]/div[2]/div[1]/div[2]/div[1]/dl/dd[2]'
    }, {
        name: 'region',
        selector: '//*[@id="movie_warp"]/div[2]/div[3]/div/div[4]/div[2]/div[1]/div[2]/div[1]/dl/dd[3]',
        require: true,
    }, {
        name: 'release_company',
        selector: '//*[@id="movie_warp"]/div[2]/div[3]/div/div[4]/div[2]/div[1]/div[2]/div[1]/dl/dd[4]'
    }, {
        name: 'release_date',
      selector: '//*[@id="db_head"]/div[2]/div/div[1]/p[1]/a/text()',
    },{
        name: 'alias',
        selector: '//*[@id="movie_warp"]/div[2]/div[3]/div/div[4]/div[2]/div[1]/div[2]/div[1]/dl/dd[5]'
    }, {
        name: 'synopsis',
        selector: '//*[@id="movie_warp"]/div[2]/div[3]/div/div[4]/div[2]/div[1]/div[2]/div[1]/dl/dt/p[1]/text()'
    }]
};

configs.afterExtractField = function(field, data, page) {
    if (data && (field == 'type' || field == 'director' || field == 'screen_writer' || field == 'region' || field == 'release_company')) {
        data = extractList(data, '//a/text()').join(',');
    }
    if (data && field == 'alias') {
        data = extractList(data, '//span/text()').join(',');
    }
    if (field == 'poster') {
    }
    if(field == 'rating') {
    }
    return data;
};

var crawler = new Crawler(configs);
crawler.start();