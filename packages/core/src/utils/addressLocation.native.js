import { getAPIConfig } from '@tcp/core/src/utils';
import { executeExternalAPICall } from '@tcp/core/src/services/handler';
import constants from '@tcp/core/src/components/features/storeLocator/StoreLanding/container/StoreLanding.constants';

const { GOOGLE_SEARCH_API_ENDPOINT } = constants;

export const getAddressLocationInfo = async address => {
  const googleSearchAPIKey = getAPIConfig().googleApiKey;
  const apiUrl = `${GOOGLE_SEARCH_API_ENDPOINT}${address}&inputtype=textquery&fields=geometry&key=${googleSearchAPIKey}`;

  const payload = {
    webService: {
      URI: apiUrl,
      method: 'GET',
    },
  };

  return executeExternalAPICall(payload).then(res => {
    try {
      const { lat, lng } = res.body.candidates[0].geometry.location;
      return {
        lat,
        lng,
        country: 'US',
      };
    } catch (error) {
      return error;
    }
  });
};

export default getAddressLocationInfo;
