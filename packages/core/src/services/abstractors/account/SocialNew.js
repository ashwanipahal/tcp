import { executeStatefulAPICall } from '../../handler';
import endpoints from '../../endpoints';
import { getAPIConfig } from '../../../utils';

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
    .then(res => {
      if (!res.body) {
        throw new Error('res body is null');
        // TODO - Set API Helper to filter if error exists in response
      }
      return res || [];
    })
    .catch(err => {
      throw err;
    });
};
export { getSocialAccountsInformation, saveSocialAccountsInfo };
