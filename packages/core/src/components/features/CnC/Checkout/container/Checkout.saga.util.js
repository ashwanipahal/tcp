/* eslint-disable extra-rules/no-commented-out-code */
import { call, put, select } from 'redux-saga/effects';
import logger from '../../../../../utils/loggerInstance';
import selectors, { isGuest } from './Checkout.selector';
import {
  setShippingMethodAndAddressId,
  briteVerifyStatusExtraction,
  getVenmoToken,
  addPickupPerson,
} from '../../../../../services/abstractors/CnC/index';
import BAG_PAGE_ACTIONS from '../../BagPage/container/BagPage.actions';
import emailSignupAbstractor from '../../../../../services/abstractors/common/EmailSmsSignup/EmailSmsSignup';
import { getUserEmail } from '../../../account/User/container/User.selectors';
import { getAddressListState } from '../../../account/AddressBook/container/AddressBook.selectors';
import {
  addAddressGet,
  updateAddressPut,
} from '../../../../common/organisms/AddEditAddress/container/AddEditAddress.saga';
import { getAddressList } from '../../../account/AddressBook/container/AddressBook.saga';
import {
  setOnFileAddressKey,
  setGiftWrap,
  getVenmoClientTokenSuccess,
  getVenmoClientTokenError,
  setSmsNumberForUpdates,
  emailSignupStatus,
  getSetCheckoutStage,
} from './Checkout.action';
import utility from '../util/utility';
import constants, { CHECKOUT_ROUTES } from '../Checkout.constants';
import {
  addGiftWrappingOption,
  removeGiftWrappingOption,
} from '../../../../../services/abstractors/CnC/Checkout';
import { isCanada, isMobileApp } from '../../../../../utils';
import BagPageSelectors from '../../BagPage/container/BagPage.selectors';

export const pickUpRouting = ({
  getIsShippingRequired,
  isVenmoInProgress,
  isVenmoPickupDisplayed,
}) => {
  if (getIsShippingRequired) {
    utility.routeToPage(CHECKOUT_ROUTES.shippingPage);
  } else if (isVenmoInProgress && !isVenmoPickupDisplayed) {
    utility.routeToPage(CHECKOUT_ROUTES.reviewPage);
  } else {
    utility.routeToPage(CHECKOUT_ROUTES.billingPage);
  }
};

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
  const addressId = yield select(selectors.getOnFileAddressKey);
  const smsSignUp = yield select(selectors.getShippingSmsSignUpFields);
  let transVibesSmsPhoneNo = null;
  if (smsSignUp) {
    transVibesSmsPhoneNo = smsSignUp.phoneNumber;
  }
  try {
    yield call(
      setShippingMethodAndAddressId,
      payload.id,
      addressId,
      false, // generalStoreView.getIsPrescreenFormEnabled(storeState) && !giftWrap.hasGiftWrapping && !userStoreView.getUserIsPlcc(storeState)
      transVibesSmsPhoneNo,
      yield select(BagPageSelectors.getErrorMapping)
    );

    yield put(
      BAG_PAGE_ACTIONS.getCartData({
        calcsEnabled: true,
        excludeCartItems: true,
        recalcRewards: false,
        isCanada: isCanada(),
        isCheckoutFlow: true,
      })
    );
  } catch (err) {
    // throw getSubmissionError(store, 'submitShippingSection', err);
  }
}

export function* updateShippingAddress({ payload }) {
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
  yield call(getAddressList);
  yield put(setOnFileAddressKey(updateAddressResponse.payload));
}

export function* addNewShippingAddress({ payload }) {
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
  yield call(getAddressList);
  yield put(setOnFileAddressKey(addAddressResponse.payload));
}

export function* routeToPickupPage(recalc) {
  yield call(utility.routeToPage, CHECKOUT_ROUTES.pickupPage, { recalc });
}

export function* addAndSetGiftWrappingOptions(payload) {
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
  } else {
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

export function* subscribeEmailAddress(emailObj, status, field1) {
  try {
    const payloadObject = {
      emailaddr: emailObj.payload,
      URL: 'email-confirmation',
      response: `${status}:::false:false`,
      registrationType: constants.EMAIL_REGISTRATION_TYPE_CONSTANT,
    };

    if (field1) {
      payloadObject.field1 = field1;
    }

    const res = yield call(emailSignupAbstractor.subscribeEmail, payloadObject);
    yield put(emailSignupStatus({ subscription: res }));
  } catch (err) {
    logger.error(err);
  }
}

export function* validateAndSubmitEmailSignup(emailAddress, field1) {
  if (emailAddress) {
    const statusCode = call(briteVerifyStatusExtraction, emailAddress);
    yield subscribeEmailAddress({ payload: emailAddress }, statusCode, field1);
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
