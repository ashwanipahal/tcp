import { call, put, select, delay } from 'redux-saga/effects';
import { addToCartEcom } from '../../AddedToBag/container/AddedToBag.actions';
import { isRemembered } from '../../Checkout/container/Checkout.selector';
import { getUserLoggedInState } from '../../../account/User/container/User.selectors';
import BAG_PAGE_ACTIONS from './BagPage.actions';
import BAG_SELECTORS from './BagPage.selectors';
import { isCanada } from '../../../../../utils';
import BAGPAGE_CONSTANTS from '../BagPage.constants';
import { getServerErrorMessage } from '../../../../../services/abstractors/CnC';
import { addItemToSflList } from '../../../../../services/abstractors/CnC/SaveForLater';
import { imageGenerator } from '../../../../../services/abstractors/CnC/CartItemTile';

export function* startSflItemDelete({ payload: { catEntryId } = {} } = {}) {
  const isRememberedUser = yield select(isRemembered);
  const isRegistered = yield select(getUserLoggedInState);
  const countryCurrency = yield select(BAG_SELECTORS.getCurrentCurrency);
  const isCanadaSIte = isCanada();
  try {
    const res = yield call(
      addItemToSflList,
      catEntryId,
      isRememberedUser,
      isRegistered,
      imageGenerator,
      countryCurrency,
      isCanadaSIte,
      true
    );
    yield put(BAG_PAGE_ACTIONS.setSflData(res.sflItems));
    if (res.errorResponse && res.errorMessage) {
      const resErr = res.errorMessage[Object.keys(res.errorMessage)[0]];
      yield put(BAG_PAGE_ACTIONS.setCartItemsSflError(resErr));
    } else {
      yield put(BAG_PAGE_ACTIONS.setSflItemDeleted(true));
      yield delay(BAGPAGE_CONSTANTS.ITEM_SFL_SUCCESS_MSG_TIMEOUT);
      yield put(BAG_PAGE_ACTIONS.setSflItemDeleted(false));
    }
  } catch (err) {
    const errorsMapping = yield select(BAG_SELECTORS.getErrorMapping);
    yield put(BAG_PAGE_ACTIONS.setCartItemsSflError(getServerErrorMessage(err, errorsMapping)));
  }
}

export function* startSflItemMoveToBag({ payload }) {
  try {
    const { itemId } = payload;
    const addToCartData = {
      skuInfo: {
        skuId: itemId,
      },
      quantity: 1,
      fromMoveToBag: true,
    };
    yield put(addToCartEcom(addToCartData));
    yield put(
      BAG_PAGE_ACTIONS.getCartData({
        isRecalculateTaxes: true,
        recalcRewards: true,
        translation: true,
        excludeCartItems: false,
      })
    );
    // yield put(BAG_PAGE_ACTIONS.getOrderDetails());
    yield put(BAG_PAGE_ACTIONS.startSflItemDelete(payload));
  } catch (err) {
    yield put(BAG_PAGE_ACTIONS.setCartItemsSflError(err));
  }
}
