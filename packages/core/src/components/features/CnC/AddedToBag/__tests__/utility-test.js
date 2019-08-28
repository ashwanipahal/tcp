import { getCartItemInfo } from '../util/utility';
import {
  getSkuId,
  getMapSliceForColor,
  getVariantId,
  getMapSliceForSize,
} from '../../../browse/ProductListingPage/util/utility';

jest.mock('../../../browse/ProductListingPage/util/utility', () => ({
  getSkuId: jest.fn(),
  getMapSliceForColor: jest.fn(),
  getVariantId: jest.fn(),
  getMapSliceForSize: jest.fn(),
}));

describe('utility', () => {
  it('#getCartItemInfo if  productInfo', () => {
    const productInfoOrWishlistItem = {
      productInfo: {
        name: 'product',
        isGiftCard: false,
      },
      skuInfo: '12345',
    };
    const obj = {
      isGiftCard: false,
      productName: 'product',
      skuInfo: '12345',
      quantity: 1,
    };
    expect(getCartItemInfo(productInfoOrWishlistItem)).toMatchObject(obj);
  });
  it('#getCartItemInfo if productInfo  is not present', () => {
    getMapSliceForSize.mockImplementation(() => {
      return { variantNo: '123' };
    });
    getSkuId.mockImplementation(() => '12345');
    getMapSliceForColor.mockImplementation(() => {
      return { color: 'yellow' };
    });
    getVariantId.mockImplementation(() => '123');
    const productInfoOrWishlistItem = {
      name: 'product name',
      colorFitsSizesMap: {},
      isGiftCard: false,
      imagesByColor: { yellow: { basicImageUrl: 'url' } },
      unbxdProdId: '234',
      generalProductId: '134',
    };
    const customizationInfo = {
      wishlistItemId: '456',
      color: 'yellow',
      fit: 'XS',
      size: 'S',
      quantity: 1,
      isBoss: false,
      storeLocId: '10515',
      brand: 'A',
    };
    const obj = {
      isGiftCard: false,
      productName: 'product name',
      skuInfo: {
        skuId: '12345',
        imageUrl: 'url',
        color: 'yellow',
        variantId: '123',
        variantNo: '123',
        unbxdProdId: productInfoOrWishlistItem.unbxdProdId,
        productId: productInfoOrWishlistItem.generalProductId,
        fit: customizationInfo.fit,
        size: customizationInfo.size,
      },
      quantity: customizationInfo.quantity,
      isBoss: customizationInfo.isBoss,
      storeLocId: customizationInfo.storeLocId,
      brand: customizationInfo.brand,
      wishlistItemId: '456',
    };
    expect(getCartItemInfo(productInfoOrWishlistItem, customizationInfo)).toMatchObject(obj);
  });
});
