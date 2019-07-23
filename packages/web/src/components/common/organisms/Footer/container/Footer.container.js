import { connect } from 'react-redux';
import {
  getUserInfoPOC,
  getOrderDetail,
} from '@tcp/core/src/components/features/account/LoginPage/container/LoginPage.actions';
import {
  toggleEmailSignupModal,
  submitEmailSignup,
} from '@tcp/web/src/components/common/molecules/EmailSignupModal/container/EmailSignupModal.actions';
import emailSignupAbstractor from '@tcp/core/src/services/abstractors/common/EmailSmsSignup';

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
  const { EmailSignUp = {} } = state;

  return {
    legalLinks: Footer.legalLinks,
    navLinks: Footer.navLinks,
    socialMediaLinks: {
      connectWithUsLabel,
      links: Footer.socialLinks,
    },
    isSubscriptionValid: EmailSignUp.signupSuccess,
    emailSignup: Footer.emailSignupBtn,
    smsSignup: Footer.smsSignupBtn,
    referAFriend: Footer.referFriendBtn,
    copyrightText: Footer.copyrightText,
    referenceID,
    emailSignupLabels,
    smsSignupLabels,
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
    submitEmailSubscription: payload => {
      dispatch(submitEmailSignup(payload));
    },
    /* Validate function for email signup redux-form */
    emailSignUpAsyncValidate: (values, f, props) => {
      const {
        labels: { validationErrorLabel },
      } = props;

      return values.signup
        ? emailSignupAbstractor.verifyEmail(values.signup).then(isValid => {
            if (!isValid) {
              const error = { signup: validationErrorLabel };
              // eslint-disable-next-line prefer-promise-reject-errors
              return Promise.reject({ ...error, _error: error });
            }

            return isValid;
          })
        : Promise.resolve();
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FooterView);
