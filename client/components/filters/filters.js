Template.filters.helpers({
  getBtnSelected: function (rating) {
    let ratingSession = Session.get('displayDownvoted');
    if (_.include(ratingSession, parseInt(rating))) {
      return 'btn-primary';
    }
  },
  getBtnSelectedDone: function (value) {
    let doneSession = Session.get('displayDone');
    if (_.include(doneSession, value)) {
      return 'btn-primary';
    }
  },
  getBtnSelectedUnmatched: function () {
    if (Session.get('displayUnmatched')) {
      return 'btn-primary';
    }
  },
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
        if (sessionValue) {
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
    Session.set('displayUnmatched', !Session.get('displayUnmatched'));
  },
  'click .js-toggle-rating': function (event) {
    let targetRating = parseInt(event.target.dataset.rating);
    let ratingSession = Session.get('displayDownvoted');
    if (_.include(ratingSession, targetRating)) {
      Session.set('displayDownvoted', _.reject(ratingSession, function(e){ return e === targetRating; }));
    } else {
      ratingSession.push(targetRating);
      Session.set('displayDownvoted', ratingSession);
    }
  },
  'click .js-toggle-done': function (event) {
    let targetDone = (event.target.dataset.done === 'true');
    let doneSession = Session.get('displayDone');
    if (_.include(doneSession, targetDone)) {
      Session.set('displayDone', _.reject(doneSession, function(e){ return e === targetDone; }));
    } else {
      doneSession.push(targetDone);
      Session.set('displayDone', doneSession);
    }
  }
})
