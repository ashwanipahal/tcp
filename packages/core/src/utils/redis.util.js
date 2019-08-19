const noRedisClient = redisClient => !redisClient.ready;

const getDataFromRedis = CACHE_IDENTIFIER => {
  const { redisClient } = global;
  if (noRedisClient(redisClient)) return null;
  return redisClient.get(CACHE_IDENTIFIER);
};

const setDataInRedis = ({ data, CACHE_IDENTIFIER, CACHE_EXP_MODIFIER, CACHE_EXP_TIME }) => {
  const { redisClient } = global;
  if (noRedisClient(redisClient)) return null;
  return redisClient.set(
    CACHE_IDENTIFIER,
    JSON.stringify(data),
    CACHE_EXP_MODIFIER,
    CACHE_EXP_TIME
  );
};

const redisConnectCallback = () => {
  console.log('Successfully connected to Redis(Elasticache)');
  // TODO - Raygun Success handling here
};

const redisErrorCallback = err => {
  console.error('Redis client NOT connected', err);
  global.redisClient.quit();
  // TODO - Raygun Error handling here
};

const connectRedis = config => {
  // NOTE: This is a server side file only.
  // Incase redis needs to be implemented in mobile app, then a global object needs to be defined and used

  console.log(`Redis(Elasticache) Endpoint: ${config.REDIS_HOST}:${config.REDIS_PORT}`);
  global.redisClient = config.REDIS_CLIENT.createClient(config.REDIS_PORT, config.REDIS_HOST);

  global.redisClient.on('error', err => {
    redisErrorCallback(err);
  });

  global.redisClient.on('connect', () => {
    redisConnectCallback();
  });
};

module.exports = {
  connectRedis,
  getDataFromRedis,
  setDataInRedis,
};
