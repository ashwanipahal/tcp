import { isClient } from '@tcp/core/src/utils';
import { setLocalStorage, getLocalStorage } from './localStorageManagement';

/**
 * @description This method is creates the recent searches key name for local storage.
 * @params currentLanguage and currentCountry.
 * @returns key name.
 */

const getRecentKeyName = () => {
  return 'customer-selection';
};

const getObjFromArray = (tempArray, key) => {
  return tempArray.filter(obj => {
    return obj.id === key;
  });
};

/**
 * @description This method is get all the terms form recent searches local storage
 * @params currentLanguage and currentCountry.
 * @returns nothing.
 */

export const getCustomerSelection = key => {
  let temp = [];
  const recentData = getLocalStorage(getRecentKeyName());
  if (isClient() && recentData) {
    // Parse the serialized data back into an array of objects
    const recentDataArray = JSON.parse(recentData);
    if (key) {
      temp = getObjFromArray(recentDataArray, key);
      return temp.length ? temp[0] : {};
    }
    temp = recentDataArray;
  }
  return temp;
};

/**
 * @description This method is remove the term form recent searches in local storage
 * @params term value, currentLanguage and currentCountry.
 * @returns nothing.
 */

export const removeCustomerSelection = key => {
  if (isClient() && key) {
    let recentDataArray = getCustomerSelection();
    recentDataArray = recentDataArray.filter(obj => {
      return obj.id !== key;
    });
    setLocalStorage({ key: getRecentKeyName(), value: JSON.stringify(recentDataArray) });
  }
};

/**
 * @description This method is set the recent searches in local storage
 * Maximum limit in localstorge is 20.
 * @params term value, currentLanguage and currentCountry.
 * @returns nothing.
 */

export const setCustomerSelection = (key, data) => {
  if (isClient()) {
    const maxLimitStorage = 10;

    let recentDataArray = getCustomerSelection();

    // if term is already present in local storage.
    if (recentDataArray && getObjFromArray(recentDataArray, key).length) {
      removeCustomerSelection(key);
      recentDataArray = getCustomerSelection();
    }

    // Push the new data (whether it be an object or anything else) onto the array
    recentDataArray.push({ id: key, ...data });
    // limiting array max length with latest data

    const currentSize = recentDataArray.length;
    if (currentSize > maxLimitStorage) {
      recentDataArray = recentDataArray.slice(currentSize - maxLimitStorage, currentSize);
    }
    // Re-serialize the array back into a string and store it in localStorage
    setLocalStorage({ key: getRecentKeyName(), value: JSON.stringify(recentDataArray) });
  }
};
