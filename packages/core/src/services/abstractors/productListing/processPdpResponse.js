const getIsGiftCard = (isGiftCard, baseProduct) => {
  return isGiftCard ? 'Gift Card' : baseProduct.product_name;
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

const processPdpResponse = ({
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
}) => {
  return {
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
      swatchimage: baseProduct.swatchimage,
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
  };
};

export default processPdpResponse;
