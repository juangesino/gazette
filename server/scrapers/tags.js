export function getTags($) {
  // TechCrunch
  let tags = $('meta[name="sailthru.tags"]').attr('content');
  if (tags && tags.length > 0) {
    untirimmedTags = tags.split(/,/);
    tags = [];
    _.each(untirimmedTags, function (e) {
      tags.push(e.trim());
    })
  } else {
    // Standard. Used by Todo Noticias & Reuters.
    tags = $('meta[name="keywords"], meta[name="Keywords"], meta[name="news_keywords"]').attr('content');
    if (tags && (tags === 'none' || tags === 'None')) {
      tags = [];
    }
    if (tags && tags.length > 0) {
      untirimmedTags = tags.split(/,/);
      tags = [];
      _.each(untirimmedTags, function (e) {
        tags.push(e.trim());
      })
    } else {
      // DutchNews.nl
      tags = $('meta[name="shareaholic:keywords"]').attr('content');
      if (tags && tags.length > 0) {
        tags = tags.split(/,\s/);
      } else {
        tags = [];
        // BBC
        _.each($('.tags-list li'), function (e) {
          tags.push($(e).text().trim());
        })
        // Google Blog
        _.each($('.uni-blog-article-tags__tags-list li'), function (e) {
          tags.push($(e).text().trim());
        })
        // Engadget
        _.each($('meta[property="article:tag"]'), function (e) {
          tags.push($(e).attr('content').trim());
        })
        // Medium
        _.each($('.tags--postTags li'), function (e) {
          tags.push($(e).text().trim());
        })
        // zdnet.com
        _.each($('.related-topics a'), function (e) {
          tags.push($(e).text().trim());
        })
        // GitHub
        _.each($('.list-topics-container a'), function (e) {
          tags.push($(e).text().trim());
        })
      }
    }
  }
  // Make all lowercase.
  tags = _.map(tags, function(e) { return e.toLowerCase(); })
  return tags;
}
