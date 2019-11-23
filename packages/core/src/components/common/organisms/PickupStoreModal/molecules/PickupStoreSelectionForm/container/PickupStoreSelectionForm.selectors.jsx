const getPageName = state => {
  const { pageData = {} } = state;
  return pageData.pageName || '';
};
const getStoreSearchCriteria = state => {
  return (
    state.form &&
    state.form.pickupSearchStoresForm &&
    state.form.pickupSearchStoresForm.values &&
    state.form.pickupSearchStoresForm.values.addressLocation
  );
};

const getStoreSearchDistance = state => {
  return (
    state.form &&
    state.form.pickupSearchStoresForm &&
    state.form.pickupSearchStoresForm.values &&
    state.form.pickupSearchStoresForm.values.distance
  );
};

export { getPageName, getStoreSearchCriteria, getStoreSearchDistance };
