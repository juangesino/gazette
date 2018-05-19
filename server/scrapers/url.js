export function getUrl($) {
  return $('meta[property="og:url"]').attr('content');
}
