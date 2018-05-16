Template.filters.helpers({
  getChecked: function (session) {
    let sessionValue = Session.get(session);
    switch (session) {
      case 'displayDone':
        if (sessionValue.length === 2) {
          return 'checked';
        }
        break;
      case 'displayDownvoted':
        if (sessionValue.length === 3) {
          return 'checked';
        }
        break;
      case 'displayUnmatched':
        if (session) {
          return 'checked';
        }
        break;
      default:

    }
  }
})

Template.filters.events({
  'click .js-toggle-done-articles': function (event) {
    let displayDone = event.target.checked;
    if (displayDone) {
      Session.set('displayDone', [true, false]);
    } else {
      Session.set('displayDone', [false]);
    }
  },
  'click .js-toggle-downvoted-articles': function (event) {
    let displayDownvoted = event.target.checked;
    if (displayDownvoted) {
      Session.set('displayDownvoted', [-1, 1, 0]);
    } else {
      Session.set('displayDownvoted', [1, 0]);
    }
  },
  'click .js-toggle-unmatched-articles': function (event) {
    Session.set('displayUnmatched', event.target.checked);
  }
})
