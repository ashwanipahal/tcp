import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  getError,
  getSuccess,
  getResetPasswordErrorMessage,
  getShowNotificationState,
} from './ResetPassword.selectors';
import ResetPasswordComponent from '../views';
import { resetPassword, resetState } from './ResetPassword.actions';
import { isMobileApp } from '../../../../../utils';

export class ResetPasswordContainer extends PureComponent {
  static propTypes = {
    successMessage: PropTypes.string.isRequired,
    errorMessage: PropTypes.string.isRequired,
    resetStateAction: PropTypes.func.isRequired,
    resetPasswordAction: PropTypes.func.isRequired,
    backToLoginAction: PropTypes.func.isRequired,
    labels: PropTypes.shape({}).isRequired,
    queryParams: PropTypes.shape({
      em: PropTypes.string.isRequired,
      logonPasswordOld: PropTypes.string.isRequired,
    }).isRequired,
    resetPasswordErrorMessage: PropTypes.string.isRequired,
    showNotification: PropTypes.bool.isRequired,
    showNewPassword: PropTypes.func,
    showLogin: PropTypes.func,
    updateHeader: PropTypes.func,
    resetChangePasswordState: PropTypes.func,
  };

  static defaultProps = {
    showNewPassword: () => {},
    showLogin: () => {},
    updateHeader: () => {},
    resetChangePasswordState: () => {},
  };

  constructor(props) {
    super(props);
    this.state = { hideShowPwd: false, confirmHideShowPwd: false };
  }

  componentDidUpdate(prevProps) {
    const { successMessage } = this.props;
    if (successMessage && !prevProps.successMessage) {
      if (isMobileApp()) {
        setTimeout(() => {
          this.onBackClick();
        }, 2000);
      } else {
        setTimeout(() => {
          this.backHandler();
        }, 2000);
      }
    }
  }

  componentWillUnmount() {
    const { resetChangePasswordState, resetStateAction } = this.props;
    if (resetChangePasswordState) {
      resetChangePasswordState();
    }
    resetStateAction();
  }

  resetPassword = ({ password, confirmPassword }) => {
    const { resetPasswordAction, queryParams } = this.props;
    resetPasswordAction({
      newPassword: password,
      logonPasswordVerify: confirmPassword,
      ...queryParams,
    });
  };

  backHandler = e => {
    if (e) {
      e.preventDefault();
    }
    const { resetStateAction, backToLoginAction } = this.props;
    resetStateAction();
    backToLoginAction();
  };

  onBackClick = () => {
    const { showLogin, showNewPassword } = this.props;
    if (showLogin && showNewPassword) {
      showLogin();
      showNewPassword();
    }
  };

  onPwdHideShowClick = value => {
    this.setState({ hideShowPwd: value });
  };

  onConfirmPwdHideShowClick = value => {
    this.setState({ confirmHideShowPwd: value });
  };

  render() {
    const {
      successMessage,
      errorMessage,
      labels,
      resetPasswordErrorMessage,
      showNotification,
      showLogin,
      showNewPassword,
      updateHeader,
    } = this.props;
    const { hideShowPwd, confirmHideShowPwd } = this.state;
    return (
      <ResetPasswordComponent
        successMessage={successMessage}
        errorMessage={errorMessage}
        onSubmit={this.resetPassword}
        onBack={this.backHandler}
        labels={labels}
        resetPasswordErrorMessage={resetPasswordErrorMessage}
        showNotification={showNotification}
        showLogin={showLogin}
        showNewPassword={showNewPassword}
        onBackClick={this.onBackClick}
        updateHeader={updateHeader}
        onPwdHideShowClick={this.onPwdHideShowClick}
        onConfirmPwdHideShowClick={this.onConfirmPwdHideShowClick}
        hideShowPwd={hideShowPwd}
        confirmHideShowPwd={confirmHideShowPwd}
      />
    );
  }
}

export const mapStateToProps = state => ({
  successMessage: getSuccess(state),
  errorMessage: getError(state),
  resetPasswordErrorMessage: getResetPasswordErrorMessage(state),
  showNotification: getShowNotificationState(state),
});

export const mapDispatchToProps = dispatch => ({
  resetPasswordAction: payload => {
    dispatch(resetPassword(payload));
  },
  resetStateAction: () => {
    dispatch(resetState());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ResetPasswordContainer);
