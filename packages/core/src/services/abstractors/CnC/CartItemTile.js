/* eslint-disable max-lines */
// TODO: Need fix unused/proptypes eslint error
/* eslint-disable */

import { executeStatefulAPICall } from '../../handler';
import { parseDate, compareDate } from '../../../utils/parseDate';
import endpoints from '../../endpoints';
import {
  parseBoolean,
  extractPrioritizedBadge,
  getDateInformation,
  getCartProductAttributes,
} from '../../../utils/badge.util';

export const getProductSkuInfoByUnbxd = item => {
  // calling unbxd API logic is written in CartItemTile.saga.js, needs to move it in this abstractor, as of now getting result from saga and formatting it here.
};
const ORDER_ITEM_TYPE = {
  BOSS: 'BOSS',
  BOPIS: 'BOPIS',
  ECOM: 'ECOM',
};

export const imageGenerator = (id, excludeExtension) => {
  return {
    colorSwatch: getSwatchImgPath(id, excludeExtension),
    productImages: getProductImgPath(id, excludeExtension),
  };
};

export const getSwatchImgPath = (id, excludeExtension) => {
  return `/wcsstore/GlobalSAS/images/tcp/products/swatches/${id}${excludeExtension ? '' : '.jpg'}`;
};

export const getProductImgPath = (id, excludeExtension) => {
  return {
    125: `/wcsstore/GlobalSAS/images/tcp/products/125/${id}${excludeExtension ? '' : '.jpg'}`,
    380: `/wcsstore/GlobalSAS/images/tcp/products/380/${id}${excludeExtension ? '' : '.jpg'}`,
    500: `/wcsstore/GlobalSAS/images/tcp/products/500/${id}${excludeExtension ? '' : '.jpg'}`,
    900: `/wcsstore/GlobalSAS/images/tcp/products/900/${id}${excludeExtension ? '' : '.jpg'}`,
  };
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

export const removeItem = orderItemId => {
  let orderItems = [];
  if (typeof orderItemId === 'string') {
    orderItems.push({
      orderItemId,
      quantity: '0',
    });
  } else {
    orderItems = Object.keys(orderItemId).map(index => {
      return {
        orderItemId: orderItemId[index],
        quantity: '0',
      };
    });
  }
  const payload = {
    body: {
      orderItem: orderItems,
    },
    webService: endpoints.updateMultiSelectItemsToRemove,
  };

  return executeStatefulAPICall(payload).then(res => {
    if (res && !res.body) {
      throw new Error('res body is null');
      // TODO - Set API Helper to filter if error exists in response
    }
    return {
      orderId: res && res.body.orderId,
    };
  });
};

export const updateItem = payloadData => {
  const { itemId, skuId, quantity, itemPartNumber, variantNo } = payloadData;
  const payload = {
    body: {
      orderItem: [
        {
          orderItemId: itemId,
          xitem_catEntryId: skuId,
          quantity: quantity.toString(),
          itemPartNumber,
          variantNo,
        },
      ],
    },
    webService: endpoints.updateOrderItem,
  };

  return executeStatefulAPICall(payload).then(res => {
    if (res && !res.body) {
      throw new Error('res body is null');
    }
    return {
      orderItemId: res.body.orderItem[0].orderItemId,
    };
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
  const oneDay = 24 * 60 * 60 * 1000; // hours * minutes * seconds * milliseconds
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

export const getCurrentOrderFormatter = (orderDetailsResponse, excludeCartItems, isCanada) => {
  const EMPTY_OBJECT = Object.create(null);
  let pickUpContact = {};
  let pickUpAlternative = {};
  // replaced "BOPIS" with a config variable
  // Check if order is of pickup type instead of just BOPIS
  const pickupOrder =
    orderDetailsResponse.mixOrderDetails &&
    orderDetailsResponse.mixOrderDetails.data &&
    orderDetailsResponse.mixOrderDetails.data.find(
      store => store.orderType === 'BOPIS' || store.orderType === 'BOSS'
    );
  // show pickup address for both BOSS and BOPIS
  if (pickupOrder) {
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
    for (const country in orderDetailsResponse.salesTax.salesTax) {
      for (const state in orderDetailsResponse.salesTax.salesTax[country]) {
        if (stateTax === -1) {
          stateTax = 0;
        }

        stateTax += orderDetailsResponse.salesTax.salesTax[country][state];
      }
    }
  }
  // When brierley fails, backend returns -1 in these fields
  if (orderDetailsResponse.pointsToNextReward === -1) {
    orderDetailsResponse.pointsToNextReward = null;
  }
  if (orderDetailsResponse.userPoints === -1) {
    orderDetailsResponse.userPoints = null;
  }

  const usersOrder = {
    orderId: orderDetailsResponse.parentOrderId,
    totalItems: excludeCartItems ? null : 0,
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
    rewardsToBeEarned: parseInt(orderDetailsResponse.valueOfEarnedPcCoupons) || 0, // FIXME: this should have been part of another namespace, however it had to be done.
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
    for (const item of orderDetailsResponse.orderLevelPromos.explicit) {
      for (const promoCode in item) {
        usersOrder.couponsTotal += Math.abs(flatCurrencyToCents(item[promoCode].price));
      }
    }
  }

  usersOrder.savingsTotal -= usersOrder.couponsTotal;

  // UGLY: I guess rounding causes this to be non zero in some cases
  // (or backend sending incorrect numbers)
  if (usersOrder.savingsTotal < 0) {
    usersOrder.savingsTotal = 0;
  }
  if (orderDetailsResponse.giftCardDetails) {
    for (const giftCard of orderDetailsResponse.giftCardDetails) {
      usersOrder.appliedGiftCards.push({
        id: giftCard.piId,
        onFileCardId: giftCard.creditCardId.toString(),
        amountApplied: giftCard.giftAmount,
        endingNumbers: giftCard.giftCardNumber.substr(-4),
        remainingBalance: giftCard.remainingBalance,
      });
    }
  }

  // DT-32443
  // Not sure why payment information is in mixOrderPaymentDetails AND paymentsList...
  // Backend will clear out mixOrderPaymentDetails array if the payment method is inactive in the DB
  // If mixOrderPaymentDetails is empty we should not save billing details and show error message
  const { mixOrderPaymentDetails } = orderDetailsResponse;
  if (mixOrderPaymentDetails && mixOrderPaymentDetails.length > 0) {
    for (const payment of orderDetailsResponse.paymentsList) {
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
            expMonth: parseInt(payment.cardExpirationMonth),
            expYear: parseInt(payment.cardExpirationYear),
            cvv: '',
            isExpirationRequired:
              payment.cardType !== 'PLACE CARD' && payment.cardType !== 'PayPal',
            isCVVRequired: payment.cardType !== 'PLACE CARD' && payment.cardType !== 'PayPal',
          },
        };
      }
    }
  }

  if (
    orderDetailsResponse &&
    orderDetailsResponse.mixOrderDetails &&
    orderDetailsResponse.mixOrderDetails.data
  ) {
    for (const store of orderDetailsResponse.mixOrderDetails.data) {
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
    }
  }

  for (const item of orderDetailsResponse.orderItems) {
    const sizeAndFit = item.productInfo.itemsAttributes[item.itemCatentryId.toString()];
    // When brierley fails, backend returns -1
    if (item.itemPoints === -1) {
      item.itemPoints = null;
    }
    // making pickup page visible for BOSS items as well
    // replaced "BOPIS" and "BOSS" with a config variable
    const store =
      (item.orderItemType === 'BOPIS' || item.orderItemType === 'BOSS') &&
      item.stLocId &&
      orderDetailsResponse.mixOrderDetails &&
      orderDetailsResponse.mixOrderDetails.data
        ? orderDetailsResponse.mixOrderDetails.data.find(
            store =>
              store.shippingAddressDetails.stLocId === item.stLocId &&
              store.orderType === item.orderItemType
          )
        : null;

    if (!item.giftOptions) {
      usersOrder.totalItems += parseInt(item.qty);

      /* let {
        todayOpeningTime,
        todayClosingTime,
        tomorrowOpeningTime,
        tomorrowClosingTime
      } = parseStoreOpeningAndClosingTimes(store);*/

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
            // imagePath: imageGenerator(item.productInfo.productThumbnail).colorSwatch
          },
          isGiftCard,
          colorFitSizeDisplayNames: isGiftCard ? { color: 'Design', size: 'Value' } : EMPTY_OBJECT,
          // added to read type of order for the item
          orderType: item.orderItemType,
          itemBrand: item.itemBrand,
        },
        itemInfo: {
          quantity: parseInt(item.qty),
          itemId: item.orderItemId.toString(),
          itemPoints: item.itemPoints || item.itemPoints === 0 ? parseInt(item.itemPoints) : null,
          // This code is misleading - itemPrice and itemDstPrice are not equal to list price/offer price
          // Backend returns the same value for both itemPrice and itemDstPrice UNLESS an explicit promotion is applied
          // Enhancement needed - Backend should return the actual prices and frontend should determine which values to display
          listPrice: flatCurrencyToCents(item.itemPrice),
          offerPrice: flatCurrencyToCents(item.itemDstPrice),
          unitOfferPrice: flatCurrencyToCents(item.itemUnitDstPrice),
          wasPrice: flatCurrencyToCents(item.productInfo.listPrice),
          salePrice: isCanada
            ? flatCurrencyToCents(item.productInfo.offerPriceCAD)
            : flatCurrencyToCents(item.productInfo.offerPrice),
        },
        miscInfo: {
          // clearanceItem: this.apiHelper.configOptions.isUSStore ? item.productInfo.itemTCPProductIndUSStore === 'Clearance' : item.productInfo.itemTCPProductIndCanadaStore === 'Clearance',
          isOnlineOnly: true
            ? Boolean(parseInt(item.productInfo.webOnlyFlagUSStore))
            : Boolean(parseInt(item.productInfo.webOnlyFlagCanadaStore)),
          isBopisEligible: !parseBoolean(orderDetailsResponse.bopisIntlField),
          isBossEligible: deriveBossEligiblity(item, orderDetailsResponse),
          badge: extractPrioritizedBadge(item.productInfo, getCartProductAttributes()),
          // onlineInventoryAvailable: item.inventoryAvail,

          // TODO: cleanup structure
          store: store ? capitalize(store.shippingAddressDetails.storeName) : null,
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
          // storeTodayOpenRange: store ? todayOpeningTime + ' - ' + todayClosingTime : null,
          // storeTomorrowOpenRange: store ? tomorrowOpeningTime + ' - ' + tomorrowClosingTime : null,

          // availability: deriveItemAvailability(orderDetailsResponse, item, store),
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
  }

  if (orderDetailsResponse.giftWrapItem && orderDetailsResponse.giftWrapItem.length) {
    usersOrder.checkout.giftWrap = {
      optionId: orderDetailsResponse.giftWrapItem[0].catentryId.toString(),
      message: orderDetailsResponse.giftWrapItem[0].giftOptionsMessage || '',
    };
    usersOrder.giftWrappingTotal = flatCurrencyToCents(
      orderDetailsResponse.giftWrapItem[0].totalPrice
    );
    usersOrder.subTotal -= usersOrder.giftWrappingTotal;
  }
  usersOrder.uiFlags = {
    // isPaypalEnabled: parseBoolean(orderDetailsResponse.payPalAllowed || orderDetailsResponse.isPayPalAllowed)
  };
  usersOrder.cartTotalAfterPLCCDiscount =
    orderDetailsResponse && orderDetailsResponse.cartTotalAfterPLCCDiscount;
  return usersOrder;
};

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
      throw new Error('res body is null');
      // TODO - Set API Helper to filter if error exists in response
    }

    const orderDetailsResponse = res.body;

    return {
      orderDetails: getCurrentOrderFormatter(orderDetailsResponse, false, false),
    };
  });
};

export const getCartData = ({ calcsEnabled, excludeCartItems, recalcRewards, isCanada }) => {
  const payload = {
    webService: endpoints.fullDetails,
    header: {
      pageName: excludeCartItems ? 'excludeCartItems' : 'fullOrderInfo',
      langId: -1,
      source: '',
      calc: !!calcsEnabled, // new flag (4/30) that enables a BE internal mechanism to compute calcs and taxes,
      recalculate: !!recalcRewards,
    },
  };

  return executeStatefulAPICall(payload).then(res => {
    if (!res.body) {
      throw new Error('res body is null');
      // TODO - Set API Helper to filter if error exists in response
    }

    const orderDetailsResponse =
      res.body.orderDetails.orderDetailsResponse || res.body.orderDetails;
    return {
      coupons:
        res.body.coupons &&
        res.body.coupons.offers &&
        constructCouponStructure(res.body.coupons.offers),
      orderDetails: getCurrentOrderFormatter(orderDetailsResponse, excludeCartItems, isCanada),
    };
  });
};

export const flatCurrencyToCents = currency => {
  try {
    return parseFloat(parseFloat(currency.toString().match(/^-?\d+(?:\.\d{0,2})?/)[0]).toFixed(2));
  } catch (e) {
    throw new Error(e);
  }
};
export const capitalize = string => {
  return string.replace(/\b\w/g, l => l.toUpperCase());
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

export const deriveBossEligiblity = (item, orderDetailsResponse) => {
  return !(
    parseBoolean(item.productInfo.itemTcpBossProductDisabled) ||
    parseBoolean(item.productInfo.itemTcpBossCategoryDisabled) ||
    orderDetailsResponse.bossIntlField
  );
};

export default {
  getOrderDetailsData,
  removeItem,
  getCartData,
};
