import constants from '../MyFavoriteStore.constants';

/**
 * @function getMyFavoriteStoreAction
 * action creator for type: GET_CHILDREN
 */
export const getMyFavoriteStoreAction = payload => ({
  type: constants.GET_MY_FAVORITE_STORE,
  payload,
});

/**
 * @function resetMyFavoriteStoreAction
 * action creator for type: RESET_MY_FAVORITE_STORE
 */
export const resetMyFavoriteStoreAction = () => ({
  type: constants.RESET_MY_FAVORITE_STORE,
});

export default getMyFavoriteStoreAction;
