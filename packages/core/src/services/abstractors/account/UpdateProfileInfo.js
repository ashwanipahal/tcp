import endpoints from '@tcp/core/src/services/endpoints';
import { getAPIConfig } from '@tcp/core/src/utils/utils';
import { executeStatefulAPICall } from '@tcp/core/src/services/handler';
import { ERRORS } from '@tcp/core/src/utils/errorMessage.util';

const getFormattedError = err => {
  if (err.response && err.response.body) {
    return err.response.body.errors[0]
      ? err.response.body.errors[0].errorKey
      : err.response.body.errorKey;
  }
  return 'genericError';
};

/**
 * This method is used to extract error message from the response
 * @param {object} err - Error response object
 */
export const errorHandler = err => {
  if (err.response && err.response.body && err.response.body.errors) {
    throw getFormattedError(err);
  } else if (err && err.err && err.err.errorMessage) {
    // eslint-disable-next-line no-underscore-dangle
    throw err.err.errorMessage._error;
  }
  throw new Error(ERRORS.SYSTEM_ERROR);
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

  return executeStatefulAPICall(payload)
    .then(() => {
      return 'successMessage';
    })
    .catch(err => {
      throw err;
    });
};

/**
 * @function getChildren
 * @summary this function will make an API call to fetch children's birthday information
 */
export const getChildren = () => {
  const payload = {
    webService: endpoints.getChildren,
  };

  return executeStatefulAPICall(payload)
    .then(res => {
      // We are doing parseInt(child.childBirthdayMonth).toString() beacuse we use this value to index a table and backend can send it with a leading Zero like 02
      return res.body.childBirthdayInfo.map(
        ({ childName, childBirthdayYear, childBirthdayMonth, childGender, childId }) => ({
          name: childName,
          birthYear: childBirthdayYear,
          birthMonth: parseInt(childBirthdayMonth, 10).toString(),
          gender: childGender,
          childId,
        })
      );
    })
    .catch(err => {
      throw err;
    });
};

/**
 * @function deleteChild
 * @summary
 * @param {type} paramName -
 * @return TDB
 */
export const deleteChild = args => {
  const d = new Date();
  const payload = {
    body: {
      firstName: args.parentFirstName,
      lastName: args.parentLastName,
      timestamp: `${d.getFullYear()}-${d.getMonth()}-${d.getDate()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}.${d.getMilliseconds()}`,
      childDetails: [
        {
          childId: args.childId,
          childName: args.childName,
          birthMonth: args.birthMonth,
          birthYear: args.birthYear,
          gender: args.gender,
        },
      ],
    },
    webService: endpoints.deleteChild,
  };

  return executeStatefulAPICall(payload)
    .then(res => res.body)
    .catch(err => {
      throw err;
    });
};

/**
 * @function add child birthday
 * @summary
 * @param {type} paramName -
 * @return TDB
 */
export const addChildBirthday = args => {
  const d = new Date();
  const payload = {
    body: {
      firstName: args.firstName,
      lastName: args.lastName,
      timestamp: `${d.getFullYear()}-${d.getMonth()}-${d.getDate()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}.${d.getMilliseconds()}`,
      childDetails: [
        {
          childName: args.childName,
          birthMonth: args.userBirthMonth,
          birthYear: args.userBirthYear,
          gender: args.gender,
        },
      ],
    },
    webService: endpoints.addChild,
  };

  return executeStatefulAPICall(payload)
    .then(res => res.body)
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
