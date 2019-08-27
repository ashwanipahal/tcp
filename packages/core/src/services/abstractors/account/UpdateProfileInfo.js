import { executeStatefulAPICall } from '../../handler';
import endpoints from '../../endpoints';

const getFormattedError = err => {
  if (err.response && err.response.body) {
    return err.response.body.errors[0]
      ? err.response.body.errors[0].errorKey
      : err.response.body.errorKey;
  }
  return 'genericError';
};

export const errorHandler = err => {
  throw err.response && err.response.body !== null ? getFormattedError(err) : err.errorCode;
};

/**
 * @function UpdateProfileInfo
 * @summary
 * @param {type} paramName -
 * @return TDB
 */

export const UpdateProfileInfo = args => {
  console.log('testing---------------------------');
  console.log(args);
  console.log('testing---------------------------');

  const {
    firstName,
    lastName,
    associateId,
    email,
    phone,
    currentPassword,
    newPassword,
    newPasswordVerify,
    status,
    userBirthday,
    airmiles,
  } = args;
  const payload = {
    webService: endpoints.updateProfileInfo,
    body: {
      firstName,
      lastName,
      associateId,
      email1: email,
      phone1: phone,
      currentPassword,
      logonPassword: newPassword,
      logonPasswordVerify: newPasswordVerify,
      status,
      operation: (currentPassword && newPassword && 'resetPassword') || '', // If resetPassword backend will validate currentPassword
      userBirthday,
    },
  };

  if (airmiles) {
    payload.body.customMemberAttributes = [{ airMilesCard: airmiles }];
  }

  return executeStatefulAPICall(payload, errorHandler).then(() => {
    return 'successMessage';
  });
};

export default UpdateProfileInfo;
