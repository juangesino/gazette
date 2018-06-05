import { Meteor } from 'meteor/meteor';
import cheerio from 'cheerio';

// Import all scraper functions.
import { getTitle } from '/server/scrapers/title.js'
import { getSource } from '/server/scrapers/source.js'
import { getDescription } from '/server/scrapers/description.js'
import { getUrl } from '/server/scrapers/url.js'
import { getImage } from '/server/scrapers/image.js'
import { getTags } from '/server/scrapers/tags.js'

Article = new Mongo.Collection("article");

Meteor.publish('articlesIndex', function(){
  return Article.find();
});

Meteor.methods({
  getMeta: function (articleId) {
    this.unblock();
    const article = Article.findOne(articleId);
    try {
      const result = Meteor.http.get(article.url, {headers: {'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.139 Safari/537.36'}});
      const $ = cheerio.load(result.content);

      let site = getSource($, article.url);
      let title = getTitle($);
      let description = getDescription($);
      let url = getUrl($);
      let image = getImage($);
      let tags = getTags($);

      if (title && title != '') {
        Article.update(article._id, {
          $set: {
            meta: true,
            title: title,
            description: description,
            image: image,
            site: site,
            tags: tags
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
