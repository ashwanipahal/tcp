const raygun = require('raygun');
const logger = require('@tcp/core/src/utils/loggerInstance');

/**
 * Creates the error logger for the application
 * @returns {object} configuration to log error scenarios
 */
let raygunInstance = null;

const isServer = () => {
  return typeof window === 'undefined';
};

const setRaygunInstance = instance => {
  if (isServer()) {
    global.raygunInstance = instance;
    return instance;
  }
  raygunInstance = instance;
  return instance;
};

const getRaygunInstance = () => {
  if (isServer()) {
    return global.raygunInstance;
  }
  return raygunInstance;
};

const initServerErrorReporter = (envId, raygunApiKey) => {
  const raygunInst = new raygun.Client().init({ apiKey: raygunApiKey });
  raygunInst.setVersion(envId);
  setRaygunInstance(raygunInst);
  const message = `Initializing  ErrorReporter Raygun on Node Server: release = ${envId}`;
  logger.error(message);
};

const initWebClientErrorReporter = (envId, raygunApiKey, channelId, rg4js) => {
  if (rg4js && typeof rg4js === 'function') {
    rg4js('enableCrashReporting', true);
    rg4js('apiKey', raygunApiKey);
    rg4js('setVersion', envId);
    rg4js('withCustomData', { channel: channelId });
    setRaygunInstance(rg4js);
    const message = `Initializing  ErrorReporter Raygun on Web Client: release = ${envId} - channelId = ${channelId}`;
    logger.error(message);
  }
};

const initErrorReporter = config => {
  const { envId, raygunApiKey, channelId, isServer: isNodeServer, isDevelopment, rg4js } = config;
  if (isDevelopment || !raygunApiKey) {
    return null;
  }
  if (getRaygunInstance()) {
    return getRaygunInstance();
  }
  if (isNodeServer) {
    initServerErrorReporter(envId, raygunApiKey);
  } else {
    initWebClientErrorReporter(envId, raygunApiKey, channelId, rg4js);
  }
  return getRaygunInstance();
};

const trackError = errorArgs => {
  if (!getRaygunInstance()) {
    return;
  }

  const { error } = errorArgs;
  let { errorTags, extraData } = errorArgs;

  errorTags = errorTags || [];

  extraData = extraData || {};

  if (isServer()) {
    getRaygunInstance().send(error, { ...extraData }, () => {}, {}, [
      'node-server-error',
      ...errorTags,
    ]);
  } else {
    getRaygunInstance()('send', { error, tags: errorTags, customData: { ...extraData } });
  }
};

const getExpressMiddleware = () => {
  if (getRaygunInstance()) {
    return getRaygunInstance().expressHandler;
  }
  return null;
};

module.exports = {
  initErrorReporter,
  trackError,
  getExpressMiddleware,
};
