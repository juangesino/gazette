// Define the template for Iron Router.
Router.configure({
  layoutTemplate: 'ApplicationLayout'
});

// Create the index route.
Router.map(function() {
  this.route('home', {
    path: '/',
    to: 'main',
    name: 'home',
    template: 'home',
    onBeforeAction: function () {
      Session.set('loading', true);
      Session.set('hasBackLink', false);
      Session.set('backLink', null);
      Session.set('navTitle', '');
      Session.set('displayDone', false);
      Session.set('displayUnmatched', false);
      Session.set('displayDownvoted', true);
      Session.set('newsLimit', 5);
      this.next();
    }
  });
});

Router.route( "/tasks/clean", function() {
  console.log('clean');
  this.response.statusCode = 200;
  this.response.setHeader("Content-Type", "application/json");
  this.response.setHeader("Access-Control-Allow-Origin", "*");
  this.response.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  let daysAllowed = 10;
  let date = moment().subtract(daysAllowed, 'days').toDate();
  let articles = Article.find({
    import: 'crawler',
    done: false,
    rating: 0,
    createdOn: {
      $lte: date
    }
  })
  Article.remove(articles);
  this.response.end('');
}, { where: "server" });
