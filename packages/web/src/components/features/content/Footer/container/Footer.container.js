import { connect } from 'react-redux';
import {
  getUserInfoPOC,
  getOrderDetail,
  setLoginModalMountedState,
} from '@tcp/core/src/components/features/account/LoginPage/container/LoginPage.actions';
import { loginModalOpenState } from '@tcp/core/src/components/features/account/LoginPage/container/LoginPage.selectors';

import {
  toggleEmailSignupModal,
  submitEmailSignup,
} from '@tcp/web/src/components/common/molecules/EmailSignupModal/container/EmailSignupModal.actions';

import {
  toggleSmsSignupModal,
  submitSmsSignup,
  clearSmsSignupForm,
} from '@tcp/web/src/components/common/molecules/SmsSignupModal/container/SmsSignupModal.actions';
import { getUserLoggedInState } from '@tcp/core/src/components/features/account/User/container/User.selectors';
import emailSignupAbstractor from '@tcp/core/src/services/abstractors/common/EmailSmsSignup';
import { validatePhoneNumber } from '@tcp/core/src/utils/formValidation/phoneNumber';
import { setTrackOrderModalMountedState } from '@tcp/core/src/components/features/account/TrackOrder/container/TrackOrder.actions';
import FooterView from '../views';

const mapStateToProps = state => {
  const { Footer } = state;
  const {
    global: {
      footerDefault: { CONNECT_WITH_US: connectWithUsLabel, REFERENCE_ID: referenceID },
      emailSignup: emailSignupLabels,
      smsSignup: smsSignupLabels,
    },
  } = state.Labels;
  const { EmailSignUp = {}, SmsSignUp = {} } = state;

  return {
    legalLinks: Footer.legalLinks,
    navLinks: Footer.navLinks,
    socialMediaLinks: {
      connectWithUsLabel,
      links: Footer.socialLinks,
    },
    smsSubscription: SmsSignUp.subscription,
    emailSubscription: EmailSignUp.subscription,
    emailSignup: Footer.emailSignupBtn,
    smsSignup: Footer.smsSignupBtn,
    referAFriend: Footer.referFriendBtn,
    copyrightText: Footer.copyrightText,
    referenceID,
    emailSignupLabels,
    smsSignupLabels,
    loginModalMountedState: loginModalOpenState(state),
    isLoggedIn: getUserLoggedInState(state),
  };
};

const mapDispatchToProps = dispatch => {
  return {
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
    /* Validate function for email signup redux-for. check asyncValidate of redux-form */
    emailSignUpAsyncValidate: (values, reduxFormDispatch, props) => {
      const { fieldName } = props;
      const email = values[fieldName];

      return email
        ? emailSignupAbstractor.verifyEmail(email).then(subscription => {
            if (subscription.error) {
              const {
                labels: { validationErrorLabel },
              } = props;
              const error = { [fieldName]: validationErrorLabel };
              // eslint-disable-next-line prefer-promise-reject-errors
              return Promise.reject({ ...error, _error: error });
            }

            return subscription;
          })
        : Promise.resolve();
    },
    /* Validate function for sms signup redux-form; check asyncValidate of redux-form */
    smsSignUpAsyncValidate: (values, reduxFormDispatch, props) => {
      const { fieldName } = props;

      const phoneNumber = values[fieldName];
      if (phoneNumber.length && !validatePhoneNumber(phoneNumber)) {
        const {
          labels: { validationErrorLabel },
        } = props;
        const error = { [fieldName]: validationErrorLabel };
        // eslint-disable-next-line prefer-promise-reject-errors
        return Promise.reject({ ...error, _error: error });
      }
      return Promise.resolve();
    },
    openTrackOrder: payload => dispatch(setTrackOrderModalMountedState(payload)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FooterView);
