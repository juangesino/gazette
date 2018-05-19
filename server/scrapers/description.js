export function getDescription($) {
  let description = $('meta[property="og:description"]').attr('content');
  if (description == '' || typeof description === "undefined") {
    description = $('meta[name="description"]').attr('content');
  }
  return description;
}
