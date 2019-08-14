import { call, put, takeLatest, select } from 'redux-saga/effects';
import labelAbstractor from '../../services/abstractors/bootstrap/labels';
import GLOBAL_CONSTANTS, { LABELS } from '../constants';
import { LABEL_REDUCER_KEY } from '../../constants/reducer.constants';
import { setLabelsData } from '../actions';
import { getAPIConfig } from '../../utils';
import { defaultBrand, defaultChannel, defaultCountry } from '../../services/api.constants';

function* fetchComponentLabel(action) {
  const { payload: { category, subCategory } = {} } = action;
  const labelsSelector = state => {
    const categoryData = state[LABEL_REDUCER_KEY] && state[LABEL_REDUCER_KEY][category];
    if (categoryData && subCategory) {
      return categoryData[subCategory] || false;
    }
    return categoryData || false;
  };
  const isLabelsExist = yield select(labelsSelector);
  if (!isLabelsExist) {
    const apiConfig = getAPIConfig();
    const labelParams = {
      category,
      subCategory,
      brand: (apiConfig && apiConfig.brandIdCMS) || defaultBrand,
      channel: defaultChannel,
      country: (apiConfig && apiConfig.siteIdCMS) || defaultCountry,
    };
    const data = yield call(labelAbstractor.getData, LABELS.labels, labelParams);
    yield put(
      setLabelsData({
        category,
        subCategory,
        data,
      })
    );
  }
}

function* LabelsSaga() {
  yield takeLatest(GLOBAL_CONSTANTS.LOAD_COMPONENT_LABELS_DATA, fetchComponentLabel);
}

export default LabelsSaga;
