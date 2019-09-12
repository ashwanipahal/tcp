/* eslint-disable extra-rules/no-commented-out-code */
import { call, put, select } from 'redux-saga/effects';
import selectors from './Checkout.selector';
import { setShippingMethodAndAddressId } from '../../../../../services/abstractors/CnC/index';

import { getUserEmail } from '../../../account/User/container/User.selectors';
import { getAddressListState } from '../../../account/AddressBook/container/AddressBook.selectors';
import {
  addAddressGet,
  updateAddressPut,
} from '../../../../common/organisms/AddEditAddress/container/AddEditAddress.saga';
import { getAddressList } from '../../../account/AddressBook/container/AddressBook.saga';
import { setOnFileAddressKey, setGiftWrap } from './Checkout.action';
import utility from '../util/utility';
import { CHECKOUT_ROUTES } from '../Checkout.constants';
import {
  addGiftWrappingOption,
  removeGiftWrappingOption,
} from '../../../../../services/abstractors/CnC/Checkout';

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
          address2: address.addressLine2,
          zip: address.zipCode,
          phoneNumber,
          emailAddress,
          primary: `${setAsDefault}`,
          phone1Publish: 'false',
          fromPage: '',
        },
      },
      true // add to address book inside redux-store
    );
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
      transVibesSmsPhoneNo
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
      address2: address.addressLine2,
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
        address2: address.addressLine2,
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
  if (payload.hasGiftWrapping) {
    try {
      const res = yield call(addGiftWrappingOption, payload);
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
