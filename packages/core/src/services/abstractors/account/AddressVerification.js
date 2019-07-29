import { executeExternalAPICall } from '../../handler';
import { getAPIConfig } from '../../../utils';
import endpoints from '../../endpoints';

const getSuggestedAddress = (response, userAddress) => {
  const suggestedAddress = response.Records[0];
  return Object.assign({}, userAddress, {
    address1: suggestedAddress.AddressLine1,
    address2: suggestedAddress.AddressLine2,
    city: suggestedAddress.City,
    state: suggestedAddress.State,
    zip: suggestedAddress.PostalCode,
    isCommercialAddress: suggestedAddress.DeliveryIndicator === 'B',
  });
};

export const getResultType = response => {
  const result = response.Records[0].Results.split(',');

  if (result.length === 1 && result[0] === 'AS01') {
    return 'AS01';
  }

  if (result[0] === 'AE09') {
    return 'AE09';
  }

  if (result.length === 1 && result[0] === 'AE10') {
    return 'AE10';
  }

  if (result.indexOf('AE11') > -1) {
    return 'AE11';
  }

  if (result.indexOf('AE12') > -1) {
    return 'AE12';
  }

  return 'DEFAULT';
};

export const verifyAddressData = addressData => {
  const apiConfig = getAPIConfig();
  const addressQuery = {
    a1: addressData.address1,
    a2: addressData.address2 || '',
    city: addressData.city,
    state: addressData.state,
    postal: addressData.zip,
    ctry: addressData.country,
  };
  const payload = {
    webService: endpoints.verifyAddress,
    body: {
      id: apiConfig.MELISSA_KEY,
      format: 'json',
      act: 'Check',
      cols: 'Plus4,DeliveryIndicator',
      ...addressQuery,
    },
  };
  return executeExternalAPICall(payload).then(res => {
    const response = res.body;
    if (!response) {
      throw new Error('res body is null');
      // TODO - Set API Helper to filter if error exists in response
    }
    if (!response.Records) {
      throw new Error('records are null');
      // TODO - Set API Helper to filter if error exists in response
    }
    const suggestedAddress = getSuggestedAddress(response, addressData);
    const resultType = getResultType(response);
    return { suggestedAddress, resultType };
  });
};

export default {
  verifyAddressData,
};
