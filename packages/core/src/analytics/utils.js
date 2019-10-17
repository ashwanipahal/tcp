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
