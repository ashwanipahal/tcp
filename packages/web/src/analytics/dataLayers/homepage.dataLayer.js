const getStoreId = store => {
  const state = store.getState();
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
