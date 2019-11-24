import pageMapper from './pages';
import * as clickEvents from './clickEvents';
import getConversionValue from './conversion';

const getTransformedObject = mapping => {
  return mapping.split(',').reduce((obj, current) => {
    const currentObj = obj;
    const key = current.trim();
    currentObj[key] = getConversionValue(key);
    return currentObj;
  }, {});
};

export const transformPageEvent = screenName => {
  const mappingString = pageMapper[screenName];

  if (!mappingString) {
    // if mapping is not present then event should not be logged
    return null;
  }
  return getTransformedObject(mappingString);
};

export const transformClickEvent = (name, module) => {
  if (!name) {
    return null;
  }
  const mappingString = clickEvents[module || 'global'][name];
  if (!mappingString) {
    // if mapping is not present then event should not be logged
    return null;
  }
  return getTransformedObject(mappingString);
};
