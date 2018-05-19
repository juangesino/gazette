export function getTitle($) {
  let title = $('meta[property="og:title"]').attr('content');
  if (title == '' || typeof title === "undefined") {
    title = $('title').text();
  }
  return title;
}
