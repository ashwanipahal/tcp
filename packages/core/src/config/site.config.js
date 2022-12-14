export const DEFAULT_REDUX_TTL_TIME = 10 * 60 * 1000; // ttl is 10 mins by default

export const DEFAULT_XAPP_CONFIG_TTL = {
  CACHE_IDENTIFIER: 'configuration-keys',
  CACHE_EXP_MODIFIER: 'EX',
  CACHE_EXP_TIME: 10 * 60,
}; // ttl for xappConfig is 10 mins by default, refer: https://redis.io/commands/set

export const DEFAULT_GLOBAL_LABEL_TTL = {
  CACHE_IDENTIFIER: 'GLOBAL_LABEL_DATA',
  CACHE_EXP_MODIFIER: 'EX',
  CACHE_EXP_TIME: 10 * 60,
}; // ttl for xappConfig is 10 mins by default, refer: https://redis.io/commands/set

export const DEFAULT_TOAST_ERROR_MESSAGE_TTL = 5000;

export const SCROLL_TOP_POS = 200;

export const GET_DEFAULT_STORE_TTL = 2 * 60 * 1000;

export default {
  DEFAULT_REDUX_TTL_TIME,
  DEFAULT_XAPP_CONFIG_TTL,
  DEFAULT_GLOBAL_LABEL_TTL,
  DEFAULT_TOAST_ERROR_MESSAGE_TTL,
  SCROLL_TOP_POS,
};
