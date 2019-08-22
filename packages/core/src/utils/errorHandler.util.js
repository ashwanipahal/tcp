const raygun = require('raygun');

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

const initServerErrorHandler = (envId, raygunApiKey) => {
  const raygunInst = new raygun.Client().init({ apiKey: raygunApiKey });
  raygunInst.setVersion(envId);
  setRaygunInstance(raygunInst);
  const message = `Initializing  ErrorHandler Raygun on Node Server: release = ${envId}`;
  console.log(message);
};

const initWebClientErrorHandler = (envId, raygunApiKey, channelId) => {
  // eslint-disable-next-line global-require
  Promise.all([require('raygun4js')]).then(([rg4js]) => {
    rg4js('enableCrashReporting', true);
    rg4js('apiKey', raygunApiKey);
    rg4js('setVersion', envId);
    rg4js('withCustomData', { channel: channelId });
    setRaygunInstance(rg4js);
    const message = `Initializing  ErrorHandler Raygun on Web Client: release = ${envId} - channelId = ${channelId}`;
    console.log(message);
  });
};

const initErrorHandler = config => {
  const { envId, raygunApiKey, channelId, isServer: isNodeServer, isDevelopment } = config;
  if (isDevelopment || !raygunApiKey) {
    return null;
  }
  if (getRaygunInstance()) {
    return getRaygunInstance();
  }
  if (isNodeServer) {
    initServerErrorHandler(envId, raygunApiKey);
  } else if (!isNodeServer) {
    initWebClientErrorHandler(envId, raygunApiKey, channelId);
  }
  return getRaygunInstance();
};

const trackError = errorArgs => {
  if (!getRaygunInstance()) {
    return;
  }

  const { error } = errorArgs;
  let { tags, extraData } = errorArgs;

  tags = tags || {};
  extraData = extraData || {};

  if (isServer()) {
    getRaygunInstance().send(error, { ...extraData, ...tags }, () => {}, {}, ['node-server-error']);
  } else {
    getRaygunInstance()('send', { error, customData: { ...extraData, ...tags } });
  }
};

const getExpressMiddleware = () => {
  if (getRaygunInstance()) {
    return getRaygunInstance().expressHandler;
  }
  return null;
};

module.exports = {
  initErrorHandler,
  trackError,
  getExpressMiddleware,
};
