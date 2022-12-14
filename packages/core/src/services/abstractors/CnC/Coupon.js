import { SubmissionError } from 'redux-form'; // ES6
import CheckoutConstants from '@tcp/core/src/components/features/CnC/Checkout/Checkout.constants';
import { executeStatefulAPICall } from '../../handler';
import endpoints from '../../endpoints';
import { getFormattedError, getDynamicCodeErrorMessage } from '../../../utils/errorMessage.util';
import { constructCouponStructure } from './CartItemTile';

export const applyCouponToCart = ({ couponCode = '' }, errorsMapping) => {
  const payload = {
    webService: endpoints.addCoupons,
    body: {
      promoCode: couponCode.toUpperCase(),
    },
  };

  const setPlaceCashError = ({ err: errorObj }) => {
    const placeCash = CheckoutConstants.PLACE_CASH;

    const err = errorObj;
    const isPlaceCashError =
      err.response.body &&
      err.response.body.errors &&
      err.response.body.errors[0].errorParameters[1] === placeCash;
    if (isPlaceCashError) {
      err.response.body.errors[0].errorCode = CheckoutConstants.PLACE_CASH_ERROR;
      err.response.body.errors[0].errorKey = CheckoutConstants.PLACE_CASH_ERROR;
    }
    return isPlaceCashError;
  };

  return executeStatefulAPICall(payload, ({ err }) => {
    const isPlaceCashError = setPlaceCashError({ err });
    const error = getFormattedError(err, errorsMapping);
    getDynamicCodeErrorMessage(error, couponCode);

    error.errorMessages = error.errorMessages || { _error: 'Oops... an error occured' };
    const { errorMessages } = error;
    // eslint-disable-next-line
    errorMessages._error = {
      // eslint-disable-next-line
      msg: errorMessages._error,
      isPlaceCashError,
    };
    throw new SubmissionError(error.errorMessages);
  });
};

export const removeCouponOrPromo = ({ couponCode = '' }) => {
  const payload = {
    header: {
      promoCode: couponCode.toUpperCase(),
    },
    webService: endpoints.removeCouponOrPromo,
  };
  return executeStatefulAPICall(payload).then(res => {
    const error = getFormattedError(res);
    if (error) {
      return new SubmissionError(error.errorMessages || { _error: 'Oops... an error occured' });
    }
    return { success: true };
  });
};

export const getAllCoupons = () => {
  const payload = {
    webService: endpoints.getAllOffers,
  };
  return executeStatefulAPICall(payload).then(res => {
    if (res.body && res.body.offers) {
      return constructCouponStructure(res.body.offers);
    }
    throw new Error('There is some error in fetching all coupons');
  });
};

export default {
  applyCouponToCart,
  removeCouponOrPromo,
  getAllCoupons,
};
