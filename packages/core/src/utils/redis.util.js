const { trackError } = require('./errorReporter.util');

const DEFAULT_CACHE_TIME = 7200;
const DEFAULT_CACHE_EXP_MODIFIER = 'EX';

const noRedisClient = redisClient => !redisClient || (redisClient && !redisClient.ready);

const getDataFromRedis = CACHE_IDENTIFIER => {
  const { redisClient } = global;
  if (noRedisClient(redisClient)) return null;
  return redisClient.get(CACHE_IDENTIFIER);
};

const setDataInRedis = ({
  data,
  CACHE_IDENTIFIER,
  CACHE_EXP_MODIFIER = DEFAULT_CACHE_EXP_MODIFIER,
  CACHE_EXP_TIME = DEFAULT_CACHE_TIME,
}) => {
  const { redisClient } = global;
  if (noRedisClient(redisClient)) return null;
  const cacheExpiryTime = process.env.RWD_WEB_CACHE_EXP_TIME || CACHE_EXP_TIME;
  return redisClient.set(
    CACHE_IDENTIFIER,
    JSON.stringify(data),
    CACHE_EXP_MODIFIER,
    cacheExpiryTime
  );
};

const redisConnectCallback = () => {
  console.log(`Redis(Elasticache) CONNECTED`);
};

const redisErrorCallback = err => {
  trackError({
    error: err,
    errorTags: ['Redis Connection'],
  });
  global.redisClient.quit();
};

const connectRedis = config => {
  // NOTE: This is a server side file only.
  // Incase redis needs to be implemented in mobile app, then a common object needs to be defined and used
  try {
    console.log(`Redis(Elasticache) Endpoint: ${config.REDIS_HOST}:${config.REDIS_PORT}`);
    global.redisClient = config.REDIS_CLIENT.createClient(config.REDIS_PORT, config.REDIS_HOST);

    global.redisClient.on('error', err => {
      redisErrorCallback(err);
    });

    global.redisClient.on('connect', () => {
      redisConnectCallback();
    });
  } catch (e) {
    trackError({
      error: e,
      errorTags: ['Redis Catch'],
    });
    console.log(`Redis(Elasticache) CATCH ERROR: ${e.toString()}`);
  }
};

module.exports = {
  connectRedis,
  getDataFromRedis,
  setDataInRedis,
};
