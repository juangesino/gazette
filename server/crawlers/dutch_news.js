import cheerio from 'cheerio';

Meteor.methods({
  dutchNews: function () {
    const domain = 'https://www.dutchnews.nl';
    const endpoints = [
      '/',
      '/news/category/tech-and-media/',
      '/news/category/politics/',
      '/news/category/business/',
      '/news/category/society/'
    ];
    const linkSelector = 'a.readmore';

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
