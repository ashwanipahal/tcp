/* eslint-disable extra-rules/no-commented-out-code */
import queryString from 'query-string';
import { routerPush, isMobileApp } from '@tcp/core/src/utils';
import {
  getSetCurrentOrderIdActn,
  getSetCartActn,
  getSetEstimatedAirMilesActn,
  getSetGiftWrappingTotalActn,
  getSetGiftCardTotalActn,
  setShippingTotal,
  getSetCartStoreActn,
  setTaxesTotal,
  getSetCouponsTotalActn,
  setSavingsTotal,
  getSetItemsTotalAction,
  setItemsCount,
  getSetSubTotal,
  getSetSubTotalWithDiscountsActn,
  getSetGrandTotal,
  getSetRewardsToBeEarnedActn,
  getSetIsPayPalEnabledActn,
  setCartTotalAfterPLCCDiscount,
  getSetPointsAndRewardsActn,
  getSetGiftCardValuesActn,
  getSetAirmilesPromoIdActn,
  getSetAirmilesAccountActn,
} from '../container/Checkout.action';
import CardConstants from '../../../account/AddEditCreditCard/container/AddEditCreditCard.constants';
import CreditCardConstants from '../organisms/BillingPaymentForm/container/CreditCard.constants';
import { getLocalStorage } from '../../../../../utils/localStorageManagement';
import CheckoutConstants from '../Checkout.constants';

const { CREDIT_CARDS_BIN_RANGES, ACCEPTED_CREDIT_CARDS } = CardConstants;

/**
 * getOrderPointsRecalcFlag
 * @param {boolean} recalcRewards - current recalculate rewards value for the request
 * @param {number} recalcOrderPointsInterval - XAPPConfig configuration value for timeout for recalc flag
 * the entire function will be dependent on this flag being set from backend
 * @description this method takes recalculate flag and the XappConfigValue configuration
 * in case recalcRewards is false and caching interval is configured, it changes it to true in these cases:
 * if time of last recalcRewards true request is not cached in localStorage
 * if the time elapsed since last recalcRewards true request is more than the set threshold
 * after recalcRewards flag is modified, if it is true, cache the time when the true request is sent
 * @returns {boolean} recalcVal to be passed in the getOrderDetails or cart API header
 */
const getOrderPointsRecalcFlag = (recalcRewards, recalcOrderPointsInterval) => {
  let recalcVal = recalcRewards;
  if (recalcOrderPointsInterval && !recalcRewards) {
    const orderPointsTimeStamp = getLocalStorage('orderPointsTimeStamp') || null;
    const currentTime = new Date().getTime();
    if (!orderPointsTimeStamp || currentTime - orderPointsTimeStamp > recalcOrderPointsInterval) {
      recalcVal = true;
    }
  }
  return recalcVal;
};

const updateCartInfo = (cartInfo, isUpdateCartItems) => {
  const getRewardPoints = {
    estimatedRewards: cartInfo.estimatedRewards,
    earnedReward: cartInfo.earnedReward,
    pointsToNextReward: cartInfo.pointsToNextReward,
  };
  const actions = [
    getSetCurrentOrderIdActn(cartInfo.orderId),
    getSetEstimatedAirMilesActn(cartInfo.estimatedAirMiles),
    setShippingTotal(cartInfo.shippingTotal),
    getSetGiftWrappingTotalActn(cartInfo.giftWrappingTotal),
    getSetGiftCardTotalActn(cartInfo.giftCardsTotal),
    setTaxesTotal(cartInfo.totalTax),
    setSavingsTotal(cartInfo.savingsTotal),
    getSetCouponsTotalActn(cartInfo.couponsTotal),
    getSetItemsTotalAction(cartInfo.orderTotalAfterDiscount),
    cartInfo.totalItems !== null && setItemsCount(cartInfo.totalItems),
    getSetSubTotal(cartInfo.subTotal),
    getSetSubTotalWithDiscountsActn(cartInfo.subTotalWithDiscounts),
    getSetGrandTotal(cartInfo.grandTotal),
    getSetGiftCardValuesActn(cartInfo.appliedGiftCards),
    getSetRewardsToBeEarnedActn(cartInfo.rewardsToBeEarned),
    getSetPointsAndRewardsActn(getRewardPoints),
    setCartTotalAfterPLCCDiscount(cartInfo.cartTotalAfterPLCCDiscount),
  ];
  /* istanbul ignore else */
  if (isUpdateCartItems) {
    actions.push(getSetCartActn(cartInfo.orderItems));
    actions.push(getSetCartStoreActn(cartInfo.stores));
  }
  /* istanbul ignore else */
  if (cartInfo.uiFlags) {
    actions.push(getSetIsPayPalEnabledActn(cartInfo.uiFlags.isPaypalEnabled));
  }
  /* istanbul ignore else */
  if (cartInfo.airmiles) {
    actions.push(getSetAirmilesPromoIdActn(cartInfo.airmiles.promoId));
    actions.push(getSetAirmilesAccountActn(cartInfo.airmiles.accountNumber));
  }

  /* Sometimes this function is used in another function to do bulk dispaches.
   * In this case we can just export all these actions so we can dispatch in one bulk.
   */
  return actions;
};

const hasPOBox = (addressLine1 = '', addressLine2 = '') => {
  // some delimiter that will not allow them to match only if concatenated
  const value = `${addressLine1}#${addressLine2}`;
  // REVIEW: got the regex from: https://gist.github.com/gregferrell/7494667
  // seems to cover most use cases; not in the mood to write it from scratch
  return (
    value.search(
      /\bbox(?:\b$|([\s|-]+)?[0-9]+)|(p[-.\s]*o[-.\s]*|(post office|post)\s)b(\.|ox|in)?\b|(^p[.]?(o|b)[.]?$)/gim
    ) >= 0
  );
};

const isOrderHasShipping = cartItems => {
  return cartItems && cartItems.filter(item => !item.getIn(['miscInfo', 'store'])).size;
};

const isOrderHasPickup = cartItems => {
  return cartItems && cartItems.filter(item => !!item.getIn(['miscInfo', 'store'])).size;
};

const getAvailableStages = cartItems => {
  const { PICKUP, SHIPPING, BILLING, REVIEW } = CheckoutConstants.CHECKOUT_STAGES;
  const stages = [BILLING, REVIEW];
  if (isOrderHasShipping(cartItems)) {
    stages.unshift(SHIPPING);
  }
  /* istanbul ignore else */
  if (isOrderHasPickup(cartItems)) {
    stages.unshift(PICKUP);
  }
  return stages;
};

const routeToPage = (dataObj, queryParams, ...others) => {
  const { asPath } = dataObj;
  let { to } = dataObj;
  if (queryParams) {
    if (to.indexOf('?') !== -1) {
      to += '&';
    }
    to += `${queryString.stringify(queryParams)}`;
  }
  if (!isMobileApp()) {
    routerPush(to, asPath, ...others);
  }
};

function getCreditCardType({ cardNumber = '', cardType } = {}) {
  if (cardNumber.length === 0) {
    return null;
  }
  const keys = Object.keys(CREDIT_CARDS_BIN_RANGES);
  for (let i = 0; i < keys.length; i += 1) {
    const type = keys[i];
    const cartRangeType = CREDIT_CARDS_BIN_RANGES[type];
    let currentRange = 0;
    const rangesCount = cartRangeType.length;
    for (; currentRange < rangesCount; currentRange += 1) {
      const { from, to } = cartRangeType[currentRange];
      const prefixLength = from.toString().length;
      const prefix = cardNumber.substr(0, prefixLength);

      if (prefix >= from && prefix <= to) {
        return ACCEPTED_CREDIT_CARDS[type];
      }
    }
  }
  if (cardType && cardNumber.substr(0, 1) === '*') {
    return cardType.toUpperCase();
  }
  return null;
}

export const getSelectedCard = ({ creditCardList, onFileCardKey }) => {
  return creditCardList.find(card => card.creditCardId === +onFileCardKey);
};

export const getCreditCardList = ({ cardList }) =>
  cardList &&
  cardList.size > 0 &&
  cardList.filter(
    card =>
      card.ccType !== CreditCardConstants.ACCEPTED_CREDIT_CARDS.GIFT_CARD &&
      card.ccType !== CreditCardConstants.ACCEPTED_CREDIT_CARDS.VENMO
  );

export const getExpirationRequiredFlag = ({ cardType }) => {
  return !cardType || cardType !== CreditCardConstants.ACCEPTED_CREDIT_CARDS.PLACE_CARD;
};

export const getPayPalFlag = navigation => {
  if (navigation && navigation.state) {
    const {
      state: { params },
    } = navigation;
    if (params) {
      const { isPayPalFlow } = params;
      return isPayPalFlow;
    }
  }
  return false;
};

const handleReviewFormSubmit = (scope, data) => {
  const {
    submitReview,
    pickUpContactPerson,
    pickUpContactAlternate,
    isExpressCheckout,
  } = scope.props;
  const { firstName, lastName, hasAlternatePickup, emailAddress } = data.pickUpAlternateExpress;
  const { cvvCode } = data;
  const pickupContactData =
    typeof pickUpContactPerson.firstName !== 'undefined'
      ? pickUpContactPerson
      : pickUpContactAlternate.pickUpContact;

  if (isExpressCheckout) {
    const formDataSubmission = {
      formData: {
        hasAlternatePickup,
        pickUpAlternate: {
          emailAddress,
          firstName,
          lastName,
        },
        pickUpContact: {
          firstName: pickupContactData.firstName,
          lastName: pickupContactData.lastName,
          phoneNumber: pickupContactData.phoneNumber,
          emailAddress: pickupContactData.emailAddress,
        },
        billing: {
          cvv: cvvCode,
        },
      },
    };
    submitReview(formDataSubmission);
  } else {
    submitReview({});
  }
};

const flattenObject = (obj, prefix = '') =>
  Object.keys(obj).reduce((acc, k) => {
    const pre = prefix.length ? `${prefix}.` : '';
    if (typeof obj[k] === 'object') Object.assign(acc, flattenObject(obj[k], pre + k));
    else acc[pre + k] = obj[k];
    return acc;
  }, {});

export const scrollToFirstError = errors => {
  const errorEl = document.querySelector(
    Object.keys(flattenObject(errors))
      .map(fieldName => `[name="${fieldName}"]`)
      .join(',')
  );
  if (errorEl && errorEl.focus) {
    errorEl.focus(); // this scrolls without visible scroll
  }
};

export default {
  getOrderPointsRecalcFlag,
  updateCartInfo,
  hasPOBox,
  isOrderHasPickup,
  getAvailableStages,
  routeToPage,
  getCreditCardType,
  isOrderHasShipping,
  handleReviewFormSubmit,
};
