export function getImage($) {
  return $('meta[property="og:image"]').attr('content');
}
