import { call, put, takeLatest } from 'redux-saga/effects';
import bootstrapAbstractor from '../../services/abstractors/bootstrap';
import { loadLayoutData, loadLabelsData } from '../actions';
import { loadHeaderData } from '../../components/common/organisms/Header/container/Header.actions';
import { loadFooterData } from '../../components/common/organisms/Footer/container/Footer.actions';
import GLOBAL_CONSTANTS from '../constants';

function* bootstrap({ pageInfo = { name: 'homepage' } }) {
  const pagesList = [pageInfo.name];
  try {
    const result = yield call(bootstrapAbstractor, pagesList);
    yield put(loadLayoutData(result[pageInfo.name], pageInfo.name));
    result.labels.global.subscribe = {
      signUpForLabel: 'Sign up for',
      offerTypeLabel: 'Email Offers',
      nextPurchaseLabel: 'Your Next Purchase',
      termsTextLabel:
        '*Applies to new email subscribers only. Exclusions apply. Offer valid onyour next purchase of $40 or more. You may withdraw your consent at any time. Contact Us. The Children’s Place, 500 Plaza Drive, Secaucus, NJ 07094, www.childrensplace.com.',
      joinButtonLabel: 'JOIN NOW',
      validationErrorLabel: 'ERROR: Please enter a valid email address',
      shopNowLabel: 'SHOP NOW',
      thankYouTextLabel: 'Thank You!',
      joiningTextLabel: 'For Joining Our List',
      confirmationMsgReceiveLabel: 'You will receive your first email from us shortly.',
      extraMessageLabel: 'Don’t forget to open it and redeem your offer!',
      footerTextLabel: `You may withdraw your consent at any time. Contact Us. The Children’s Place, 500 Plaza Drive, Secaucus, NJ 07094, www.childrensplace.com.`,
    };
    yield put(loadLabelsData(result.labels));
    yield put(loadHeaderData(result.header.submodules));
    yield put(loadFooterData(result.footer));
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err);
  }
}

function* BootstrapSaga() {
  yield takeLatest(GLOBAL_CONSTANTS.BOOTSTRAP_API, bootstrap);
}

export default BootstrapSaga;
