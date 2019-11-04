// We should utilise the web file only and make it common for both web and app
// Making this mock file till the time we implement raygun in mobile app as well..
import logger from '@tcp/core/src/utils/loggerInstance.native';

let raygunInstance = null;

const setRaygunInstance = instance => {
  raygunInstance = instance;
  return instance;
};

const getRaygunInstance = () => {
  return raygunInstance;
};

const initAppErrorReporter = config => {
  const { envId, raygunApiKey, appType, isDevelopment } = config;
  if (isDevelopment || !raygunApiKey) {
    return null;
  }
  if (getRaygunInstance()) {
    return getRaygunInstance();
  }
  // eslint-disable-next-line global-require
  Promise.all([require('raygun4js')]).then(([rg4js]) => {
    rg4js('enableCrashReporting', true);
    rg4js('apiKey', raygunApiKey);
    rg4js('setVersion', envId);
    rg4js('withCustomData', { brand: appType });
    setRaygunInstance(rg4js);
    rg4js('boot');
    const message = `Initializing  ErrorReporter Raygun on App: release = ${envId} - appType = ${appType}`;
    logger.error(message);
  });
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

  getRaygunInstance()('send', { error, tags: errorTags, customData: { ...extraData } });
  logger.error(error);
};

module.exports = {
  trackError,
  initAppErrorReporter,
};
