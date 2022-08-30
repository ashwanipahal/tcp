const getPageName = state => {
  const { pageData = {} } = state;
  return pageData.pageName || '';
};

const getPageSection = state => {
  const { pageData = {} } = state;
  return pageData.pageSection || '';
};

const getPageSubSection = state => {
  const { pageData = {} } = state;
  return pageData.pageSubSection || '';
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

export {
  getPageName,
  getPageSection,
  getPageSubSection,
  getStoreSearchCriteria,
  getStoreSearchDistance,
};
