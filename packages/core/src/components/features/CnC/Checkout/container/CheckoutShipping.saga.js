/* eslint-disable extra-rules/no-commented-out-code */
import { call, put, select } from 'redux-saga/effects';
import { CHECKOUT_ROUTES } from '../Checkout.constants';
import selectors, { isGuest } from './Checkout.selector';
import { getUserEmail } from '../../../account/User/container/User.selectors';
import utility from '../util/utility';
import { setShippingLoadingState } from './Checkout.action';
import { isCanada } from '../../../../../utils/utils';
import { getAddressList } from '../../../account/AddressBook/container/AddressBook.saga';
import { getCardList } from '../../../account/Payment/container/Payment.saga';

const { redirectToBilling } = utility;

export function* submitShippingSectionData({ payload: { navigation, ...formData } }, callback) {
  try {
    yield put(setShippingLoadingState(true));

    const {
      // giftWrap,
      method,
      smsInfo,
      shipTo,
    } = formData;
    let {
      shipTo: { emailAddress },
    } = formData;
    const isCanadaUser = yield select(isCanada);
    const isGuestUser = yield select(isGuest);
    const isEmailSignUpAllowed = !(!isCanadaUser && isGuestUser);
    const recalcFlag = false;
    if (!emailAddress || !isGuestUser) {
      // on registered user entering a new address the email field is not visible -> emailAddress = null
      emailAddress = yield select(getUserEmail);
    }
    // let getGiftWrappingValues = yield select(getGiftWrappingValues);
    // let initialGiftWrappingVal = getGiftWrappingValues.hasGiftWrapping;
    // const giftWrappingStoreOptionID = getGiftWrappingValues.optionId;
    // // If the giftwrapping option differs from the initial state
    // // Recalculate true needs to be sent as true
    // if (
    //   initialGiftWrappingVal !== giftWrap.hasGiftWrapping ||
    //   (giftWrappingStoreOptionID && giftWrap.optionId !== giftWrappingStoreOptionID)
    // ) {
    //   recalcFlag = true;
    // }
    if (callback) {
      yield callback({
        ...shipTo,
        method,
        smsInfo,
        isEmailSignUpAllowed,
        recalcFlag,
        emailAddress,
      });
    }
    yield call(getAddressList);
    yield call(getCardList);
    const isVenmoInProgress = yield select(selectors.isVenmoPaymentInProgress);
    const isVenmoShippingDisplayed = yield select(selectors.isVenmoShippingBannerDisplayed);
    if (isVenmoInProgress && !isVenmoShippingDisplayed) {
      utility.routeToPage(CHECKOUT_ROUTES.reviewPage, { recalc: false });
    } else {
      redirectToBilling(navigation);
    }
    yield put(setShippingLoadingState(false));
  } catch (err) {
    yield put(setShippingLoadingState(false));
    // throw getSubmissionError(store, 'submitShippingSection', err);
  }
}

export function* submitVerifiedAddressData({ payload: { submitData, shippingAddress } }, callback) {
  const {
    address1: addressLine1,
    address2: addressLine2,
    zip: zipCode,
    ...restAddressData
  } = shippingAddress;
  const payloadData = submitData;
  const shipAddress = {
    ...payloadData.shipTo.address,
    addressLine1,
    addressLine2,
    zipCode,
    ...restAddressData,
  };
  payloadData.shipTo.address = shipAddress;
  payloadData.shipTo.phoneNumber = shipAddress.phoneNumber;
  yield submitShippingSectionData({ payload: { ...payloadData } }, callback);
}
