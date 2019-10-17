const sortfilterTypeSeparator = '^';
const multiSortFilterSeparator = ':';

const generateSortFilterKeys = ParamObj => {
  let sortFilterKey = '';
  Object.keys(ParamObj).forEach(key => {
    if (ParamObj[key] && ParamObj[key].length) {
      if (sortFilterKey) sortFilterKey += sortfilterTypeSeparator;
      sortFilterKey += `${key}=${ParamObj[key].join(multiSortFilterSeparator)}`;
    }
  });
  return sortFilterKey;
};

const getFilterParams = store => {
  const state = store.getState();
  const { form: { 'filter-form': { values } = {} } = {} } = state;
  const {
    TCPColor_uFilter: color = [],
    v_tcpsize_uFilter: size = [],
    age_group_uFilter: age = [],
    gender_uFilter: gender = [],
    unbxd_price_range_uFilter: price = [],
  } = values;
  return generateSortFilterKeys({ color, size, age, price, gender });
};

const getSortParams = store => {
  const state = store.getState();
  const { form: { 'filter-form': { values } = {} } = {} } = state;
  const { sort } = values;
  return sort ? `sort=${sort}` : '';
};

const getDepartmentList = store => {
  const state = store.getState();
  const departmentListing = state.ProductListing && state.ProductListing.get('breadCrumbTrail');
  return departmentListing[0].displayName;
};

const getCategoryList = store => {
  const state = store.getState();
  const departmentListing = state.ProductListing && state.ProductListing.get('breadCrumbTrail');
  return departmentListing[1].displayName;
};

const getListingCount = store => {
  const state = store.getState();
  return state.ProductListing && state.ProductListing.get('totalProductsCount');
};

const getStoreId = store => {
  const state = store.getState();
  const defaultStore = state.User && state.User.get('defaultStore');
  return defaultStore.basicInfo && defaultStore.basicInfo.id;
};

export const generateBrowseDataLayer = store => {
  return {
    listingFilterList: {
      get() {
        const filterLiteral = getFilterParams(store);
        return filterLiteral || '';
      },
    },
    listingSortList: {
      get() {
        let filterLiteral = getFilterParams(store) || '';
        filterLiteral = filterLiteral ? sortfilterTypeSeparator + filterLiteral : '';
        const sortLiteral = getSortParams(store);
        return sortLiteral ? sortLiteral + filterLiteral : '';
      },
    },
    listingDepartment: {
      get() {
        return getDepartmentList(store) || '';
      },
    },
    listingCategory: {
      get() {
        return getCategoryList(store) || '';
      },
    },
    listingCount: {
      get() {
        return getListingCount(store) || '';
      },
    },
    storeId: {
      get() {
        return getStoreId(store) || '';
      },
    },
  };
};

export default generateBrowseDataLayer;
