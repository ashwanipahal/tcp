import { executeStatefulAPICall } from '../../../handler';
import endpoints from '../../../endpoints';

/**
 * @function errorHandler function to handle all the server side errors.
 * @param {object} err - error object in case server side data send server side validation errors.
 * @returns {object} error object with appropirate error message
 */
const errorHandler = err => {
  if (err && err.errorResponse && err.errorResponse.errorMessage) {
    throw new Error(err.errorResponse.errorMessage);
  }
  throw new Error('genericError');
};

/**
 * @function trackOrderApi - Used as abstract layer to do all server request and recieve the track order info.
 * @param {object} payload - data required to make server request.
 * @returns {object} success response or error response.
 */
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
      const trackingNumber =
        res && res.body && res.body.orderLookupResponse
          ? res.body.orderLookupResponse.orderDetails.tracking
          : null;
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
