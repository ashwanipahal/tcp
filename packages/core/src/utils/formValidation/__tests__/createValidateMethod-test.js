import { getErrorMessageLabels } from '../createValidateMethod';

const emailErrorMessage = 'Please enter a valid Email';

describe('getErrorMessageLabels', () => {
  // checking getErrorMessageLabels returns error object with error message coming form CMS
  it('should call getErrorMessageLabels and return error object if props has formErrorMessage object', () => {
    const errors = {
      emailAddress: 'lbl_err_email_req',
    };
    const props = {
      formErrorMessage: {
        lbl_err_email_req: emailErrorMessage,
        lbl_err_prefix: 'ERROR:',
      },
    };
    const expectedErrorObj = {
      emailAddress: `ERROR: ${emailErrorMessage}`,
    };
    expect(getErrorMessageLabels(errors, props)).toStrictEqual(expectedErrorObj);
  });

  // checking getErrorMessageLabels returns error object with error message coming form CMS
  it('should call getErrorMessageLabels and return error object if props has formErrorMessage object', () => {
    const errors = {
      emailAddress: 'lbl_err_email_req',
    };
    const props = {};
    const expectedErrorObj = {
      emailAddress: `ERROR: ${emailErrorMessage}`,
    };
    expect(getErrorMessageLabels(errors, props)).toStrictEqual(expectedErrorObj);
  });
});
