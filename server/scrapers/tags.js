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
    tags = $('meta[name="keywords"]').attr('content');
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
      }
    }
  }
  // Make all lowercase.
  _.map(tags, function(e) { return e.toLowerCase(); })
  return tags;
}
