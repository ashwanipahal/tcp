/* eslint-disable */
import { executeUnbxdAPICall } from '../../handler';
import endpoints from '../../endpoints';
import { parseBoolean, isBopisProduct, isBossProduct } from './productParser';
import processHelpers from './processHelpers';
import { extractExtraImages } from './productListing.utils';
import { extractAttributeValue, extractPrioritizedBadge } from '../../../utils/badge.util';
import utils from '../../../utils';
import { getNavTree } from '../../../components/features/browse/ProductDetail/container/ProductDetail.selectors';
import { findCategoryIdandName } from '../../../components/features/browse/ProductListing/container/ProductListing.util';

/* DTN-5579 BE  will be sending the list of badges to be excluded in any category
and we are checking if the particular category should show/hide a badge */
function getNavAttributes(navTree, categoryId, attribute) {
  let index = navTree ? navTree.length : 0;
  let iterator = 0;
  let categoryFound = '';
  while (iterator < index) {
    if (navTree[iterator].categoryId === categoryId) {
      categoryFound = navTree[iterator][attribute];
    } else if (navTree[iterator].menuItems && navTree[iterator].menuItems.length) {
      categoryFound = getNavAttributes(
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
      iterator++;
    }
  }
  return categoryFound;
}

/**
 * @method homeBreadCrumbFactory -- give array to create Home breadcrumb
 * @param {undefined}
 * @return {array} breadCrumbs --contain home breadcrumb object in array
 */
export const homeBreadCrumbFactory = () => {
  let breadCrumbs = [
    {
      displayName: 'Home',
      pathSuffix: '/home',
    },
  ];
  return breadCrumbs;
};

/**
 * @function breadCrumbFactory -- create breadcrumb for PDP page
 * @param {Object} storeState --> contain all redux store data
 * @return {array} breadCrumbs --> number of obect item in array cotain breadcrumb info
 */
export const breadCrumbFactory = state => {
  // const navList = storeState.globalComponents.header.navigationTree;
  // const previousPageUrl = document && document.referrer;
  // const previousPagePathName = seoURLExtactor(previousPageUrl);
  const plpBreadCrumb = state.ProductListing.get('breadCrumbTrail');
  let breadCrumbs;
  if (plpBreadCrumb) {
    breadCrumbs = plpBreadCrumb;
  } else {
    breadCrumbs = homeBreadCrumbFactory();
  }

  // if (matchPath(previousPagePathName, { path: PAGES.productListing.pathPattern })) {
  //   /** user can navigate to PDP from PLP then breadcrumb hierarchy need to show but if
  //     user search a product and click on product in typeahead results then Home breadcrumb need
  //     to show on PDP so document.referrer will not able to distinguish if user search a  product from
  //      PLP  and land on PDP , to distinguish this scenario URL param   navigateType=search is used */
  //   let urlParams = UrlParamExtractor();
  //   if (urlParams && urlParams.navigateType === 'search') {
  //     return homeBreadCrumbFactory();
  //   }

  //   breadCrumbsArray = findCategoryIdandName(navList, previousPagePathName);
  //   if (breadCrumbsArray) breadCrumbsArray.reverse();

  //   breadCrumbs = breadCrumbsArray && breadCrumbsArray.map((item) => {
  //     return {
  //       pathSuffix: seoTokenExtactorFromPathName(item.url, storeState),
  //       displayName: item.title,
  //       destination: PAGES.productListing,
  //       categoryId: item.categoryId

  //     };
  //   });
  // }

  // if (breadCrumbs && breadCrumbs.length === 0) {
  //   breadCrumbs = homeBreadCrumbFactory();
  // }

  return breadCrumbs;
};

const routingInfoStoreView = {
  getOriginImgHostSetting: () => {
    return 'https://www.childrensplace.com';
  },
};

const getImgPath = (id, excludeExtension) => {
  return {
    colorSwatch: getSwatchImgPath(id, excludeExtension),
    productImages: getProductImgPath(id, excludeExtension),
  };
};

const getFacetSwatchImgPath = id => {
  const imgHostDomain = routingInfoStoreView.getOriginImgHostSetting();
  return `${imgHostDomain}/wcsstore/GlobalSAS/images/tcp/category/color-swatches/${id}.gif`;
};

const getSwatchImgPath = (id, excludeExtension) => {
  const imgHostDomain = routingInfoStoreView.getOriginImgHostSetting();
  return `${imgHostDomain}/wcsstore/GlobalSAS/images/tcp/products/swatches/${id}${
    excludeExtension ? '' : '.jpg'
  }`;
};

const getProductImgPath = (id, excludeExtension) => {
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

// https://tc39.github.io/ecma262/#sec-array.prototype.findindex
if (!Array.prototype.findIndex) {
  Object.defineProperty(Array.prototype, 'findIndex', {
    value: function(predicate) {
      // 1. Let O be ? ToObject(this value).
      if (this == null) {
        throw new TypeError('"this" is null or not defined');
      }

      var o = Object(this);

      // 2. Let len be ? ToLength(? Get(O, "length")).
      var len = o.length >>> 0;

      // 3. If IsCallable(predicate) is false, throw a TypeError exception.
      if (typeof predicate !== 'function') {
        throw new TypeError('predicate must be a function');
      }

      // 4. If thisArg was supplied, let T be thisArg; else let T be undefined.
      var thisArg = arguments[1];

      // 5. Let k be 0.
      var k = 0;

      // 6. Repeat, while k < len
      while (k < len) {
        // a. Let Pk be ! ToString(k).
        // b. Let kValue be ? Get(O, Pk).
        // c. Let testResult be ToBoolean(? Call(predicate, T, « kValue, k, O »)).
        // d. If testResult is true, return k.
        var kValue = o[k];
        if (predicate.call(thisArg, kValue, k, o)) {
          return k;
        }
        // e. Increase k by 1.
        k++;
      }

      // 7. Return -1.
      return -1;
    },
    configurable: true,
    writable: true,
  });
}

const apiHelper = {
  configOptions: {
    isUSStore: true,
    siteId: utils.getSiteId(),
  },
  responseContainsErrors: () => {
    return false;
  },
};

function convertMultipleSizeSkusToAlternatives(sizes) {
  const uniqueSizesMap = Object.create(null);
  const result = [];

  if (sizes) {
    sizes.forEach((sizeVal, index) => {
      const size = sizeVal;
      let existingSizeForName = uniqueSizesMap[size.sizeName];
      let alternativeSkuIds;

      size.position = index;

      if (!existingSizeForName) {
        // Add current size to uniqueSizesMap if current size  not exist in uniqueSizesMap
        uniqueSizesMap[size.sizeName] = size;
        result.push(size);
      } else if (size.maxAvailable > existingSizeForName.maxAvailable) {
        alternativeSkuIds = existingSizeForName.skuId;
        uniqueSizesMap[size.sizeName] = size;
        result[existingSizeForName.position] = size;
        existingSizeForName = uniqueSizesMap[size.sizeName];
      } else {
        alternativeSkuIds = size.skuId;
        if (!existingSizeForName.alternativeSkuIds) {
          // Check if alternativeSkuIds already exist or not, if not, then intialize alternativeSkuIds with empty array
          existingSizeForName.alternativeSkuIds = [];
        }
        // store the skuId of duplicate size with less quantity as an alternative
        existingSizeForName.alternativeSkuIds.push(alternativeSkuIds);
        uniqueSizesMap[size.sizeName] = existingSizeForName;
        result[existingSizeForName.position] = existingSizeForName;
      }
    });
  }
  return result.filter(size => size);
}
const sumBy = (arr, iteratee) => {
  const func = typeof iteratee === 'function' ? iteratee : item => item[iteratee];

  return arr.reduce((acc, item) => acc + func(item), 0);
};

function getFirstVariant(product) {
  try {
    return product.variants[0] || {};
  } catch (ex) {
    return {};
  }
}

const validateQuantityAvailable = sizes => {
  // const index = findIndex(sizes, function (size) { return size.maxAvailable !== 0; });
  const index = 0;
  return index > -1 ? Number.MAX_VALUE : 0;
};

function getProductColorName(isGiftCard, product) {
  return isGiftCard
    ? product.product_name
    : getFirstVariant(product).auxdescription || product.TCPColor || product.imagename;
}

const getTotalQtyAvailable = sizes => sumBy(sizes, 'v_qty');

const getTotalQtyAvailableBoss = sizes => sumBy(sizes, 'v_qty_boss');

const getSize = sizeName => {
  const size = sizeName && sizeName.split('_');
  return size && (size.length > 1 ? size[1] : sizeName);
};

const getFamilyName = (isGiftCard, itemColor) =>
  isGiftCard ? itemColor.product_name : itemColor.TCPColor;

const getCategoryColorId = itemColor => {
  return itemColor.categoryPath2_catMap && itemColor.categoryPath3_catMap
    ? [...itemColor.categoryPath3_catMap, ...itemColor.categoryPath2_catMap]
    : itemColor.categoryPath3_catMap || itemColor.categoryPath2_catMap;
};

const getCategoryEntity = (categoryColorId, breadCrumbs) => {
  return categoryColorId && processHelpers.parseCategoryEntity(categoryColorId, breadCrumbs);
};

const getImagesByColor = (itemColor, colorName, getImgPath, isGiftCard, imagesByColor) => {
  return {
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
};

const getPdpUrl = (isBundleProduct, itemColor) => {
  return `/p/${isBundleProduct ? itemColor.seo_token : itemColor.uniqueId}`;
};

const getMaxAvailable = itemColor => {
  return getTotalQtyAvailable(itemColor.variants) || 0;
};

const getMaxAvailableBoss = itemColor => {
  return getTotalQtyAvailableBoss(itemColor.variants) || 0;
};

const getColorfitsSizesMap = ({
  productVariants,
  isGiftCard,
  breadCrumbs,
  getImgPath,
  images,
  hasFit,
  isBundleProduct,
  colorsFitsMap,
  excludeBage,
  productAttributes,
}) => {
  let imagesByColor = images;
  return productVariants.map(itemColor => {
    const { productImages, colorSwatch } = getImgPath(itemColor.imagename);
    const colorName = getProductColorName(isGiftCard, itemColor);
    const familyName = getFamilyName(isGiftCard, itemColor);
    const categoryColorId = getCategoryColorId(itemColor);
    const categoryEntity = getCategoryEntity(categoryColorId, breadCrumbs);
    const bossDisabledFlags = {
      bossProductDisabled:
        extractAttributeValue(
          itemColor,
          processHelpers.getProductAttributes().bossProductDisabled
        ) || 0,
      bossCategoryDisabled:
        extractAttributeValue(
          itemColor,
          processHelpers.getProductAttributes().bossCategoryDisabled
        ) || 0,
    };
    imagesByColor = getImagesByColor(itemColor, colorName, getImgPath, isGiftCard, imagesByColor);

    return {
      color: {
        name: colorName,
        imagePath: isGiftCard ? productImages[125] : colorSwatch,
        family: familyName,
        // Family name can be different from color name, quickViewStoreView using family name to find the initial value of Quick View Form
      },
      pdpUrl: getPdpUrl(isBundleProduct, itemColor),
      colorProductId: itemColor.productid,
      colorDisplayId: itemColor.uniqueId, // We need this to display on PDP as well as to send to api for recommendations
      categoryEntity,
      imageName: itemColor.imagename,
      favoritedCount: itemColor.favoritedcount,
      maxAvailable: getMaxAvailable(itemColor), // No inventory message if it is zero
      maxAvailableBoss: getMaxAvailableBoss(itemColor), // No inventory message if it is zero
      hasFits: hasFit,
      miscInfo: {
        isBopisEligible:
          isBopisProduct(apiHelper.configOptions.isUSStore, itemColor) && !getIsGiftCard(itemColor),
        isBossEligible: isBossProduct(bossDisabledFlags) && !getIsGiftCard(itemColor),
        badge1: isBundleProduct
          ? extractPrioritizedBadge(itemColor, productAttributes, '', excludeBage)
          : extractPrioritizedBadge(getFirstVariant(itemColor), productAttributes, '', excludeBage),
        badge2: extractAttributeValue(itemColor, productAttributes.merchant),
        isClearance: extractAttributeValue(
          itemColor,
          processHelpers.getProductAttributes().clearance
        ),
        hasOnModelAltImages: extractAttributeValue(
          itemColor,
          processHelpers.getProductAttributes().onModelAltImages
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
      // TODO - fix this - unbxdId: getUnbxdId(),
    };
  });
};

const getRawBreadCrumb = categoryPathMap => {
  return categoryPathMap && categoryPathMap.length > 0 ? categoryPathMap[0].split('|')[0] : '';
};

const getGeneralProductId = (colorIdOrSeoKeyword, colorFitsSizesMap, baseProduct) => {
  return (
    colorIdOrSeoKeyword ||
    ((colorFitsSizesMap[0] && colorFitsSizesMap[0].productid) || baseProduct.productid)
  );
};

const getCatId = categoryId => {
  return categoryId || '';
};

const getIsGiftCard = (isGiftCard, baseProduct) => {
  return isGiftCard ? 'Gift Card' : baseProduct.product_name;
};

const getLongDescription = (isBundleProduct, baseProduct) => {
  return isBundleProduct
    ? baseProduct.product_long_description
    : baseProduct.style_long_description;
};

const getColorFitSizeDisplayNames = isGiftCard => {
  return isGiftCard ? { color: 'Design', size: 'Value (USD)', size_alt: 'Value' } : null;
};

const getListPrice = baseProduct => {
  return parseFloat(baseProduct.min_list_price) || parseFloat(baseProduct.min_offer_price) || 0;
};

const getOfferPrice = baseProduct => {
  return parseFloat(baseProduct.min_offer_price) || 0;
};

const getHighListPrice = baseProduct => {
  return parseFloat(baseProduct.high_list_price) || 0;
};
const getHighOfferPrice = baseProduct => {
  return parseFloat(baseProduct.high_offer_price) || 0;
};

const getLowListPrice = baseProduct => {
  return parseFloat(baseProduct.low_list_price) || 0;
};

const getLowOfferPrice = baseProduct => {
  return parseFloat(baseProduct.low_offer_price) || 0;
};

const getRating = (isGiftCard, baseProduct) => {
  return isGiftCard ? 0 : baseProduct.TCPBazaarVoiceRating || 0;
};

const getReviewsCount = (isGiftCard, reviewsCount) => {
  return isGiftCard ? 0 : reviewsCount;
};

const parseCategoryId = (pathMap, breadCrumbs) => {
  const L2Category = breadCrumbs.slice(0, 2);
  const breadCategory =
    L2Category.length > 1 ? L2Category.map(value => value.categoryId).join('>') : '';
  let categoryName;

  if (L2Category.length <= 1) {
    const categoryEntity = processHelpers.getParticularCategory(pathMap, L2Category);
    const entities = categoryEntity && categoryEntity.split('|');
    categoryName = entities && entities[0].split('>');
  }

  return categoryName ? categoryName.join('>') : breadCategory;
};

const processResponse = ({
  baseProduct,
  categoryPathMap,
  colorIdOrSeoKeyword,
  colorFitsSizesMap,
  categoryId,
  isGiftCard,
  isBundleProduct,
  imagesByColor,
  reviewsCount,
  alternateSizes,
  breadCrumbs,
}) => ({
  breadCrumbs,
  rawBreadCrumb: getRawBreadCrumb(categoryPathMap),
  product: {
    // generalProductId = color with matching seo OR colorIdOrSeoKeyword is its a number OR default to first color's ID (To Support Outfits)
    ratingsProductId: baseProduct.style_partno,
    // generalProductId = color with matching seo OR colorIdOrSeoKeyword is its a number OR default to first color's ID (To Support Outfits)
    generalProductId: getGeneralProductId(colorIdOrSeoKeyword, colorFitsSizesMap, baseProduct),
    categoryId: getCatId(categoryId),
    name: getIsGiftCard(isGiftCard, baseProduct),
    pdpUrl: `/p/${colorIdOrSeoKeyword}`,
    shortDescription: baseProduct.product_short_description,
    longDescription: getLongDescription(isBundleProduct, baseProduct),
    imagesByColor,
    colorFitsSizesMap,
    isGiftCard,
    colorFitSizeDisplayNames: getColorFitSizeDisplayNames(isGiftCard),
    listPrice: getListPrice(baseProduct),
    offerPrice: getOfferPrice(baseProduct),
    highListPrice: getHighListPrice(baseProduct),
    highOfferPrice: getHighOfferPrice(baseProduct),
    lowListPrice: getLowListPrice(baseProduct),
    lowOfferPrice: getLowOfferPrice(baseProduct),
    ratings: getRating(isGiftCard, baseProduct),
    reviewsCount: getReviewsCount(isGiftCard, reviewsCount),
    // unbxdId: getUnbxdId(),
    unbxdProdId: baseProduct.uniqueId,
    alternateSizes,
    productId: baseProduct.uniqueId,
    promotionalMessage: baseProduct.TCPLoyaltyPromotionTextUSStore || '',
    promotionalPLCCMessage: baseProduct.TCPLoyaltyPLCCPromotionTextUSStore || '',
    long_product_title: baseProduct.long_product_title || '',
    bundleProducts: baseProduct.products || [],
  },
});

const getReviewsCountProduct = baseProduct => {
  return (
    (baseProduct.TCPBazaarVoiceReviewCount &&
      parseInt(baseProduct.TCPBazaarVoiceReviewCount, 10)) ||
    0
  );
};

const getCategoryPathMap = baseProduct => {
  return baseProduct.categoryPath3_catMap || baseProduct.categoryPath2_catMap;
};

const getCategory = baseProduct => {
  return baseProduct.categoryPath2_catMap && baseProduct.categoryPath2_catMap[0].split('|')[0];
};

const getCategoryId = (breadCrumbs, baseProduct, categoryPath) => {
  return breadCrumbs && breadCrumbs.length && breadCrumbs[0].categoryId
    ? parseCategoryId(baseProduct.categoryPath2_catMap, breadCrumbs)
    : categoryPath;
};

const getBaseProduct = product => {
  return product[0] || product;
};

const getProductVariants = product => {
  return (Array.isArray(product) ? product : Array.of(product)) || [];
};

const getFitName = sizeVariant => {
  return (sizeVariant.v_tcpfit && sizeVariant.v_tcpfit.toLowerCase()) || '';
};

const getInventoryStatus = sizeVariant => {
  return sizeVariant.v_qty && sizeVariant.v_qty !== 0 && sizeVariant.v_qty !== '';
};

const getSizeName = sizeVariant => {
  return getSize(sizeVariant.v_tcpsize) || getSize(sizeVariant.style_name);
};

const getListPriceProduct = sizeVariant => {
  return parseFloat(sizeVariant.v_listprice) || 0;
};

const getOfferPriceProduct = sizeVariant => {
  return parseFloat(sizeVariant.v_offerprice) || 0;
};

const getAlternateSizes = (defaultColorAlternateSizes, otherColorAlternateSizes) => {
  return defaultColorAlternateSizes || otherColorAlternateSizes
    ? JSON.parse(defaultColorAlternateSizes || otherColorAlternateSizes)
    : {};
};

const getSortedKeys = (currentColorFitsSizesMap, sortOptions) => {
  return Object.keys(currentColorFitsSizesMap).sort(
    (a, b) =>
      (sortOptions[a.toLowerCase()] || sortOptions.other) -
      (sortOptions[b.toLowerCase()] || sortOptions.other)
  );
};

const getHasDefaultFit = (hasDefaultFit, isDefaultFit) => {
  return hasDefaultFit || isDefaultFit;
};

const isColorVariant = colorVariant => {
  return colorVariant && colorVariant.variants;
};

const setDefault = (hasDefaultFit, colorsFitsMap, color) => {
  return !hasDefaultFit && colorsFitsMap[color].length;
};

const getDefaultColorAlternateSizes = (colorVariant, colorIdOrSeoKeyword) => {
  return colorVariant.uniqueId === colorIdOrSeoKeyword && colorVariant.additional_styles;
};

const getIsAdditionalStyles = (hasAdditionalStyles, colorVariant) => {
  return !hasAdditionalStyles && colorVariant.additional_styles;
};

const parseProductFromAPI = (
  product,
  colorIdOrSeoKeyword,
  dontFetchExtraImages,
  breadCrumbs,
  excludeBage,
  isBundleProduct
) => {
  const baseProduct = getBaseProduct(product); // Getting multiple products as color variants
  const productVariants = getProductVariants(product);
  const isGiftCard = processHelpers.isGiftCard(baseProduct); // TBD: backend to confirm whether partNumber will always be giftCardBundle for gift cards.
  const productAttributes = processHelpers.getProductAttributes();
  let hasFit = false;
  let hasInventory = false;
  let alternateSizes;
  let defaultColorAlternateSizes;
  let otherColorAlternateSizes;

  let hasAdditionalStyles = false;
  const imagesByColor = {};
  // const imagesByColor = extractExtraImages(rawColors, baseProduct.alt_img, getImgPath);

  // This color map is used as an intermediary step to help consolidate all sizes under fits
  const colorsFitsMap = {};
  // eslint-disable-next-line
  for (let colorVariant of productVariants) {
    const color = getProductColorName(isGiftCard, colorVariant);
    const currentColorFitsSizesMap = {};

    let fitName = '';
    if (isColorVariant) {
      // eslint-disable-next-line
      for (let sizeVariant of colorVariant.variants) {
        fitName = getFitName(sizeVariant);
        if (!currentColorFitsSizesMap[fitName]) {
          currentColorFitsSizesMap[fitName] = [];
        }
        if (!hasInventory) {
          hasInventory = getInventoryStatus(sizeVariant);
        }
        currentColorFitsSizesMap[fitName].push({
          sizeName: getSizeName(sizeVariant),
          skuId: sizeVariant.v_item_catentry_id,
          listPrice: getListPriceProduct(sizeVariant),
          offerPrice: getOfferPriceProduct(sizeVariant),
          maxAvailable: sizeVariant.v_qty,
          maxAvailableBoss: sizeVariant.v_qty_boss,
          variantId: sizeVariant.variantId,
          variantNo: sizeVariant.v_variant,
        });
      }
    }

    hasFit = !!fitName;

    let hasDefaultFit = false;
    const sortOptions = {
      regular: 1,
      slim: 2,
      plus: 3,
      husky: 4,
      other: 5,
    };
    const sortedKeys = getSortedKeys(currentColorFitsSizesMap, sortOptions);
    // eslint-disable-next-line
    colorsFitsMap[color] = sortedKeys.map(fitNameVal => {
      const isDefaultFit = fitNameVal.toLowerCase() === 'regular';
      hasDefaultFit = getHasDefaultFit(hasDefaultFit, isDefaultFit);

      return {
        fitNameVal,
        isDefault: isDefaultFit,
        maxAvailable: validateQuantityAvailable(currentColorFitsSizesMap[fitNameVal]),
        sizes: convertMultipleSizeSkusToAlternatives(currentColorFitsSizesMap[fitNameVal]),
      };
    });

    if (setDefault(hasDefaultFit, colorsFitsMap, color)) {
      colorsFitsMap[color][0].isDefault = true;
    }

    if (getDefaultColorAlternateSizes(colorVariant, colorIdOrSeoKeyword)) {
      defaultColorAlternateSizes = colorVariant.additional_styles;
    }
    if (getIsAdditionalStyles(hasAdditionalStyles, colorVariant)) {
      otherColorAlternateSizes = colorVariant.additional_styles;
      hasAdditionalStyles = true;
    }
  }

  try {
    alternateSizes = getAlternateSizes(defaultColorAlternateSizes, otherColorAlternateSizes);
  } catch (err) {
    alternateSizes = {};
    console.error('API response coming for additional_styles key JSON format is incorrect', err);
  }

  // Generate the colorFitsSizeMap needed for mapping colors to fits/sizes

  const colorFitsSizesMap = getColorfitsSizesMap({
    productVariants,
    isGiftCard,
    breadCrumbs,
    getImgPath,
    imagesByColor,
    hasFit,
    isBundleProduct,
    colorsFitsMap,
    excludeBage,
    productAttributes,
  });

  const reviewsCount = getReviewsCountProduct(baseProduct);
  const categoryPathMap = getCategoryPathMap(baseProduct);
  const categoryPath = getCategory(baseProduct);
  const categoryId = getCategoryId(breadCrumbs, baseProduct, categoryPath);

  return processResponse({
    baseProduct,
    categoryPathMap,
    colorIdOrSeoKeyword,
    colorFitsSizesMap,
    categoryId,
    isGiftCard,
    isBundleProduct,
    imagesByColor,
    reviewsCount,
    alternateSizes,
    breadCrumbs,
  });
};

const loadProduct = (productKey, justLoadProduct) => {
  const breadCrumb = breadCrumbFactory();
  const navigationTree = generalStoreView.getHeaderNavigationTree(this.store.getState());
  const categoryId = breadCrumb[breadCrumb.length - 1].categoryId;
  const excludeBage = categoryId
    ? getNavAttributes(navigationTree, categoryId, 'excludeAttribute')
    : '';
  const isRadialInvEnabled = generalStoreView.getIsRadialInventoryEnabled(this.store.getState());
  const location = routingInfoStoreView.getHistory(this.store.getState()).location;
  const isBundleProduct = matchPath(location.pathname, { path: PAGES.productBundle.pathPattern });
  return this.productsAbstractor
    .getProductInfoById(
      productKey,
      this.getImgPath,
      breadCrumb,
      excludeBage,
      isRadialInvEnabled,
      isBundleProduct
    )
    .then(res => {
      const currentColorProduct =
        res.product.generalProductId !== 'gift_cards'
          ? res.product.colorFitsSizesMap.filter(
              item => item.colorDisplayId === res.product.generalProductId
            )
          : res.product.generalProductId;

      if (!justLoadProduct) {
        this.store.dispatch([
          getSetCurrentProductActn(res.product),
          currentColorProduct.length &&
            getSetCurrentColorProductIdActn(currentColorProduct[0].colorProductId),
          getSetCurrentProductBreadCrumbsActn(breadCrumb),
        ]);
      }
      return res.product;
    })
    .catch(err => {
      logErrorAndServerThrow(this.store, 'ProductsOperator.loadProduct', err);
    });
};

const productDetailsInitStore = payload => {
  // const match = matchPath(window.location.pathname, {path: PAGES.productDetails.pathPattern});
  const match = {
    params: {
      productKey: 'Girls-Uniform-Short-Sleeve-Ruffle-Pique-Polo-2044391-10',
    },
  };
  const id = decodeURI(match.params.productKey).split('-');
  let productId =
    id && id.length > 1 ? id[id.length - 2] + '_' + id[id.length - 1] : match.params.productKey;
  if (
    (id.indexOf('Gift') > -1 || id.indexOf('gift') > -1) &&
    (id.indexOf('Card') > -1 || id.indexOf('card') > -1)
  ) {
    productId = 'gift';
  }
  loadProduct(productId);

  // productsOperator.setActiveProductColor(productDetailsStoreView.getCurrentColorProductId(storeState));

  // we need the additional product info to load after the session loaded
  // (as we should only load for registered user)
  // there's a caveat tho, on local this causes an additional loading phase
  // custom user info should not be blocking
  // Promise.all([sessionPromise, loadProductPromise]).then(() => {
  //   const storeState = store.getState();
  //   // this piece loads optional user-specific information about the product
  //   // (for instance, whether it's favorited or not) so we're not blocking the load on them

  //   // DT-32196 this piece of code to pass information to PDP page to get the wish list based on color.
  //   productsOperator.loadProductUserCustomInfo(productDetailsStoreView.getProductAllColorIds(storeState))
  //     .catch((err) => { logErrorAndServerThrow(store, 'loadProductUserCustomInfo', err); });
  // });

  return payload;
};

// const setActiveProductColor = (colorProductId) => {
//   return Promise.resolve().then(() => {
//     const currentProduct = productDetailsStoreView.getCurrentProduct(this.store.getState());
//     const colorOptionsMapEntry = getMapSliceForColorProductId(currentProduct.colorFitsSizesMap, colorProductId);

//     urbanAirShipBrowseEvent(currentProduct);
//     if (!colorOptionsMapEntry) throw new Error(`ProductsOperator.setActiveProductColor: colorFitsSizesMap missing entry for colorProductId='${colorProductId}'`);

//     this.loadProductRecommendations(RECOMMENDATIONS_SECTIONS.PDP, colorOptionsMapEntry.colorDisplayId, colorOptionsMapEntry.categoryEntity);
//     this.loadOutfitRecommendations(colorOptionsMapEntry.colorDisplayId);

//     return this.getUpdatedOptionsInventoryForColor(colorOptionsMapEntry)
//       .then((newColorOptionsMap) => {
//         this.store.dispatch([
//           getSetCurrentColorProductIdActn(colorProductId),
//           getSetProductOptionsForColorActn(colorProductId, newColorOptionsMap),
//           getSetIsInventoryLoadedActn(true)
//         ]);
//       }).catch((err) => {
//         logErrorAndServerThrow(this.store, 'ProductsOperator.setActiveProductColor', err);
//       });
//   });
// }

// const productDetailsInitStore = (payload) => {
//   const match = matchPath(window.location.pathname, {path: PAGES.productDetails.pathPattern});
//   const id = decodeURI(match.params.productKey).split('-');
//   let productId = (id && id.length > 1) ? id[id.length - 2] + '_' + id[id.length - 1] : match.params.productKey;
//   if ((id.indexOf('Gift') > -1 || id.indexOf('gift') > -1) && (id.indexOf('Card') > -1 || id.indexOf('card') > -1)) {
//     productId = 'gift';
//   }
//   loadProductPromise = productsOperator.loadProduct(productId);

//   loadProductPromise.then(() => {
//     const storeState = store.getState();

//     /*
//      * Removed setActiveProductColor from pendingPromises because we don't
//      * need to wait for the inventory to load before rendering the page
//      */
//     productsOperator.setActiveProductColor(productDetailsStoreView.getCurrentColorProductId(storeState));
//   });

//   pendingPromises.push(sessionPromise.then(() => {
//     // We need PDP to refresh on login because of BV integration. This is done inside the .then to prevent an infinite
//     // loop of refreshes as the user always comes flagged as guest from the server
//     observeStore(
//       store,
//       state => userStoreView.isGuest(state),
//       (oldIsGuest, newIsGuest) => !newIsGuest && document.location.reload(true),
//       true      // do not trigger now, as it will cause an infinite loop if the user is already logged in
//     );
//   }));

//   // we need the additional product info to load after the session loaded
//   // (as we should only load for registered user)
//   // there's a caveat tho, on local this causes an additional loading phase
//   // custom user info should not be blocking
//   Promise.all([sessionPromise, loadProductPromise]).then(() => {
//     const storeState = store.getState();
//     // this piece loads optional user-specific information about the product
//     // (for instance, whether it's favorited or not) so we're not blocking the load on them

//     // DT-32196 this piece of code to pass information to PDP page to get the wish list based on color.
//     productsOperator.loadProductUserCustomInfo(productDetailsStoreView.getProductAllColorIds(storeState))
//       .catch((err) => { logErrorAndServerThrow(store, 'loadProductUserCustomInfo', err); });
//   });

//   return payload;
// }

// const loadProduct = (productKey, justLoadProduct) => {
//   const breadCrumb = breadCrumbFactory(this.store.getState());
//   const navigationTree = generalStoreView.getHeaderNavigationTree(this.store.getState());
//   const categoryId = breadCrumb[breadCrumb.length - 1].categoryId;
//   const excludeBage = categoryId ? getNavAttributes(navigationTree, categoryId, 'excludeAttribute') : '';
//   const isRadialInvEnabled = generalStoreView.getIsRadialInventoryEnabled(this.store.getState());
//   const location = routingInfoStoreView.getHistory(this.store.getState()).location;
//   const isBundleProduct = matchPath(location.pathname, { path: PAGES.productBundle.pathPattern });
//   return this.productsAbstractor.getProductInfoById(productKey, this.getImgPath, breadCrumb, excludeBage, isRadialInvEnabled, isBundleProduct).then((res) => {

//     const currentColorProduct = res.product.generalProductId !== 'gift_cards'
//       ? res.product.colorFitsSizesMap.filter(item => item.colorDisplayId === res.product.generalProductId)
//       : res.product.generalProductId;

//     if (!justLoadProduct) {
//       this.store.dispatch([
//         getSetCurrentProductActn(res.product),
//         currentColorProduct.length && getSetCurrentColorProductIdActn(currentColorProduct[0].colorProductId),
//         getSetCurrentProductBreadCrumbsActn(breadCrumb)

//       ]);
//     }
//     return res.product;
//   }).catch((err) => {
//     logErrorAndServerThrow(this.store, 'ProductsOperator.loadProduct', err);
//   });
// }

/**
 * @function getProductInfoById
 * @summary This will get product info and all color/sizes for that product
 */
const getProductInfoById = (productColorId, state) => {
  // const isRadialInvEnabled = generalStoreView.getIsRadialInventoryEnabled(this.store.getState());
  // const location = routingInfoStoreView.getHistory(this.store.getState()).location;
  // const isBundleProduct = matchPath(location.pathname, { path: PAGES.productBundle.pathPattern });
  const isRadialInvEnabled = false;
  const isBundleProduct = false;

  const breadCrumb = breadCrumbFactory(state);
  const categoryId = breadCrumb[breadCrumb.length - 1].categoryId;
  const navigationTree = getNavTree(state);
  const excludeBage = categoryId
    ? getNavAttributes(navigationTree, categoryId, 'excludeAttribute')
    : '';
  const productId =
    productColorId.indexOf('-') > -1
      ? productColorId.split('-')[0]
      : productColorId.indexOf('_') > -1
      ? productColorId.split('_')[0]
      : productColorId;
  // eslint-disable-next-line no-param-reassign
  productColorId =
    productColorId.indexOf('-') > -1 ? productColorId.replace('-', '_') : productColorId; // As ProductColorId response has always _ rather than hyphen(-)
  let fields =
    'alt_img,style_partno,giftcard,TCPProductIndUSStore,TCPWebOnlyFlagUSStore,TCPWebOnlyFlagCanadaStore,TCPFitMessageUSSstore,TCPFit,product_name,TCPColor,top_rated,imagename,productid,uniqueId,favoritedcount,TCPBazaarVoiceReviewCount,categoryPath3_catMap,categoryPath2_catMap,product_short_description,style_long_description,min_list_price,min_offer_price,TCPBazaarVoiceRating,product_long_description,seo_token,variantCount,prodpartno,variants,v_tcpfit,v_qty,v_tcpsize,style_name,v_item_catentry_id,v_listprice,v_offerprice,v_qty,variantId,auxdescription,list_of_attributes,additional_styles,TCPLoyaltyPromotionTextUSStore,TCPLoyaltyPLCCPromotionTextUSStore,v_variant, low_offer_price, high_offer_price, low_list_price, high_list_price,long_product_title,TCPOutOfStockFlagUSStore,TCPOutOfStockFlagCanadaStore';
  let count = 100;
  if (!isBundleProduct) {
    if (isRadialInvEnabled) {
      fields = fields.concat(',v_qty_boss');
    }
  } else {
    fields =
      'alt_img,style_partno,TCPProductIndUSStore,TCPWebOnlyFlagUSStore,TCPWebOnlyFlagCanadaStore,TCPFitMessageUSSstore,product_name,TCPColor,imagename,productid,uniqueId,categoryPath3_catMap,categoryPath2_catMap,product_short_description,style_long_description,min_list_price,min_offer_price,product_long_description,seo_token,prodpartno,auxdescription,list_of_attributes,additional_styles,TCPLoyaltyPromotionTextUSStore,TCPLoyaltyPLCCPromotionTextUSStore,low_offer_price,high_offer_price,low_list_price,high_list_price,long_product_title,TCPOutOfStockFlagUSStore,TCPOutOfStockFlagCanadaStore,product_type,products';
    count = 0;
  }

  const payload = {
    body: {
      variants: true,
      'variants.count': count,
      version: 'V2',
      rows: 20,
      pagetype: 'boolean',
      q: productId,
      promotion: false,
      fields,
    },
    webService: endpoints.getProductInfoById,
  };

  if (productId === 'gift') {
    payload.body.filter = 'giftcard:1';
    payload.body.sort = 'style_sequence asc';
  }

  if (isBundleProduct) {
    payload.body.filter = `prodpartno:"${productId}"`;
  }

  return executeUnbxdAPICall(payload)
    .then(res => {
      return parseProductFromAPI(
        res.body.response.products,
        productColorId,
        false,
        breadCrumb,
        excludeBage,
        isBundleProduct
      );
    })
    .catch(err => {
      // if (err && ((err.status >= 400 && err.status <= 404) || err.status === 500) && isClient()) {
      // TODO - handle it - window.location.href = getErrorPagePath(this.apiHelper._configOptions.siteId);
      // }
      console.log(err);
      // TODO - handle it - throw this.apiHelper.getFormattedError(err);
    });
  // return apiHelper
  //   .webServiceCall(payload)
  //   .then(res => {
  //     if (apiHelper.responseContainsErrors(res)) {
  //       // Fix this - throw new ServiceResponseError(res);
  //     }
  //     return parseProductFromAPI(
  //       res.body.response.products,
  //       productColorId,
  //       false,
  //       getImgPath,
  //       breadCrumbs,
  //       excludeBage,
  //       isBundleProduct
  //     );
  //   })
  //   .catch(err => {
  //     // if (err && ((err.status >= 400 && err.status <= 404) || err.status === 500) && isClient()) {
  //     // TODO - fix this - window.location.href = getErrorPagePath(this.apiHelper._configOptions.siteId);
  //     // }
  //     console.log(err); // Fix this - throw apiHelper.getFormattedError(err);
  //   });
};

export default getProductInfoById;
