/* eslint-disable extra-rules/no-commented-out-code */
/* eslint-disable */
import { call, put, select } from 'redux-saga/effects';
import { SubmissionError } from 'redux-form';
import {
  updatePaymentOnOrder,
  addPaymentToOrder,
  getServerErrorMessage,
} from '../../../../../services/abstractors/CnC/index';
import { updateAddress } from '../../../../../services/abstractors/account';

import selectors, { isGuest } from './Checkout.selector';
import { getSetIsBillingVisitedActn, getSetCheckoutStage } from './Checkout.action';
import { setServerErrorCheckout } from './Checkout.action.util';
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
import BagPageSelectors from '../../BagPage/container/BagPage.selectors';
import { getFormattedError } from '../../../../../utils/errorMessage.util';
import CreditCardSelector from '../organisms/BillingPaymentForm/container/CreditCard.selectors';

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
  cardDetailsInfo,
  isGuestUser,
  res,
  loadUpdatedCheckoutValues
) {
  let cardDetails;
  let cardNotUpdated = true;
  const errorMappings = yield select(BagPageSelectors.getErrorMapping);
  if (formData.onFileCardId) {
    if (!cardDetailsInfo) {
      cardDetails = yield select(getDetailedCreditCardById, formData.onFileCardId);
    } else {
      cardDetails = cardDetailsInfo;
    }
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
    yield call(addPaymentToOrder, requestData, errorMappings);
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
    yield call(addOrEditPaymentToOrder, requestData, errorMappings);
  }
  // updatePaymentToActiveOnSubmitBilling(store);
  // getUserOperator(store).setRewardPointsData();
  if (!isMobileApp()) {
    yield call(loadUpdatedCheckoutValues, false, true, cardNotUpdated, false, false);
  }
}

/**
 * @function updateVenmoPaymentInstruction
 * @description - Update payment instruction for venmo checkout
 * @param {object} venmoDetails
 */
export function* updateVenmoPaymentInstruction() {
  const { PAYMENT_METHOD_VENMO } = CONSTANTS;
  const grandTotal = yield select(getGrandTotal);
  const shippingDetails = yield select(getShippingDestinationValues);
  const isVenmoSaveSelected = yield select(selectors.isVenmoPaymentSaveSelected);
  const venmoData = yield select(selectors.getVenmoData);
  const { nonce: venmoNonce, deviceData: venmoDeviceData, details: { username } = {} } =
    venmoData || {};
  const billingAddressId = shippingDetails.onFileAddressId;
  const paymentMethod = PAYMENT_METHOD_VENMO && PAYMENT_METHOD_VENMO.toUpperCase();
  const requestData = {
    billingAddressId,
    cardType: paymentMethod,
    cc_brand: paymentMethod,
    cardNumber: username || 'test-user', // Venmo User Id, for all the scenario's it will have user information from the venmo, for dev, added test-user
    isDefault: 'false',
    orderGrandTotal: grandTotal,
    applyToOrder: true,
    monthExpire: '',
    yearExpire: '',
    setAsDefault: false,
    saveToAccount: false,
    venmoDetails: {
      userId: username || 'test-user',
      saveVenmoTokenIntoProfile: isVenmoSaveSelected,
      nonce: venmoNonce,
      venmoDeviceData,
    },
  };
  const errorMappings = yield select(BagPageSelectors.getErrorMapping);
  yield call(addPaymentToOrder, requestData, errorMappings);
}

export function* getAddressData(formData) {
  const existingAddress = yield select(getAddressByKey, formData.address.onFileAddressKey);
  const shippingDetails = yield select(getShippingDestinationValues);
  return existingAddress ? existingAddress.addressId : shippingDetails.onFileAddressId;
}

export function addressIdToString(addressId) {
  if (addressId) {
    return addressId.toString();
  }
  return null;
}

export function* submitBillingData(formData, address, loadUpdatedCheckoutValues) {
  let res;
  let cardDetails;
  // const updatePaymentRequired = true;
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
  // if (updatePaymentRequired) {
  yield call(
    updatePaymentInstruction,
    formData,
    cardDetails,
    isGuestUser,
    res,
    loadUpdatedCheckoutValues
  );
  // }
}

/**
 * @function submitVenmoBilling
 * @description - Redirect venmo payment from billing to review. This method is called from the Billing Page
 * @param {obejct} payload - venmo payload to submit billing and redirect to review page
 */
export function* submitVenmoBilling(payload = {}) {
  const { payload: { navigation } = {} } = payload;
  yield put(getSetIsBillingVisitedActn(true)); // flag that billing section was visited by the user
  yield call(updateVenmoPaymentInstruction);
  if (!isMobileApp()) {
    utility.routeToPage(CHECKOUT_ROUTES.reviewPage);
  } else if (navigation) {
    yield put(getSetCheckoutStage(CONSTANTS.REVIEW_DEFAULT_PARAM));
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
      yield put(getSetCheckoutStage(CONSTANTS.REVIEW_DEFAULT_PARAM));
    }
  } catch (e) {
    // submitBillingError(store, e);
    const errorsMapping = yield select(BagPageSelectors.getErrorMapping);
    const billingError = getServerErrorMessage(e, errorsMapping);
    yield put(setServerErrorCheckout({ errorMessage: billingError, component: 'PAGE' }));
  }
}

export function* updateCardDetails({ payload: { formData, resolve, reject } }) {
  try {
    const cardType = yield select(CreditCardSelector.getEditFormCardType);
    yield updateCreditCardSaga({ payload: { ...formData, cardType } }, true);
    yield call(getCardList);
    resolve();
  } catch (err) {
    const errorsMapping = yield select(BagPageSelectors.getErrorMapping);
    reject(new SubmissionError({ _error: getFormattedError(err, errorsMapping) }));
  }
}
