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
  throw err.response && err.response.body !== null ? getFormattedError(err) : 'genericError';
};

/**
 * @function UpdateProfileInfo
 * @summary
 * @param {type} paramName -
 * @return TDB
 */

export const UpdateProfileInfo = args => {
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

export const getChildren = () => {
  const payload = {
    webService: endpoints.getChildren,
  };

  return executeStatefulAPICall(payload)
    .then(res => {
      // We are doing parseInt(child.childBirthdayMonth).toString() beacuse we use this value to index a table and backend can send it with a leading Zero like 02
      return res.body.childBirthdayInfo.map(child => ({
        name: child.childName,
        birthYear: child.childBirthdayYear,
        birthMonth: parseInt(child.childBirthdayMonth, 10).toString(),
        gender: child.childGender,
        childId: child.childId,
      }));
    })
    .catch(err => {
      throw err;
    });
};

export default UpdateProfileInfo;
