import { verifyErrorResponse } from '../stateful/verifyErrorResponse';

describe('', () => {
  it('service handler | fetchDataFromGraphQL', () => {
    const response = {
      body: {
        errors: [],
        error: {
          errorCode: '400',
          errorKey: 'TCPGC06',
        },
      },
    };
    verifyErrorResponse(response);
  });
});
