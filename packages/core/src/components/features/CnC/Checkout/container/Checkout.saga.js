/* eslint-disable extra-rules/no-commented-out-code */

import { call, takeLatest, put, all, select } from 'redux-saga/effects';
import { subscribeEmail } from '@tcp/web/src/components/common/molecules/EmailSignupModal/container/EmailSignupModal.saga';
import { getImgPath } from '@tcp/core/src/components/features/browse/ProductListingPage/util/utility';
import constants from '../Checkout.constants';
import {
  getGiftWrappingOptions,
  getShippingMethods,
  briteVerifyStatusExtraction,
  setShippingMethodAndAddressId,
  addPickupPerson,
} from '../../../../../services/abstractors/CnC/index';
import selectors, { isGuest } from './Checkout.selector';
import { getUserEmail } from '../../../account/User/container/User.selectors';
import utility from '../util/utility';
import {
  getSetPickupValuesActn,
  getSetPickupAltValuesActn,
  getSetShippingValuesActn,
  getSetGiftWrapOptionsActn,
  setIsLoadingShippingMethods,
  setShippingOptions,
  setAddressError,
  setSmsNumberForUpdates,
} from './Checkout.action';
import BAG_PAGE_ACTIONS from '../../BagPage/container/BagPage.actions';
// import { getUserEmail } from '../../../account/User/container/User.selectors';
import { isCanada } from '../../../../../utils/utils';
import { addAddressGet } from '../../../../common/organisms/AddEditAddress/container/AddEditAddress.saga';
// import { addAddress } from '../../../../../services/abstractors/account/AddEditAddress';

const {
  getRecalcOrderPointsInterval,
  getIsOrderHasShipping,
  getShippingDestinationValues,
  getDefaultAddress,
  // isUsSite,
  // getIsOrderHasShipping  ,
  // getShippingDestinationValues,
  // getDefaultAddress,
  // isGuest,
  // getIsMobile,
} = selectors;

const { getOrderPointsRecalcFlag, hasPOBox } = utility;

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

let oldHasPOB = {};

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

// eslint-disable-next-line complexity
function* submitPickupSection(data) {
  const { payload } = data;
  const formData = { ...payload };
  // let pickupOperator = getPickupOperator(this.store);
  // let storeState = this.store.getState();
  // let isEmailSignUpAllowed = true;

  // if ((yield select(isUsSite)) && (yield select(isGuest))) {
  //   isEmailSignUpAllowed = false;
  // }

  //  if (formData.pickUpContact.emailSignup && formData.pickUpContact.emailAddress && isEmailSignUpAllowed) {
  //    // pendingPromises.push(this.userServiceAbstractor.validateAndSubmitEmailSignup(formData.pickUpContact.emailAddress));
  //  }
  yield call(addPickupPerson, {
    firstName: formData.pickUpContact.firstName,
    lastName: formData.pickUpContact.lastName,
    phoneNumber: formData.pickUpContact.phoneNumber,
    emailAddress:
      formData.pickUpContact.emailAddress ||
      (yield select(isGuest) ? yield select(getUserEmail) : ''),
    alternateEmail:
      formData.hasAlternatePickup && formData.pickUpAlternate
        ? formData.pickUpAlternate.emailAddress
        : '',
    alternateFirstName:
      formData.hasAlternatePickup && formData.pickUpAlternate
        ? formData.pickUpAlternate.firstName
        : '',
    alternateLastName:
      formData.hasAlternatePickup && formData.pickUpAlternate
        ? formData.pickUpAlternate.lastName
        : '',
  });
  /* In the future I imagine us sending the SMS to backend for them to
       store so it will be loaded in the below loadUpdatedCheckoutValues function.
       for now we are storing it only on browser so will lose this info on page re-load.
    */
  // eslint-disable-next-line no-unused-expressions
  // formData.pickUpContact.smsInfo && saveLocalSmsInfo(this.store, formData.pickUpContact.smsInfo);
  const { wantsSmsOrderUpdates } = formData.pickUpContact && formData.pickUpContact.smsInfo;
  yield call(loadUpdatedCheckoutValues, false, true, true, false, !wantsSmsOrderUpdates);
  // return getCheckoutOperator(this.store).loadUpdatedCheckoutValues(false, true, true, false, !wantsSmsOrderUpdates);
  // }).catch((err) => {
  //   throw getSubmissionError(this.store, 'submitPickupSection', err);
  // });
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
    //   setSmsNumberForUpdates(resCheckoutValues.smsInfo.numberForUpdates),
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
function* loadShipmentMethods(miniAddress, throwError) {
  try {
    const res = yield getShippingMethods(
      miniAddress.state,
      miniAddress.zipCode,
      miniAddress.addressLine1,
      miniAddress.addressLine2
    );
    yield all([setShippingOptions(res), setIsLoadingShippingMethods(false)].map(val => put(val)));
  } catch (err) {
    yield put(setIsLoadingShippingMethods(false));
    if (throwError) {
      throw err;
    }
  }
}

function* validDateAndLoadShipmentMethods(miniAddress, changhedFlags, throwError) {
  // Note: this convoluted logic is due to BE. If address lines do not contain a pobox
  // then in the US we should only respond to state changes, and in Canada only to
  // zipcode changes. And we also have to react to any change if switching from having
  // to not having a pobox, or a change in address lines if currently has a pobox
  const newHasPOB = hasPOBox(miniAddress.addressLine1, miniAddress.addressLine2);
  if (
    !(
      oldHasPOB !== newHasPOB ||
      (newHasPOB && (changhedFlags.addressLine1 || changhedFlags.addressLine2))
    ) &&
    // zipCode changed, but not state
    ((miniAddress.country === 'US' && !changhedFlags.state) ||
      // state changed, but not zipCode
      (miniAddress.country === 'CA' && !changhedFlags.zipCode))
  ) {
    // shipping methods are the same as we already have
    return yield;
  }
  oldHasPOB = newHasPOB;

  yield put(setIsLoadingShippingMethods(true));
  return yield loadShipmentMethods(miniAddress, throwError);
}

function* loadCartAndCheckoutDetails(isRecalcRewards) {
  yield call(loadUpdatedCheckoutValues, null, null, null, isRecalcRewards);
  const getIsShippingRequired = yield select(getIsOrderHasShipping);
  if (getIsShippingRequired) {
    let shippingAddress = yield select(getShippingDestinationValues);
    shippingAddress = shippingAddress.address;
    const defaultAddress = yield select(getDefaultAddress);
    const hasShipping =
      shippingAddress &&
      shippingAddress.get('country') &&
      shippingAddress.get('state') &&
      shippingAddress.get('zipCode');
    const isGuestUser = yield select(isGuest);
    // const isMobile = getIsMobile;
    if (isGuestUser || (!hasShipping && !defaultAddress)) {
      // isMobile check is left

      // if some data is missing request defaults (new user would have preselected
      //  country and zipcode, but not state but service needs all 3 of them)
      yield validDateAndLoadShipmentMethods(
        { country: '', state: '', zipCode: '' },
        { state: true, zipCode: true },
        true
      );
    }
  }
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

function* saveLocalSmsInfo(smsInfo) {
  let returnVal;
  if (smsInfo) {
    const { wantsSmsOrderUpdates, smsUpdateNumber } = smsInfo;
    if (wantsSmsOrderUpdates) {
      returnVal = yield call(setSmsNumberForUpdates, smsUpdateNumber);
    } else {
      returnVal = yield call(setSmsNumberForUpdates(null));
    }
  }
  return returnVal;
}

function* validateAndSubmitEmailSignup(isEmailSignUpAllowed, emailSignup, emailAddress) {
  if (isEmailSignUpAllowed && emailSignup && emailAddress) {
    const statusCode = call(briteVerifyStatusExtraction, emailAddress);
    yield subscribeEmail({ payload: emailAddress }, statusCode);
  }
}

function* submitShippingSection({ payload: formData }) {
  // console.log('>>>', { formData });
  const {
    // giftWrap,
    method,
    smsInfo,
    shipTo: {
      // onFileAddressKey,
      address,
      setAsDefault,
      phoneNumber,

      saveToAccount,
      emailSignup,
    },
  } = formData;
  let { emailAddress } = formData;
  let isEmailSignUpAllowed = true;
  const recalcFlag = false;
  const isGuestUser = yield select(isGuest);
  if (!emailAddress || !isGuestUser) {
    // on registered user entering a new address the email field is not visible -> emailAddress = null
    emailAddress = yield select(getUserEmail);
  }

  const isCanadaUser = yield select(isCanada);
  if (!isCanadaUser && isGuestUser) {
    isEmailSignUpAllowed = false;
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

  yield put(setAddressError(null));

  const pendingPromises = [
    // add the requested gift wrap options
    // giftWrap.hasGiftWrapping && call(addGiftWrappingOption, giftWrap.message, giftWrap.optionId),
    // remove old gift wrap option (if any)
    // !giftWrap.hasGiftWrapping && giftWrappingStoreOptionID && call(removeGiftWrappingOption),
    // sign up to receive mail newsletter
    validateAndSubmitEmailSignup(isEmailSignUpAllowed, emailSignup, emailAddress),
  ];
  let addOrEditAddressRes;
  if (isGuestUser) {
    const oldShippingDestination = yield select(getShippingDestinationValues);
    if (!oldShippingDestination.onFileAddressKey) {
      // guest user that is using a new address
      addOrEditAddressRes = yield call(
        addAddressGet,
        {
          payload: {
            ...address,
            address1: address.addressLine1,
            address2: address.addressLine2,
            zip: address.zipCode,
            phoneNumber,
            email: emailAddress,
            primary: setAsDefault,
            phone1Publish: `${saveToAccount}`,
            fromPage: 'checkout',
          },
        },
        false
      );
    }
    // else {
    // guest user is editing a previously entered shipping address
    // addOrEditAddressRes = yield call(
    //   updateAddress,
    //   { address, phoneNumber, emailAddress, addressKey: oldShippingDestination.onFileAddressKey },
    //   {},
    //   false
    // );
    // }
  } // else {
  // if (onFileAddressKey) {
  //   let selectedAddressBookEntry = yield select(getAddressByKey(onFileAddressKey));
  //   addOrEditAddressPromise = new Promise(resolve =>
  //     resolve({ addressId: selectedAddressBookEntry && selectedAddressBookEntry.addressId })
  //   );
  // } else {
  //   let oldShippingDestination = yield select(getShippingDestinationValues);
  //   let oldSelectedAddressBookEntry = yield select(
  //     getAddressByKey(store.getState(), oldShippingDestination.onFileAddressKey)
  //   );
  //   onFileAddressKey = !oldSelectedAddressBookEntry
  //     ? oldShippingDestination.onFileAddressKey
  //     : null;
  //   addOrEditAddressPromise = addressesOperator.addAddress(
  //     { address, phoneNumber, emailAddress, addressKey: onFileAddressKey },
  //     { isDefault: setAsDefault, saveToAccount: saveToAccount },
  //     true // add to address book inside redux-store
  //   );
  // }
  // }

  // Retrieve phone number info for sms updates
  const transVibesSmsPhoneNo = smsInfo ? smsInfo.smsUpdateNumber : null;
  // eslint-disable-next-line no-unused-expressions
  yield saveLocalSmsInfo(smsInfo);
  yield all(pendingPromises);
  try {
    yield call(
      setShippingMethodAndAddressId,
      method.shippingMethodId,
      addOrEditAddressRes.addressId,
      false, // generalStoreView.getIsPrescreenFormEnabled(storeState) && !giftWrap.hasGiftWrapping && !userStoreView.getUserIsPlcc(storeState)
      transVibesSmsPhoneNo,
      addOrEditAddressRes.addressKey
    );
    // return getPlccOperator(store)
    //   .optionalPlccOfferModal(res.plccEligible, res.prescreenCode)
    // REVIEW: the true indicates to load the reward data for user.
    // But how can the reward points change here?
    const isOrderHasPickup = yield select(selectors.getIsOrderHasPickup);
    const smsNumberForOrderUpdates = yield select(selectors.getSmsNumberForOrderUpdates);
    yield loadUpdatedCheckoutValues(
      true,
      false,
      true,
      recalcFlag,
      !(isOrderHasPickup && smsNumberForOrderUpdates)
    );
  } catch (err) {
    // throw getSubmissionError(store, 'submitShippingSection', err);
  }
}

export function* CheckoutSaga() {
  yield takeLatest(constants.INIT_CHECKOUT, initCheckout);
  yield takeLatest('CHECKOUT_SET_CART_DATA', storeUpdatedCheckoutValues);
  yield takeLatest(constants.SUBMIT_SHIPPING_SECTION, submitShippingSection);
  yield takeLatest('CHECKOUT_SUBMIT_PICKUP_DATA', submitPickupSection);
  yield takeLatest(constants.CHECKOUT_LOAD_SHIPMENT_METHODS, loadShipmentMethods);
}

export default CheckoutSaga;
