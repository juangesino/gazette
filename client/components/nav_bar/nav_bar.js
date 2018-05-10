Template.navBar.helpers({
  getClass: function (route_path) {
    if (route_path == Iron.Location.get().path) {
      return 'active';
    } else {
      return '';
    }
  },
  home_path: function () {
    return Router.path("home");
  },
  hasBackLink: function () {
    if (Session.get('hasBackLink')) {
      return true;
    } else {
      return false;
    }
  },
  backLink: function () {
    if (Session.get('backLink')) {
      return Session.get('backLink');
    } else {
      return '/';
    }
  },
  navTitle: function () {
    if (Session.get('navTitle')) {
      return Session.get('navTitle');
    } else {
      return '';
    }
  }
});

Template.navBar.events({
  'click .js-toggle-filters': function () {
    $('#filters').slideToggle('slow');
    return true;
  }
})
