/*
This task will remove all articles that are at least 2 days old
and have not been read/rated. This task needs to be run every day.
*/
Router.route( "/tasks/clean", function() {
  this.response.statusCode = 200;
  this.response.setHeader("Content-Type", "application/json");
  this.response.setHeader("Access-Control-Allow-Origin", "*");
  this.response.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  let daysAllowed = 2;
  let date = moment().subtract(daysAllowed, 'days').toDate();
  let articles = Article.find({
    import: 'crawler',
    done: {$in: [null, false]},
    archived: {$in: [null, false]},
    rating: 0,
    createdOn: {
      $lte: date
    }
  })
  let ids = _.map(articles.fetch(), function(val, index) { return val._id } )
  console.log(ids);
  Article.update({_id: {$in: ids}}, {
    $set: {
      archived: true,
    }
  });
  this.response.end('');
}, { where: "server" });
