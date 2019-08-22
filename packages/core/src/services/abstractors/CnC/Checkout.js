import { SubmissionError } from 'redux-form'; // ES6
import { executeStatefulAPICall } from '../../handler';
import endpoints from '../../endpoints';
import { getFormattedError, getDynamicCodeErrorMessage } from '../../../utils/errorMessage.util';
import { constructCouponStructure, getCurrentOrderFormatter } from './CartItemTile';

export const getGiftWrappingOptions = () => {
  console.log('getGiftWrappingOptions');
  const payload = {
    webService: endpoints.giftOptionsCmd,
  };

  return executeStatefulAPICall(payload)
    .then(res => {
      // if (responseContainsErrors(res)) {
      //   throw new ServiceResponseError(res);
      // }
      //     let filteredRes = [];
      // // eslint-disable-next-line array-callback-return
      //     Object.keys(res.body.giftOptions).map((index) => {
      //       filteredRes.push({
      //         id: res.body.giftOptions[index].catEntryId,
      //         displayName: res.body.giftOptions[index].name.split(':')[0],
      //         price: flatCurrencyToCents(res.body.giftOptions[index].price),
      //         shortDescription: res.body.giftOptions[index].longDescription
      //       });
      //     });
      //     return filteredRes;
    })
    .catch(err => {
      // throw getFormattedError(err);
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
  console.log('getCurrentOrderAndCouponsDetails');
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

  return executeStatefulAPICall(payload)
    .then(res => {
      // if (this.apiHelper.responseContainsErrors(res)) {
      //   throw new ServiceResponseError(res);
      // }

      //If recalculate is true in the header of the request and the response is success,
      //Set the time when the recalculated order points have been updated.
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
    })
    .catch(err => {
      // throw this.apiHelper.getFormattedError(err);
    });
};

export default {
  getGiftWrappingOptions,
  getCurrentOrderAndCouponsDetails,
};
