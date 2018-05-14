import cheerio from 'cheerio';

Meteor.methods({
  hackerNews: function () {
    const domain = 'https://news.ycombinator.com';
    const endpoints = [
      '/news',
    ];
    const linkSelector = '.title a.storylink';

    let articleUrls = [];
    _.forEach(endpoints, function (endpoint) {
      try {
        const url = domain + endpoint;
        const result = Meteor.http.get(url);
        const $ = cheerio.load(result.content);
        const crawledUrls = $(linkSelector);
        _.forEach(crawledUrls, function (obj) {
          let relativeUrl = $(obj).attr('href');
          articleUrls.push(relativeUrl);
        })
      } catch (e) {
        console.log(e);
        return false;
      }
    });
    articleUrls = _.uniq(articleUrls);
    return articleUrls;
  }
});
