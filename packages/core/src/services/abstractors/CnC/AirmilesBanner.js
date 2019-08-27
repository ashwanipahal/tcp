import { executeStatefulAPICall } from '../../handler';
import endpoints from '../../endpoints';

const errorHandler = err => {
  if (err.response && err.response.body && err.response.body.errors) {
    throw new Error(err.response.body.errors[0].errorMessage);
  }
  throw new Error('Your action could not be completed due to system error!!!!');
};

export default function addAirmilesBannerApi(payload) {
  const payloadArgs = {
    webService: endpoints.addAirmilesBanner,
    header: {
      isRest: true,
    },
    body: {
      orderId: payload.orderId,
      promoId: payload.promoId || '',
      cardNumber: payload.cardNumber || '',
    },
  };
  return executeStatefulAPICall(payloadArgs, errorHandler).then(res => {
    return res;
  });
}
