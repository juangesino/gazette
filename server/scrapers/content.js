export function getContent($) {
  let content = $('.article-content, .article__body, .postArticle-content, .content__article-body, .entry-content').text().trim();
  return content;
}
