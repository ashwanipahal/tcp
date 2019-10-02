import { executeExternalAPICall } from '../../../handler';
import { API_METHODS } from '../../../api.constants';

/**
 * Abstractor layer for loading Get Candid data
 */
const Abstractor = {
  getData: apiConfig => {
    const { CANDID_API_KEY, CANDID_API_URL } = apiConfig;
    const payload = {
      webService: {
        method: API_METHODS.GET,
        URI: `http://${CANDID_API_URL}/stream/page/?`,
      },
      body: {
        id: CANDID_API_KEY,
        tag: 'gallery',
        // pageSize value needs to be configured. Hardcoded value is a temporary fix.
        pageSize: 40,
        approvalFilter: 'Approved',
        sort: 'Date',
        cache: true,
        page: 0,
        includeTags: true,
      },
    };
    return executeExternalAPICall(payload).then(res => {
      const response = res.body;
      if (!response) {
        throw new Error('Response has errors!');
      }
      return response;
    });
  },
};

export default Abstractor;
