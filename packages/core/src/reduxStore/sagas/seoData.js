import { call, put, takeEvery, select } from 'redux-saga/effects';
import seoDataAbstractor from '../../services/abstractors/seoData';
import GLOBAL_CONSTANTS, { SEO_DATA } from '../constants';
import { SEO_DATA_REDUCER_KEY } from '../../constants/reducer.constants';
import { setSEOData } from '../actions';
import { getAPIConfig } from '../../utils';
import { defaultBrand, defaultChannel, defaultCountry } from '../../services/api.constants';

function* fetchPageSEOData(action) {
  const { payload: { page } = {} } = action;
  const seoDataSelector = state => {
    const pageData = state[SEO_DATA_REDUCER_KEY] && state[SEO_DATA_REDUCER_KEY][page];
    return pageData || false;
  };
  const isSEODataExist = yield select(seoDataSelector);
  if (!isSEODataExist) {
    const apiConfig = getAPIConfig();
    const seoDataParams = {
      page,
      brand: (apiConfig && apiConfig.brandIdCMS) || defaultBrand,
      channel: defaultChannel,
      country: (apiConfig && apiConfig.siteIdCMS) || defaultCountry,
    };
    const data = yield call(seoDataAbstractor.getData, SEO_DATA.seoData, seoDataParams);
    yield put(
      setSEOData({
        page,
        data,
      })
    );
  }
}

function* SEODataSaga() {
  yield takeEvery(GLOBAL_CONSTANTS.LOAD_PAGE_SEO_DATA, fetchPageSEOData);
}

export default SEODataSaga;
