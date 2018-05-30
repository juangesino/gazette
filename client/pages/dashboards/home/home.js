Session.setDefault('loading', true);
Session.setDefault('hasBackLink', false);
Session.setDefault('backLink', null);
Session.setDefault('navTitle', '');
Session.setDefault('displayDone', [false]);
Session.setDefault('displayUnmatched', false);
Session.setDefault('displayDownvoted', [1, 0, -1]);
Session.setDefault('newsLimit', 5);
Session.setDefault('searchQuery', '');

Template.home.onCreated(function () {
  Session.set('loading', true);
  Session.set('hasBackLink', false);
  Session.set('backLink', null);
  Session.set('navTitle', '');
  Session.set('displayDone', [false]);
  Session.set('displayUnmatched', false);
  Session.set('displayDownvoted', [1, 0, -1]);
  Session.set('newsLimit', 5);
  Session.set('searchQuery', '');
});

Template.home.helpers({
  articles: function () {
    if (Session.get('displayUnmatched')) {
      var articles = Article.find({meta: false, archived: {$in: [null, false]} }, {sort: { done: 1, createdOn: -1}, limit: Session.get('newsLimit')}).fetch();
    } else {
      if (Session.get('searchQuery') === '') {
        var articles = Article.find({
          meta: true,
          archived: {$in: [null, false]},
          done: {$in: Session.get('displayDone')},
          rating: {$in: Session.get('displayDownvoted')}
        }, {sort: { done: 1, createdOn: -1}, limit: Session.get('newsLimit')}).fetch();
      } else {
        var articles = Article.find({
          meta: true,
          archived: {$in: [null, false]},
          title: {'$regex': Session.get('searchQuery'), '$options' : 'gi'}
        }, {sort: { done: 1, createdOn: -1}, limit: Session.get('newsLimit')}).fetch();
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
  getDescription: function () {
    var maxLength = 450;
    var description = this.description;
    // if (description.length > maxLength) {
    //   description = description.substring(0, maxLength) + '...';
    // }
    return description;
  },
  getHidden: function () {
    if (!this.meta) {
      return 'hidden';
    }
  },
  getFlagged: function () {
    if (this.flagged) {
      return 'flagged';
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
  },
  tags: function () {
    if (this.tags) {
      return this.tags.slice(0, 5);
    }
  },
  tags2: function () {
    // Get string and make it lower case.
    let string = (this.title + " " + this.description).toLowerCase();
    // Get rid of weird characters.
    let weirdCharacters = [
      "|", "-", "_", "\"", "'", "\\(", "\\)", "\\?", "¿", "\\:", "€", "$", "£",
      "’", "\\$", "…", "“", "”", "\\‘", "&quot;", "\\*", "&", "quot;"
    ];
    _.each(weirdCharacters, function (char) {
      string = string.replace(new RegExp(char, 'g'), '');
    })
    // Create array of strings.
    let words = string.replace(/,/g, ' ').replace(/[.]/g, '').split(/\s/);
    // Get rid of the numbers.
    words = _.filter(words, function (e) { return String(parseFloat(e)) === 'NaN' });
    // Get rid of weird spaces strings.
    let weirdWords = ['', ' ', '-', "—"];
    words = _.reject(words, function (e) { return _.include(weirdWords, e) });
    // Get rid of common words (English).
    let commonWords = [
      "to", "its", "own", "with", "an", "towards", "on", "the", "of", "and",
      "low", "you", "in", "i", "as", "a", "why", "for", "one", "thing", "they",
      "often", "wrong", "whats", "lets", "take", "at", "up", "could", "this",
      "was", "how", "from", "it", "has", "will", "be", "are", "is", "that",
      "such", "about", "gets", "might", "just", "it's", "it’s", "by", "if", "here",
      "which", "would", "how", "what", "why", "when", "not", "no", "yes", "eventually",
      "few", "more", "today", "day", "introducing", "their", "rid", "plan", "his",
      "details", "goes", "ahead", "behind", "takes", "over", "previous", "include",
      "total", "considered", "back", "but", "says", "said", "say", "carries",
      "increasingly", "brought", "continues", "move", "leave", "last", "january",
      "february", "march", "april", "may", "june", "july", "august", "september",
      "october", "november", "december", "monday", "tuesday", "wednesday", "thursday",
      "friday", "saturday", "sunday", "getting", "weekend", "still", "faces", "form",
      "from", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine",
      "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "off", "across",
      "appears", "being", "between", "continue", "head", "likely", "main", "make",
      "many", "noted", "only", "recently", "told", "using", "who", "almost", "admit",
      "net", "after", "spot", "where", "worked", "than", "them", "week", "had"
    ];
    words = _.reject(words, function (e) { return _.include(commonWords, e) });
    // Get rid of common words (Spanish).
    let commonWordsEs = [
      "y", "el", "del", "de", "a", "la", "que", "al", "es", "su", "para", "un",
      "qué", "en", "le", "no", "ellos", "yo", "mi", "fue", "por", "las", "tras",
      "sus", "dicen", "los", "luego", "mira", "cerca", "sigue", "otro", "nuevo",
      "hubo", "ni", "con"
    ];
    words = _.reject(words, function (e) { return _.include(commonWordsEs, e) });
    // Get rid of single character words.
    words = _.reject(words, function (e) { return e.length === 1 });

    // console.log(words);

    var freqMap = {};
    words.forEach(function(w) {
        if (!freqMap[w]) {
            freqMap[w] = 0;
        }
        freqMap[w] += 1;
    });
    console.log(freqMap);

    return ['tech', 'mobile', 'machine', 'learning']
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
          rating: 0,
          import: 'manual',
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
  },
  'click .js-flag': function (event) {
    let article = Article.findOne(this._id);
    let currentValueDone = article.done || false;
    let currentValueFlag = article.flagged || false;
    let newRating = -1;
    if (currentValueFlag) {
      newRating = 0;
    }
    Article.update(article._id, {
      $set: {
        flagged: !currentValueFlag,
        done: !currentValueDone,
        rating: newRating
      }
    });
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
          rating: 1,
          done: true,
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
          rating: -1,
          done: true,
        }
      });
    }
  }
});

lastScrollTop = 0;
$(window).scroll(function(event){
  if($(window).scrollTop() + $(window).height() > $(document).height() - 100) {
    var scrollTop = $(this).scrollTop();
    if (scrollTop > lastScrollTop) {
     Session.set('newsLimit', Session.get('newsLimit') + 5);
    }
    lastScrollTop = scrollTop;
  }
});
