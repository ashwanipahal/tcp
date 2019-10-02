import { executeStatefulAPICall } from '../../handler';
import endpoints from '../../endpoints';

const getFormattedData = res => {
  const {
    userState,
    venmoCustomerIdAvailable,
    venmoIsDefaultPaymentType,
    venmoPaymentTokenAvailable,
    venmoSecurityToken,
  } = res;
  return {
    venmoClientTokenData: {
      userState,
      venmoCustomerIdAvailable,
      venmoIsDefaultPaymentType,
      venmoPaymentTokenAvailable,
      venmoSecurityToken,
    },
  };
};

export const getVenmoToken = ({ userState, orderId }) => {
  const payload = {
    header: {
      orderId,
      userState,
    },
    webService: endpoints.getVenmoClientToken,
  };
  return executeStatefulAPICall(payload)
    .then(res => {
      const massagedData = getFormattedData(res.body);
      return massagedData || {};
    })
    .catch(err => {
      throw err;
    });
};
export default getVenmoToken;
