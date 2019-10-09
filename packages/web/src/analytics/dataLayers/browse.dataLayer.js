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
  };
};

export default generateBrowseDataLayer;
