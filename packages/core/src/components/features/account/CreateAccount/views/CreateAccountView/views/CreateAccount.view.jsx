import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '../../../../../../common/hoc/withStyles';
import CreateAccounPage from '../../../organisms/CreateAccountPage';
import Styles from '../styles/CreateAccount.style';

class CreateAccount extends React.Component<Props> {
  static propTypes = {
    className: PropTypes.string,
    createAccountAction: PropTypes.func.isRequired,
    isIAgreeChecked: PropTypes.bool.isRequired,
    hideShowPwd: PropTypes.bool.isRequired,
    confirmHideShowPwd: PropTypes.bool.isRequired,
    labels: PropTypes.shape({}).isRequired,
    error: PropTypes.shape({}).isRequired,
    onAlreadyHaveAnAccountClick: PropTypes.func.isRequired,
    onRequestClose: PropTypes.func.isRequired,
    openModal: PropTypes.func.isRequired,
  };

  static defaultProps = {
    className: '',
  };

  showForgotPasswordForm = () => {
    const { openModal } = this.props;
    openModal({
      component: 'login',
      componentProps: {
        currentForm: 'forgotPassword',
      },
    });
  };

  render() {
    const {
      className,
      createAccountAction,
      isIAgreeChecked,
      hideShowPwd,
      confirmHideShowPwd,
      labels,
      error,
      onAlreadyHaveAnAccountClick,
      onRequestClose,
    } = this.props;
    return (
      <div className={className}>
        <CreateAccounPage
          className={className}
          createAccountAction={createAccountAction}
          labels={labels}
          isIAgreeChecked={isIAgreeChecked}
          hideShowPwd={hideShowPwd}
          confirmHideShowPwd={confirmHideShowPwd}
          error={error}
          onAlreadyHaveAnAccountClick={onAlreadyHaveAnAccountClick}
          onRequestClose={onRequestClose}
          showForgotPasswordForm={this.showForgotPasswordForm}
        />
      </div>
    );
  }
}

export default withStyles(CreateAccount, Styles);
export { CreateAccount as CreateAccountVanilla };
