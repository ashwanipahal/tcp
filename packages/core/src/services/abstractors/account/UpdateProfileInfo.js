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
  const payload = {
    header: {
      'Content-Type': 'application/json',
    },
    webService: endpoints.updateProfileInfo,
    body: {
      firstName: args.firstName,
      lastName: args.lastName,
      associateId: args.associateId,
      email1: args.email,
      phone1: args.phone,
      currentPassword: args.currentPassword,
      logonPassword: args.newPassword,
      logonPasswordVerify: args.newPasswordVerify,
      status: args.status,
      operation: (args.currentPassword && args.newPassword && 'resetPassword') || '', // If resetPassword backend will validate currentPassword
      userBirthday: args.userBirthday,
    },
  };

  if (args.airmiles) {
    payload.body.customMemberAttributes = [{ airMilesCard: args.airmiles }];
  }

  return executeStatefulAPICall(payload, errorHandler).then(() => {
    return 'successMessage';
  });
};

export default UpdateProfileInfo;
