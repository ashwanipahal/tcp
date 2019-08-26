/* eslint-disable extra-rules/no-commented-out-code */
import { executeStatefulAPICall } from '../../handler';
import endpoints from '../../endpoints';
import { getCurrentOrderFormatter } from './CartItemTile';
import { getAPIConfig } from '../../../utils';

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
      console.log(err);
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

export default {
  getGiftWrappingOptions,
  getCurrentOrderAndCouponsDetails,
  addPickupPerson,
};
