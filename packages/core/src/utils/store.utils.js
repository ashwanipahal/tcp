let reduxStore = null;

/**
 * @summary This is to set the redux store in reduxStore variable
 * @param {Object} store - Redux Store object
 */
export const setStoreRef = store => {
  // Need the whole store object, can't just save the apiconfig, as store created on ssr is blank with state and apiconfig is set later..
  reduxStore = store;
};

/**
 * @summary This is to return the redux store via reduxStore variable to be used for apiHelper
 * @returns {Object} Redux Store object

 */
export const getStoreRef = () => {
  return reduxStore;
};

/**
 * @summary This is to reset the value of reduxStore variable as null
 */
export const resetStoreRef = () => {
  reduxStore = null;
};

export default {
  getStoreRef,
  setStoreRef,
  resetStoreRef,
};
