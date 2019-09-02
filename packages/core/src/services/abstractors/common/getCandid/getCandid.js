import { executeExternalAPICall } from '../../../handler';
import { getAPIConfig } from '../../../../utils';

/**
 * Abstractor layer for loading Get Candid data
 */
const Abstractor = {
  getData: () => {
    const { CANDID_API_KEY, CANDID_API_URL } = getAPIConfig();
    console.log('CANDID_API_KEY', CANDID_API_KEY);
    console.log('CANDID_API_URL', CANDID_API_URL);
    const payload = {
      webService: `http://${CANDID_API_URL}/stream/page/`,
      body: {
        id: CANDID_API_KEY,
        tag: 'gallery',
        pageSize: 9,
        approvalFilter: 'Approved',
        sort: 'Date',
        cache: true,
        page: 0,
      },
    };
    return executeExternalAPICall(payload)
      .then(Abstractor.processData)
      .catch(Abstractor.handleError);
  },
  processData: data => data,
  // eslint-disable-next-line no-console
  handleError: e => console.log(e),
};
export default Abstractor;
