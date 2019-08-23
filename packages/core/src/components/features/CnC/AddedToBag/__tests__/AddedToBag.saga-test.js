import { put, takeLatest } from 'redux-saga/effects';
// import { validateReduxCache } from '../../../../../../utils/cache.util';
import { addToCartEcom, addItemToCartBopis, AddedToBagSaga } from '../container/AddedToBag.saga';
import { SetAddedToBagData, openAddedToBag } from '../container/AddedToBag.actions';
import ADDEDTOBAG_CONSTANTS from '../AddedToBag.constants';
import BAG_PAGE_ACTIONS from '../../BagPage/container/BagPage.actions';

describe('Added to bag saga', () => {
  it('should dispatch addToCartEcomGen action for success resposnse', () => {
    const payload = {
      skuInfo: {
        skuId: 'fgfdgfdg',
      },
      quantity: 1,
      wishlistItemId: '333',
    };
    const addToCartEcomGen = addToCartEcom({ payload });
    addToCartEcomGen.next();

    const response = {
      orderId: '1234',
      orderItemId: '1111',
    };
    const res = {
      ...payload,
      orderId: '1234',
      orderItemId: '1111',
    };
    let putDescriptor = addToCartEcomGen.next(response).value;
    expect(putDescriptor).toEqual(put(SetAddedToBagData(res)));
    const err = {
      ...response,
      body: {
        error: 'error',
      },
    };

    const addToCartEcomGen1 = addToCartEcom({ payload });
    addToCartEcomGen1.next();

    const putDescriptorError = addToCartEcomGen1.next(err).value;
    expect(putDescriptorError).toEqual(
      put({
        payload: {
          body: {
            error: 'error',
          },
          orderId: '1234',
          orderItemId: '1111',
          quantity: 1,
          skuInfo: {
            skuId: 'fgfdgfdg',
          },
          wishlistItemId: '333',
        },
        type: 'SET_ADDED_TO_BAG',
      })
    );

    putDescriptor = addToCartEcomGen.next().value;
    expect(putDescriptor).toEqual(put(openAddedToBag()));
    putDescriptor = addToCartEcomGen.next().value;
    expect(putDescriptor).toEqual(put(BAG_PAGE_ACTIONS.getOrderDetails()));
  });

  it('should dispatch addToCartBopis', () => {
    const payload = {
      storeLocId: '345',
      isBoss: true,
      quantity: '1',
      skuInfo: { skuId: 'skuId', variantId: 'variantId', variantNo: 'variantNo' },
    };
    const addItemToCartBopisGen = addItemToCartBopis({ payload });
    addItemToCartBopisGen.next();

    const res = {
      ...payload,
      orderItemId: '1111',
    };
    const response = {
      orderItemId: '1111',
    };
    let putDescriptor = addItemToCartBopisGen.next(response).value;
    expect(putDescriptor).toEqual(put(SetAddedToBagData(res)));
    const err = {
      ...response,
      body: {
        error: 'error',
      },
    };

    const addItemToCartBopisGen1 = addItemToCartBopis({ payload });
    addItemToCartBopisGen1.next();
    const putDescriptorError = addItemToCartBopisGen1.next(err).value;
    expect(putDescriptorError).toEqual(
      put({
        payload: {
          body: {
            error: 'error',
          },
          isBoss: true,
          orderItemId: '1111',
          quantity: '1',
          skuInfo: {
            skuId: 'skuId',
            variantId: 'variantId',
            variantNo: 'variantNo',
          },
          storeLocId: '345',
        },
        type: 'SET_ADDED_TO_BAG',
      })
    );
    putDescriptor = addItemToCartBopisGen.next().value;
    expect(putDescriptor).toEqual(
      put({
        type: 'OPEN_ADDED_TO_BAG',
      })
    );
  });

  describe('CardListSaga', () => {
    it('should return correct takeLatest effect', () => {
      const generator = AddedToBagSaga();
      expect(generator.next().value.toString()).toMatch(
        takeLatest(ADDEDTOBAG_CONSTANTS.ADD_TO_CART_ECOM, addToCartEcom).toString()
      );
      expect(generator.next().value.toString()).toMatch(
        takeLatest(ADDEDTOBAG_CONSTANTS.ADD_TO_CART_BOPIS, addItemToCartBopis).toString()
      );
    });
  });
});
