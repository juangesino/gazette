import cheerio from 'cheerio';

Meteor.methods({
  todoNoticias: function () {
    const domain = 'https://tn.com.ar';
    const endpoints = [];
    const relativeEndpoint = '/archivo/tn/todo/' + (new Date()).getFullYear() +'/' + ("0" + (new Date()).getMonth()).slice(-2) + '/' + ("0" + (new Date()).getDate()).slice(-2);
    endpoints.push(relativeEndpoint);
    const linkSelector = 'a.url.entry-title.size-4';
    let articleUrls = [];
    _.forEach(endpoints, function (endpoint) {
      try {
        const url = domain + endpoint;
        const result = Meteor.http.get(url);
        const $ = cheerio.load(result.content);
        const crawledUrls = $(linkSelector);
        _.forEach(crawledUrls, function (obj) {
          let relativeUrl = $(obj).attr('href');
          articleUrls.push(domain + relativeUrl);
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
