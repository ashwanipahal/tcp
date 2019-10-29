/* eslint-disable extra-rules/no-commented-out-code */
import { call, all, select, put } from 'redux-saga/effects';
import moment from 'moment';
// import { getUserEmail } from '../../../account/User/container/User.selectors';
import { isCanada, sanitizeEntity } from '../../../../../utils/utils';
// import { addAddress } from '../../../../../services/abstractors/account/AddEditAddress';
import {
  submitOrder,
  requestPersonalizedCoupons,
  updatePaymentOnOrder,
  getServerErrorMessage,
} from '../../../../../services/abstractors/CnC/index';
import selectors, { isGuest, isExpressCheckout } from './Checkout.selector';
import utility from '../util/utility';
import constants, { CHECKOUT_ROUTES } from '../Checkout.constants';
import { validateAndSubmitEmailSignup, callPickupSubmitMethod } from './Checkout.saga.util';
import {
  getAppliedCouponListState,
  isCouponApplied,
} from '../../common/organism/CouponAndPromos/container/Coupon.selectors';
import { isMobileApp } from '../../../../../utils';
import { getUserEmail } from '../../../account/User/container/User.selectors';
import {
  getSetCouponsValuesActn,
  getSetRewardPointsOrderConfActn,
  getSetOrderConfirmationActn,
  getSetOrderProductDetails,
} from '../../Confirmation/container/Confirmation.actions';
import ConfirmationSelectors from '../../Confirmation/container/Confirmation.selectors';
import BagPageSelectors from '../../BagPage/container/BagPage.selectors';
import CHECKOUT_ACTIONS from './Checkout.action';
import { resetAirmilesReducer } from '../../common/organism/AirmilesBanner/container/AirmilesBanner.actions';
import {
  resetCouponReducer,
  getCouponList,
} from '../../common/organism/CouponAndPromos/container/Coupon.actions';
import BagActions from '../../BagPage/container/BagPage.actions';
import { updateVenmoPaymentInstruction } from './CheckoutBilling.saga';
import { getGrandTotal } from '../../common/organism/OrderLedger/container/orderLedger.selector';

const {
  // isVenmoPaymentAvailable,
  getCurrentOrderId,
  getSmsNumberForBillingOrderUpdates,
  // getIsPaymentDisabled,
  getCurrentLanguage,
  getBillingValues,
} = selectors;

function extractCouponInfo(personalizedOffersResponse) {
  try {
    return personalizedOffersResponse.coupon.map(coupon => {
      let startDate;
      let endDate;
      let isPastStartDate;
      let categoryType;
      let description;
      const { couponCode, legalText, promotion } = coupon;
      /* istanbul ignore else */
      if (promotion) {
        const { categoryType: catType } = promotion;
        const proStartDate = promotion.startDate;
        startDate = proStartDate && moment(proStartDate).format('MMM Do, YYYY');
        isPastStartDate = proStartDate && moment().diff(proStartDate) > 0; // check user browser date to server date
        endDate = promotion.endDate && moment(promotion.endDate).format('MMM Do, YYYY');
        categoryType = catType;
        description = promotion.shortDescription;
      }

      return {
        code: couponCode,
        description,
        disclaimer: legalText && sanitizeEntity(legalText),
        endDate,
        isPastStartDate,
        startDate,
        categoryType,
      };
    });
  } catch (error) {
    return [];
  }
}

export function* loadPersonalizedCoupons(
  {
    isElectiveBonus,
    currencyCode,
    orderItems: cartItems,
    paymentsList: payments,
    userDetails: { emailAddress },
  },
  orderNumber
) {
  const isCaSite = yield call(isCanada);
  const isUsSite = !isCaSite;
  let couponList = yield select(getAppliedCouponListState);
  if (couponList && couponList.size > 0) {
    couponList = couponList.map(val => ({ id: val.id }));
  }
  const { US_LOCATION_ID, CA_LOCATION_ID } = constants;
  const { personalizedOffersResponse, orderResponse } = yield call(requestPersonalizedCoupons, {
    orderNumber,
    emailAddress,
    locationId: isUsSite ? US_LOCATION_ID : CA_LOCATION_ID,
    couponList,
    isElectiveBonus,
    currencyCode,
    payments,
    cartItems,
  });
  let couponsInfo = [];
  /* istanbul ignore else */
  if (personalizedOffersResponse) {
    couponsInfo = extractCouponInfo(personalizedOffersResponse);
    yield put(getSetCouponsValuesActn(couponsInfo)); // to be done at time of confirmation page as it require new reducer
  }
  const brierelyPointsInfo = {};
  /* istanbul ignore else */
  if (orderResponse) {
    // When brierley fails, backend returns -1 in these fields
    if (orderResponse.pointsToNextReward === -1) {
      brierelyPointsInfo.pointsToNextReward = 0;
    } else {
      brierelyPointsInfo.pointsToNextReward = orderResponse.pointsToNextReward;
    }
    if (orderResponse.userPoints === -1) {
      brierelyPointsInfo.estimatedRewards = null;
    } else {
      brierelyPointsInfo.estimatedRewards = orderResponse.userPoints;
    }
    /* istanbul ignore else */
    if (orderResponse.earnedReward) {
      brierelyPointsInfo.earnedReward = orderResponse.earnedReward;
    }
    // to be done at time of confirmation page as it require new reducer
    const summary = yield select(ConfirmationSelectors.getConfirmationSummary);
    const updatedSummary = { ...summary, ...brierelyPointsInfo };
    yield put(getSetRewardPointsOrderConfActn(updatedSummary));
  }
}

export function* submitOrderProcessing(orderId, smsOrderInfo, currentLanguage) {
  let venmoPayloadData = {};
  const isVenmoInProgress = yield select(selectors.isVenmoPaymentInProgress);
  const isVenmoSaveSelected = yield select(selectors.isVenmoPaymentSaveSelected);
  const venmoData = yield select(selectors.getVenmoData);
  const errorMappings = yield select(BagPageSelectors.getErrorMapping);
  // Add Venmo Payment method to the registered user account
  if (isVenmoSaveSelected) {
    yield call(updateVenmoPaymentInstruction);
  }
  if (isVenmoInProgress && venmoData) {
    const { nonce: venmoNonce, deviceData: venmoDeviceData } = venmoData;
    const email = yield select(getUserEmail);
    venmoPayloadData = {
      venmoNonce,
      venmo_device_data: venmoDeviceData,
      email,
      isVenmoSaveSelected,
    };
  }
  const res = yield call(
    submitOrder,
    orderId,
    smsOrderInfo,
    currentLanguage,
    venmoPayloadData,
    errorMappings
  );
  yield put(getSetOrderConfirmationActn(res));
  return res;
}

// function* expressCheckoutSubmit(formData) {
export function* expressCheckoutSubmit(formData) {
  // if express checkout
  const { billing, hasAlternatePickup } = formData; // /* giftWrap, disabled */
  /* istanbul ignore else */
  if (hasAlternatePickup) {
    yield call(callPickupSubmitMethod, formData);
  }

  // const giftWrapPromise = Promise.resolve();

  /* NOTE: DT-19417: Gift Wrapping option no longer available for Express User on review page (backend does not support it)
   * I guess this needs to be re-enabled once backend fixes the services.
  if (giftWrap && giftWrap.hasGiftWrapping) {       // user specified gift wrapping
    // pendingPromises.push(this.checkoutServiceAbstractor.addGiftWrappingOption(giftWrap.message, giftWrap.optionId));
    giftWrapPromise = this.checkoutServiceAbstractor.addGiftWrappingOption(giftWrap.message, giftWrap.optionId);
  } else if (checkoutStoreView.getGiftWrappingValues(state).optionId) {
    // pendingPromises.push(this.checkoutServiceAbstractor.removeGiftWrappingOption()); // remove existing gift wrap (if any)
    giftWrapPromise = this.checkoutServiceAbstractor.removeGiftWrappingOption();
  }
  */
  /* istanbul ignore else */
  if (billing && billing.cvv) {
    // PLCC does not require CVV -> billing = null. User entered a cvv for a credit card
    // submit CVV
    const billingDetails = yield select(getBillingValues);
    const grandTotal = yield select(getGrandTotal);
    const requestData = {
      orderGrandTotal: grandTotal,
      monthExpire: billingDetails.billing.expMonth,
      yearExpire: billingDetails.billing.expYear,
      cardType: billingDetails.billing.cardType,
      cardNumber: billingDetails.billing.cardNumber,
      paymentId: billingDetails.paymentId,
      billingAddressId: billingDetails.address.onFileAddressId, // DT-34037 billing_address_id need to be send along with updatePayment.
      cvv: billing.cvv, // the cvv entered by the user
    };
    yield call(updatePaymentOnOrder, requestData);
  }
}

function* fetchCoupons(isCouponAppliedInOrder) {
  if (isCouponAppliedInOrder) {
    yield put(getCouponList({ ignoreCache: true }));
  }
}

// method to handle submit of order in review page
function* submitOrderForProcessing({ payload: { navigation, formData } }) {
  try {
    const orderId = yield select(getCurrentOrderId);
    const smsOrderInfo = yield select(getSmsNumberForBillingOrderUpdates);
    const currentLanguage = yield select(getCurrentLanguage);
    const isExpressCheckoutEnabled = yield select(isExpressCheckout);
    const pendingPromises = [];
    if (isExpressCheckoutEnabled && formData) {
      yield call(expressCheckoutSubmit, formData);
    }

    // Venmo Support
    // if (venmoPaymentMethodApplied) {
    //   const localPromises = [];
    //   const shippingAddress = checkoutStoreView.getShippingDestinationValues(state);
    //   let billingAddressId = shippingAddress && shippingAddress.onFileAddressId;
    //   let billingAddressKey = shippingAddress && shippingAddress.onFileAddressKey;

    //   if (
    //     !billingAddressId &&
    //     !userStoreView.isGuest(state) &&
    //     cartStoreView.getIsOrderHasShipping(state)
    //   ) {
    //     // We have to find the billingAddressId so let's get the default billing id which is ok for Venmo
    //     const shipToValues = checkoutStoreView.getInitialShippingSectionValues(state);
    //     if (shipToValues.shipTo && shipToValues.shipTo.addressId) {
    //       billingAddressId = shipToValues.shipTo.addressId;
    //       billingAddressKey = shipToValues.shipTo.onFileAddressKey;
    //     }
    //   }
    //   // Now we need to support Pickup values
    //   if (!checkoutStoreView.isPickupValuesAvailable(state) && cartStoreView.isCartStores(state)) {
    //     // We need to submit the defaults
    //     const initialPickupValues = checkoutStoreView.getInitialPickupSectionValues(state);
    //     if (initialPickupValues && initialPickupValues.pickUpContact) {
    //       localPromises.push(
    //         () =>
    //           new Promise(res =>
    //             res(
    //               getPickupOperator(this.store).addContact({
    //                 firstName: initialPickupValues.pickUpContact.firstName,
    //                 lastName: initialPickupValues.pickUpContact.lastName,
    //                 phoneNumber: initialPickupValues.pickUpContact.phoneNumber,
    //                 emailAddress:
    //                   initialPickupValues.pickUpContact.emailAddress ||
    //                   (!userStoreView.isGuest(state) ? userStoreView.getUserEmail(state) : ''),
    //                 alternateEmail:
    //                   initialPickupValues.hasAlternatePickup && initialPickupValues.pickUpAlternate
    //                     ? initialPickupValues.pickUpAlternate.emailAddress
    //                     : '',
    //                 alternateFirstName:
    //                   initialPickupValues.hasAlternatePickup && initialPickupValues.pickUpAlternate
    //                     ? initialPickupValues.pickUpAlternate.firstName
    //                     : '',
    //                 alternateLastName:
    //                   initialPickupValues.hasAlternatePickup && initialPickupValues.pickUpAlternate
    //                     ? initialPickupValues.pickUpAlternate.lastName
    //                     : '',
    //               })
    //             )
    //           )
    //       );
    //     }
    //   }
    //   if (
    //     !billingAddressId &&
    //     cartStoreView.getIsOrderHasPickup(state) &&
    //     !cartStoreView.getIsOrderHasShipping(state)
    //   ) {
    //     // We have to retrieve store for billing address
    //     const tcpStores = cartStoreView.getCartStores(state);
    //     if (tcpStores && tcpStores.length) {
    //       const aTcpStore = tcpStores[0];
    //       billingAddressId = `${aTcpStore.address.addressId}`;
    //       billingAddressKey = `${aTcpStore.address.addessKey}`;
    //     }
    //   }
    //   // Since we normally skip the billing step during Venmo, we will set it here.
    //   if (billingAddressId && billingAddressKey) {
    //     const accountServiceAbstractor = getAccountAbstractor(
    //       routingInfoStoreView.getApiHelper(state)
    //     );
    //     localPromises.push(
    //       () =>
    //         new Promise(res =>
    //           res(
    //             accountServiceAbstractor.applyBillingAddress({
    //               addressId: billingAddressId,
    //               nickName: billingAddressKey,
    //               addressKey: billingAddressKey,
    //             })
    //           )
    //         )
    //     );
    //   }

    //   const addPaymentData = {
    //     billingAddressId,
    //     venmoData,
    //     orderGrandTotal: cartStoreView.getGrandTotal(state),
    //     cardType: CREDIT_CARDS_PAYMETHODID.VENMO,
    //     saveVenmoTokenIntoProfile: !userStoreView.isGuest(state) && venmoSavedToAccount,
    //     applyToOrder: true,
    //   };
    //   const venmoPaymentInfo = paymentCardsStoreView.getVenmoPaymentInfo(state);
    //   if (venmoPaymentInfo && venmoPaymentInfo.length && venmoPaymentInfo[0].onFileCardId) {
    //     addPaymentData.creditCardId = venmoPaymentInfo[0].onFileCardId;
    //   }
    //   localPromises.push(
    //     () =>
    //       new Promise(res => res(this.checkoutServiceAbstractor.addPaymentToOrder(addPaymentData)))
    //   );
    //   pendingPromises.push(runPromisesInSerial(localPromises));
    // }
    yield all(pendingPromises);
    const res = yield call(submitOrderProcessing, orderId, smsOrderInfo, currentLanguage);
    if (!isMobileApp()) {
      utility.routeToPage(CHECKOUT_ROUTES.confirmationPage);
    } else if (navigation) {
      navigation.navigate(constants.CHECKOUT_ROUTES_NAMES.CHECKOUT_CONFIRMATION);
    }
    yield call(loadPersonalizedCoupons, res, orderId);
    const cartItems = yield select(BagPageSelectors.getOrderItems);
    const email = res.userDetails ? res.userDetails.emailAddress : res.shipping.emailAddress;
    const isCaSite = yield call(isCanada);
    const isGuestUser = yield select(isGuest);
    /* istanbul ignore else */
    if (isGuestUser && !isCaSite && email) {
      yield call(validateAndSubmitEmailSignup, email, 'us_guest_checkout');
    }
    const isCouponAppliedInOrder = yield select(isCouponApplied);
    // const vendorId =
    //   cartItems.size > 0 && cartItems.getIn(['0', 'miscInfo', 'vendorColorDisplayId']);
    yield put(getSetOrderProductDetails(cartItems));
    yield put(CHECKOUT_ACTIONS.resetCheckoutReducer());
    yield put(resetAirmilesReducer());
    yield put(resetCouponReducer());
    yield put(BagActions.resetCartReducer());
    yield call(fetchCoupons, isCouponAppliedInOrder);
    // getProductsOperator(this.store).loadProductRecommendations(
    //   RECOMMENDATIONS_SECTIONS.CHECKOUT,
    //   vendorId
    // );
    // this.store.dispatch(setVenmoPaymentConfirmationDisplayed(venmoPaymentMethodApplied));
    // getCartOperator(this.store)
    // .loadSflItemsCount()
    // .catch(err => {
    //   logErrorAndServerThrow(this.store, 'loadSflItemsCount', err);
    // });
  } catch (e) {
    const errorsMapping = yield select(BagPageSelectors.getErrorMapping);
    const billingError = getServerErrorMessage(e, errorsMapping);
    yield put(
      CHECKOUT_ACTIONS.setServerErrorCheckout({ errorMessage: billingError, component: 'PAGE' })
    );
  }
}

export default submitOrderForProcessing;
