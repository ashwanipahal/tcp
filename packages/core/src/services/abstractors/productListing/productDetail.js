/* eslint-disable */
import { executeUnbxdAPICall } from '../../handler';
import endpoints from '../../endpoints';
import { isClient } from '../../../utils';
import { parseBoolean } from './productParser';

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
  return categoryColorId && parseCategoryEntity(categoryColorId, breadCrumbs);
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

const getColorfitsSizesMap = (
  productVariants,
  isGiftCard,
  breadCrumbs,
  getImgPath,
  imagesByColor
) => {
  return productVariants.map(itemColor => {
    const { productImages, colorSwatch } = getImgPath(itemColor.imagename);
    const colorName = getProductColorName(isGiftCard, itemColor);
    const familyName = getFamilyName(isGiftCard, itemColor);
    const categoryColorId = getCategoryColorId(itemColor);
    const categoryEntity = getCategoryEntity(categoryColorId, breadCrumbs);
    const bossDisabledFlags = {
      bossProductDisabled:
        extractAttributeValue(itemColor, getProductAttributes().bossProductDisabled) || 0,
      bossCategoryDisabled:
        extractAttributeValue(itemColor, getProductAttributes().bossCategoryDisabled) || 0,
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
          isBopisProduct(apiHelper.configOptions.isUSStore, itemColor) && !isGiftCard(itemColor),
        isBossEligible: isBossProduct(bossDisabledFlags) && !isGiftCard(itemColor),
        badge1: isBundleProduct
          ? extractPrioritizedBadge(itemColor, productAttributes, '', excludeBage)
          : extractPrioritizedBadge(getFirstVariant(itemColor), productAttributes, '', excludeBage),
        badge2: extractAttributeValue(itemColor, productAttributes.merchant),
        isClearance: extractAttributeValue(itemColor, getProductAttributes().clearance),
        hasOnModelAltImages: extractAttributeValue(
          itemColor,
          getProductAttributes().onModelAltImages
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
      unbxdId: getUnbxdId(),
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
}) => ({
  breadCrumbTrail: [],
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
    unbxdId: getUnbxdId(),
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
  Object.keys(currentColorFitsSizesMap).sort(
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

const getColorVariants = (colorVariant, currentColorFitsSizesMap) => {
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
  return currentColorFitsSizesMap;
};

const parseProductFromAPI = (
  product,
  colorIdOrSeoKeyword,
  dontFetchExtraImages,
  getImgPath,
  breadCrumbs,
  excludeBage,
  isBundleProduct
) => {
  const baseProduct = getBaseProduct(product); // Getting multiple products as color variants
  const productVariants = getProductVariants(product);
  const isGiftCard = isGiftCard(baseProduct); // TBD: backend to confirm whether partNumber will always be giftCardBundle for gift cards.
  const productAttributes = getProductAttributes();
  const hasFit = false;
  const hasInventory = false;
  let alternateSizes;
  let defaultColorAlternateSizes;
  let otherColorAlternateSizes;

  const hasAdditionalStyles = false;
  const imagesByColor = {};
  //const imagesByColor = extractExtraImages(rawColors, baseProduct.alt_img, getImgPath);

  // This color map is used as an intermediary step to help consolidate all sizes under fits
  const colorsFitsMap = {};
  for (let colorVariant of productVariants) {
    const color = getProductColorName(isGiftCard, colorVariant);
    const currentColorFitsSizesMap = {};

    const fitName = '';
    if (isColorVariant) {
      currentColorFitsSizesMap = getColorVariants(colorVariant, currentColorFitsSizesMap);
    }

    if (fitName) {
      hasFit = true;
    }
    const hasDefaultFit = false;
    let sortOptions = {
      regular: 1,
      slim: 2,
      plus: 3,
      husky: 4,
      other: 5,
    };
    let sortedKeys = getSortedKeys(currentColorFitsSizesMap, sortOptions);
    colorsFitsMap[color] = sortedKeys.map(fitName => {
      let isDefaultFit = fitName.toLowerCase() === 'regular';
      hasDefaultFit = getHasDefaultFit(hasDefaultFit, isDefaultFit);

      return {
        fitName,
        isDefault: isDefaultFit,
        maxAvailable: validateQuantityAvailable(currentColorFitsSizesMap[fitName]),
        sizes: convertMultipleSizeSkusToAlternatives(currentColorFitsSizesMap[fitName]),
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

  const colorFitsSizesMap = getColorfitsSizesMap(
    productVariants,
    isGiftCard,
    breadCrumbs,
    getImgPath,
    imagesByColor
  );

  const reviewsCount = getReviewsCountProduct(baseProduct);
  const categoryPathMap = getCategoryPathMap(baseProduct);
  const categoryPath = getCategory(baseProduct);
  const categoryId = getCategoryId(breadCrumbs, baseProduct, categoryPath);

  processResponse({
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
  });
};

/**
 * @function getProductInfoById
 * @summary This will get product info and all color/sizes for that product
 */
const getProductInfoById = (
  productColorId,
  getImgPath,
  breadCrumbs,
  excludeBage,
  isRadialInvEnabled,
  isBundleProduct
) => {
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

  return apiHelper
    .webServiceCall(payload)
    .then(res => {
      if (apiHelper.responseContainsErrors(res)) {
        // Fix this - throw new ServiceResponseError(res);
      }
      return parseProductFromAPI(
        res.body.response.products,
        productColorId,
        false,
        getImgPath,
        breadCrumbs,
        excludeBage,
        isBundleProduct
      );
    })
    .catch(err => {
      if (err && ((err.status >= 400 && err.status <= 404) || err.status === 500) && isClient()) {
        // TODO - fix this - window.location.href = getErrorPagePath(this.apiHelper._configOptions.siteId);
      }
      throw apiHelper.getFormattedError(err);
    });
};

export default getProductInfoById;
