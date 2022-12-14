import { executeStatefulAPICall } from '../../../handler';
import endpoints from '../../../endpoints';

export const setUserGroup = () => {
  const payload = {
    webService: endpoints.userGroup,
  };

  return executeStatefulAPICall(payload)
    .then(res => {
      return res;
    })
    .catch(err => {
      throw err;
    });
};
export default setUserGroup;
