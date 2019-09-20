/* eslint-disable extra-rules/no-commented-out-code */
import { call, all, select } from 'redux-saga/effects';
// import { getUserEmail } from '../../../account/User/container/User.selectors';
import { isCanada } from '../../../../../utils/utils';
// import { addAddress } from '../../../../../services/abstractors/account/AddEditAddress';
import {
  submitOrder,
  requestPersonalizedCoupons,
} from '../../../../../services/abstractors/CnC/index';
import selectors, { isGuest } from './Checkout.selector';
import utility from '../util/utility';
import constants, { CHECKOUT_ROUTES } from '../Checkout.constants';
import { validateAndSubmitEmailSignup } from './Checkout.saga.util';
import { getAppliedCouponListState } from '../../common/organism/CouponAndPromos/container/Coupon.selectors';
import { isMobileApp } from '../../../../../utils';

const {
  // isVenmoPaymentAvailable,
  getCurrentOrderId,
  getSmsNumberForBillingOrderUpdates,
  // getIsPaymentDisabled,
  getCurrentLanguage,
} = selectors;

// function extractCouponInfo(personalizedOffersResponse) {
//   try {
//     return personalizedOffersResponse.coupon.map(coupon => {
//       let startDate;
//       let endDate;
//       let isPastStartDate;
//       let categoryType;
//       let description;
//       const { couponCode, legalText, promotion } = coupon;

//       if (promotion) {
//         const { categoryType: catType } = promotion;
//         const proStartDate = promotion.startDate;
//         startDate = proStartDate && moment(proStartDate).format('MMM Do, YYYY');
//         isPastStartDate = proStartDate && moment().diff(proStartDate) > 0; // check user browser date to server date
//         endDate = promotion.endDate && moment(promotion.endDate).format('MMM Do, YYYY');
//         categoryType = catType;
//         description = promotion.shortDescription;
//       }

//       return {
//         code: couponCode,
//         description,
//         disclaimer: legalText && sanitizeEntity(legalText),
//         endDate,
//         isPastStartDate,
//         startDate,
//         categoryType,
//       };
//     });
//   } catch (error) {
//     return [];
//   }
// }

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
  const couponList = yield select(getAppliedCouponListState);
  const { US_LOCATION_ID, CA_LOCATION_ID } = constants;
  const { personalizedOffersResponse, orderResponse } = yield call(requestPersonalizedCoupons, {
    orderNumber,
    emailAddress,
    locationId: isUsSite ? US_LOCATION_ID : CA_LOCATION_ID,
    couponList: couponList.map(val => ({ id: val.get('id') })),
    isElectiveBonus,
    currencyCode,
    payments,
    cartItems,
  });

  if (personalizedOffersResponse) {
    // yield put(getSetCouponsValuesActn(extractCouponInfo(personalizedOffersResponse) || [])); // to be done at time of confirmation page as it require new reducer
  }
  const brierelyPointsInfo = {};
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
    if (orderResponse.earnedReward) {
      brierelyPointsInfo.earnedReward = orderResponse.earnedReward;
    }
    // to be done at time of confirmation page as it require new reducer
    // const summary = confirmationStoreView.getConfirmationSummary(state);
    // const updatedSummary = { ...summary, ...brierelyPointsInfo };
    // this.store.dispatch(getSetRewardPointsOrderConfActn(updatedSummary));
  }
}

export function* submitOrderProcessing(orderId, smsOrderInfo, currentLanguage) {
  // return reviewOrder().then((res) => {
  const venmoPayloadData = {};
  // if (venmoPaymentMethodApplied) {
  // const { nonce: venmoNonce, deviceData: venmo_device_data } = checkoutStoreView.getVenmoData(
  //   state
  // );
  // const email = checkoutStoreView.getVenmoUserEmail(state);
  // venmoPayloadData = {
  //   venmoNonce,
  //   venmo_device_data,
  //   email,
  // };
  // }
  const res = yield call(submitOrder, orderId, smsOrderInfo, currentLanguage, venmoPayloadData);
  // const cartItems = yield select(BagPageSelectors.getOrderItems);
  // const vendorId =
  //   cartItems.size > 0 && cartItems.getIn(['0', 'miscInfo', 'vendorColorDisplayId']);
  yield call(loadPersonalizedCoupons, res, orderId);
  // yield put(setCouponList(res));
  const email = res.userDetails ? res.userDetails.emailAddress : res.shipping.emailAddress;
  const isCaSite = yield call(isCanada);
  const isGuestUser = yield select(isGuest);
  if (isGuestUser && !isCaSite && email) {
    yield call(validateAndSubmitEmailSignup, email, 'us_guest_checkout');
  }
  // this.store.dispatch(getSetOrderProductDetails(cartItems));
  // getCartOperator(this.store).clearCart();
  // getUserOperator(this.store).setUserBasicInfo();
  // getCouponsAndPromosFormOperator(this.store).burstCache();
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
}

function* submitOrderForProcessing({ payload: { navigation } }) {
  const orderId = yield select(getCurrentOrderId);
  const smsOrderInfo = yield select(getSmsNumberForBillingOrderUpdates);
  const currentLanguage = yield select(getCurrentLanguage);
  // const venmoPaymentAvailable = yield select(isVenmoPaymentAvailable);
  // const isPaymentDisabled = yield select(getIsPaymentDisabled);
  // const venmoPaymentMethodApplied = venmoPaymentAvailable && !isPaymentDisabled;

  const pendingPromises = [];
  // if (checkoutStoreView.isExpressCheckout(state)) {
  //   // if express checkout
  //   let { billing, hasAlternatePickup, pickUpAlternate } = formData; // /* giftWrap, disabled */

  //   if (hasAlternatePickup) {
  //     // user specified an alternate pickup person
  //     pendingPromises.push(
  //       getPickupOperator(this.store).addContact(
  //         // the main pickup person info comes from the values already in the form
  //         {
  //           ...checkoutStoreView.getPickupValues(state),
  //           alternateEmail: pickUpAlternate.emailAddress,
  //           alternateFirstName: pickUpAlternate.firstName,
  //           alternateLastName: pickUpAlternate.lastName,
  //         }
  //       )
  //     );
  //   }

  //   let giftWrapPromise = Promise.resolve();

  //   /* NOTE: DT-19417: Gift Wrapping option no longer available for Express User on review page (backend does not support it)
  //    * I guess this needs to be re-enabled once backend fixes the services.
  //   if (giftWrap && giftWrap.hasGiftWrapping) {       // user specified gift wrapping
  //     // pendingPromises.push(this.checkoutServiceAbstractor.addGiftWrappingOption(giftWrap.message, giftWrap.optionId));
  //     giftWrapPromise = this.checkoutServiceAbstractor.addGiftWrappingOption(giftWrap.message, giftWrap.optionId);
  //   } else if (checkoutStoreView.getGiftWrappingValues(state).optionId) {
  //     // pendingPromises.push(this.checkoutServiceAbstractor.removeGiftWrappingOption()); // remove existing gift wrap (if any)
  //     giftWrapPromise = this.checkoutServiceAbstractor.removeGiftWrappingOption();
  //   }
  //   */

  //   if (billing && billing.cvv) {
  //     // PLCC does not require CVV -> billing = null. User entered a cvv for a credit card
  //     // submit CVV
  //     let billingDetails = checkoutStoreView.getBillingValues(state);
  //     pendingPromises.push(
  //       giftWrapPromise.then(() => {
  //         return this.checkoutServiceAbstractor.updatePaymentOnOrder({
  //           // for some odd reason backend want this info
  //           orderGrandTotal: cartStoreView.getGrandTotal(state),
  //           monthExpire: billingDetails.billing.expMonth,
  //           yearExpire: billingDetails.billing.expYear,
  //           cardType: billingDetails.billing.cardType,
  //           cardNumber: billingDetails.billing.cardNumber,
  //           paymentId: billingDetails.paymentId,
  //           billingAddressId: billingDetails.address.onFileAddressId, // DT-34037 billing_address_id need to be send along with updatePayment.
  //           cvv: billing.cvv, // the cvv entered by the user
  //         });
  //       })
  //     );
  //   }
  // }

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

  //   // We need to add the Venmo payment type
  //   // We have to add payment information here since we bypassed the billing step.
  //   /// Need to find the shipping address id from store
  //   const venmoData = checkoutStoreView.getVenmoData(state);
  //   let venmoSavedToAccount = false;
  //   if (formData && formData.billing) {
  //     venmoSavedToAccount = formData.billing.venmoSavedToAccount;
  //   } else if (
  //     !userStoreView.isGuest(state) &&
  //     venmoData &&
  //     venmoData.venmoClientTokenData &&
  //     venmoData.venmoClientTokenData.venmoPaymentTokenAvailable === 'TRUE'
  //   ) {
  //     // We need to maintain last saved to account.
  //     venmoSavedToAccount = true;
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
  yield call(submitOrderProcessing, orderId, smsOrderInfo, currentLanguage);
  if (!isMobileApp()) {
    utility.routeToPage(CHECKOUT_ROUTES.confirmationPage);
  } else if (navigation) {
    navigation.navigate(constants.CHECKOUT_ROUTES_NAMES.CHECKOUT_CONFIRMATION);
  }
}

export default submitOrderForProcessing;
