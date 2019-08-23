import { FACETS_FIELD_KEY, FACETS_OPTIONS } from './productListing.utils';
import utils from '../../../utils';

const apiHelper = {
  configOptions: {
    isUSStore: true,
    siteId: utils.getSiteId(),
  },
  responseContainsErrors: () => {
    return false;
  },
};
/** @function This function return that category map from the catrgory path of the product bieng iterated on.
 * @param catPath {Array} It is the array of the category path with which the product can be accessed.
 * @return catMap {Object} Map of the category path which with the product can be accessed.
 */
const getCategoryMap = (catPath, l1) => {
  const { length } = catPath;
  const catMap = {};
  for (let idx = 0; idx < length; idx += 1) {
    const temp = catPath[idx].split('>');
    catMap[temp[1]] = catMap[temp[1]] ? catMap[temp[1]] : [];
    if (temp[0] && l1 && temp[0] === l1) {
      catMap[temp[1]].push(temp[2]);
    }
  }
  return catMap;
};
const isGiftCard = product =>
  !!(
    product &&
    (product.style_partno.toLowerCase() === 'giftcardbundle' || product.giftcard === '1')
  );

const getProductByColorId = (products, colorDetails) => {
  /* NOTE: we need to FISH for the product on the page in order to pull its attributes, if its not on page we wont show the swatch
  // If this needs to be changed we can default to somthing but need approval for what
  */
  return products.find(product => product.prodpartno === colorDetails[0]) || {};
};
const isUnbxdFacetKey = key =>
  key.toLowerCase() !== FACETS_FIELD_KEY.unbxdDisplayName &&
  key.toLowerCase() !== FACETS_FIELD_KEY.sort; // method to check is key is mapping is of mapping object

const getCurrentNavigationIds = response => {
  try {
    return response.body.searchMetaData.queryParams['p-id']
      .replace(/"/g, '')
      .split(':')[1]
      .split('>');
  } catch (error) {
    return [];
  }
};
const getSearchResultSuggestions = listOfSuggestions => {
  // We want the top two frequencies only
  const suggestionArray =
    listOfSuggestions.length > 2 ? listOfSuggestions.slice(0, 2) : listOfSuggestions;
  return suggestionArray.map(el => ({ suggestion: el.suggestion }));
};
/* -------------- This function will remove the duplicate swatch for the product ------  */
function colorSwatchFilter(colorSwatchesArray, id, color) {
  return colorSwatchesArray.filter(el => {
    const duplicateSwatch = `${id}#${color}`;
    return el !== duplicateSwatch;
  });
}
function convertToColorArray(colorSwatches, id, color) {
  if (!colorSwatches) return [];
  return colorSwatches === 'ImagePath'
    ? colorSwatches
    : colorSwatchFilter(colorSwatches.split('|'), id, color);
}
/**
 * @function getAppliedFilters
 * @summary To get the applied filters to pass in the PLP/SRP UI to render
 * @param {object} filters - All filters and values object
 * @param {object} filterIds - selected filters and values object.
 */
const getAppliedFilters = (filters, filterIds) => {
  const appliedFilters = {};
  const facetKeys = Object.keys(filterIds);
  facetKeys.forEach(facetKey => {
    if (isUnbxdFacetKey(facetKey)) {
      // for facets having facetName as key
      appliedFilters[facetKey] = !filters[facetKey]
        ? []
        : filters[facetKey]
            .filter(item => filterIds[facetKey].indexOf(item.id) > -1)
            .map(item => item.id);
    }
  });
  return appliedFilters;
};
const getParticularCategory = (pathMap, breadCrumbs) => {
  let strBreadCrumbs;
  let categoryEntity;
  if (breadCrumbs) {
    strBreadCrumbs = breadCrumbs.map(obj => obj.categoryId).join('>');
    categoryEntity =
      strBreadCrumbs.length && pathMap.find(category => category.includes(strBreadCrumbs));
  }
  return categoryEntity;
};
const parseCategoryEntity = (pathMap, breadCrumbs) => {
  const categoryEntity = getParticularCategory(pathMap, breadCrumbs);
  const entities = categoryEntity && categoryEntity.split('|');
  const categoryName = entities && entities[1].split('>');

  return categoryName ? categoryName.slice(0, breadCrumbs.length).join(':') : '';
};
const getProductAttributes = () => {
  const { isUSStore } = apiHelper.configOptions;
  return isUSStore
    ? {
        merchant: 'TCPMerchantTagUSStore',
        sizes: 'TCPSizeUSStore',
        swatches: 'TCPSwatchesUSStore',
        onlineOnly: 'TCPWebOnlyFlagUSStore',
        clearance: 'TCPProductIndUSStore',
        inventory: 'TCPInventoryFlagUSStore',
        glowInTheDark: 'TCPGlowInDarkUSStore',
        limitedQuantity: 'TCPInventoryMessageUSStore',
        extendedSize: 'TCPFitMessageUSStore',
        onModelAltImages: 'TCPMarketingText1USStore',
        bossProductDisabled: 'TcpBossProductDisabled',
        bossCategoryDisabled: 'TcpBossCategoryDisabled',
        videoUrl: 'TCPMarketingText2USStore',
        matchingCategory: 'TCPProductFlagUSStore',
        matchingFamily: 'TCPMatchingFamilyUSStore',
        keepAlive: 'TCPOutOfStockFlagUSStore',
      }
    : {
        merchant: 'TCPMerchantTagCanadaStore',
        sizes: 'TCPSizeCanadaStore',
        swatches: 'TCPSwatchesCanadaStore',
        onlineOnly: 'TCPWebOnlyFlagCanadaStore',
        clearance: 'TCPProductIndCanadaStore',
        inventory: 'TCPInventoryFlagCanadaStore',
        glowInTheDark: 'TCPGlowInDarkUCanadaStore',
        limitedQuantity: 'TCPInventoryMessageCanadaStore',
        extendedSize: 'TCPFitMessageCanadaStore',
        onModelAltImages: 'TCPMarketingText1CanadaStore',
        videoUrl: 'TCPMarketingText2CanadaStore',
        matchingCategory: 'TCPProductFlagCAStore',
        matchingFamily: 'TCPMatchingFamilyCAStore',
        keepAlive: 'TCPOutOfStockFlagCanadaStore',
      };
};
const indexBasedOnShopByColor = (
  isShopByColorFilter,
  index,
  data,
  numberOfProducts,
  filtersAndSort,
  val
) => {
  return isShopByColorFilter
    ? index % 2 === 0
    : index % 2 === 0 && (data[index + 1] !== numberOfProducts || filtersAndSort.includes(val));
};
const isLowPriceProduct = val => {
  return val && val.toLowerCase() === FACETS_OPTIONS.lowPriceProducts;
};
const getDisplayName = (keyValue, data, index) => {
  return keyValue && keyValue.length > 1 ? keyValue[1] : data[index];
};
/**
 * @function getFacetsMappingFromAPIData
 * @param {Object} filterMap - UNBXD API Response for individual facet
 * @param {Function} getFacetSwatchImgPath - Get Color swatch image for the facet option
 */
const getFacetsMappingFromAPIData = (
  filterMap,
  getFacetSwatchImgPath,
  numberOfProducts,
  filtersAndSort = []
) => {
  const facet = [];
  if (filterMap && filterMap.values) {
    filterMap.values.forEach((val, index, data) => {
      const facetType = filterMap.facetName;
      const isShopByColorFilter = facetType === FACETS_FIELD_KEY.aux_color_unbxd;
      /*
       ** By deafult the condition is index % 2 === 0 for all filters/facets(e.g shop by colors, SIZE, gender price).
       ** For filters other than shop by color we need filters basis on the products we have in the result set to achive the same.
       ** we added condition ((data[index + 1] !== numberOfProducts) || filtersAndSort.includes(val)) with index % 2 === 0.
       */
      const condition = indexBasedOnShopByColor(
        isShopByColorFilter,
        index,
        data,
        numberOfProducts,
        filtersAndSort,
        val
      );
      if (condition) {
        let keyValue;
        switch (facetType.toLowerCase()) {
          case FACETS_FIELD_KEY.size:
          case FACETS_FIELD_KEY.age:
            keyValue = data[index].split('_'); // few facets response is prefixed with sequence and underscore delimeter
            facet.push({
              displayName: getDisplayName(keyValue, data, index),
              id: data[index],
              facetName: facetType,
            });
            break;
          case FACETS_FIELD_KEY.color:
            facet.push({
              displayName: data[index],
              id: data[index],
              imagePath: getFacetSwatchImgPath(data[index]),
              facetName: facetType,
            });
            break;
          case FACETS_FIELD_KEY.aux_color:
            facet.push({
              displayName: data[index],
              id: data[index],
              imagePath: getFacetSwatchImgPath(data[index].replace(/ /g, '_').toLowerCase()),
              facetName: facetType,
            });
            break;
          case FACETS_FIELD_KEY.price:
            keyValue = {
              displayName: val,
              id: val,
              facetName: facetType,
            };
            if (isLowPriceProduct(val)) {
              facet.unshift(keyValue);
            } else {
              facet.push(keyValue);
            }
            break;
          default:
            facet.push({
              displayName: data[index],
              id: data[index],
              facetName: facetType,
            });
        }
      }
    });
  }
  return facet;
};

const getUnbxdDisplayName = facets => {
  const facetsName = {};
  facets.forEach(facet => {
    facetsName[facet.facetName] = facet.displayName;
  });
  return facetsName;
};

/**
 * @function getFacetsAPIData
 * @summary To extract facets from the API and create object to pass
 * @param {object} facets - All filters and values object
 * @param {object} getFacetSwatchImgPath - selected filters and values object.
 */
const getFacetsAPIData = (facets, getFacetSwatchImgPath, numberOfProducts, filtersAndSort) => {
  facets.sort((a, b) => {
    // Sort facets on position field value
    const pos = b.position > a.position ? -1 : 0;
    return a.position > b.position ? 1 : pos;
  });
  const filters = {};
  facets.forEach(facet => {
    filters[facet.facetName] = getFacetsMappingFromAPIData(
      facet,
      getFacetSwatchImgPath,
      numberOfProducts,
      filtersAndSort[facet.facetName]
    );
  });
  return filters;
};

const getCategoryPath = firstProduct => {
  return firstProduct.categoryPath2_catMap && firstProduct.categoryPath3_catMap
    ? [...firstProduct.categoryPath2_catMap, ...firstProduct.categoryPath3_catMap]
    : firstProduct.categoryPath2_catMap || firstProduct.categoryPath3_catMap;
};

const hasProductsInResponse = response => {
  return response && response.products.length;
};

const getBreadcrumbTopId = breadCrumbs => {
  return breadCrumbs && breadCrumbs.length && breadCrumbs[0].categoryId;
};

const getCurrentListingSearchForText = (isSearch, searchTerm) => {
  return isSearch ? searchTerm.trim() : '';
};

const getDefaultColor = product => {
  return product.auxdescription ? product.auxdescription : product.TCPColor;
};

const getRawColors = (isUSStore, product) => {
  return isUSStore ? product.TCPSwatchesUSStore : product.TCPSwatchesCanadaStore;
};

const getUnbxdBanners = banner => {
  return banner && Array.isArray(banner.banners) ? banner.banners : null;
};

const getSearchResultsSuggestion = didYouMean => {
  return didYouMean ? getSearchResultSuggestions(didYouMean) : null;
};

const getBreadCrumbTrail = breadCrumbs => {
  return breadCrumbs
    ? breadCrumbs.map(crumb => ({
        displayName: crumb.displayName,
        urlPathSuffix: crumb.urlPathSuffix,
      }))
    : [];
};

const getOfferPrice = swatchOfAvailableProduct => {
  return (
    swatchOfAvailableProduct.min_offer_price ||
    {
      value: null,
    }.value ||
    0
  );
};

const getColors = (isUSStore, product, uniqueId, defaultColor) => {
  return isUSStore
    ? convertToColorArray(product.TCPSwatchesUSStore, uniqueId, defaultColor)
    : convertToColorArray(product.TCPSwatchesCanadaStore, uniqueId, defaultColor);
};
const getChildLength = bucketingSeqConfig => {
  return bucketingSeqConfig.requiredChildren ? bucketingSeqConfig.requiredChildren.length : 0;
};
const getCatMap = (product, bucketingSeqConfig) => {
  return (
    product.categoryPath3_fq &&
    getCategoryMap(product.categoryPath3_fq, bucketingSeqConfig.desiredl1)
  );
};
const getRequiredL3 = (shouldApplyUnbxdLogic, bucketingSeqConfig, idx) => {
  return shouldApplyUnbxdLogic
    ? bucketingSeqConfig.desiredL3
    : bucketingSeqConfig.requiredChildren[idx].name;
};
const getListPriceResponse = product => {
  return product.min_list_price === product.min_offer_price
    ? product.min_offer_price
    : product.min_list_price || { value: null }.value || 0;
};
const getOfferPriceResponse = product => {
  return product.min_offer_price || { value: null }.value || 0;
};

const processHelpers = {
  getCategoryMap,
  isGiftCard,
  getProductByColorId,
  isUnbxdFacetKey,
  getCurrentNavigationIds,
  getSearchResultSuggestions,
  convertToColorArray,
  getAppliedFilters,
  getParticularCategory,
  parseCategoryEntity,
  getProductAttributes,
  getFacetsMappingFromAPIData,
  getUnbxdDisplayName,
  getFacetsAPIData,
  getCategoryPath,
  hasProductsInResponse,
  getBreadcrumbTopId,
  getCurrentListingSearchForText,
  getSearchResultsSuggestion,
  getBreadCrumbTrail,
  getUnbxdBanners,
  getRawColors,
  getDefaultColor,
  getOfferPrice,
  getColors,
  getChildLength,
  getCatMap,
  getRequiredL3,
  getListPriceResponse,
  getOfferPriceResponse,
};
export default processHelpers;
