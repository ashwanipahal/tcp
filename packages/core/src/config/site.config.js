export const DEFAULT_REDUX_TTL_TIME = 10 * 60 * 1000; // ttl is 10 mins by default

export const DEFAULT_XAPP_CONFIG_TTL = {
  CACHE_IDENTIFIER: 'XAPP_CONFIG_DATA',
  CACHE_EXP_MODIFIER: 'EX',
  CACHE_EXP_TIME: 10 * 60,
}; // ttl for xappConfig is 10 mins by default, refer: https://redis.io/commands/set

export const DEFAULT_GLOBAL_LABEL_TTL = {
  CACHE_IDENTIFIER: 'GLOBAL_LABEL_DATA',
  CACHE_EXP_MODIFIER: 'EX',
  CACHE_EXP_TIME: 10 * 60,
}; // ttl for xappConfig is 10 mins by default, refer: https://redis.io/commands/set

export default {
  DEFAULT_REDUX_TTL_TIME,
  DEFAULT_XAPP_CONFIG_TTL,
  DEFAULT_GLOBAL_LABEL_TTL,
};
