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

/**
 * This function will generate the required payload for page load event
 * @param { string } screenName - name of the page, should have mapping in ./pages.js file
 */
export const transformPageEvent = screenName => {
  const mappingString = pageMapper[screenName];

  if (!mappingString) {
    // if mapping is not present then event should not be logged
    return null;
  }
  return getTransformedObject(mappingString);
};

/**
 * This function will generate the required payload for a click event
 * @param { string } name - name of the event key, should have mapping in ./clickEvents
 * @param {string } module - name of the module in which event to be searched, 'global' is the default one
 */
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
