/* eslint-disable max-lines */
/* eslint-disable extra-rules/no-commented-out-code */
import superagent from 'superagent';
import logger from '@tcp/core/src/utils/loggerInstance';
import jsonp from 'superagent-jsonp';
import { executeStatefulAPICall } from '../../handler';
import endpoints from '../../endpoints';
import { getCurrentOrderFormatter, flatCurrencyToCents } from './CartItemTile';
import {
  responseContainsErrors,
  ServiceResponseError,
  getFormattedError,
} from '../../../utils/errorMessage.util';
import { getAPIConfig, capitalize, toTimeString } from '../../../utils';
import { parseDate } from '../../../utils/parseDate';
import CheckoutConstants from '../../../components/features/CnC/Checkout/Checkout.constants';

const BV_API_KEY = 'e50ab0a9-ac0b-436b-9932-2a74b9486436';

const ORDER_ITEM_TYPE = {
  BOSS: 'BOSS',
  BOPIS: 'BOPIS',
  ECOM: 'ECOM',
};

export const CREDIT_CARDS_PAYMETHODID = {
  'PLACE CARD': 'ADSPlaceCard',
  VISA: 'COMPASSVISA',
  AMEX: 'COMPASSAMEX',
  MC: 'COMPASSMASTERCARD',
  DISC: 'COMPASSDISCOVER',
  VENMO: 'VENMO',
};
export const getGiftWrappingOptions = () => {
  const payload = {
    webService: endpoints.giftOptionsCmd,
  };

  return executeStatefulAPICall(payload);
  // .then(res => {
  // if (responseContainsErrors(res)) {
  //   throw new ServiceResponseError(res);
  // }
  //     let filteredRes = [];
  //
  //     Object.keys(res.body.giftOptions).map((index) => {
  //       filteredRes.push({
  //         id: res.body.giftOptions[index].catEntryId,
  //         displayName: res.body.giftOptions[index].name.split(':')[0],
  //         price: flatCurrencyToCents(res.body.giftOptions[index].price),
  //         shortDescription: res.body.giftOptions[index].longDescription
  //       });
  //     });
  //     return filteredRes;
  // })
  // .catch(err => {
  //   // throw getFormattedError(err);
  // });
};

export const addPickupPerson = args => {
  const apiConfig = getAPIConfig();
  const payload = {
    header: {
      'X-Cookie': apiConfig.cookie,
    },
    body: {
      contact: [
        {
          addressType: 'shipping',
          firstName: args.firstName,
          lastName: args.lastName,
          phone2: args.phoneNumber,
          email1: (args.emailAddress || '').trim(),
          email2: args.alternateEmail
            ? `${args.alternateEmail.trim()}|${args.alternateFirstName} ${args.alternateLastName}`
            : '',
        },
      ],
    },
    webService: endpoints.addAddress,
  };

  return executeStatefulAPICall(payload)
    .then(res => {
      // if (this.apiHelper.responseContainsErrors(res)) {
      //   throw new ServiceResponseError(res);
      // }

      return { addressId: res.body.addressId };
    })
    .catch(err => {
      logger.error(err);
    });
};

export const getCurrentOrderAndCouponsDetails = (
  orderId,
  calcsEnabled,
  excludeCartItems,
  imageGenerator,
  recalcRewards,
  isLoggedIn
) => {
  // isLoggedIn = false;
  const payload = {
    header: {
      orderId,
      pageName: excludeCartItems ? 'excludeCartItems' : 'fullOrderInfo', // If this value is not set then you will get partial order information
      // DT-33656 Perfomance -addCheckout/ getOrderDetails - Avoid Store Locator aggregation
      // locStore: 'True', // this flag is so that mulesoft can run other services on their side to get BOPIS store info per item
      // 'X-Cookie': this.apiHelper.configOptions.cookie,
      langId: -1,
      source: isLoggedIn ? 'login' : '',
      calc: !!calcsEnabled, // new flag (4/30) that enables a BE internal mechanism to compute calcs and taxes,
      recalculate: !!recalcRewards,
    },
    webService: endpoints.fullDetails,
  };

  return executeStatefulAPICall(payload).then(res => {
    // if (this.apiHelper.responseContainsErrors(res)) {
    //   throw new ServiceResponseError(res);
    // }

    // If recalculate is true in the header of the request and the response is success,
    // Set the time when the recalculated order points have been updated.
    // if(res.req && res.req.header && res.req.header.recalculate) {
    //   setBrierleyOrderPointsTimeCache();
    // }

    const orderDetailsResponse =
      res.body.orderDetails.orderDetailsResponse || res.body.orderDetails;

    return {
      coupons: res.body.coupons,
      orderDetails: getCurrentOrderFormatter(
        orderDetailsResponse,
        excludeCartItems,
        imageGenerator
      ),
    };
  });
  // .catch(err => {
  //   // throw this.apiHelper.getFormattedError(err);
  // });
};

const shippingMethodResponseHandler = res => {
  if (responseContainsErrors(res)) {
    throw new ServiceResponseError(res);
  }
  const methods = res.body.jsonArr;
  let hasDefault = false;

  // eslint-disable-next-line array-callback-return
  const resFiltered = Object.keys(methods).map(index => {
    const root = methods[index].description;
    const tmp = root.split('Up To ');
    const price = methods[index].shippingPrice.match(/\$([0-9]+[.]*[0-9]*)/);
    let displayName = tmp[0].indexOf('-') === -1 ? tmp[0].replace('FREE', '- FREE') : tmp[0];
    const shippingMethod = tmp.length > 1 ? `Up To ${tmp[1]}` : '';

    if (price) displayName = displayName.replace(`$${price[1]}`, '');

    hasDefault = hasDefault || methods[index].defaultShipMode;
    return {
      id: methods[index].shipModeId,
      displayName: (displayName || '').trim(), // return anything until $ sign is being matched
      shippingSpeed: (shippingMethod || '').trim(), // whichever value using 'price' as anchor
      price: price ? parseInt(price[1], 10) : 0,
      isDefault: methods[index].defaultShipMode,
    };
  });

  if (!hasDefault && methods.length) resFiltered[0].isDefault = true;

  return resFiltered;
};

export const getShippingMethods = (state, zipCode, addressField1, addressField2, labels) => {
  // Note: (2-25, From Melvin Jose): based on his request we're relaxing when state and zipcode is being attached to the header, should values be empty or null we won't be sending them.
  // if (this.activeGetShippingMethodsRequest && this.activeGetShippingMethodsRequest.abort) {
  //   this.activeGetShippingMethodsRequest.abort();
  // }

  // Note: (2-25, From Melvin Jose): based on his request we're relaxing when state and zipcode is being attached to the header, should values be empty or null we won't be sending them.
  const dynamicHeader = { state, zipCode, addressField1, addressField2 };
  Object.keys(dynamicHeader).forEach(key => {
    if (!dynamicHeader[key]) delete dynamicHeader[key];
  });
  const payload = {
    header: dynamicHeader,
    webService: endpoints.getShipmentMethods,
  };
  return executeStatefulAPICall(payload)
    .then(shippingMethodResponseHandler)
    .catch(err => {
      throw getFormattedError(err, labels);
    });
};
export function addGiftWrappingOption(payload) {
  const payloadArgs = {
    webService: endpoints.addGiftOptions,
    body: {
      orderId: payload.orderId || '.', // '.' means use context one
      GiftMsg: payload.GiftMsg || '',
      quantity_0: '1',
      catEntryId_0: payload.catEntryId,
    },
  };
  return executeStatefulAPICall(payloadArgs).then(res => {
    return res;
  });
}
export function removeGiftWrappingOption() {
  const payloadArgs = {
    webService: endpoints.addGiftOptions,
    body: {
      orderId: '.', // '.' means use context one
      GiftMsg: '',
      quantity_0: '',
      catEntryId_0: '',
    },
  };
  return executeStatefulAPICall(payloadArgs).then(res => {
    return res;
  });
}
export function briteVerifyStatusExtraction(emailAddress) {
  return new Promise(resolve => {
    superagent
      .get('https://bpi.briteverify.com/emails.json')
      .query({
        apikey: BV_API_KEY,
        address: emailAddress,
      })
      .use(
        jsonp({
          timeout: 2000,
        })
      )
      .then(response => {
        const result = response.body;
        resolve(`${result.status}::false:false`);
      })
      .catch(() => {
        // call to briteverify validation failed
        /** assume email address is OK -- this validation is a nicety */
        resolve('no_response::false:false');
      });
  });
}
function extractRtpsEligibleAndCode(apiResponse) {
  const response = apiResponse.body.processOLPSResponse;
  const prescreenResponse = (response && response.response) || {};

  return {
    plccEligible: prescreenResponse.returnCode === '01',
    prescreenCode: prescreenResponse.prescreenId || '',
  };
}
export function setShippingMethodAndAddressId(
  shippingTypeId,
  addressId,
  verifyPrescreen,
  transVibesSmsPhoneNo,
  labels
) {
  const payload = {
    body: {
      shipModeId: shippingTypeId,
      addressId,
      requesttype: 'ajax',
      prescreen: verifyPrescreen, // as per backend, DT-19753 & DT-19757, we are to pass this so they can run pre-screen function - DT-21915
      x_calculationUsage: '-1,-2,-3,-4,-5,-6,-7',
      transVibesSmsPhoneNo,
    },
    webService: endpoints.updateShippingMethodSelection,
  };

  return executeStatefulAPICall(payload)
    .then(res => {
      if (responseContainsErrors(res)) {
        throw new ServiceResponseError(res);
      } else {
        const rtpsData = extractRtpsEligibleAndCode(res);

        return {
          success: true,
          plccEligible: rtpsData.plccEligible,
          prescreenCode: rtpsData.prescreenCode,
        };
      }
    })
    .catch(err => {
      throw getFormattedError(err, labels);
    });
}

export function addGiftCardPaymentToOrder(args) {
  const { billingAddressId, orderGrandTotal } = args;
  const { cardNumber, cardPin, balance, saveToAccount, nickName, creditCardId } = args;
  const paymentInstruction = {
    billing_address_id: (billingAddressId || '').toString(),
    piAmount: (orderGrandTotal || '').toString(),
    payMethodId: 'GiftCard',
    cc_brand: 'GC',
    account: (cardNumber || '').toString(),
    account_pin: (cardPin || '').toString(),
    balance: balance || null,
  };

  const headerValue = {
    isRest: 'true',
    identifier: 'true',
    savePayment: saveToAccount ? 'true' : 'false', // save to account for registered users
    nickName: nickName || `${'Billing_'}${new Date().getTime().toString()}`,
  };

  if (creditCardId) {
    paymentInstruction.creditCardId = (creditCardId || '').toString();
  }

  const payload = {
    header: headerValue,
    body: {
      paymentInstruction: [paymentInstruction],
    },
    webService: endpoints.addPaymentInstruction,
  };

  return executeStatefulAPICall(payload)
    .then(res => {
      if (res.body && res.body.OosCartItems === 'TRUE') {
        throw new ServiceResponseError({
          body: {
            errorCode: 'API_CART_OOS_ITEM',
          },
        });
      } else {
        return {
          success: true,
          paymentIds: res.body.paymentInstruction,
        };
      }
    })
    .catch(err => {
      return err;
    });
}

export function removeGiftCard(paymentId, labels) {
  const payload = {
    body: {
      piIds: paymentId,
    },
    webService: endpoints.deletePaymentInstruction,
  };

  return executeStatefulAPICall(payload)
    .then(res => {
      if (responseContainsErrors(res)) {
        throw new ServiceResponseError(res);
      } else {
        return res.body;
      }
    })
    .catch(err => {
      throw getFormattedError(err, labels);
    });
}
export function addPaymentToOrder({
  billingAddressId = '',
  orderGrandTotal = '',
  cardType,
  cardNumber = '',
  monthExpire = '',
  yearExpire = '',
  setAsDefault,
  saveToAccount,
  nickName,
  onFileCardId = '',
  cvv = '',
}) {
  const paymentInstruction = {
    billing_address_id: billingAddressId.toString(),
    piAmount: orderGrandTotal.toString(),
    payMethodId: CREDIT_CARDS_PAYMETHODID[cardType],
    cc_brand: cardType,
    account: cardNumber.toString(),
    expire_month: monthExpire.toString(), // PLCC doesn't require exp
    expire_year: yearExpire.toString(), // PLCC doesn't require exp
    isDefault: (!!setAsDefault).toString(),
  };
  const apiConfig = getAPIConfig();
  const header = {
    isRest: 'true',
    identifier: 'true',
    savePayment: saveToAccount ? 'true' : 'false', // save to account for registered users
    nickName: nickName || `Billing_${apiConfig.storeId}_${new Date().getTime().toString()}`,
  };

  if (onFileCardId) {
    paymentInstruction.creditCardId = onFileCardId.toString();
  }

  if (cvv) {
    paymentInstruction.cc_cvc = cvv.toString(); // PLCC doesn't require exp
  }

  // Venmo Support
  // const { venmoData, saveVenmoTokenIntoProfile } = args;
  // if (venmoData && venmoData.details && venmoData.details.username) {
  //   const {
  //     nonce,
  //     details: { username },
  //   } = venmoData;
  //   const {
  //     // eslint-disable-next-line camelcase
  //     billing_address_id,
  //     piAmount,
  //     payMethodId,
  //     cc_brand,
  //   } = paymentInstruction;
  //   paymentInstruction = {
  //     billing_address_id,
  //     piAmount,
  //     payMethodId,
  //     cc_brand,
  //     account: nonce || '',
  //     isDefault: 'false', // DTN-4190
  //   };
  //   header.savePayment = 'false';
  //   if (nonce) {
  //     paymentInstruction.venmo_user_id = username;
  //     paymentInstruction.save_venmo_token_into_profile = saveVenmoTokenIntoProfile
  //       ? 'true'
  //       : 'false';
  //   }
  // }

  const payload = {
    header,
    body: {
      paymentInstruction: [paymentInstruction],
    },
    webService: endpoints.addPaymentInstruction,
  };
  return executeStatefulAPICall(payload)
    .then(res => {
      if (responseContainsErrors(res)) {
        throw new ServiceResponseError(res);
      }
      if (res.body && res.body.OosCartItems === 'TRUE') {
        throw new ServiceResponseError({
          body: {
            errorCode: CheckoutConstants.CUSTOM_OOS_ERROR_CODE,
          },
        });
      }
      return {
        paymentIds: res.body.paymentInstruction,
      };
    })
    .catch(err => {
      throw getFormattedError(err);
    });
}

export function updatePaymentOnOrder(args) {
  const payload = {
    header: {
      savePayment: args.saveToAccount ? 'true' : 'false',
    },
    body: {
      prescreen: true, // as per backend, DT-19753 & DT-19757, we are to pass this so they can run pre-screen function
      paymentInstruction: [
        {
          expire_month: args.monthExpire ? args.monthExpire.toString() : '',
          piAmount: args.orderGrandTotal ? args.orderGrandTotal.toString() : '',
          payMethodId: CREDIT_CARDS_PAYMETHODID[args.cardType],
          cc_brand: args.cardType,
          expire_year: args.yearExpire ? args.yearExpire.toString() : '',
          account: args.cardNumber,
          piId: args.paymentId,
          cc_cvc: args.cvv,
          billing_address_id: args.billingAddressId,
          isDefault: (!!args.setAsDefault).toString(),
        },
      ],
    },
    webService: endpoints.updatePaymentInstruction,
  };
  return executeStatefulAPICall(payload).then(res => {
    if (responseContainsErrors(res)) {
      throw new ServiceResponseError(res);
    }
    return { paymentId: res.body.paymentInstruction[0].piId };
  });
}

const getStateTax = orderSummary => {
  let stateTax = 0;
  if (orderSummary.salesTax && orderSummary.salesTax.salesTax) {
    Object.keys(orderSummary.salesTax.salesTax).forEach(country => {
      Object.keys(orderSummary.salesTax.salesTax[country]).forEach(state => {
        stateTax += parseFloat(orderSummary.salesTax.salesTax[country][state]);
      });
    });
  }
  return stateTax;
};

function parseStoreOpeningAndClosingTimes(store) {
  const openingClosingTimes = {
    todayOpeningTime: null,
    todayClosingTime: null,
    tomorrowOpeningTime: null,
    tomorrowClosingTime: null,
  };

  try {
    const hours = JSON.parse(store.shippingAddressDetails.storeHours);
    openingClosingTimes.todayOpeningTime = toTimeString(
      parseDate(hours.storeHours[0].availability[0].from)
    );
    openingClosingTimes.todayClosingTime = toTimeString(
      parseDate(hours.storeHours[0].availability[0].to)
    );
    openingClosingTimes.tomorrowOpeningTime = toTimeString(
      parseDate(hours.storeHours[1].availability[0].from)
    );
    openingClosingTimes.tomorrowClosingTime = toTimeString(
      parseDate(hours.storeHours[1].availability[0].to)
    );
  } catch (error) {
    return openingClosingTimes;
  }

  return openingClosingTimes;
}

const getCouponTotal = orderDetails => {
  let total = 0;
  if (orderDetails.OrderLevelPromos && orderDetails.OrderLevelPromos.explicit) {
    Object.keys(orderDetails.OrderLevelPromos.explicit).forEach(item => {
      Object.keys(item).forEach(promoCode => {
        total += Math.abs(flatCurrencyToCents(item[promoCode].price));
      });
    });
  }
  return total;
};

export function submitOrder(orderId, smsOrderInfo, currentLanguage, venmoPayloadData = {}) {
  const payload = {
    body: {
      orderId: orderId || '.',
      isRest: 'true',
      transVibesSmsPhoneNo: smsOrderInfo,
      chosenLocale: currentLanguage,
      ...venmoPayloadData,
      // DT-33656 Perfomance -addCheckout/ getOrderDetails - Avoid Store Locator aggregation
      // locStore: 'True'  // NOTE: MS geniuses require this flag to avoid parsing reponses as when a store info is expected.
    },
    webService: endpoints.checkout,
  };
  return executeStatefulAPICall(payload, false, {
    response: 60000,
    deadline: 70000,
  })
    .then(res => {
      if (responseContainsErrors(res)) {
        throw new ServiceResponseError(res);
      }
      const orderSummary = res.body.addCheckoutResponse
        ? res.body.addCheckoutResponse.orderSummaryJson
        : res.body.orderSummaryJson;
      const orderDetails = orderSummary.orderDetailsResponse || orderSummary;
      const hadMixedOderData =
        orderSummary &&
        orderSummary.mixOrderDetails &&
        orderSummary.mixOrderDetails.data &&
        orderSummary.mixOrderDetails.data.length > 0;
      const onlineOrder = hadMixedOderData
        ? orderSummary.mixOrderDetails.data.find(address => address.orderType === 'ECOM') || {}
        : {};
      const shipping = onlineOrder.shippingAddressDetails || null;
      const addressDetails = hadMixedOderData
        ? orderSummary.mixOrderDetails.data[0].shippingAddressDetails
        : {};

      const sthOrderId = onlineOrder ? onlineOrder.subOrderId : null;
      const sthTotalOrder = onlineOrder.piAmount ? flatCurrencyToCents(onlineOrder.piAmount) : null;
      const sthItemCount = onlineOrder.itemsCount
        ? flatCurrencyToCents(onlineOrder.itemsCount)
        : null;
      const sthOrderPlaced = parseDate(orderSummary.placedOrderTime);
      const apiConfig = getAPIConfig();
      const trackinLinkPrefix = `/shop/TCPOrderLookUp?catalogId=${apiConfig.catalogId}&langId=${
        apiConfig.langId
      }&storeId=${apiConfig.storeId}`;
      const sthLinkOrder = `${trackinLinkPrefix}&shipmentTypeId=1&forSearch=1&orderId=${sthOrderId}&emailId=${encodeURIComponent(
        (shipping || addressDetails).encryptedEmail1
      ) || ''}`;

      const stateTax = getStateTax(orderSummary);
      let paymentList = [];
      if (orderDetails.paymentsList && orderDetails.paymentsList.length) {
        paymentList = orderDetails.paymentsList.map(
          ({ authorizedAmount, paymentMethod, plccHash = '', venmoUserId = '' }) => ({
            authorizedAmount,
            paymentMethod,
            plccHash,
            venmoUserId,
          })
        );
      }

      const orderItems =
        orderDetails.orderItems && orderDetails.orderItems.length ? orderDetails.orderItems : [];
      // FIXME: cleanup, info repeated in some nodes
      // FIXME: cleanup. we should only store information relevant to confirmation page.
      const orderConfirmationDetails = {
        summary: {
          itemsTotal: orderSummary.orderSubTotal,
          itemsCount: orderSummary.cartCount,
          couponsTotal: 0,
          giftWrappingTotal: 0, // FIXME: retrieve value from response
          giftCardsTotal: flatCurrencyToCents(orderSummary.totalGiftCardAmount) || 0,
          savingsTotal: Math.abs(flatCurrencyToCents(orderSummary.orderDiscountAmount) || 0),
          taxesTotal: flatCurrencyToCents(orderSummary.shippingTax) + stateTax,
          shippingTotal: flatCurrencyToCents(orderSummary.finalShippingCharge),
          valueOfEarnedPcCoupons: parseInt(orderSummary.valueOfEarnedPcCoupons, 10) || 0,
          subTotal: flatCurrencyToCents(orderSummary.orderSubTotalBeforeDiscount),
          grandTotal: orderSummary.grandTotal,
        },

        isOrderPending: orderSummary.orderStatus === 'V',

        holdDate: null,
        totalsByFullfillmentCenterMap:
          orderSummary.mixOrderDetails.mixCart !== 'ECOM'
            ? orderSummary.mixOrderDetails.data
                .filter(
                  store =>
                    store.orderType === ORDER_ITEM_TYPE.BOPIS ||
                    store.orderType === ORDER_ITEM_TYPE.BOSS
                )
                .map(store => {
                  const summary = store;
                  const bopisOrderTrackLink = `${trackinLinkPrefix}&shipmentTypeId=1&forSearch=1&orderId=${
                    summary.subOrderId
                  }&emailId=${encodeURIComponent(summary.shippingAddressDetails.encryptedEmail1) ||
                    ''}`;

                  const {
                    todayOpeningTime,
                    todayClosingTime,
                    tomorrowOpeningTime,
                    tomorrowClosingTime,
                  } = parseStoreOpeningAndClosingTimes(store);

                  return {
                    id: store.shippingAddressDetails.stLocId.toString(),
                    storeName: capitalize(store.shippingAddressDetails.storeName),
                    address: {
                      addressLine1: store.shippingAddressDetails.addressLine1,
                      addressLine2: store.shippingAddressDetails.addressLine2,
                      city: store.shippingAddressDetails.city,
                      state: store.shippingAddressDetails.state,
                      zipCode: (store.shippingAddressDetails.zipCode || '').trim(),
                      country: store.shippingAddressDetails.country,
                    },
                    phoneNumber: (store.shippingAddressDetails.phone1 || '').trim(),
                    productsCount: parseInt(summary.itemsCount, 10),

                    todayOpenRange: `${todayOpeningTime} - ${todayClosingTime}`,
                    tomorrowOpenRange: `${tomorrowOpeningTime} - ${tomorrowClosingTime}`,

                    orderDate: parseDate(orderDetails.placedOrderTime),
                    orderNumber: summary.subOrderId,
                    // TODO: legacy link, remove
                    orderLink: bopisOrderTrackLink,
                    orderTotal: flatCurrencyToCents(summary.piAmount),

                    emailAddress: summary.shippingAddressDetails.email1,
                    encryptedEmailAddress: encodeURIComponent(
                      summary.shippingAddressDetails.encryptedEmail1
                    ),
                    bossMaxDate: store.shippingAddressDetails.bossMaxDate || null,
                    bossMinDate: store.shippingAddressDetails.bossMinDate || null,
                    orderType: store.orderType,
                  };
                })
            : null,

        orderDetails: {
          date: parseDate(orderDetails.placedOrderTime),
          orderNumber: onlineOrder ? onlineOrder.subOrderId : '[NOT_AVAILABLE]',
          trackingLink: sthLinkOrder,
          orderTotal: orderSummary.grandTotal,
        },
        rewardedPoints: orderDetails.estimatedPointsEarned,
        isElectiveBonus: orderDetails.isElectiveBonus,
        currencyCode: orderDetails.currencyCode,
        orderItems,
        paymentsList: paymentList,
      };

      if (orderDetails.airMiles) {
        orderConfirmationDetails.airmiles = {
          accountNumber: orderDetails.airMiles.airMilesAccount,
          promoId: orderDetails.airMiles.airMilesDeal,
        };
      }

      orderConfirmationDetails.summary.couponsTotal += getCouponTotal(orderDetails);

      orderConfirmationDetails.summary.savingsTotal -=
        orderConfirmationDetails.summary.couponsTotal;

      if (orderConfirmationDetails.summary.savingsTotal < 0) {
        orderConfirmationDetails.summary.savingsTotal = 0;
      }

      if (orderSummary.giftWrapItem && orderSummary.giftWrapItem.length) {
        orderConfirmationDetails.summary.giftWrappingTotal = flatCurrencyToCents(
          orderSummary.giftWrapItem[0].totalPrice
        );
        orderConfirmationDetails.summary.subTotal -=
          orderConfirmationDetails.summary.giftWrappingTotal;
      }

      if (shipping) {
        orderConfirmationDetails.shipping = {
          address: {
            firstName: shipping.firstName,
            lastName: shipping.lastName,
          },
          emailAddress: shipping.email1,
          encryptedEmailAddress: encodeURIComponent(shipping.encryptedEmail1),

          // STH only settings (not necesarely the totals)
          orderDate: sthOrderPlaced,
          // TODO: legacy order link, remove
          orderLink: sthLinkOrder,
          orderTotal: sthTotalOrder,
          itemsCount: sthItemCount,
        };
      }

      // Information needed for guest user registration on confirmation page
      orderConfirmationDetails.userDetails = {
        emailAddress:
          (shipping || addressDetails).email1 ||
          (orderConfirmationDetails.shipping
            ? orderConfirmationDetails.shipping.emailAddress
            : null),
        encryptedEmailAddress:
          encodeURIComponent((shipping || addressDetails).encryptedEmail1) ||
          (orderConfirmationDetails.shipping
            ? orderConfirmationDetails.shipping.encryptedEmailAddress
            : null),
      };

      orderDetails.paymentsList.forEach(payment => {
        if (payment.cardType !== 'GC' && payment.billingAddressDetails) {
          const billingAddress = payment.billingAddressDetails;
          orderConfirmationDetails.userDetails = {
            firstName: billingAddress.firstName || '',
            lastName: billingAddress.lastName || '',
            zipCode: (billingAddress.zipCode || '').trim(),
            // emailAddress: billingAddress.email || orderConfirmationDetails.userDetails.emailAddress,
            emailAddress: orderConfirmationDetails.userDetails.emailAddress || billingAddress.email, // use the shipping email address
            encryptedEmailAddress:
              orderConfirmationDetails.userDetails.encryptedEmailAddress ||
              encodeURIComponent(billingAddress.encryptedEmail),
            phoneNumber: billingAddress.phone1 || addressDetails.phone1,
          };
        }
      });

      // FIXME: should come from backend / variable days
      const holdDate = parseDate(orderDetails.placedOrderTime);
      holdDate.setDate(holdDate.getDate() + 4);
      orderConfirmationDetails.holdDate = holdDate;
      // removeLocalStorage(VENMO_STORAGE_KEY); // TODO Remove the key
      // removeLocalStorage(VENMO_INPROGRESS_KEY);
      return orderConfirmationDetails;
    })
    .catch(err => {
      throw getFormattedError(err);
    });
}

export function requestPersonalizedCoupons({
  orderNumber,
  emailAddress,
  locationId,
  couponList = [],
  isElectiveBonus,
  currencyCode,
  payments = [],
  cartItems = [],
}) {
  const cartItemList = cartItems.map(item => ({
    price: item.itemUnitDstPrice,
    orderItemId: item.orderItemId,
    itemUnitPrice: item.itemUnitPrice,
    transactionType: 'PURCHASE',
    quantity: item.qty,
    product: {
      skuNumber: item.variantNo,
    },
  }));

  const paymentsList = payments.map(payment => {
    const temp = {
      authorizedAmount: payment.authorizedAmount,
      paymentMethod: payment.paymentMethod,
    };
    // Checking if the PLCC hash has some value only then sending this parameter in header else
    // back end code will break, as usual.
    if (payment.plccHash) {
      temp.plccHash = payment.plccHash;
    }
    return temp;
  });
  const couponsList = couponList.map(coupon => ({
    couponCode: coupon.id,
  }));

  const payload = {
    body: {
      personalizedOffersRequest: {
        externalTransactionId: orderNumber,
        scenario: '1006', // hard coded as per backend
        order: {
          isElectiveBonus,
          currencyCode,
          store: {
            location: locationId,
          },
          customer: {
            customerLookupType: '1003',
            customerLookupId: emailAddress,
          },
          coupon: couponsList,
          lineItem: cartItemList,
        },
        paymentsList,
      },
    },
    webService: endpoints.personalizedCoupons,
  };

  return executeStatefulAPICall(payload)
    .then(res => {
      /**
       * Scenarios Summary:
       * Coupons data is recieved in personalizedOffersResponse, Brierly is recieved in orderResponse
       * When ODM service is down, Back end is sending error of ODM in personalizedOffersResponse, and orderResponse is still available
       * When WCS is down/fails, error is recieved in root of response
       */

      // When WCS is down, (both personalizedOffersResponse and orderResponse are not available), error recieved in root of response
      if (responseContainsErrors(res)) {
        throw new ServiceResponseError(res);
      }

      const responseObj = {};

      // when ODM(enabled)/personalizedOffersResponse is available
      if (
        res.body.personalizedOffersResponse &&
        !responseContainsErrors(res.body.personalizedOffersResponse)
      ) {
        Object.assign(responseObj, {
          personalizedOffersResponse: res.body.personalizedOffersResponse,
        });
      }

      // When orderResponse/BrierleyPointsData is available
      if (res.body.orderResponse) {
        Object.assign(responseObj, { orderResponse: res.body.orderResponse });
      }
      return responseObj;
    })
    .catch(err => {
      throw getFormattedError(err);
    });
}

export default {
  getGiftWrappingOptions,
  getCurrentOrderAndCouponsDetails,
  getShippingMethods,
  briteVerifyStatusExtraction,
  setShippingMethodAndAddressId,
  addPickupPerson,
  addGiftCardPaymentToOrder,
  removeGiftCard,
  addPaymentToOrder,
  updatePaymentOnOrder,
  addGiftWrappingOption,
  removeGiftWrappingOption,
  submitOrder,
  requestPersonalizedCoupons,
};
