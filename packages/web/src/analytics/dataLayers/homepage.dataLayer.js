const getCategoryList = store => {
  const state = store.getState();
  return state.ProductListing && state.ProductListing.entityCategory;
};

const getNavigationText = store => {
  const state = store.getState();
  return state.ProductListing && state.ProductListing.currentListingSeoKey;
};

const getStoreId = store => {
  const state = store.getState();
  const defaultStore = state.User && state.User.get('defaultStore');
  return defaultStore.basicInfo && defaultStore.basicInfo.id;
};

export const generateHomePageDataLayer = store => {
  return {
    listingCategory: {
      get() {
        return getCategoryList(store) || '';
      },
    },
    pageNavigationText: {
      get() {
        return getNavigationText(store) || '';
      },
    },
    storeId: {
      get() {
        return getStoreId(store) || '';
      },
    },
  };
};

export default generateHomePageDataLayer;
