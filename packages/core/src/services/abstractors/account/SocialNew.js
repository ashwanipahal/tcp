import { getAPIConfig } from '@tcp/core/src/utils';
import { executeStatefulAPICall } from '../../handler';
import endpoints from '../../endpoints';

const errorMsg = 'res body is null';

const getSocialAccountsInformation = () => {
  const payload = {
    webService: endpoints.getSocialAccountsInfo,
  };
  return executeStatefulAPICall(payload)
    .then(res => {
      if (!res.body) {
        throw new Error(errorMsg);
        // TODO - Set API Helper to filter if error exists in response
      }
      return res.body || [];
    })
    .catch(err => {
      throw err;
    });
};

const saveSocialAccountsInfo = arg => {
  const payload = {
    body: {
      [arg.accountName]: {
        accessToken: arg.token,
        userId: arg.userId,
      },
    },
    webService: endpoints.saveSocialAccountsInfo,
  };

  return executeStatefulAPICall(payload)
    .then(response => {
      if (!response.body) {
        throw new Error(errorMsg);
        // TODO - Set API Helper to filter if error exists in response
      }
      return response.body || [];
    })
    .catch(err => {
      throw err;
    });
};

/**
 * @param {string} code - The code from mule response on instagram API
 * @param {string} redirectUrl - The redirection URL after success from instagram
 */
const getInstagramAccessToken = ({ code, redirectUrl }) => {
  const apiConfig = getAPIConfig();
  const payload = {
    header: {
      storeId: apiConfig.storeId,
      code,
      redirectUrl,
    },
    webService: endpoints.getInstagramAccessToken,
  };

  return executeStatefulAPICall(payload)
    .then(response => {
      if (!response.body) {
        throw new Error(errorMsg);
        // TODO - Set API Helper to filter if error exists in response
      }
      return response.body;
    })
    .catch(err => {
      throw err;
    });
};

export { getSocialAccountsInformation, saveSocialAccountsInfo, getInstagramAccessToken };
