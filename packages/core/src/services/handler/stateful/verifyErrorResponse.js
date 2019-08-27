import { GLOBAL_ERROR, DEFAULT } from './config';

const ERRORS_MAP = require('./errorResponseMapping/index.json');

/**
 * Get the error list
 * @param {Object} response
 * @returns {Array} list of errors
 */
const getErrorList = response => {
  const {
    body: { errorCode, errorKey, errorMessageKey, errorMessage },
  } = response;
  let errorsList = [
    {
      errorCode,
      errorKey,
      errorMessageKey,
      errorMessage,
    },
  ];

  if (Array.isArray(response.body.errors)) {
    errorsList = response.body.errors;
  }
  if (response.body.error && response.body.error.errorCode) {
    const {
      body: {
        error: {
          errorCode: errorCodeValue,
          errorKey: errorKeyValue,
          errorMessageKey: errorMessageKeyValue,
          errorMessage: errorMessageValue,
        },
      },
    } = response;
    errorsList = [
      {
        errorCode: errorCodeValue,
        errorKey: errorKeyValue,
        errorMessageKey: errorMessageKeyValue,
        errorMessage: errorMessageValue,
      },
    ];
  }
  return errorsList;
};

/**
 * Replace placeholder(s) in error message with error object keys' values
 * @param {String} errorMsg
 * @param {Object} error
 * @returns {String} Updated error message
 *
 * e.g. populateErrorPlaceholder('Error: Coupon ${couponErr} is expired' , {couponErr: 'XXXX'})
 * output: Error: Coupon XXXX is expired
 */
const populateErrorPlaceholder = (errMsg, error) => {
  let errorMsg = errMsg;
  /* eslint-disable-next-line no-useless-escape */
  const regex = /\$\{([^\}]+)\}/g; // regex for pattern ${placeholder}
  const matches = errorMsg.match ? errorMsg.match(regex) : null;
  if (matches) {
    matches.forEach(match => {
      /* eslint-disable-next-line no-useless-escape */
      const key = match.replace(/[\$\{\s\}]/g, '');
      errorMsg = errorMsg.replace(match, error[key] || match);
    });
  }

  return errorMsg;
};

/**
 * Get error key from the error object
 * @param {Object} error
 * @returns {String} error key
 */
const getErrorKey = ({ errorKey, errorCode, errorMessageKey }) =>
  errorKey || errorCode || errorMessageKey;

/**
 * Generate errorResponse
 * @param {Object} response
 * @returns {String} errorObject
 */
export const verifyErrorResponse = response => {
  const errorsList = getErrorList(response);

  let errorCode = '';
  const errorMessage = {};

  errorsList.forEach(error => {
    const errorKey = getErrorKey(error);
    if (errorKey) {
      errorMessage[ERRORS_MAP[errorKey].formFieldName || GLOBAL_ERROR] = populateErrorPlaceholder(
        ERRORS_MAP[errorKey].errorMessage,
        error
      );
    } else {
      // send the server error as backup in case we don't have the error in our map
      errorMessage[GLOBAL_ERROR] = populateErrorPlaceholder(
        error.errorMessage || ERRORS_MAP[DEFAULT].errorMessage,
        error
      );
    }
    errorCode += `${errorCode ? ', ' : ''}${errorKey || ''}`;
  });

  return {
    errorCode,
    errorMessage,
    networkStatusCode: response.status,
    misc: response.misc,
  };
};

export default verifyErrorResponse;
