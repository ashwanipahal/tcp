import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import LoginForm from '../../../molecules/LoginForm';
import BodyCopy from '../../../../../../common/atoms/BodyCopy';
import LoginTopSection from '../../../molecules/LoginTopSection';
import ForgotPasswordView from '../../../../ForgotPassword/views/ForgotPassword.view';
import Row from '../../../../../../common/atoms/Row';
import Col from '../../../../../../common/atoms/Col';
import Button from '../../../../../../common/atoms/Button';
import styles from '../../../styles/LoginPage.style';

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
      className,
    } = this.props;

    const { resetPassword } = this.state;
    return (
      <Row className={className}>
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

          <BodyCopy component="div" className="border elem-pt-LRG">
            <BodyCopy fontSize="fs12" textAlign="center" className="elem-mb-LRG">
              {labels.ACC_LBL_LOGIN_CREATE_ACCOUNT_HELP}
            </BodyCopy>
            <Button
              className="create-acc-cta"
              fill="BLUE"
              type="submit"
              buttonVariation="fixed-width"
              data-locator=""
            >
              {labels.ACC_LBL_LOGIN_CREATE_ACCOUNT_CTA}
            </Button>
          </BodyCopy>
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

export default withStyles(LoginSection, styles);
export { LoginSection as LoginSectionVanilla };
