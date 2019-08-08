import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getError, getSuccess } from './ResetPassword.selectors';
import ResetPasswordComponent from '../views';
import { resetPassword, resetState } from './ResetPassword.actions';

export class ResetPasswordContainer extends PureComponent {
  static propTypes = {
    success: PropTypes.string.isRequired,
    error: PropTypes.string.isRequired,
    resetStateAction: PropTypes.func.isRequired,
    resetPasswordAction: PropTypes.func.isRequired,
    backToLoginAction: PropTypes.func.isRequired,
    labels: PropTypes.shape({}).isRequired,
    queryParams: PropTypes.shape({
      em: PropTypes.string.isRequired,
      logonPasswordOld: PropTypes.string.isRequired
    }).isRequired
  };

  resetPassword = ({ password, confirmPassword }) => {
    const { resetPasswordAction, queryParams } = this.props;
    resetPasswordAction({
      newPassword: password,
      logonPasswordVerify: confirmPassword,
      ...queryParams
    });
  }

  resetState = () => {
    const { resetStateAction, backToLoginAction } = this.props;
    resetStateAction();
    backToLoginAction();
  }

  render() {
    const { success, error, labels } = this.props;
    return (
      <ResetPasswordComponent success={success} error={error} onSubmit={this.resetPassword} onBack={this.resetState} labels={labels} />
    )
  }
}

const mapStateToProps = state => ({
  success: getSuccess(state),
  error: getError(state)
});

const mapDispatchToProps = dispatch => ({
  resetPasswordAction: payload => {
    dispatch(resetPassword(payload));
  },
  resetStateAction: () => {
    dispatch(resetState());
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(ResetPasswordContainer)
