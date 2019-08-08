/* eslint-disable */
import { executeUnbxdAPICall, executeStatefulAPICall } from '../../handler';
import endpoints from '../../endpoints';
import utils, { isClient } from '../../../utils';
import {
  extractPrioritizedBadge,
  extractAttributeValue,
  attributeListMaker,
  getCategoryId,
  isBopisProduct,
  isBossProduct,
  parseBoolean,
} from './productParser';

const getImgPath = img => {
  return { img };
};

const bindAllClassMethodsToThis = (obj, namePrefix = '', isExclude = false) => {
  const prototype = Object.getPrototypeOf(obj);
  // eslint-disable-next-line
  for (let name of Object.getOwnPropertyNames(prototype)) {
    const descriptor = Object.getOwnPropertyDescriptor(prototype, name);
    const isGetter = descriptor && typeof descriptor.get === 'function';
    if (isGetter) continue;
    if (
      typeof prototype[name] === 'function' && name !== 'constructor' && isExclude
        ? !name.startsWith(namePrefix)
        : name.startsWith(namePrefix)
    ) {
      obj[name] = prototype[name].bind(obj);
    }
  }
};

export const FACETS_FIELD_KEY = {
  color: 'tcpcolor_ufilter',
  size: 'v_tcpsize_ufilter',
  age: 'age_group_ufilter',
  price: 'unbxd_price_range_ufilter',
  sort: 'sort',
  unbxdDisplayName: 'unbxddisplayname',
  aux_color: 'auxdescription_ufilter',
  aux_color_unbxd: 'auxdescription_uFilter',
  l1category: 'l1category',
};

export const FACETS_OPTIONS = {
  lowPriceProducts: '$10 and under',
};

function getProductByColorId(products /* , colorDetails */) {
  /* NOTE: we need to FISH for the product on the page in order to pull its attributes, if its not on page we wont show the swatch
  // If this needs to be changed we can default to somthing but need approval for what
  */
  // return products.find(product => product.prodpartno === colorDetails[0]);
  return products;
}

const isDepartmentPage = (isSearch, breadCrumbs) => {
  return !isSearch && (!breadCrumbs || breadCrumbs.length === 1);
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
      };
};

const getCategory = breadCrumbs => {
  return breadCrumbs && breadCrumbs.length ? breadCrumbs[breadCrumbs.length - 1].displayName : '';
};

const getL1Category = breadCrumbs => {
  return breadCrumbs && breadCrumbs.length ? breadCrumbs[0].displayName : '';
};

const getFacets = facets => {
  return facets && facets.text && facets.text.list;
};

const getFacetsMappingFromAPIData = (
  filterMap,
  getFacetSwatchImgPath,
  numberOfProducts,
  filtersAndSort = []
  // eslint-disable-next-line sonarjs/cognitive-complexity
) => {
  const facet = [];
  if (filterMap && filterMap.values) {
    // eslint-disable-next-line
    filterMap.values.forEach((val, index, data) => {
      const facetType = filterMap.facetName;
      const isShopByColorFilter = facetType === FACETS_FIELD_KEY.aux_color_unbxd;
      /*
       ** By deafult the condition is index % 2 === 0 for all filters/facets(e.g shop by colors, SIZE, gender price).
       ** For filters other than shop by color we need filters basis on the products we have in the result set to achive the same.
       ** we added condition ((data[index + 1] !== numberOfProducts) || filtersAndSort.includes(val)) with index % 2 === 0.
       */
      const condition = isShopByColorFilter
        ? index % 2 === 0
        : index % 2 === 0 && (data[index + 1] !== numberOfProducts || filtersAndSort.includes(val));
      if (condition) {
        let keyValue;
        switch (facetType.toLowerCase()) {
          case FACETS_FIELD_KEY.size:
          case FACETS_FIELD_KEY.age:
            keyValue = data[index].split('_'); // few facets response is prefixed with sequence and underscore delimeter
            facet.push({
              displayName: keyValue && keyValue.length > 1 ? keyValue[1] : data[index],
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
            if (val && val.toLowerCase() === FACETS_OPTIONS.lowPriceProducts) {
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

const getFacetsAPIData = (facets, getFacetSwatchImgPath, numberOfProducts, filtersAndSort) => {
  // eslint-disable-next-line
  facets.sort(function(a, b) {
    // Sort facets on position field value
    // eslint-disable-next-line
    return a.position > b.position ? 1 : b.position > a.position ? -1 : 0;
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

const getUnbxdDisplayName = facets => {
  const facetsName = {};
  facets.forEach(facet => {
    facetsName[facet.facetName] = facet.displayName;
  });
  return facetsName;
};

const getAvailableL3List = facets => {
  return facets && facets.multilevel && facets.multilevel.bucket;
};

/**
 * @function fetchCachedFilterAndCount This is the scenario when the subsequent L3 calls made in bucekting case. In this scenario we need to send back
 *           the filter and count, we cached from the response of page L2 call.
 * @returns {Object} the cached filters and count.
 */

const fetchCachedFilterAndCount = () => {
  const temp = {
    filters: [],
    totalProductsCount: 0,
  };
  // if (this.cachedFilters) {
  // eslint-disable-next-line
  //   temp.filters = this.cachedFilters;
  // }
  if (this.cachedCount) {
    temp.totalProductsCount = this.cachedCount;
  }
  return temp;
};

const isUnbxdFacetKey = key =>
  key.toLowerCase() !== FACETS_FIELD_KEY.unbxdDisplayName &&
  key.toLowerCase() !== FACETS_FIELD_KEY.sort; // method to check is key is mapping is of mapping object

/**
 * @function getAppliedFilters
 * @summary To get the applied filters to pass in the PLP/SRP UI to render
 * @param {object} filters - All filters and values object
 * @param {object} filterIds - selected filters and values object.
 */
const getAppliedFilters = (filters, filterIds) => {
  const appliedFilters = {};
  // eslint-disable-next-line
  for (let facetKey in filterIds) {
    if (isUnbxdFacetKey(facetKey)) {
      // for facets having facetName as key
      appliedFilters[facetKey] = !filters[facetKey]
        ? []
        : filters[facetKey]
            .filter(item => filterIds[facetKey].indexOf(item.id) > -1)
            .map(item => item.id);
    }
  }
  return appliedFilters;
};
/**
 * @function cacheFiltersAndCount DTN:6592, In bucekting scenario we make L2 call first to fetch the facets and the count,
 *           we need to cache them as we wont be asking  for these paramters in subsequent L3 calls.
 * @param {Object} filters The facets of the L2.
 * @param {Array} availableL3InFilter Available l3 in the current L2 which has been clicked.
 * @return {Number} the number of products in an L2.
 */

const cacheFiltersAndCount = (filters, availableL3InFilter) => {
  // eslint-disable-next-line
  // this.cachedFilters = filters;
  let count = 0;
  // We need to add up the count coming in each L3 to show up the number of products in the L2 at the top of the listing.
  availableL3InFilter.map(item => {
    count += item.count;
    return count;
  });
  this.cachedCount = count;
  return count;
};

/**
 * @function setUnbxdId
 * @summary This will set the UNBXD id we get from reponse headers in  UNBXD call.
 */

// const setUnbxdId = id => (this.unbxdId = id);

const getBreadCrumbCatId = breadCrumbs => {
  return breadCrumbs && breadCrumbs.length && breadCrumbs[0].categoryId;
};

const getCategoryPath = firstProduct => {
  return firstProduct.categoryPath2_catMap && firstProduct.categoryPath3_catMap
    ? [...firstProduct.categoryPath2_catMap, ...firstProduct.categoryPath3_catMap]
    : firstProduct.categoryPath2_catMap || firstProduct.categoryPath3_catMap;
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

const getAvailableL3InFilter = availableL3List => {
  return availableL3List && availableL3List.length && (availableL3List[0].values || []);
};

const getCurrentListingId = breadCrumbs => {
  return breadCrumbs && breadCrumbs.length ? breadCrumbs[breadCrumbs.length - 1].urlPathSuffix : '';
};

const searchText = (isSearch, searchTerm) => {
  return isSearch ? searchTerm.trim() : '';
};

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

const returnResponseObj = (
  res,
  {
    availableL3InFilter,
    isSearch,
    searchTerm,
    categoryType,
    breadCrumbs,
    isDepartment,
    isOutfitPage,
    filters,
    filtersAndSort,
    totalProductsCount,
    sort,
    unbxdId,
    entityCategory,
    categoryNameTop,
  }
) => {
  return {
    availableL3InFilter,
    currentListingSearchForText: searchText(isSearch, searchTerm),
    currentListingSeoKey: searchTerm,
    currentListingId: getCurrentListingId(),
    currentListingName: categoryType,
    currentListingDescription:
      breadCrumbs && breadCrumbs.length ? breadCrumbs[breadCrumbs.length - 1].longDescription : '',
    currentListingType:
      breadCrumbs && breadCrumbs.length ? breadCrumbs[breadCrumbs.length - 1].displayName : '', // need to store it because it will be needed to patch the information when getting additional product information
    isDepartment,
    // An L2 can be an outfits page, if so we need to store the 3rd party tag associated with this outfits page
    outfitStyliticsTag: isOutfitPage ? searchTerm : null, // DT-34042: dynamic outfit pages
    filtersMaps: filters,
    appliedFiltersIds: getAppliedFilters(filters, filtersAndSort),
    totalProductsCount,
    productsInCurrCategory: res.body.response.numberOfProducts,
    unbxdId,
    appliedSortId: sort,
    currentNavigationIds: getCurrentNavigationIds(res),
    breadCrumbTrail: breadCrumbs
      ? breadCrumbs.map(crumb => ({
          displayName: crumb.displayName,
          urlPathSuffix: crumb.urlPathSuffix,
        }))
      : [],

    loadedProducts: [],
    searchResultSuggestions: res.body.didYouMean
      ? getSearchResultSuggestions(res.body.didYouMean)
      : null,
    unbxdBanners:
      res.body.banner && Array.isArray(res.body.banner.banners) ? res.body.banner.banners : null,
    entityCategory,
    categoryNameTop,
  };
};

const getListPrice = product => {
  return product.min_list_price === product.min_offer_price
    ? product.min_offer_price
    : product.min_list_price || { value: null }.value || 0;
};

const isGiftCard = product =>
  !!(
    product &&
    (product.style_partno.toLowerCase() === 'giftcardbundle' || product.giftcard === '1')
  );

const getProductInfo = (product, headers, uniqueId) => {
  return {
    generalProductId: product.prodpartno,
    name: product.product_name,
    pdpUrl: `/${apiHelper.configOptions.siteId}/p/${product.seo_token || uniqueId}`,
    shortDescription: product.product_short_description,
    longDescription: product.product_short_description,
    // Meeting with Varun for alignment of this value.
    isGiftCard: isGiftCard(product),
    listPrice: getListPrice(product),
    offerPrice: product.min_offer_price || { value: null }.value || 0,
    ratings: product.TCPBazaarVoiceRating || 0,
    reviewsCount:
      (product.TCPBazaarVoiceReviewCount && parseInt(product.TCPBazaarVoiceReviewCount, 10)) || 0,
    unbxdId: headers && headers['unbxd-request-id'],
    promotionalMessage: product.TCPLoyaltyPromotionTextUSStore || '',
    promotionalPLCCMessage: product.TCPLoyaltyPLCCPromotionTextUSStore || '',
  };
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

const getColorsMap = (
  response,
  { colors, product, isUSStore, attributesNames, categoryType, excludeBadge, bossDisabledFlags }
) => {
  const colorsMap = [];
  if (!!Array.isArray(colors) === true) {
    colors.forEach(color => {
      const colorDetails = color.split('#');
      // the default/selected one is already there
      const swatchOfAvailableProduct = getProductByColorId(response.products /* , colorDetails */);
      if (colorDetails[0] !== product.imagename && swatchOfAvailableProduct !== undefined) {
        colorsMap.push({
          colorProductId: colorDetails[0],
          imageName: colorDetails[0],
          miscInfo: {
            isBopisEligible:
              isBopisProduct(isUSStore, swatchOfAvailableProduct) && !isGiftCard(product),
            isBossEligible: isBossProduct(bossDisabledFlags) && !isGiftCard(product),
            hasOnModelAltImages: parseBoolean(
              extractAttributeValue(swatchOfAvailableProduct, attributesNames.onModelAltImages)
            ),
            badge1: extractPrioritizedBadge(
              swatchOfAvailableProduct,
              attributesNames,
              categoryType,
              excludeBadge
            ),
            badge2: extractAttributeValue(swatchOfAvailableProduct, attributesNames.extendedSize),
            badge3: extractAttributeValue(swatchOfAvailableProduct, attributesNames.merchant),
            listPrice:
              swatchOfAvailableProduct.min_list_price === swatchOfAvailableProduct.min_offer_price
                ? swatchOfAvailableProduct.min_offer_price
                : swatchOfAvailableProduct.min_list_price ||
                  {
                    value: null,
                  }.value ||
                  0,
            offerPrice:
              swatchOfAvailableProduct.min_offer_price ||
              {
                value: null,
              }.value ||
              0,
          },
          color: {
            name: colorDetails[1],
            imagePath: getImgPath(colorDetails[0]).colorSwatch,
          },
        });
      }
    });
  }
  return colorsMap;
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

const getColors = (product, uniqueId, defaultColor) => {
  return apiHelper.configOptions.isUSStore
    ? convertToColorArray(product.TCPSwatchesUSStore, uniqueId, defaultColor)
    : convertToColorArray(product.TCPSwatchesCanadaStore, uniqueId, defaultColor);
};

// const getColorSwatch = product => {
//   return apiHelper.configOptions.isUSStore
//     ? product.TCPSwatchesUSStore
//     : product.TCPSwatchesCanadaStore;
// };

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
    : bucketingSeqConfig.requiredChildren && bucketingSeqConfig.requiredChildren[idx].name;
};

const isCatergoryName = (temp, catMap, bucketingSeqConfig) => {
  return (
    temp &&
    catMap[bucketingSeqConfig.desiredL2] &&
    catMap[bucketingSeqConfig.desiredL2].indexOf(temp) !== -1
  );
};

const getIsBopisEligible = (isBOPIS, product) => {
  return isBOPIS && !isGiftCard(product);
};

const isBossEligible = (/* isBossProduct, */ bossDisabledFlags, product) => {
  return isBossProduct(bossDisabledFlags) && !isGiftCard(product);
};

// function altImageArray(imagename, altImg) {
//   try {
//     const altImges = JSON.parse(altImg);
//     return altImges[imagename].split(',').filter(img => img);
//   } catch (error) {
//     return [];
//   }
// }

// inner function
/* function parseAltImagesForColor(imageBasePath, altImgs) {
  try {
    const altImages = altImageArray(imageBasePath, altImgs);

    return [imageBasePath, ...altImages].map(img => {
      const hasExtension = img.indexOf('.jpg') !== -1; // we currently only support .jpg but we can make this a regex in the future if needed
      // eslint-disable-next-line
      const { productImages } = getImgPath(img, hasExtension);

      // See DTN-155 for image suffex value definitions
      const isOnModalImage = parseInt(img.split('-')[1], 10) > 5; // this is assumming a structure of <alpahnumeric>-<numeric><other (optional)>

      return {
        isOnModalImage,
        iconSizeImageUrl: productImages[125],
        listingSizeImageUrl: productImages[380],
        regularSizeImageUrl: productImages[500],
        bigSizeImageUrl: productImages[900],
        superSizeImageUrl: productImages[900],
      };
    });
  } catch (error) {
    return [];
  }
} */
// We seem to be itterating over all colors and added alt images in this location
const extractExtraImages = () =>
  /* rawColors,
  altImgs,
   getImgPath,  uniqueId,
  defaultColor /* , isGiftCard */
  {
    const colorsImageMap = {};

    // backend send the colors in a very weird format
    try {
      /* if (rawColors && rawColors !== '') {
      // DTN-6314 Gift card pdp page broken
      // handle senario if gift card product_name contains '|' character in it.
      let colors = [];
      if (isGiftCard) {
        colors.push(rawColors);
      } else {
        colors = rawColors.split('|');
      }
      // eslint-disable-next-line
      for (let color of colors) {
        let colorName = color.split('#')[1];
        let imageBasePath = color.split('#')[0];
        if (!colorName) {
          colorName = defaultColor;
          imageBasePath = uniqueId;
        }
        const { productImages } = getImgPath(imageBasePath);

        colorsImageMap[colorName] = {
          basicImageUrl: productImages[500],
          extraImages: parseAltImagesForColor(imageBasePath, altImgs),
        };
      }
    } else {
      const { productImages } = getImgPath(uniqueId);
      colorsImageMap[defaultColor] = {
        basicImageUrl: productImages[500],
        extraImages: parseAltImagesForColor(uniqueId, altImgs),
      };
    } */
    } catch (error) {
      // eslint-disable-next-line
      console.log(error);
    }
    return colorsImageMap;
  };

// response is the constructed one , res is the res.body.response
const processResponse = (
  response,
  res,
  bucketingSeqConfig,
  attributesNames,
  categoryType,
  excludeBadge,
  shouldApplyUnbxdLogic
  // eslint-disable-next-line
) => {
  if (response) {
    const { isUSStore } = apiHelper.configOptions;
    res.products.forEach(product => {
      // Make product list transformation
      // eslint-disable-next-line
      product.list_of_attributes = attributeListMaker(product.list_of_attributes);
      const defaultColor = product.auxdescription ? product.auxdescription : product.TCPColor;
      const { uniqueId } = product;
      const colors = getColors(product, uniqueId, defaultColor);
      // const rawColors = getColorSwatch(product);
      const isBOPIS = isBopisProduct(isUSStore, product);
      const bossDisabledFlags = {
        bossProductDisabled:
          extractAttributeValue(product, getProductAttributes().bossProductDisabled) || 0,
        bossCategoryDisabled:
          extractAttributeValue(product, getProductAttributes().bossCategoryDisabled) || 0,
      };
      const imagesByColor = extractExtraImages();
      /* rawColors,
        product.alt_img,
        /* getImgPath, uniqueId,
        defaultColor */
      let colorsMap = [
        {
          colorProductId: uniqueId,
          imageName: product.imagename,
          miscInfo: {
            isClearance: extractAttributeValue(product, attributesNames.clearance),
            isBopisEligible: getIsBopisEligible(isBOPIS, product),
            isBossEligible: isBossEligible(/* isBossProduct, */ bossDisabledFlags, product),
            badge1: extractPrioritizedBadge(product, attributesNames, categoryType, excludeBadge),
            badge2: extractAttributeValue(product, attributesNames.extendedSize),
            badge3: extractAttributeValue(product, attributesNames.merchant),
            videoUrl: extractAttributeValue(product, attributesNames.videoUrl),
            hasOnModelAltImages: parseBoolean(
              extractAttributeValue(product, attributesNames.onModelAltImages)
            ),
            listPrice: product.min_list_price,
            offerPrice: product.min_offer_price,
          },
          color: {
            name: defaultColor,
            imagePath: getImgPath(product.imagename).colorSwatch,
          },
        },
      ];

      colorsMap = getColorsMap(response, {
        colors,
        product,
        isUSStore,
        attributesNames,
        categoryType,
        excludeBadge,
      });

      let categoryName;
      const childLength = getChildLength(bucketingSeqConfig);
      const catMap = getCatMap(product, bucketingSeqConfig);
      // Check if the current product has a category path attribute which containes the categories it is the part of.
      if (product.categoryPath3) {
        for (let idx = 0; idx < childLength; idx += 1) {
          // DTN-7945: The product can be tagged in two L3's but as now we are triggering mutiple l3 calls in new UNBXD approach
          // The product will get tagged to the first match it finds in its own categoryPath3_fq. but ideally it should match the
          // current l3 for which the products are bieng fetched.
          const requiredL3 = getRequiredL3(shouldApplyUnbxdLogic, bucketingSeqConfig, idx);
          const temp = product.categoryPath3.find(category => category === requiredL3);
          if (isCatergoryName(temp, catMap, bucketingSeqConfig)) {
            categoryName = temp;
          }
          // if category name is found then break the loop.
          if (categoryName) {
            break;
          }
        }
      }

      response.loadedProducts.push({
        productInfo: getProductInfo(product, res.headers),
        miscInfo: {
          rating: parseFloat(product.TCPBazaarVoiceRating) || 0,
          // yet again, we need to dig from multiple sources just to get a simple string value
          categoryName,
        },
        colorsMap,
        imagesByColor,
      });
    });
  }
  return response;
};

class ProductsDynamicAbstractor {
  constructor() {
    const apiHelper = {
      configOptions: {
        isUSStore: true,
        siteId: utils.getSiteId(),
      },
      responseContainsErrors: () => {
        return false;
      },
    };

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

  setUnbxdId = id => (this.unbxdId = id);

  /**
   * @function getUnbxdId
   * @summary This will get the UNBXD id that we got from reponse headers in  UNBXD call.
   */

  getUnbxdId = () => this.unbxdId;

  /**
   * @function getInventoryAndFavoritsCount
   * @summary This API will return invetory count for all sizes/fits of a requested color as well as the amount of users who favorited that color
   * @param {String} colorProductId - This is the Id of the product you want to get, you can get this from the order summary API
   * @example getInventoryAndFavoritsCount("863272").then((res) => {
      {
        favoritesCounter: 3
        inventory: [
          {
            skuId: "866748"
            inventory: "715"
          },
          {
            skuId: "867958"
            inventory: "1010"
          },
          {
            skuId: "868343"
            inventory: "0"
          }
        ]
      }
  })
   */
  getInventoryAndFavoritsCount(colorProductId) {
    let payload = {
      header: {
        productId: colorProductId,
      },
      webService: endpoints.getSKUInventoryandProductCounterDetails,
    };

    return this.apiHelper
      .webServiceCall(payload)
      .then(res => {
        if (this.apiHelper.responseContainsErrors(res)) {
          throw new ServiceResponseError(res);
        }
        let favoritesCounter = res.body.getProductCounter;
        let inventory = res.body.getAllSKUInventoryByProductId;

        return {
          inventory:
            inventory &&
            inventory[0] &&
            inventory[0].response.map(item => ({
              skuId: item.catentryId,
              inventory: parseInt(item.quantity),
            })),
          favoritesCounter:
            parseInt(favoritesCounter && favoritesCounter[0] && favoritesCounter[0].counter) || 0,
        };
      })
      .catch(err => {
        throw this.apiHelper.getFormattedError(err);
      });
  }

  /**
   * @function getProductInfoById
   * @summary This will get product info and all color/sizes for that product
   */
  getProductInfoById(productColorId, getImgPath, breadCrumbs, excludeBage) {
    const productId =
      productColorId.indexOf('-') > -1
        ? productColorId.split('-')[0]
        : productColorId.indexOf('_') > -1
        ? productColorId.split('_')[0]
        : productColorId;
    // eslint-disable-next-line no-param-reassign
    productColorId =
      productColorId.indexOf('-') > -1 ? productColorId.replace('-', '_') : productColorId; // As ProductColorId response has always _ rather than hyphen(-)
    let payload = {
      body: {
        variants: true,
        'variants.count': 100,
        version: 'V2',
        rows: 20,
        pagetype: 'boolean',
        q: productId,
        promotion: false,
        fields:
          'alt_img,style_partno,giftcard,TCPProductIndUSStore,TCPWebOnlyFlagUSStore,TCPWebOnlyFlagCanadaStore,TCPFitMessageUSSstore,TCPFit,product_name,TCPColor,top_rated,imagename,productid,uniqueId,favoritedcount,TCPBazaarVoiceReviewCount,categoryPath3_catMap,categoryPath2_catMap,product_short_description,style_long_description,min_list_price,min_offer_price,TCPBazaarVoiceRating,product_long_description,seo_token,variantCount,prodpartno,variants,v_tcpfit,v_qty,v_tcpsize,style_name,v_item_catentry_id,v_listprice,v_offerprice,v_qty,variantId,auxdescription,list_of_attributes,additional_styles,TCPLoyaltyPromotionTextUSStore,TCPLoyaltyPLCCPromotionTextUSStore,v_variant, low_offer_price, high_offer_price, low_list_price, high_list_price,long_product_title,TCPOutOfStockFlagUSStore,TCPOutOfStockFlagCanadaStore',
      },
      webService: endpoints.getProductInfoById,
    };

    if (productId === 'gift') {
      payload.body.filter = 'giftcard:1';
      payload.body.sort = 'style_sequence asc';
    }

    return this.apiHelper
      .webServiceCall(payload)
      .then(res => {
        if (this.apiHelper.responseContainsErrors(res)) {
          throw new ServiceResponseError(res);
        }
        return this.parseProductFromAPI(
          res.body.response.products,
          productColorId,
          false,
          getImgPath,
          breadCrumbs,
          excludeBage
        );
      })
      .catch(err => {
        if (err && ((err.status >= 400 && err.status <= 404) || err.status === 500) && isClient()) {
          window.location.href = getErrorPagePath(this.apiHelper._configOptions.siteId);
        }
        // throw this.apiHelper.getFormattedError(err);
        console.log(err);
      });
  }

  /**
   * @function filterOutNoneWishlistItems
   * @summary This will return item level info with respect to the current user, like if an item is in the users favorits
   */
  getProductsUserCustomInfo(generalProductIdsList, isPDP) {
    let payload = {
      webService: endpoints.getListofDefaultWishlist,
    };

    return this.apiHelper
      .webServiceCall(payload)
      .then(res => {
        if (this.apiHelper.responseContainsErrors(res)) {
          throw new ServiceResponseError(res);
        }

        let favProductsMap = {};

        if (!res.body) {
          return favProductsMap;
        }

        for (let product of res.body) {
          if (isPDP) {
            favProductsMap[product.productId] = {
              isInDefaultWishlist: product.isInDefaultWishlist,
            };
          } else {
            favProductsMap[product.productPartNumber] = {
              isInDefaultWishlist: product.isInDefaultWishlist,
            };
          }
        }

        return favProductsMap;
      })
      .catch(err => {
        throw this.apiHelper.getFormattedError(err);
      });
  }

  /**
   * @function getSwatchesAndSizes
   * @summary This API will return a map of all colors and their fits/sizes. You give it a colorId and it will get all other colors that the product has
   * @param {String} colorProductId - This is the Id of the product you want to get, you can get this from the order summary API.
   * @return {Array<Object>} This will resolve with an Array of objects each object is a size of a given skuId. each object is a size that hold the quanitty available
   * @example getSwatchesAndSizes("863272").then((res) => {
     console.log(res);
     [
      {
        colorProductId: 863272,
        color: {
          name: 'blue',
          imagePath: 'img url'
        },

        maxAvailable: Number.MAX_VALUE,
        hasFits: false,
        fits: [{
          fitName: undefined  or 'regular' or 'husky',
          maxAvailable: Number.MAX_VALUE,
          sizes: [
                    {
                      maxAvailable: Number.MAX_VALUE
                      skuId:"749224"
                      sizeName:"9-12 M"
                    },
                    {
                      maxAvailable: Number.MAX_VALUE
                      skuId:"749224"
                      sizeName:"12-18 M"
                    }
             ]
          }]
      }
      ]
  })
   */
  getSwatchesAndSizes(colorProductId, imgGenerator) {
    let payload = {
      header: {
        productId: colorProductId,
      },
      webService: endpoints.getSwatchesAndSizeInfo,
    };

    return this.apiHelper
      .webServiceCall(payload)
      .then(res => {
        if (this.apiHelper.responseContainsErrors(res)) {
          throw new ServiceResponseError(res);
        }

        return getRegularItemColorsAndSizes(this.apiHelper, res.body, imgGenerator);
      })
      .catch(err => {
        throw this.apiHelper.getFormattedError(err);
      });
  }

  setShipToHome(orderItemId, orderItemType) {
    let payload = {
      body: {
        orderId: '.',
        orderItem: [
          {
            orderItemId: orderItemId,
          },
        ],
        x_storeLocId: '',
        x_calculationUsage: config.UPDATE_ITEM_IN_CART.X_CALCULATION_USAGE,
        x_isUpdateDescription: config.UPDATE_ITEM_IN_CART.X_UPDATE_DESCRIPTION,
        x_orderitemtype: orderItemType,
        x_updatedItemType: config.ORDER_ITEM_TYPE.ECOM, // target type of Item
      },
      webService: endpoints.setShipToHome,
    };

    return this.apiHelper
      .webServiceCall(payload)
      .then(res => {
        if (this.apiHelper.responseContainsErrors(res)) {
          throw new ServiceResponseError(res);
        } else {
          return { success: true };
        }
      })
      .catch(err => {
        throw this.apiHelper.getFormattedError(err);
      });
  }

  /**
   * @function addItemToCart
   * @param {String} sku - The sku of the eleent to add to the cart
   * @param {Number} quantity - Requested quantity
   * @param {String} wishlistId - The id of the wishlist to which the product belongs to (if identified)
   */
  addItemToCart(sku, quantity, wishlistId) {
    let payload = {
      header: {},
      body: {
        // comment:62132,
        'calculationUsage[]': '-7',
        storeId: this.apiHelper._configOptions.storeId,
        catalogId: this.apiHelper._configOptions.catalogId,
        langId: this.apiHelper._configOptions.langId,
        orderId: '.',
        field2: '0',
        requesttype: 'ajax',
        catEntryId: sku,
        quantity: quantity.toString(),
        externalId: wishlistId,
      },
      webService: endpoints.addProductToCart,
    };

    return this.apiHelper
      .webServiceCall(payload)
      .then(res => {
        if (this.apiHelper.responseContainsErrors(res)) {
          throw new ServiceResponseError(res);
        }
        return {
          orderId: res.body.orderId && res.body.orderId[0],
          orderItemId: res.body.orderItemId && res.body.orderItemId[0],
        };
      })
      .catch(err => {
        throw this.apiHelper.getFormattedError(err);
      });
  }

  /**
   * @function getOutfitProdutsDetails
   * @summary This API is used for outfits. You can pass the URI that will be a list of concated part numbers.
   * vendorColorProductIdsList is a string of dash ('-') separated porduct id's of the outfits vendor
   **/
  getOutfitProdutsDetails(outfitId, vendorColorProductIdsList, getImgPath) {
    let productPartNumbers = vendorColorProductIdsList.split('-');
    let payload = {
      body: {
        variants: true,
        'variants.count': 100,
        version: 'V2',
        pagetype: 'boolean',
        id: productPartNumbers.join(','),
        fields:
          'alt_img,style_partno,giftcard,TCPProductIndUSStore,TCPWebOnlyFlagUSStore,TCPWebOnlyFlagCanadaStore,TCPFitMessageUSSstore,top_rated,TCPFit,product_name,TCPColor,imagename,productid,uniqueId,favoritedcount,TCPBazaarVoiceReviewCount,categoryPath3_catMap,product_short_description,style_long_description,min_list_price,min_offer_price,TCPBazaarVoiceRating,product_long_description,seo_token,variantCount,prodpartno,variants,v_tcpfit,v_qty,v_tcpsize,style_name,v_item_catentry_id,v_listprice,v_offerprice,v_qty,variantId,auxdescription,list_of_attributes,TCPLoyaltyPromotionTextUSStore,TCPLoyaltyPLCCPromotionTextUSStore,TcpBossCategoryDisabled,TcpBossProductDisabled,categoryPath2_catMap',
      },
      webService: endpoints.getProductDetails,
    };

    return this.apiHelper
      .webServiceCall(payload)
      .then(res => {
        if (this.apiHelper.responseContainsErrors(res)) {
          throw new ServiceResponseError(res);
        }

        let orderedProducts = res.body.response.products.sort(
          (prev, next) => prev.requestedOrder - next.requestedOrder
        );
        let outFitProductsArray = [];
        let outfitProductPromises = orderedProducts
          .filter(product => !!product)
          .map((product, index) => {
            return this.parseProductFromAPI(product, product.uniqueId, true, getImgPath).then(
              productAndBreadcrumb => {
                outFitProductsArray[index] = productAndBreadcrumb.product;
                return product;
              }
            );
          });

        return Promise.all(outfitProductPromises).then(() => {
          return {
            outfitId: outfitId,
            outfitImageUrl: `https://stylitics-ampersand-production.sfo2.cdn.digitaloceanspaces.com/collage_images/outfit_collage_image/${outfitId}/original.png`, // As per our vendor this URL will never change and always contain the images
            products: outFitProductsArray,
            unavailableCount: productPartNumbers.length - outFitProductsArray.length,
          };
        });
      })
      .catch(err => {
        throw this.apiHelper.getFormattedError(err);
      });
  }

  isGiftCard = product =>
    !!(
      product &&
      (product.style_partno.toLowerCase() === 'giftcardbundle' || product.giftcard === '1')
    );

  /**
   * @function isBOPISProduct
   * @summary This BOPIS logic is to validate if product/color variant is eligible for BOPIS
   * product is a color variant object of a product.
   **/
  isBOPISProduct(product) {
    const { isUSStore } = this.apiHelper.configOptions;
    let isOnlineOnly;
    if (isUSStore) {
      isOnlineOnly =
        (product.TCPWebOnlyFlagUSStore && parseBoolean(product.TCPWebOnlyFlagUSStore)) || false; //validate if product is online only so it is not BOPIS eligible
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
    let filterQuery = {};
    let query = '';
    const facetKeys = Object.keys(filtersAndSort);
    for (let facetKey of facetKeys) {
      let facetValue = filtersAndSort[facetKey];
      if (isUnbxdFacetKey(facetKey)) {
        if (facetValue && facetValue.length > 0 && facetKey.indexOf('uFilter') > -1) {
          facetValue = facetValue.map(facet => facetKey + `:"${encodeURIComponent(facet)}"`);
          query += facetValue.length > 0 ? (query ? '&filter=' : '') + facetValue.join(' OR ') : '';
        }
      }
    }

    if (query !== '') filterQuery.filter = query;
    return filterQuery;
  };

  /**
   * @function getFacetsMappingFromAPIData
   * @param {Object} filterMap - UNBXD API Response for individual facet
   * @param {Function} getFacetSwatchImgPath - Get Color swatch image for the facet option
   */
  getFacetsMappingFromAPIData = (
    filterMap,
    getFacetSwatchImgPath,
    numberOfProducts,
    filtersAndSort = []
  ) => {
    let facet = [];
    if (filterMap && filterMap.values) {
      filterMap.values.forEach((val, index, data) => {
        const facetType = filterMap.facetName;
        const isShopByColorFilter = facetType === FACETS_FIELD_KEY.aux_color_unbxd;
        /*
         ** By deafult the condition is index % 2 === 0 for all filters/facets(e.g shop by colors, SIZE, gender price).
         ** For filters other than shop by color we need filters basis on the products we have in the result set to achive the same.
         ** we added condition ((data[index + 1] !== numberOfProducts) || filtersAndSort.includes(val)) with index % 2 === 0.
         */
        let condition = isShopByColorFilter
          ? index % 2 === 0
          : index % 2 === 0 &&
            (data[index + 1] !== numberOfProducts || filtersAndSort.includes(val));
        if (condition) {
          let keyValue;
          switch (facetType.toLowerCase()) {
            case FACETS_FIELD_KEY.size:
            case FACETS_FIELD_KEY.age:
              keyValue = data[index].split('_'); //few facets response is prefixed with sequence and underscore delimeter
              facet.push({
                displayName: keyValue && keyValue.length > 1 ? keyValue[1] : data[index],
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
              if (val && val.toLowerCase() === FACETS_OPTIONS.lowPriceProducts) {
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

  /** @function  getFacetNameMapping This function gets the mappinf for facet names
   * @param facets {Object} The factes object obtained from UNBXD call response.
   * @param facetType {String} The factes that we are looking for.
   */
  getFacetNameMapping = (facets, facetType) => {
    let facet = facets && find(facets.text.list, ['facetName', facetType]);
    return facet && facet.facetName;
  };

  getDisplayNameMapping = (facets, facetType) => {
    let facet = facets && find(facets.text.list, ['facetName', facetType]);
    return facet && facet.displayName;
  };

  /**
   * @function getAppliedFilters
   * @summary To get the applied filters to pass in the PLP/SRP UI to render
   * @param {object} filters - All filters and values object
   * @param {object} filterIds - selected filters and values object.
   */
  getAppliedFilters = (filters, filterIds) => {
    let appliedFilters = {};
    for (let facetKey in filterIds) {
      if (isUnbxdFacetKey(facetKey)) {
        //for facets having facetName as key
        appliedFilters[facetKey] = !filters[facetKey]
          ? []
          : filters[facetKey]
              .filter(item => filterIds[facetKey].indexOf(item.id) > -1)
              .map(item => item.id);
      }
    }
    return appliedFilters;
  };

  // Mapping meta infomation for PDP meta tags, title and description
  getProductMetaInformation(product) {
    let payload = {
      body: {
        version: 'V2',
        fields:
          'product_name,seo_token,product_short_description,TCPInventoryFlagUSStore,TCPInventoryFlagCanadaStore,style_name,long_product_title',
        q: product,
      },
      webService: endpoints.getProductsBySearchTerm,
    };
    return this.apiHelper
      .webServiceCall(payload)
      .then(res => {
        if (this.apiHelper.responseContainsErrors(res)) {
          throw new ServiceResponseError(res);
        }
        const response = res.body.response && res.body.response.products[0];
        return response
          ? {
              title: response.long_product_title || response.product_name,
              description: response.long_product_title || response.product_name,
              TCPInventoryFlagUSStore: response.TCPInventoryFlagUSStore,
              TCPInventoryFlagCanadaStore: response.TCPInventoryFlagCanadaStore,
              style_name: response.style_name,
            }
          : {};
      })
      .catch(err => {
        throw this.apiHelper.getFormattedError(err);
      });
  }

  /** @function This function return that category map from the catrgory path of the product bieng iterated on.
   * @param catPath {Array} It is the array of the category path with which the product can be accessed.
   * @return catMap {Object} Map of the category path which with the product can be accessed.
   */
  getCategoryMap = (catPath, l1) => {
    const { length } = catPath;
    let catMap = {};
    for (let idx = 0; idx < length; idx++) {
      let temp = catPath[idx].split('>');
      catMap[temp[1]] = catMap[temp[1]] ? catMap[temp[1]] : [];
      if (temp[0] && l1 && temp[0] === l1) {
        catMap[temp[1]].push(temp[2]);
      }
    }
    return catMap;
  };

  //PLP to PDP then again back to PLP, maintainig autoscroll position by managing state with products count
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
      if (scrollPoint > 0) {
        if (totalProducts <= PRODUCTS_PER_LOAD) {
          sessionStorage.setItem('RESET_SCROLL_CONDITIONS', 1); //Don't auto scroll if items less than standard call
        }
      }
    }
    return unbxdCount;
  };

  /**
   * @function getFacetsAPIData
   * @summary To extract facets from the API and create object to pass
   * @param {object} facets - All filters and values object
   * @param {object} getFacetSwatchImgPath - selected filters and values object.
   */
  getFacetsAPIData(facets, getFacetSwatchImgPath, numberOfProducts, filtersAndSort) {
    facets.sort(function(a, b) {
      //Sort facets on position field value
      return a.position > b.position ? 1 : b.position > a.position ? -1 : 0;
    });
    let filters = {};
    facets.forEach(facet => {
      filters[facet.facetName] = this.getFacetsMappingFromAPIData(
        facet,
        getFacetSwatchImgPath,
        numberOfProducts,
        filtersAndSort[facet.facetName]
      );
    });
    return filters;
  }

  getUnbxdDisplayName = facets => {
    let facetsName = {};
    facets.forEach(facet => {
      facetsName[facet.facetName] = facet.displayName;
    });
    return facetsName;
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
    availableL3InFilter.map(item => (count += item.count));
    this.cachedCount = count;
    return count;
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

    let searchTerm = decodeURIComponent(seoKeywordOrCategoryIdOrSearchTerm);
    let { sort = null } = filtersAndSort;
    const facetsPayload = this.extractFilters(filtersAndSort);
    const isOutfitPage = !isSearch && searchTerm && searchTerm.indexOf('-outfit') > -1;

    // We will be sending the rows to getCategoryListingPage function in the bucketing scenario and we need to send that in UNBXD api.
    // Falsy check has not been placed as i need to send row 0 in L2 call in case of bucketing sequence.
    let row = numberOfProducts !== undefined ? numberOfProducts : this.getSetAPIProductsCount();
    // We will be sending the start to getCategoryListingPage function in the bucketing scenario and we need to send that in UNBXD api.
    // Falsy check has not been placed as i need to send start 0 in L2 call in case of bucketing sequence.
    let start =
      startProductCount !== undefined ? startProductCount : (pageNumber - 1) * PRODUCTS_PER_LOAD; //In UNBXD start is from zero but seo paging starts with 1
    let payload = {
      body: {
        ...facetsPayload,
        ...extraParams,
        start: start,
        rows: row,
        variants: true,
        'variants.count': 0,
        version: 'V2',
        'facet.multiselect': true,
        selectedfacet: true,
        fields:
          'alt_img,style_partno,giftcard,TCPProductIndUSStore,TCPFitMessageUSSstore,TCPFit,TCPWebOnlyFlagUSStore,TCPWebOnlyFlagCanadaStore,TCPSwatchesUSStore,top_rated,TCPSwatchesCanadaStore,product_name,TCPColor,imagename,productid,uniqueId,favoritedcount,TCPBazaarVoiceReviewCount,categoryPath3_fq,categoryPath3,categoryPath3_catMap,categoryPath2_catMap,product_short_description,min_list_price,min_offer_price,TCPBazaarVoiceRating,seo_token,prodpartno,banner,facets,auxdescription,list_of_attributes,numberOfProducts,redirect,searchMetaData,didYouMean,TCPLoyaltyPromotionTextUSStore,TCPLoyaltyPLCCPromotionTextUSStore,TcpBossCategoryDisabled,TcpBossProductDisabled,long_product_title,TCPOutOfStockFlagUSStore,TCPOutOfStockFlagCanadaStore',
      },
      webService: endpoints.getPlpProducts,
      // webService: isSearch ? endpoints.getProductsBySearchTerm : endpoints.getProductviewbyCategory
    };
    if (!isSearch) {
      payload.body[`pagetype`] = 'boolean';
      if (categoryId) {
        payload.body['p-id'] = `categoryPathId:"${categoryId}"`;
        payload.body['uid'] = 'uid-1563946353348-89276';
      }
    }

    // If the current case is of bucketing scenario then we need to send facet as false in L3 call as we will be getting the same in L2 call.
    if (bucketingSeqConfig.bucketingRequired) {
      payload.body['facet'] = false;
    }
    /* Checking if we need to do bucketing or not. Bucketing is done only for those l2 levels that have a further L3. Only in that secnario we send sort
        paramter otherwise sending sort paramter in all other scenarios break the call */
    if (!shouldApplyUnbxdLogic && !isUnbxdSequencing) {
      if (bucketingSeqConfig.bucketingSeq && bucketingSeqConfig.requiredChildren.length) {
        payload.body['sort'] = bucketingSeqConfig.bucketingSeq;
      }
    } else if (!isSearch && bucketingSeqConfig.bucketingSeq) {
      payload.body['uc_param'] = bucketingSeqConfig.bucketingSeq;
    }
    if (isSearch) {
      /* ----- Input is being encoded while entered this is causing an issue with superagent ---- */
      payload.body[`q`] = searchTerm || '*';
    }
    if (sort) payload.body.sort = sort;

    // const payload = {
    //   webService: endpoints.getPlpProducts,
    //   url: '/8870d5f30d9bebafac29a18cd12b801d/childrensplace-com702771523455856/category',
    //   queryString:
    //     'start=0&rows=20&variants=true&variants.count=0&version=V2&facet.multiselect=true&selectedfacet=true&fields=alt_img,style_partno,giftcard,TCPProductIndUSStore,TCPFitMessageUSSstore,TCPFit,TCPWebOnlyFlagUSStore,TCPWebOnlyFlagCanadaStore,TCPSwatchesUSStore,top_rated,TCPSwatchesCanadaStore,product_name,TCPColor,imagename,productid,uniqueId,favoritedcount,TCPBazaarVoiceReviewCount,categoryPath3_fq,categoryPath3,categoryPath3_catMap,categoryPath2_catMap,product_short_description,min_list_price,min_offer_price,TCPBazaarVoiceRating,seo_token,prodpartno,banner,facets,auxdescription,list_of_attributes,numberOfProducts,redirect,searchMetaData,didYouMean,TCPLoyaltyPromotionTextUSStore,TCPLoyaltyPLCCPromotionTextUSStore,TcpBossCategoryDisabled,TcpBossProductDisabled,long_product_title,TCPOutOfStockFlagUSStore,TCPOutOfStockFlagCanadaStore&pagetype=boolean&p-id=categoryPathId:%22484507%3E484508%22&uid=uid-1563946353348-89276',
    // };
    return executeUnbxdAPICall(payload)
      .then(res => {
        const scrollPoint = isClient() ? window.sessionStorage.getItem('SCROLL_POINT') : 0;
        if (scrollPoint) {
          sessionStorage.setItem('SCROLL_EVENT', 1);
        }

        if (this.apiHelper.responseContainsErrors(res)) {
          throw new ServiceResponseError(res);
        }

        if (res.body.redirect && window) {
          location.href = res.body.redirect.value;
        }

        let pendingPromises = [];
        // flags if we are oin an L1 plp. Such plp's have no products, and only show espots and recommendations.
        let isDepartment = !isSearch && (!breadCrumbs || breadCrumbs.length === 1);
        let attributesNames = this.getProductAttributes();
        let categoryType =
          breadCrumbs && breadCrumbs.length ? breadCrumbs[breadCrumbs.length - 1].displayName : '';
        const l1category = breadCrumbs && breadCrumbs.length ? breadCrumbs[0].displayName : '';
        let filters = {};
        //Construct facets from the api response
        const facetsList =
          res.body.facets &&
          res.body.facets.text &&
          res.body.facets.text.list &&
          res.body.facets.text.list;
        if (facetsList) {
          const facets = this.getFacetsAPIData(
            facetsList,
            getFacetSwatchImgPath,
            res.body.response.numberOfProducts,
            filtersAndSort
          );
          const unbxdDisplayName = this.getUnbxdDisplayName(facetsList);
          filters = {
            ...facets,
            unbxdDisplayName: unbxdDisplayName, //Key Value object added for Facets DisplayName and FacetName mapping in UI components
            l1category: l1category,
          };
        }

        //We will get the avaialable l3 list in L2 page call in bucekting scenario.
        const availableL3List =
          res.body.facets && res.body.facets.multilevel && res.body.facets.multilevel.bucket;
        let availableL3InFilter =
          availableL3List && availableL3List.length && (availableL3List[0].values || []);
        let totalProductsCount = 0;
        totalProductsCount = res.body.response.numberOfProducts;

        //This is the scenario when the subsequent L3 calls made in bucekting case. In this scenario we need to send back the filter and count, we cached
        // from the response of page L2 call.
        if (shouldApplyUnbxdLogic && bucketingSeqConfig.bucketingRequired) {
          const temp = this.fetchCachedFilterAndCount();
          filters = temp.filters;
          // eslint-disable-next-line
          temp.filters.l1category = l1category ? l1category : '';
          totalProductsCount = temp.totalProductsCount;
        }

        // This is the case when we need to cache the filter and the count of the number of products in L2. This is a bucketing scenario.
        if (shouldApplyUnbxdLogic && cacheFiltersAndCount) {
          totalProductsCount = this.cacheFiltersAndCount(filters, availableL3InFilter);
        }

        // WHY DO WE NEED THIS??
        let unbxdId = res.headers && res.headers['unbxd-request-id'];
        this.setUnbxdId(unbxdId);

        let entityCategory;
        let categoryNameTop = '';

        // Taking the first product in plp to get the categoryID to be sent to adobe
        if (res.body.response && res.body.response.products.length) {
          const firstProduct = res.body.response.products[0];
          const categoryPath =
            firstProduct.categoryPath2_catMap && firstProduct.categoryPath3_catMap
              ? [...firstProduct.categoryPath2_catMap, ...firstProduct.categoryPath3_catMap]
              : firstProduct.categoryPath2_catMap || firstProduct.categoryPath3_catMap;
          const breadcrumbTopId = breadCrumbs && breadCrumbs.length && breadCrumbs[0].categoryId;
          entityCategory = this.parseCategoryEntity(categoryPath, breadCrumbs);
          categoryNameTop = getCategoryId(categoryPath, breadcrumbTopId);
        }

        let response = {
          availableL3InFilter,
          currentListingSearchForText: isSearch ? searchTerm.trim() : '',
          currentListingSeoKey: searchTerm,
          currentListingId:
            breadCrumbs && breadCrumbs.length
              ? breadCrumbs[breadCrumbs.length - 1].urlPathSuffix
              : '',
          currentListingName: categoryType,
          currentListingDescription:
            breadCrumbs && breadCrumbs.length
              ? breadCrumbs[breadCrumbs.length - 1].longDescription
              : '',
          currentListingType:
            breadCrumbs && breadCrumbs.length
              ? breadCrumbs[breadCrumbs.length - 1].displayName
              : '', // need to store it because it will be needed to patch the information when getting additional product information
          isDepartment: isDepartment,
          // An L2 can be an outfits page, if so we need to store the 3rd party tag associated with this outfits page
          outfitStyliticsTag: isOutfitPage ? searchTerm : null, // DT-34042: dynamic outfit pages
          filtersMaps: filters,
          appliedFiltersIds: this.getAppliedFilters(filters, filtersAndSort),
          totalProductsCount,
          productsInCurrCategory: res.body.response.numberOfProducts,
          unbxdId: unbxdId,
          appliedSortId: sort,
          currentNavigationIds: getCurrentNavigationIds(res),
          breadCrumbTrail: breadCrumbs
            ? breadCrumbs.map(crumb => ({
                displayName: crumb.displayName,
                urlPathSuffix: crumb.urlPathSuffix,
              }))
            : [],

          loadedProducts: [],
          searchResultSuggestions: res.body.didYouMean
            ? getSearchResultSuggestions(res.body.didYouMean)
            : null,
          unbxdBanners:
            res.body.banner && Array.isArray(res.body.banner.banners)
              ? res.body.banner.banners
              : null,
          entityCategory: entityCategory,
          categoryNameTop: categoryNameTop,
        };

        if (res.body.response) {
          let isUSStore = this.apiHelper.configOptions.isUSStore;
          res.body.response.products.forEach(product => {
            // Make product list transformation
            product.list_of_attributes = attributeListMaker(product.list_of_attributes);
            let defaultColor = product.auxdescription ? product.auxdescription : product.TCPColor;
            let { uniqueId } = product;
            let colors = this.apiHelper.configOptions.isUSStore
              ? convertToColorArray(product.TCPSwatchesUSStore, uniqueId, defaultColor)
              : convertToColorArray(product.TCPSwatchesCanadaStore, uniqueId, defaultColor);
            let rawColors = this.apiHelper.configOptions.isUSStore
              ? product.TCPSwatchesUSStore
              : product.TCPSwatchesCanadaStore;
            let isBOPIS = isBopisProduct(isUSStore, product);
            const bossDisabledFlags = {
              bossProductDisabled:
                extractAttributeValue(product, this.getProductAttributes().bossProductDisabled) ||
                0,
              bossCategoryDisabled:
                extractAttributeValue(product, this.getProductAttributes().bossCategoryDisabled) ||
                0,
            };
            let imagesByColor = extractExtraImages(
              rawColors,
              product.alt_img,
              getImgPath,
              uniqueId,
              defaultColor,
              false,
              hasShortImage
            );
            let colorsMap = [
              {
                colorProductId: uniqueId,
                imageName: product.imagename,
                miscInfo: {
                  isClearance: extractAttributeValue(product, attributesNames.clearance),
                  isBopisEligible: isBOPIS && !this.isGiftCard(product),
                  isBossEligible: isBossProduct(bossDisabledFlags) && !this.isGiftCard(product),
                  badge1: extractPrioritizedBadge(
                    product,
                    attributesNames,
                    categoryType,
                    excludeBadge
                  ),
                  badge2: extractAttributeValue(product, attributesNames.extendedSize),
                  badge3: extractAttributeValue(product, attributesNames.merchant),
                  videoUrl: extractAttributeValue(product, attributesNames.videoUrl),
                  hasOnModelAltImages: parseBoolean(
                    extractAttributeValue(product, attributesNames.onModelAltImages)
                  ),
                  listPrice: product.min_list_price,
                  offerPrice: product.min_offer_price,
                  keepAlive: parseBoolean(
                    extractAttributeValue(product, attributesNames.keepAlive)
                  ),
                },
                color: {
                  name: defaultColor,
                  imagePath: getImgPath(product.imagename).colorSwatch,
                },
              },
            ];

            if (!!Array.isArray(colors) === true) {
              colors.forEach(color => {
                let colorDetails = color.split('#');
                // the default/selected one is already there
                const swatchOfAvailableProduct = getProductByColorId(
                  res.body.response.products,
                  colorDetails
                );
                if (
                  colorDetails[0] !== product.imagename &&
                  swatchOfAvailableProduct !== undefined
                ) {
                  colorsMap.push({
                    colorProductId: colorDetails[0],
                    imageName: colorDetails[0],
                    miscInfo: {
                      isBopisEligible:
                        isBopisProduct(isUSStore, swatchOfAvailableProduct) &&
                        !this.isGiftCard(product),
                      isBossEligible: isBossProduct(bossDisabledFlags) && !this.isGiftCard(product),
                      hasOnModelAltImages: parseBoolean(
                        extractAttributeValue(
                          swatchOfAvailableProduct,
                          attributesNames.onModelAltImages
                        )
                      ),
                      badge1: extractPrioritizedBadge(
                        swatchOfAvailableProduct,
                        attributesNames,
                        categoryType,
                        excludeBadge
                      ),
                      badge2: extractAttributeValue(
                        swatchOfAvailableProduct,
                        attributesNames.extendedSize
                      ),
                      badge3: extractAttributeValue(
                        swatchOfAvailableProduct,
                        attributesNames.merchant
                      ),
                      listPrice:
                        swatchOfAvailableProduct.min_list_price ===
                        swatchOfAvailableProduct.min_offer_price
                          ? swatchOfAvailableProduct.min_offer_price
                          : swatchOfAvailableProduct.min_list_price ||
                            {
                              value: null,
                            }.value ||
                            0,
                      offerPrice:
                        swatchOfAvailableProduct.min_offer_price ||
                        {
                          value: null,
                        }.value ||
                        0,
                      keepAlive: parseBoolean(
                        extractAttributeValue(swatchOfAvailableProduct, attributesNames.keepAlive)
                      ),
                    },
                    color: {
                      name: colorDetails[1],
                      imagePath: getImgPath(colorDetails[0]).colorSwatch,
                    },
                  });
                }
              });
            }

            let categoryName;
            let childLength = bucketingSeqConfig.requiredChildren
              ? bucketingSeqConfig.requiredChildren.length
              : 0;
            let catMap =
              product.categoryPath3_fq &&
              this.getCategoryMap(product.categoryPath3_fq, bucketingSeqConfig.desiredl1);
            // Check if the current product has a category path attribute which containes the categories it is the part of.
            if (product.categoryPath3) {
              for (let idx = 0; idx < childLength; idx++) {
                //DTN-7945: The product can be tagged in two L3's but as now we are triggering mutiple l3 calls in new UNBXD approach
                //The product will get tagged to the first match it finds in its own categoryPath3_fq. but ideally it should match the
                //current l3 for which the products are bieng fetched.
                const requiredL3 = shouldApplyUnbxdLogic
                  ? bucketingSeqConfig.desiredL3
                  : bucketingSeqConfig.requiredChildren[idx].name;
                let temp = product.categoryPath3.find(category => category === requiredL3);
                if (
                  temp &&
                  catMap[bucketingSeqConfig.desiredL2] &&
                  catMap[bucketingSeqConfig.desiredL2].indexOf(temp) !== -1
                ) {
                  categoryName = temp;
                }
                // if category name is found then break the loop.
                if (categoryName) {
                  break;
                }
              }
            }

            response.loadedProducts.push({
              productInfo: {
                generalProductId: product.prodpartno,
                name: product.product_name,
                pdpUrl: `/${this.apiHelper.configOptions.siteId}/p/${product.seo_token ||
                  uniqueId}`,
                shortDescription: product.product_short_description,
                longDescription: product.product_short_description,
                // Meeting with Varun for alignment of this value.
                isGiftCard: this.isGiftCard(product),
                listPrice:
                  product.min_list_price === product.min_offer_price
                    ? product.min_offer_price
                    : product.min_list_price || { value: null }.value || 0,
                offerPrice: product.min_offer_price || { value: null }.value || 0,
                ratings: product.TCPBazaarVoiceRating || 0,
                reviewsCount:
                  (product.TCPBazaarVoiceReviewCount &&
                    parseInt(product.TCPBazaarVoiceReviewCount)) ||
                  0,
                unbxdId: res.headers && res.headers['unbxd-request-id'],
                promotionalMessage: product.TCPLoyaltyPromotionTextUSStore || '',
                promotionalPLCCMessage: product.TCPLoyaltyPLCCPromotionTextUSStore || '',
                long_product_title: product.long_product_title || '',
              },

              miscInfo: {
                rating: parseFloat(product.TCPBazaarVoiceRating) || 0,
                // yet again, we need to dig from multiple sources just to get a simple string value
                categoryName: categoryName,
              },
              colorsMap: colorsMap,
              imagesByColor: imagesByColor,
            });
          });
        }

        return Promise.all(pendingPromises).then(() => response);
      })
      .catch(err => {
        if (err && ((err.status >= 400 && err.status <= 404) || err.status === 500) && isClient()) {
          window.location.href = getErrorPagePath(this.apiHelper._configOptions.siteId);
        }
        console.log(err);
        // throw this.apiHelper.getFormattedError(err);
      });
  };

  handleValidationError = e => {
    console.log(e);
  };

  getCategoryListingPage(
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
    hasShortImage
  ) {
    let searchTerm = decodeURIComponent(seoKeywordOrCategoryIdOrSearchTerm);
    let { sort = null } = filtersAndSort;
    const facetsPayload = this.extractFilters(filtersAndSort);
    const isOutfitPage = !isSearch && searchTerm && searchTerm.indexOf('-outfit') > -1;

    // We will be sending the rows to getCategoryListingPage function in the bucketing scenario and we need to send that in UNBXD api.
    // Falsy check has not been placed as i need to send row 0 in L2 call in case of bucketing sequence.
    let row = numberOfProducts !== undefined ? numberOfProducts : this.getSetAPIProductsCount();
    // We will be sending the start to getCategoryListingPage function in the bucketing scenario and we need to send that in UNBXD api.
    // Falsy check has not been placed as i need to send start 0 in L2 call in case of bucketing sequence.
    let start =
      startProductCount !== undefined ? startProductCount : (pageNumber - 1) * PRODUCTS_PER_LOAD; //In UNBXD start is from zero but seo paging starts with 1
    let payload = {
      body: {
        ...facetsPayload,
        ...extraParams,
        start: start,
        rows: row,
        variants: true,
        'variants.count': 0,
        version: 'V2',
        'facet.multiselect': true,
        selectedfacet: true,
        fields:
          'alt_img,style_partno,giftcard,TCPProductIndUSStore,TCPFitMessageUSSstore,TCPFit,TCPWebOnlyFlagUSStore,TCPWebOnlyFlagCanadaStore,TCPSwatchesUSStore,top_rated,TCPSwatchesCanadaStore,product_name,TCPColor,imagename,productid,uniqueId,favoritedcount,TCPBazaarVoiceReviewCount,categoryPath3_fq,categoryPath3,categoryPath3_catMap,categoryPath2_catMap,product_short_description,min_list_price,min_offer_price,TCPBazaarVoiceRating,seo_token,prodpartno,banner,facets,auxdescription,list_of_attributes,numberOfProducts,redirect,searchMetaData,didYouMean,TCPLoyaltyPromotionTextUSStore,TCPLoyaltyPLCCPromotionTextUSStore,TcpBossCategoryDisabled,TcpBossProductDisabled,long_product_title,TCPOutOfStockFlagUSStore,TCPOutOfStockFlagCanadaStore',
      },
      webService: isSearch ? endpoints.getProductsBySearchTerm : endpoints.getProductviewbyCategory,
    };
    if (!isSearch) {
      payload.body[`pagetype`] = 'boolean';
      if (categoryId) {
        payload.body['p-id'] = `categoryPathId:"${categoryId}"`;
      }
    }

    // If the current case is of bucketing scenario then we need to send facet as false in L3 call as we will be getting the same in L2 call.
    if (bucketingSeqConfig.bucketingRequired) {
      payload.body['facet'] = false;
    }
    /* Checking if we need to do bucketing or not. Bucketing is done only for those l2 levels that have a further L3. Only in that secnario we send sort
      paramter otherwise sending sort paramter in all other scenarios break the call */
    if (!shouldApplyUnbxdLogic && !isUnbxdSequencing) {
      if (bucketingSeqConfig.bucketingSeq && bucketingSeqConfig.requiredChildren.length) {
        payload.body['sort'] = bucketingSeqConfig.bucketingSeq;
      }
    } else if (!isSearch && bucketingSeqConfig.bucketingSeq) {
      payload.body['uc_param'] = bucketingSeqConfig.bucketingSeq;
    }
    if (isSearch) {
      /* ----- Input is being encoded while entered this is causing an issue with superagent ---- */
      payload.body[`q`] = searchTerm || '*';
    }
    if (sort) payload.body.sort = sort;
    return this.apiHelper
      .webServiceCall(payload)
      .then(res => {
        const scrollPoint = isClient() ? window.sessionStorage.getItem('SCROLL_POINT') : 0;
        if (scrollPoint) {
          sessionStorage.setItem('SCROLL_EVENT', 1);
        }

        if (this.apiHelper.responseContainsErrors(res)) {
          throw new ServiceResponseError(res);
        }

        if (res.body.redirect && window) {
          location.href = res.body.redirect.value;
        }

        let pendingPromises = [];
        // flags if we are oin an L1 plp. Such plp's have no products, and only show espots and recommendations.
        let isDepartment = !isSearch && (!breadCrumbs || breadCrumbs.length === 1);
        let attributesNames = this.getProductAttributes();
        let categoryType =
          breadCrumbs && breadCrumbs.length ? breadCrumbs[breadCrumbs.length - 1].displayName : '';
        const l1category = breadCrumbs && breadCrumbs.length ? breadCrumbs[0].displayName : '';
        let filters = {};
        //Construct facets from the api response
        const facetsList =
          res.body.facets &&
          res.body.facets.text &&
          res.body.facets.text.list &&
          res.body.facets.text.list;
        if (facetsList) {
          const facets = this.getFacetsAPIData(
            facetsList,
            getFacetSwatchImgPath,
            res.body.response.numberOfProducts,
            filtersAndSort
          );
          const unbxdDisplayName = this.getUnbxdDisplayName(facetsList);
          filters = {
            ...facets,
            unbxdDisplayName: unbxdDisplayName, //Key Value object added for Facets DisplayName and FacetName mapping in UI components
            l1category: l1category,
          };
        }

        //We will get the avaialable l3 list in L2 page call in bucekting scenario.
        const availableL3List =
          res.body.facets && res.body.facets.multilevel && res.body.facets.multilevel.bucket;
        let availableL3InFilter =
          availableL3List && availableL3List.length && (availableL3List[0].values || []);
        let totalProductsCount = 0;
        totalProductsCount = res.body.response.numberOfProducts;

        //This is the scenario when the subsequent L3 calls made in bucekting case. In this scenario we need to send back the filter and count, we cached
        // from the response of page L2 call.
        if (shouldApplyUnbxdLogic && bucketingSeqConfig.bucketingRequired) {
          const temp = this.fetchCachedFilterAndCount();
          filters = temp.filters;
          // eslint-disable-next-line
          temp.filters.l1category = l1category ? l1category : '';
          totalProductsCount = temp.totalProductsCount;
        }

        // This is the case when we need to cache the filter and the count of the number of products in L2. This is a bucketing scenario.
        if (shouldApplyUnbxdLogic && cacheFiltersAndCount) {
          totalProductsCount = this.cacheFiltersAndCount(filters, availableL3InFilter);
        }

        // WHY DO WE NEED THIS??
        let unbxdId = res.headers && res.headers['unbxd-request-id'];
        this.setUnbxdId(unbxdId);

        let entityCategory;
        let categoryNameTop = '';

        // Taking the first product in plp to get the categoryID to be sent to adobe
        if (res.body.response && res.body.response.products.length) {
          const firstProduct = res.body.response.products[0];
          const categoryPath =
            firstProduct.categoryPath2_catMap && firstProduct.categoryPath3_catMap
              ? [...firstProduct.categoryPath2_catMap, ...firstProduct.categoryPath3_catMap]
              : firstProduct.categoryPath2_catMap || firstProduct.categoryPath3_catMap;
          const breadcrumbTopId = breadCrumbs && breadCrumbs.length && breadCrumbs[0].categoryId;
          entityCategory = this.parseCategoryEntity(categoryPath, breadCrumbs);
          categoryNameTop = getCategoryId(categoryPath, breadcrumbTopId);
        }

        let response = {
          availableL3InFilter,
          currentListingSearchForText: isSearch ? searchTerm.trim() : '',
          currentListingSeoKey: searchTerm,
          currentListingId:
            breadCrumbs && breadCrumbs.length
              ? breadCrumbs[breadCrumbs.length - 1].urlPathSuffix
              : '',
          currentListingName: categoryType,
          currentListingDescription:
            breadCrumbs && breadCrumbs.length
              ? breadCrumbs[breadCrumbs.length - 1].longDescription
              : '',
          currentListingType:
            breadCrumbs && breadCrumbs.length
              ? breadCrumbs[breadCrumbs.length - 1].displayName
              : '', // need to store it because it will be needed to patch the information when getting additional product information
          isDepartment: isDepartment,
          // An L2 can be an outfits page, if so we need to store the 3rd party tag associated with this outfits page
          outfitStyliticsTag: isOutfitPage ? searchTerm : null, // DT-34042: dynamic outfit pages
          filtersMaps: filters,
          appliedFiltersIds: this.getAppliedFilters(filters, filtersAndSort),
          totalProductsCount,
          productsInCurrCategory: res.body.response.numberOfProducts,
          unbxdId: unbxdId,
          appliedSortId: sort,
          currentNavigationIds: getCurrentNavigationIds(res),
          breadCrumbTrail: breadCrumbs
            ? breadCrumbs.map(crumb => ({
                displayName: crumb.displayName,
                urlPathSuffix: crumb.urlPathSuffix,
              }))
            : [],

          loadedProducts: [],
          searchResultSuggestions: res.body.didYouMean
            ? getSearchResultSuggestions(res.body.didYouMean)
            : null,
          unbxdBanners:
            res.body.banner && Array.isArray(res.body.banner.banners)
              ? res.body.banner.banners
              : null,
          entityCategory: entityCategory,
          categoryNameTop: categoryNameTop,
        };

        if (res.body.response) {
          let isUSStore = this.apiHelper.configOptions.isUSStore;
          res.body.response.products.forEach(product => {
            // Make product list transformation
            product.list_of_attributes = attributeListMaker(product.list_of_attributes);
            let defaultColor = product.auxdescription ? product.auxdescription : product.TCPColor;
            let { uniqueId } = product;
            let colors = this.apiHelper.configOptions.isUSStore
              ? convertToColorArray(product.TCPSwatchesUSStore, uniqueId, defaultColor)
              : convertToColorArray(product.TCPSwatchesCanadaStore, uniqueId, defaultColor);
            let rawColors = this.apiHelper.configOptions.isUSStore
              ? product.TCPSwatchesUSStore
              : product.TCPSwatchesCanadaStore;
            let isBOPIS = isBopisProduct(isUSStore, product);
            const bossDisabledFlags = {
              bossProductDisabled:
                extractAttributeValue(product, this.getProductAttributes().bossProductDisabled) ||
                0,
              bossCategoryDisabled:
                extractAttributeValue(product, this.getProductAttributes().bossCategoryDisabled) ||
                0,
            };
            let imagesByColor = extractExtraImages(
              rawColors,
              product.alt_img,
              getImgPath,
              uniqueId,
              defaultColor,
              false,
              hasShortImage
            );
            let colorsMap = [
              {
                colorProductId: uniqueId,
                imageName: product.imagename,
                miscInfo: {
                  isClearance: extractAttributeValue(product, attributesNames.clearance),
                  isBopisEligible: isBOPIS && !this.isGiftCard(product),
                  isBossEligible: isBossProduct(bossDisabledFlags) && !this.isGiftCard(product),
                  badge1: extractPrioritizedBadge(
                    product,
                    attributesNames,
                    categoryType,
                    excludeBadge
                  ),
                  badge2: extractAttributeValue(product, attributesNames.extendedSize),
                  badge3: extractAttributeValue(product, attributesNames.merchant),
                  videoUrl: extractAttributeValue(product, attributesNames.videoUrl),
                  hasOnModelAltImages: parseBoolean(
                    extractAttributeValue(product, attributesNames.onModelAltImages)
                  ),
                  listPrice: product.min_list_price,
                  offerPrice: product.min_offer_price,
                  keepAlive: parseBoolean(
                    extractAttributeValue(product, attributesNames.keepAlive)
                  ),
                },
                color: {
                  name: defaultColor,
                  imagePath: getImgPath(product.imagename).colorSwatch,
                },
              },
            ];

            if (!!Array.isArray(colors) === true) {
              colors.forEach(color => {
                let colorDetails = color.split('#');
                // the default/selected one is already there
                const swatchOfAvailableProduct = getProductByColorId(
                  res.body.response.products,
                  colorDetails
                );
                if (
                  colorDetails[0] !== product.imagename &&
                  swatchOfAvailableProduct !== undefined
                ) {
                  colorsMap.push({
                    colorProductId: colorDetails[0],
                    imageName: colorDetails[0],
                    miscInfo: {
                      isBopisEligible:
                        isBopisProduct(isUSStore, swatchOfAvailableProduct) &&
                        !this.isGiftCard(product),
                      isBossEligible: isBossProduct(bossDisabledFlags) && !this.isGiftCard(product),
                      hasOnModelAltImages: parseBoolean(
                        extractAttributeValue(
                          swatchOfAvailableProduct,
                          attributesNames.onModelAltImages
                        )
                      ),
                      badge1: extractPrioritizedBadge(
                        swatchOfAvailableProduct,
                        attributesNames,
                        categoryType,
                        excludeBadge
                      ),
                      badge2: extractAttributeValue(
                        swatchOfAvailableProduct,
                        attributesNames.extendedSize
                      ),
                      badge3: extractAttributeValue(
                        swatchOfAvailableProduct,
                        attributesNames.merchant
                      ),
                      listPrice:
                        swatchOfAvailableProduct.min_list_price ===
                        swatchOfAvailableProduct.min_offer_price
                          ? swatchOfAvailableProduct.min_offer_price
                          : swatchOfAvailableProduct.min_list_price ||
                            {
                              value: null,
                            }.value ||
                            0,
                      offerPrice:
                        swatchOfAvailableProduct.min_offer_price ||
                        {
                          value: null,
                        }.value ||
                        0,
                      keepAlive: parseBoolean(
                        extractAttributeValue(swatchOfAvailableProduct, attributesNames.keepAlive)
                      ),
                    },
                    color: {
                      name: colorDetails[1],
                      imagePath: getImgPath(colorDetails[0]).colorSwatch,
                    },
                  });
                }
              });
            }

            let categoryName;
            let childLength = bucketingSeqConfig.requiredChildren
              ? bucketingSeqConfig.requiredChildren.length
              : 0;
            let catMap =
              product.categoryPath3_fq &&
              this.getCategoryMap(product.categoryPath3_fq, bucketingSeqConfig.desiredl1);
            // Check if the current product has a category path attribute which containes the categories it is the part of.
            if (product.categoryPath3) {
              for (let idx = 0; idx < childLength; idx++) {
                //DTN-7945: The product can be tagged in two L3's but as now we are triggering mutiple l3 calls in new UNBXD approach
                //The product will get tagged to the first match it finds in its own categoryPath3_fq. but ideally it should match the
                //current l3 for which the products are bieng fetched.
                const requiredL3 = shouldApplyUnbxdLogic
                  ? bucketingSeqConfig.desiredL3
                  : bucketingSeqConfig.requiredChildren[idx].name;
                let temp = product.categoryPath3.find(category => category === requiredL3);
                if (
                  temp &&
                  catMap[bucketingSeqConfig.desiredL2] &&
                  catMap[bucketingSeqConfig.desiredL2].indexOf(temp) !== -1
                ) {
                  categoryName = temp;
                }
                // if category name is found then break the loop.
                if (categoryName) {
                  break;
                }
              }
            }

            response.loadedProducts.push({
              productInfo: {
                generalProductId: product.prodpartno,
                name: product.product_name,
                pdpUrl: `/${this.apiHelper.configOptions.siteId}/p/${product.seo_token ||
                  uniqueId}`,
                shortDescription: product.product_short_description,
                longDescription: product.product_short_description,
                // Meeting with Varun for alignment of this value.
                isGiftCard: this.isGiftCard(product),
                listPrice:
                  product.min_list_price === product.min_offer_price
                    ? product.min_offer_price
                    : product.min_list_price || { value: null }.value || 0,
                offerPrice: product.min_offer_price || { value: null }.value || 0,
                ratings: product.TCPBazaarVoiceRating || 0,
                reviewsCount:
                  (product.TCPBazaarVoiceReviewCount &&
                    parseInt(product.TCPBazaarVoiceReviewCount)) ||
                  0,
                unbxdId: res.headers && res.headers['unbxd-request-id'],
                promotionalMessage: product.TCPLoyaltyPromotionTextUSStore || '',
                promotionalPLCCMessage: product.TCPLoyaltyPLCCPromotionTextUSStore || '',
                long_product_title: product.long_product_title || '',
              },

              miscInfo: {
                rating: parseFloat(product.TCPBazaarVoiceRating) || 0,
                // yet again, we need to dig from multiple sources just to get a simple string value
                categoryName: categoryName,
              },
              colorsMap: colorsMap,
              imagesByColor: imagesByColor,
            });
          });
        }

        return Promise.all(pendingPromises).then(() => response);
      })
      .catch(err => {
        if (err && ((err.status >= 400 && err.status <= 404) || err.status === 500) && isClient()) {
          window.location.href = getErrorPagePath(this.apiHelper._configOptions.siteId);
        }
        // throw this.apiHelper.getFormattedError(err);
        console.log(err);
      });
  }

  getProductAttributes() {
    const { isUSStore } = this.apiHelper.configOptions;
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
  }

  getSize = sizeName => {
    let size = sizeName && sizeName.split('_');
    return size && (size.length > 1 ? size[1] : sizeName);
  };

  getNextCrumb = (parent, childId) => {
    let filterByID = parent.filter(item => {
      return item.categoryId === childId;
    });

    return filterByID;
  };

  validateQuantityAvailable = sizes => {
    const index = findIndex(sizes, function(size) {
      return size.maxAvailable !== 0;
    });
    return index > -1 ? Number.MAX_VALUE : 0;
  };

  validateQuantityAvailable = sizes => {
    const index = findIndex(sizes, function(size) {
      return size.maxAvailable !== 0;
    });
    return index > -1 ? Number.MAX_VALUE : 0;
  };

  getTotalQtyAvailable = sizes => sumBy(sizes, 'v_qty');

  getParticularCategory = (pathMap, breadCrumbs) => {
    let strBreadCrumbs;
    let categoryEntity;
    if (breadCrumbs) {
      strBreadCrumbs = breadCrumbs.map(obj => obj.categoryId).join('>');
      categoryEntity =
        strBreadCrumbs.length && pathMap.find(category => category.includes(strBreadCrumbs));
    }
    return categoryEntity;
  };

  parseCategoryEntity = (pathMap, breadCrumbs) => {
    const categoryEntity = this.getParticularCategory(pathMap, breadCrumbs);
    const entities = categoryEntity && categoryEntity.split('|');
    const categoryName = entities && entities[1].split('>');

    return categoryName ? categoryName.slice(0, breadCrumbs.length).join(':') : '';
  };

  parseCategoryId = (pathMap, breadCrumbs) => {
    const L2Category = breadCrumbs.slice(0, 2);
    const breadCategory =
      L2Category.length > 1 ? L2Category.map(value => value.categoryId).join('>') : '';
    let categoryName;

    if (L2Category.length <= 1) {
      const categoryEntity = this.getParticularCategory(pathMap, L2Category);
      const entities = categoryEntity && categoryEntity.split('|');
      categoryName = entities && entities[0].split('>');
    }

    return categoryName ? categoryName.join('>') : breadCategory;
  };

  parseProductFromAPI(
    product,
    colorIdOrSeoKeyword,
    dontFetchExtraImages,
    getImgPath,
    breadCrumbs,
    excludeBage
  ) {
    const baseProduct = product[0] || product; // Getting multiple products as color variants
    const productVariants = (Array.isArray(product) ? product : Array.of(product)) || [];
    const isGiftCard = this.isGiftCard(baseProduct); // TBD: backend to confirm whether partNumber will always be giftCardBundle for gift cards.
    const productAttributes = this.getProductAttributes();
    let hasFit = false;
    let hasInventory = false;
    let alternateSizes;
    let defaultColorAlternateSizes;
    let otherColorAlternateSizes;

    let hasAdditionalStyles = false;
    let imagesByColor = {};
    //const imagesByColor = extractExtraImages(rawColors, baseProduct.alt_img, getImgPath);

    // This color map is used as an intermediary step to help consolidate all sizes under fits
    let colorsFitsMap = {};
    for (let colorVariant of productVariants) {
      let color = getProductColorName(isGiftCard, colorVariant);
      let currentColorFitsSizesMap = {};

      let fitName = '';
      for (let sizeVariant of colorVariant.variants) {
        fitName = (sizeVariant.v_tcpfit && sizeVariant.v_tcpfit.toLowerCase()) || '';
        if (!currentColorFitsSizesMap[fitName]) {
          currentColorFitsSizesMap[fitName] = [];
        }
        if (!hasInventory) {
          hasInventory = sizeVariant.v_qty && sizeVariant.v_qty !== 0 && sizeVariant.v_qty !== '';
        }
        currentColorFitsSizesMap[fitName].push({
          sizeName: this.getSize(sizeVariant.v_tcpsize) || this.getSize(sizeVariant.style_name),
          skuId: sizeVariant.v_item_catentry_id,
          listPrice: parseFloat(sizeVariant.v_listprice) || 0,
          offerPrice: parseFloat(sizeVariant.v_offerprice) || 0,
          maxAvailable: sizeVariant.v_qty,
          variantId: sizeVariant.variantId,
          variantNo: sizeVariant.v_variant,
        });
      }

      if (fitName) {
        hasFit = true;
      }
      let hasDefaultFit = false;
      let sortOptions = {
        regular: 1,
        slim: 2,
        plus: 3,
        husky: 4,
        other: 5,
      };
      let sortedKeys = Object.keys(currentColorFitsSizesMap).sort(
        (a, b) =>
          (sortOptions[a.toLowerCase()] || sortOptions.other) -
          (sortOptions[b.toLowerCase()] || sortOptions.other)
      );
      colorsFitsMap[color] = sortedKeys.map(fitName => {
        let isDefaultFit = fitName.toLowerCase() === 'regular';
        hasDefaultFit = hasDefaultFit || isDefaultFit;

        return {
          fitName: fitName,
          isDefault: isDefaultFit,
          maxAvailable: this.validateQuantityAvailable(currentColorFitsSizesMap[fitName]),
          sizes: convertMultipleSizeSkusToAlternatives(currentColorFitsSizesMap[fitName]),
        };
      });

      if (!hasDefaultFit && colorsFitsMap[color].length) {
        colorsFitsMap[color][0].isDefault = true;
      }

      if (colorVariant.uniqueId === colorIdOrSeoKeyword && colorVariant.additional_styles) {
        defaultColorAlternateSizes = colorVariant.additional_styles;
      }
      if (!hasAdditionalStyles && colorVariant.additional_styles) {
        otherColorAlternateSizes = colorVariant.additional_styles;
        hasAdditionalStyles = true;
      }
    }

    try {
      alternateSizes =
        defaultColorAlternateSizes || otherColorAlternateSizes
          ? JSON.parse(defaultColorAlternateSizes || otherColorAlternateSizes)
          : {};
    } catch (err) {
      alternateSizes = {};
      console.error('API response coming for additional_styles key JSON format is incorrect', err);
    }

    // Generate the colorFitsSizeMap needed for mapping colors to fits/sizes

    let colorFitsSizesMap = productVariants.map(itemColor => {
      let { productImages, colorSwatch } = getImgPath(itemColor.imagename);
      let colorName = getProductColorName(isGiftCard, itemColor);
      let familyName = isGiftCard ? itemColor.product_name : itemColor.TCPColor;
      const categoryColorId =
        itemColor.categoryPath2_catMap && itemColor.categoryPath3_catMap
          ? [...itemColor.categoryPath3_catMap, ...itemColor.categoryPath2_catMap]
          : itemColor.categoryPath3_catMap || itemColor.categoryPath2_catMap;
      const categoryEntity =
        categoryColorId && this.parseCategoryEntity(categoryColorId, breadCrumbs);

      const bossDisabledFlags = {
        bossProductDisabled:
          extractAttributeValue(itemColor, this.getProductAttributes().bossProductDisabled) || 0,
        bossCategoryDisabled:
          extractAttributeValue(itemColor, this.getProductAttributes().bossCategoryDisabled) || 0,
      };
      imagesByColor = {
        ...extractExtraImages(
          `${itemColor.imagename}#${colorName}`,
          itemColor.alt_img,
          getImgPath,
          false,
          false,
          isGiftCard
        ),
        ...imagesByColor,
      };

      return {
        color: {
          name: colorName,
          imagePath: isGiftCard ? productImages[125] : colorSwatch,
          family: familyName,
          // Family name can be different from color name, quickViewStoreView using family name to find the initial value of Quick View Form
        },
        pdpUrl: `/${this.apiHelper.configOptions.siteId}/p/${itemColor.uniqueId}`,
        colorProductId: itemColor.productid,
        colorDisplayId: itemColor.uniqueId, // We need this to display on PDP as well as to send to api for recommendations
        categoryEntity: categoryEntity,
        imageName: itemColor.imagename,
        favoritedCount: itemColor.favoritedcount,
        maxAvailable: this.getTotalQtyAvailable(itemColor.variants) || 0, // No inventory message if it is zero
        hasFits: hasFit,
        miscInfo: {
          isBopisEligible:
            isBopisProduct(this.apiHelper.configOptions.isUSStore, itemColor) &&
            !this.isGiftCard(itemColor),
          isBossEligible: isBossProduct(bossDisabledFlags) && !this.isGiftCard(itemColor),
          badge1: extractPrioritizedBadge(
            getFirstVariant(itemColor),
            productAttributes,
            '',
            excludeBage
          ),
          isClearance: extractAttributeValue(itemColor, this.getProductAttributes().clearance),
          hasOnModelAltImages: extractAttributeValue(
            itemColor,
            this.getProductAttributes().onModelAltImages
          ),
          videoUrl: extractAttributeValue(itemColor, productAttributes.videoUrl),
          keepAlive: parseBoolean(extractAttributeValue(itemColor, productAttributes.keepAlive)),
        },
        fits: colorsFitsMap[colorName],
        listPrice:
          parseFloat(getFirstVariant(itemColor).v_listprice) ||
          parseFloat(getFirstVariant(itemColor).v_offerprice) ||
          0,
        offerPrice: parseFloat(getFirstVariant(itemColor).v_offerprice) || 0,
        unbxdId: this.getUnbxdId(),
      };
    });

    const reviewsCount =
      (baseProduct.TCPBazaarVoiceReviewCount && parseInt(baseProduct.TCPBazaarVoiceReviewCount)) ||
      0;
    const categoryPathMap = baseProduct.categoryPath3_catMap || baseProduct.categoryPath2_catMap;
    const categoryPath =
      baseProduct.categoryPath2_catMap && baseProduct.categoryPath2_catMap[0].split('|')[0];
    const categoryId =
      breadCrumbs && breadCrumbs.length && breadCrumbs[0].categoryId
        ? this.parseCategoryId(baseProduct.categoryPath2_catMap, breadCrumbs)
        : categoryPath;

    let pendingPromises = [];
    return Promise.all(pendingPromises)
      .then(() => ({
        breadCrumbTrail: [],
        rawBreadCrumb:
          categoryPathMap && categoryPathMap.length > 0 ? categoryPathMap[0].split('|')[0] : '',
        product: {
          // generalProductId = color with matching seo OR colorIdOrSeoKeyword is its a number OR default to first color's ID (To Support Outfits)
          ratingsProductId: baseProduct.style_partno,
          // generalProductId = color with matching seo OR colorIdOrSeoKeyword is its a number OR default to first color's ID (To Support Outfits)
          generalProductId:
            colorIdOrSeoKeyword ||
            ((colorFitsSizesMap[0] && colorFitsSizesMap[0].productid) || baseProduct.productid),
          categoryId: categoryId || '',
          name: isGiftCard ? 'Gift Card' : baseProduct.product_name,
          pdpUrl: `/${this.apiHelper.configOptions.siteId}/p/${colorIdOrSeoKeyword}`,
          shortDescription: baseProduct.product_short_description,
          longDescription: baseProduct.style_long_description,
          imagesByColor: imagesByColor,
          colorFitsSizesMap: colorFitsSizesMap,
          isGiftCard: isGiftCard,
          colorFitSizeDisplayNames: isGiftCard
            ? { color: 'Design', size: 'Value (USD)', size_alt: 'Value' }
            : null,
          listPrice:
            parseFloat(baseProduct.min_list_price) || parseFloat(baseProduct.min_offer_price) || 0,
          offerPrice: parseFloat(baseProduct.min_offer_price) || 0,
          highListPrice: parseFloat(baseProduct.high_list_price) || 0,
          highOfferPrice: parseFloat(baseProduct.high_offer_price) || 0,
          lowListPrice: parseFloat(baseProduct.low_list_price) || 0,
          lowOfferPrice: parseFloat(baseProduct.low_offer_price) || 0,
          ratings: isGiftCard ? 0 : baseProduct.TCPBazaarVoiceRating || 0,
          reviewsCount: isGiftCard ? 0 : reviewsCount,
          unbxdId: this.getUnbxdId(),
          unbxdProdId: baseProduct.uniqueId,
          alternateSizes,
          productId: baseProduct.uniqueId,
          promotionalMessage: baseProduct.TCPLoyaltyPromotionTextUSStore || '',
          promotionalPLCCMessage: baseProduct.TCPLoyaltyPLCCPromotionTextUSStore || '',
          long_product_title: baseProduct.long_product_title || '',
        },
      }))
      .catch(err => {
        throw err;
      });
  }

  /**
   * @function getMultipleInventoryAndFavoritsCount
   * @param {String<array>} generalProductIdsList
   * @summary This function accepts an array of product Ids and will return an object indexed by those ids holding inventory and favorit informaiton
   */
  getMultipleInventoryAndFavoritsCount(generalProductIdsList) {
    let payload = {
      header: {},
      body: {
        productId: generalProductIdsList,
      },
      webService: endpoints.getInventoryForOutfits,
    };

    return this.apiHelper
      .webServiceCall(payload)
      .then(res => {
        if (this.apiHelper.responseContainsErrors(res)) {
          throw new ServiceResponseError(res);
        }

        let rawProductArray = res.body;
        let productMap = {};

        for (let productObject of rawProductArray) {
          let productId = Object.keys(productObject)[0];
          let rawProductInfo = productObject[productId];
          let favCounter = rawProductInfo.getProductCounter;

          productMap[productId] = {
            // isInDefaultWishlist: rawProductInfo.isInDefaultWishlist, // Need to engadge another service for this
            favoritesCounter:
              parseInt(
                favCounter && (favCounter.counter || (favCounter[0] && favCounter[0].counter))
              ) || 0,
            inventory: rawProductInfo.getAllSKUInventoryByProductId.response.map(inventory => ({
              skuId: inventory.catentryId,
              inventory: parseInt(inventory.quantity),
            })),
          };
        }

        return productMap;
      })
      .catch(err => {
        throw this.apiHelper.getFormattedError(err);
      });
  }
}

export default ProductsDynamicAbstractor;
