Template.dock.helpers({
  getRoute: function (name) {
    return Router.path(name);
  }
})

Template.dock.events({
  'click .js-link': function (event) {
    let location = event.target.dataset.href;
    if (location) {
      window.location = location;
    }
    return true;
  }
})
