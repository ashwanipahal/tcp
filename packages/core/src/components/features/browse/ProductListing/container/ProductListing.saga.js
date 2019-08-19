import { call, put, takeLatest, select } from 'redux-saga/effects';
import queryString from 'query-string';
import { isClient, bindAllClassMethodsToThis } from '../../../../../utils';
import PRODUCTLISTING_CONSTANTS from './ProductListing.constants';
import { setPlpProducts } from './ProductListing.actions';
import { validateReduxCache } from '../../../../../utils/cache.util';
import Abstractor from '../../../../../services/abstractors/productListing';
import BucketingBL from './ProductListing.bucketing';
import { extractCategory, findCategoryIdandName, matchPath } from './ProductListing.util';
import { FACETS_FIELD_KEY } from '../../../../../services/abstractors/productListing/productListing.utils';
import PAGES from '../../../../../constants/pages.constants';

function isFiltered(filtersAndSort) {
  let isFilterApplied = false;
  if (filtersAndSort) {
    Object.keys(filtersAndSort).forEach(key => {
      if (filtersAndSort[key].length > 0 && key.toLowerCase() !== FACETS_FIELD_KEY.sort) {
        isFilterApplied = true;
      }
    });
  }
  return isFilterApplied;
}

export function dispatchPlpInfo(store, res, isSetNavigationInfo) {
  console.log('res', res);
  // return store.dispatch([
  //   getSetCurrentListingSearchForTextActn(res.currentListingSearchForText),
  //   getSetCurrentListingIsDepartmentActn(res.isDepartment),
  //   getSetCurrentListingIdActn(res.currentListingId),
  //   getSetCurrentListingNameActn(res.currentListingName),
  //   getSetCurrentListingTypeActn(res.currentListingType),
  //   getSetCurrentListingSeoKeyActn(res.currentListingSeoKey),
  //   getSetCurrentListingTitleActn(res.currentListingTitle),
  //   getSetCurrentListingShortDescriptionActn(res.currentListingShortDescription),
  //   getSetCurrentListingDescriptionActn(res.currentListingDescription),
  //   getSetProductsCountActn(res.totalProductsCount),
  //   getSetListingFirstProductsPageActn(res.loadedProducts),
  //   isSetNavigationInfo && getSetListingsBreadCrumbsActn(res.breadCrumbTrail.map(crumb => ({
  //     displayName: crumb.displayName,
  //     destination: PAGES.productListing,
  //     // destination: PAGES.productListing,
  //     pathSuffix: extractCategory(crumb.url),
  //   }))),
  //   getSetListingNavigationTreeActn(res.currentNavigationIds),
  //   getListingSetFiltersMapsActn(res.filtersMaps),
  //   getListingSetAppliedFiltersIdsActn(res.appliedFiltersIds),
  //   getListingSetAppliedSortActn(res.appliedSortId),
  //   getListingSetOutfitListingIdentifierActn(res.outfitStyliticsTag),
  //   getSetSearchResultSuggestionsActn(res.searchResultSuggestions),
  //   getSetCurrentUnbxdRequestId(res.unbxdId),
  //   getSetUnbxdBannersActn(res.unbxdBanners),
  //   getSetEntityCategory(res.entityCategory),
  //   getSetCategoryName(res.categoryNameTop)
  // ]);
}

// Dummy store value till this user info is available
const userStoreView = {
  isGuest: () => true,
  isRemembered: () => false,
};

const routingInfoStoreView = {
  getOriginImgHostSetting: () => {
    return {};
  },
};

export function getPlpCutomizersFromUrlQueryString(urlQueryString) {
  const queryParams = queryString.parse(urlQueryString);
  Object.keys(queryParams).forEach(key => {
    const value = decodeURIComponent(queryParams[key]);
    queryParams[key] =
      key && (key.toLowerCase() === FACETS_FIELD_KEY.sort ? value : value.split(','));
  }); // Fetching Facets and sort key from the URL query string
  return queryParams;
}

class ProductsOperator {
  constructor(store) {
    this.bucketingConfig = {
      start: 0,
      productsToFetchPerLoad: 20,
      L3Left: [],
      currL2NameList: [],
      bucketingSeqScenario: false,
      availableL3: [],
    };
    this.store = store;
    this.shouldApplyUnbxdLogic = true;
    // store && store.getState().session.siteDetails.shouldApplyUnbxdLogic;
    bindAllClassMethodsToThis(this);
  }

  get bucketingLogic() {
    return new BucketingBL();
  }

  getImgPath(id, excludeExtension) {
    return {
      colorSwatch: this.getSwatchImgPath(id, excludeExtension),
      productImages: this.getProductImgPath(id, excludeExtension),
    };
  }

  getSwatchImgPath = (id, excludeExtension) => {
    const imgHostDomain = routingInfoStoreView.getOriginImgHostSetting();
    return `${imgHostDomain}/wcsstore/GlobalSAS/images/tcp/products/swatches/${id}${
      excludeExtension ? '' : '.jpg'
    }`;
  };

  getProductImgPath = (id, excludeExtension) => {
    const imgHostDomain = routingInfoStoreView.getOriginImgHostSetting();

    return {
      125: `${imgHostDomain}/wcsstore/GlobalSAS/images/tcp/products/125/${id}${
        excludeExtension ? '' : '.jpg'
      }`,
      380: `${imgHostDomain}/wcsstore/GlobalSAS/images/tcp/products/380/${id}${
        excludeExtension ? '' : '.jpg'
      }`,
      500: `${imgHostDomain}/wcsstore/GlobalSAS/images/tcp/products/500/${id}${
        excludeExtension ? '' : '.jpg'
      }`,
      900: `${imgHostDomain}/wcsstore/GlobalSAS/images/tcp/products/900/${id}${
        excludeExtension ? '' : '.jpg'
      }`,
    };
  };

  getFacetSwatchImgPath = id => {
    const imgHostDomain = routingInfoStoreView.getOriginImgHostSetting();
    return `${imgHostDomain}/wcsstore/GlobalSAS/images/tcp/category/color-swatches/${id}.gif`;
  };

  getNavAttributes(navTree, categoryId, attribute) {
    const index = navTree ? navTree.length : 0;
    let iterator = 0;
    let categoryFound = '';
    while (iterator < index) {
      if (navTree[iterator].categoryId === categoryId) {
        categoryFound = navTree[iterator][attribute];
      } else if (navTree[iterator].menuItems && navTree[iterator].menuItems.length) {
        categoryFound = this.getNavAttributes(
          navTree[iterator].menuItems[0].length
            ? navTree[iterator].menuItems[0]
            : navTree[iterator].menuItems,
          categoryId,
          attribute
        );
      }
      if (categoryFound) {
        break;
      } else {
        iterator += 1;
      }
    }
    return categoryFound;
  }

  /** @function This function return the L3 items of the requested category id of L2.
   * @param navTree {Object} The vaigation free of left navigation.
   * @param targetId {String} The category ID of L2 whose children we need.
   * @param trgtChildItm {Array} The resultant desired array of all L3.
   * @return trgtChildItm {Array} The resultant desired array of all L3.
   */

  shouldBucktSeq(navTree, targetId, trgtChildItm) {
    const navTreeLength = navTree.length;
    let newTrgtChildItm = trgtChildItm || [];
    for (let idx = 0; idx < navTreeLength; idx += +1) {
      const currItm = navTree[idx];
      // Check if the category of the navigation bieng looped on matches with desired L2 category ID.
      if (currItm.categoryId === targetId) {
        newTrgtChildItm =
          currItm.subCategories.Categories &&
          currItm.subCategories.Categories.length &&
          currItm.menuItems;
        return newTrgtChildItm;
      }
      if (currItm.menuItems && currItm.menuItems.length) {
        // If the category ID does not matches up then recursively call the same function to search depe down the tree.
        newTrgtChildItm = this.shouldBucktSeq(
          currItm.menuItems[0].length ? currItm.menuItems[0] : currItm.menuItems,
          targetId,
          newTrgtChildItm
        );
      }
    }
    return newTrgtChildItm;
  }

  getProductListingBucketedData(
    state,
    location,
    sortBySelected,
    filterAndSortParam = {},
    pageNumber = ''
  ) {
    let filtersAndSort;
    let navigationTree;
    let categoryNameList;
    let clickedL2;
    let sortingAvailable;
    let isOutfitPage;
    ({
      filtersAndSort,
      navigationTree,
      categoryNameList,
      clickedL2,
      sortingAvailable,
      isOutfitPage,
      ...this.bucketingConfig
    } = this.bucketingLogic.doBucketingLogic(
      location,
      state,
      this.bucketingConfig,
      sortBySelected,
      filterAndSortParam,
      getPlpCutomizersFromUrlQueryString
    ));
    // requiredChildren tell us the L3's available under L2 which has been clicked.
    const requiredChildren = clickedL2 && this.shouldBucktSeq(navigationTree, clickedL2.categoryId);
    // isBuktSeqReq tells us if the bucketing is required or not. Bucketing is required only if the L2 which has been clicked has L3 under it.
    const isBuktSeqReq = requiredChildren && requiredChildren.length;
    // If the sorting is available, which means that the user has clicked on sort by option , then we need to roll back to original approach.
    // Means we will need to trigger L2 call only and not mutiple L3's
    // Checking if the bucketing is required or not and click has not happened on L3.
    // Checking if the current page is outfit or not. if it is outfit then fall back to original approach
    if (
      this.shouldApplyUnbxdLogic &&
      !sortingAvailable &&
      isBuktSeqReq &&
      !categoryNameList[2] &&
      !isOutfitPage
    ) {
      // Caching all the L3 which are available under L2. During pagination, if the L3 gets exhust then we will remove that one from this array.
      this.bucketingConfig.L3Left = [...requiredChildren];
      // Caching all the available L3.
      this.bucketingConfig.availableL3 = [...requiredChildren];
      this.bucketingConfig.bucketingSeqScenario = true;
      // Forming the category path of the l2 which has been clicked.
      const categoryPathMapL2 = this.bucketingConfig.currL2NameList
        ? this.bucketingConfig.currL2NameList.map(item => item.categoryId).join('>')
        : '';
      // Making the L2 call first
      return this.fetchFiltersAndCount(filtersAndSort, categoryPathMapL2).then(res => {
        // We need to update the available L3 on the basis of the L2 call response. If the filters are applied then the available L3 gets changed.
        const updatedAvailableL3 = this.bucketingLogic.getUpdatedL3(
          res.availableL3InFilter,
          this.bucketingConfig.availableL3
        );
        this.bucketingConfig.availableL3 = [...updatedAvailableL3];
        this.bucketingConfig.L3Left = [...updatedAvailableL3];
        const l2currentNavigationIds = res.currentNavigationIds;

        // We check if there is any L3 category available to make unbxd call else resolving promise
        if (!this.bucketingConfig.L3Left.length) {
          return Promise.resolve();
        }

        // We are checking if the scroll point is available or not. If yes then this is the case of browser back and we need to do achoring operation.
        // if(parseInt(getSessionStorage('SCROLL_POINT'), 10) || 0) {
        //   return this.fetchProductsCachedCount(categoryNameList, l2currentNavigationIds);
        // }
        categoryNameList.push(this.bucketingConfig.L3Left[0]);
        // Making the category path of the L3 according to the sequence which is there in L3left.
        const categoryPathMap = categoryNameList
          ? categoryNameList.map(item => item && item.categoryId).join('>')
          : '';
        // Making the L3 API Call.
        this.getProductsListingInfo(
          state,
          filtersAndSort,
          pageNumber,
          location,
          this.bucketingConfig.start,
          this.bucketingConfig.productsToFetchPerLoad,
          categoryPathMap
        );
        // return this.getProductsListingInfo(state, filtersAndSort,pageNumber, location, this.bucketingConfig.start, this.bucketingConfig.productsToFetchPerLoad, categoryPathMap)
        //   .then((resp) => {
        //     // We need to update the start, products to be fetched, params
        //     const updatedBucketingConfig = this.bucketingLogic.updateBucketingParamters(resp,this.bucketingConfig);
        //     ({...this.bucketingConfig} = {...updatedBucketingConfig});
        //     resp.currentNavigationIds = l2currentNavigationIds;
        //     // dispatchPlpInfo(this.store, res, false);

        //     return resp;
        //   }).catch((err) => {
        //     console.log(err);
        //     // logErrorAndServerThrow(this.store, 'ProductsOperator.getProductsListingForUrlLocation', err);
        // });
      });
    }
    // if the bucketing is not required then we need to fallback to original approach.
    // If sorting is applied by the customer then we need to fallback to the original approach.
    return this.getProductsListingForUrlLocation(
      state,
      location,
      filterAndSortParam,
      sortBySelected
    );
  }

  getProductsListingForUrlLocation(state, location, sortParam, sortBySelected) {
    const match =
      matchPath(location.pathname, { path: PAGES.PRODUCT_LISTING_PAGE }) ||
      matchPath(location.pathname, { path: PAGES.SEARCH_PAGE });

    const pageNumber = !Number.isNaN(match.pageNumber)
      ? Math.max(parseInt(match.pageNumber, 10))
      : 1;
    const filtersAndSort = sortBySelected
      ? sortParam
      : getPlpCutomizersFromUrlQueryString(location.search);

    return this.getProductsListingInfo(state, filtersAndSort, pageNumber, location);
    // return this.getProductsListingInfo(state, filtersAndSort, pageNumber, location)
    //   .then((res) => {
    //   // We are doing this in NodeJs, Why do we need it here? Commenting this out until we are sure it will not cause side effects
    //   // if a single PDP in the result, and not due to filtering then redirect to the pdp of that product
    //     if (isClient() && match.params.searchTerm && res.loadedProducts.length === 1 && !isFiltered(filtersAndSort)) {
    //       document.location = `${res.loadedProducts[0].productInfo.pdpUrl}?navigateType=direct`;/** if user land on pdp by search on site then pdp
    //     page will have param navigateType whose value will be direct so it will disable Back to
    //     result button */
    //       return document.location;
    //     }

    //     dispatchPlpInfo(this.store, res, false);

    //     return res;
    //   }).catch((err) => {
    //     console.log('error', err);
    //     // logErrorAndServerThrow(this.store, 'ProductsOperator.getProductsListingForUrlLocation', err);
    //   });
  }

  // eslint-disable-next-line
  getProductsListingInfo = (
    state,
    filtersAndSort,
    pageNumber,
    // location = routingInfoStoreView.getHistory(this.store.getState()).location,
    location,
    startProductCount,
    numberOfProducts,
    categoryPathMap,
    catNameL3
    // eslint-disable-next-line
  ) => {
    // const isSearchPage = routingStoreView.getCurrentPageId(state) === PAGES.search.id;
    const isSearchPage = false;
    const match = isSearchPage
      ? matchPath(window.location.pathname, '/search/')
      : matchPath(window.location.pathname, '/c/');
    const categoryKey = isSearchPage ? match.searchTerm : match.listingKey;
    const navigationTree = state.Navigation.navigationData;
    const categoryNameList = findCategoryIdandName(navigationTree, categoryKey).reverse();
    const breadCrumb = categoryNameList
      ? categoryNameList.map(crumb => ({
          categoryId: crumb.categoryId,
          displayName: crumb.title,
          urlPathSuffix: extractCategory(crumb.url),
          longDescription: crumb.longDescription,
        }))
      : [];
    const currentCatId = breadCrumb.length ? breadCrumb[breadCrumb.length - 1].categoryId : '';
    const excludeBage = currentCatId
      ? this.getNavAttributes(navigationTree, currentCatId, 'excludeAttribute')
      : '';
    const isUnbxdSequencing = !isSearchPage; /* && abTestingStoreView.getIsUnbxdSequencing(state, match.params.listingKey) */
    const hasShortImage =
      !isSearchPage && currentCatId
        ? parseInt(this.getNavAttributes(navigationTree, currentCatId, 'isShortImage'), 10) === 1
        : '';
    const bucketingSeqConfig = {};
    let requiredChildren;
    let categoryId;
    const clickedL2 = categoryNameList[1];
    const clickedl1 = categoryNameList[0];

    if (!isUnbxdSequencing || this.shouldApplyUnbxdLogic) {
      bucketingSeqConfig.desiredL2 = clickedL2 ? clickedL2.title : '';
      bucketingSeqConfig.desiredl1 = clickedl1 ? clickedl1.title : '';
    }

    if (this.shouldApplyUnbxdLogic) {
      bucketingSeqConfig.requiredChildren = this.bucketingConfig.availableL3;
      bucketingSeqConfig.bucketingRequired = this.bucketingConfig.bucketingSeqScenario;
      bucketingSeqConfig.desiredL3 =
        !catNameL3 && this.bucketingConfig.L3Left.length
          ? this.bucketingConfig.L3Left[0] && this.bucketingConfig.L3Left[0].name
          : catNameL3; // Fix me: Make catNameL3 available for all getProductsListingInfo calls.
      categoryId =
        categoryPathMap ||
        (categoryNameList ? categoryNameList.map(item => item.categoryId).join('>') : '');
      if (isUnbxdSequencing) bucketingSeqConfig.bucketingSeq = 'A/B-Test';
    } else {
      if (categoryNameList[1]) {
        requiredChildren = this.shouldBucktSeq(navigationTree, clickedL2.categoryId);
        const isBuktSeqReq = requiredChildren && requiredChildren.length;
        bucketingSeqConfig.requiredChildren = requiredChildren;

        if (isUnbxdSequencing) {
          if (!isBuktSeqReq) {
            bucketingSeqConfig.bucketingSeq = 'A/B-Test';
          }
        } else if (isBuktSeqReq) {
          const catId = categoryNameList && categoryNameList.length ? clickedL2.categoryId : null;
          bucketingSeqConfig.bucketingSeq = `sort_${catId} asc,pop_score desc`;
        }
      }
      categoryId = categoryNameList ? categoryNameList.map(item => item.categoryId).join('>') : '';
    }
    return {
      seoKeywordOrCategoryIdOrSearchTerm: match.searchTerm || match.listingKey,
      isSearch: isSearchPage,
      filtersAndSort,
      pageNumber,
      getImgPath: this.getImgPath,
      categoryId,
      breadCrumbs: breadCrumb,
      bucketingSeqConfig,
      getFacetSwatchImgPath: this.getFacetSwatchImgPath,
      isUnbxdSequencing,
      excludeBadge: excludeBage,
      startProductCount,
      numberOfProducts,
      cacheFiltersAndCount: false,
      extraParams: '',
      shouldApplyUnbxdLogic: this.shouldApplyUnbxdLogic,
      hasShortImage,
    };

    /* return this.productsAbstractor.getCategoryListingPage(match.params.searchTerm || match.params.listingKey,
        isSearchPage,
        filtersAndSort, 
        pageNumber, 
        this.getImgPath, 
        categoryId, 
        breadCrumb, 
        bucketingSeqConfig, 
        this.getFacetSwatchImgPath, 
        isUnbxdSequencing, 
        excludeBage,
        startProductCount,
        numberOfProducts,
        false,
        "",
        this.shouldApplyUnbxdLogic,
        hasShortImage)
        .then((res) => {
          if (isClient()) {
            const { loadedProducts, ...otherInfo } = res;

            return this.addCustomUserInfoToProducts(loadedProducts)
              .then(productsWithCustomInfo => ({ loadedProducts: productsWithCustomInfo, ...otherInfo }));
          }
          return res;
        }); */
  };

  addCustomUserInfoToProducts(products) {
    // DT-31015 - no customer information for guest / remembered
    const isGuest = userStoreView.isGuest();
    const isRemembered = userStoreView.isRemembered();
    if (isGuest || isRemembered) {
      return Promise.resolve(products);
    }

    const generalProductIdsList = products.map(product => product.productInfo.generalProductId);
    return this.productsAbstractor
      .getProductsUserCustomInfo(generalProductIdsList)
      .then(extraProductsInfo =>
        products.map(product => {
          const { miscInfo, ...otherAttributes } = product;
          const extraProductInfo = extraProductsInfo[product.productInfo.generalProductId];
          return {
            ...otherAttributes,
            miscInfo: {
              ...miscInfo,
              isInDefaultWishlist: !!extraProductInfo && extraProductInfo.isInDefaultWishlist,
            },
          };
        })
      )
      .catch(err => {
        // if failed, log error and simply do not add any extra info to products
        console.log('ProductsOperator.addCustomUserInfoToProducts', err);
        return products;
      });
  }

  formatPlpProducts(plpProducts) {
    if (isClient()) {
      const { loadedProducts, ...otherInfo } = plpProducts;

      return this.addCustomUserInfoToProducts(loadedProducts).then(productsWithCustomInfo => ({
        loadedProducts: productsWithCustomInfo,
        ...otherInfo,
      }));
    }
    return plpProducts;
  }
}

function* fetchPlpProducts() {
  try {
    const state = yield select();
    const stateNav = state.Navigation;
    const instanceProductListing = new Abstractor();
    const operatorInstance = new ProductsOperator();
    const reqObj = operatorInstance.getProductListingBucketedData(state, window.location);
    const plpProducts = yield call(instanceProductListing.getProducts, reqObj);
    // const plpProductsFormatted = operatorInstance.formatPlpProducts(plpProducts);
    yield put(setPlpProducts({ ...plpProducts }));
  } catch (err) {
    console.log(err);
  }
}

function* ProductListingPageSaga() {
  const cachedFetchProducts = validateReduxCache(fetchPlpProducts);
  yield takeLatest(PRODUCTLISTING_CONSTANTS.FETCH_PRODUCTS, cachedFetchProducts);
}

export default ProductListingPageSaga;
