Template.stats.helpers({
  getTotalArticles: function () {
    return Article.find().fetch().length;
  },
  getUnreadArticles: function () {
    return Article.find({done: {$in: [null, false]}}).fetch().length;
  },
  getLikedArticles: function () {
    return Article.find({rating: 1}).fetch().length;
  },
  getUnlikedArticles: function () {
    return Article.find({rating: -1}).fetch().length;
  },
  getFlaggedArticles: function () {
    return Article.find({flagged: true}).fetch().length;
  },
  getTotalTags: function () {
    articles = Article.find().fetch();
    tags = []
    _.each(articles, function (article) {
    	tags.push(article.tags);
    });
    tags = _.flatten(tags);
    return tags.length;
  },
  topTags: function () {
    articles = Article.find().fetch();
    tags = []
    _.each(articles, function (article) {
    	tags.push(article.tags);
    });
    tags = _.flatten(tags)
    tagFreq = compressArray(tags)
    topTags = _.sortBy(tagFreq, function(tag){ return tag.count; });
    topTags = topTags.reverse();
    return topTags.slice(0, 10);
  }
});

// articles = Article.find().fetch();
// tags = []
// _.each(articles, function (article) {
// 	tags.push(article.tags);
// });
// tags = _.flatten(tags)
// tagFreq = compressArray(tags)
// _.sortBy(tagFreq, function(tag){ return tag.count; });




function compressArray(original) {
	var compressed = [];
	var copy = original.slice(0);
	for (var i = 0; i < original.length; i++) {
		var myCount = 0;
		for (var w = 0; w < copy.length; w++) {
			if (original[i] == copy[w]) {
				myCount++;
				delete copy[w];
			}
		}
		if (myCount > 0) {
			var a = new Object();
			a.value = original[i];
			a.count = myCount;
			compressed.push(a);
		}
	}
	return compressed;
};
