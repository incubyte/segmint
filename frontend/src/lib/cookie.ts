/**
 * Get the value of a cookie by name
 */
export function getCookie(name: string): string | null {
  const cookies = document.cookie.split(";");
  for (const cookie of cookies) {
    const [cookieName, cookieValue] = cookie.trim().split("=");
    if (cookieName === name) {
      return cookieValue;
    }
  }
  return null;
}

/**
 * Set a cookie with the specified name, value, and optional parameters
 */
export function setCookie(
  name: string,
  value: string,
  options: {
    expires?: Date;
    path?: string;
    secure?: boolean;
    sameSite?: "strict" | "lax" | "none";
  } = {}
): void {
  let cookie = `${name}=${value}`;

  if (options.expires) {
    cookie += `; expires=${options.expires.toUTCString()}`;
  }

  if (options.path) {
    cookie += `; path=${options.path}`;
  }

  if (options.secure) {
    cookie += "; secure";
  }

  if (options.sameSite) {
    cookie += `; samesite=${options.sameSite}`;
  }

  document.cookie = cookie;
}

/**
 * Get the persona ID from cookies
 */
export function getPersonaId(): string | null {
  return getCookie("persona_id");
}
