import { executeStatefulAPICall } from '../../handler';
import endpoints from '../../endpoints';

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
