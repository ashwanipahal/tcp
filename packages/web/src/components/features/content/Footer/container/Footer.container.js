import { connect } from 'react-redux';
import {
  getUserInfoPOC,
  getOrderDetail,
  setLoginModalMountedState,
} from '@tcp/core/src/components/features/account/LoginPage/container/LoginPage.actions';
import { loginModalOpenState } from '@tcp/core/src/components/features/account/LoginPage/container/LoginPage.selectors';
import { submitEmailSignup } from '@tcp/core/src/components/common/organisms/EmailSignupForm/container/EmailSignupForm.actions';
import { toggleEmailSignupModal } from '@tcp/web/src/components/common/molecules/EmailSignupModal/container/EmailSignupModal.actions';
import {
  submitSmsSignup,
  clearSmsSignupForm,
} from '@tcp/core/src/components/common/organisms/SmsSignupForm/container/SmsSignupForm.actions';
import { toggleSmsSignupModal } from '@tcp/web/src/components/common/molecules/SmsSignupModal/container/SmsSignupModal.actions';
import { getUserLoggedInState } from '@tcp/core/src/components/features/account/User/container/User.selectors';
import emailSignupAbstractor from '@tcp/core/src/services/abstractors/common/EmailSmsSignup';
import { validatePhoneNumber } from '@tcp/core/src/utils/formValidation/phoneNumber';
import { setTrackOrderModalMountedState } from '@tcp/core/src/components/features/account/TrackOrder/container/TrackOrder.actions';
import LinkConfig from '../../../../../config/footerLinkActionMapping.config';
import FooterView from '../views';
import { isLocationEnabledForGuest, isLocationEnabledForLoggedInUser } from './Footer.selectors';

const mapStateToProps = state => {
  const { Footer } = state;
  const {
    global: {
      footerDefault: {
        lbl_footerDefault_connectwithus: connectWithUsLabel,
        lbl_footerDefault_referenceId: referenceID,
      } = {},
      emailSignup: emailSignupLabels,
      smsSignup: smsSignupLabels,
      referAFriend: referAFriendButtonLabels,
    } = {},
  } = state.Labels;
  const {
    EmailSignUp: { EmailSignupFormReducer: { subscription } = {} } = {},
    SmsSignUp = { SmsSignupFormReducer: { subscription } },
  } = state;

  return {
    legalLinks: Footer.legalLinks,
    navLinks: Footer.navLinks,
    socialMediaLinks: {
      connectWithUsLabel,
      links: Footer.socialLinks,
    },
    smsSubscription: subscription,
    emailSubscription: subscription,
    emailSignup: Footer.emailSignupBtn,
    smsSignup: Footer.smsSignupBtn,
    referAFriend: Footer.referFriendBtn,
    referAFriendButtonLabels,
    copyrightText: Footer.copyrightText,
    referenceID,
    emailSignupLabels,
    smsSignupLabels,
    loginModalMountedState: loginModalOpenState(state),
    isLoggedIn: getUserLoggedInState(state),
    linkConfig: LinkConfig,
    isLocationEnabledForLoggedInUser: isLocationEnabledForLoggedInUser(state),
    isLocationEnabledForGuest: isLocationEnabledForGuest(state),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    footerActionCreator: (dispatchFn, payload) => {
      dispatch(dispatchFn(payload));
    },
    getUserInfoAction: () => {
      dispatch(getUserInfoPOC());
    },
    getOrderDetailAction: () => {
      dispatch(getOrderDetail());
    },
    openEmailSignUpModal: () => {
      dispatch(toggleEmailSignupModal({ isModalOpen: true }));
    },
    setLoginModalMountState: payload => {
      dispatch(setLoginModalMountedState(payload));
    },
    openSmsSignUpModal: () => {
      dispatch(toggleSmsSignupModal({ isModalOpen: true }));
    },
    submitEmailSubscription: payload => {
      dispatch(submitEmailSignup(payload));
    },
    submitSmsSubscription: payload => {
      dispatch(clearSmsSignupForm());
      dispatch(submitSmsSignup(payload));
    },
    validateSignupEmail: values => {
      return emailSignupAbstractor.verifyEmail(values.signup);
    },
    validateSignupSmsPhoneNumber: values => {
      return validatePhoneNumber(values.footerTopSmsSignup)
        ? Promise.resolve({})
        : Promise.reject();
    },
    openTrackOrder: payload => dispatch(setTrackOrderModalMountedState(payload)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FooterView);
