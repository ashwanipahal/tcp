import { executeStatefulAPICall } from '../../handler';
import endpoints from '../../endpoints';

export const LogoutApplication = () => {
  const payloadData = {
    webService: endpoints.logout,
  };
  return executeStatefulAPICall(payloadData).then(res => {
    if (!res) {
      throw new Error('res body is null');
      // TODO - Set API Helper to filter if error exists in response
    }
    return res;
  });
};

export default { LogoutApplication };
