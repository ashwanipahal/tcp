/* eslint-disable extra-rules/no-commented-out-code */
import superagent from 'superagent';
import logger from '@tcp/core/src/utils/loggerInstance';
import jsonp from 'superagent-jsonp';
import { executeStatefulAPICall } from '../../handler';
import endpoints from '../../endpoints';
import { getCurrentOrderFormatter } from './CartItemTile';
import {
  responseContainsErrors,
  ServiceResponseError,
  getFormattedError,
} from '../../../utils/errorMessage.util';
import { getAPIConfig } from '../../../utils';
import CheckoutConstants from '../../../components/features/CnC/Checkout/Checkout.constants';

const BV_API_KEY = 'e50ab0a9-ac0b-436b-9932-2a74b9486436';

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

    if (price) {
      displayName = displayName.replace(`$${price[1]}`, '');
    }

    hasDefault = hasDefault || methods[index].defaultShipMode;
    return {
      id: methods[index].shipModeId,
      displayName: (displayName || '').trim(), // return anything until $ sign is being matched
      shippingSpeed: (shippingMethod || '').trim(), // whichever value using 'price' as anchor
      price: price ? parseInt(price[1], 10) : 0,
      isDefault: methods[index].defaultShipMode,
    };
  });

  if (!hasDefault && methods.length) {
    resFiltered[0].isDefault = true;
  }

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
    if (!dynamicHeader[key]) {
      delete dynamicHeader[key];
    }
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
  return executeStatefulAPICall(payload).then(res => {
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
};
