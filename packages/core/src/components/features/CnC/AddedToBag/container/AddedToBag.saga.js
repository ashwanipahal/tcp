import { call, takeLatest, put } from 'redux-saga/effects';
import { validateReduxCache } from '../../../../../utils/cache.util';
import ADDEDTOBAG_CONSTANTS from '../AddedToBag.constants';
import fetchData from '../../../../../service/API';
import { AddToCartError , SetAddedToBagData, openAddedToBag} from './AddedToBag.actions';
import endpoints from '../../../../../service/endpoint';

export function* addToCartEcom({ payload }) {
  try {
    const sku = payload.skuInfo.skuId;
    const qty = payload.quantity;
    const wishlistItemId = payload.wishlistItemId;

    const params = {
      payload: {
        storeId: 10151,
        catalogId: 10551,
        langId: '-1',
        orderId: '.',
        field2: '0',
        requesttype: 'ajax',
        catEntryId: sku,
        quantity: qty.toString(),
        'calculationUsage[]': '-7',
        externalId: wishlistItemId || ''
      },
      langId: -1,
      storeId: 10151,
      catalogId: 10551,
    };
    const { relURI, method } = endpoints.addProductToCart;
    const baseURI = endpoints.addProductToCart.baseURI || endpoints.global.baseURI;
    const res = yield call(fetchData, baseURI, relURI, params, method);
    if (res.body) {
      yield put(SetAddedToBagData({
        ...payload,
        orderId: res.body.orderId && res.body.orderId[0],
        orderItemId: res.body.orderItemId && res.body.orderItemId[0]
      }));
      yield put(openAddedToBag());
      // return yield put(setCardList(res.body.creditCardListJson || []));
    }else {
      yield put(AddToCartError(res.error));
    }

  } catch (err) {
    // yield put(SetAddedToBagData({
    //   ...cartItemInfo,
    // }));
    // yield put(openAddedToBag());
    yield put(AddToCartError(err));
  }
}

// addItemToCart(sku, quantity, wishlistId) {
//   let payload = {
//     header: {
//     },
//     body: {
//       // comment:62132,
//       'calculationUsage[]': '-7',
//       storeId: this.apiHelper._configOptions.storeId,
//       catalogId: this.apiHelper._configOptions.catalogId,
//       langId: this.apiHelper._configOptions.langId,
//       orderId: '.',
//       field2: '0',
//       requesttype: 'ajax',
//       catEntryId: sku,
//       quantity: quantity.toString(),
//       externalId: wishlistId
//     },
//     webService: endpoints.addProductToCart
//   };

//   return this.apiHelper.webServiceCall(payload).then((res) => {
//     if (this.apiHelper.responseContainsErrors(res)) {
//       throw new ServiceResponseError(res);
//     }
//     return {
//       orderId: res.body.orderId && res.body.orderId[0],
//       orderItemId: res.body.orderItemId && res.body.orderItemId[0]
//     };
//   }).catch((err) => {
//     throw this.apiHelper.getFormattedError(err);
//   });
// }

export function* AddedToBagSaga() {
  // const cachedCardList = validateReduxCache(getCardList);
  yield takeLatest(ADDEDTOBAG_CONSTANTS.ADD_TO_CART_ECOM, addToCartEcom);
}

export default AddedToBagSaga;
