import { executeStatefulAPICall } from '../../handler';
import endpoints from '../../endpoints';

const getSocialAccountsInformation = () => {
  const payload = {
    webService: endpoints.getSocialAccountsInfo,
  };
  return executeStatefulAPICall(payload)
    .then(res => {
      if (!res.body) {
        throw new Error('res body is null');
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
        throw new Error('res body is null');
        // TODO - Set API Helper to filter if error exists in response
      }
      return response.body || [];
    })
    .catch(err => {
      throw err;
    });
};
export { getSocialAccountsInformation, saveSocialAccountsInfo };
