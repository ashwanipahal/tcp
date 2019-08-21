/**
 * These are temporary changes for a dummy login page
 */
// TODO: Need fix unused/proptypes eslint error

import { call, takeLatest, put } from 'redux-saga/effects';
import { parseProductFromAPI } from '@tcp/core/src/components/features/browse/ProductListingPage/container/ProductListingPage.dataMassage';
import { getImgPath } from '@tcp/core/src/components/features/browse/ProductListingPage/util/utility';
import CARTPAGE_CONSTANTS from '../CartItemTile.constants';

import fetchData from '../../../../../service/API';
import {
  removeCartItemComplete,
  updateCartItemComplete,
  getProductSKUInfoSuccess,
} from './CartItemTile.actions';
import BAG_PAGE_ACTIONS from '../../BagPage/container/BagPage.actions';
import endpoints from '../../../../../service/endpoint';
import { removeItem, updateItem } from '../../../../../services/abstractors/CnC';

export function* removeCartItem({ payload }) {
  try {
    const res = yield call(removeItem, payload);
    yield put(removeCartItemComplete(res));
    yield put(BAG_PAGE_ACTIONS.getOrderDetails());
  } catch (err) {
    console.log(err);
  }
}

export function* updateCartItemSaga({ payload }) {
  try {
    const res = yield call(updateItem, payload);
    yield put(updateCartItemComplete(res));
    yield put(BAG_PAGE_ACTIONS.getOrderDetails());
  } catch (err) {
    console.log(err);
  }
}

export function* getProductSKUInfoSaga(payload) {
  // const res = yield call(getProductSkuInfoByUnbxd, payload);
  // yield put(updateCartItemComplete(res));

  const productId = payload.payload;
  const relURI = `/8870d5f30d9bebafac29a18cd12b801d/qa1-childrensplace-com702771542012808/search?variants=true&variants.count=100&version=V2&rows=20&pagetype=boolean&q=${productId}&promotion=false&fields=alt_img,style_partno,giftcard,TCPProductIndUSStore,TCPWebOnlyFlagUSStore,TCPWebOnlyFlagCanadaStore,TCPFitMessageUSSstore,TCPFit,product_name,TCPColor,top_rated,imagename,productid,uniqueId,favoritedcount,TCPBazaarVoiceReviewCount,categoryPath3_catMap,categoryPath2_catMap,product_short_description,style_long_description,min_list_price,min_offer_price,TCPBazaarVoiceRating,product_long_description,seo_token,variantCount,prodpartno,variants,v_tcpfit,v_qty,v_tcpsize,style_name,v_item_catentry_id,v_listprice,v_offerprice,v_qty,variantId,auxdescription,list_of_attributes,additional_styles,TCPLoyaltyPromotionTextUSStore,TCPLoyaltyPLCCPromotionTextUSStore,v_variant,%20low_offer_price,%20high_offer_price,%20low_list_price,%20high_list_price,long_product_title&uid=uid-1562746344280-64813`;
  try {
    const { baseURI, method } = endpoints.getProductSkuInfo;
    // need to do this call using abstractor
    const res = yield call(
      fetchData,
      baseURI,
      relURI,
      {
        unbxd: true,
        q: payload.payload,
      },
      method
    );
    const product = res.body.response.products;
    const formattedInfo = parseProductFromAPI(
      product,
      product.uniqueId,
      false,
      getImgPath,
      false,
      false
    );
    yield put(getProductSKUInfoSuccess(formattedInfo));
  } catch (err) {
    console.log(err);
  }
}

export function* CartPageSaga() {
  yield takeLatest(CARTPAGE_CONSTANTS.REMOVE_CART_ITEM, removeCartItem);
  yield takeLatest(CARTPAGE_CONSTANTS.UPDATE_CART_ITEM, updateCartItemSaga);
  yield takeLatest(CARTPAGE_CONSTANTS.GET_PRODUCT_SKU_INFO, getProductSKUInfoSaga);
}

export default CartPageSaga;
