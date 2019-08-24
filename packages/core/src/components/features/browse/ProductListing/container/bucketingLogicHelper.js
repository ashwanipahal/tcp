/* eslint-disable extra-rules/no-commented-out-code */
// import { routingStoreView } from 'reduxStore/storeViews/routing/routingStoreView.js';
// import { generalStoreView } from 'reduxStore/storeViews/generalStoreView';
import { findCategoryIdandName, matchPath } from './ProductListing.util';
// import { getSessionStorage } from 'util/sessionStorageManagement';
import { PRODUCTS_PER_LOAD } from './ProductListing.constants';
// import PAGES from '../../../../../constants/pages.constants';
import { isMobileApp } from '../../../../../utils';

class BucketingBL {
  /**
   * @function getUpdatedL3 We get the avaialble L3 in the L2 which has been clicked in the L2 call response. If the user has selected the filters then
   *           then the available L3 changes on the basis of th filters applied. We need to replce our cached L3 with the updated ones.
   * @param {Array} l3ReturnedByL2 The L3 which have been returned by L2 call.
   */
  getUpdatedL3 = (l3ReturnedByL2, availableL3) => {
    const updatedAvailableL3 = [];
    // Looping over the cached L3
    // eslint-disable-next-line
    availableL3.map(item => {
      const itm = { ...item };
      // We need to check if the L3 in loop matches with any L3 in the list got in L2 response. If it does then we will push it in a tempArray.
      // and then replcae it with cached L3 left and available L3. We are doing this beacuse, yes it is true that we need to make calls for all those
      // L3 which we recevied in L2 response but we need to make in the sequence which is there in Taxanomy.
      for (let idx = 0; idx < l3ReturnedByL2.length; idx += 1) {
        if (itm.categoryId === l3ReturnedByL2[idx].id) {
          itm.count = l3ReturnedByL2[idx].count;
          updatedAvailableL3.push(itm);
        }
      }
    });
    return updatedAvailableL3;
  };

  /**
   * @funtion updateBucketingParamters This function updates the start and the products to be fetched , after an L3 call is successfull.
   * @param {Object} res The response object of L3 Call.
   */
  updateBucketingParamters = (res, bucketingConfig) => {
    const temp = { ...bucketingConfig };
    const { productsToFetchPerLoad } = temp;
    let { start } = temp;
    const productsFecthedTillNow = start + productsToFetchPerLoad;
    const productsLeft = res.productsInCurrCategory - productsFecthedTillNow;
    // The start for the next call will be the products which have been fetched till now.
    start = productsFecthedTillNow;
    // If the products be fetched are less than what are left , then we will fetch the remaining products in the next L3 call.
    if (productsToFetchPerLoad > productsLeft) {
      temp.productsToFetchPerLoad = productsLeft;
    }
    // If no products are left in an L3 means all the products have been fetched, then we need to reset the start to 0 again and we need to remove
    // the exhausted catehory from the L3left variable so that next time the next category with start 0 is called.
    if (productsLeft <= 0) {
      temp.start = 0;
      temp.productsToFetchPerLoad = PRODUCTS_PER_LOAD;
      temp.L3Left.splice(0, 1);
    }
    return temp;
  };

  /**
   * @function doBucketingLogic This function does the logic work needed for bucketing
   */

  getMatchPath = (isSearchPage, location) => {
    const params = isSearchPage ? '/search/' : '/c/';
    const pathname = isMobileApp() ? location.pathname : window.location.pathname;
    const match = matchPath(pathname, params);
    return match;
  };

  doBucketingLogic = (
    location = '',
    state,
    bucketingConfig,
    sortBySelected,
    filterAndSortParam,
    callback
  ) => {
    const temp = {};
    const bucketingConfigTemp = { ...bucketingConfig };
    // Checking if the current page is SRP or PLP
    // temp.isSearchPage = routingStoreView.getCurrentPageId(state) === PAGES.search.id;
    // const match = temp.isSearchPage
    //   ? matchPath(location.pathname, { path: PAGES.search.pathPattern })
    //   : matchPath(location.pathname, { path: PAGES.productListing.pathPattern });
    // temp.categoryKey = temp.isSearchPage ? match.params.searchTerm : match.params.listingKey;
    temp.isSearchPage = false;
    const match = this.getMatchPath(temp.isSearchPage, location);
    temp.categoryKey = temp.isSearchPage ? match.searchTerm : match.listingKey;
    // temp.navigationTree = generalStoreView.getHeaderNavigationTree(state);
    temp.navigationTree = state.Navigation.navigationData;
    // categoryNameList is an array of the categories. Eg if the click has happened over L2 which is boys -> Denim. Then categoryNameList will
    // be [{category information of boys}, {category information of denim}].
    temp.categoryNameList = findCategoryIdandName(temp.navigationTree, temp.categoryKey).reverse();
    // eslint-disable-next-line
    temp.clickedL2 = temp.categoryNameList[1];
    bucketingConfigTemp.currL2NameList = [...temp.categoryNameList];
    bucketingConfigTemp.bucketingSeqScenario = false;
    // Checking if the user has clicked on sort by options.
    if (sortBySelected) {
      temp.sortingAvailable = filterAndSortParam.sort;
      // setting the start to 0. We send this in UNBXD call to tell them from which index do we need to fetch the products.
      bucketingConfigTemp.start = 0;
      bucketingConfigTemp.productsToFetchPerLoad = PRODUCTS_PER_LOAD;
      temp.filtersAndSort = filterAndSortParam;
    } else {
      temp.filtersAndSort = (location && callback(location.search)) || {};
      temp.sortingAvailable = temp.filtersAndSort.sort;
    }
    // const isSearchPage = routingStoreView.getCurrentPageId(state) === PAGES.search.id;
    const isSearchPage = false;
    const isSearch = match.searchTerm || match.listingKey;
    const searchTerm = decodeURIComponent(isSearch);
    temp.isOutfitPage = !isSearchPage && searchTerm && searchTerm.indexOf('-outfit') > -1;
    return { ...temp, ...bucketingConfigTemp };
  };

  /**
   * @function fetchL3AndCount We get the available l3 in l2 call. Before moving from PLP To PDP we cache the number of products which we have
   *                           fetched till now in session storage. Now on the basis of this count, we need to check how many products needs
   *                           to be fetched for which L3. We construct an object where each object has two attributes, one tells us which
   *                           categoryId needs to fetched and the other tells us how many products to fetch
   * @param {Array} availableL3 the available L3s returned from L2 call.
   */

  fetchL3AndCount = availableL3 => {
    const temp = [];
    const productsToBeFetched = /* parseInt(getSessionStorage('LOADED_PRODUCT_COUNT'), 10) || */ PRODUCTS_PER_LOAD;
    let productCountLeft = productsToBeFetched;
    // eslint-disable-next-line
    availableL3.map(item => {
      const tmpObj = {
        categoryId: item.categoryId,
        name: item.name,
      };
      if (productCountLeft > 0) {
        tmpObj.productCount = item.count < productCountLeft ? item.count : productCountLeft;
        productCountLeft -= item.count;
        temp.push(tmpObj);
      }
    });
    return temp;
  };

  /**
   * @function fetchPendingCallStack This function make a stack of all the pending promises which needs to be completed to fetch the products
   *                                 according to the cached count. There is one limitation of UNBXD that we cannot order more than 100 products
   *                                 over a single call. Now suppose one L3 is having 106 products to be fetched. We will make two calls for this L3.
   *                                 One for 100 products and other for 6 products. We are making all the calls in parallel.
   */

  fetchPendingCallStack = (
    totalCount,
    MaxProducts,
    pendingPromisesStack,
    filtersAndSort,
    start,
    categoryPathMap,
    callback,
    location,
    catNameL3
    // eslint-disable-next-line
  ) => {
    const countToFetch = totalCount < MaxProducts ? totalCount : MaxProducts;
    pendingPromisesStack.push(
      callback(filtersAndSort, '', location, start, countToFetch, categoryPathMap, catNameL3)
    );
    const countLeft = totalCount - countToFetch;
    // Checking of there is still some products left of the L3 to be fetched. if yes then recursively call this function to fetch all the products.
    if (countLeft > 0) {
      return this.fetchPendingCallStack(
        countLeft,
        MaxProducts,
        pendingPromisesStack,
        filtersAndSort,
        countToFetch,
        categoryPathMap,
        callback,
        location,
        catNameL3
      );
    }
    return pendingPromisesStack;
  };

  /**
   * @function updateBcktngParamBrwsrAnchoring DTN-7979: This function updates the bucketing paramters in the browser anchoring scenario.
   *                                           Once the user lands back to plp from pdp we achor him on the product he clicked on. In this scenario we
   *                                           make mutiple l3 calls in parallel to fetch the cached count data. We would need to update the buckeing
   *                                           params in this case.
   * @param {Object} bucketingConfig
   * @param {Array} l3ToFetch The array which tells us which all l3's we need to fetch
   */

  updateBcktngParamBrwsrAnchoring = (bucketingConfig, l3ToFetch) => {
    const temp = { ...bucketingConfig };
    const tempL3Available = [];
    for (let index = 0; index < l3ToFetch.length; index += 1) {
      // We need to check if the count of the l3 in question have been fetched or not completely. Now if it has been fetched completely then
      // we need to remove that l3 from l3 left array as it has already exhusted.
      if (temp.L3Left[index].count > l3ToFetch[index].productCount) {
        tempL3Available.push(temp.L3Left[index]);
        temp.start = l3ToFetch[index].productCount;
      }
    }
    const remainingL3 = temp.L3Left.slice(l3ToFetch.length, temp.L3Left.length);
    temp.L3Left = [...tempL3Available, ...remainingL3];
    return temp;
  };
}

export default BucketingBL;
