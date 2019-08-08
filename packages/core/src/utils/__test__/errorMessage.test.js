import { getFormattedError, getDynamicCodeErrorMessage } from '../errorMessage.util';

describe('ErrorMessageFormatter test', () => {
  const couponCode = 'AAAA';
  const errorParameters = ['AAAA'];
  const errMsg = '(AAAA) is not applicable ';
  it('getFormattedError', () => {
    const err = {
      original: null,
      response: {
        body: {
          errors: [
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
    expect(getFormattedError(err).toString()).toEqual(
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
});
