import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import LoginForm from '../../../molecules/LoginForm';
import BodyCopy from '../../../../../../common/atoms/BodyCopy';
import LoginTopSection from '../../../molecules/LoginTopSection';
import ForgotPasswordContainer from '../../../../ForgotPassword/container/ForgotPassword.container';
import Row from '../../../../../../common/atoms/Row';
import Col from '../../../../../../common/atoms/Col';
import Button from '../../../../../../common/atoms/Button';
import styles from './styles/LoginSection.styles';
import { isCanada } from '../../../../../../../utils';

class LoginSection extends React.PureComponent<Props> {
  constructor(props) {
    super(props);
    this.state = {
      resetPassword: false,
    };
    this.isCanada = isCanada();
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
      resetForm,
      className,
      onCreateAccountClick,
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
          className="elem-pt-XXL  elem-pl-LRG elem-pr-LRG"
        >
          {!resetPassword && (
            <LoginTopSection labels={labels} className="elem-mb-LRG" isCanada={this.isCanada} />
          )}
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
              onCreateAccountClick={onCreateAccountClick}
            />
          )}

          {resetPassword && (
            <ForgotPasswordContainer
              showForgotPasswordForm={this.showForgotPasswordForm}
              labels={labels}
            />
          )}

          <BodyCopy component="div" className="border elem-pt-MED elem-pb-LRG">
            <BodyCopy fontSize="fs12" textAlign="center" className="elem-mb-LRG">
              {labels.login.lbl_login_createAccountHelp}
            </BodyCopy>
          </BodyCopy>
          <Button
            className="create-acc-cta"
            fill="BLUE"
            type="submit"
            buttonVariation="fixed-width"
            data-locator=""
            onClick={onCreateAccountClick}
          >
            {labels.login.lbl_login_createAccountCTA}
          </Button>
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
  onCreateAccountClick: PropTypes.func,
};

LoginSection.defaultProps = {
  loginErrorMessage: '',
  showRecaptcha: false,
  onCreateAccountClick: () => {},
};

export default withStyles(LoginSection, styles);
export { LoginSection as LoginSectionVanilla };
