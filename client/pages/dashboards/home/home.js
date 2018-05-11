Template.home.helpers({
  articles: function () {
    if (Session.get('displayUnmatched')) {
      var articles = Article.find({meta: false}, {sort: { done: 1, createdOn: -1}}).fetch();
    } else {
      if (Session.get('displayDone')) {
        if (Session.get('displayDownvoted')) {
          var articles = Article.find({meta: true}, {sort: { done: 1, createdOn: -1}}).fetch();
        } else {
          var articles = Article.find({meta: true, rating: { $gte: 0 } }, {sort: { done: 1, createdOn: -1}}).fetch();
        }
      } else {
        if (Session.get('displayDownvoted')) {
          var articles = Article.find({meta: true, done: false}, {sort: { done: 1, createdOn: -1}}).fetch();
        } else {
          var articles = Article.find({meta: true, done: false, rating: { $gte: 0 } }, {sort: { done: 1, createdOn: -1}}).fetch();
        }
      }
    }
    return articles;
  },
  empty: function (object) {
    return object.length === 0;
  },
});

Template.article.helpers({
  getTitle: function () {
    if (this.title) {
      return this.title;
    } else {
      return this.url;
    }
  },
  getHidden: function () {
    if (!this.meta) {
      return 'hidden';
    }
  },
  hasMeta: function () {
    return this.meta;
  },
  hasImage: function () {
    return (this.image && typeof this.image !== "undefined" && this.image != '');
  },
  getThumbsClass: function (thumbs) {
    let thumbsClass = 'btn-default';
    let article = Article.findOne(this._id);
    if (thumbs === 'up') {
      if (article.rating > 0) {
        thumbsClass = 'btn-success';
      }
    } else {
      if (article.rating < 0) {
        thumbsClass = 'btn-danger';
      }
    }
    return thumbsClass;
  },
  getDone: function () {
    let article = Article.findOne(this._id);
    if (article.done) {
      return 'done';
    }
  }
});

Template.home.events({
  'submit .js-add-article': function (event) {
    event.preventDefault();
    var url = event.target.url.value;
    if (url && url != '') {
      var article = Article.insert({
          url: url,
          meta: false,
          done: false,
          rating: 1,
          createdOn: new Date(),
      });
      Meteor.call('getMeta', article)
      $('#url').val("");
      $('#new-article-modal').modal('hide');
      toastr.success('Succefully added new article.');
    } else {
      $('.js-url-form-group').addClass('has-error');
    }
    return false;
  },
  'click .js-remove-article': function (event) {
    Article.remove(this._id);
    toastr.success('Succefully removed article.');
  },
  'click .js-update': function (event) {
    Meteor.call('getMeta', this._id)
    toastr.success('Succefully updated article.');
  }
});

Template.article.events({
  'click .panel-open': function (event) {
    if (Meteor.isCordova) {
      event.preventDefault();
      window.open(this.url, "_system");
    }
  },
  'click .js-toggle-done': function (event) {
    let article = Article.findOne(this._id);
    let currentValue = article.done || false;
    Article.update(article._id, {
      $set: {
        done: !currentValue
      }
    });
  },
  'click .js-done': function (event) {
    let article = Article.findOne(this._id);
    if (article.rating != 0) {
      Article.update(article._id, {
        $set: {
          done: true
        }
      });
    }
  },
  'click .js-upvote': function (event) {
    let article = Article.findOne(this._id);
    if (article.rating > 0) {
      Article.update(article._id, {
        $set: {
          rating: 0
        }
      });
    } else {
      Article.update(article._id, {
        $set: {
          rating: 1
        }
      });
    }
  },
  'click .js-downvote': function (event) {
    let article = Article.findOne(this._id);
    if (article.rating < 0) {
      Article.update(article._id, {
        $set: {
          rating: 0
        }
      });
    } else {
      Article.update(article._id, {
        $set: {
          rating: -1
        }
      });
    }
  }
});
