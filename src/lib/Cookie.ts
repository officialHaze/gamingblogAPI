export default class Cookie {
  static getCookieValue(cookie: string, cookiename: string): string {
    // Rectrive a cookie
    const startIdx = cookie.indexOf(cookiename); // Position of the cookie in string
    const cookieSplit = cookie.substring(startIdx, cookie.length + 1);

    const _cookie = cookieSplit.split("; ")[0]; // The first element is the desired cookie because the cookie string was split from the start idx of the desired cookie
    const cookieVal = _cookie.split("=")[1];
    return cookieVal;
  }
}
