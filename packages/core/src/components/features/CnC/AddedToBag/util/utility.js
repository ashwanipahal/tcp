import {
  getSkuId,
  getMapSliceForColor,
  getVariantId,
} from '../../../browse/ProductListingPage/util/utility';

export const getCartItemInfo = (productInfoOrWishlistItem, customizationInfo) => {
  if (productInfoOrWishlistItem.productInfo) {
    // productInfoOrWishlistItem is a wishlistItem
    let {
      productInfo: { name, isGiftCard },
      skuInfo,
    } = productInfoOrWishlistItem;
    return { isGiftCard, productName: name, skuInfo, quantity: 1 };
  } else {
    // productInfoOrWishlistItem is a productInfo
    let { color, fit, size, quantity } = customizationInfo;
    let { name, colorFitsSizesMap, isGiftCard, imagesByColor } = productInfoOrWishlistItem;
    return {
      isGiftCard,
      productName: name,
      skuInfo: {
        skuId: getSkuId(colorFitsSizesMap, color, fit, size),
        imageUrl:
          imagesByColor[color].basicImageUrl ||
          (imagesByColor[color].extraImages[0] || {}).iconSizeImageUrl,
        color: getMapSliceForColor(colorFitsSizesMap, color).color,
        variantId: getVariantId(colorFitsSizesMap, color, fit, size),
        unbxdProdId: productInfoOrWishlistItem.unbxdProdId,
        productId: productInfoOrWishlistItem.generalProductId,
        fit,
        size,
      },
      quantity,
      wishlistItemId: customizationInfo.wishlistItemId || (productInfoOrWishlistItem.itemInfo && productInfoOrWishlistItem.itemInfo.itemId)
    };
  }
};
