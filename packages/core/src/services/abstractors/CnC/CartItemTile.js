/* eslint-disable max-lines */
import { executeStatefulAPICall, executeUnbxdAPICall } from '../../handler';
import { parseDate, compareDate } from '../../../utils/parseDate';
import endpoints from '../../endpoints';

import {
  parseBoolean,
  extractPrioritizedBadge,
  getDateInformation,
  getCartProductAttributes,
} from '../../../utils/badge.util';
import {
  responseContainsErrors,
  ServiceResponseError,
  getFormattedError,
} from '../../../utils/errorMessage.util';
import { isCanada as isCASite } from '../../../utils';
import { parseStoreOpeningAndClosingTimes } from '../../../utils/parseStoreHours';
import CARTITEMTILE_CONSTANTS from '../../../components/features/CnC/CartItemTile/CartItemTile.constants';
import { UPDATE_ITEM_IN_CART } from '../../config';
import { setLocalStorage } from '../../../utils/localStorageManagement';

const RES_NULL_ERROR = 'res body is null';

export const ORDER_ITEM_TYPE = {
  BOSS: 'BOSS',
  BOPIS: 'BOPIS',
  ECOM: 'ECOM',
};

export const AVAILABILITY = {
  ...CARTITEMTILE_CONSTANTS.AVAILABILITY,
};

export const COUPON_STATUS = {
  AVAILABLE: 'available',
  EXPIRING_SOON: 'expiration-limit',
  APPLYING: 'applying',
  APPLIED: 'applied',
  PENDING: 'pending',
  REMOVING: 'removing',
};

export const BUTTON_LABEL_STATUS = {
  APPLY: 'APPLY',
  REMOVE: 'REMOVE',
};

export const COUPON_REDEMPTION_TYPE = {
  PUBLIC: 'public',
  WALLET: 'wallet',
  REWARDS: 'rewards',
  SAVING: 'saving',
  LOYALTY: 'LOYALTY',
  PLACECASH: 'PLACECASH',
  PC: 'PLACECASH',
};

/**
 * @function constructDateFormat This function creates the date in DD/MM/YY format
 * @param date {Object} The date to be worked on.
 * @return {String} The date in required format.
 */

const constructDateFormat = date => {
  return `${date.getMonth() + 1}/${date.getDate()}/${date
    .getFullYear()
    .toString()
    .substr(-2)}`;
};

const getCouponType = promotionType => {
  switch (promotionType) {
    case 'PC':
      return COUPON_REDEMPTION_TYPE.PLACECASH;
    case 'PLACECASH':
      return COUPON_REDEMPTION_TYPE.PLACECASH;
    case 'LOYALTY':
      return COUPON_REDEMPTION_TYPE.REWARDS;
    case 'OTHERS':
      return COUPON_REDEMPTION_TYPE.SAVING;
    default:
      return COUPON_REDEMPTION_TYPE.SAVING;
  }
};

export const getProductSkuInfoByUnbxd = () => {
  // calling unbxd API logic is written in CartItemTile.saga.js, needs to move it in this abstractor, as of now getting result from saga and formatting it here.
};

export const getSwatchImgPath = (id, excludeExtension) => {
  const imageName = id.split('_');
  const imagePath = imageName[0];
  return `${imagePath}/${id}${excludeExtension ? '' : '.jpg'}`;
};

export const getProductImgPath = (id, excludeExtension) => {
  const imageName = id.split('_');
  const imagePath = imageName[0];
  return {
    125: `${imagePath}/${id}${excludeExtension ? '' : '.jpg'}`,
    380: `${imagePath}/${id}${excludeExtension ? '' : '.jpg'}`,
    500: `${imagePath}/${id}${excludeExtension ? '' : '.jpg'}`,
    900: `${imagePath}/${id}${excludeExtension ? '' : '.jpg'}`,
  };
};

export const imageGenerator = (id, excludeExtension) => {
  return {
    colorSwatch: getSwatchImgPath(id, excludeExtension),
    productImages: getProductImgPath(id, excludeExtension),
  };
};

const setBrierleyOrderPointsTimeCache = () => {
  setLocalStorage({ key: 'orderPointsTimeStamp', value: new Date().getTime() });
};

// NOTE: (DT-19681) LOYALTY/PLACECASH/OTHERS
export function getPromotionType(promotionType) {
  switch (promotionType) {
    case 'PC':
      return COUPON_REDEMPTION_TYPE.PLACECASH;
    case 'LOYALTY':
      return COUPON_REDEMPTION_TYPE.LOYALTY;
    default:
      return COUPON_REDEMPTION_TYPE.PUBLIC;
  }
}

export const removeItem = orderItemId => {
  const orderItems = [];
  if (typeof orderItemId === 'string') {
    orderItems.push({
      orderItemId,
      quantity: '0',
    });
  } else {
    orderItemId.forEach(value => {
      orderItems.push({
        orderItemId: value,
        quantity: '0',
      });
    });
  }
  const payload = {
    body: {
      orderItem: orderItems,
    },
    webService: endpoints.updateMultiSelectItemsToRemove,
  };

  return executeStatefulAPICall(payload)
    .then(res => {
      if (res && !res.body) {
        throw new Error(RES_NULL_ERROR);
        // TODO - Set API Helper to filter if error exists in response
      }
      return {
        orderId: res && res.body.orderId,
      };
    })
    .catch(err => {
      throw err;
    });
};

const defaultUpdateItemPayload = payloadData => {
  const { itemId, skuId, quantity, itemPartNumber, variantNo } = payloadData;
  return {
    orderItem: [
      {
        orderItemId: itemId,
        xitem_catEntryId: skuId,
        quantity: quantity.toString(),
        itemPartNumber,
        variantNo,
      },
    ],
  };
};

/**
 *
 * @method pickUpItemUpdatePayload
 * @description this method handles payload formation for pickupitem
 * @param {*} payloadData
 * @returns
 */
const pickUpItemUpdatePayload = payloadData => {
  const { apiPayload } = payloadData;
  return {
    x_calculationUsage: UPDATE_ITEM_IN_CART.X_CALCULATION_USAGE,
    x_isUpdateDescription: UPDATE_ITEM_IN_CART.X_UPDATE_DESCRIPTION,
    ...apiPayload,
  };
};

/**
 *
 * @method payloadFormationForUpdateItem
 * @description this method handles payload formation for update item call for all types of item.
 * @param {*} payloadData
 * @returns
 */
const payloadFormationForUpdateItem = payloadData => {
  const { updateActionType } = payloadData;
  switch (updateActionType) {
    case 'UpdatePickUpItem':
      return pickUpItemUpdatePayload(payloadData);
    default:
      return defaultUpdateItemPayload(payloadData);
  }
};

/**
 *
 * @method updateItem
 * @description this method call updateItem API call for all types of item.
 * @param {*} payloadData
 * @returns
 */
export const updateItem = (payloadData, errorMapping) => {
  const updatePayloadData = payloadFormationForUpdateItem(payloadData);
  const { callback } = payloadData;
  const payload = {
    body: {
      ...updatePayloadData,
    },
    webService: endpoints.updateOrderItem,
  };

  return executeStatefulAPICall(payload)
    .then(res => {
      if (responseContainsErrors(res)) {
        throw new ServiceResponseError(res);
      }
      if (callback) {
        callback();
      }
      return {
        orderItemId: res.body.orderItem[0].orderItemId,
      };
    })
    .catch(err => {
      throw getFormattedError(err, errorMapping);
    });
};

/**
 * @function constructCouponStructure This function parses the coupons got from API
 *                                    to the desired format to be used by FE code
 * @param cpnArray {Array} The array of offers available with user.
 * @return coupons {Array} Array of coupons with each coupons object in desired format.
 */
export const constructCouponStructure = cpnArray => {
  const now = new Date();
  const oneDay = 24 * 60 * 60 * 1000;
  const expirationThreshold = 7;
  const coupons = [];
  cpnArray.forEach(itm => {
    const startDate = parseDate(itm.validFrom);
    const endDate = parseDate(itm.validTo);
    const isPlaceCash =
      itm.offerType === COUPON_REDEMPTION_TYPE.PLACECASH || itm.offerType === 'PC';
    const isExpiring =
      Math.round(Math.abs((endDate.getTime() - now.getTime()) / oneDay)) <= expirationThreshold;
    coupons.push({
      id: itm.offerCode.toUpperCase(),
      status: itm.isApplied ? COUPON_STATUS.APPLIED : COUPON_STATUS.AVAILABLE,
      labelStatus: itm.isApplied ? BUTTON_LABEL_STATUS.REMOVE : BUTTON_LABEL_STATUS.APPLY,
      isExpiring,
      title: itm.offerText,
      detailsOpen: false,
      expirationDate: constructDateFormat(endDate),
      effectiveDate: constructDateFormat(startDate),
      details: itm.offerDescription,
      legalText: itm.legalText,
      isStarted: isPlaceCash ? compareDate(now, startDate) : true,
      offerType: getCouponType(itm.offerType),
      // imageThumbUrl: getCouponImageThumb(itm.offerType),
      // imageUrl: getCouponImage(itm.offerType),
      error: '',
      redemptionType: COUPON_REDEMPTION_TYPE[itm.offerType],
      promotionType: getPromotionType(itm.offerType),
      expirationDateTimeStamp: endDate,
    });
  });
  return coupons;
};

export const flatCurrencyToCents = (currency = 0) => {
  try {
    return parseFloat(parseFloat(currency.toString().match(/^-?\d+(?:\.\d{0,2})?/)[0]).toFixed(2));
  } catch (e) {
    throw new Error(e);
  }
};

export const capitalize = string => {
  return string.replace(/\b\w/g, l => l.toUpperCase());
};

export const sanitizeEntity = string => {
  return string && typeof string === 'string'
    ? string
        .replace(/&amp;/gi, '&')
        .replace(/&quot;/gi, '"')
        .replace(/&ldquo;/gi, '"')
        .replace(/&acute;/gi, '"')
        .replace(/&prime;/gi, '"')
        .replace(/&bdquo;/gi, '"')
        .replace(/&ldquot;/gi, '"')
        .replace(/\\u0027/gi, "'")
        .replace(/&lsquot;/gi, '"')
        .replace(/%20/gi, ' ')
    : string;
};

const deriveBossInventoryMismatch = item => {
  // RAD-88/86 qty - requested quantity,inventoryAvailBOSS - available quantity at FFMC
  return item.qty > item.inventoryAvailBOSS;
};

export const deriveBossEligiblity = (item, orderDetailsResponse) => {
  return !(
    parseBoolean(item.productInfo.itemTcpBossProductDisabled) ||
    parseBoolean(item.productInfo.itemTcpBossCategoryDisabled) ||
    orderDetailsResponse.bossIntlField
  );
};

const checkIfUSOrder = currencyCode => currencyCode === 'USD';

const getIsSoldOut = ({ productInfo, isUsOrder }) => {
  const { articleOOSUS, articleOOSCA } = productInfo;
  return (isUsOrder && articleOOSUS) || (!isUsOrder && articleOOSCA);
};

const getIsProductOK = ({ orderItemType, stLocId, bopisIntlField }) => {
  return orderItemType === ORDER_ITEM_TYPE.BOPIS && stLocId && !parseBoolean(bopisIntlField);
};

const getIsProductUnavailble = ({ bossIntlField, isStoreBOSSEligible }) =>
  parseBoolean(bossIntlField) || !isStoreBOSSEligible;

const getAvailablityIfIsRadialInv = ({ item, orderDetails }) => {
  const isProductBossEligible = deriveBossEligiblity(item, orderDetails); // product ineligibility added as part of RAD-88, not present earlier in production

  if (item.inventoryAvailBOSS <= 0) {
    return AVAILABILITY.UNAVAILABLE;
  }
  if (deriveBossInventoryMismatch(item)) {
    return AVAILABILITY.REQ_QTY_UNAVAILABLE;
  }
  if (!isProductBossEligible) {
    return AVAILABILITY.BOSSINELIGIBLE;
  }

  return AVAILABILITY.OK;
};

const getDefaultAvailability = ({ item }) => {
  if (item.inventoryAvail > 0) {
    return AVAILABILITY.OK;
  }
  return AVAILABILITY.UNAVAILABLE;
};

export const deriveItemAvailability = (orderDetails, item, store, isRadialInvEnabled) => {
  const isUsOrder = checkIfUSOrder(orderDetails.currencyCode);
  const { bopisIntlField, bossIntlField } = orderDetails;
  const { productInfo, stLocId, orderItemType } = item;
  if (getIsSoldOut({ productInfo, isUsOrder })) {
    return AVAILABILITY.SOLDOUT;
    // replaced "BOPIS" with a config variable
  }
  if (getIsProductOK({ orderItemType, stLocId, bopisIntlField })) {
    return AVAILABILITY.OK;
  }
  if (item.orderItemType === ORDER_ITEM_TYPE.BOSS && item.stLocId) {
    const isStoreBOSSEligible = store
      ? parseBoolean(store.shippingAddressDetails.isStoreBOSSEligible)
      : true;
    /**
     * Adding new check to return status unavailable in case of:
     * 1. international order - exisiting
     * 2. boss store ineligible - exisiting
     * 3. boss item inventory zero - added with RAD-88/RAD-86
     * 4. boss item inventory mismatch(requested qty > avail qty) - added with RAD-88/RAD-86
     * 5. boss product ineligible -  added with RAD-88/RAD-86
     * returning respective updated Error copies(RAD-86)
     */
    if (getIsProductUnavailble({ bossIntlField, isStoreBOSSEligible })) {
      return AVAILABILITY.UNAVAILABLE;
    }
    if (isRadialInvEnabled) {
      return getAvailablityIfIsRadialInv({ item, orderDetails });
    }
    return getDefaultAvailability({ item });
  }
  if (item.qty > item.inventoryAvail) {
    return AVAILABILITY.UNAVAILABLE;
  }
  if (item.inventoryAvail > 0) {
    // inventory check for BOSS and ECOM
    return AVAILABILITY.OK;
  }
  return AVAILABILITY.UNAVAILABLE;
};

/* eslint-disable complexity, max-statements */
export const getCurrentOrderFormatter = (
  orderDetailsResponseObj,
  excludeCartItems,
  isCanada,
  isRadialInvEnabled
  // eslint-disable-next-line sonarjs/cognitive-complexity
) => {
  const orderDetailsResponse = orderDetailsResponseObj;
  const EMPTY_OBJECT = Object.create(null);
  let pickUpContact = {};
  let pickUpAlternative = {};
  let isPickupOrder = false;
  let isShippingOrder = false;
  // replaced "BOPIS" with a config variable
  // Check if order is of pickup type instead of just BOPIS
  const mixOrderData =
    orderDetailsResponse.mixOrderDetails && orderDetailsResponse.mixOrderDetails.data;
  let isBossOrder =
    mixOrderData && mixOrderData.find(store => store.orderType === ORDER_ITEM_TYPE.BOSS);
  let isBopisOrder =
    mixOrderData && mixOrderData.find(store => store.orderType === ORDER_ITEM_TYPE.BOPIS);

  const pickupOrder = isBopisOrder || isBossOrder;
  isBopisOrder = !!isBopisOrder;
  isBossOrder = !!isBossOrder;
  // show pickup address for both BOSS and BOPIS
  if (pickupOrder) {
    isPickupOrder = true;
    const address = pickupOrder.shippingAddressDetails || {};
    pickUpContact = {
      firstName: address.firstName,
      lastName: address.lastName,
      emailAddress: address.email1,
      phoneNumber: address.phone1,
    };
    const pickUpAltName = address.altName || '';
    pickUpAlternative = {
      firstName: pickUpAltName.substr(0, pickUpAltName.indexOf(' ')),
      lastName: pickUpAltName.substr(pickUpAltName.indexOf(' ') + 1).trim(),
      emailAddress: address.altEmail,
    };
  }

  let shipping = {};
  let smsInfo = {};
  let shippingTotal = undefined; // eslint-disable-line no-undef-init
  if (orderDetailsResponse.mixOrderDetails && orderDetailsResponse.mixOrderDetails.data) {
    const orderShippingElement = orderDetailsResponse.mixOrderDetails.data.find(
      // replaced "ECOM" with a config variable
      element => element.orderType === 'ECOM'
    );
    if (orderShippingElement) {
      isShippingOrder = true;
    }
    if (orderShippingElement && orderShippingElement.shippingAddressDetails) {
      const orderShippingInfo = orderShippingElement.shippingAddressDetails;
      if (orderShippingInfo.addressId) {
        // orderDetailsResponse.finalShippingCharge may contain garbage that should be ignored if we have no shipping addressId
        shippingTotal = flatCurrencyToCents(orderDetailsResponse.finalShippingCharge);
      }
      shipping = {
        method: {
          shippingMethodId: orderDetailsResponse.shipModeId,
        },
        address: {
          firstName: orderShippingInfo.firstName,
          lastName: orderShippingInfo.lastName,
          addressLine1: orderShippingInfo.addressLine1 || orderShippingInfo.address,
          addressLine2: orderShippingInfo.addressLine2,
          city: orderShippingInfo.city,
          state: orderShippingInfo.state,
          zipCode: (orderShippingInfo.zipCode || '').trim(),
          country: orderShippingInfo.country,
        },
        onFileAddressKey: orderShippingInfo.addressNickName,
        onFileAddressId: orderShippingInfo.addressId && orderShippingInfo.addressId.toString(),
        emailAddress: orderShippingInfo.email1,
        phoneNumber: orderShippingInfo.phone1,
      };
      smsInfo = {
        numberForUpdates: orderShippingInfo.transVibesSmsPhoneNo,
      };
    }
  }
  shipping.emailSignup =
    orderDetailsResponse.mixOrderDetails &&
    orderDetailsResponse.mixOrderDetails.marketingPromoBox === '1';
  const giftWrapItem = orderDetailsResponse.orderItems.find(item => item.giftOptions);
  const giftWrap = !giftWrapItem
    ? {}
    : {
        optionId: giftWrapItem.itemCatentryId.toString(),
        message: giftWrapItem.giftOptionsMessage || '',
      };

  let stateTax = -1;
  if (orderDetailsResponse.salesTax && orderDetailsResponse.salesTax.salesTax) {
    Object.entries(orderDetailsResponse.salesTax.salesTax).forEach(([country, states]) => {
      if (country) {
        Object.entries(states).forEach(([state, stateTaxValue]) => {
          if (state) {
            if (stateTax === -1) {
              stateTax = 0;
            }

            stateTax += stateTaxValue;
          }
        });
      }
    });
  }
  // When brierley fails, backend returns -1 in these fields
  if (orderDetailsResponse.pointsToNextReward === -1) {
    orderDetailsResponse.pointsToNextReward = null;
  }
  if (orderDetailsResponse.userPoints === -1) {
    orderDetailsResponse.userPoints = null;
  }

  const usersOrder = {
    emailSignUpTCP: !!orderDetailsResponse.mixOrderDetails.marketingPromoBox,
    emailSignUpGYM: !!orderDetailsResponse.mixOrderDetails.marketingPromoBoxGYM,
    isShippingOrder,
    isPickupOrder,
    isBossOrder,
    isBopisOrder,
    orderId: orderDetailsResponse.parentOrderId,
    totalItems: excludeCartItems ? orderDetailsResponse.cartCount : 0,
    appliedGiftCards: [],
    giftWrappingTotal: 0,
    savingsTotal: Math.abs(flatCurrencyToCents(orderDetailsResponse.orderDiscountAmount) || 0),
    couponsTotal: 0,
    giftCardsTotal: flatCurrencyToCents(orderDetailsResponse.totalGiftCardAmount || 0),
    shippingTotal,
    totalTax:
      stateTax > -1 ? flatCurrencyToCents(orderDetailsResponse.shippingTax) + stateTax : undefined,
    grandTotal: flatCurrencyToCents(orderDetailsResponse.grandTotal),
    subTotal: flatCurrencyToCents(orderDetailsResponse.orderSubTotalBeforeDiscount),
    subTotalWithDiscounts: flatCurrencyToCents(orderDetailsResponse.orderSubTotalDiscount || 0), // this is designed to be engaged from the mini-cart only.
    // subTotalWithDiscounts: flatCurrencyToCents(orderDetailsResponse.orderSubTotal), // to use in condensed ledger, as per DT-18757, this one might be deprecated.
    estimatedRewards:
      orderDetailsResponse.userPoints && Math.round(orderDetailsResponse.userPoints),
    estimatedAirMiles: 0, // NOT IN SERVICE RESPONSE - - - Math.round(orderDetailsResponse.airMiles || 0),
    rewardsToBeEarned: parseInt(orderDetailsResponse.valueOfEarnedPcCoupons, 10) || 0, // FIXME: this should have been part of another namespace, however it had to be done.
    earnedReward: orderDetailsResponse.earnedReward || '',
    pointsToNextReward: orderDetailsResponse.pointsToNextReward || 0,
    totalOrderSavings: flatCurrencyToCents(orderDetailsResponse.orderTotalSaving || 0),
    checkout: {
      pickUpContact,
      pickUpAlternative,
      shipping,
      billing: {},
      giftWrap,
      smsInfo,
    },
    orderItems: [],
    stores: [],
  };

  if (orderDetailsResponse.airMiles) {
    usersOrder.airmiles = {
      accountNumber: orderDetailsResponse.airMiles.airMilesAccount,
      promoId: orderDetailsResponse.airMiles.airMilesDeal,
    };
  }

  if (orderDetailsResponse.orderLevelPromos && orderDetailsResponse.orderLevelPromos.explicit) {
    orderDetailsResponse.orderLevelPromos.explicit.forEach(item => {
      Object.keys(item).forEach(promoCode => {
        usersOrder.couponsTotal += Math.abs(flatCurrencyToCents(item[promoCode].price));
      });
    });
  }

  usersOrder.savingsTotal -= usersOrder.couponsTotal;

  // UGLY: I guess rounding causes this to be non zero in some cases
  // (or backend sending incorrect numbers)
  if (usersOrder.savingsTotal < 0) {
    usersOrder.savingsTotal = 0;
  }
  if (orderDetailsResponse.giftCardDetails) {
    Object.values(orderDetailsResponse.giftCardDetails).forEach(giftCard => {
      usersOrder.appliedGiftCards.push({
        id: giftCard.piId,
        onFileCardId: giftCard.creditCardId.toString(),
        amountApplied: giftCard.giftAmount,
        endingNumbers: giftCard.giftCardNumber.substr(-4),
        remainingBalance: giftCard.remainingBalance,
      });
    });
  }

  // DT-32443
  // Not sure why payment information is in mixOrderPaymentDetails AND paymentsList...
  // Backend will clear out mixOrderPaymentDetails array if the payment method is inactive in the DB
  // If mixOrderPaymentDetails is empty we should not save billing details and show error message
  const { mixOrderPaymentDetails } = orderDetailsResponse;
  if (mixOrderPaymentDetails && mixOrderPaymentDetails.length > 0) {
    Object.values(orderDetailsResponse.paymentsList).forEach(payment => {
      if (payment.cardType !== 'GC') {
        // CC or PayPal
        const billingAddress = payment.billingAddressDetails;
        const billingFirstName = (billingAddress.customerName || '').match(/(\w+)/);
        const billingLastName = (billingAddress.customerName || '').match(/(\w+)$/);
        let paymentMethod = '';
        switch (payment.cardType) {
          case 'PayPal':
            paymentMethod = 'paypal';
            break;
          case 'VENMO':
            paymentMethod = 'venmo';
            break;
          default:
            paymentMethod = 'creditCard';
        }
        usersOrder.checkout.billing = {
          paymentMethod,
          onFileCardId: (billingAddress.creditCardId || '').toString(), // credit card id from the card book
          paymentId: payment.piId,
          emailAddress: billingAddress.email,
          phoneNumber: billingAddress.phone,

          address: {
            onFileAddressKey: billingAddress.nickName,
            onFileAddressId: billingAddress.addressId && billingAddress.addressId.toString(),
            sameAsShipping: billingAddress.nickName === shipping.onFileAddressKey,
            firstName: billingFirstName ? billingFirstName[0] : '',
            lastName: billingLastName ? billingLastName[0] : '',
            addressLine1: billingAddress.addressLine1 || billingAddress.address,
            addressLine2: billingAddress.addressLine2,
            city: billingAddress.city,
            state: billingAddress.state,
            zipCode: (billingAddress.zipCode || '').trim(),
            country: billingAddress.country,
          },

          billing: {
            cardNumber: payment.maskedCardNumber,
            cardType:
              payment.cardType === 'PayPal' ? 'paypal' : (payment.cardType || '').toUpperCase(),
            expMonth: parseInt(payment.cardExpirationMonth, 10),
            expYear: parseInt(payment.cardExpirationYear, 10),
            cvv: '',
            isExpirationRequired:
              payment.cardType !== 'PLACE CARD' && payment.cardType !== 'PayPal',
            isCVVRequired: payment.cardType !== 'PLACE CARD' && payment.cardType !== 'PayPal',
          },
        };
      }
    });
  }

  if (
    orderDetailsResponse &&
    orderDetailsResponse.mixOrderDetails &&
    orderDetailsResponse.mixOrderDetails.data
  ) {
    Object.values(orderDetailsResponse.mixOrderDetails.data).forEach(store => {
      if (store.orderType !== 'ECOM') {
        usersOrder.stores.push({
          stLocId: store.shippingAddressDetails.stLocId || '',
          itemsCount: store.itemsCount,
          storeName: capitalize(store.shippingAddressDetails.storeName),
          orderType: store.orderType,
          address: {
            addressId: store.shippingAddressDetails.addressId,
            addessKey: store.shippingAddressDetails.addressNickName,
            address: capitalize(store.shippingAddressDetails.address),
            addressLine1: capitalize(store.shippingAddressDetails.addressLine1),
            addressLine2: capitalize(store.shippingAddressDetails.addressLine2),
            addressLine3: capitalize(store.shippingAddressDetails.addressLine3),
            city: capitalize(store.shippingAddressDetails.city),
            state: capitalize(store.shippingAddressDetails.state),
            country: capitalize(store.shippingAddressDetails.country),
            zipCode: store.shippingAddressDetails.zipCode,
          },
          bossStartDate:
            store.orderType === ORDER_ITEM_TYPE.BOSS
              ? getDateInformation(store.shippingAddressDetails.bossMinDate, false)
              : null,
          bossEndDate:
            store.orderType === ORDER_ITEM_TYPE.BOSS
              ? getDateInformation(store.shippingAddressDetails.bossMaxDate, false)
              : null,
          storeHours: store.shippingAddressDetails.storeHours,
          isStoreBOSSEligible: parseBoolean(store.shippingAddressDetails.isStoreBOSSEligible),
        });
      }
    });
  }

  Object.values(orderDetailsResponse.orderItems).forEach(itemValue => {
    const item = itemValue;
    const sizeAndFit = item.productInfo.itemsAttributes[item.itemCatentryId.toString()];
    // When brierley fails, backend returns -1
    if (item.itemPoints === -1) {
      item.itemPoints = null;
    }
    // making pickup page visible for BOSS items as well
    // replaced "BOPIS" and "BOSS" with a config variable
    const store =
      (item.orderItemType === ORDER_ITEM_TYPE.BOPIS ||
        item.orderItemType === ORDER_ITEM_TYPE.BOSS) &&
      item.stLocId &&
      orderDetailsResponse.mixOrderDetails &&
      orderDetailsResponse.mixOrderDetails.data
        ? orderDetailsResponse.mixOrderDetails.data.find(
            storeData =>
              storeData.shippingAddressDetails.stLocId === item.stLocId &&
              storeData.orderType === item.orderItemType
          )
        : null;

    if (!item.giftOptions) {
      usersOrder.totalItems += parseInt(item.qty, 10);

      const {
        todayOpeningTime,
        todayClosingTime,
        tomorrowOpeningTime,
        tomorrowClosingTime,
      } = parseStoreOpeningAndClosingTimes(store);

      const isGiftCard = item.giftItem;
      usersOrder.orderItems.push({
        productInfo: {
          generalProductId: isGiftCard ? item.itemCatentryId.toString() : item.productId,
          //  product part number for Unbxd API call
          productPartNumber: item.productInfo && item.productInfo.productPartNumber,
          skuId: isGiftCard ? item.productId : item.itemCatentryId.toString(),
          itemPartNumber: item.itemPartNumber,
          variantNo: item.variantNo,
          name: sanitizeEntity(item.productInfo.productName),
          imagePath: imageGenerator(item.productInfo.productPartNumber).productImages[500],
          upc: item.itemPartNumber,
          size: sizeAndFit ? sizeAndFit.TCPSize : item.itemUnitDstPrice, // giftCard Size is its price
          fit: sizeAndFit ? sizeAndFit.TCPFit : null, // no fit for gift cards
          pdpUrl: item.productUrl.replace(/&amp;/g, '&'),
          color: {
            name: item.productInfo.productColor
              ? item.productInfo.productColor
              : item.productInfo.productName,
          },
          isGiftCard,
          colorFitSizeDisplayNames: isGiftCard ? { color: 'Design', size: 'Value' } : EMPTY_OBJECT,
          // added to read type of order for the item
          orderType: item.orderItemType,
          itemBrand: item.itemBrand || 'TCP',
        },
        itemInfo: {
          quantity: parseInt(item.qty, 10),
          itemId: item.orderItemId.toString(),
          itemPoints:
            item.itemPoints || item.itemPoints === 0 ? parseInt(item.itemPoints, 10) : null,
          // This code is misleading - itemPrice and itemDstPrice are not equal to list price/offer price
          // Backend returns the same value for both itemPrice and itemDstPrice UNLESS an explicit promotion is applied
          // Enhancement needed - Backend should return the actual prices and frontend should determine which values to display

          listPrice: flatCurrencyToCents(item.itemPrice),
          offerPrice: flatCurrencyToCents(item.itemDstPrice),
          wasPrice: flatCurrencyToCents(item.productInfo.listPrice),
          // eslint-disable-next-line no-nested-ternary
          salePrice: isGiftCard
            ? flatCurrencyToCents(item.itemUnitPrice)
            : isCanada
            ? flatCurrencyToCents(item.productInfo.offerPriceCAD)
            : flatCurrencyToCents(item.productInfo.offerPrice),
        },
        miscInfo: {
          clearanceItem: !isCASite()
            ? item.productInfo.itemTCPProductIndUSStore === 'Clearance'
            : item.productInfo.itemTCPProductIndCanadaStore === 'Clearance',
          isOnlineOnly: !isCASite()
            ? Boolean(parseInt(item.productInfo.webOnlyFlagUSStore, 10))
            : Boolean(parseInt(item.productInfo.webOnlyFlagCanadaStore, 10)),
          isBopisEligible: !parseBoolean(orderDetailsResponse.bopisIntlField),
          isBossEligible: deriveBossEligiblity(item, orderDetailsResponse),
          badge: extractPrioritizedBadge(item.productInfo, getCartProductAttributes()),
          isInventoryAvailBOSS: item.inventoryAvailBOSS > 0,
          // onlineInventoryAvailable: item.inventoryAvail,

          // TODO: cleanup structure
          store: store ? capitalize(store.shippingAddressDetails.storeName) : null,
          isStoreBOSSEligible: store
            ? parseBoolean(store.shippingAddressDetails.isStoreBOSSEligible)
            : false,
          // replaced "BOPIS" with a config variable
          // show storeId for both BOSS and BOPIS
          storeId: store && item.stLocId ? item.stLocId : null,
          storeAddress: store
            ? {
                addressLine1: capitalize(store.shippingAddressDetails.addressLine1),
                addressLine2: store.shippingAddressDetails.addressLine2,
                city: capitalize(store.shippingAddressDetails.city),
                state: store.shippingAddressDetails.state,
                zipCode: store.shippingAddressDetails.zipCode.trim(),
              }
            : null,
          // making store details visible for both BOSS and BOPIS
          storePhoneNumber: store ? (store.shippingAddressDetails.phone1 || '').trim() : null,
          storeTodayOpenRange: store ? `${todayOpeningTime} -  ${todayClosingTime}` : null,
          storeTomorrowOpenRange: store ? `${tomorrowOpeningTime} - ${tomorrowClosingTime}` : null,

          availability: deriveItemAvailability(
            orderDetailsResponse,
            item,
            store,
            isRadialInvEnabled
          ),
          vendorColorDisplayId: item.productInfo && item.productInfo.productPartNumber,
          // dates for boss pickup, used getDateInformation utility
          bossStartDate:
            item.orderItemType === ORDER_ITEM_TYPE.BOSS
              ? getDateInformation(store.shippingAddressDetails.bossMinDate, false)
              : null,
          bossEndDate:
            item.orderItemType === ORDER_ITEM_TYPE.BOSS
              ? getDateInformation(store.shippingAddressDetails.bossMaxDate, false)
              : null,
          // shows number of items from the store
          storeItemsCount: store ? +store.itemsCount : 0,
          orderItemType: item.orderItemType && item.orderItemType.toUpperCase(),
        },
      });
    }
  });
  if (orderDetailsResponse.giftWrapItem && orderDetailsResponse.giftWrapItem.length) {
    usersOrder.checkout.giftWrap = {
      optionId: orderDetailsResponse.giftWrapItem[0].catentryId.toString(),
      message: orderDetailsResponse.giftWrapItem[0].giftOptionsMessage || '',
      brand: orderDetailsResponse.giftWrapItem[0].itemBrand || '',
    };
    usersOrder.giftWrappingTotal = flatCurrencyToCents(
      orderDetailsResponse.giftWrapItem[0].totalPrice
    );
    usersOrder.subTotal -= usersOrder.giftWrappingTotal;
  }
  usersOrder.uiFlags = {};
  usersOrder.cartTotalAfterPLCCDiscount =
    orderDetailsResponse && orderDetailsResponse.cartTotalAfterPLCCDiscount;
  return usersOrder;
};
/* eslint-enable complexity, max-statements */

export const getOrderDetailsData = () => {
  const payload = {
    webService: endpoints.getOrderDetails,
    header: {
      calc: true,
      pageName: 'fullOrderInfo',
      langId: -1,
      recalculate: true,
    },
  };

  return executeStatefulAPICall(payload).then(res => {
    if (!res.body) {
      throw new Error(RES_NULL_ERROR);
      // TODO - Set API Helper to filter if error exists in response
    }

    const orderDetailsResponse = res.body;
    return {
      orderDetails: getCurrentOrderFormatter(orderDetailsResponse, false, isCASite()),
    };
  });
};

export const getProductInfoForTranslationData = (query, brand) => {
  return executeUnbxdAPICall({
    body: {
      rows: 20,
      variants: true,
      'variants.count': 100,
      version: 'V2',
      'facet.multiselect': true,
      selectedfacet: true,
      id: query,
      promotion: false,
      pagetype: 'boolean',
      fields:
        'giftcard,TCPFit,product_name,TCPColor,imagename,favoritedcount,product_short_description,style_long_description,min_list_price,min_offer_price,product_long_description',
    },
    webService: endpoints.getProductInfoForTranslationByPartNumber,
    brand,
  });
};
// TODO enable excludeCartItems when we exclude cart items
export const getCartData = ({
  calcsEnabled,
  // excludeCartItems,
  recalcRewards,
  isCheckoutFlow,
  isRadialInvEnabled,
  isLoggedIn,
}) => {
  const payload = {
    webService: endpoints.fullDetails,
    header: {
      // pageName: excludeCartItems ? 'excludeCartItems' : 'fullOrderInfo',
      pageName: 'fullOrderInfo',
      langId: -1,
      source: isLoggedIn ? 'login' : '',
      calc: !!calcsEnabled, // new flag (4/30) that enables a BE internal mechanism to compute calcs and taxes,
      recalculate: !!recalcRewards,
    },
  };

  return executeStatefulAPICall(payload).then(res => {
    if (!res.body) {
      throw new Error(RES_NULL_ERROR);
      // TODO - Set API Helper to filter if error exists in response
    }
    if (res.req && res.req.header && res.req.header.recalculate) {
      setBrierleyOrderPointsTimeCache();
    }
    const orderDetailsResponse =
      res.body.orderDetails.orderDetailsResponse || res.body.orderDetails;
    const coupons = isCheckoutFlow
      ? res.body.coupons
      : res.body.coupons &&
        res.body.coupons.offers &&
        constructCouponStructure(res.body.coupons.offers);
    return {
      coupons,
      orderDetails: getCurrentOrderFormatter(
        orderDetailsResponse,
        false,
        isCASite(),
        isRadialInvEnabled
      ),
    };
  });
};

export const toTimeString = est => {
  let hh = est.getHours();
  let mm = est.getMinutes();
  const ampm = hh >= 12 ? ' pm' : ' am';
  hh %= 12;
  hh = hh > 0 ? hh : 12;
  mm = mm < 10 ? `0${mm}` : mm;
  if (hh === 11 && mm === 59 && ampm === ' pm') {
    return 'Midnight';
  }
  return `${hh}:${mm}${ampm}`;
};

export const getUnqualifiedItems = () => {
  const payload = {
    webService: endpoints.getUnqualifiedItems,
  };
  const isCanadaSite = isCASite();

  return executeStatefulAPICall(payload)
    .then((res = { body: {} }) => {
      if (responseContainsErrors(res)) {
        throw new ServiceResponseError(res);
      }
      const {
        body: { orderItemList = [] },
      } = res;
      return orderItemList.map(({ orderItemId, isArticleOOSCA, isArticleOOSUS }) => ({
        orderItemId: orderItemId.toString(),
        isOOS: isCanadaSite ? isArticleOOSCA : isArticleOOSUS,
      }));
    })
    .catch(err => {
      throw err;
    });
};

export const startPaypalCheckoutAPI = (orderId, fromPage) => {
  const payload = {
    header: {
      orderId,
      callingPage: fromPage,
      requestType: 'REST',
    },
    webService: endpoints.paypalLookUp,
  };
  return executeStatefulAPICall(payload)
    .then((res = { body: {} }) => {
      if (responseContainsErrors(res)) {
        throw new ServiceResponseError(res);
      }
      return {
        centinelPayload: res.body.Centinel_PAYLOAD,
        centinelOrderId: res.body.Centinel_OrderId,
        centinelRequestPage: res.body.callingPage,
        tcpOrderId: res.body.orderId,
        paypalInContextToken: res.body.processorTransactionId,
      };
    })
    .catch(err => {
      throw getFormattedError(err);
    });
};

export const paypalAuthorizationAPI = (
  tcpOrderId,
  centinelRequestPage,
  centinelPayload,
  centinelOrderId
) => {
  const payload = {
    header: {
      tcpOrderId,
      callingPage: centinelRequestPage,
      PaRes: centinelPayload,
      MD: centinelOrderId,
    },
    webService: endpoints.paypalAuth,
  };
  return executeStatefulAPICall(payload)
    .then((res = { body: {} }) => {
      if (responseContainsErrors(res)) {
        throw new ServiceResponseError(res);
      }
      return {
        success: true,
      };
    })
    .catch(err => {
      throw getFormattedError(err);
    });
};

export default {
  getOrderDetailsData,
  removeItem,
  getCartData,
  getUnqualifiedItems,
  getProductInfoForTranslationData,
  startPaypalCheckoutAPI,
  paypalAuthorizationAPI,
};
