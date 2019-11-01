/* eslint-disable extra-rules/no-commented-out-code */
import processHelpers from './processHelpers';
import { extractExtraImages } from './productListing.utils';

export function parseBoolean(bool) {
  return bool === true || bool === '1' || (bool || '').toUpperCase() === 'TRUE';
}
export const LANG_STRINGS = {
  PRODUCTS: {
    ATTRIBUTES: {
      CLEARANCE: {
        en: 'Clearance',
        fr: 'Liquidation',
        es: 'Liquidación',
      },
      ONLINE_ONLY: {
        en: 'Online Only',
        fr: 'Online Only', // Added english word as we dont have online only for ca-fr
        es: 'Solo en línea',
      },
      NEW_ARRIVALS: {
        en: 'New Arrivals',
        fr: 'Nouveautés',
        es: 'Novedades',
      },
    },
  },
};

function getAllLangConsts(categoryType) {
  return Object.keys(categoryType).map(key => categoryType[key]);
}

// function to select the corresponding category
export function getClearanceString(categoryType) {
  return getAllLangConsts(LANG_STRINGS.PRODUCTS.ATTRIBUTES[categoryType]);
}

export function attributeListMaker(attributes) {
  return (
    attributes &&
    attributes.split(`;`).map(attribute => {
      const regexUrl = /((http|https):\/\/)?(([\w.-]*)\.([\w])).*/g;
      const isUrl = regexUrl.test(attribute);
      const match = attribute.match(regexUrl);
      const url = match && match[0].split('|');
      const attAndValue = attribute.split(`:`);
      return { identifier: attAndValue[0], value: isUrl ? url : attAndValue[1] };
    })
  );
}
export function extractAttributeValue(item, attribute) {
  try {
    if (item.list_of_attributes) {
      const currItm = item.list_of_attributes;
      /* item.list_of_attributes comes as Array on PLP but on PDP it comes as a string when this function is called. On PLP we have a wrapper funtion where
      we do the modifcation and pass the data to this function but on PDP we do not have a wrapper function in this module hence handeling the PDP at this
      place only. */
      const itm = Array.isArray(currItm) ? currItm : attributeListMaker(currItm);
      return itm.find(att => att.identifier === attribute).value;
    }
    if (item[attribute]) {
      return item[attribute];
    }
    return null;
  } catch (ex) {
    return '';
  }
}
const getListPrice = swatchOfAvailableProduct => {
  return swatchOfAvailableProduct.min_list_price === swatchOfAvailableProduct.min_offer_price
    ? swatchOfAvailableProduct.min_offer_price
    : swatchOfAvailableProduct.min_list_price ||
        {
          value: null,
        }.value ||
        0;
};
const getRating = product => {
  return product.TCPBazaarVoiceRating || 0;
};
const getReview = product => {
  return (
    (product.TCPBazaarVoiceReviewCount && parseInt(product.TCPBazaarVoiceReviewCount, 10)) || 0
  );
};
const getMiscInfoRating = product => {
  return parseFloat(product.TCPBazaarVoiceRating) || 0;
};
const getUnbxdIdFromReq = headers => {
  return headers && headers['unbxd-request-id'];
};
const getPromotionalMessage = product => {
  return product.TCPLoyaltyPromotionTextUSStore || '';
};
const getPromotionalPLCCMessage = product => {
  return product.TCPLoyaltyPLCCPromotionTextUSStore || '';
};
const catMapExists = (temp, catMap, bucketingSeqConfig) => {
  const desiredL2Val = bucketingSeqConfig.desiredL2 && bucketingSeqConfig.desiredL2.split('|')[0];
  return temp && catMap[desiredL2Val] && catMap[desiredL2Val].indexOf(temp) !== -1;
};
const isMatchingFamily = (matchingFamily, excludeBadge, siteAttributes) => {
  return matchingFamily && excludeBadge !== siteAttributes.matchingFamily;
};
const isOnlineOrClearing = (isOnlineOnly, categoryType) => {
  return isOnlineOnly && !getClearanceString('ONLINE_ONLY').includes(categoryType);
};

const getBundleBadge = (hidePdpBadge, product, siteAttributes) => {
  return !hidePdpBadge ? extractAttributeValue(product, siteAttributes.bundleChecklist) : '';
};

const checkIfClearance = (clearanceOrNewArrival, categoryType) => {
  return (
    clearanceOrNewArrival === 'Clearance' && !getClearanceString('CLEARANCE').includes(categoryType)
  );
};

export function extractPrioritizedBadge(
  product,
  siteAttributes,
  categoryType,
  excludeBadge,
  hidePdpBadge
) {
  const matchingCategory = extractAttributeValue(product, siteAttributes.matchingCategory);
  const matchingFamily = extractAttributeValue(product, siteAttributes.matchingFamily);
  const isGlowInTheDark = !!extractAttributeValue(product, siteAttributes.glowInTheDark);
  const isLimitedQuantity =
    extractAttributeValue(product, siteAttributes.limitedQuantity) === 'limited quantities';
  // The onlineOnly value could be 0 or 1. So parseInt is require otherwise in case of 0 true was returning
  const isOnlineOnly = !!+extractAttributeValue(product, siteAttributes.onlineOnly);
  const clearanceOrNewArrival = extractAttributeValue(product, siteAttributes.clearance);
  const bundleBadge = getBundleBadge(hidePdpBadge, product, siteAttributes);
  const badges = {};

  if (isMatchingFamily(matchingFamily, excludeBadge, siteAttributes.matchingFamily)) {
    badges.matchBadge = matchingFamily;
  }

  if (bundleBadge) {
    badges.defaultBadge = bundleBadge;
  } else if (matchingCategory) {
    badges.defaultBadge = matchingCategory;
  } else if (isGlowInTheDark) {
    badges.defaultBadge = 'GLOW-IN-THE-DARK';
  } else if (isLimitedQuantity) {
    badges.defaultBadge = 'JUST A FEW LEFT!';
  } else if (isOnlineOrClearing(isOnlineOnly, categoryType)) {
    badges.defaultBadge = 'ONLINE EXCLUSIVE';
  } else if (checkIfClearance(clearanceOrNewArrival, categoryType)) {
    badges.defaultBadge = 'CLEARANCE';
  } else if (
    clearanceOrNewArrival === 'New Arrivals' &&
    !getClearanceString('NEW_ARRIVALS').includes(categoryType)
  ) {
    badges.defaultBadge = 'NEW!';
  }
  return badges;
}
/* get the category name corresponding to least breadcrumb category id to pass to adobe */
export function getCategoryId(categoryPath, breadcrumb) {
  let categoryName;
  if (categoryPath && categoryPath.length) {
    categoryPath.some(values => {
      const value = values.split('|');
      const id = value[0].split('>').indexOf(breadcrumb);

      categoryName = value[1].split('>')[id];
      if (categoryName) {
        return true;
      }
      return false;
    });
  }
  return categoryName;
}
const numericStringToBool = str => !!+str;
/**
 * @param {object} bossDisabledFlags carries the boss disability flags - bossCategoryDisabled, bossProductDisabled
 * @returns the disability boolean value
 */
export const isBossProduct = bossDisabledFlags => {
  const { bossCategoryDisabled, bossProductDisabled } = bossDisabledFlags;
  return !(numericStringToBool(bossCategoryDisabled) || numericStringToBool(bossProductDisabled));
};

/**
 * @function isBopisProduct
 * @summary This BOPIS logic is to validate if product/color variant is eligible for BOPIS
 * product is a color variant object of a product.
 */
export const isBopisProduct = (isUSStore, product) => {
  let isOnlineOnly;
  if (isUSStore) {
    isOnlineOnly =
      (product && product.TCPWebOnlyFlagUSStore && parseBoolean(product.TCPWebOnlyFlagUSStore)) ||
      false; // validate if product is online only so it is not BOPIS eligible
  } else {
    isOnlineOnly =
      (product &&
        product.TCPWebOnlyFlagCanadaStore &&
        parseBoolean(product.TCPWebOnlyFlagCanadaStore)) ||
      false;
  }
  return !isOnlineOnly;
};
const getColorsMap = ({
  uniqueId,
  product,
  attributesNames,
  categoryType,
  excludeBadge,
  isBOPIS,
  bossDisabledFlags,
  defaultColor,
  getImgPath,
  isBundleProduct,
}) => {
  return [
    {
      colorProductId: uniqueId,
      imageName: product.imagename,
      miscInfo: {
        isClearance: extractAttributeValue(product, attributesNames.clearance),
        isBopisEligible: isBOPIS && !processHelpers.isGiftCard(product),
        isBossEligible: isBossProduct(bossDisabledFlags) && !processHelpers.isGiftCard(product),
        badge1: extractPrioritizedBadge(
          product,
          attributesNames,
          categoryType,
          excludeBadge,
          !isBundleProduct
        ),
        badge2: extractAttributeValue(product, attributesNames.extendedSize),
        badge3: extractAttributeValue(product, attributesNames.merchant),
        videoUrl: extractAttributeValue(product, attributesNames.videoUrl),
        hasOnModelAltImages: parseBoolean(
          extractAttributeValue(product, attributesNames.onModelAltImages)
        ),
        listPrice: product.min_list_price,
        offerPrice: product.min_offer_price,
        keepAlive: parseBoolean(extractAttributeValue(product, attributesNames.keepAlive)),
      },
      color: {
        name: defaultColor,
        imagePath: getImgPath(isBundleProduct ? product.prodpartno : product.imagename).colorSwatch,
        swatchImagePath: product.swatchimage,
      },
    },
  ];
};
const colorDetailsCondition = (colorDetails, product, swatchOfAvailableProduct) => {
  return colorDetails[0] !== product.imagename && swatchOfAvailableProduct !== undefined;
};
const isBopisEligibleProduct = (isUSStore, swatchOfAvailableProduct, product) => {
  return isBopisProduct(isUSStore, swatchOfAvailableProduct) && !processHelpers.isGiftCard(product);
};
const isBossEligibleProduct = (bossDisabledFlags, product) => {
  return isBossProduct(bossDisabledFlags) && !processHelpers.isGiftCard(product);
};
const isBossProductDisabled = product => {
  return (
    extractAttributeValue(product, processHelpers.getProductAttributes().bossProductDisabled) || 0
  );
};
const isBopisProductDisabled = product => {
  return (
    extractAttributeValue(product, processHelpers.getProductAttributes().bossCategoryDisabled) || 0
  );
};

/**
 * This function returns product part no or product id if product part no does not exists
 * @param {Object} product
 */
const getGeneralProductId = product => {
  return product.prodpartno || product.generalProductId;
};

const getPdpUrl = (isBundleProduct, product) => {
  return `${isBundleProduct ? '/b' : '/p'}/${product.seo_token || product.uniqueId}`;
};

const checkIfBundleProduct = product => {
  return (product.product_type && product.product_type.toLowerCase() === 'bundle') || false;
};

export const parseProductInfo = (
  productArr,
  {
    isUSStore,
    getImgPath,
    hasShortImage,
    attributesNames,
    categoryType,
    excludeBadge,
    bucketingSeqConfig,
    shouldApplyUnbxdLogic,
    response,
    res,
  }
) => {
  const product = productArr;
  // Make product list transformation
  product.list_of_attributes = attributeListMaker(product.list_of_attributes);
  const defaultColor = processHelpers.getDefaultColor(product);
  const { uniqueId } = product;
  const colors = processHelpers.getColors(isUSStore, product, uniqueId, defaultColor);
  const rawColors = processHelpers.getRawColors(isUSStore, product);
  const isBOPIS = isBopisEligibleProduct(isUSStore, product);
  const isBundleProduct = checkIfBundleProduct(product);
  const bossDisabledFlags = {
    bossProductDisabled: isBossProductDisabled(product),
    bossCategoryDisabled: isBopisProductDisabled(product),
  };
  const imagesByColor = extractExtraImages(
    rawColors,
    product.alt_img,
    getImgPath,
    uniqueId,
    defaultColor,
    false,
    hasShortImage
  );
  const colorsMap = getColorsMap({
    uniqueId,
    product,
    attributesNames,
    categoryType,
    excludeBadge,
    isBOPIS,
    bossDisabledFlags,
    defaultColor,
    getImgPath,
    isBundleProduct,
  });
  if (!!Array.isArray(colors) === true) {
    colors.forEach(color => {
      const colorDetails = color.split('#');
      // the default/selected one is already there
      const swatchOfAvailableProduct = processHelpers.getProductByColorId(
        res.body.response.products,
        colorDetails
      );
      if (colorDetailsCondition(colorDetails, product, swatchOfAvailableProduct)) {
        colorsMap.push({
          colorProductId: colorDetails[0],
          imageName: colorDetails[0],
          miscInfo: {
            isBopisEligible: isBopisEligibleProduct(isUSStore, swatchOfAvailableProduct, product),
            isBossEligible: isBossEligibleProduct(bossDisabledFlags, product),
            hasOnModelAltImages: parseBoolean(
              extractAttributeValue(swatchOfAvailableProduct, attributesNames.onModelAltImages)
            ),
            badge1: extractPrioritizedBadge(
              swatchOfAvailableProduct,
              attributesNames,
              categoryType,
              excludeBadge,
              !isBundleProduct
            ),
            badge2: extractAttributeValue(swatchOfAvailableProduct, attributesNames.extendedSize),
            badge3: extractAttributeValue(swatchOfAvailableProduct, attributesNames.merchant),
            listPrice: getListPrice(swatchOfAvailableProduct),
            offerPrice: processHelpers.getOfferPrice(swatchOfAvailableProduct),
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
  const childLength = processHelpers.getChildLength(bucketingSeqConfig);
  const catMap = processHelpers.getCatMap(product, bucketingSeqConfig);
  // Check if the current product has a category path attribute which containes the categories it is the part of.
  if (product.categoryPath3) {
    for (let idx = 0; idx < childLength; idx += 1) {
      // DTN-7945: The product can be tagged in two L3's but as now we are triggering mutiple l3 calls in new UNBXD approach
      // The product will get tagged to the first match it finds in its own categoryPath3_fq. but ideally it should match the
      // current l3 for which the products are bieng fetched.
      const requiredL3 = processHelpers.getRequiredL3(
        shouldApplyUnbxdLogic,
        bucketingSeqConfig,
        idx
      );
      const temp = product.categoryPath3.find(category => category === requiredL3);
      if (catMapExists(temp, catMap, bucketingSeqConfig)) {
        categoryName = temp;
      }
      // if category name is found then break the loop.
      if (categoryName) {
        break;
      }
    }
  }
  response.loadedProductsPages[0].push({
    productInfo: {
      generalProductId: getGeneralProductId(product),
      name: product.product_name,
      pdpUrl: getPdpUrl(isBundleProduct, product),
      uniqueId: product.uniqueId,
      shortDescription: product.product_short_description,
      longDescription: product.product_short_description,
      // Meeting with Varun for alignment of this value.
      isGiftCard: processHelpers.isGiftCard(product),
      listPrice: processHelpers.getListPriceResponse(product),
      offerPrice: processHelpers.getOfferPriceResponse(product),
      ratings: getRating(product),
      reviewsCount: getReview(product),
      bundleProduct: isBundleProduct,
      unbxdId: getUnbxdIdFromReq(res.headers),
      promotionalMessage: getPromotionalMessage(product),
      promotionalPLCCMessage: getPromotionalPLCCMessage(product),
      long_product_title: product.long_product_title || '',
    },
    miscInfo: {
      rating: getMiscInfoRating(product),
      // yet again, we need to dig from multiple sources just to get a simple string value
      categoryName,
    },
    colorsMap,
    imagesByColor,
  });
};
