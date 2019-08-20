import { executeStatefulAPICall } from '../../../handler';
import endpoints from '../../../endpoints';

const errorHandler = err => {
  if (err.response && err.response.body && err.response.body.errors) {
    throw new Error(err.response.body.errors[0].errorMessage);
  }
  throw new Error('Oops... There was an issue, please try again.');
};

export const trackOrderApi = payload => {
  const payloadData = {
    webService: endpoints.orderLookUp,
    header: {
      isRest: true,
      orderId: payload.orderNumber,
      emailId: payload.emailAddress,
    },
  };

  return executeStatefulAPICall(payloadData)
    .then(res => {
      const trackingNumber = res.body.orderLookupResponse.orderDetails.tracking;
      return {
        success: true,
        trackingNumber: trackingNumber === 'N/A' ? null : trackingNumber,
        orderId: res.body.orderLookupResponse.orderDetails.orderId,
        encryptedEmailAddress: encodeURIComponent(res.body.orderLookupResponse.encryptedEmailId),
        pointsEarned: res.body.orderLookupResponse.pointsEarned,
      };
    })
    .catch(errorHandler);
};

export default trackOrderApi;
