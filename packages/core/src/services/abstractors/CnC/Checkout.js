/* eslint-disable extra-rules/no-commented-out-code */
import { executeStatefulAPICall } from '../../handler';
import endpoints from '../../endpoints';
import { getCurrentOrderFormatter } from './CartItemTile';
import { responseContainsErrors, ServiceResponseError } from '../../../utils/errorMessage.util';

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

export const getShippingMethods = (state, zipCode, addressLine1, addressLine2) => {
  // Note: (2-25, From Melvin Jose): based on his request we're relaxing when state and zipcode is being attached to the header, should values be empty or null we won't be sending them.
  // if (this.activeGetShippingMethodsRequest && this.activeGetShippingMethodsRequest.abort) {
  //   this.activeGetShippingMethodsRequest.abort();
  // }

  // Note: (2-25, From Melvin Jose): based on his request we're relaxing when state and zipcode is being attached to the header, should values be empty or null we won't be sending them.
  const dynamicHeader = { state, zipCode, addressLine1, addressLine2 };
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
      throw this.apiHelper.getFormattedError(err);
    });
};

export default {
  getGiftWrappingOptions,
  getCurrentOrderAndCouponsDetails,
  getShippingMethods,
};
