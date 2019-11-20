/* eslint-disable sonarjs/cognitive-complexity */
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
const getPlpUrlQueryValues = (filtersAndSort, location) => {
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

  let displayPath = typeof window === 'undefined' ? location.pathname : window.location.pathname;
  const searchName = typeof window === 'undefined' ? location.search || '' : window.location.search;
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
    location,
    filterMaps = {},
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
  if (isClient() && res.body.redirect && typeof window !== 'undefined') {
    window.location.href = res.body.redirect.value;
  }

  if (!isMobileApp() && filterSortView && !isLazyLoading) {
    getPlpUrlQueryValues(filtersAndSort, location);
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
    filters = Object.keys(productListingFilters).length ? productListingFilters : filterMaps;
    totalProductsCount = productListingTotalCount || 0;
  }

  // WHY DO WE NEED THIS??
  const unbxdId = res.headers && res.headers['unbxd-request-id'];
  // TODO - fix this - this.setUnbxdId(unbxdId);
  let entityCategory;
  let categoryNameTop = '';
  let bannerInfo = {};
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
    // if (res.body.banner) {
    // bannerInfo = JSON.parse(res.body.banner.banners[0].bannerHtml);
    bannerInfo = {
      cid: '06961395-c28d-4647-bd4e-9aab0e385568',
      typ: 'promoCombination',
      sub: 'plp',
      val: {
        top: [
          {
            typ: 'slot',
            sub: 'slot_1',
            val: {
              cid: '38796a2d-58c3-4299-a4a1-989061a9b783',
              typ: 'module',
              sub: 'moduleA',
              val: '',
            },
          },
          {
            typ: 'slot',
            sub: 'slot_2',
            val: {
              cid: '08142819-d8a4-466d-87b1-f132aa18311f',
              typ: 'module',
              sub: 'moduleQ',
              val: '',
            },
          },
          {
            typ: 'slot',
            sub: 'slot_3',
            val: {
              cid: 'de2bd00b-82a7-469b-bfeb-7036f6225668',
              typ: 'module',
              sub: 'outfitCarousel',
              val: '',
            },
          },
        ],
        grid: [],
        horizontal: [],
      },
      loyaltyBanner: [
        {
          userType: 'guest',
          html:
            "<style>.plp-promo-banner{display:none}</style><div class=product-promo-banner style=padding:21px15px17px;margin-bottom:31px;background-color:#fff> <div class=plcc-promo-banner-container style=overflow:hidden> <div class=plcc-banner-border-left style=width:10px;min-height:75px;float:left;overflow:hidden></div><div class=promo-banner style=padding-right:10px;margin-top:15px> <span class=perk style=width:54%;display:block;font-family:Avenir;font-size:48px;font-weight:900;font-style:normal;font-stretch:normal;line-height:1.0;color:#e86726;letter-spacing:-.5px;float:left;text-align:left>EARN DOUBLE POINTS</span> <span class=perk-info style=width:43%;display:block;font-family:Avenir;font-size:18px;font-weight:900;font-style:normal;font-stretch:normal;line-height:1.44;letter-spacing:-.1px;color:#333;float:left;text-align:right>ON ALL MY PLACE REWARDS PURCHASES THROUGH 2/28/19</span> </div><div class=promo-banner-links style=font-size:13px;font-family:Avenir;color:#666;text-align:right;padding-right:32px;margin-bottom:5px> <button class='promo-banner-link js-page-link' dest-app='MY_PLACE_REWARDS_CONTENT' dest-web='/us/content/double-up?icid=gl_na_na_regplcc_020319_doubleup' style=text-decoration:underline;color:#666;font-family:Avenir;font-weight:500;font-size:13px>Details</button> <span class=promo-banner-link-divider style=margin:02px>/</span> <a class='promo-banner-link js-banner-create-link' style=text-decoration:underline;color:#666;font-family:Avenir;font-weight:500;font-size:13px> Create Account </a> <span class=promo-banner-link-divider style=margin:02px>/</span> <button class='promo-banner-link js-login' style=text-decoration:underline;color:#666;font-family:Avenir;font-weight:500;font-size:13px>Log In</button> </div></div></div>",
        },
        {
          userType: 'mpr',
          html:
            "<style>.plp-promo-banner{display:none}</style><div class=product-promo-banner style=padding:21px15px17px;margin-bottom:31px;background-color:#fff> <div class='plcc-promo-banner-container user-tier-border-theme' style=overflow:hidden> <div class=plcc-banner-border-left style=width:10px;min-height:75px;float:left;overflow:hidden></div><div class=promo-banner style=padding-right:10px;margin-top:15px> <span class='perk user-tier-theme' style=width:53%;display:block;font-family:Avenir;font-size:48px;font-weight:900;font-style:normal;font-stretch:normal;line-height:1.0;color:#e86726;letter-spacing:-.5px;float:left;text-align:left>EARN DOUBLE POINTS</span> <span class=perk-info style=width:44%;display:block;font-family:Avenir;font-size:18px;font-weight:900;font-style:normal;font-stretch:normal;line-height:1.44;letter-spacing:-.1px;color:#333;float:left;text-align:right>ON ALL MY PLACE REWARDS PURCHASES THROUGH 2/28/19</span> </div><div class=promo-banner-links style=font-size:13px;font-family:Avenir;color:#666;text-align:right;padding-right:32px;margin-bottom:5px> <button class='promo-banner-link js-page-link' dest-app='MY_PLACE_REWARDS_CONTENT' dest-web='/us/content/double-up?icid=gl_na_na_regplcc_020319_doubleup' style=text-decoration:underline;color:#666;font-family:Avenir;font-weight:500;font-size:13px>Details</button> </div></div></div>",
        },
        {
          userType: 'plcc',
          html:
            "<style>.plp-promo-banner{display:none}</style><div class=product-promo-banner style=padding:21px15px17px;margin-bottom:31px;background-color:#fff> <div class='plcc-promo-banner-container user-tier-border-theme' style=overflow:hidden> <div class=plcc-banner-border-left style=width:10px;min-height:75px;float:left;overflow:hidden></div><style>.content-slot-list-container .product-promo-banner .plcc-promo-banner-container .promo-banner, .product-promo-banner .plcc-promo-banner-container .promo-banner {flex-wrap:wrap}.content-slot-list-container .product-promo-banner .perk-info, .product-promo-banner .perk-info {margin-left:22px}.content-slot-list-container .product-promo-banner .promo-banner-links .promo-banner-link, .product-promo-banner .promo-banner-links .promo-banner-link {margin-left:5px}.content-slot-list-container .product-promo-banner .perk-info, .product-promo-banner .perk-info {width:297px!important} .content-slot-list-container .product-promo-banner .plcc-promo-banner-container .promo-banner, .product-promo-banner .plcc-promo-banner-container .promo-banner {padding-right:0px} @media only screen and (min-width:480px){.content-slot-list-container .product-promo-banner .plcc-promo-banner-container .promo-banner{flex-wrap:nowrap}.content-slot-list-container .product-promo-banner .perk-info{margin-left:0}.content-slot-list-container .product-promo-banner .promo-banner-links .promo-banner-link{margin-left:0}.content-slot-list-container .product-promo-banner .perk-info{width:66%!important} .content-slot-list-container .product-promo-banner .plcc-promo-banner-container .promo-banner{padding-right:10px}}</style><div class=promo-banner style=margin-top:15px;display:flex;><span class='perk user-tier-theme' style=width:100%!important;display:block;font-family:Avenir;font-size:48px;font-weight:900;font-style:normal;font-stretch:normal;line-height:1.0;color:#00a7e8;letter-spacing:0.4px;text-align:left>EARN DOUBLE REWARDS</span><span class=perk-info style=width:74%;display:block;font-family:Avenir;font-size:19px;font-weight:900;font-style:normal;font-stretch:normal;line-height:1.44;letter-spacing:-.1px;color:#333;text-align:right>WITH YOUR MY PLACE REWARDS CREDIT CARD THROUGH 2/28/19</span> </div><div class=promo-banner-links style=font-size:13px;font-family:Avenir-Medium;color:#666;text-align:right;padding-right:12px;margin-bottom:5px> <button class='promo-banner-link js-page-link' dest-app='MY_PLACE_REWARDS_CONTENT' dest-web='/us/content/double-up?icid=gl_na_na_regplcc_020319_doubleup' style=text-decoration:underline;color:#666;font-size:13px;font-weight:500>Details</button> </div></div></div>",
        },
      ],
      // };
    };
  } catch (error) {
    logger.error(error);
  }
  return Promise.all(pendingPromises).then(() => {
    return { ...response, bannerInfo };
  });
};

export default processResponse;
