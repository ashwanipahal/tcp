/* eslint-disable extra-rules/no-commented-out-code */

import { call, takeLatest, put, all, select } from 'redux-saga/effects';
import { getImgPath } from '@tcp/core/src/components/features/browse/ProductListingPage/util/utility';
import constants from '../Checkout.constants';
import { getGiftWrappingOptions } from '../../../../../services/abstractors/CnC/index';
import selectors from './Checkout.selector';
import utility from '../util/utility';
import {
  getSetPickupValuesActn,
  getSetPickupAltValuesActn,
  getSetShippingValuesActn,
  getSetGiftWrapOptionsActn,
} from './Checkout.action';
import BAG_PAGE_ACTIONS from '../../BagPage/container/BagPage.actions';

const {
  getRecalcOrderPointsInterval,
  // getIsOrderHasShipping  ,
  // getShippingDestinationValues,
  // getDefaultAddress,
  // isGuest,
  // getIsMobile,
} = selectors;

function* loadGiftWrappingOptions() {
  try {
    const res = yield call(getGiftWrappingOptions);
    yield put(getSetGiftWrapOptionsActn(res));
  } catch (e) {
    // logErrorAndServerThrow(store, 'CheckoutOperator.loadGiftWrappingOptions', e);
    // throw e;
    console.log(e);
  }
}

const { getOrderPointsRecalcFlag } = utility;

function* loadUpdatedCheckoutValues(
  isUpdateRewards,
  isTaxCalculation,
  isCartNotRequired,
  recalcRewards,
  updateSmsInfo
) {
  const imageGenerator = getImgPath;
  const recalcOrderPointsInterval = yield select(getRecalcOrderPointsInterval);
  const recalcOrderPoints = yield call(
    getOrderPointsRecalcFlag,
    recalcRewards,
    recalcOrderPointsInterval
  );
  yield put(
    BAG_PAGE_ACTIONS.getCartData({
      isTaxCalculation,
      isCartNotRequired,
      imageGenerator,
      recalcRewards,
      recalcOrderPoints,
      isCheckoutFlow: true,
      updateSmsInfo,
    })
  );
  // const res = yield call(getCartData, {
  //   isTaxCalculation,
  //   isCartNotRequired,
  //   imageGenerator,
  //   recalcRewards,
  //   recalcOrderPoints,
  //   isCheckoutFlow: true,
  // });
  // yield call (storeUpdatedCheckoutValues, res.orderDetails, isCartNotRequired, updateSmsInfo);
  // Load coupons to the store after constructing the coupons structure
  // getWalletOperator(this.store).getWallet(res.coupons.offers);
}

// function setCartInfo(cartInfo, isSetCartItems) {
//   return updateCartInfo(cartInfo, isSetCartItems);
// }

function* storeUpdatedCheckoutValues(res /* isCartNotRequired, updateSmsInfo = true */) {
  // setCartInfo(cartInfo, isSetCartItems, shouldExportActions)

  const resCheckoutValues = res.payload.res.orderDetails.checkout;
  const actions = [
    resCheckoutValues.pickUpContact && getSetPickupValuesActn(resCheckoutValues.pickUpContact),
    resCheckoutValues.pickUpAlternative &&
      getSetPickupAltValuesActn(resCheckoutValues.pickUpAlternative),
    resCheckoutValues.shipping && getSetShippingValuesActn(resCheckoutValues.shipping),
    // resCheckoutValues.smsInfo && updateSmsInfo &&
    //   getSetSmsNumberForUpdatesActn(resCheckoutValues.smsInfo.numberForUpdates),
    // resCheckoutValues.giftWrap &&
    //   getSetGiftWrapValuesActn(
    //     {
    //       hasGiftWrapping:
    //       !!resCheckoutValues.giftWrap.optionId,
    //       ...resCheckoutValues.giftWrap
    //     }
    //   ),
    // resCheckoutValues.billing && getSetBillingValuesActn(resCheckoutValues.billing)
  ];
  yield all([...actions].map(action => put(action)));
  // if (checkoutStoreView.isExpressCheckout(this.store.getState()) && resCheckoutValues.billing && resCheckoutValues.billing.paymentMethod === 'venmo') {
  //   // We have
  //   this.store.dispatch(setVenmoPaymentInProgress(true));
  // }
}

function* loadCartAndCheckoutDetails(isRecalcRewards) {
  yield call(loadUpdatedCheckoutValues, null, null, null, isRecalcRewards);
  // const getIsShippingRequired = yield select(getIsOrderHasShipping);
  // if (getIsShippingRequired) {
  // let shippingAddress = {}; // yield select(getShippingDestinationValues);
  // shippingAddress = shippingAddress.address;
  // const defaultAddress = yield select(getDefaultAddress);
  // const hasShipping =
  //   (shippingAddress &&
  //     shippingAddress.country &&
  //     shippingAddress.state &&
  //     shippingAddress.zipCode) ||
  //   true;
  // const isGuestUser = yield select(isGuest);
  // const isMobile = getIsMobile;
  // if (!hasShipping /* && !defaultAddress */ || isGuestUser || isMobile) {
  // if some data is missing request defaults (new user would have preselected
  //  country and zipcode, but not state but service needs all 3 of them)
  // return '';
  /* loadShipmentMethods(
        this.store,
        {country: '', state: '', zipCode: ''},
        {state: true, zipCode: true},
        true,
        this.checkoutServiceAbstractor
      ); */
  // }
  // }
  return '';
}

function* loadStartupData(isPaypalPostBack, isRecalcRewards /* isVenmo */) {
  // if (isVenmo) {
  //   const venmoData = getLocalStorage(VENMO_STORAGE_KEY);
  //   if (venmoData) {
  //    this.setVenmoData(JSON.parse(venmoData));
  //   }
  //   if (!(venmoData && venmoData.details && venmoData.details.username)) {
  //     const contextAttributes = userStoreView.getContextAttributes(storeState);
  //     let username = '';
  //     if (contextAttributes && contextAttributes.venmoUserId) {
  //       username = contextAttributes.venmoUserId;
  //       this.setVenmoData({details: { username }});
  //     }
  //   }
  //   this.store.dispatch(setVenmoPaymentInProgress(parseBoolean(isVenmo)));
  //   this.setVenmoData({ pageLoading: false, loading: false });
  // }
  // let checkoutSignalsOperator = getCheckoutSignalsOperator(this.store);
  // let generalOperator = getGeneralOperator(this.store);
  // let pendingPromises = [
  yield call(loadGiftWrappingOptions);
  // ];
  yield call(loadCartAndCheckoutDetails, isRecalcRewards);
  //   let loadCartAndCheckoutDetails = () => {
  //     return this.loadUpdatedCheckoutValues(null, null, null, isRecalcRewards)
  //     .then(loadSelectedOrDefaultShippingMethods);
  // };

  // let loadSelectedOrDefaultShippingMethods = () => {
  //    We need the shipping methods to load AFTER the cart details
  //    in case there are already prefilled shipping details
  //    (such in paypal postback)

  //   };

  //   let displayPreScreenModal = (res) => {
  //     return getPlccOperator(this.store).optionalPlccOfferModal(
  //       res.plccEligible,
  //       res.prescreenCode).then(() => {
  //         return this.loadUpdatedCheckoutValues();
  //       });
  //   };

  //   let loadExpressCheckout = () => {
  //    On shipping we taking into acocunt if this is a gift or not.
  //    On express checkout we pre-screen no matter what,
  //    even though the user may have a gift order
  //     let shouldPreScreenUser = generalStoreView
  //       .getIsPrescreenFormEnabled(storeState) &&
  //       !userStoreView.getUserIsPlcc(storeState);

  //     let source = null;
  //     if (checkoutStoreView.isVenmoPaymentInProgress(this.store.getState())) {
  //       source = 'venmo';
  //     }

  //     return this.checkoutServiceAbstractor.startExpressCheckout(shouldPreScreenUser, source)
  //       .then((preScreenInfo) => {
  //         /* Doing displayPreScreenModal in parallel. The only issue i can see here is
  //         * if loadCartAndCheckoutDetails is not resolved by the time the user
  //         * navigates to the form we can not pre-set the address.
  //         * If this ever does become an issue then we can just push this out
  //         * and do it after the other api resolves.
  //         * Doing it this way should make the page seem more responsive however.
  //         */
  //         if(preScreenInfo.plccEligible) {displayPreScreenModal(preScreenInfo)};
  //         return loadCartAndCheckoutDetails();
  //       })
  //       .then(() => {
  //         const shippingValues = checkoutStoreView.getShippingDestinationValues(this.store.getState());
  //         const shippingAddress = (shippingValues && shippingValues.address) || {};
  //         loadShipmentMethods(
  //           this.store,
  //           {
  //             country: shippingAddress.country || '',
  //             state: shippingAddress.state || '',
  //             zipCode: shippingAddress.zipCode || ''
  //           },
  //           {state: true, zipCode: true},
  //           true,
  //           this.checkoutServiceAbstractor
  //         )
  //       })
  //       .catch(() => {
  //         this.store.dispatch(setIsExpressEligible(false));
  //         return loadCartAndCheckoutDetails();
  //       });
  //   };

  // if (userStoreView.isRemembered(storeState)) {
  //   getRoutingOperator(this.store).gotoPage(HOME_PAGE_SECTIONS[DRAWER_IDS.LOGIN]);
  //   return Promise.reject(
  //     new Error('Remembered user must login/logout before checkout')
  //   );
  // }

  // if (!isPaypalPostBack && checkoutStoreView.isExpressCheckout(storeState)) {
  //   pendingPromises.push(loadExpressCheckout());
  // } else {
  //   pendingPromises.push(loadCartAndCheckoutDetails());
  // }

  // if (!userStoreView.isGuest(storeState)) {
  //   pendingPromises.push(getPaymentCardsOperator(this.store)
  //     .loadCreditCardsOnAccount().then(res => {
  //       if (routingInfoStoreView.getIsMobile(storeState)) {
  //         const venmoData = checkoutStoreView.getVenmoData(this.store.getState());
  //         if (!(venmoData && venmoData.details && venmoData.details.username)) {
  //           const username = res && res.reduce((c, v) => (!c && v.cardType === 'VENMO' ? v.properties.venmoUserId : c), '');
  //           if (username) {
  //             this.setVenmoData({details: {username}});
  //           }
  //         }
  //       }
  //     }));
  //   pendingPromises.push(getAddressesOperator(this.store).loadAddressesOnAccount());
  // }

  // yield all(pendingPromises);
  // try{
  //     let storeState = this.store.getState();
  //     const venmoEnabled = isVenmo && generalStoreView.isVenmoDirectIntegrationEnabled(this.store.getState());
  //     const venmoNonceActive = checkoutStoreView.isVenmoNonceActive(this.store.getState());
  //      What if Venmo is enabled, goes directly to the billing page, but venmo app is not installed,
  //      we should check to check for the Venmo Error in location hash and try to close the tab or
  //      move user to the billing step.
  //     let gotoBillingStep = false;
  //     if (venmoEnabled
  //       && !venmoNonceActive
  //       && isClient()
  //       && checkoutStoreView.isShippingMethodValuesAvailable(this.store.getState())) {
  //       const location = routingInfoStoreView.getCurrentLocation(this.store.getState());
  //       if (location && location.pathname && location.hash) {
  //         const isBillingStepRequest = /^\/.*\/checkout\/billing\/?/gmi.test(location.pathname);
  //         const isVenmoError = parseHashParams(location.hash).venmoError;
  //         if (isVenmoError === '1' && isBillingStepRequest) {
  //           gotoBillingStep = true;
  //           if (window.opener) { // Let's try to close this tab since it was created by Venmo
  //             try {
  //               window.close();
  //               return;
  //             } catch(ex) {
  //               // Ok, we will navigate manually in the new tab.
  //               console.error("Trying to close extra tab created by Venmo", ex);
  //             }
  //           }
  //         }
  //       }
  //     }

  //     if(venmoEnabled
  //       && !gotoBillingStep
  //       && !venmoNonceActive
  //       && addressesStoreView.getDefaultAddress(storeState)) {
  //       gotoBillingStep = true;
  //     }

  //     const runPrescreenOnLoadVenmo = () => {
  //       const moveToReview = () => {
  //         generalOperator.setIsLoading(false);
  //         if (gotoBillingStep) {
  //           this.store.dispatch(getSetIsPaypalPaymentInProgress(true));
  //           checkoutSignalsOperator.openBillingSectionForm(true);
  //         } else {
  //           checkoutSignalsOperator.openReviewSectionForm(true);
  //         }
  //       };
  //       let billingAddressId = null;
  //       if (checkoutStoreView.isDefaultAddressUsed(storeState) || checkoutStoreView.isShippingMethodValuesAvailable(storeState) || addressesStoreView.getDefaultAddress(storeState)) {
  //          We need to submit Shipping address too
  //          setShippingMethodAndAddressId
  //         const shipToValues = checkoutStoreView.getInitialShippingSectionValues(storeState);
  //         if (shipToValues.shipTo && shipToValues.shipTo.addressId) {
  //           const shippingMethod = (shipToValues.shipTo && shipToValues.shipTo.method && shipToValues.shipTo.method.shippingMethodId) || checkoutStoreView.getDefaultShippingMethod(storeState);
  //           billingAddressId = shipToValues.shipTo.addressId;
  //           if (shippingMethod && cartStoreView.getIsOrderHasShipping(storeState)) {
  //             const prescreenEnabled = generalStoreView.getIsPrescreenFormEnabled(storeState) && !userStoreView.getUserIsPlcc(storeState);
  //             generalOperator.setIsLoading(true);
  //             this.checkoutServiceAbstractor.setShippingMethodAndAddressId(
  //               shippingMethod.id,
  //               billingAddressId,
  //               prescreenEnabled,
  //             )
  //               .then((res) => {
  //                 getPlccOperator(this.store).optionalPlccOfferModal(res.plccEligible, res.prescreenCode);
  //               })
  //               .then(() => {
  //                 // To rehydrate the store with updates to shipping.
  //                 // Asynchrously
  //                 this.loadUpdatedCheckoutValues(null, null, null, isRecalcRewards);
  //               })
  //               .finally(() => {
  //                 moveToReview();
  //               });
  //           } else {
  //             moveToReview();
  //           }
  //         } else {
  //           moveToReview();
  //         }
  //       } else {
  //         moveToReview();
  //       }
  //     };
  //     const handleVenmoNavigation = () => {
  //       if (!userStoreView.isGuest(storeState) && addressesStoreView.getDefaultAddress(storeState)) {
  //          We we go directly to the review section
  //         runPrescreenOnLoadVenmo();
  //       } else if (userStoreView.isGuest(storeState) && cartStoreView.getIsOrderHasPickup(storeState) && !checkoutStoreView.isPickupValuesAvailable(storeState)) {
  //         checkoutSignalsOperator.openPickupSectionForm(true);
  //         generalOperator.setIsLoading(false);
  //       } else if (cartStoreView.getIsOrderHasShipping(storeState) && !checkoutStoreView.isShippingMethodValuesAvailable(storeState)) {
  //         checkoutSignalsOperator.openShippingSectionForm(true);
  //         generalOperator.setIsLoading(false);
  //       } else {
  //         runPrescreenOnLoadVenmo();
  //       }
  //     };
  //     if (routingInfoStoreView.getIsMobile(storeState) && venmoEnabled && (venmoNonceActive || gotoBillingStep)) {
  //       handleVenmoNavigation();
  //     } else if (isPaypalPostBack || checkoutStoreView.isExpressCheckout(storeState)) {
  //       checkoutSignalsOperator.openReviewSectionForm(true);
  //       generalOperator.setIsLoading(false);
  //     } else if (cartStoreView.getIsOrderHasPickup(storeState)) {
  //       checkoutSignalsOperator.openPickupSectionForm(true);
  //       generalOperator.setIsLoading(false);
  //     } else {
  //       checkoutSignalsOperator.openShippingSectionForm(true);
  //       generalOperator.setIsLoading(false);
  //     }
  //   } catch(err) {
  //     logErrorAndServerThrow(this.store, 'CheckoutOperator.loadStartupData', err);
  //     generalOperator.setIsLoading(false);
  //   }
}

function* initCheckout() {
  // const location = yield select(getCurrentLocation);   // -------- WIll get QueryParams from the PAge URL using NEXT
  // let queryObject = queryString.parse(location.search);
  // yield call (loadStartupData, queryObject[PAYPAL_REDIRECT_PARAM],
  //   queryObject[config.QUERY_PARAM.RECALC_REWARDS],
  //   parseBoolean(getLocalStorage(VENMO_INPROGRESS_KEY)),
  // )
  yield call(loadStartupData);
}

export function* CheckoutSaga() {
  yield takeLatest(constants.INIT_CHECKOUT, initCheckout);
  yield takeLatest('CHECKOUT_SET_CART_DATA', storeUpdatedCheckoutValues);
}

export default CheckoutSaga;
