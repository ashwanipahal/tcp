import { call } from 'redux-saga/effects';
import { NavigateXHR } from '../../../../../services/abstractors/account';

export function* navigateXHRSaga() {
  try {
    const response = yield call(NavigateXHR);
    if (response.success) {
      return response.success;
    }
    return response;
  } catch (err) {
    return '';
  }
}

export default { navigateXHRSaga };
