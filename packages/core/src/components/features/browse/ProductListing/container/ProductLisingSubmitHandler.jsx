const submitProductListingFiltersForm = (formData, asdas, getProducts) => {
    console.log("Submit Product Listing Filter Form---------->");
    console.log("formData", formData);

    getProducts();

    // const state = this.store.getState();

    // const isSearchPage = routingStoreView.getCurrentPageId(state) === PAGES.search.id;

    // const searchPageMatch = isSearchPage && matchPath(routingInfoStoreView.getHistory(state).location.pathname, {path: PAGES.search.pathPattern});
    // const seoKey = productListingStoreView.getListingSeoKey(state);

    // return getProductsOperator(this.store).getProductListingBucketedData(canUseDOM() && window.location,true,formData, 1)  // one, as sorting reloads new products from start based on sorting params
    // .then((res) => {
    //   dispatchPlpInfo(this.store, res, false);

    //   // DT-31958
    //   // Reload the espot if the selected department / subdepartment filter has changed
    //   if (isSearchPage && reloadSearchEspot) {
    //     let searchEspots = require('service/resources/espots/espotsVersionsTableSearchPage.json');
    //     let searchEspotKey = productListingStoreView.getSearchEspotKey(this.store.getState());
    //     getGeneralOperator(this.store).loadSearchEspots(searchEspots, searchEspotKey);
    //   }

    //   getRoutingOperator(this.store).pushLocation(isSearchPage ? PAGES.search : PAGES.productListing,
    //     {
    //       queryValues: getPlpUrlQueryValues(routingInfoStoreView.getHistory(state).location.search, formData),
    //       pathSuffix: isSearchPage ? searchPageMatch.params.searchTerm : seoKey
    //     }
    //   );
    // }).catch((err) => {
    //   throw getSubmissionError(this.store, 'submitProductListingFiltersForm', err);
    // });
  }

export default submitProductListingFiltersForm;