/* eslint-disable no-underscore-dangle */
export function getVar(varName) {
  // eslint-disable-next-line no-underscore-dangle
  return varName && typeof global._satellite !== 'undefined'
    ? global._satellite.getVar(varName)
    : null;
}

export function setVar(name, value) {
  return name && typeof global._satellite !== 'undefined'
    ? global._satellite.setVar(name, value || null)
    : null;
}

export function getVisitorId() {
  if (typeof global._satellite !== 'undefined') {
    return global._satellite.getVisitorId() || '';
  }
  return '';
}

export function setProp(prop, value) {
  const sat = global.s;
  if (typeof sat !== 'undefined' && sat.apl && sat.linkTrackVars) {
    sat[prop] = value;
    sat.linkTrackVars = sat.apl(sat.linkTrackVars, prop, ',', 2);
  }
}

export function track(ruleName, detail) {
  if (typeof global._satellite !== 'undefined') {
    global._satellite.track(ruleName, detail);
  }
}

export function getParam(name, url) {
  let urlParam = null;
  // No URL
  if (!url) {
    urlParam = window.location.href;
  } else if (url.indexOf('?') === -1) {
    // Just query string
    urlParam = `?${url}`;
  }
  urlParam = decodeURIComponent(urlParam);
  const regexS = `[\\?&]+${name}=([^&#]*)`;
  const regex = new RegExp(regexS, 'i');
  let results = regex.exec(urlParam);
  if (results === null) {
    return '';
  }
  results = results[1].replace(/^[ \t]+|[ \t]+$/, '');
  return results;
}

export function readCookie(key) {
  if (window.satellite && window.satellite.readCookie) {
    window._satellite.readCookie(key);
  }
}

export function setCookie(args) {
  const { key, value, daysAlive } = args;
  if (window.satellite && window.satellite.setCookie) {
    window._satellite.setCookie(key, value, daysAlive);
  }
}
