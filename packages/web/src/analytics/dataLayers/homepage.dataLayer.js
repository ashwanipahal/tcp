const getStore = store => {
  return store.getState();
};
const getStoreId = store => {
  const state = getStore(store);
  const defaultStore = state.User && state.User.get('defaultStore');
  console.log(state);
  return defaultStore.basicInfo && defaultStore.basicInfo.id;
};

export const generateHomePageDataLayer = store => {
  return {
    storeId: {
      get() {
        return getStoreId(store) || '';
      },
    },
  };
};

export default generateHomePageDataLayer;
