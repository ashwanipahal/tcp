import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import LoginForm from '../../../molecules/LoginForm';
import BodyCopy from '../../../../../../common/atoms/BodyCopy';
import LoginTopSection from '../../../molecules/LoginTopSection';
import ForgotPasswordContainer from '../../../../ForgotPassword/container/ForgotPassword.container';
import ResetPassword from '../../../../ResetPassword';
import Row from '../../../../../../common/atoms/Row';
import Col from '../../../../../../common/atoms/Col';
import Button from '../../../../../../common/atoms/Button';
import styles from './styles/LoginSection.styles';
import constants from '../../../LoginPage.constants';
import { isCanada, scrollPage } from '../../../../../../../utils';

class LoginSection extends React.PureComponent<Props> {
  constructor(props) {
    super(props);
    this.isCanada = isCanada();
  }

  componentDidUpdate(prevProps) {
    const { currentForm } = this.props;

    if (currentForm !== prevProps.currentForm) {
      scrollPage();
    }
  }

  showForgotPasswordForm = () => {
    const { openModal } = this.props;
    openModal({
      component: 'login',
      componentProps: {
        currentForm: constants.PAGE_TYPE.FORGOT_PASSWORD,
      },
    });
  };

  showLoginForm = () => {
    const { openModal } = this.props;
    openModal({
      component: 'login',
      componentProps: {
        currentForm: constants.PAGE_TYPE.LOGIN,
      },
    });
  };

  showCreateAccountForm = () => {
    const { openModal } = this.props;
    openModal({
      component: 'createAccount',
      variation: 'primary',
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
      queryParams,
      currentForm,
    } = this.props;
    return (
      <Row className={className}>
        <Col
          colSize={{
            small: 6,
            medium: 8,
            large: 12,
          }}
          className="elem-pt-XXL elem-pb-XXL  elem-pl-LRG elem-pr-LRG"
        >
          {(!currentForm || currentForm === constants.PAGE_TYPE.LOGIN) && (
            <React.Fragment>
              <LoginTopSection labels={labels} className="elem-mb-LRG" isCanada={this.isCanada} />
              <LoginForm
                onSubmit={onSubmit}
                labels={labels}
                loginErrorMessage={loginErrorMessage}
                initialValues={initialValues}
                showRecaptcha={showRecaptcha}
                showForgotPasswordForm={this.showForgotPasswordForm}
                resetForm={resetForm}
                className="elem-mb-LRG"
                onCreateAccountClick={this.showCreateAccountForm}
              />
            </React.Fragment>
          )}
          {currentForm === constants.PAGE_TYPE.FORGOT_PASSWORD && (
            <ForgotPasswordContainer showForgotPasswordForm={this.showLoginForm} labels={labels} />
          )}
          {currentForm === constants.PAGE_TYPE.RESET_PASSWORD && (
            <ResetPassword
              backToLoginAction={this.showLoginForm}
              labels={labels.password}
              queryParams={queryParams}
            />
          )}

          <BodyCopy component="div" className="border elem-pt-MED elem-pb-LRG">
            <BodyCopy fontFamily="secondary" fontSize="fs12" textAlign="center">
              {labels.login.lbl_login_createAccountHelp}
            </BodyCopy>
          </BodyCopy>
          <Button
            className="create-acc-cta"
            fill="WHITE"
            type="submit"
            buttonVariation="fixed-width"
            data-locator=""
            onClick={this.showCreateAccountForm}
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
  openModal: PropTypes.func,
  queryParams: PropTypes.shape({}).isRequired,
  currentForm: PropTypes.string,
};

LoginSection.defaultProps = {
  loginErrorMessage: '',
  showRecaptcha: false,
  openModal: () => {},
  currentForm: constants.PAGE_TYPE.LOGIN,
};

export default withStyles(LoginSection, styles);
export { LoginSection as LoginSectionVanilla };
