import { executeStatefulAPICall } from '../../handler';
import endpoints from '../../endpoints';

export const getGiftCardBalanceApi = payload => {
  const payloadData = {
    webService: endpoints.getGifCardBalance,
    body: {
      'recapture-response': payload.formData.recaptchaToken || '',
      creditCardId: payload.card.creditCardId.toString(),
    },
  };
  return executeStatefulAPICall(payloadData).then(res => {
    if (!res) {
      throw new Error('res body is null');
      // TODO - Set API Helper to filter if error exists in response
    }
    return res || [];
  });
};

export default {
  getGiftCardBalanceApi,
};
