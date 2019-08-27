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
        isSupportedTouch().then(techAvailable => {
          if (techAvailable) {
            touchIDCheck().then(touchIdResp => {
              if (touchIdResp) {
                onSubmit(userDetails);
              }
            });
          }
        });
      }
    });
  }

  onSubmitHandler = formdata => {
    const { onSubmit } = this.props;
    resetTouchPassword();
    setUserLoginDetails(formdata.emailAddress, formdata.password);
    onSubmit(formdata);

    isSupportedTouch().then(touchAvailable => {
      if (touchAvailable && formdata.userTouchId) {
        touchIDCheck();
      }
    });
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
      navigation,
      variation,
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
          navigation={navigation}
          variation={variation}
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
  navigation: PropTypes.shape({}),
  variation: PropTypes.bool.isRequired,
};

LoginView.defaultProps = {
  loginErrorMessage: '',
  navigation: {},
};

export default LoginView;
