import { SubmissionError } from 'redux-form'; // ES6
import { executeStatefulAPICall } from '../../handler';
import endpoints from '../../endpoints';
import { getFormattedError, getDynamicCodeErrorMessage } from '../../../utils/errorMessage.util';

export const applyCouponToCart = ({ couponCode = '' }) => {
  const payload = {
    webService: endpoints.addCoupons,
    body: {
      promoCode: couponCode.toUpperCase(),
    },
  };

  return executeStatefulAPICall(payload, err => {
    const error = getFormattedError(err);
    getDynamicCodeErrorMessage(error, couponCode);
    const placeCash = 'PC';
    error.errorMessages = error.errorMessages || { _error: 'Oops... an error occured' };
    const { errorMessages } = error;
    // eslint-disable-next-line
    errorMessages._error = {
      // eslint-disable-next-line
      msg: errorMessages._error,
      redemptionType:
        errorMessages.errorParameters &&
        errorMessages.errorParameters[1] &&
        errorMessages.errorParameters[1] === placeCash &&
        placeCash,
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

export default {
  applyCouponToCart,
  removeCouponOrPromo,
};
