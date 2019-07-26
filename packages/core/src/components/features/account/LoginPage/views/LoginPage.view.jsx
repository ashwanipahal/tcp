/**
 * These are temporary changes for a dummy login page
 */

import React from 'react';
import { reduxForm } from 'redux-form';
import LoginPageStyle from '../styles/LoginPage.style';
import Button from '../../../../common/atoms/Button';
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
    } = this.props;
    debugger;
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
                large: 6,
                medium: 8,
                small: 12,
              }}
              offsetLeft={{
                large: 3,
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
                  />
                )}
                {resetPassword && (
                  <ForgotPasswordView
                    onSubmitForgot={onSubmitForgot}
                    loginInfo={loginInfo}
                    getUserInfo={getUserInfo}
                    showNotification={showNotification}
                    showForgotPasswordForm={this.showForgotPasswordForm}
                    resetResponse={resetResponse}
                  />
                )}
                {!resetPassword && (
                  <Button
                    type="button"
                    onClick={this.showForgotPasswordForm}
                    className="link-forgot"
                  >
                    Forgot password?
                  </Button>
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
