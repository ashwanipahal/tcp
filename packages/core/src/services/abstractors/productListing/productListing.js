/* eslint-disable max-lines */
/* eslint-disable sonarjs/no-duplicate-string */
import mock from './mock';
import { executeUnbxdAPICall, executeStatefulAPICall } from '../../handler';
import endpoints from '../../endpoints';
import utils from '../../../utils';
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

const apiHelper = {
  configOptions: {
    isUSStore: true,
    siteId: utils.getSiteId(),
  },
  responseContainsErrors: () => {
    return false;
  },
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

/**
 * Abstractor layer for loading data from API for product listing
 */
class ProductsDynamicAbstractor {
  constructor() {
    this.processUnbxdData = this.processUnbxdData.bind(this);
    this.handleValidationError = this.handleValidationError.bind(this);
  }

  processUnbxdData = res => {
    const breadCrumbs = '';
    const getFacetSwatchImgPath = () => {};
    const filtersAndSort = [];
    const shouldApplyUnbxdLogic = false;
    const bucketingSeqConfig = {};
    const isSearch = false;
    const searchTerm = '';
    const isOutfitPage = false;
    const sort = [];
    const unbxdId = '';
    const excludeBadge = [];
    // Scroll point
    // const scrollPoint = isClient() ? window.sessionStorage.getItem('SCROLL_POINT') : 0;
    // if (scrollPoint) {
    // eslint-disable-next-line
    //   sessionStorage.setItem('SCROLL_EVENT', 1);
    // }
    // Handle error
    if (apiHelper.responseContainsErrors(res)) {
      // eslint-disable-next-line
      // throw new ServiceResponseError(res);
    }
    // If response says redirect, redirect to a particular URL
    if (res.body.redirect /* && window */) {
      // eslint-disable-next-line
      location.href = res.body.redirect.value;
    }

    const pendingPromises = [];
    // flags if we are oin an L1 plp. Such plp's have no products, and only show espots and recommendations.
    const isDepartment = isDepartmentPage();
    const attributesNames = getProductAttributes();

    const categoryType = getCategory(breadCrumbs);
    const l1category = getL1Category(breadCrumbs);
    let filters = {};

    // Construct facets from the api response
    const facetsList = getFacets(res.body.facets);
    if (facetsList) {
      const facets = getFacetsAPIData(
        facetsList,
        getFacetSwatchImgPath,
        res.body.response.numberOfProducts,
        filtersAndSort
      );
      const unbxdDisplayName = getUnbxdDisplayName(facetsList);
      filters = {
        ...facets,
        unbxdDisplayName, // Key Value object added for Facets DisplayName and FacetName mapping in UI components
        l1category,
      };
    }

    // We will get the avaialable l3 list in L2 page call in bucekting scenario.
    const availableL3List = getAvailableL3List(res.body.facets);
    const availableL3InFilter = getAvailableL3InFilter(availableL3List);
    let totalProductsCount = res.body.response.numberOfProducts || 0;

    // This is the scenario when the subsequent L3 calls made in bucekting case. In this scenario we need to send back the filter and count, we cached
    // from the response of page L2 call.
    if (shouldApplyUnbxdLogic && bucketingSeqConfig.bucketingRequired) {
      const temp = fetchCachedFilterAndCount();
      // eslint-disable-next-line
      filters = temp.filters;
      temp.filters.l1category = l1category;
      // eslint-disable-next-line
      totalProductsCount = temp.totalProductsCount;
    }

    // This is the case when we need to cache the filter and the count of the number of products in L2. This is a bucketing scenario.
    if (shouldApplyUnbxdLogic && cacheFiltersAndCount) {
      totalProductsCount = cacheFiltersAndCount(filters, availableL3InFilter);
    }

    // WHY DO WE NEED THIS??
    //   let unbxdId = res.headers && res.headers['unbxd-request-id'];setUnbxdId(unbxdId);

    let entityCategory;
    let categoryNameTop = '';

    // Taking the first product in plp to get the categoryID to be sent to adobe
    if (res.body.response.products.length) {
      const firstProduct = res.body.response.products[0];
      const categoryPath = getCategoryPath(firstProduct);
      const breadcrumbTopId = getBreadCrumbCatId();
      entityCategory = parseCategoryEntity(categoryPath, breadCrumbs);
      categoryNameTop = getCategoryId(categoryPath, breadcrumbTopId);
    }

    const response = returnResponseObj(res, {
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
    });
    const formattedResponse = processResponse(
      response,
      res.body.response,
      {},
      attributesNames,
      categoryType,
      excludeBadge,
      shouldApplyUnbxdLogic
    );
    return Promise.all(pendingPromises).then(() => formattedResponse);
  };

  getProducts = () => {
    const payload = {
      webService: endpoints.getPlpProducts,
      url: '/8870d5f30d9bebafac29a18cd12b801d/childrensplace-com702771523455856/category',
      queryString:
        'start=0&rows=20&variants=true&variants.count=0&version=V2&facet.multiselect=true&selectedfacet=true&fields=alt_img,style_partno,giftcard,TCPProductIndUSStore,TCPFitMessageUSSstore,TCPFit,TCPWebOnlyFlagUSStore,TCPWebOnlyFlagCanadaStore,TCPSwatchesUSStore,top_rated,TCPSwatchesCanadaStore,product_name,TCPColor,imagename,productid,uniqueId,favoritedcount,TCPBazaarVoiceReviewCount,categoryPath3_fq,categoryPath3,categoryPath3_catMap,categoryPath2_catMap,product_short_description,min_list_price,min_offer_price,TCPBazaarVoiceRating,seo_token,prodpartno,banner,facets,auxdescription,list_of_attributes,numberOfProducts,redirect,searchMetaData,didYouMean,TCPLoyaltyPromotionTextUSStore,TCPLoyaltyPLCCPromotionTextUSStore,TcpBossCategoryDisabled,TcpBossProductDisabled,long_product_title,TCPOutOfStockFlagUSStore,TCPOutOfStockFlagCanadaStore&pagetype=boolean&p-id=categoryPathId:%22484507%3E484508%22&uid=uid-1563946353348-89276',
    };
    return executeUnbxdAPICall(payload)
      .then(this.processUnbxdData)
      .catch(this.handleValidationError);
  };

  getMock = () => {
    return this.processData(mock);
  };

  processData = res => {
    return res.body.response.products;
  };

  handleValidationError = e => {
    console.log(e);
  };

  /**
   * @function filterOutNoneWishlistItems
   * @summary This will return item level info with respect to the current user, like if an item is in the users favorits
   */
  getProductsUserCustomInfo = (generalProductIdsList, isPDP) => {
    const payload = {
      webService: endpoints.getListofDefaultWishlist,
    };

    return executeStatefulAPICall(payload)
      .then(res => {
        if (apiHelper.responseContainsErrors(res)) {
          console.log(res);
        }

        const favProductsMap = {};
        // eslint-disable-next-line
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
  };
}

export default ProductsDynamicAbstractor;
