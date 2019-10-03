import { call, put, takeLatest, select } from 'redux-saga/effects';
import OUTFIT_DETAILS_CONSTANTS from './OutfitDetails.constants';
import { setCurrentOutfitAction } from './OutfitDetails.actions';
import getOutfitProdutsDetails from '../../../../../services/abstractors/productListing/outfitDetails';

function* loadOutfitDetails({ payload: { outfitId, vendorColorProductIdsList } }) {
  try {
    const state = yield select();
    const navigationTree = state.Navigation.navigationData;
    const res = yield call(getOutfitProdutsDetails, {
      outfitId,
      vendorColorProductIdsList,
      getImgPath: () => {},
      navigationTree,
    });
    yield put(setCurrentOutfitAction({ ...res }));
  } catch (err) {
    console.log(err);
  }
}

function* OutfitDetailsSaga() {
  yield takeLatest(OUTFIT_DETAILS_CONSTANTS.FETCH_OUTFIT_PRODUCTS, loadOutfitDetails);
}

export default OutfitDetailsSaga;
