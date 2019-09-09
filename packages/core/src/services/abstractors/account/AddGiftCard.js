import { executeStatefulAPICall } from '../../handler';
import endpoints from '../../endpoints';

const errorHandler = err => {
  if (err.response && err.response.body && err.response.body.errors) {
    throw new Error(err.response.body.errors[0].errorMessage);
  }
  throw new Error('Your action could not be completed due to system error!!!!');
};

export const getCardListApi = () => {
  const payloadData = {
    webService: endpoints.getCardList,
    header: {
      isRest: true,
    },
  };
  return executeStatefulAPICall(payloadData)
    .then(res => {
      return res;
    })
    .catch(err => {
      throw err;
    });
};

export const addGiftCardApi = payload => {
  const payloadArgs = {
    webService: endpoints.addGiftCard,
    header: {
      isRest: true,
    },
    body: {
      cc_brand: 'GC',
      payMethodId: 'GiftCard',
      account_pin: payload.cardPin,
      pay_account: payload.giftCardNumber,
      recapchaResponse: payload.recaptchaToken,
    },
  };
  return executeStatefulAPICall(payloadArgs)
    .then(res => {
      return res;
    })
    .catch(err => {
      throw err;
    });
};
