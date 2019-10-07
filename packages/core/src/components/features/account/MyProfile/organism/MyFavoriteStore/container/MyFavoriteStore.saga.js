import { call, takeLatest, put } from 'redux-saga/effects';
import logger from '@tcp/core/src/utils/loggerInstance';
import CONSTANTS from '../MyFavoriteStore.constants';
import { setFavoriteStore } from '../../../../User/container/User.actions';
import getFavoriteStore from '../../../../../../../services/abstractors/account/MyFavoriteStore';

/**
 * @function getMyFavoriteStoreSaga
 * @description This function will call getFavoriteStore Abstractor to get Favorite Store details
 */
export function* getMyFavoriteStoreSaga({ payload }) {
  try {
    const response = yield call(getFavoriteStore, payload);
    yield put(
      setFavoriteStore({
        favoriteStore: response,
      })
    );
  } catch (err) {
    logger.error('Get Favorite Store error', err);
  }
}

/**
 * @function MyFavoriteStoreSaga
 * @description watcher function for getFavoriteStore.
 */
export function* MyFavoriteStoreSaga() {
  yield takeLatest(CONSTANTS.GET_MY_FAVORITE_STORE, getMyFavoriteStoreSaga);
}

export default MyFavoriteStoreSaga;
