import { call, put, takeLatest } from 'redux-saga/effects';
import logger from '@tcp/core/src/utils/loggerInstance';
import layoutAbstractor from '../../services/abstractors/bootstrap/layout';
import GLOBAL_CONSTANTS from '../constants';
import { loadLayoutData, loadModulesData } from '../actions';
import { getAPIConfig } from '../../utils';
import { defaultBrand, defaultChannel, defaultCountry } from '../../services/api.constants';

function* fetchPageLayout(action) {
  try {
    const { payload: page } = action;
    const apiConfig = getAPIConfig();
    const layoutParams = {
      page,
      brand: (apiConfig && apiConfig.brandIdCMS) || defaultBrand,
      channel: defaultChannel,
      country: (apiConfig && apiConfig.siteIdCMS) || defaultCountry,
    };
    const layoutData = yield call(layoutAbstractor.getLayoutData, layoutParams);
    yield put(loadLayoutData(layoutData.items[0].layout, page));
    const modulesData = yield call(layoutAbstractor.getModulesFromLayout, layoutData);
    yield put(loadModulesData(modulesData));
  } catch (e) {
    logger.error(e);
  }
}

function* LayoutSaga() {
  yield takeLatest(GLOBAL_CONSTANTS.FETCH_PAGE_LAYOUT, fetchPageLayout);
}

export default LayoutSaga;
