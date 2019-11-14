import endpoints from '@tcp/core/src/service/endpoint';
import { executeExternalAPICall } from '../../../handler';

const BV_API_KEY = 'e50ab0a9-ac0b-436b-9932-2a74b9486436';

function briteVerifyStatusExtraction(emailAddress) {
  const payload = {
    webService: {
      method: endpoints.emailVerification.method,
      URI: endpoints.emailVerification.URI,
    },
    body: {
      apikey: BV_API_KEY,
      address: emailAddress,
    },
  };
  return executeExternalAPICall(payload).then(res => {
    const response = res.body;
    if (!response) {
      throw new Error('no_response::false:false');
    }
    return `${response.status}::false:false`;
  });
}

export default briteVerifyStatusExtraction;
