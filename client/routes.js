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
      this.next();
    }
  });
});
