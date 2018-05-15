Router.route( "/tasks/clean", function() {
  this.response.statusCode = 200;
  this.response.setHeader("Content-Type", "application/json");
  this.response.setHeader("Access-Control-Allow-Origin", "*");
  this.response.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  let daysAllowed = 2;
  let date = moment().subtract(daysAllowed, 'days').toDate();
  let articles = Article.find({
    import: 'crawler',
    done: false,
    rating: 0,
    createdOn: {
      $lte: date
    }
  })
  let ids = _.map(articles.fetch(), function(val, index) { return val._id } )
  Article.remove({_id: {$in: ids} });
  this.response.end('');
}, { where: "server" });
