import { executeStatefulAPICall } from '../../handler';
import endpoints from '../../endpoints';

export const claimPoints = payload => {
  const payloadData = {
    body: {
      FirstName: payload.firstName,
      LastName: payload.lastName,
      MyPlaceNumber: payload.myPlaceNumber,
      EmailAddr: payload.email,
      StoreType: payload.wasInStoreTransaction ? 'S' : 'O',
      StoreNumber: payload.wasInStoreTransaction ? payload.storeNumber : '180',
      RegisterNumber: payload.storeRegisterNumber,
      TransNumber: payload.transactionNumber,
      TransDate: payload.transactionDate,
      OrderNum: payload.orderNumber,
    },
    webService: endpoints.claimPoints,
  };
  return executeStatefulAPICall(payloadData)
    .then(res => {
      if (!res) {
        throw new Error('res body is null');
      }
      return res;
    })
    .catch(err => {
      throw err;
    });
};

export default { claimPoints };
