import endpoints from '@tcp/core/src/services/endpoints';
import { getAPIConfig } from '@tcp/core/src/utils/utils';
import { executeStatefulAPICall } from '@tcp/core/src/services/handler';

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

/**
 * This is a service method to post survey data.
 * @param {object} args - request payload containing answer1, answer2 values to submit in the backend.
 */
export const submitUserSurvey = args => {
  const apiConfig = getAPIConfig();
  const payload = {
    body: {
      ...args.payload,
      langId: apiConfig.langId,
      catalogId: apiConfig.catalogId,
      storeId: apiConfig.storeId,
    },
    webService: endpoints.updateUserSurvey,
  };

  return executeStatefulAPICall(payload, errorHandler)
    .then(res => {
      const resObj = res.body;
      const answers = [];
      answers[0] = resObj.answer1 ? resObj.answer1.split('|') : [];
      answers[1] = resObj.answer2 ? resObj.answer2.split('|') : [];
      return {
        success: true,
        ...answers,
      };
    })
    .catch(err => {
      throw err;
    });
};

export default { UpdateProfileInfo, submitUserSurvey };
