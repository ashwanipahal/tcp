import { call, put, takeLatest, all } from 'redux-saga/effects';
import logger from '@tcp/core/src/utils/loggerInstance';
import { getNavigationData } from '@tcp/core/src/services/abstractors/common/subNavigation';
import layoutAbstractor from '../../services/abstractors/bootstrap/layout';
import GLOBAL_CONSTANTS, { MODULES_CONSTANT } from '../constants';
import { loadLayoutData, loadModulesData, setSubNavigationData } from '../actions';
import { getAPIConfig } from '../../utils';
import { defaultBrand, defaultChannel, defaultCountry } from '../../services/api.constants';

function* fetchPageLayout(action) {
  try {
    const { payload: page, layoutName } = action;
    const apiConfig = getAPIConfig();
    const { language } = apiConfig;
    const layoutParams = {
      page,
      brand: (apiConfig && apiConfig.brandIdCMS) || defaultBrand,
      channel: defaultChannel,
      country: (apiConfig && apiConfig.siteIdCMS) || defaultCountry,
    };
    const layoutData = yield call(layoutAbstractor.getLayoutData, layoutParams);
    const { errorMessage } = layoutData;
    if (!errorMessage) {
      yield put(loadLayoutData(layoutData.items[0].layout, layoutName || page));
      const modulesData = yield call(
        layoutAbstractor.getModulesFromLayout,
        layoutData,
        language,
        layoutName || page
      );
      const placeHolderIdList = Object.keys(modulesData).filter(
        module => modulesData[module].moduleName === MODULES_CONSTANT.placeholder
      );
      yield put(loadModulesData(modulesData));
      if (placeHolderIdList.length > 0) {
        const placeholderResult = yield all(
          placeHolderIdList.map(listItem =>
            modulesData[listItem].moduleClassName === MODULES_CONSTANT.subNavigation
              ? call(
                  getNavigationData,
                  modulesData[listItem].val,
                  layoutParams.brand,
                  layoutParams.country
                )
              : null
          )
        );
        yield all(
          placeholderResult.map(results => put(setSubNavigationData(results.val, results.key)))
        );
      }
    } else {
      logger.error(`Error occurred in layout query ${errorMessage}`);
    }
  } catch (e) {
    logger.error(e);
  }
}

function* LayoutSaga() {
  yield takeLatest(GLOBAL_CONSTANTS.FETCH_PAGE_LAYOUT, fetchPageLayout);
}

export default LayoutSaga;
