import { executeStatefulAPICall } from '../../handler';
import endpoints from '../../endpoints';
import { getAPIConfig } from '../../../utils';

export const forgotPassword = args => {
  const apiConfig = getAPIConfig();
  const payload = {
    webService: endpoints.requestPassword,
    body: {
      langId: apiConfig.langId,
      catalogId: apiConfig.catalogId,
      storeId: apiConfig.storeId,
      ...args,
    },
  };
  return executeStatefulAPICall(payload).then(res => {
    if (!res.body) {
      throw new Error('res body is null');
      // TODO - Set API Helper to filter if error exists in response
    }
    return res.body.contact || [];
  });
};

export default {
  forgotPassword,
};
