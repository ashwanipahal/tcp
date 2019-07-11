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
    result.labels.global.subscribeEmail = {
      signUpForLabel: 'Sign up for',
      offerTypeLabel: 'Email Offers',
      getTextLabel: 'GET',
      dollarTextLabel: '$',
      tenTextLabel: '10',
      offTextLabel: 'OFF',
      nextPurchaseLabel: 'Your Next Purchase',
      termsTextLabel:
        '*Applies to new email subscribers only. Exclusions apply. Offer valid onyour next purchase of $40 or more. You may withdraw your consent at any time. Contact Us. The Children’s Place, 500 Plaza Drive, Secaucus, NJ 07094, www.childrensplace.com.',
      joinButtonLabel: 'JOIN NOW',
      placeholderText: 'Enter Email Address',
      validationErrorLabel: 'ERROR: Please enter a valid email address',
      shopNowLabel: 'SHOP NOW',
      thankYouTextLabel: 'Thank You!',
      joiningTextLabel: 'For Joining Our List',
      confirmationMsgReceiveLabel: 'You will receive your first email from us shortly.',
      extraMessageLabel: 'Don’t forget to open it and redeem your offer!',
      footerTextLabel:
        'You may withdraw your consent at any time. Contact Us. The Children’s Place, 500 Plaza Drive, Secaucus, NJ 07094, www.childrensplace.com.',
    };
    result.labels.global.subscribeSms = {
      signUpForLabel: 'Sign Up For',
      offerTypeLabel: 'Text Alerts',
      getTextLabel: 'GET',
      dollarTextLabel: '$',
      tenTextLabel: '10',
      offTextLabel: 'OFF',
      nextPurchaseLabel: 'Your Next Purchase',
      termsTextLabel:
        'Carrier message & data rates apply. Recurring automated marketing messages will be sent to the number probvided at opt-in. Test STOP to 89700 to opt-out. Offer is valid for first-time subscibers only. See Mobile T&C & Privacy Policy. No purchase necessary. US customers only. Offer valid on your next purchase of $40 or more.',
      joinButtonLabel: 'JOIN NOW',
      placeholderText: 'Enter Phone Number',
      validationErrorLabel: 'ERROR: Please enter a valid email address',
      shopNowLabel: 'SHOP NOW',
      thankYouTextLabel: 'Thank You!',
      joiningTextLabel: 'For Signing up for Alerts',
      confirmationMsgReceiveLabel: 'A Text Is On It’s Way',
      extraMessageLabel: 'Don’t forget to open it and redeem your offer!',
      footerTextLabel: '',
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
