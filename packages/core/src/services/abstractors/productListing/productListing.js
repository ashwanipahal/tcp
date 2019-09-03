import { executeUnbxdAPICall } from '../../handler';
import endpoints from '../../endpoints';
import utils, { isClient, bindAllClassMethodsToThis } from '../../../utils';
import { parseBoolean } from './productParser';
import processHelpers from './processHelpers';
import { PRODUCTS_PER_LOAD } from '../../../components/features/browse/ProductListing/container/ProductListing.constants';
import processResponse from './processResponse';

const apiHelper = {
  configOptions: {
    isUSStore: true,
    siteId: utils.getSiteId(),
  },
  responseContainsErrors: () => {
    return false;
  },
};

const isOutfit = (isSearch, searchTerm) => {
  return !isSearch && searchTerm && searchTerm.indexOf('-outfit') > -1;
};

const getStart = (startProductCount, pageNumber) => {
  return startProductCount !== undefined ? startProductCount : (pageNumber - 1) * PRODUCTS_PER_LOAD;
};

const isNoUnbxdLogic = (shouldApplyUnbxdLogic, isUnbxdSequencing) => {
  return !shouldApplyUnbxdLogic && !isUnbxdSequencing;
};

const isNotSearchAndBucketing = (isSearch, bucketingSeqConfig) => {
  return !isSearch && bucketingSeqConfig.bucketingSeq;
};

const isNoBucketing = bucketingSeqConfig => {
  return bucketingSeqConfig.bucketingSeq && bucketingSeqConfig.requiredChildren.length;
};

const getqParam = searchTerm => {
  return searchTerm || '*';
};

const validateStartVal = start => {
  return !Number.isNaN(start) ? start : 0;
};

class ProductsDynamicAbstractor {
  constructor() {
    this.apiHelper = apiHelper;
    this.unbxdId = null;
    this.cachedFilters = null;
    this.cachedCount = 0;
    // create this-bound varsions of all methods of this class
    bindAllClassMethodsToThis(this);
  }

  /**
   * @function setUnbxdId
   * @summary This will set the UNBXD id we get from reponse headers in  UNBXD call.
   */

  setUnbxdId = id => {
    this.unbxdId = id;
    return this.unbxdId;
  };

  /**
   * @function getUnbxdId
   * @summary This will get the UNBXD id that we got from reponse headers in  UNBXD call.
   */

  getUnbxdId = () => this.unbxdId;

  /*
   * @function isBOPISProduct
   * @summary This BOPIS logic is to validate if product/color variant is eligible for BOPIS
   * product is a color variant object of a product.
   */
  isBOPISProduct(product) {
    const { isUSStore } = this.apiHelper.configOptions;
    let isOnlineOnly;
    if (isUSStore) {
      isOnlineOnly =
        (product.TCPWebOnlyFlagUSStore && parseBoolean(product.TCPWebOnlyFlagUSStore)) || false; // validate if product is online only so it is not BOPIS eligible
    } else {
      isOnlineOnly =
        (product.TCPWebOnlyFlagCanadaStore && parseBoolean(product.TCPWebOnlyFlagCanadaStore)) ||
        false;
    }
    return !isOnlineOnly;
  }

  /**
   * @function extractFilters
   * @summary To create UNBXD facets api query string from all selected facets
   * @param {object} filtersAndSort - selected filters and values object
   */
  extractFilters = filtersAndSort => {
    const filterQuery = {};
    let query = '';
    const facetKeys = Object.keys(filtersAndSort);
    facetKeys.forEach(facetKey => {
      let facetValue = filtersAndSort[facetKey];
      if (
        processHelpers.isUnbxdFacetKey(facetKey) &&
        facetValue &&
        facetValue.length > 0 &&
        facetKey.indexOf('uFilter') > -1
      ) {
        facetValue = facetValue.map(facet => `${facetKey}:"${encodeURIComponent(facet)}"`);
        query += facetValue.length > 0 ? (query ? '&filter=' : '') + facetValue.join(' OR ') : '';
      }
    });

    if (query !== '') filterQuery.filter = query;
    return filterQuery;
  };

  // PLP to PDP then again back to PLP, maintainig autoscroll position by managing state with products count
  getSetAPIProductsCount = () => {
    // if totalProducts are greater than PRODUCTS_PER_LOAD limit it to PRODUCTS_PER_LOAD and update sessionStorage for auto scroll
    let unbxdCount = PRODUCTS_PER_LOAD;
    if (isClient()) {
      const MAX_PRODUCT_PER_CALL = 100;
      let loadedProductCount = PRODUCTS_PER_LOAD;
      const totalProducts = sessionStorage.getItem('LOADED_PRODUCT_COUNT');
      if (totalProducts && totalProducts >= MAX_PRODUCT_PER_CALL) {
        unbxdCount = MAX_PRODUCT_PER_CALL;
        loadedProductCount = totalProducts - MAX_PRODUCT_PER_CALL;
      } else if (
        totalProducts &&
        totalProducts >= PRODUCTS_PER_LOAD &&
        totalProducts <= MAX_PRODUCT_PER_CALL
      ) {
        unbxdCount = totalProducts;
        loadedProductCount = PRODUCTS_PER_LOAD;
      }
      sessionStorage.setItem('LOADED_PRODUCT_COUNT', loadedProductCount);

      const scrollPoint = window.sessionStorage.getItem('SCROLL_POINT') || 0;
      if (scrollPoint > 0 && totalProducts <= PRODUCTS_PER_LOAD) {
        sessionStorage.setItem('RESET_SCROLL_CONDITIONS', 1); // Don't auto scroll if items less than standard call
      }
    }
    return unbxdCount;
  };

  /**
   * @function cacheFiltersAndCount DTN:6592, In bucekting scenario we make L2 call first to fetch the facets and the count,
   *           we need to cache them as we wont be asking  for these paramters in subsequent L3 calls.
   * @param {Object} filters The facets of the L2.
   * @param {Array} availableL3InFilter Available l3 in the current L2 which has been clicked.
   * @return {Number} the number of products in an L2.
   */

  cacheFiltersAndCount = (filters, availableL3InFilter) => {
    this.cachedFilters = filters;
    let count = 0;
    // We need to add up the count coming in each L3 to show up the number of products in the L2 at the top of the listing.
    availableL3InFilter.map(item => {
      count += item.count;
      return count;
    });
    this.cachedCount = count;
    return count;
  };

  handleValidationError = e => {
    console.log(e);
  };

  /**
   * @function fetchCachedFilterAndCount This is the scenario when the subsequent L3 calls made in bucekting case. In this scenario we need to send back
   *           the filter and count, we cached from the response of page L2 call.
   * @returns {Object} the cached filters and count.
   */

  fetchCachedFilterAndCount = () => {
    const temp = {
      filters: [],
      totalProductsCount: 0,
    };
    if (this.cachedFilters) {
      temp.filters = this.cachedFilters;
    }
    if (this.cachedCount) {
      temp.totalProductsCount = this.cachedCount;
    }
    return temp;
  };

  getProducts = reqObj => {
    const {
      seoKeywordOrCategoryIdOrSearchTerm,
      isSearch,
      filtersAndSort,
      pageNumber,
      getImgPath,
      categoryId,
      breadCrumbs,
      bucketingSeqConfig,
      getFacetSwatchImgPath,
      isUnbxdSequencing,
      excludeBadge,
      startProductCount,
      numberOfProducts,
      cacheFiltersAndCount,
      extraParams,
      shouldApplyUnbxdLogic,
      hasShortImage,
    } = reqObj;

    const searchTerm = decodeURIComponent(seoKeywordOrCategoryIdOrSearchTerm);
    const { sort = null } = filtersAndSort;
    const facetsPayload = this.extractFilters(filtersAndSort);
    const isOutfitPage = isOutfit(isSearch, searchTerm);

    // We will be sending the rows to getCategoryListingPage function in the bucketing scenario and we need to send that in UNBXD api.
    // Falsy check has not been placed as i need to send row 0 in L2 call in case of bucketing sequence.
    const row = numberOfProducts !== undefined ? numberOfProducts : this.getSetAPIProductsCount();
    // We will be sending the start to getCategoryListingPage function in the bucketing scenario and we need to send that in UNBXD api.
    // Falsy check has not been placed as i need to send start 0 in L2 call in case of bucketing sequence.
    const start = getStart(startProductCount, pageNumber); // In UNBXD start is from zero but seo paging starts with 1
    const payload = {
      body: {
        ...facetsPayload,
        ...extraParams,
        start: validateStartVal(start),
        rows: row,
        variants: true,
        'variants.count': 0,
        version: 'V2',
        'facet.multiselect': true,
        selectedfacet: true,
        fields:
          'alt_img,style_partno,giftcard,TCPProductIndUSStore,TCPFitMessageUSSstore,TCPFit,TCPWebOnlyFlagUSStore,TCPWebOnlyFlagCanadaStore,TCPSwatchesUSStore,top_rated,TCPSwatchesCanadaStore,product_name,TCPColor,imagename,productid,uniqueId,favoritedcount,TCPBazaarVoiceReviewCount,categoryPath3_fq,categoryPath3,categoryPath3_catMap,categoryPath2_catMap,product_short_description,min_list_price,min_offer_price,TCPBazaarVoiceRating,seo_token,prodpartno,banner,facets,auxdescription,list_of_attributes,numberOfProducts,redirect,searchMetaData,didYouMean,TCPLoyaltyPromotionTextUSStore,TCPLoyaltyPLCCPromotionTextUSStore,TcpBossCategoryDisabled,TcpBossProductDisabled,long_product_title,TCPOutOfStockFlagUSStore,TCPOutOfStockFlagCanadaStore,product_type,products,low_offer_price,high_offer_price,low_list_price,high_list_price',
      },
      webService: endpoints.getProductviewbyCategory, // TODO - existing code - webService: isSearch ? endpoints.getProductsBySearchTerm : endpoints.getProductviewbyCategory
    };
    if (!isSearch) {
      payload.body.pagetype = 'boolean';
      if (categoryId) {
        payload.body['p-id'] = `categoryPathId:"${categoryId}"`;
      }
    }

    // If the current case is of bucketing scenario then we need to send facet as false in L3 call as we will be getting the same in L2 call.
    if (bucketingSeqConfig.bucketingRequired) {
      payload.body.facet = false;
    }
    /* Checking if we need to do bucketing or not. Bucketing is done only for those l2 levels that have a further L3. Only in that secnario we send sort
        paramter otherwise sending sort paramter in all other scenarios break the call */
    if (isNoUnbxdLogic(shouldApplyUnbxdLogic, isUnbxdSequencing)) {
      if (isNoBucketing(bucketingSeqConfig)) {
        payload.body.sort = bucketingSeqConfig.bucketingSeq;
      }
    } else if (isNotSearchAndBucketing(isSearch, bucketingSeqConfig)) {
      payload.body.uc_param = bucketingSeqConfig.bucketingSeq;
    }
    if (isSearch) {
      /* ----- Input is being encoded while entered this is causing an issue with superagent ---- */
      payload.body.q = getqParam(searchTerm);
    }
    if (sort) payload.body.sort = sort;

    return executeUnbxdAPICall(payload)
      .then(res =>
        processResponse(res, {
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
        })
      )
      .catch(err => {
        // if (err && ((err.status >= 400 && err.status <= 404) || err.status === 500) && isClient()) {
        // TODO - handle it - window.location.href = getErrorPagePath(this.apiHelper._configOptions.siteId);
        // }
        this.handleValidationError(err);
        // TODO - handle it - throw this.apiHelper.getFormattedError(err);
      });
  };
}

export default ProductsDynamicAbstractor;
