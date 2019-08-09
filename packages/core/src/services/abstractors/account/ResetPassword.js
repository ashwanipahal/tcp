import { executeStatefulAPICall } from '../../handler';
import { getAPIConfig } from '../../../utils';
import endpoints from '../../endpoints';

const getFormattedError = err => {
  if (err.response && err.response.body && err.response.body.errors instanceof Array) {
    return err.response.body.errors[0].errorKey;
  }
  return 'genericError';
};

const errorHandler = err => {
  throw getFormattedError(err);
};

export const resetPassword = ({ newPassword, logonPasswordVerify, logonPasswordOld, em }) => {
  const apiConfig = getAPIConfig();

  const payload = {
    webService: endpoints.resetPassword,
    body: {
      storeId: apiConfig.storeId,
      catalogId: apiConfig.catalogId,
      langId: apiConfig.langId,
      logonPassword: newPassword,
      logonPasswordVerify,
      logonPasswordOld: (logonPasswordOld || '').replace(/ /gi, '+'),
      logonId: (em || '').trim(),
      logonIdInput: (em || '').trim(),
      stat: 'passwdconfirm',
      URL: 'ResetPasswordForm',
      formFlag: 'false', // if this is true the user will get an email
      errorViewName: 'ResetPasswordGuestErrorView',
      checkEmailAddress: '-',
      reLogonURL: 'ChangePassword',
      Relogon: 'Update',
      fromOrderId: '*',
      toOrderId: '.',
      deleteIfEmpty: '*',
      continue: '1',
      createIfEmpty: '1',
      calculationUsageId: '-1',
      updatePrices: '0',
      myAcctMain: '1',
      isPasswordReset: 'false',
    },
  };
  return executeStatefulAPICall(payload, errorHandler).then(() => {
    return 'successMessage';
  });
};

export default resetPassword;
