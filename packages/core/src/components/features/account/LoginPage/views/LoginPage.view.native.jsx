/**
 * These are temporary changes for a dummy login page
 */

import React from 'react';
import PropTypes from 'prop-types';
// eslint-disable-next-line import/no-unresolved
import * as Keychain from 'react-native-keychain';
// eslint-disable-next-line import/no-unresolved
import TouchID from 'react-native-touch-id';
import LoginSection from '../organism/LoginSection';
import ScrollViewStyle from '../styles/LoginPage.style.native';
import {
  setUserUserPassword,
  getUserUserPassword,
  resetTouchPassword,
  touchIDCheck,
} from '../container/loginUtils/keychain.utils.native';
class LoginView extends React.PureComponent {
  componentDidMount() {
    const { onSubmit } = this.props;
    getUserUserPassword().then(credentials => {
      const userDetails = {
        emailAddress: credentials.username,
        password: credentials.password,
      };
      if (credentials) {
        const getTouchIdResult = touchIDCheck();
        if (getTouchIdResult) {
          onSubmit(userDetails);
        }
        // TouchID.authenticate('Authentication Required')
        //   .then(success => {
        //     onSubmit(userDetails);
        //   })
        //   .catch(error => {
        //     return true
        //   });
      }
    });
  }

  onSubmitHandler = formdata => {
    const { onSubmit } = this.props;
    Keychain.setGenericPassword(formdata.emailAddress, formdata.password);
    const getTouchIdResult = touchIDCheck();
    if (getTouchIdResult) {
      onSubmit(formdata);
    }
    // TouchID.authenticate('Authentication Required')
    //   .then(success => {
    //     onSubmit(formdata);
    //   })
    //   .catch(error => {
    //     return false
    //   });
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
  isUserLoggedIn: PropTypes.string.isRequired,
};

LoginView.defaultProps = {
  loginErrorMessage: '',
};

export default LoginView;
