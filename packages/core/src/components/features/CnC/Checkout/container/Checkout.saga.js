/* eslint-disable extra-rules/no-commented-out-code */
import { call, takeLatest, put, all, select } from 'redux-saga/effects';
import logger from '@tcp/core/src/utils/loggerInstance';
import { formValueSelector } from 'redux-form';
import setLoaderState from '@tcp/core/src/components/common/molecules/Loader/container/Loader.actions';
import CONSTANTS, { CHECKOUT_ROUTES } from '../Checkout.constants';
import {
  getShippingMethods,
  setShippingMethodAndAddressId,
  getInternationCheckoutSettings,
  startExpressCheckout,
} from '../../../../../services/abstractors/CnC/index';
import selectors, { isGuest, isExpressCheckout } from './Checkout.selector';
import utility from '../util/utility';
import CHECKOUT_ACTIONS, {
  getSetPickupValuesActn,
  getSetPickupAltValuesActn,
  getSetShippingValuesActn,
  getSetBillingValuesActn,
  setIsLoadingShippingMethods,
  setShippingOptions,
  setAddressError,
  getSetCheckoutStage,
} from './Checkout.action';
import { getCartDataSaga } from '../../BagPage/container/BagPage.saga';
import BagPageSelectors from '../../BagPage/container/BagPage.selectors';
import { getAddressList } from '../../../account/AddressBook/container/AddressBook.saga';
import { getCardList } from '../../../account/Payment/container/Payment.saga';
import { isMobileApp } from '../../../../../utils';
import {
  updateShipmentMethodSelection,
  updateShippingAddress,
  addNewShippingAddress,
  addRegisteredUserAddress,
  routeToPickupPage,
  addAndSetGiftWrappingOptions,
  getVenmoClientTokenSaga,
  saveLocalSmsInfo,
  addOrEditGuestUserAddress,
  callPickupSubmitMethod,
  callUpdateRTPS,
  handleServerSideErrorAPI,
  submitAcceptOrDeclinePlccData,
  handleCheckoutInitRouting,
  makeUpdateRTPSCall,
  shouldInvokeReviewCartCall,
  redirectFromExpress,
  getGiftWrapOptionsData,
} from './Checkout.saga.util';
import BAG_PAGE_ACTIONS from '../../BagPage/container/BagPage.actions';
import { submitEmailSignup, pickUpRouting } from './CheckoutExtended.saga.util';
import submitBilling, { updateCardDetails, submitVenmoBilling } from './CheckoutBilling.saga';
import submitOrderForProcessing from './CheckoutReview.saga';
import { submitVerifiedAddressData, submitShippingSectionData } from './CheckoutShipping.saga';
import { getIsInternationalShipping } from '../../../../../reduxStore/selectors/session.selectors';

const { getIsOrderHasShipping, getShippingDestinationValues, getDefaultAddress } = selectors;
const { getGiftServicesFormData, getShipmentMethods, getCurrentCheckoutStage } = selectors;
const { hasPOBox } = utility;
let oldHasPOB = {};

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
    resCheckoutValues.giftWrap &&
      CHECKOUT_ACTIONS.getSetGiftWrapValuesActn({
        hasGiftWrapping: !!resCheckoutValues.giftWrap.optionId,
        ...resCheckoutValues.giftWrap,
      }),
    resCheckoutValues.billing && getSetBillingValuesActn(resCheckoutValues.billing),
  ];
  yield all(actions.map(action => put(action)));
  // if (checkoutStoreView.isExpressCheckout(this.store.getState()) && resCheckoutValues.billing && resCheckoutValues.billing.paymentMethod === 'venmo') {
  //   // We have
  //   this.store.dispatch(setVenmoPaymentInProgress(true));
  // }
}

function* submitPickupSection({ payload }) {
  try {
    const formData = { ...payload };
    const { navigation } = payload;
    const isGuestUser = yield select(isGuest);
    const getIsShippingRequired = yield select(getIsOrderHasShipping);
    yield put(setLoaderState(true));
    yield submitEmailSignup(formData.pickUpContact.emailAddress, formData);
    const result = yield call(callPickupSubmitMethod, formData);
    yield put(setLoaderState(false));

    if (result.addressId) {
      if (!isGuestUser) {
        yield call(getAddressList);
        yield call(getCardList, { ignoreCache: true });
      }
      if (!isMobileApp()) {
        const isVenmoInProgress = yield select(selectors.isVenmoPaymentInProgress);
        const isVenmoPickupDisplayed = yield select(selectors.isVenmoPickupBannerDisplayed);
        pickUpRouting({ getIsShippingRequired, isVenmoInProgress, isVenmoPickupDisplayed });
      } else if (navigation) {
        if (getIsShippingRequired) {
          yield put(getSetCheckoutStage(CONSTANTS.SHIPPING_DEFAULT_PARAM));
        } else yield put(getSetCheckoutStage(CONSTANTS.BILLING_DEFAULT_PARAM));
      }
    }
    /* In the future I imagine us sending the SMS to backend for them to
        store so it will be loaded in the below loadUpdatedCheckoutValues function.
        for now we are storing it only on browser so will lose this info on page re-load.
      */
    // eslint-disable-next-line no-unused-expressions
    // formData.pickUpContact.smsInfo && saveLocalSmsInfo(this.store, formData.pickUpContact.smsInfo);
    // return getCheckoutOperator(this.store).loadUpdatedCheckoutValues(false, true, true, false, !wantsSmsOrderUpdates);
    // }).catch((err) => {
    //   throw getSubmissionError(this.store, 'submitPickupSection', err);
    // });
    yield put(setLoaderState(false));
  } catch (e) {
    yield put(setLoaderState(false));

    yield call(handleServerSideErrorAPI, e);
  }
}
// function setCartInfo(cartInfo, isSetCartItems) {
//   return updateCartInfo(cartInfo, isSetCartItems);
// }
function* loadShipmentMethods(miniAddress, throwError) {
  let address;

  if (miniAddress.formName) {
    const addressSelector = formValueSelector(miniAddress.formName);
    const addressValues = yield select(addressSelector, 'address');
    address = {
      ...addressValues,
      state: miniAddress.state || addressValues.state,
    };
  } else {
    address = miniAddress;
  }
  try {
    const labels = yield select(BagPageSelectors.getErrorMapping);
    yield put(setIsLoadingShippingMethods(true));
    const res = yield getShippingMethods(
      address.state || '',
      address.zipCode || '',
      address.addressLine1 || '',
      address.addressLine2 || '',
      labels
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
  return yield loadShipmentMethods(miniAddress, throwError);
}

function* initShippingData(pageName) {
  if (pageName === CONSTANTS.CHECKOUT_STAGES.SHIPPING) {
    yield call(getGiftWrapOptionsData);
    let shippingAddress = yield select(getShippingDestinationValues);
    const shipmentMethods = yield select(getShipmentMethods);
    shippingAddress = shippingAddress.address;
    const defaultAddress = yield select(getDefaultAddress);
    const hasShipping =
      shippingAddress &&
      shippingAddress.country &&
      shippingAddress.state &&
      shippingAddress.zipCode;
    const isGuestUser = yield select(isGuest);
    if (isGuestUser || (!hasShipping && !defaultAddress) || !shipmentMethods.length) {
      yield call(
        validDateAndLoadShipmentMethods,
        { country: '', state: '', zipCode: '' },
        { state: true, zipCode: true },
        true
      );
    }
  }
}

function* triggerInternationalCheckoutIfRequired() {
  const isInternationalShipping = yield select(getIsInternationalShipping);
  if (isInternationalShipping && !isMobileApp()) {
    return utility.routeToPage(CHECKOUT_ROUTES.internationalCheckout);
  }
  return null;
}

function* initCheckoutSectionData({ payload }) {
  const { recalc, pageName, isPaypalPostBack, appRouting, navigation, initialLoad } = payload;
  yield call(triggerInternationalCheckoutIfRequired);
  const isExpressCheckoutEnabled = yield select(isExpressCheckout);
  const { PICKUP, SHIPPING, BILLING } = CONSTANTS.CHECKOUT_STAGES;
  const pendingPromises = [];
  if (pageName === PICKUP || pageName === BILLING || pageName === SHIPPING) {
    if (!appRouting) {
      pendingPromises.push(
        call(getCartDataSaga, {
          payload: {
            isRecalculateTaxes: false,
            excludeCartItems: false,
            recalcRewards: recalc,
            updateSmsInfo: false,
            translation: true,
            isCheckoutFlow: true,
          },
        })
      );
    }
  } else if (shouldInvokeReviewCartCall(isExpressCheckoutEnabled, payload)) {
    pendingPromises.push(
      call(getCartDataSaga, {
        payload: {
          isRecalculateTaxes: true,
          excludeCartItems: false,
          recalcRewards: recalc,
          updateSmsInfo: false,
          translation: true,
          isCheckoutFlow: true,
        },
      })
    );
  }

  yield all(pendingPromises);
  const requestedStage = yield call(handleCheckoutInitRouting, { pageName }, appRouting);
  yield call(initShippingData, requestedStage, initialLoad);
  const isVenmoInProgress = yield select(selectors.isVenmoPaymentInProgress);
  if (makeUpdateRTPSCall(pageName, isPaypalPostBack, isExpressCheckoutEnabled, isVenmoInProgress)) {
    yield call(callUpdateRTPS, pageName, navigation, isPaypalPostBack, isVenmoInProgress);
  }
}

// function* displayPreScreenModal (res) {
//   return getPlccOperator(this.store).optionalPlccOfferModal(
//     res.plccEligible,
//     res.prescreenCode).then(() => {
//       return this.loadUpdatedCheckoutValues();
//     });
// };

function* triggerExpressCheckout(
  recalcRewards,
  section,
  navigation,
  isPaypalPostBack,
  shouldPreScreenUser = false,
  source = null
) {
  let pageName = section;
  if (isMobileApp()) {
    pageName = yield select(getCurrentCheckoutStage);
    pageName = pageName.toLowerCase();
  }
  try {
    yield put(BAG_PAGE_ACTIONS.setBagPageLoading());
    const isVenmoInProgress = yield select(selectors.isVenmoPaymentInProgress);
    const res = yield startExpressCheckout(shouldPreScreenUser, source);
    if (!res.orderId) {
      return yield redirectFromExpress();
    }
    yield call(getCartDataSaga, {
      payload: {
        isRecalculateTaxes: false,
        excludeCartItems: false,
        recalcRewards,
        isCheckoutFlow: true,
        translation: true,
      },
    });
    if (!isPaypalPostBack) {
      yield call(callUpdateRTPS, pageName, navigation, isPaypalPostBack, isVenmoInProgress);
    }
    const shippingValues = yield select(getShippingDestinationValues);
    const shippingAddress = (shippingValues && shippingValues.address) || {};
    return yield validDateAndLoadShipmentMethods(
      {
        country: shippingAddress.country || '',
        state: shippingAddress.state || '',
        zipCode: shippingAddress.zipCode || '',
      },
      { state: true, zipCode: true },
      true
    );
  } catch (e) {
    return yield redirectFromExpress();
  }
}

function* loadExpressCheckout(isRecalcRewards, section, navigation, isPaypalPostBack) {
  //    On shipping we taking into acocunt if this is a gift or not.
  //    On express checkout we pre-screen no matter what,
  //    even though the user may have a gift order
  // const isPreScreenEnabled = yield select(selectors.getIsPreScreenEnabled);
  // const isUserPlcc = yield select(isPlccUser);
  // const shouldPreScreenUser = false;
  // const shouldPreScreenUser = isPreScreenEnabled && !isUserPlcc;
  //     let source = null;
  //     if (checkoutStoreView.isVenmoPaymentInProgress(this.store.getState())) {
  //       source = 'venmo';
  //     }
  yield call(triggerExpressCheckout, isRecalcRewards, section, navigation, isPaypalPostBack);
}

function* loadStartupData(isPaypalPostBack, isRecalcRewards, section, navigation /* isVenmo */) {
  const isExpressCheckoutEnabled = yield select(isExpressCheckout);
  const isGuestUser = yield select(isGuest);
  // const isOrderHasPickup = yield select(selectors.getIsOrderHasPickup);
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
  const pendingPromises = [];
  //   let loadCartAndCheckoutDetails = () => {
  //     return this.loadUpdatedCheckoutValues(null, null, isRecalcRewards)
  //     .then(loadSelectedOrDefaultShippingMethods);
  // };

  // let loadSelectedOrDefaultShippingMethods = () => {
  //    We need the shipping methods to load AFTER the cart details
  //    in case there are already prefilled shipping details
  //    (such in paypal postback)

  //   };

  // if (userStoreView.isRemembered(storeState)) {
  //   getRoutingOperator(this.store).gotoPage(HOME_PAGE_SECTIONS[DRAWER_IDS.LOGIN]);
  //   return Promise.reject(
  //     new Error('Remembered user must login/logout before checkout')
  //   );
  // }

  if (!isPaypalPostBack && isExpressCheckoutEnabled) {
    pendingPromises.push(
      call(loadExpressCheckout, isRecalcRewards, section, navigation, isPaypalPostBack)
    );
  } else if (!isGuestUser) {
    pendingPromises.push(call(getAddressList));
  }

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

  yield all(pendingPromises);
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
  //                 this.loadUpdatedCheckoutValues(null, null, isRecalcRewards);
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
  // if (routingInfoStoreView.getIsMobile(storeState) && venmoEnabled && (venmoNonceActive || gotoBillingStep)) {
  //   handleVenmoNavigation();
  // } else
  // if (!isMobileApp()) {
  // if (isPaypalPostBack || isExpressCheckoutEnabled) {
  //  utility.routeToPage(CHECKOUT_ROUTES.reviewPage, { recalc: false });
  // generalOperator.setIsLoading(false);
  // } else if (isOrderHasPickup) {
  //  utility.routeToPage(CHECKOUT_ROUTES.pickupPage, { recalc: false });
  // generalOperator.setIsLoading(false);
  // } else {
  // utility.routeToPage(CHECKOUT_ROUTES.shippingPage, { recalc: false });
  // generalOperator.setIsLoading(false);
  // }
  // }

  //   } catch(err) {
  //     logErrorAndServerThrow(this.store, 'CheckoutOperator.loadStartupData', err);
  //     generalOperator.setIsLoading(false);
  //   }
}

function* initCheckout({ router, isPaypalFlow, navigation }) {
  let isPaypalPostBack;
  let recalc;
  let section;
  if (router && router.query) {
    const { query } = router;
    ({ isPaypalPostBack, recalc, section } = query);
  }
  if (isMobileApp() && isPaypalFlow) {
    isPaypalPostBack = isPaypalFlow;
  }

  try {
    yield call(loadStartupData, isPaypalPostBack, recalc, section, navigation);
  } catch (e) {
    logger.error(e);
  }
}

/**
 * initIntlCheckout component. This is responsible for initiating actions required for start of international checkout journey.
 */
function* initIntlCheckout() {
  try {
    const res = yield call(getInternationCheckoutSettings);
    yield put(CHECKOUT_ACTIONS.getSetIntlUrl(res.checkoutUrl));
  } catch (e) {
    logger.error(`initIntlCheckout:${e}`);
  }
}

function* submitShipping({
  isEmailSignUpAllowed,
  emailSignUp = {},
  emailAddress,
  isGuestUser,
  address,
  onFileAddressKey,
  setAsDefault,
  phoneNumber,
  saveToAccount,
  method,
  smsInfo,
  hasSetGiftOptions,
}) {
  const { emailSignUp: emailSignUpTCP, emailSignUpGYM } = emailSignUp;
  const giftServicesFormData = yield select(getGiftServicesFormData);
  yield addAndSetGiftWrappingOptions(giftServicesFormData, hasSetGiftOptions);
  yield put(setAddressError(null));
  const pendingPromises = [
    // add the requested gift wrap options
    // giftWrap.hasGiftWrapping && call(addGiftWrappingOption, giftWrap.message, giftWrap.optionId),
    // remove old gift wrap option (if any)
    // !giftWrap.hasGiftWrapping && giftWrappingStoreOptionID && call(removeGiftWrappingOption),
    // sign up to receive mail newsletter
    isEmailSignUpAllowed &&
      (emailSignUpTCP || emailSignUpGYM) &&
      submitEmailSignup(emailAddress, { emailSignUpTCP, emailSignUpGYM }),
  ];
  let addOrEditAddressRes;
  if (isGuestUser) {
    const oldShippingDestination = yield select(getShippingDestinationValues);
    addOrEditAddressRes = yield addOrEditGuestUserAddress({
      oldShippingDestination,
      address,
      phoneNumber,
      emailAddress,
      saveToAccount,
      setAsDefault,
    });
  } else {
    addOrEditAddressRes = yield addRegisteredUserAddress({
      onFileAddressKey,
      address,
      phoneNumber,
      emailAddress,
      setAsDefault,
      saveToAccount,
    });
  }
  const {
    payload: { addressId },
  } = addOrEditAddressRes;
  // Retrieve phone number info for sms updates
  yield saveLocalSmsInfo(smsInfo);
  yield all(pendingPromises);
  yield call(
    setShippingMethodAndAddressId,
    method.shippingMethodId,
    addressId,
    false, // generalStoreView.getIsPrescreenFormEnabled(storeState) && !giftWrap.hasGiftWrapping && !userStoreView.getUserIsPlcc(storeState)
    smsInfo ? smsInfo.smsUpdateNumber : null,
    yield select(BagPageSelectors.getErrorMapping)
  );
  // return getPlccOperator(store)
  //   .optionalPlccOfferModal(res.plccEligible, res.prescreenCode)
  // REVIEW: the true indicates to load the reward data for user.
  // But how can the reward points change here?
  yield select(selectors.getSmsNumberForOrderUpdates);
  if (!isGuestUser) {
    yield call(getAddressList);
  }
}

export function* submitBillingSection(action) {
  const isVenmoInProgress = yield select(selectors.isVenmoPaymentInProgress);
  yield put(setLoaderState(true));
  if (isVenmoInProgress) {
    yield call(submitVenmoBilling, action);
  } else {
    yield call(submitBilling, action);
  }
  yield put(setLoaderState(false));
}

export function* submitShippingSection(action) {
  yield submitShippingSectionData(action, submitShipping);
}

export function* submitVerifiedAddress(action) {
  yield submitVerifiedAddressData(action, submitShipping);
}

export function* CheckoutSaga() {
  yield takeLatest(CONSTANTS.INIT_CHECKOUT, initCheckout);
  yield takeLatest(CONSTANTS.INIT_CHECKOUT_SECTION_PAGE, initCheckoutSectionData);
  // yield takeLatest(CONSTANTS.INIT_SHIPPING_PAGE, initShippingData);
  // yield takeLatest(CONSTANTS.INIT_BILLING_PAGE, initBillingData);
  // yield takeLatest(CONSTANTS.INIT_REVIEW_PAGE, initReviewData);
  yield takeLatest(CONSTANTS.CHECKOUT_SUBMIT_VERIFIED_SHIPPING_ADDRESS, submitVerifiedAddress);
  yield takeLatest('INIT_INTL_CHECKOUT', initIntlCheckout);
  yield takeLatest('CHECKOUT_SET_CART_DATA', storeUpdatedCheckoutValues);
  yield takeLatest(CONSTANTS.SUBMIT_SHIPPING_SECTION, submitShippingSection);
  yield takeLatest(CONSTANTS.SUBMIT_BILLING_SECTION, submitBillingSection);
  yield takeLatest('CHECKOUT_SUBMIT_PICKUP_DATA', submitPickupSection);
  yield takeLatest(CONSTANTS.CHECKOUT_LOAD_SHIPMENT_METHODS, loadShipmentMethods);
  yield takeLatest(CONSTANTS.ROUTE_TO_PICKUP_PAGE, routeToPickupPage);
  yield takeLatest(
    CONSTANTS.CHECKOUT_UPDATE_SHIPMENT_METHOD_SELECTION,
    updateShipmentMethodSelection
  );
  yield takeLatest(CONSTANTS.UPDATE_SHIPPING_ADDRESS, updateShippingAddress);
  yield takeLatest(CONSTANTS.ADD_NEW_SHIPPING_ADDRESS, addNewShippingAddress);
  yield takeLatest(CONSTANTS.SUBMIT_REVIEW_SECTION, submitOrderForProcessing);
  yield takeLatest(CONSTANTS.GET_VENMO_CLIENT_TOKEN, getVenmoClientTokenSaga);
  yield takeLatest(CONSTANTS.UPDATE_CARD_DATA, updateCardDetails);
  yield takeLatest(CONSTANTS.SUBMIT_ACCEPT_DECLINE_PLCC_OFFER, submitAcceptOrDeclinePlccData);
}
export default CheckoutSaga;
