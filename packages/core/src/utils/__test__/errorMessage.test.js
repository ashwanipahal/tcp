import {
  getFormattedError,
  getDynamicCodeErrorMessage,
  responseContainsErrors,
  ServiceResponseError,
} from '../errorMessage.util';

describe('ErrorMessageFormatter test', () => {
  const couponCode = 'AAAA';
  const errorParameters = ['AAAA'];
  const errMsg = '(AAAA) is not applicable ';
  it('getFormattedError', () => {
    const err = {
      original: null,
      response: {
        body: {
          error: [
            {
              errorCode: '_CODE_NOT_APPLICABLE',
              errorKey: errMsg,
              errorMessage: errMsg,
              errorParameters,
            },
          ],
        },
      },
      status: 400,
    };
    expect(getFormattedError(err, { DEFAULT: 'oops error occured' }).toString()).toEqual(
      {
        errorCodes: errMsg,
        errorMessages: {
          _error:
            'Coupon is not applicable. Note: If you are applying a My Place Rewards Credit card coupon, coupon will not apply until your card has been entered at checkout.',
          errorParameters,
        },
        misc: undefined,
        networkStatusCode: undefined,
      }.toString()
    );
  });

  it('getDynamicCodeErrorMessage', () => {
    const errorMessage =
      ' Coupon is not applicable. Note: If you are applying a My Place Rewards Credit card coupon, coupon will not apply until your card has been entered at checkout.';
    const error = {
      errorMessages: {
        _error: `<CODE_PLACEHOLDER>${errorMessage}`,
        errorParameters,
      },
      networkStatusCode: undefined,
    };
    getDynamicCodeErrorMessage(error, couponCode);
    // eslint-disable-next-line
    expect(error.errorMessages._error).toEqual(couponCode + errorMessage);
  });

  it('responseContainsErrors', () => {
    expect(responseContainsErrors()).toEqual(false);
    expect(responseContainsErrors({ body: { errorCode: '123' } })).toEqual(true);
    expect(responseContainsErrors({ body: { errorMessageKey: '123' } })).toEqual(true);
    expect(responseContainsErrors({ body: { errorKey: '123' } })).toEqual(true);
    expect(responseContainsErrors({ body: { errors: [1] } })).toEqual(true);
    expect(responseContainsErrors({ body: { error: { errorCode: '123' } } })).toEqual(true);
  });

  it('ServiceResponseError', () => {
    const response = { body: { retriesCount: {} } };
    const error = new ServiceResponseError(response);
    expect(JSON.stringify(error)).toEqual(
      JSON.stringify({
        response: {
          ...response,
          misc: {
            failedLoginAttempts: {},
          },
        },
      })
    );
  });
});
