export const EXTERNAL_URL_RE = /^[a-z]+:/i;
export const APPEARANCE_KEY = 'vitepress-theme-appearance';
export const HASH_RE = /#.*$/;
export const EXT_RE = /(index)?\.(md|html)$/;

export const inBrowser = typeof document !== 'undefined';

export function isActive(currentPath, matchPath, asRegex = false) {
  if (matchPath === undefined) {
    return false;
  }

  currentPath = normalize(currentPath);

  if (asRegex) {
    return new RegExp(matchPath).test(currentPath);
  }
  if (normalize(matchPath) !== currentPath) {
    return false;
  }

  const hashMatch = matchPath.match(HASH_RE);

  if (hashMatch) {
    return (inBrowser ? location.hash : '') === hashMatch[0];
  }

  return true;
}

export function normalize(path) {
  return decodeURI(path).replace(HASH_RE, '').replace(EXT_RE, '');
}

export function isExternal(path) {
  return EXTERNAL_URL_RE.test(path);
}

export function isMailto(path) {
  return /^mailto:/.test(path);
}

export function isTel(path) {
  return /^tel:/.test(path);
}
export function isExternalVisitable(path) {
  const external = isExternal(path);
  const isNotMailOrTel = !(isMailto(path) || isTel(path));

  return external && isNotMailOrTel;
}
