export const RESET_STORE_TYPE = 'RESET_STORE';

const resetReduxStore = payload => {
  return {
    type: RESET_STORE_TYPE,
    payload,
  };
};

export default resetReduxStore;
