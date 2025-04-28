/**
 * Sets a cookie with the given name, value, and expiration time
 * @param name Cookie name
 * @param value Cookie value
 * @param expirationHours Expiration time in hours
 */
export const setCookie = (
  name: string,
  value: string,
  expirationHours: number = 4
): void => {
  const date = new Date();
  date.setTime(date.getTime() + expirationHours * 60 * 60 * 1000);
  const expires = `expires=${date.toUTCString()}`;
  document.cookie = `${name}=${value};${expires};path=/`;
};

/**
 * Gets the value of the cookie with the given name
 * @param name Cookie name
 * @returns Cookie value or empty string if not found
 */
export const getCookie = (name: string): string => {
  const cookieName = `${name}=`;
  const cookies = document.cookie.split(";");

  for (let i = 0; i < cookies.length; i++) {
    let cookie = cookies[i].trim();
    if (cookie.indexOf(cookieName) === 0) {
      return cookie.substring(cookieName.length, cookie.length);
    }
  }

  return "";
};

/**
 * Checks if a cookie with the given name exists
 * @param name Cookie name
 * @returns true if cookie exists, false otherwise
 */
export const hasCookie = (name: string): boolean => {
  return getCookie(name) !== "";
};

/**
 * Deletes a cookie with the given name
 * @param name Cookie name
 */
export const deleteCookie = (name: string): void => {
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
};
