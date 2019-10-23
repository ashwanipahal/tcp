import ExtendableError from 'es6-error';

const GLOBAL_ERROR = '_error';
export const ERRORS = {
  SYSTEM_ERROR: 'Your action could not be completed due to system error',
};

class ServiceError {
  constructor(errorCodes, errorMessages, networkStatusCode, misc) {
    this.errorCodes = errorCodes;
    this.errorMessages = errorMessages;
    this.networkStatusCode = networkStatusCode;
    this.misc = misc;
  }
}

function populateErrorPlaceholder(errMsg, error) {
  let errorMsg = errMsg;
  // eslint-disable-next-line
  const regex = /\$\{([^\}]+)\}/g;
  const matches = errorMsg.match ? errorMsg.match(regex) : null;
  if (matches) {
    matches.forEach(match => {
      // eslint-disable-next-line
      const key = match.replace(/[\$\{\s\}]/g, '');
      errorMsg = errorMsg.replace(match, error[key] || match);
    });
  }
  return errorMsg;
}

export function getDynamicCodeErrorMessage(error, code) {
  const err = error;
  try {
    // eslint-disable-next-line no-underscore-dangle
    err.errorMessages._error = error.errorMessages._error.replace(/<CODE_PLACEHOLDER>/, code);
  } catch (e) {
    console.log(e);
  }
}

function getErrorList(response) {
  return (
    (Array.isArray(response.body.errors) && response.body.errors) ||
    (response.body.error &&
      response.body.error.errorCode && [
        {
          errorCode: response.body.error.errorCode,
          errorKey: response.body.error.errorKey,
          errorMessageKey: response.body.error.errorMessageKey,
          errorMessage: response.body.error.errorMessage,
        },
      ]) || [
      {
        errorCode: response.body.errorCode,
        errorKey: response.body.errorKey,
        errorMessageKey: response.body.errorMessageKey,
        errorMessage: response.body.errorMessage,
      },
    ]
  );
}

export function getFormattedErrorFromResponse(response, ERRORS_MAP, errorsListData = []) {
  let errorsList;
  if (errorsListData.length > 0) {
    errorsList = errorsListData;
  } else {
    errorsList = getErrorList(response);
  }

  let errorCodes = '';
  const errorMessages = {};

  errorsList.forEach(error => {
    const errorKey = error.errorKey || error.errorCode || error.errorMessageKey;
    if (ERRORS_MAP[error.errorKey]) {
      errorMessages[GLOBAL_ERROR] = populateErrorPlaceholder(ERRORS_MAP[error.errorKey], error);
    } else if (ERRORS_MAP[error.errorCode]) {
      errorMessages[GLOBAL_ERROR] = populateErrorPlaceholder(ERRORS_MAP[error.errorCode], error);
      errorMessages.errorParameters = error.errorParameters;
    } else if (ERRORS_MAP[error.errorMessageKey]) {
      errorMessages[GLOBAL_ERROR] = populateErrorPlaceholder(
        ERRORS_MAP[error.errorMessageKey],
        error
      );
    } else {
      // We send the server error as backup in case we don't have the error in our map, but sometimes backend does not have this either so we default it
      errorMessages[GLOBAL_ERROR] = populateErrorPlaceholder(
        error.errorMessage || ERRORS_MAP.DEFAULT,
        error
      );
    }
    errorCodes += (errorCodes ? ', ' : '') + errorKey;
  });

  return new ServiceError(errorCodes, errorMessages, response.status, response.misc);
}

export function getFormattedError(err, errorMapping) {
  return err.response && err.response.body !== null
    ? getFormattedErrorFromResponse(err.response, errorMapping)
    : err;
}

export function responseContainsErrors(response) {
  // Be paranoid and make sure that we can handle a situation where response.body is undefined
  if (!response || !response.body) {
    return false;
  }
  const responseBody = response.body;
  return !!(
    responseBody.errorCode ||
    responseBody.errorMessageKey ||
    responseBody.errorKey ||
    (responseBody.errors && responseBody.errors.length > 0) ||
    (response.body.error && response.body.error.errorCode)
  );
}

export class ServiceResponseError extends ExtendableError {
  constructor(response) {
    super('API service call response with text reporting an error');
    this.response = response;
    this.response.misc = {};
    // Map Backend error response data to a misc object in our error object
    if (response.body && response.body.retriesCount) {
      this.response.misc.failedLoginAttempts = response.body.retriesCount;
    }
  }
}
