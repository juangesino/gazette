Router.route( "/crawlers/:crawler", function() {
  this.response.statusCode = 200;
  this.response.setHeader("Content-Type", "application/json");
  this.response.setHeader("Access-Control-Allow-Origin", "*");
  this.response.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  const crawler = this.params.crawler;
  let articles = Meteor.call(crawler);
  _.forEach(articles, insertArticle);
  this.response.end('');
}, { where: "server" });

function insertArticle (url) {
  let matchedArticles = Article.find({url: url}).fetch();
  if (matchedArticles.length === 0) {
    let article = Article.insert({
        url: url,
        meta: false,
        done: false,
        rating: 0,
        import: 'crawler',
        createdOn: new Date(),
    });
    Meteor.call('getMeta', article)
  }
}
