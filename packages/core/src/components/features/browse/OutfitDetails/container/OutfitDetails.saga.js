import { loadLayoutData, loadModulesData } from '@tcp/core/src/reduxStore/actions';
import { call, put, takeLatest, select } from 'redux-saga/effects';
import OUTFIT_DETAILS_CONSTANTS from './OutfitDetails.constants';
import { setCurrentOutfitAction } from './OutfitDetails.actions';
import getOutfitProdutsDetails from '../../../../../services/abstractors/productListing/outfitDetails';
import logger from '../../../../../utils/loggerInstance';
import { layoutResolver } from '../../../../../services/abstractors/productListing/productDetail';

function* loadOutfitDetails({ payload: { outfitId, vendorColorProductIdsList } }) {
  try {
    const pageName = 'pdp';
    const state = yield select();
    const navigationTree = state.Navigation.navigationData;
    const res = yield call(getOutfitProdutsDetails, {
      outfitId,
      vendorColorProductIdsList,
      getImgPath: () => {},
      navigationTree,
    });
    const { products } = res;
    if (products && products.length > 0) {
      const category = products[0] && products[0].category;
      const { layout, modules } = yield call(layoutResolver, { category, pageName });
      yield put(loadLayoutData(layout, pageName));
      yield put(loadModulesData(modules));
    }
    yield put(setCurrentOutfitAction({ ...res }));
  } catch (err) {
    logger.error('error: ', err);
  }
}

function* OutfitDetailsSaga() {
  yield takeLatest(OUTFIT_DETAILS_CONSTANTS.FETCH_OUTFIT_PRODUCTS, loadOutfitDetails);
}

export default OutfitDetailsSaga;
