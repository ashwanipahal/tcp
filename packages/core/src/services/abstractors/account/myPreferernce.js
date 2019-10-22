import { getAPIConfig } from '@tcp/core/src/utils/utils';
import { executeStatefulAPICall } from '../../handler';
import endpoints from '../../endpoints';

export const myPreferenceModalSubmit = (mobileNumber, formData, brand) => {
  const apiConfig = getAPIConfig();
  const bodyData =
    brand === 'gymboree'
      ? { CustomerPreferencesGym: formData, gymSmsPhone: mobileNumber }
      : { CustomerPreferences: formData, smsPhone: mobileNumber };

  const payload = {
    body: bodyData,
    header: {
      'X-Cookie': apiConfig.cookie,
      storeId: apiConfig.storeId,
    },
    webService: endpoints.setContactPreferences,
  };
  return executeStatefulAPICall(payload)
    .then(res => {
      return res.body;
    })
    .catch(err => {
      throw err;
    });
};

export const getUserSubscriptionPreference = () => {
  const apiConfig = getAPIConfig();
  const payload = {
    header: {
      'X-Cookie': apiConfig.cookie,
      storeId: apiConfig.storeId,
    },
    webService: endpoints.getContactPreferences,
  };
  return executeStatefulAPICall(payload)
    .then(res => {
      return res.body;
    })
    .catch(err => {
      throw err;
    });
};
