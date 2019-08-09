/**
 * These are temporary changes for a dummy login page
 */

import React from 'react';
import PropTypes from 'prop-types';
import LoginSection from '../organism/LoginSection';
import ScrollViewStyle from '../styles/LoginPage.style.native';
import {
  setUserLoginDetails,
  getUserLoginDetails,
  resetTouchPassword,
  touchIDCheck,
  isSupportedTouch,
} from '../container/loginUtils/keychain.utils.native';

class LoginView extends React.PureComponent {
  componentDidMount() {
    const { onSubmit } = this.props;
    getUserLoginDetails().then(credentials => {
      const userDetails = {
        emailAddress: credentials.username,
        password: credentials.password,
      };
      if (credentials) {
        const getTouchIdResult = touchIDCheck();
        const isTouchEnable = isSupportedTouch();
        if (getTouchIdResult && isTouchEnable) {
          onSubmit(userDetails);
        }
      }
    });
  }

  onSubmitHandler = formdata => {
    const { onSubmit } = this.props;
    resetTouchPassword();
    setUserLoginDetails(formdata.emailAddress, formdata.password);
    const getTouchIdResult = touchIDCheck();
    const isTouchEnable = isSupportedTouch();
    if (getTouchIdResult && formdata.userTouchId && isTouchEnable) {
      onSubmit(formdata);
    }
  };

  render() {
    const {
      labels,
      loginErrorMessage,
      initialValues,
      showRecaptcha,
      resetLoginState,
      SubmitForgot,
      showNotification,
      successFullResetEmail,
      resetForm,
      resetForgotPasswordErrorResponse,
      onCreateAccountClick,
    } = this.props;
    return (
      <ScrollViewStyle>
        <LoginSection
          onSubmit={this.onSubmitHandler}
          labels={labels}
          loginErrorMessage={loginErrorMessage}
          initialValues={initialValues}
          showRecaptcha={showRecaptcha}
          resetLoginState={resetLoginState}
          SubmitForgot={SubmitForgot}
          showNotification={showNotification}
          successFullResetEmail={successFullResetEmail}
          resetForm={resetForm}
          resetForgotPasswordErrorResponse={resetForgotPasswordErrorResponse}
          onCreateAccountClick={onCreateAccountClick}
        />
      </ScrollViewStyle>
    );
  }
}
LoginView.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  labels: PropTypes.shape({}).isRequired,
  loginErrorMessage: PropTypes.string,
  initialValues: PropTypes.shape({}).isRequired,
  showRecaptcha: PropTypes.string.isRequired,
  resetLoginState: PropTypes.string.isRequired,
  SubmitForgot: PropTypes.string.isRequired,
  showNotification: PropTypes.string.isRequired,
  successFullResetEmail: PropTypes.string.isRequired,
  resetForm: PropTypes.string.isRequired,
  resetForgotPasswordErrorResponse: PropTypes.string.isRequired,
  onCreateAccountClick: PropTypes.string.isRequired,
};

LoginView.defaultProps = {
  loginErrorMessage: '',
};

export default LoginView;
