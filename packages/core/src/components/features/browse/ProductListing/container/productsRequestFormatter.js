/* eslint-disable max-lines */
import { bindAllClassMethodsToThis } from '../../../../../utils';
import BucketingBL from './bucketingLogicHelper';
import {
  findCategoryIdandName,
  matchPath,
  isSearch,
  matchValue,
  getCategoryKey,
  getCurrentCatId,
  getCatId,
  getDesiredNav,
  getSeoKeywordOrCategoryIdOrSearchTerm,
  isCatIdBucketingSeq,
  isRequiredChildrenExists,
  getCatIdUbxd,
  getDesiredL3,
  isRequiredL2L1,
  getBreadCrumb,
  getRequiredCategoryData,
  getPlpCutomizersFromUrlQueryString,
} from './ProductListing.util';
import { isSearched } from '../../SearchDetail/container/SearchDetail.util';
import PAGES from '../../../../../constants/pages.constants';
import {
  getLastLoadedPageNumber,
  getMaxPageNumber,
  getAppliedSortId,
} from './ProductListing.selectors';
import { PRODUCTS_PER_LOAD, routingInfoStoreView } from './ProductListing.constants';

/* calculate the total number of products based on the categoriesset to display to customer i.e Phantom categories */
function getTotalProductsCount(updatedAvailableL3) {
  return updatedAvailableL3.reduce((total, { count }) => total + count, 0);
}

export default class ProductsOperator {
  constructor() {
    this.resetBucketingConfig();
    this.shouldApplyUnbxdLogic = true; // TODO - this is the prod code - store && store.getState().session.siteDetails.shouldApplyUnbxdLogic;

    bindAllClassMethodsToThis(this);
  }

  // eslint-disable-next-line
  get bucketingLogic() {
    return new BucketingBL();
  }

  resetBucketingConfig = () => {
    this.bucketingConfig = {
      start: 0,
      productsToFetchPerLoad: PRODUCTS_PER_LOAD,
      L3Left: [],
      currL2NameList: [],
      bucketingSeqScenario: false,
      availableL3: [],
    };
  };

  getImgPath(id, excludeExtension) {
    return {
      colorSwatch: this.getSwatchImgPath(id, excludeExtension),
      productImages: this.getProductImagePath(id, excludeExtension),
    };
  }

  getNextChildItem = (listOfGroups, currItm, trgtChildItm, targetId) => {
    let newTrgtChildItm = trgtChildItm;
    listOfGroups.forEach(groupName => {
      if (
        currItm.subCategories[groupName] &&
        currItm.subCategories[groupName].items &&
        currItm.subCategories[groupName].items.length
      ) {
        // If the category ID does not matches up then recursively call the same function to search depe down the tree.
        newTrgtChildItm = this.shouldBucktSeq(
          currItm.subCategories[groupName].items.length
            ? currItm.subCategories[groupName].items
            : currItm.subCategories[groupName],
          targetId,
          newTrgtChildItm
        );
      }
    });
    return newTrgtChildItm;
  };

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

  getProductImagePath = (id, excludeExtension) => {
    const imageName = (id && id.split('_')) || [];
    const imagePath = imageName[0];

    return {
      125: `${imagePath}/${id}${excludeExtension ? '' : '.jpg'}`,
      380: `${imagePath}/${id}${excludeExtension ? '' : '.jpg'}`,
      500: `${imagePath}/${id}${excludeExtension ? '' : '.jpg'}`,
      900: `${imagePath}/${id}${excludeExtension ? '' : '.jpg'}`,
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

  fetchFiltersAndCount = (filters, categoryId, categoryNameList, location, pageNumber) => {
    // We need to send some extra params in query string in L2 to fetch the filters, available L3 and the product count in each L3.
    const extraParams = {
      'facet.multilevel': 'categoryPath',
      'f.categoryPath.nameId': true,
      'f.categoryPath.max.depth': 4,
    };
    // const isHideBundleProduct = abTestingStoreView.getIsHideBundleProduct(this.store.getState());
    return {
      seoKeywordOrCategoryIdOrSearchTerm: '',
      isSearch: '',
      filtersAndSort: filters,
      pageNumber,
      getImgPath: '',
      categoryId,
      breadCrumbs: '',
      bucketingSeqConfig: '',
      getFacetSwatchImgPath: this.getFacetSwatchImgPath,
      isUnbxdSequencing: '',
      excludeBadge: '',
      startProductCount: 0,
      numberOfProducts: 0,
      cacheFiltersAndCount: true,
      extraParams,
      shouldApplyUnbxdLogic: this.shouldApplyUnbxdLogic,
      hasShortImage: false,
      categoryNameList,
      location,
      isFetchFiltersAndCountReq: true,
    };
    // isHideBundleProduct);
  };

  getCurrentItems = currItm => {
    const listOfGroups = Object.keys(currItm.subCategories);
    listOfGroups.forEach(groupName => {
      return (
        currItm.subCategories[groupName] &&
        currItm.subCategories[groupName].items &&
        currItm.subCategories[groupName].items.length &&
        currItm.subCategories[groupName].items
      );
    });
  };

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
      if (
        currItm.categoryId === targetId ||
        (currItm.categoryContent && currItm.categoryContent.id === targetId)
      ) {
        // If subCategories has length, it means it doesn't have grouping
        // else it has grouping -> check groups and return current item
        newTrgtChildItm = currItm.subCategories.length
          ? currItm.subCategories
          : this.getCurrentItems(currItm);
        return newTrgtChildItm;
      }
      const listOfGroups = (currItm.subCategories && Object.keys(currItm.subCategories)) || [];
      newTrgtChildItm = this.getNextChildItem(listOfGroups, currItm, newTrgtChildItm, targetId);
    }
    return newTrgtChildItm;
  }

  processProductFilterAndCountData = (res, state, reqObj) => {
    const { categoryNameList, filtersAndSort, pageNumber, location } = reqObj;
    // We need to update the available L3 on the basis of the L2 call response. If the filters are applied then the available L3 gets changed.
    const updatedAvailableL3 = this.bucketingLogic.getUpdatedL3(
      res.availableL3InFilter,
      this.bucketingConfig.availableL3
    );
    this.bucketingConfig.availableL3 = [...updatedAvailableL3];
    this.bucketingConfig.L3Left = [...updatedAvailableL3];
    // const l2currentNavigationIds = res.currentNavigationIds;

    // We check if there is any L3 category available to make unbxd call else resolving promise
    if (!this.bucketingConfig.L3Left.length) {
      return null;
    }

    // We are checking if the scroll point is available or not. If yes then this is the case of browser back and we need to do achoring operation.
    // if(parseInt(getSessionStorage('SCROLL_POINT'), 10) || 0) {
    //   return this.fetchProductsCachedCount(categoryNameList, l2currentNavigationIds);
    // }
    categoryNameList.push(getRequiredCategoryData(this.bucketingConfig.L3Left[0]));
    // Making the category path of the L3 according to the sequence which is there in L3left.
    const categoryPathMap = categoryNameList
      ? categoryNameList.map(item => item && (item.categoryId || item.categoryContent.id)).join('>')
      : '';
    // Making the L3 API Call.
    // return {
    //   state,
    //   filtersAndSort,
    //   pageNumber,
    //   location,
    //   start: this.bucketingConfig.start,
    //   productsToFetchPerLoad: this.bucketingConfig.productsToFetchPerLoad,
    //   categoryPathMap,
    // }

    return this.getProductsListingInfo({
      state,
      filtersAndSort,
      pageNumber,
      location,
      startProductCount: this.bucketingConfig.start,
      numberOfProducts: this.bucketingConfig.productsToFetchPerLoad,
      categoryPathMap,
    });
    // TODO - .then of the this.getProductsListingInfo is removed from here add it back
    // return null;
  };

  getProductListingBucketedData(
    state,
    location,
    sortBySelected,
    filterAndSortParam = {},
    pageNumber = ''
  ) {
    this.resetBucketingConfig();
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
      return this.fetchFiltersAndCount(
        filtersAndSort,
        categoryPathMapL2,
        categoryNameList,
        location,
        pageNumber
      );
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

  getProductsListingForUrlLocation(state, location = window.location, sortParam, sortBySelected) {
    const match =
      matchPath(location.pathname, { path: PAGES.PRODUCT_LISTING_PAGE }) ||
      matchPath(location.pathname, { path: PAGES.SEARCH_PAGE });

    const pageNumber = !Number.isNaN(match.pageNumber)
      ? Math.max(parseInt(match.pageNumber, 10))
      : 1;
    const filtersAndSort = sortBySelected
      ? sortParam
      : getPlpCutomizersFromUrlQueryString(location.search);

    return this.getProductsListingInfo({ state, filtersAndSort, pageNumber, location });
  }

  isExportBadge = (currentCatId, navigationTree) => {
    return currentCatId
      ? this.getNavAttributes(navigationTree, currentCatId, 'excludeAttribute')
      : '';
  };

  shortImage = (isSearchPage, currentCatId, navigationTree) => {
    return !isSearchPage && currentCatId
      ? parseInt(this.getNavAttributes(navigationTree, currentCatId, 'isShortImage'), 10) === 1
      : '';
  };

  isPageSearch = location => {
    return location.pathname.includes('search') ? isSearched() : isSearch();
  };

  isMatchSearch = (isSearchPage, searchTerm, location) => {
    return isSearchPage ? searchTerm : matchValue(isSearchPage, location.pathname);
  };

  getSeoForSearch = (isSearchPage, match) => {
    return isSearchPage ? match : getSeoKeywordOrCategoryIdOrSearchTerm(match);
  };

  getBucketingSeqConfig = (isSearchPage, bucketingSeqConfig) => {
    return isSearchPage ? {} : bucketingSeqConfig;
  };

  checkUnbxdLogic = isSearchPage => {
    return isSearchPage ? false : this.shouldApplyUnbxdLogic;
  };

  getPlpBucketDetails = ({
    bucketingSeqConfigArg,
    categoryNameList,
    categoryPathMap,
    catNameL3,
    isUnbxdSequencing,
    navigationTree,
    categoryIdArg,
    clickedL2,
    isSearchPage,
  }) => {
    let requiredChildren;

    const bucketingSeqConfig = bucketingSeqConfigArg;
    let categoryId = categoryIdArg;
    if (this.checkUnbxdLogic(isSearchPage)) {
      bucketingSeqConfig.requiredChildren = this.bucketingConfig.availableL3;
      bucketingSeqConfig.bucketingRequired = this.bucketingConfig.bucketingSeqScenario;
      bucketingSeqConfig.desiredL3 = getDesiredL3(catNameL3, this.bucketingConfig); // Fix me: Make catNameL3 available for all getProductsListingInfo calls.
      categoryId = getCatIdUbxd(categoryPathMap, categoryNameList);
      if (isUnbxdSequencing) bucketingSeqConfig.bucketingSeq = 'A/B-Test';
    } else {
      if (categoryNameList[1]) {
        requiredChildren = this.shouldBucktSeq(navigationTree, clickedL2.categoryId);
        const isBuktSeqReq = isRequiredChildrenExists(requiredChildren);
        bucketingSeqConfig.requiredChildren = requiredChildren;

        if (isUnbxdSequencing) {
          if (!isBuktSeqReq) {
            bucketingSeqConfig.bucketingSeq = 'A/B-Test';
          }
        } else if (isBuktSeqReq) {
          const catId = isCatIdBucketingSeq(categoryNameList, clickedL2);
          bucketingSeqConfig.bucketingSeq = `sort_${catId} asc,pop_score desc`;
        }
      }
      categoryId = getCatId(categoryNameList);
    }
    return { bucketingSeqConfig, categoryId };
  };

  getProductsListingFilters({ state, asPath, pageNumber, formData, location }) {
    const filtersAndSort = formData || getPlpCutomizersFromUrlQueryString(asPath);
    return this.getProductsListingInfo({
      state,
      filtersAndSort,
      pageNumber,
      location,
    });
  }

  getProductsListingInfo = ({
    state,
    filtersAndSort,
    pageNumber,
    // TODO - fix this for mobile APP - location needs to be defined
    location = window.location, // TODO - this is the prod code - location = routingInfoStoreView.getHistory(this.store.getState()).location,
    startProductCount,
    numberOfProducts,
    categoryPathMap,
    catNameL3,
    l2currentNavigationIds,
    updatedAvailableL3,
  }) => {
    const isSearchPage = this.isPageSearch(location);
    const searchTerm = location.pathname.substr(11);
    const match = this.isMatchSearch(isSearchPage, searchTerm, location);
    const categoryKey = getCategoryKey(isSearchPage, match);
    const navigationTree = state.Navigation.navigationData;
    const categoryNameList = findCategoryIdandName(navigationTree, categoryKey).reverse();
    const breadCrumb = getBreadCrumb(categoryNameList);
    const currentCatId = getCurrentCatId(breadCrumb);
    const excludeBage = this.isExportBadge(currentCatId, navigationTree);
    const isUnbxdSequencing = !isSearchPage; /* && abTestingStoreView.getIsUnbxdSequencing(state, match.params.listingKey) */
    const hasShortImage = this.shortImage(isSearchPage, currentCatId, navigationTree);
    let categoryId;
    const clickedL2 = categoryNameList[1];
    const clickedl1 = categoryNameList[0];
    const bucketingSeqConfig = {};
    let filteredBucketingSeqConfig = {};

    if (!isSearchPage) {
      if (isRequiredL2L1(isUnbxdSequencing, this.checkUnbxdLogic(isSearchPage))) {
        bucketingSeqConfig.desiredL2 = getDesiredNav(clickedL2);
        bucketingSeqConfig.desiredl1 = getDesiredNav(clickedl1);
      }

      filteredBucketingSeqConfig = this.getPlpBucketDetails({
        bucketingSeqConfigArg: bucketingSeqConfig,
        categoryNameList,
        categoryPathMap,
        catNameL3,
        isUnbxdSequencing,
        navigationTree,
        categoryIdArg: categoryId,
        clickedL2,
      });
    }

    return {
      seoKeywordOrCategoryIdOrSearchTerm: this.getSeoForSearch(isSearchPage, match),
      isSearch: isSearchPage,
      filtersAndSort,
      pageNumber,
      getImgPath: this.getImgPath,
      categoryId: filteredBucketingSeqConfig.categoryId,
      breadCrumbs: breadCrumb,
      bucketingSeqConfig: this.getBucketingSeqConfig(
        isSearchPage,
        filteredBucketingSeqConfig.bucketingSeqConfig
      ),
      getFacetSwatchImgPath: this.getFacetSwatchImgPath,
      isUnbxdSequencing,
      excludeBadge: excludeBage,
      startProductCount,
      numberOfProducts,
      cacheFiltersAndCount: false,
      extraParams: '',
      shouldApplyUnbxdLogic: this.checkUnbxdLogic(isSearchPage),
      hasShortImage,
      categoryNameList,
      l2currentNavigationIds,
      updatedAvailableL3,
    };
  };

  updateBucketingConfig = res => {
    const updatedBucketingConfig = this.bucketingLogic.updateBucketingParamters(
      res,
      this.bucketingConfig
    );
    ({ ...this.bucketingConfig } = { ...updatedBucketingConfig });
    if (this.bucketingConfig.availableL3.length) {
      res.totalProductsCount = getTotalProductsCount(this.bucketingConfig.availableL3);
    }
  };

  getProductsListingMoreProducts(state, location) {
    // if (isOnSeoPlp()) return Promise.resolve(); // scrolling is only supported on pages intended for human users, not for crawlers
    const lastLoadedPageNumber = getLastLoadedPageNumber(state);
    if (lastLoadedPageNumber >= getMaxPageNumber(state)) {
      return null; // nothing more to load
    }

    const appliedFiltersIds = state.ProductListing.get('appliedFiltersIds');
    // TODO - take the fallback from sort array once sort functionality is merged
    const sort = (state.ProductListing && state.ProductListing.get('appliedSortId')) || '';

    const appliedFiltersAndSort = { ...appliedFiltersIds, sort };
    return this.getProductsListingInfo({
      state,
      filtersAndSort: appliedFiltersAndSort,
      pageNumber: lastLoadedPageNumber + 1,
      location,
    });
  }

  /**
   * @funtion getMoreBucketedProducts We have a functionality on PLP page of lazy load and the next set of products are loaded when the user scrolls
   *          down. Under DTN:6529 , we need to check if the lazy load is happening on the scenario where the bucketing is required. If it does then
   *          we need to trigger multiple L3 calls on the basis of what all L3's are left in this.bucketingConfig.L3left variable.
   */

  getMoreBucketedProducts = (state, location) => {
    // if (isOnSeoPlp()) return Promise.resolve(); // scrolling is only supported on pages intended for human users, not for crawlers
    // const state = this.store.getState();
    const sort = getAppliedSortId(state) || '';
    // If this is not a bucketing scenario and if the sort parameter is applied then we need to follow the original approach.
    if (this.shouldApplyUnbxdLogic && this.bucketingConfig.bucketingSeqScenario && !sort) {
      // If no L3 are left to load means we have brought all the products in current L2, then we need to resolve the promise.
      if (!this.bucketingConfig.L3Left.length) {
        return null; // nothing more to load
      }
      const appliedFiltersIds = state.ProductListing.get('appliedFiltersIds');

      const categoryNameList = [...this.bucketingConfig.currL2NameList];
      // Pushing the first L3 available in L3left variable
      categoryNameList.push(getRequiredCategoryData(this.bucketingConfig.L3Left[0]));
      const appliedFiltersAndSort = { ...appliedFiltersIds, sort };
      // Constructing the category path of the L3
      const categoryPathMap = categoryNameList
        ? categoryNameList.map(item => item.categoryId).join('>')
        : '';
      return this.getProductsListingInfo({
        state,
        filtersAndSort: appliedFiltersAndSort,
        pageNumber: false,
        // location: routingInfoStoreView.getHistory(this.store.getState()).location,
        location: window.location,
        startProductCount: this.bucketingConfig.start,
        numberOfProducts: this.bucketingConfig.productsToFetchPerLoad,
        categoryPathMap,
      });
    }
    return this.getProductsListingMoreProducts(state, location);
  };
}
