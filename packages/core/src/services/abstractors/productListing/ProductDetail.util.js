import { parseBoolean, isBopisProduct, isBossProduct } from './productParser';
import { extractExtraImages } from './productListing.utils';
import { extractAttributeValue, extractPrioritizedBadge } from '../../../utils/badge.util';
import utils from '../../../utils';
import processHelpers from './processHelpers';

const getIsGiftCard = (isGiftCard, baseProduct) => {
  return isGiftCard ? 'Gift Card' : baseProduct.product_name;
};

const isGiftCardItem = product =>
  !!(
    product &&
    product.style_partno &&
    (product.style_partno.toLowerCase() === 'giftcardbundle' || product.giftcard === '1')
  );

/* DTN-5579 BE  will be sending the list of badges to be excluded in any category
and we are checking if the particular category should show/hide a badge */
const getNavAttributes = (navTree, categoryId, attribute) => {
  const index = navTree ? navTree.length : 0;
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
      iterator += 1;
    }
  }
  return categoryFound;
};

/**
 * @method homeBreadCrumbFactory -- give array to create Home breadcrumb
 * @param {undefined}
 * @return {array} breadCrumbs --contain home breadcrumb object in array
 */
const homeBreadCrumbFactory = () => {
  return [
    {
      displayName: 'Home',
      urlPathSuffix: 'home',
    },
  ];
};

/**
 * @function breadCrumbFactory -- create breadcrumb for PDP page
 * @param {Object} storeState --> contain all redux store data
 * @return {array} breadCrumbs --> number of obect item in array cotain breadcrumb info
 */
const breadCrumbFactory = state => {
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
  return breadCrumbs;
};

const routingInfoStoreView = {
  getOriginImgHostSetting: () => {
    return 'https://test4.childrensplace.com';
  },
};

const getSwatchImgPath = (id, excludeExtension) => {
  const imgHostDomain = routingInfoStoreView.getOriginImgHostSetting();
  return `${imgHostDomain}/wcsstore/GlobalSAS/images/tcp/products/swatches/${id}${
    excludeExtension ? '' : '.jpg'
  }`;
};

const getProductImagePath = (id, excludeExtension) => {
  const imageName = (id && id.split('_')) || [];
  const imagePath = imageName[0];

  return {
    125: `${imagePath}/${id}${excludeExtension ? '' : '.jpg'}`,
    380: `${imagePath}/${id}${excludeExtension ? '' : '.jpg'}`,
    500: `${imagePath}/${id}${excludeExtension ? '' : '.jpg'}`,
    900: `${imagePath}/${id}${excludeExtension ? '' : '.jpg'}`,
  };
};

const getImgPath = (id, excludeExtension) => {
  return {
    colorSwatch: getSwatchImgPath(id, excludeExtension),
    productImages: getProductImagePath(id, excludeExtension),
  };
};

const apiHelper = {
  configOptions: {
    isUSStore: true,
    siteId: utils.getSiteId(),
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

  return arr && arr.reduce((acc, item) => acc + func(item), 0);
};

function getFirstVariant(product) {
  try {
    return product.variants[0] || {};
  } catch (ex) {
    return {};
  }
}

const validateQuantityAvailable = () => {
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

const getImagesByColor = (itemColor, colorName, getImgPathFunc, isGiftCard, imagesByColor) => {
  return {
    ...extractExtraImages(
      `${itemColor.imagename}#${colorName}`,
      itemColor.alt_img,
      getImgPathFunc,
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
  // eslint-disable-next-line
  getImgPathFunc,
  images,
  hasFit,
  isBundleProduct,
  colorsFitsMap,
  excludeBage,
  productAttributes,
}) => {
  let imagesByColor = images;
  const itemColorMap = productVariants.map(itemColor => {
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
        swatchImage: itemColor.swatchimage,
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
          isBopisProduct(apiHelper.configOptions.isUSStore, itemColor) &&
          !isGiftCardItem(itemColor),
        isBossEligible: isBossProduct(bossDisabledFlags) && !isGiftCardItem(itemColor),
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
  return {
    itemColorMap,
    imagesByColor,
  };
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

const processHelperUtil = {
  getIsGiftCard,
  getNavAttributes,
  homeBreadCrumbFactory,
  breadCrumbFactory,
  routingInfoStoreView,
  getSwatchImgPath,
  getProductImagePath,
  getImgPath,
  convertMultipleSizeSkusToAlternatives,
  sumBy,
  getFirstVariant,
  validateQuantityAvailable,
  getProductColorName,
  getTotalQtyAvailable,
  getTotalQtyAvailableBoss,
  getSize,
  getFamilyName,
  getCategoryColorId,
  getPdpUrl,
  getMaxAvailable,
  getMaxAvailableBoss,
  getColorfitsSizesMap,
  parseCategoryId,
  getReviewsCountProduct,
  getCategoryPathMap,
  getCategory,
  getCategoryId,
  getBaseProduct,
  getProductVariants,
  getFitName,
  getInventoryStatus,
  getSizeName,
  getListPriceProduct,
  getOfferPriceProduct,
  getAlternateSizes,
  getSortedKeys,
  getHasDefaultFit,
  isColorVariant,
  setDefault,
  getDefaultColorAlternateSizes,
  getIsAdditionalStyles,
};
export default processHelperUtil;
