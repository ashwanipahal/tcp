import { put, takeLatest } from 'redux-saga/effects';
// import { validateReduxCache } from '../../../../../../utils/cache.util';
import { addToCartEcom, addItemToCartBopis, AddedToBagSaga } from '../container/AddedToBag.saga';
import { SetAddedToBagData } from '../container/AddedToBag.actions';
import ADDEDTOBAG_CONSTANTS from '../AddedToBag.constants';

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

    const res = {
      ...payload,
      orderId: '1234',
      orderItemId: '1111',
    };
    const response = {
      body: {
        orderId: ['1234'],
        orderItemId: ['1111'],
      },
    };
    const putDescriptor = addToCartEcomGen.next(response).value;
    expect(putDescriptor).toEqual(put(SetAddedToBagData(res)));
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
