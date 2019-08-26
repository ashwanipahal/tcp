import React from 'react';
import { View } from 'react-native';
import { PropTypes } from 'prop-types';
import withStyles from '../../../../../../common/hoc/withStyles';
import CreateAccounPage from '../../../organisms/CreateAccountPage';
import ForgotPasswordContainer from '../../../../ForgotPassword/container/ForgotPassword.container';
import { Styles } from '../styles/CreateAccount.style.native';

// @flow
type Props = {};

class CreateAccount extends React.Component<Props> {
  static propTypes = {
    className: PropTypes.string,
    createAccountAction: PropTypes.func,
    isIAgreeChecked: PropTypes.string,
    hideShowPwd: PropTypes.string,
    confirmHideShowPwd: PropTypes.string,
    labels: {},
    error: {},
    onAlreadyHaveAnAccountClick: PropTypes.func,
    onRequestClose: PropTypes.func,
    showLogin: PropTypes.func,
  };

  static defaultProps = {
    isIAgreeChecked: '',
    className: '',
    confirmHideShowPwd: '',
    createAccountAction: '',
    hideShowPwd: '',
    labels: PropTypes.shape({}),
    error: {},
    onAlreadyHaveAnAccountClick: () => {},
    onRequestClose: () => {},
    showLogin: () => {},
  };

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
      className,
      createAccountAction,
      isIAgreeChecked,
      hideShowPwd,
      confirmHideShowPwd,
      labels,
      error,
      onAlreadyHaveAnAccountClick,
      onRequestClose,
      showLogin,
    } = this.props;
    const { resetPassword } = this.state;
    return (
      <View className={className}>
        {!resetPassword && (
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
            showLogin={showLogin}
          />
        )}
        {resetPassword && (
          <ForgotPasswordContainer
            showForgotPasswordForm={this.showForgotPasswordForm}
            labels={labels}
            showLogin={showLogin}
          />
        )}
      </View>
    );
  }
}

export default withStyles(CreateAccount, Styles);
export { CreateAccount as CreateAccountVanilla };
