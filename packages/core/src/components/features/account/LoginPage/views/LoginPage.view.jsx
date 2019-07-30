/**
 * These are temporary changes for a dummy login page
 */

import React from 'react';
import { reduxForm } from 'redux-form';
import LoginPageStyle from '../styles/LoginPage.style';
import Anchor from '../../../../common/atoms/Anchor';
import Grid from '../../../../common/molecules/Grid';
import Row from '../../../../common/atoms/Row';
import Col from '../../../../common/atoms/Col';
import ForgotPasswordView from '../../ForgotPassword/views/ForgotPassword.view';
import LoginPageForm from './LoginPageForm.view';
// @flow

type Props = {
  getUserInfo: () => void,
  loginInfo: Object,
  showNotification: any,
  resetResponse: any,
  resetLoginState: any,
};

class LoginView extends React.PureComponent<Props> {
  constructor(props) {
    super(props);
    this.state = {
      resetPassword: false,
    };
  }

  componentDidMount() {
    const { getUserInfo } = this.props;
    getUserInfo();
  }

  changeHandler = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  showForgotPasswordForm = () => {
    const { resetPassword } = this.state;
    const { resetLoginState } = this.props;
    resetLoginState();
    this.setState({
      resetPassword: !resetPassword,
    });
  };

  /* eslint-disable */
  render() {
    const {
      loginInfo,
      getUserInfo,
      onSubmit,
      onSubmitForgot,
      showNotification,
      resetResponse,
      labels,
      resetLoginState,
      successFullResetEmail,
    } = this.props;
    const { resetPassword } = this.state;

    if (Object.keys(loginInfo).length === 0) {
      return null;
    }

    return (
      <React.Fragment>
        <Grid>
          <Row>
            <Col
              colSize={{
                large: 12,
                medium: 8,
                small: 12,
              }}
              offsetLeft={{
                large: 0,
                medium: 2,
                small: 0,
              }}
            >
              <LoginPageStyle>
                {!resetPassword && (
                  <LoginPageForm
                    onSubmit={onSubmit}
                    loginInfo={loginInfo}
                    getUserInfo={getUserInfo}
                    successFullResetEmail={successFullResetEmail}
                  />
                )}
                {resetPassword && (
                  <ForgotPasswordView
                    className="forgotPassword"
                    onSubmitForgot={onSubmitForgot}
                    loginInfo={loginInfo}
                    getUserInfo={getUserInfo}
                    showNotification={showNotification}
                    showForgotPasswordForm={this.showForgotPasswordForm}
                    resetResponse={resetResponse}
                    labels={labels}
                    resetLoginState={resetLoginState}
                    successFullResetEmail={successFullResetEmail}
                  />
                )}
                {!resetPassword && (
                  <Anchor onClick={this.showForgotPasswordForm} className="link-forgot">
                    Forgot password?
                  </Anchor>
                )}
              </LoginPageStyle>
            </Col>
          </Row>
        </Grid>
      </React.Fragment>
    );
  }
}

export default reduxForm({
  form: 'LoginView', // a unique identifier for this form
})(LoginView);
