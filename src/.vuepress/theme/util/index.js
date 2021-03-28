export const hashRE = /#.*$/;
export const extRE = /\.(md|html)$/;
export const endingSlashRE = /\/$/;
export const outboundRE = /^[a-z]+:/i;

export function normalize(path) {
  return decodeURI(path).replace(hashRE, '').replace(extRE, '');
}

export function getHash(path) {
  const match = path.match(hashRE);
  if (match) {
    return match[0];
  }
}

function ensureEndingSlash(path) {
  return /(\.html|\/)$/.test(path) ? path : path + '/';
}
function ensureBeginingSlash(path) {
  return /^(\/)/.test(path) ? path : '/' + path;
}

export function isExternal(path) {
  return outboundRE.test(path);
}

export function isMailto(path) {
  return /^mailto:/.test(path);
}

export function isTel(path) {
  return /^tel:/.test(path);
}

export function ensureExt(path) {
  if (isExternal(path)) {
    return path;
  }
  const hashMatch = path.match(hashRE);
  const hash = hashMatch ? hashMatch[0] : '';
  const normalized = normalize(path);

  if (endingSlashRE.test(normalized)) {
    return path;
  }
  return normalized + '.html' + hash;
}

export function isActive(route, path) {
  const routeHash = decodeURIComponent(route.hash);
  const linkHash = getHash(path);
  if (linkHash && routeHash !== linkHash) {
    return false;
  }
  const routePath = normalize(route.path);
  const pagePath = normalize(path);
  return routePath === pagePath;
}

export function resolvePage(pages, rawPath) {
  if (isExternal(rawPath)) {
    return { type: 'external', path: rawPath };
  }

  const path = normalize(rawPath);
  for (let i = 0; i < pages.length; i++) {
    if (normalize(pages[i].regularPath) === path) {
      return Object.assign({}, pages[i], {
        type: 'page',
        path: ensureExt(pages[i].path),
      });
    }
  }
  return {};
}

export function resolvePath(relative, base, append) {
  const firstChar = relative.charAt(0);
  if (firstChar === '/') {
    return relative;
  }

  if (firstChar === '?' || firstChar === '#') {
    return base + relative;
  }

  const stack = base.split('/');

  // remove trailing segment if:
  // - not appending
  // - appending to trailing slash (last segment is empty)
  if (!append || !stack[stack.length - 1]) {
    stack.pop();
  }

  // resolve relative path
  const segments = relative.replace(/^\//, '').split('/');
  for (let i = 0; i < segments.length; i++) {
    const segment = segments[i];
    if (segment === '..') {
      stack.pop();
    } else if (segment !== '.') {
      stack.push(segment);
    }
  }

  // ensure leading slash
  if (stack[0] !== '') {
    stack.unshift('');
  }

  return stack.join('/');
}
function getPageRootParent($site, $page) {
  const rootSeg = $page.regularPath.split('/').filter((s) => !!s)?.[0];
  return $site.pages.find((page) => page.regularPath === ensureBeginingSlash(ensureEndingSlash(rootSeg)));
}

const getPathSegments = (str) => str.split('/').filter((s) => !!s);

export function getPageRelatives($site, $page, removeRootParent = true) {
  const $parentRoute = getPageRootParent($site, $page);
  if (!$parentRoute) return [];
  return $site.pages
    .filter((page) => page.regularPath.startsWith($parentRoute.regularPath))
    .filter((page) => !(removeRootParent && page.regularPath === $parentRoute.regularPath))
    .sort((pageA, pageB) => {
      const { featured: featuredA, sort: sortA = 0 } = pageA.frontmatter || {};
      const { featured: featuredB, sort: sortB = 0 } = pageB.frontmatter || {};

      // run sort on featured if exists
      if (featuredA && !featuredB) {
        return -1;
      } else if (!featuredA && featuredB) {
        return 1;
      }

      // otherwise use sort number
      if (sortA || sortB) {
        return sortA > sortB ? -1 : 1;
      }

      // otherwise fallback to path priority
      const pageASegments = getPathSegments(pageA.regularPath).length;
      const pageBSegments = getPathSegments(pageB.regularPath).length;
      const pageASlashes = pageA.regularPath.match(/\//g).length;
      const pageBSlashes = pageB.regularPath.match(/\//g).length;
      return pageASegments + pageASlashes > pageBSegments + pageBSlashes ? 1 : -1;
    });
}
