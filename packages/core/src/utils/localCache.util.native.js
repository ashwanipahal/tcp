/* istanbul ignore file */
/* eslint-disable sonarjs/cognitive-complexity */
import { isClient } from './utils';
import { getValueFromAsyncStorage, setValueInAsyncStorage } from './utils.app';

/**
 * getCacheData - get the cached information
 * @param {object} arg key - window storage object key,
 * objKey - key inside the object which needs to be returned
 */
export const getCacheData = async (key, objKey) => {
  if (isClient()) {
    const stringValue = await getValueFromAsyncStorage(key);
    if (stringValue) {
      const storedDataObj = JSON.parse(stringValue);
      // If the key exists and has been set less than 30 days ago
      if (
        storedDataObj[objKey] &&
        new Date().getTime() - storedDataObj[objKey].timeStamp < 30 * 24 * 60 * 60 * 1000
      ) {
        return storedDataObj[objKey];
      }
      // Comes here when the key exists but is expired, delete the key and return false
      if (storedDataObj[objKey]) {
        delete storedDataObj[objKey];
        await setValueInAsyncStorage({ key, value: JSON.stringify(storedDataObj) });
      }
      return false;
    }
  }
  return false;
};

/**
 * setCacheData - set the data object in the local storage
 * @param {object} arg key - window storage object key,
 * storageKey - address to which the data is mapped,
 * storageValue - object with information related to lat long and country
 */
export const setCacheData = async arg => {
  if (isClient()) {
    const { key, storageKey, storageValue } = arg;
    let sessionStorageObj = {};
    const sessionStorageString = await getValueFromAsyncStorage(key);
    if (sessionStorageString) {
      sessionStorageObj = JSON.parse(sessionStorageString);
      const arrayOfKeys = Object.keys(sessionStorageObj);
      if (arrayOfKeys.length >= 10) {
        // Remove the oldest item
        let keyToRemove = arrayOfKeys[0];
        let oldestTimeStamp = sessionStorageObj[keyToRemove].timeStamp;
        for (let i = 1; i < arrayOfKeys.length; i += 1) {
          const currentObjKey = arrayOfKeys[i];
          if (sessionStorageObj[currentObjKey].timeStamp < oldestTimeStamp) {
            oldestTimeStamp = sessionStorageObj[currentObjKey].timeStamp;
            keyToRemove = currentObjKey;
          }
        }
        delete sessionStorageObj[keyToRemove];
        // End of removing the oldest item logic
      }
    }
    sessionStorageObj[storageKey] = storageValue;
    const sessionStorageData = JSON.stringify(sessionStorageObj);
    // eslint-disable-next-line sonarjs/prefer-immediate-return
    const returnValue = await setValueInAsyncStorage({
      key,
      value: JSON.stringify(sessionStorageData),
    });
    return returnValue;
  }
  return false;
};
