Template.filters.helpers({
  getChecked: function (session) {
    if (Session.get(session)) {
      return 'checked'
    }
  }
})

Template.filters.events({
  'click .js-toggle-done-articles': function (event) {
    Session.set('displayDone', event.target.checked);
  },
  'click .js-toggle-downvoted-articles': function (event) {
    Session.set('displayDownvoted', event.target.checked);
  },
  'click .js-toggle-unmatched-articles': function (event) {
    Session.set('displayUnmatched', event.target.checked);
  }
})
