/* eslint-disable extra-rules/no-commented-out-code */
import { call, put, select } from 'redux-saga/effects';
import {
  updatePaymentOnOrder,
  addPaymentToOrder,
} from '../../../../../services/abstractors/CnC/index';
import { updateAddress } from '../../../../../services/abstractors/account';

import selectors, { isGuest } from './Checkout.selector';
import { getSetIsBillingVisitedActn } from './Checkout.action';
import { getGrandTotal } from '../../common/organism/OrderLedger/container/orderLedger.selector';
import utility from '../util/utility';
import {
  addAddressGet,
  updateAddressPut,
} from '../../../../common/organisms/AddEditAddress/container/AddEditAddress.saga';
import { updateCreditCardSaga } from '../../../account/AddEditCreditCard/container/AddEditCreditCard.saga';
import CONSTANTS, { CHECKOUT_ROUTES } from '../Checkout.constants';
import { isMobileApp } from '../../../../../utils';
import { getAddressList } from '../../../account/AddressBook/container/AddressBook.saga';
import { getCardList } from '../../../account/Payment/container/Payment.saga';

const {
  getIsPaymentDisabled,
  getBillingValues,
  getAddressByKey,
  isCardNotUpdated,
  getShippingDestinationValues,
  getDetailedCreditCardById,
} = selectors;
const { getCreditCardType } = utility;

export function* updatePaymentInstruction(
  formData,
  cardDetails,
  isGuestUser,
  res,
  loadUpdatedCheckoutValues
) {
  let cardNotUpdated = true;
  if (formData.onFileCardId) {
    const grandTotal = yield select(getGrandTotal);
    const requestData = {
      onFileCardId: formData.onFileCardId,
      cardNumber: cardDetails.accountNo,
      billingAddressId: cardDetails.billingAddressId,
      cardType: cardDetails.ccBrand && cardDetails.ccBrand.toUpperCase(),
      cvv: formData.cvv,
      monthExpire: cardDetails.expMonth,
      yearExpire: cardDetails.expYear,
      orderGrandTotal: grandTotal,
      setAsDefault: formData.setAsDefault || cardDetails.defaultInd,
      saveToAccount: !isGuestUser, // it's already on the account? why is this needed?
      applyToOrder: true,
    };
    // FIXME: we need to store the details of the selected card and selected
    // address book entry, but like this it is pretty ugly. needs major cleanup
    yield call(addPaymentToOrder, requestData);
    cardNotUpdated = yield select(isCardNotUpdated, requestData.onFileCardId);
  } else {
    const cardType = getCreditCardType(formData);
    const checkoutDetails = yield select(getBillingValues);
    const editingCardType = checkoutDetails.billing
      ? getCreditCardType(checkoutDetails.billing)
      : '';
    const grandTotal = yield select(getGrandTotal);
    const requestData = {
      cardNumber: formData.cardNumber,
      billingAddressId: res.addressId,
      cardType: cardType || editingCardType,
      cvv: formData.cvv,
      monthExpire: formData.expMonth,
      yearExpire: formData.expYear,
      orderGrandTotal: grandTotal,
      setAsDefault: formData.setAsDefault,
      saveToAccount: !isGuestUser && formData.saveToAccount,
      applyToOrder: true,
    };
    let addOrEditPaymentToOrder = addPaymentToOrder;
    // if it's a new card (no '*' in it) then we still need to call the addPayment instead of updatePayment service
    if (
      checkoutDetails.paymentId &&
      formData.cardNumber &&
      formData.cardNumber.substr(0, 1) === '*'
    ) {
      requestData.paymentId = checkoutDetails.paymentId;
      addOrEditPaymentToOrder = updatePaymentOnOrder;
    }
    yield call(addOrEditPaymentToOrder, requestData);
  }
  // updatePaymentToActiveOnSubmitBilling(store);
  // getUserOperator(store).setRewardPointsData();
  yield call(loadUpdatedCheckoutValues, false, true, cardNotUpdated, false, false);
}

function* getAddressData(formData) {
  const existingAddress = yield select(getAddressByKey, formData.address.onFileAddressKey);
  const shippingDetails = yield select(getShippingDestinationValues);
  return existingAddress ? existingAddress.addressId : shippingDetails.onFileAddressId;
}

function addressIdToString(addressId) {
  if (addressId) {
    return addressId.toString();
  }
  return null;
}

export function* submitBillingData(formData, address, loadUpdatedCheckoutValues) {
  let res;
  let cardDetails;
  const updatePaymentRequired = true;
  const isGuestUser = yield select(isGuest);
  if (formData.address.sameAsShipping) {
    const shippingDetails = yield select(getShippingDestinationValues);
    res = yield call(updateAddress, {
      checkoutUpdateOnly: true,
      addressKey: shippingDetails.onFileAddressKey,
      addressId: shippingDetails.onFileAddressId,
    });
    res = res.body;
  } else if (formData.onFileCardId) {
    cardDetails = yield select(getDetailedCreditCardById, formData.onFileCardId);
    res = yield call(updateAddress, {
      checkoutUpdateOnly: true,
      addressKey: cardDetails.addressKey,
      addressId:
        addressIdToString(cardDetails.addressId) || addressIdToString(cardDetails.billingAddressId),
    });
    res = res.body;
  } else if (formData.address.onFileAddressKey && !isGuestUser) {
    // return submitPaymentInformation({addressId: formData.address.onFileAddressKey});
    const addressId = yield call(getAddressData, formData);
    res = yield call(updateAddress, {
      checkoutUpdateOnly: true,
      addressKey: formData.address.onFileAddressKey,
      addressId,
    });
    res = res.body;
  } else if (formData.address.onFileAddressKey && isGuestUser) {
    // send update
    const addressId = yield call(getAddressData, formData);
    res = yield updateAddressPut(
      {
        payload: {
          ...address,
          phoneNumber: formData.phoneNumber,
          addressKey: formData.address.onFileAddressKey,
          nickName: formData.address.onFileAddressKey,
          addressId,
          isDefault: formData.isDefault,
          saveToAccount: false,
          applyToOrder: true,
        },
      },
      { profileUpdate: false }
    );
  } else {
    res = yield call(
      addAddressGet,
      {
        payload: {
          ...address,
          nickName: formData.address.onFileAddressKey,
          phoneNumber: formData.phoneNumber,
          isDefault: formData.isDefault,
          saveToAccount: !isGuestUser && formData.saveToAccount,
          applyToOrder: true,
        },
      },
      false
    );
    res = res.body;
  }
  if (updatePaymentRequired) {
    yield call(
      updatePaymentInstruction,
      formData,
      cardDetails,
      isGuestUser,
      res,
      loadUpdatedCheckoutValues
    );
  }
}

export default function* submitBilling(payload = {}, loadUpdatedCheckoutValues) {
  try {
    // TODO need to remove as it is temp fix to deliver review page for app
    const { payload: { navigation, ...formData } = {} } = payload;
    formData.phoneNumber = formData.phoneNumber || '';
    const {
      addressLine1: address1,
      addressLine2: address2,
      city,
      country,
      firstName,
      lastName,
      state,
      zipCode: zip,
    } = formData.address;
    const address = { address1, address2, city, country, firstName, lastName, state, zip };
    yield put(getSetIsBillingVisitedActn(true)); // flag that billing section was visited by the user
    const isPaymentDisabled = yield select(getIsPaymentDisabled);
    if (!isPaymentDisabled) {
      yield call(submitBillingData, formData, address, loadUpdatedCheckoutValues);
    }
    yield call(getAddressList);
    yield call(getCardList);
    if (!isMobileApp()) {
      utility.routeToPage(CHECKOUT_ROUTES.reviewPage);
    } else if (navigation) {
      navigation.navigate(CONSTANTS.CHECKOUT_ROUTES_NAMES.CHECKOUT_REVIEW);
    }
  } catch (e) {
    // submitBillingError(store, e);
  }
}

export function* updateCardDetails({ payload }) {
  yield updateCreditCardSaga({ payload });
  yield call(getCardList);
}
