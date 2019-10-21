import { put, takeLatest } from 'redux-saga/effects';
// import { validateReduxCache } from '../../../../../../utils/cache.util';
import {
  addToCartEcom,
  addItemToCartBopis,
  AddedToBagSaga,
  addMultipleItemToCartECOM,
} from '../container/AddedToBag.saga';
import {
  SetAddedToBagData,
  openAddedToBag,
  AddToPickupError,
  AddToCartMultipleItemError,
} from '../container/AddedToBag.actions';
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

    addToCartEcomGen1.next(err);

    putDescriptor = addToCartEcomGen.next().value;
    expect(putDescriptor).toEqual(put(openAddedToBag()));

    putDescriptor = addToCartEcomGen.next().value;
    expect(putDescriptor).toEqual(put(BAG_PAGE_ACTIONS.getOrderDetails()));
  });

  it('should dispatch addToCartBopis', () => {
    const payload = {
      productInfo: {
        storeLocId: '345',
        isBoss: true,
        quantity: '1',
        skuInfo: { skuId: 'skuId', variantId: 'variantId', variantNo: 'variantNo' },
      },
    };
    const addItemToCartBopisGen = addItemToCartBopis({ payload });
    addItemToCartBopisGen.next();
    addItemToCartBopisGen.next();
    addItemToCartBopisGen.next();

    const response = {
      orderItemId: '1111',
    };
    const res = {
      ...payload.productInfo,
      ...response,
    };
    const putDescriptor = addItemToCartBopisGen.next(response).value;
    expect(putDescriptor).toEqual(put(SetAddedToBagData(res)));
    const err = {
      ...response,
      body: {
        error: 'error',
      },
    };

    const addItemToCartBopisGen1 = addItemToCartBopis({ payload });

    addItemToCartBopisGen1.next();
    addItemToCartBopisGen1.next();
    addItemToCartBopisGen1.throw(err);
    expect(addItemToCartBopisGen1.next().value).toEqual(put(AddToPickupError('ERROR')));
  });

  it('should dispatch AddToCartMultipleItemError In Error', () => {
    const payload = {
      productItemsInfo: [
        {
          storeLocId: '345',
          isBoss: true,
          quantity: '1',
          skuInfo: { skuId: 'skuId', variantId: 'variantId', variantNo: 'variantNo' },
        },
      ],
    };
    const err = {
      error: { errorResponse: { errorMessage: 'Error' } },
      errorProductId: 1,
      atbSuccessProducts: [],
    }; // [] with zero length
    const atbError = { errMsg: 'Error', errorProductId: 1 };
    const addMultipleItemToCartECOMGenError = addMultipleItemToCartECOM({ payload });
    addMultipleItemToCartECOMGenError.next();
    expect(addMultipleItemToCartECOMGenError.throw(err).value).toEqual(
      put(AddToCartMultipleItemError(atbError))
    );

    const errorObj = {
      error: { errorResponse: { errorMessage: 'Error' } },
      errorProductId: 1,
      atbSuccessProducts: [1],
    }; // [] with 1 length
    const atbErrorSecondProduct = { errMsg: 'Error', errorProductId: 1 };
    const addMultipleItemToCartECOMGenSecondError = addMultipleItemToCartECOM({ payload });
    addMultipleItemToCartECOMGenSecondError.next();
    addMultipleItemToCartECOMGenSecondError.throw(errorObj);
    expect(addMultipleItemToCartECOMGenSecondError.next().value).toEqual(
      put(AddToCartMultipleItemError(atbErrorSecondProduct))
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
