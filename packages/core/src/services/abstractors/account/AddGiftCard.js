import { executeStatefulAPICall } from '../../handler';
import endpoints from '../../endpoints';

const errorHandler = err => {
  let error = {};
  if (err instanceof Error) {
    error = err.response.body;
  }
  if (error.errors instanceof Array && error.errors[0].errorMessage) {
    throw error.errors[0].errorMessage;
  }
  throw err;
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
    .catch(errorHandler);
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
  return executeStatefulAPICall(payloadArgs, errorHandler).then(res => {
    return res;
  });
};
