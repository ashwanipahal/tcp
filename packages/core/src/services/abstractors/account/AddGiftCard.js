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
export const getCardListApi = () => {
  const payloadData = {
    webService: endpoints.getCardList,
    header: {
      isRest: true,
    },
  };
  return executeApiCall(payloadData);
};

export const addGiftCardApi = args => {
  const payloadArgs = {
    webService: endpoints.addGiftCard,
    payload: args,
  };
  return executeApiCall(payloadArgs);
};
