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
      const result = Meteor.http.get(article.url);
      const $ = cheerio.load(result.content);
      let site = $('meta[property="og:site_name"]').attr('content');
      let title = $('meta[property="og:title"]').attr('content');
      let description = $('meta[property="og:description"]').attr('content');
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
  getHackerNews: function () {
    this.unblock();
    var uri = API.hackerNews.domain + API.hackerNews.endpoint + API.hackerNews.items;
    try {
      const result = HTTP.get(uri);
      console.log(result.data);
    } catch (e) {
      console.log(e);
      return false;
    }
  },
});
