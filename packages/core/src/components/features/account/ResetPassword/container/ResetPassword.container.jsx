import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getError, getSuccess } from './ResetPassword.selectors';
import ResetPasswordComponent from '../views';
import { resetPassword, resetState } from './ResetPassword.actions';

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
  };

  resetPassword = ({ password, confirmPassword }) => {
    const { resetPasswordAction, queryParams } = this.props;
    resetPasswordAction({
      newPassword: password,
      logonPasswordVerify: confirmPassword,
      ...queryParams,
    });
  };

  backHandler = e => {
    e.preventDefault();
    const { resetStateAction, backToLoginAction } = this.props;
    resetStateAction();
    backToLoginAction();
  };

  render() {
    const { successMessage, errorMessage, labels } = this.props;
    return (
      <ResetPasswordComponent
        successMessage={successMessage}
        errorMessage={errorMessage}
        onSubmit={this.resetPassword}
        onBack={this.backHandler}
        labels={labels}
      />
    );
  }
}

export const mapStateToProps = state => ({
  successMessage: getSuccess(state),
  errorMessage: getError(state),
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
