const getCategoryList = store => {
  const state = store.getState();
  return state.ProductListing && state.ProductListing.entityCategory;
};

const getSubCategory = store => {
  const state = store.getState();
  const categoryListing = state.ProductListing && state.ProductListing.breadCrumbTrail;
  return categoryListing[1].displayName;
};

export const generateHomePageDataLayer = store => {
  return {
    listingCategory: {
      get() {
        return getCategoryList(store) || '';
      },
    },
    listingSubCategory: {
      get() {
        return getSubCategory(store) || '';
      },
    },
    storeId: {
      get() {
        return store.getState().APIConfig.storeId || '';
      },
    },
  };
};

export default generateHomePageDataLayer;
