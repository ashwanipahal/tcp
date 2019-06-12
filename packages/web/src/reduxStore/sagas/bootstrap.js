import { call, put, takeLatest } from 'redux-saga/effects';
import bootstrapAbstractor from '@tcp/core/src/abstractors/global/bootstrap';
import { loadLayoutData, loadLabelsData } from '../actions';
import { loadHeaderData } from '../../components/common/organisms/Header/container/Header.actions';
import { loadFooterData } from '../../components/common/organisms/Footer/container/Footer.actions';
import { loadModuleDData } from '../../components/common/organisms/ModuleD/container/ModuleD.actions';
import GLOBAL_CONSTANTS from '../constants';

function* bootstrap() {
  try {
    const result = yield call(bootstrapAbstractor);
    yield put(loadLayoutData(result.layout));
    yield put(loadLabelsData(result.labels));
    yield put(loadHeaderData(result.header));
    yield put(loadFooterData(result.footer));
    yield put(loadModuleDData(result.moduleD));
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err);
  }
}

function* BootstrapSaga() {
  yield takeLatest(GLOBAL_CONSTANTS.BOOTSTRAP_API, bootstrap);
}

export default BootstrapSaga;
