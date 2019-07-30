import React from 'react';
import PropTypes from 'prop-types';
import LoginForm from '../../../molecules/LoginForm';
import LoginTopSection from '../../../molecules/LoginTopSection';
import ForgotPasswordView from '../../../../ForgotPassword/views/ForgotPassword.view';
import Row from '../../../../../../common/atoms/Row';
import Col from '../../../../../../common/atoms/Col';

class LoginSection extends React.PureComponent<Props> {
  constructor(props) {
    super(props);
    this.state = {
      resetPassword: false,
    };
  }
  showForgotPasswordForm = () => {
    const { resetPassword } = this.state;
    this.setState({
      resetPassword: !resetPassword,
    });
  };

  render() {
    const {
      onSubmit,
      labels,
      loginErrorMessage,
      initialValues,
      showRecaptcha,
      loginInfo,
      getUserInfo,
      onSubmitForgot,
      showNotification,
      resetLoginState,
      successFullResetEmail,
      resetForm,
      resetResponse,
    } = this.props;
    const { resetPassword } = this.state;
    return (
      <Row>
        <Col
          colSize={{
            small: 6,
            medium: 8,
            large: 12,
          }}
          className="elem-pt-XXL"
        >
          {!resetPassword && <LoginTopSection labels={labels} className="elem-mb-LRG" />}
          {!resetPassword && (
            <LoginForm
              onSubmit={onSubmit}
              labels={labels}
              loginErrorMessage={loginErrorMessage}
              initialValues={initialValues}
              showRecaptcha={showRecaptcha}
              showForgotPasswordForm={this.showForgotPasswordForm}
              resetForm={resetForm}
              className="elem-mb-LRG"
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
              labels={labels}
              resetPassword={resetPassword}
              resetLoginState={resetLoginState}
              successFullResetEmail={successFullResetEmail}
            />
          )}
        </Col>
      </Row>
    );
  }
}

LoginSection.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  labels: PropTypes.shape({}).isRequired,
  loginErrorMessage: PropTypes.string,
  initialValues: PropTypes.shape({}).isRequired,
  showRecaptcha: PropTypes.bool,
};

LoginSection.defaultProps = {
  loginErrorMessage: '',
  showRecaptcha: false,
};

export default LoginSection;
