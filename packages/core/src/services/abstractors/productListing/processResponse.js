import processHelpers from './processHelpers';
import { isClient, routerPush, getSiteId, isMobileApp } from '../../../utils';
import { getCategoryId, parseProductInfo } from './productParser';
import { FACETS_FIELD_KEY } from './productListing.utils';

const getAvailableL3List = facets => {
  return facets && facets.multilevel && facets.multilevel.bucket;
};
const getAppliedL3Filters = availableL3List => {
  return availableL3List && availableL3List.length && (availableL3List[0].values || []);
};
const isUnbxdLogicApplied = (shouldApplyUnbxdLogic, bucketingSeqConfig) => {
  return shouldApplyUnbxdLogic && bucketingSeqConfig.bucketingRequired;
};
const getL1Cat = l1category => {
  return l1category || '';
};
const isCachedFilterAndCount = (shouldApplyUnbxdLogic, cacheFiltersAndCount) => {
  return shouldApplyUnbxdLogic && cacheFiltersAndCount;
};
const getCurrentListingId = breadCrumbs => {
  return breadCrumbs && breadCrumbs.length ? breadCrumbs[breadCrumbs.length - 1].urlPathSuffix : '';
};
const getCurrentListingDescription = breadCrumbs => {
  return breadCrumbs && breadCrumbs.length
    ? breadCrumbs[breadCrumbs.length - 1].longDescription
    : '';
};
const getCurrentListingType = breadCrumbs => {
  return breadCrumbs && breadCrumbs.length ? breadCrumbs[breadCrumbs.length - 1].displayName : '';
};
const getOutfitStyliticsTag = (isOutfitPage, searchTerm) => {
  return isOutfitPage ? searchTerm : null;
};

const isDepartmentPage = (isSearch, breadCrumbs) => {
  return !isSearch && (!breadCrumbs || breadCrumbs.length === 1);
};
const isCategoryType = breadCrumbs => {
  return breadCrumbs && breadCrumbs.length ? breadCrumbs[breadCrumbs.length - 1].displayName : '';
};
const getL1Category = breadCrumbs => {
  return breadCrumbs && breadCrumbs.length ? breadCrumbs[0].displayName : '';
};
const getFiltersAfterProcessing = (
  facetsRes,
  numberOfProducts,
  getFacetSwatchImgPath,
  filtersAndSort,
  l1category
) => {
  let filters = {};
  // Construct facets from the api response
  const facetsList = facetsRes && facetsRes.text && facetsRes.text.list && facetsRes.text.list;
  if (facetsList) {
    const facets = processHelpers.getFacetsAPIData(
      facetsList,
      getFacetSwatchImgPath,
      numberOfProducts,
      filtersAndSort
    );
    const unbxdDisplayName = processHelpers.getUnbxdDisplayName(facetsList);
    filters = {
      ...facets,
      unbxdDisplayName, // Key Value object added for Facets DisplayName and FacetName mapping in UI components
      l1category,
    };
  }
  return filters;
};
const getQueryString = (keyValuePairs = {}) => {
  const params = [];
  // eslint-disable-next-line no-restricted-syntax
  for (const key of Object.keys(keyValuePairs)) {
    if (keyValuePairs[key] === null) {
      params.push(encodeURIComponent(key));
    } else {
      // eslint-disable-next-line no-lonely-if
      if (Array.isArray(keyValuePairs[key])) {
        // eslint-disable-next-line no-restricted-syntax
        for (const value of keyValuePairs[key]) {
          params.push([encodeURIComponent(key), '[]=', encodeURIComponent(value)].join(''));
        }
      } else {
        params.push(
          [encodeURIComponent(key), '=', encodeURIComponent(keyValuePairs[key])].join('')
        );
      }
    }
  }
  return params.join('&');
};
// eslint-disable-next-line sonarjs/cognitive-complexity
const getPlpUrlQueryValues = filtersAndSort => {
  const { sort } = filtersAndSort;

  // NOTE: these are parameters on query string we don't handle (nor we need to)
  // just pass them to the abstractor
  let urlQueryValues = {};
  let routeURL = '?';

  if (filtersAndSort) {
    Object.keys(filtersAndSort).forEach(key => {
      if (filtersAndSort[key].length > 0) {
        if (key.toLowerCase() === FACETS_FIELD_KEY.sort) {
          // this also covers the fake sort describing the default server sort (which we give a falsy value like 0)
          urlQueryValues.sort = sort;
        } else {
          urlQueryValues[key] = filtersAndSort[key].join(',');
        }
      }
    });

    Object.keys(filtersAndSort).forEach(key => {
      if (
        (key.toLowerCase() === FACETS_FIELD_KEY.sort &&
          urlQueryValues.sort &&
          filtersAndSort.sort === '') ||
        (urlQueryValues[key] && filtersAndSort[key].length < 1)
      ) {
        // If sort has no value or recommended then no need to pass key in url and api
        delete urlQueryValues[key];
      }
    });
  }

  urlQueryValues = getQueryString(urlQueryValues);

  let displayPath = window.location.pathname;
  const searchName = window.location.search;
  displayPath = `${displayPath}${searchName}`;
  const country = getSiteId();
  let urlPath = displayPath.replace(`/${country}`, '');
  urlPath = urlPath.split('?');
  urlPath = [...urlPath].shift();

  // TODO- To get query from getInitialProps.
  let urlPathCID = urlPath.split('/');
  urlPathCID = urlPathCID[urlPathCID.length - 1];
  urlPathCID = urlPathCID.split('?');
  urlPathCID = [...urlPathCID].shift();

  routeURL = `${routeURL}${urlQueryValues}`;

  routeURL = `${urlPath}${routeURL}`;

  routeURL = urlQueryValues === '' ? routeURL.substring(0, routeURL.length - 1) : routeURL;

  routerPush(`/c?cid=${urlPathCID}`, routeURL, { shallow: true });

  return true;
};

// eslint-disable-next-line complexity
const processResponse = (
  res,
  {
    isSearch,
    breadCrumbs,
    shouldApplyUnbxdLogic,
    cacheFiltersAndCount,
    getFacetSwatchImgPath,
    filtersAndSort,
    bucketingSeqConfig,
    getImgPath,
    excludeBadge,
    hasShortImage,
    isOutfitPage,
    searchTerm,
    sort,
  }
) => {
  const scrollPoint = isClient() ? window.sessionStorage.getItem('SCROLL_POINT') : 0;
  if (scrollPoint) {
    sessionStorage.setItem('SCROLL_EVENT', 1);
  }
  // if (this.apiHelper.responseContainsErrors(res)) {
  //  TODO - error handling throw new ServiceResponseError(res);
  // }
  if (res.body.redirect && window) {
    window.location.href = res.body.redirect.value;
  }

  if (!isMobileApp()) {
    getPlpUrlQueryValues(filtersAndSort);
  }

  const pendingPromises = [];
  // flags if we are oin an L1 plp. Such plp's have no products, and only show espots and recommendations.
  const isDepartment = isDepartmentPage(isSearch, breadCrumbs);
  const attributesNames = processHelpers.getProductAttributes();
  const categoryType = isCategoryType(breadCrumbs);
  const l1category = getL1Category(breadCrumbs);
  let filters = getFiltersAfterProcessing(
    res.body.facets,
    res.body.response.numberOfProducts,
    getFacetSwatchImgPath,
    filtersAndSort,
    l1category
  );
  // We will get the avaialable l3 list in L2 page call in bucekting scenario.
  const availableL3List = getAvailableL3List(res.body.facets);
  const availableL3InFilter = getAppliedL3Filters(availableL3List);
  let totalProductsCount = 0;
  totalProductsCount = res.body.response.numberOfProducts;
  // This is the scenario when the subsequent L3 calls made in bucekting case. In this scenario we need to send back the filter and count, we cached
  // from the response of page L2 call.
  if (isUnbxdLogicApplied(shouldApplyUnbxdLogic, bucketingSeqConfig)) {
    // TODO - fix this - const { temp : { filters: newFilters, totalProductsCount:newTotalProductsCount }} = this.fetchCachedFilterAndCount();
    const newFilters = {};
    const newTotalProductsCount = 0;
    newFilters.l1category = getL1Cat(l1category);
    filters = newFilters;
    totalProductsCount = newTotalProductsCount;
  }
  // This is the case when we need to cache the filter and the count of the number of products in L2. This is a bucketing scenario.
  if (isCachedFilterAndCount(shouldApplyUnbxdLogic, cacheFiltersAndCount)) {
    // TODO - fix this - totalProductsCount = this.cacheFiltersAndCount(filters, availableL3InFilter);
    totalProductsCount = 0;
  }
  // WHY DO WE NEED THIS??
  const unbxdId = res.headers && res.headers['unbxd-request-id'];
  // TODO - fix this - this.setUnbxdId(unbxdId);
  let entityCategory;
  let categoryNameTop = '';
  // Taking the first product in plp to get the categoryID to be sent to adobe
  if (processHelpers.hasProductsInResponse(res.body.response)) {
    const firstProduct = res.body.response.products[0];
    const categoryPath = processHelpers.getCategoryPath(firstProduct);
    const breadcrumbTopId = processHelpers.getBreadcrumbTopId(breadCrumbs);
    entityCategory = processHelpers.parseCategoryEntity(categoryPath, breadCrumbs);
    categoryNameTop = getCategoryId(categoryPath, breadcrumbTopId);
  }
  const response = {
    availableL3InFilter,
    currentListingSearchForText: processHelpers.getCurrentListingSearchForText(
      isSearch,
      searchTerm
    ),
    currentListingSeoKey: searchTerm,
    currentListingId: getCurrentListingId(breadCrumbs),
    currentListingName: categoryType,
    currentListingDescription: getCurrentListingDescription(breadCrumbs),
    currentListingType: getCurrentListingType(breadCrumbs), // need to store it because it will be needed to patch the information when getting additional product information
    isDepartment,
    // An L2 can be an outfits page, if so we need to store the 3rd party tag associated with this outfits page
    outfitStyliticsTag: getOutfitStyliticsTag(isOutfitPage, searchTerm), // DT-34042: dynamic outfit pages
    filtersMaps: filters,
    appliedFiltersIds: processHelpers.getAppliedFilters(filters, filtersAndSort),
    totalProductsCount,
    productsInCurrCategory: res.body.response.numberOfProducts,
    unbxdId,
    appliedSortId: sort,
    currentNavigationIds: processHelpers.getCurrentNavigationIds(res),
    breadCrumbTrail: processHelpers.getBreadCrumbTrail(breadCrumbs),
    loadedProducts: [],
    searchResultSuggestions: processHelpers.getSearchResultsSuggestion(res.body.didYouMean),
    unbxdBanners: processHelpers.getUnbxdBanners(res.body.banner),
    entityCategory,
    categoryNameTop,
  };
  if (res.body.response) {
    // TODO - fix this - let isUSStore = this.apiHelper.configOptions.isUSStore;
    const isUSStore = true;
    res.body.response.products.forEach(product =>
      parseProductInfo(product, {
        isUSStore,
        getImgPath,
        hasShortImage,
        attributesNames,
        categoryType,
        excludeBadge,
        bucketingSeqConfig,
        shouldApplyUnbxdLogic,
        response,
        res,
      })
    );
  }
  return Promise.all(pendingPromises).then(() => response);
};

export default processResponse;
