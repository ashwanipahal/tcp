/* eslint-disable import/prefer-default-export */
import {
  getSkuId,
  getMapSliceForColor,
  getVariantId,
} from '../../../browse/ProductListingPage/util/utility';

export const getCartItemInfo = (productInfoOrWishlistItem, customizationInfo) => {
  let obj = {};
  if (productInfoOrWishlistItem.productInfo) {
    // productInfoOrWishlistItem is a wishlistItem

    const {
      productInfo: { name, isGiftCard },
      skuInfo,
    } = productInfoOrWishlistItem;
    obj = {
      isGiftCard,
      productName: name,
      skuInfo,
      quantity: 1,
    };
  } else {
    // productInfoOrWishlistItem is a productInfo
    const { color, fit, size, quantity } = customizationInfo;
    const { name, colorFitsSizesMap, isGiftCard, imagesByColor } = productInfoOrWishlistItem;
    obj = {
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
      wishlistItemId:
        customizationInfo.wishlistItemId ||
        (productInfoOrWishlistItem.itemInfo && productInfoOrWishlistItem.itemInfo.itemId),
    };
  }
  return obj;
};
