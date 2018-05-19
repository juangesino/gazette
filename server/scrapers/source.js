export function getSource($, url) {
  let site = $('meta[property="og:site_name"]').attr('content');
  if (site == '' || typeof site === "undefined") {
    let pathArray = url.split( '/' );
    let protocol = pathArray[0];
    let host = pathArray[2];
    let urlOrigin = protocol + '//' + host;
    site = urlOrigin;
  }
  return site;
}
