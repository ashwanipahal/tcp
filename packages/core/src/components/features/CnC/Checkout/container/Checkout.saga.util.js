/* eslint-disable max-lines */
/* eslint-disable extra-rules/no-commented-out-code */
import { call, put, select } from 'redux-saga/effects';
import {
  setPlccEligible,
  setPlccPrescreenCode,
} from '@tcp/core/src/components/features/browse/ApplyCardPage/container/ApplyCard.actions';
import { toggleApplyNowModal } from '@tcp/core/src/components/common/molecules/ApplyNowPLCCModal/container/ApplyNowModal.actions';
import { getRtpsPreScreenData } from '@tcp/core/src/components/features/browse/ApplyCardPage/container/ApplyCard.selectors';
import { setLoaderState } from '@tcp/core/src/components/common/molecules/Loader/container/Loader.actions';
import logger from '../../../../../utils/loggerInstance';
import selectors, { isGuest, isExpressCheckout } from './Checkout.selector';
import {
  setShippingMethodAndAddressId,
  getVenmoToken,
  addPickupPerson,
  updateRTPSData,
  getServerErrorMessage,
  acceptOrDeclinePreScreenOffer,
  getGiftWrappingOptions,
} from '../../../../../services/abstractors/CnC/index';
// eslint-disable-next-line
import { getCartDataSaga } from '../../BagPage/container/BagPage.saga';
import { getUserEmail } from '../../../account/User/container/User.selectors';
import { getAddressListState } from '../../../account/AddressBook/container/AddressBook.selectors';
import {
  addAddressGet,
  updateAddressPut,
} from '../../../../common/organisms/AddEditAddress/container/AddEditAddress.saga';
import { getAddressList } from '../../../account/AddressBook/container/AddressBook.saga';

import CHECKOUT_ACTIONS, {
  setOnFileAddressKey,
  setGiftWrap,
  getVenmoClientTokenSuccess,
  getVenmoClientTokenError,
  setSmsNumberForUpdates,
  getSetCheckoutStage,
  toggleCheckoutRouting,
  getSetGiftWrapOptionsActn,
} from './Checkout.action';
import utility from '../util/utility';
import constants, { CHECKOUT_ROUTES } from '../Checkout.constants';
import {
  addGiftWrappingOption,
  removeGiftWrappingOption,
} from '../../../../../services/abstractors/CnC/Checkout';
import { isMobileApp } from '../../../../../utils';
import BagPageSelectors from '../../BagPage/container/BagPage.selectors';
import { setIsExpressEligible } from '../../../account/User/container/User.actions';
import { getGiftWrapOptions } from '../organisms/ShippingPage/molecules/GiftServices/container/GiftServices.selector';

export function* addRegisteredUserAddress({ address, phoneNumber, emailAddress, setAsDefault }) {
  let addOrEditAddressResponse = null;
  const selectedAddressId = yield select(selectors.getOnFileAddressKey);
  const userAddresses = yield select(getAddressListState);
  const selectedAddress = userAddresses.find(item => item.addressId === selectedAddressId);
  if (selectedAddress) {
    addOrEditAddressResponse = { payload: { addressId: selectedAddressId } };
  } else {
    // const oldShippingDestination = yield select(getShippingDestinationValues);
    // let oldSelectedAddressBookEntry = yield select(
    //   getAddressByKey(store.getState(), oldShippingDestination.onFileAddressKey)
    // );
    // onFileAddressKey = !oldSelectedAddressBookEntry
    //   ? oldShippingDestination.onFileAddressKey
    //   : null;
    addOrEditAddressResponse = yield call(
      addAddressGet,
      {
        payload: {
          ...address,
          address1: address.addressLine1,
          address2: address.addressLine2 ? address.addressLine2 : '',
          zip: address.zipCode,
          phoneNumber,
          emailAddress,
          primary: `${setAsDefault}`,
          phone1Publish: 'false',
          fromPage: '',
        },
      },
      false // add to address book inside redux-store
    );
    addOrEditAddressResponse = { payload: { addressId: addOrEditAddressResponse.body.addressId } };
  }
  return addOrEditAddressResponse;
  // }
}

export function* updateShipmentMethodSelection({ payload }) {
  let addressId = yield select(selectors.getOnFileAddressKey);
  const currentStage = yield select(selectors.getCurrentCheckoutStage);
  if (!addressId && currentStage.toLowerCase() === constants.CHECKOUT_STAGES.REVIEW) {
    addressId = yield select(selectors.getShippingAddressID);
  }
  const smsSignUp = yield select(selectors.getShippingSmsSignUpFields);
  let transVibesSmsPhoneNo = null;
  if (smsSignUp) {
    transVibesSmsPhoneNo = smsSignUp.phoneNumber;
  }
  yield put(setLoaderState(true));
  try {
    yield call(
      setShippingMethodAndAddressId,
      payload.id,
      addressId,
      false, // generalStoreView.getIsPrescreenFormEnabled(storeState) && !giftWrap.hasGiftWrapping && !userStoreView.getUserIsPlcc(storeState)
      transVibesSmsPhoneNo,
      yield select(BagPageSelectors.getErrorMapping)
    );
    if (!payload.isAddressChange) {
      yield call(getCartDataSaga, {
        isRecalculateTaxes: true,
        excludeCartItems: false,
        recalcRewards: false,
        isCheckoutFlow: true,
        translation: false,
      });
    }
    yield put(setLoaderState(false));
  } catch (err) {
    yield put(setLoaderState(false));
    // throw getSubmissionError(store, 'submitShippingSection', err);
  }
}

export function* updateShippingAddress({ payload, after }) {
  const isGuestUser = yield select(isGuest);
  const {
    shipTo: { address, setAsDefault, phoneNumber, saveToAccount, onFileAddressKey },
  } = payload;
  let {
    shipTo: { emailAddress },
  } = payload;
  if (!emailAddress) {
    // on registered user entering a new address the email field is not visible -> emailAddress = null
    emailAddress = yield select(getUserEmail);
  }
  const userAddresses = yield select(getAddressListState);
  const selectedAddress =
    userAddresses && userAddresses.find(item => item.addressId === onFileAddressKey);
  const updateAddressResponse = yield call(updateAddressPut, {
    payload: {
      ...address,
      address1: address.addressLine1,
      address2: address.addressLine2 ? address.addressLine2 : '',
      zip: address.zipCode,
      phoneNumber,
      email: emailAddress,
      primary: setAsDefault ? `${setAsDefault}` : undefined,
      phone1Publish: saveToAccount,
      xcont_pageName: 'myAccount',
      nickName: selectedAddress.nickName,
    },
  });
  if (!isGuestUser) {
    yield call(getAddressList);
  }
  if (after) {
    after();
  }
  yield put(setOnFileAddressKey(updateAddressResponse.payload));
}

export function* addNewShippingAddress({ payload }) {
  const isGuestUser = yield select(isGuest);
  const {
    shipTo: { address, setAsDefault, phoneNumber, saveToAccount },
  } = payload;
  let {
    shipTo: { emailAddress },
  } = payload;
  if (!emailAddress) {
    // on registered user entering a new address the email field is not visible -> emailAddress = null
    emailAddress = yield select(getUserEmail);
  }
  const addAddressResponse = yield call(
    addAddressGet,
    {
      payload: {
        ...address,
        address1: address.addressLine1,
        address2: address.addressLine2 ? address.addressLine2 : '',
        zip: address.zipCode,
        phoneNumber,
        emailAddress,
        primary: `${setAsDefault}`,
        phone1Publish: `${saveToAccount}`,
        fromPage: '',
      },
    },
    true
  );
  if (!isGuestUser) {
    yield call(getAddressList);
  }
  yield put(setOnFileAddressKey(addAddressResponse.payload));
}

export function* routeToPickupPage(recalc) {
  yield call(utility.routeToPage, CHECKOUT_ROUTES.pickupPage, { recalc });
}

export function* addAndSetGiftWrappingOptions(payload, hasSetGiftOptions) {
  const errorMappings = yield select(BagPageSelectors.getErrorMapping);
  if (payload.hasGiftWrapping) {
    try {
      const res = yield call(addGiftWrappingOption, payload, errorMappings);
      if (res) {
        yield put(setGiftWrap(payload));
      }
    } catch (err) {
      // throw getSubmissionError(store, 'submitShippingSection', err);
    }
  } else if (hasSetGiftOptions) {
    try {
      const res = yield call(removeGiftWrappingOption, payload);
      if (res) {
        yield put(setGiftWrap(payload));
      }
    } catch (err) {
      // throw getSubmissionError(store, 'submitShippingSection', err);
    }
  }
}

export function* getVenmoClientTokenSaga(payload) {
  try {
    const response = yield call(getVenmoToken, payload.payload);
    yield put(getVenmoClientTokenSuccess(response));
  } catch (ex) {
    yield put(getVenmoClientTokenError({ error: 'Error' }));
  }
}
export function* saveLocalSmsInfo(smsInfo = {}) {
  let returnVal;
  const { wantsSmsOrderUpdates, smsUpdateNumber } = smsInfo;
  if (smsUpdateNumber) {
    if (wantsSmsOrderUpdates) {
      returnVal = yield put(setSmsNumberForUpdates(smsUpdateNumber));
    } else {
      returnVal = yield put(setSmsNumberForUpdates(null));
    }
  }
  return returnVal;
}

export function* addOrEditGuestUserAddress({
  oldShippingDestination,
  address,
  phoneNumber,
  emailAddress,
  saveToAccount,
  setAsDefault,
}) {
  let addOrEditAddressRes;
  if (!oldShippingDestination.onFileAddressKey) {
    // guest user that is using a new address
    addOrEditAddressRes = yield call(
      addAddressGet,
      {
        payload: {
          ...address,
          address1: address.addressLine1,
          address2: address.addressLine2 ? address.addressLine2 : '',
          zip: address.zipCode,
          phoneNumber,
          emailAddress,
          primary: setAsDefault,
          phone1Publish: `${saveToAccount}`,
          fromPage: 'checkout',
        },
      },
      false
    );
    addOrEditAddressRes = { payload: addOrEditAddressRes.body };
  } else {
    // guest user is editing a previously entered shipping address
    addOrEditAddressRes = yield call(
      updateAddressPut,
      {
        payload: {
          ...address,
          address1: address.addressLine1,
          address2: address.addressLine2 ? address.addressLine2 : '',
          zip: address.zipCode,
          phoneNumber,
          nickName: oldShippingDestination.onFileAddressKey,
          emailAddress,
        },
      },
      {}
    );
  }
  addOrEditAddressRes = { payload: addOrEditAddressRes };

  return addOrEditAddressRes;
}

export function* callPickupSubmitMethod(formData) {
  let emailAddress = '';
  let firstName = '';
  let lastName = '';
  if (formData.hasAlternatePickup && formData.pickUpAlternate) {
    ({ emailAddress, firstName, lastName } = formData.pickUpAlternate);
  }
  return yield call(addPickupPerson, {
    firstName: formData.pickUpContact.firstName,
    lastName: formData.pickUpContact.lastName,
    phoneNumber: formData.pickUpContact.phoneNumber,
    emailAddress:
      formData.pickUpContact.emailAddress ||
      (yield select(isGuest) ? yield select(getUserEmail) : ''),
    alternateEmail: emailAddress,
    alternateFirstName: firstName,
    alternateLastName: lastName,
  });
}

export function* redirectToBilling() {
  if (!isMobileApp()) {
    utility.routeToPage(CHECKOUT_ROUTES.billingPage);
  } else {
    yield put(getSetCheckoutStage(constants.BILLING_DEFAULT_PARAM));
  }
}

function* updateUserRTPSData(payload) {
  const { prescreen, isExpressCheckoutEnabled, navigation } = payload;
  try {
    const res = yield updateRTPSData(prescreen, isExpressCheckoutEnabled);
    yield put(setPlccEligible(res.plccEligible));
    yield put(setPlccPrescreenCode(res.prescreenCode));
    if (res.plccEligible) {
      // offer not yet shown, show it
      yield put(CHECKOUT_ACTIONS.setIsRTPSFlow(true));
      if (isMobileApp()) {
        navigation.navigate('ApplyNow');
      }
      yield put(toggleApplyNowModal({ isModalOpen: true }));
    }
  } catch (e) {
    logger.error(e);
  }
}

export function* callUpdateRTPS(pageName, navigation, isPaypalPostBack, isVenmoInProgress) {
  const { BILLING, REVIEW } = constants.CHECKOUT_STAGES;
  const showRTPSOnBilling = yield select(selectors.getShowRTPSOnBilling);
  const showRTPSOnReview = yield select(selectors.getshowRTPSOnReview);
  const isExpressCheckoutEnabled = yield select(isExpressCheckout);
  if (pageName === BILLING && showRTPSOnBilling) {
    yield call(updateUserRTPSData, {
      prescreen: true,
      isExpressCheckoutEnabled: false,
      navigation,
    });
  } else if (
    showRTPSOnReview &&
    (isPaypalPostBack || isVenmoInProgress || isExpressCheckoutEnabled) &&
    pageName === REVIEW
  ) {
    yield call(updateUserRTPSData, { prescreen: true, isExpressCheckoutEnabled, navigation });
  }
}

export const makeUpdateRTPSCall = (
  pageName,
  isPaypalPostBack,
  isExpressCheckoutEnabled,
  isVenmoInProgress
) => {
  const { BILLING } = constants.CHECKOUT_STAGES;
  return (
    pageName === BILLING || (isPaypalPostBack && !isExpressCheckoutEnabled) || isVenmoInProgress
  );
};

export function* handleServerSideErrorAPI(e, componentName = constants.PAGE) {
  const errorsMapping = yield select(BagPageSelectors.getErrorMapping);
  const billingError = getServerErrorMessage(e, errorsMapping);
  yield put(
    CHECKOUT_ACTIONS.setServerErrorCheckout({
      errorMessage: billingError,
      component: componentName,
    })
  );
}

export function* submitAcceptOrDeclinePlccData({ payload }) {
  const preScreenData = yield select(getRtpsPreScreenData);
  const { preScreenCode } = preScreenData;
  const accepted = payload;
  try {
    yield acceptOrDeclinePreScreenOffer(preScreenCode, accepted);
  } catch (e) {
    logger.error(e);
  }
}
export function* getRouteToCheckoutStage({ pageName, ...otherProps }, isExpress, isBagRouting) {
  let isExpressCheckoutEnabled = isExpress;
  if (!isExpress) {
    isExpressCheckoutEnabled = yield select(isExpressCheckout);
  }
  const { PICKUP, SHIPPING, REVIEW } = constants.CHECKOUT_STAGES;
  let requestedStage;
  const itemsCount = yield select(BagPageSelectors.getTotalItems);
  if (isExpressCheckoutEnabled && (!isBagRouting || itemsCount > 0)) {
    requestedStage = REVIEW;
  } else {
    const orderHasPickup = yield select(selectors.getIsOrderHasPickup);
    requestedStage = orderHasPickup ? PICKUP : SHIPPING;
  }
  utility.routeToPage(CHECKOUT_ROUTES[`${requestedStage}Page`], {
    appRouting: pageName,
    ...otherProps,
  });
  yield put(toggleCheckoutRouting(true));
  return requestedStage;
}

export function* handleCheckoutInitRouting({ pageName, ...otherProps }, appRouting) {
  const checkoutRoutingDone = yield select(selectors.getIfCheckoutRoutingDone);
  if (!checkoutRoutingDone && !appRouting && !isMobileApp()) {
    yield call(getRouteToCheckoutStage, { pageName, ...otherProps });
  }
  return pageName;
}

export function shouldInvokeReviewCartCall(
  isExpressCheckoutEnabled,
  { initialLoad, isPaypalPostBack, pageName, appRouting: isPageRefreshRouting }
) {
  const { REVIEW } = constants.CHECKOUT_STAGES;
  const isExpressCheckoutCase = isExpressCheckoutEnabled && !isPaypalPostBack;
  return pageName === REVIEW && !isPageRefreshRouting && (!isExpressCheckoutCase || !initialLoad);
}

export function* redirectFromExpress() {
  yield put(toggleCheckoutRouting(true));
  yield put(setIsExpressEligible(false));
  const isOrderHasPickup = yield select(selectors.getIsOrderHasPickup);
  if (isOrderHasPickup) {
    if (!isMobileApp()) {
      return utility.routeToPage(CHECKOUT_ROUTES.pickupPage);
    }
    return yield put(getSetCheckoutStage(constants.PICKUP_DEFAULT_PARAM));
  }
  if (!isMobileApp()) {
    return utility.routeToPage(CHECKOUT_ROUTES.shippingPage);
  }
  return yield put(getSetCheckoutStage(constants.SHIPPING_DEFAULT_PARAM));
}

function* loadGiftWrappingOptions() {
  try {
    const res = yield call(getGiftWrappingOptions);
    yield put(getSetGiftWrapOptionsActn(res));
  } catch (e) {
    // logErrorAndServerThrow(store, 'CheckoutOperator.loadGiftWrappingOptions', e);
    // throw e;
    logger.error(e);
  }
}

export function* getGiftWrapOptionsData() {
  const giftWrap = yield select(getGiftWrapOptions);
  if (!giftWrap) {
    yield call(loadGiftWrappingOptions);
  }
}
