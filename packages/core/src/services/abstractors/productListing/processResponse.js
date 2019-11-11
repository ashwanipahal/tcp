import logger from '@tcp/core/src/utils/loggerInstance';
import processHelpers from './processHelpers';
import { isClient, routerPush, getSiteId, isMobileApp, isCanada } from '../../../utils';
import { getCategoryId, parseProductInfo } from './productParser';
import { FACETS_FIELD_KEY } from './productListing.utils';
import {
  getProductsFilters,
  getTotalProductsCount,
  getCurrentListingIds,
} from '../../../components/features/browse/ProductListing/container/ProductListing.selectors';

const clearAll = {
  CLEAR_ALL_SEARCH_FILTER: 'CLEAR_ALL_SEARCH_FILTER',
  CLEAR_ALL_PLP_FILTER: 'CLEAR_ALL_PLP_FILTER',
};

const { CLEAR_ALL_SEARCH_FILTER, CLEAR_ALL_PLP_FILTER } = clearAll;

const getAvailableL3List = facets => {
  return facets && facets.multilevel && facets.multilevel.bucket;
};
const getAppliedL3Filters = availableL3List => {
  return availableL3List && availableL3List.length && (availableL3List[0].values || []);
};
const isUnbxdLogicApplied = (shouldApplyUnbxdLogic, bucketingSeqConfig) => {
  return shouldApplyUnbxdLogic && bucketingSeqConfig.bucketingRequired;
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
  // NOTE: these are parameters on query string we don't handle (nor we need to)
  // just pass them to the abstractor
  let urlQueryValues = {};
  let routeURL = '?';

  if (filtersAndSort) {
    const { sort } = filtersAndSort;

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
  if (routeURL.includes('search')) {
    if (localStorage.getItem(CLEAR_ALL_SEARCH_FILTER) === null)
      localStorage.setItem(CLEAR_ALL_SEARCH_FILTER, true);
    routerPush(`/search?searchQuery=${urlPathCID}`, routeURL, { shallow: true });
  } else if (routeURL.includes('/c/')) {
    if (localStorage.getItem(CLEAR_ALL_PLP_FILTER) === null)
      localStorage.setItem(CLEAR_ALL_PLP_FILTER, true);
    routerPush(`/c?cid=${urlPathCID}`, routeURL, { shallow: true });
  }
  return true;
};

// eslint-disable-next-line complexity
const processResponse = (
  res,
  state,
  {
    isSearch,
    breadCrumbs,
    shouldApplyUnbxdLogic,
    getFacetSwatchImgPath,
    filtersAndSort,
    bucketingSeqConfig,
    getImgPath,
    excludeBadge,
    hasShortImage,
    isOutfitPage,
    searchTerm,
    sort,
    filterSortView,
    isLazyLoading,
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

  if (!isMobileApp() && filterSortView && !isLazyLoading) {
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
  let productListingCurrentNavIds;
  totalProductsCount = res.body.response.numberOfProducts;
  // This is the scenario when the subsequent L3 calls made in bucekting case. In this scenario we need to send back the filter and count, we cached
  // from the response of page L2 call.
  if (isUnbxdLogicApplied(shouldApplyUnbxdLogic, bucketingSeqConfig)) {
    // TODO - fix this - const { temp : { filters: newFilters, totalProductsCount:newTotalProductsCount }} = this.fetchCachedFilterAndCount();
    const productListingFilters = getProductsFilters(state);
    const productListingTotalCount = getTotalProductsCount(state);
    productListingCurrentNavIds = getCurrentListingIds(state);
    filters = productListingFilters || {};
    totalProductsCount = productListingTotalCount || 0;
  }

  // WHY DO WE NEED THIS??
  const unbxdId = res.headers && res.headers['unbxd-request-id'];
  // TODO - fix this - this.setUnbxdId(unbxdId);
  let entityCategory;
  let categoryNameTop = '';
  let bannerInfo = {
    // TODO - this is hard coded for app - remove it when dependency is resolved
    val: {
      top: [
        {
          sub: 'slot_1',
          typ: 'slot',
          val: {
            cid: '518da3e5-1a67-424b-b8d6-94bf25d82d5f',
            sub: 'divisionTabs',
            typ: 'module',
            val: '',
          },
        },
      ],
    },
  };
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
    currentNavigationIds:
      productListingCurrentNavIds || processHelpers.getCurrentNavigationIds(res),
    breadCrumbTrail: processHelpers.getBreadCrumbTrail(breadCrumbs),
    loadedProductsPages: [[]],
    searchResultSuggestions: processHelpers.getSearchResultsSuggestion(res.body.didYouMean),
    unbxdBanners: processHelpers.getUnbxdBanners(res.body.banner),
    entityCategory,
    categoryNameTop,
  };
  if (res.body.response) {
    const isUSStore = !isCanada();
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

  try {
    if (res.body.banner) {
      bannerInfo = JSON.parse(res.body.banner.banners[0].bannerHtml);
      // TODO - Remove this hardcoding once the real values are available from unbxd
      bannerInfo.val.top[0].val.sub = 'outfitCarousel';
      bannerInfo.val.top[0].val.cid = 'ef8e1162-41eb-4ca0-ad62-cb0833d344c3';
      bannerInfo.val.top[1].val.sub = 'jeans';
      bannerInfo.val.top[1].val.cid = '94d9997f-b7d2-4e1a-ab5c-2983f6bca3f4';

      // Adding extra slot though not configured
      bannerInfo.val.top[2] = {
        sub: 'slot_3',
        typ: 'slot',
        val: {
          cid: '518da3e5-1a67-424b-b8d6-94bf25d82d5f',
          sub: 'divisionTabs',
          typ: 'module',
          val: '',
        },
      };

      // bannerInfo.val.top[3] = {
      //   sub: 'slot_4',
      //   typ: 'slot',
      //   val: {
      //     cid: 'b8119dc0-5bd9-4047-a2cb-c8226eeb4e80',
      //     sub: 'moduleA',
      //     typ: 'module',
      //     val: '',
      //   },
      // };

      // bannerInfo.val.top[4] = {
      //   sub: 'slot_5',
      //   typ: 'slot',
      //   val: {
      //     cid: 'c53989d8-29f9-435f-bde1-d11639affbda',
      //     sub: 'moduleD',
      //     typ: 'module',
      //     val: '',
      //   },
      // };

      // bannerInfo.val.top[5] = {
      //   sub: 'slot_6',
      //   typ: 'slot',
      //   val: {
      //     cid: 'b8119dc0-5bd9-4047-a2cb-c8226eeb4e80',
      //     sub: 'moduleG',
      //     typ: 'module',
      //     val: '',
      //   },
      // };

      // bannerInfo.val.top[6] = {
      //   sub: 'slot_7',
      //   typ: 'slot',
      //   val: {
      //     cid: 'b8119dc0-5bd9-4047-a2cb-c8226eeb4e80',
      //     sub: 'moduleM',
      //     typ: 'module',
      //     val: '',
      //   },
      // };

      //   bannerInfo.val.top[7] = {
      //     sub: 'slot_8',
      //     typ: 'slot',
      //     val: {
      //       cid: 'c716a1b9-0ad7-4125-85fb-f3ba31257587',
      //       sub: 'moduleQ',
      //       typ: 'module',
      //       val: '',
      //     },
      //   };
    }
  } catch (error) {
    logger.error(error);
  }
  return Promise.all(pendingPromises).then(() => {
    return { ...response, bannerInfo };
  });
};

export default processResponse;
