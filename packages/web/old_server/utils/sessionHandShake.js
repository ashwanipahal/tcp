/* eslint-disable */

const axios = require('axios');
const { HANDSHAKE_URL, SESSION_API_URL } = require('./../config/appConfig');
const { RESPONSE_INTERNAL_SERVER_ERROR } = require('../../isomorphic/constants');

/**
 * Method to make the session heartbeat call for every page request to
 * make sure there is no session ID duplication at the backend layer
 *
 * @param {Object} req Request object from incoming page request
 */
const handShakeCall = async req => {
  const start = Date.now();
  let response = {};
  let details;
  let responseStatus;
  // To be removed
  req.perfLogger.log('error', `[PERFLOG] Cookies Received: ${req.headers.cookie}`);

  try {
    response = await axios({
      url: `${process.env.MOCK_API_DOMAIN}${SESSION_API_URL}`, // HANDSHAKE_URL
      timeout: +process.env.API_TIMEOUT,
      // headers: req.headers,
    });
    details = response.data;
    responseStatus = response.status;
  } catch (err) {
    responseStatus = RESPONSE_INTERNAL_SERVER_ERROR;
  }

  req.perfLogger.log(
    'error',
    `[PERFLOG] Status: ${responseStatus} Method: GET URL: ${HANDSHAKE_URL} Elapsed Time: ${Date.now() -
      start}ms`
  );
  const cookieList = response.headers ? response.headers['set-cookie'] : []; // eslint-disable-line no-underscore-dangle

  // Set sessionInfo details in req to be accessible in getInitialProps
  req.sessionInfo = details;

  req.perfLogger.log('error', `[PERFLOG] Cookies sent: ${JSON.stringify(cookieList, null, 2)}`);
  return {
    status: responseStatus,
    cookieList,
    details,
  };
};

module.exports = { handShakeCall };
