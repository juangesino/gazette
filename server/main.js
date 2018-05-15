import { Meteor } from 'meteor/meteor';
import cheerio from 'cheerio';

APIS = {
  hackerNews: {
    domain: "https://hacker-news.firebaseio.com",
    endpoint: "/v0",
    items: "/newstories.json",
    show: "/item"
  }
};

Article = new Mongo.Collection("article");

Meteor.methods({
  getMeta: function (articleId) {
    this.unblock();
    var article = Article.findOne(articleId);
    try {
      const result = Meteor.http.get(article.url, {headers: {'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.139 Safari/537.36'}});
      const $ = cheerio.load(result.content);
      let site = $('meta[property="og:site_name"]').attr('content');
      if (site == '' || typeof site === "undefined") {
        let pathArray = article.url.split( '/' );
        let protocol = pathArray[0];
        let host = pathArray[2];
        let urlOrigin = protocol + '//' + host;
        site = urlOrigin
      }
      let title = $('meta[property="og:title"]').attr('content');
      if (title == '' || typeof title === "undefined") {
        title = $('title').text();
      }
      let description = $('meta[property="og:description"]').attr('content');
      if (description == '' || typeof description === "undefined") {
        description = $('meta[name="description"]').attr('content');
      }
      let url = $('meta[property="og:url"]').attr('content');
      let image = $('meta[property="og:image"]').attr('content');
      if (title && title != '') {
        Article.update(article._id, {
          $set: {
            meta: true,
            title: title,
            description: description,
            image: image,
            site: site,
          }
        });
      }
    } catch (e) {
      console.log(e);
      return false;
    }
    return true;
  },
});
