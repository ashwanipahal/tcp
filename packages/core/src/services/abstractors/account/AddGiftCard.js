import { executeStatefulAPICall } from '../../handler';
import endpoints from '../../endpoints';

const executeApiCall = payload => {
  return executeStatefulAPICall(payload).then(res => {
    if (!res) {
      throw new Error('res body is null');
    }
    return res || [];
  });
};
export const getCardListApi = payload => {
  const payloadData = {
    webService: endpoints.getCardList,
    payload,
  };
  executeApiCall(payloadData);
};

export const addGiftCardApi = args => {
  const payloadArgs = {
    webService: endpoints.addGiftCard,
    payload: args,
  };
  executeApiCall(payloadArgs);
};
