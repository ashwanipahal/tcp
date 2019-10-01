import logger from '@tcp/core/src/utils/loggerInstance';
import { executeUnbxdAPICall } from '../../handler';

import endpoints from '../../endpoints';
import utils, { bindAllClassMethodsToThis, isMobileApp } from '../../../utils';
import processHelpers from './processHelpers';
import { PRODUCTS_PER_LOAD } from '../../../components/features/browse/ProductListing/container/ProductListing.constants';
import processResponse from './processResponse';

const apiHelper = {
  configOptions: {
    isUSStore: true,
    siteId: utils.getSiteId(),
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
  return (
    bucketingSeqConfig &&
    bucketingSeqConfig.bucketingSeq &&
    bucketingSeqConfig.requiredChildren.length
  );
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
        facetValue = facetValue.map(facet => {
          const encodedFacet = isMobileApp() ? facet : encodeURIComponent(facet);
          return `${facetKey}:"${encodedFacet}"`;
        });
        query += facetValue.length > 0 ? (query ? '&filter=' : '') + facetValue.join(' OR ') : '';
      }
    });

    if (query !== '') filterQuery.filter = query;
    return filterQuery;
  };

  // PLP to PDP then again back to PLP, maintainig autoscroll position by managing state with products count
  getSetAPIProductsCount = () => {
    // if totalProducts are greater than PRODUCTS_PER_LOAD limit it to PRODUCTS_PER_LOAD and update sessionStorage for auto scroll
    return PRODUCTS_PER_LOAD;
    // TODO - fix this function when caching is required for navigating back from PDP
  };

  /**
   * @function cacheFiltersAndCount DTN:6592, In bucekting scenario we make L2 call first to fetch the facets and the count,
   *           we need to cache them as we wont be asking  for these paramters in subsequent L3 calls.
   * @param {Object} filters The facets of the L2.
   * @param {Array} availableL3InFilter Available l3 in the current L2 which has been clicked.
   * @return {Number} the number of products in an L2.
   */

  cacheFiltersAndCount = () => {
    // TODO - fix this function when required to navigate back from PDP
  };

  handleValidationError = e => {
    logger.error(e);
  };

  getPlpOrSlpEndpoint = isSearch => {
    return isSearch ? endpoints.getProductsBySearchTerm : endpoints.getProductviewbyCategory;
  };

  getProducts = (reqObj, state) => {
    const {
      seoKeywordOrCategoryIdOrSearchTerm,
      isSearch,
      filtersAndSort = {},
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
          'alt_img,style_partno,giftcard,TCPProductIndUSStore,TCPFitMessageUSSstore,TCPFit,TCPWebOnlyFlagUSStore,TCPWebOnlyFlagCanadaStore,TCPSwatchesUSStore,top_rated,TCPSwatchesCanadaStore,product_name,TCPColor,imagename,productid,uniqueId,favoritedcount,TCPBazaarVoiceReviewCount,categoryPath3_fq,categoryPath3,categoryPath3_catMap,categoryPath2_catMap,product_short_description,min_list_price,min_offer_price,TCPBazaarVoiceRating,seo_token,prodpartno,banner,facets,auxdescription,list_of_attributes,numberOfProducts,redirect,searchMetaData,didYouMean,TCPLoyaltyPromotionTextUSStore,TCPLoyaltyPLCCPromotionTextUSStore,TcpBossCategoryDisabled,TcpBossProductDisabled,long_product_title,TCPOutOfStockFlagUSStore,TCPOutOfStockFlagCanadaStore,product_type,products,low_offer_price, high_offer_price, low_list_price, high_list_price',
      },
      webService: this.getPlpOrSlpEndpoint(isSearch),
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
        processResponse(res, state, {
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
          filterSortView: Object.keys(filtersAndSort).length > 0,
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
